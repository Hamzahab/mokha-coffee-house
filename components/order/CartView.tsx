'use client';

import { useReducer } from 'react';
import { useSlidePanel } from './useSlidePanel';
import { CartItemList } from './CartItemList';
import { CheckoutForm } from './CheckoutForm';
import { CloseIcon, ChevronBackIcon } from './Icons';
import { checkoutReducer, INITIAL_CHECKOUT_STATE } from './checkoutReducer';

interface CartViewProps {
  onClose: () => void;
}

export function CartView({ onClose }: CartViewProps) {
  const { visible, close } = useSlidePanel(onClose);
  const [state, dispatch] = useReducer(checkoutReducer, INITIAL_CHECKOUT_STATE);

  return (
    <>
      <div
        className={`order-cart-view-backdrop${visible ? ' visible' : ''}`}
        onClick={close}
      />
      <div className={`order-cart-view${visible ? ' visible' : ''}`}>
        <div className="order-cart-view-header">
          <h2 className="order-cart-view-title">
            {state.step === 'info' ? 'Pickup details' : 'Your order'}
          </h2>
          <button
            className="order-cart-view-close"
            onClick={state.step === 'info' ? () => dispatch({ type: 'SET_STEP', value: 'cart' }) : close}
            aria-label={state.step === 'info' ? 'Back to cart' : 'Close cart'}
          >
            {state.step === 'info' ? <ChevronBackIcon /> : <CloseIcon />}
          </button>
        </div>

        {state.step === 'cart' ? (
          <CartItemList onContinue={() => dispatch({ type: 'SET_STEP', value: 'info' })} />
        ) : (
          <CheckoutForm state={state} dispatch={dispatch} />
        )}
      </div>
    </>
  );
}
