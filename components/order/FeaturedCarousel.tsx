'use client';

import Image from 'next/image';
import type { CatalogMenuItem } from '@/lib/square/types';
import { formatItemPriceFrom } from '@/lib/square/format';

interface FeaturedCarouselProps {
  items: CatalogMenuItem[];
  onSelectItem: (item: CatalogMenuItem) => void;
}

export function FeaturedCarousel({ items, onSelectItem }: FeaturedCarouselProps) {
  if (items.length === 0) return null;

  return (
    <section className="featured-section">
      <div className="featured-header">
        <h2 className="featured-title">Most popular</h2>
      </div>
      <div className="featured-scroll">
        {items.map((item, i) => (
          <button
            key={item.id}
            className="featured-card"
            onClick={() => onSelectItem(item)}
          >
            {item.imageUrl ? (
              <Image
                src={item.imageUrl}
                alt={item.name}
                width={520}
                height={360}
                sizes="(max-width: 600px) 70vw, 260px"
                priority={i < 4}
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTIwIiBoZWlnaHQ9IjM2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZThlMGQyIi8+PC9zdmc+"
                className="featured-card-img"
              />
            ) : (
              <div className="featured-card-img-placeholder" />
            )}
            <div className="featured-card-gradient" />
            <div className="featured-card-info">
              <p className="featured-card-name">{item.name}</p>
              <p className="featured-card-price">{formatItemPriceFrom(item)}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
