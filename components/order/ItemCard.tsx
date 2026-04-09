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
      onClick={() => !isOutOfStock && onSelect(item)}
      disabled={isOutOfStock}
      aria-disabled={isOutOfStock}
    >
      <div className="order-item-info">
        <p className="order-item-name">{item.name}</p>
        {item.description && (
          <p className="order-item-desc">{item.description}</p>
        )}
        <div className="order-item-meta">
          <p className="order-item-price">{formatItemPrice(item)}</p>
          {item.stockStatus === 'low_stock' && (
            <span className="order-item-stock low-stock">Low stock</span>
          )}
          {isOutOfStock && (
            <span className="order-item-stock out-of-stock">Out of stock</span>
          )}
        </div>
      </div>
      {item.imageUrl && (
        <div className="order-item-img-wrap">
          <Image
            src={item.imageUrl}
            alt={item.name}
            width={280}
            height={280}
            sizes="(max-width: 600px) 120px, 140px"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgwIiBoZWlnaHQ9IjI4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZThlMGQyIi8+PC9zdmc+"
            className="order-item-img"
          />
          <span className="order-item-add-icon" aria-hidden="true">+</span>
        </div>
      )}
    </button>
  );
}
