'use client';

import { useCallback, useEffect, useState } from 'react';
import { useCart } from './CartProvider';
import { formatCents } from '@/lib/square/format';

interface CartViewProps {
  onClose: () => void;
}

export function CartView({ onClose }: CartViewProps) {
  const { items, subtotalCents, updateQty, removeItem, location } = useCart();
  const [visible, setVisible] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(onClose, 300);
  }, [onClose]);

  const currency = items[0]?.currency ?? 'CAD';
  const fmt = (cents: number) => formatCents(cents, currency);

  async function handleCheckout() {
    setCheckingOut(true);
    try {
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
          customerName: 'Guest',
        }),
      });

      const data = await res.json();
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      }
    } catch {
      setCheckingOut(false);
    }
  }

  return (
    <>
      <div
        className={`order-cart-view-backdrop${visible ? ' visible' : ''}`}
        onClick={handleClose}
      />
      <div className={`order-cart-view${visible ? ' visible' : ''}`}>
        <div className="order-cart-view-header">
          <h2 className="order-cart-view-title">Your order</h2>
          <button className="order-cart-view-close" onClick={handleClose} aria-label="Close cart">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="order-cart-view-items">
          {items.length === 0 ? (
            <div className="order-empty">
              <p>Your cart is empty</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="order-cart-view-item">
                <div className="order-cart-view-item-info">
                  <p className="order-cart-view-item-name">{item.itemName}</p>
                  {item.variationName && (
                    <p className="order-cart-view-item-mods">{item.variationName}</p>
                  )}
                  {item.modifiers.length > 0 && (
                    <p className="order-cart-view-item-mods">
                      {item.modifiers.map((m) => m.name).join(', ')}
                    </p>
                  )}
                  <div className="order-cart-view-item-qty">
                    <button
                      className="order-qty-btn"
                      style={{ width: 28, height: 28, fontSize: 14 }}
                      onClick={() => updateQty(item.id, item.quantity - 1)}
                      aria-label="Decrease"
                    >
                      −
                    </button>
                    <span className="order-qty-value" style={{ fontSize: 14 }}>
                      {item.quantity}
                    </span>
                    <button
                      className="order-qty-btn"
                      style={{ width: 28, height: 28, fontSize: 14 }}
                      onClick={() => updateQty(item.id, item.quantity + 1)}
                      aria-label="Increase"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div>
                  <p className="order-cart-view-item-price">
                    {fmt(item.unitPriceCents * item.quantity)}
                  </p>
                  <button
                    className="order-cart-view-item-remove"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="order-cart-view-footer">
            <div className="order-cart-view-subtotal">
              <span>Subtotal</span>
              <span>{fmt(subtotalCents)}</span>
            </div>
            <button
              className="order-cart-checkout-btn"
              onClick={handleCheckout}
              disabled={checkingOut}
            >
              {checkingOut ? 'Processing...' : 'Checkout'}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
