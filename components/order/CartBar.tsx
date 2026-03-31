'use client';

import { useState } from 'react';
import { useCart } from './CartProvider';
import { useFormatCurrency } from './useFormatCurrency';
import { CartView } from './CartView';

interface CartBarProps {
  pulse?: boolean;
}

export function CartBar({ pulse }: CartBarProps) {
  const { itemCount, subtotalCents } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const fmt = useFormatCurrency();

  if (itemCount === 0) return null;

  return (
    <>
      <div className={`order-cart-bar${itemCount > 0 ? ' visible' : ''}`}>
        <button className="order-cart-bar-btn" onClick={() => setCartOpen(true)}>
          <span className="order-cart-bar-label">
            <span className={`order-cart-bar-count${pulse ? ' pulse' : ''}`}>{itemCount}</span>
            <span>View order</span>
          </span>
          <span>{fmt(subtotalCents)}</span>
        </button>
      </div>

      {cartOpen && <CartView onClose={() => setCartOpen(false)} />}
    </>
  );
}
