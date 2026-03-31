'use client';

import Image from 'next/image';
import type { CartItem } from '@/lib/square/types';

interface CartItemRowProps {
  item: CartItem;
  fmt: (cents: number) => string;
  compact?: boolean;
  onUpdateQty?: (id: string, quantity: number) => void;
  onRemove?: (id: string) => void;
}

export function CartItemRow({ item, fmt, compact, onUpdateQty, onRemove }: CartItemRowProps) {
  if (compact) {
    return (
      <div className="order-sidebar-item">
        {item.imageUrl && (
          <div className="order-sidebar-item-thumb">
            <Image
              src={item.imageUrl}
              alt={item.itemName}
              width={96}
              height={96}
              sizes="48px"
            />
          </div>
        )}
        <div className="order-sidebar-item-info">
          <p className="order-sidebar-item-name">
            {item.quantity > 1 && <>{item.quantity}x </>}
            {item.itemName}
          </p>
          {(item.variationName || item.modifiers.length > 0) && (
            <p className="order-sidebar-item-meta">
              {[item.variationName, ...item.modifiers.map((m) => m.name)].filter(Boolean).join(', ')}
            </p>
          )}
        </div>
        <span className="order-sidebar-item-price">
          {fmt(item.unitPriceCents * item.quantity)}
        </span>
      </div>
    );
  }

  return (
    <div className="order-cart-view-item">
      {item.imageUrl && (
        <div className="order-cart-view-item-thumb">
          <Image
            src={item.imageUrl}
            alt={item.itemName}
            width={120}
            height={120}
            sizes="60px"
            className="order-cart-view-item-img"
          />
        </div>
      )}
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
            className="order-qty-btn order-qty-btn-sm"
            onClick={() => onUpdateQty?.(item.id, item.quantity - 1)}
            aria-label={`Decrease ${item.itemName} quantity`}
          >
            −
          </button>
          <span className="order-qty-value order-qty-value-sm">
            {item.quantity}
          </span>
          <button
            className="order-qty-btn order-qty-btn-sm"
            onClick={() => onUpdateQty?.(item.id, item.quantity + 1)}
            aria-label={`Increase ${item.itemName} quantity`}
          >
            +
          </button>
        </div>
      </div>
      <div className="order-cart-view-item-end">
        <p className="order-cart-view-item-price">
          {fmt(item.unitPriceCents * item.quantity)}
        </p>
        <button
          className="order-cart-view-item-remove"
          onClick={() => onRemove?.(item.id)}
          aria-label={`Remove ${item.itemName}`}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
