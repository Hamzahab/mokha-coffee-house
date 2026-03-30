'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from 'react';
import type { CartItem, StoreLocation } from '@/lib/square/types';

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

  // Hydrate from localStorage on mount
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
  }, []);

  // Persist to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore quota errors
    }
  }, [state]);

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
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
