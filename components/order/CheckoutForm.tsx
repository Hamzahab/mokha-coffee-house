'use client';

import { useCallback, useMemo } from 'react';
import { useCart } from './CartProvider';
import { useFormatCurrency } from './useFormatCurrency';
import { AlertIcon } from './Icons';
import { PickupScheduler } from './PickupScheduler';
import { buildDayOptions, toIso8601 } from '@/lib/square/schedule';
import type { CheckoutState, CheckoutAction } from './checkoutReducer';

interface CheckoutFormProps {
  state: CheckoutState;
  dispatch: React.Dispatch<CheckoutAction>;
}

export function CheckoutForm({ state, dispatch }: CheckoutFormProps) {
  const { items, subtotalCents, location } = useCart();
  const fmt = useFormatCurrency();

  const formValid =
    state.customerName.trim().length > 0 &&
    state.customerPhone.trim().length >= 7 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.customerEmail.trim()) &&
    (state.scheduleMode === 'asap' || state.selectedTime !== '');

  const dayOptions = useMemo(() => buildDayOptions(), []);

  const handleCheckout = useCallback(async () => {
    dispatch({ type: 'SET_CHECKING_OUT', value: true });
    dispatch({ type: 'SET_CHECKOUT_ERROR', value: '' });
    try {
      const pickupAt =
        state.scheduleMode === 'schedule' && state.selectedTime
          ? toIso8601(state.selectedTime, dayOptions[state.selectedDayIdx].date)
          : undefined;

      const res = await fetch('/api/square/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          locationId: location?.id ?? '',
          lineItems: items.map((i) => ({
            variationId: i.variationId,
            modifierIds: i.modifiers.map((m) => m.id),
            quantity: i.quantity,
          })),
          customerName: state.customerName.trim(),
          customerPhone: state.customerPhone.trim(),
          customerEmail: state.customerEmail.trim(),
          pickupAt,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Checkout failed');
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (err) {
      dispatch({
        type: 'SET_CHECKOUT_ERROR',
        value: err instanceof Error ? err.message : 'Something went wrong. Please try again.',
      });
      dispatch({ type: 'SET_CHECKING_OUT', value: false });
    }
  }, [state, dayOptions, items, location, dispatch]);

  const onScheduleModeChange = useCallback(
    (mode: 'asap' | 'schedule') => dispatch({ type: 'SET_SCHEDULE_MODE', value: mode }),
    [dispatch],
  );
  const onDayChange = useCallback(
    (idx: number) => dispatch({ type: 'SET_SELECTED_DAY', value: idx }),
    [dispatch],
  );
  const onTimeChange = useCallback(
    (time: string) => dispatch({ type: 'SET_SELECTED_TIME', value: time }),
    [dispatch],
  );

  return (
    <>
      <div className="order-cart-view-items order-checkout-form">
        <div className="order-form-group">
          <label className="order-form-label" htmlFor="customer-name">
            Name
            <span className="order-form-required">Required</span>
          </label>
          <input
            id="customer-name"
            type="text"
            className="order-form-input"
            placeholder="Your name"
            value={state.customerName}
            onChange={(e) => dispatch({ type: 'SET_CUSTOMER_NAME', value: e.target.value })}
            autoFocus
            required
          />
        </div>

        <div className="order-form-group">
          <label className="order-form-label" htmlFor="customer-email">
            Email
            <span className="order-form-required">Required</span>
          </label>
          <input
            id="customer-email"
            type="email"
            className="order-form-input"
            placeholder="you@email.com"
            value={state.customerEmail}
            onChange={(e) => dispatch({ type: 'SET_CUSTOMER_EMAIL', value: e.target.value })}
            required
          />
        </div>

        <div className="order-form-group">
          <label className="order-form-label" htmlFor="customer-phone">
            Phone
            <span className="order-form-required">Required</span>
          </label>
          <input
            id="customer-phone"
            type="tel"
            className="order-form-input"
            placeholder="(780) 555-0123"
            value={state.customerPhone}
            onChange={(e) => dispatch({ type: 'SET_CUSTOMER_PHONE', value: e.target.value })}
            required
          />
        </div>

        <PickupScheduler
          scheduleMode={state.scheduleMode}
          selectedDayIdx={state.selectedDayIdx}
          selectedTime={state.selectedTime}
          onScheduleModeChange={onScheduleModeChange}
          onDayChange={onDayChange}
          onTimeChange={onTimeChange}
        />

        {state.checkoutError && (
          <div className="order-checkout-error">
            <AlertIcon size={16} />
            {state.checkoutError}
          </div>
        )}
      </div>

      <div className="order-cart-view-footer">
        <div className="order-cart-view-subtotal">
          <span>Subtotal</span>
          <span>{fmt(subtotalCents)}</span>
        </div>
        <button
          className="order-cart-checkout-btn"
          onClick={handleCheckout}
          disabled={state.checkingOut || !formValid}
        >
          {state.checkingOut ? 'Processing...' : `Checkout ${fmt(subtotalCents)}`}
        </button>
      </div>
    </>
  );
}
