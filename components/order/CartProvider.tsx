'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
  type ReactNode,
} from 'react';
import type { CartItem, StoreLocation } from '@/lib/square/types';
import type { HoursPeriod } from '@/lib/square/schedule';

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

interface CartState {
  items: CartItem[];
  location: StoreLocation | null;
}

type CartAction =
  | { type: 'ADD_ITEM'; item: CartItem }
  | { type: 'REMOVE_ITEM'; id: string }
  | { type: 'UPDATE_QTY'; id: string; quantity: number }
  | { type: 'SET_LOCATION'; location: StoreLocation }
  | { type: 'CLEAR' }
  | { type: 'HYDRATE'; state: CartState };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.item] };
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((i) => i.id !== action.id) };
    case 'UPDATE_QTY':
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, quantity: action.quantity } : i,
        ),
      };
    case 'SET_LOCATION':
      if (state.location && state.location.id !== action.location.id) {
        return { ...state, location: action.location, items: [] };
      }
      return { ...state, location: action.location };
    case 'CLEAR':
      return { ...state, items: [] };
    case 'HYDRATE':
      return action.state;
    default:
      return state;
  }
}

const INITIAL_STATE: CartState = { items: [], location: null };
const STORAGE_KEY = 'mokha-cart';

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface CartContextValue {
  items: CartItem[];
  location: StoreLocation | null;
  itemCount: number;
  subtotalCents: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, quantity: number) => void;
  setLocation: (location: StoreLocation) => void;
  clear: () => void;
  hoursPeriods: HoursPeriod[];
  hoursLoading: boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  const [hydrated, setHydrated] = useState(false);
  const [hoursPeriods, setHoursPeriods] = useState<HoursPeriod[]>([]);
  const [hoursLoading, setHoursLoading] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartState;
        dispatch({ type: 'HYDRATE', state: parsed });
      }
    } catch {
      // ignore corrupt storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore quota errors
    }
  }, [state, hydrated]);

  useEffect(() => {
    if (!state.location) return;
    const controller = new AbortController();
    setHoursLoading(true);
    setHoursPeriods([]);
    fetch(`/api/square/hours?locationId=${encodeURIComponent(state.location.id)}`, {
      signal: controller.signal,
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.periods) setHoursPeriods(data.periods);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          console.error('[Hours fetch failed]', err);
        }
      })
      .finally(() => setHoursLoading(false));
    return () => controller.abort();
  }, [state.location?.id]);

  const addItem = useCallback((item: CartItem) => {
    dispatch({ type: 'ADD_ITEM', item });
  }, []);

  const removeItem = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_ITEM', id });
  }, []);

  const updateQty = useCallback((id: string, quantity: number) => {
    if (quantity < 1) {
      dispatch({ type: 'REMOVE_ITEM', id });
    } else {
      dispatch({ type: 'UPDATE_QTY', id, quantity });
    }
  }, []);

  const setLocation = useCallback((location: StoreLocation) => {
    dispatch({ type: 'SET_LOCATION', location });
  }, []);

  const clear = useCallback(() => {
    dispatch({ type: 'CLEAR' });
  }, []);

  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotalCents = state.items.reduce(
    (sum, i) => sum + i.unitPriceCents * i.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        location: state.location,
        itemCount,
        subtotalCents,
        addItem,
        removeItem,
        updateQty,
        setLocation,
        clear,
        hoursPeriods,
        hoursLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
