'use client';

import Image from 'next/image';
import type { CatalogMenuItem } from '@/lib/square/types';
import { formatItemPrice } from '@/lib/square/format';

interface ItemCardProps {
  item: CatalogMenuItem;
  onSelect: (item: CatalogMenuItem) => void;
}

export function ItemCard({ item, onSelect }: ItemCardProps) {
  const isOutOfStock = item.stockStatus === 'out_of_stock';

  return (
    <button
      className={`order-item-card${isOutOfStock ? ' out-of-stock' : ''}`}
      onClick={() => onSelect(item)}
    >
      <div className="order-item-info">
        <p className="order-item-name">{item.name}</p>
        <p className="order-item-price">{formatItemPrice(item)}</p>
        {item.stockStatus === 'low_stock' && (
          <p className="order-item-stock low-stock">Low stock</p>
        )}
        {isOutOfStock && (
          <p className="order-item-stock out-of-stock">Out of stock</p>
        )}
        {item.description && (
          <p className="order-item-desc">{item.description}</p>
        )}
      </div>
      {item.imageUrl && (
        <div className="order-item-img-wrap">
          <Image
            src={item.imageUrl}
            alt={item.name}
            width={192}
            height={192}
            sizes="96px"
            className="order-item-img"
          />
        </div>
      )}
    </button>
  );
}
