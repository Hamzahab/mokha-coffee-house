'use client';

import { useState } from 'react';
import { useCart } from './CartProvider';
import { useFormatCurrency } from './useFormatCurrency';
import { CartItemRow } from './CartItemRow';
import { CartView } from './CartView';

export function SidebarCart() {
  const { items, subtotalCents, itemCount } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const fmt = useFormatCurrency();

  return (
    <div className="order-page-sidebar">
      <div className="order-sidebar-header">Your order</div>

      {items.length === 0 ? (
        <div className="order-sidebar-empty">
          <p>Add items from the menu to get started.</p>
        </div>
      ) : (
        <>
          <div className="order-sidebar-items">
            {items.map((item) => (
              <CartItemRow key={item.id} item={item} fmt={fmt} compact />
            ))}
          </div>

          <div className="order-sidebar-footer">
            <div className="order-sidebar-subtotal">
              <span>Subtotal ({itemCount})</span>
              <span>{fmt(subtotalCents)}</span>
            </div>
            <button
              className="order-sidebar-checkout-btn"
              onClick={() => setCheckoutOpen(true)}
            >
              Checkout
            </button>
          </div>
        </>
      )}

      {checkoutOpen && <CartView onClose={() => setCheckoutOpen(false)} />}
    </div>
  );
}
