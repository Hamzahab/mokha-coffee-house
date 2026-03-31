'use client';

import { useState } from 'react';
import { useCart } from './CartProvider';
import { formatCents } from '@/lib/square/format';
import { CartView } from './CartView';

interface CartBarProps {
  pulse?: boolean;
}

export function CartBar({ pulse }: CartBarProps) {
  const { itemCount, subtotalCents, items } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  if (itemCount === 0) return null;

  const currency = items[0]?.currency ?? 'CAD';
  const fmt = (cents: number) => formatCents(cents, currency);

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
