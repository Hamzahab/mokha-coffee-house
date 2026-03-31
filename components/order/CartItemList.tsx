'use client';

import { useCart } from './CartProvider';
import { useFormatCurrency } from './useFormatCurrency';
import { CartItemRow } from './CartItemRow';
import { CartIcon } from './Icons';

interface CartItemListProps {
  onContinue: () => void;
}

export function CartItemList({ onContinue }: CartItemListProps) {
  const { items, subtotalCents, updateQty, removeItem } = useCart();
  const fmt = useFormatCurrency();

  return (
    <>
      <div className="order-cart-view-items">
        {items.length === 0 ? (
          <div className="order-empty-cart">
            <div className="order-empty-cart-icon">
              <CartIcon />
            </div>
            <p className="order-empty-cart-text">Your cart is empty</p>
            <p className="order-empty-cart-sub">Browse the menu and add items to get started.</p>
          </div>
        ) : (
          items.map((item) => (
            <CartItemRow
              key={item.id}
              item={item}
              fmt={fmt}
              onUpdateQty={updateQty}
              onRemove={removeItem}
            />
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
            onClick={onContinue}
          >
            Continue
          </button>
        </div>
      )}
    </>
  );
}
