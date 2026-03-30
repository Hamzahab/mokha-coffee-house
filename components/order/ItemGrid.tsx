'use client';

import { useMemo, useState } from 'react';
import type { CatalogCategory, CatalogMenuItem } from '@/lib/square/types';
import { FeaturedCarousel } from './FeaturedCarousel';
import { CategoryNav } from './CategoryNav';
import { ItemCard } from './ItemCard';

interface ItemGridProps {
  categories: CatalogCategory[];
  onSelectItem: (item: CatalogMenuItem) => void;
}

const FEATURED_NAMES = ['most popular', 'featured', 'popular'];

export function ItemGrid({ categories, onSelectItem }: ItemGridProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const { featured, rest } = useMemo(() => {
    const featuredCat = categories.find((c) =>
      FEATURED_NAMES.includes(c.name.toLowerCase()),
    );
    const remaining = categories.filter((c) => c !== featuredCat);
    return { featured: featuredCat ?? null, rest: remaining };
  }, [categories]);

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return rest;
    const q = searchQuery.toLowerCase();
    return rest
      .map((cat) => ({
        ...cat,
        items: cat.items.filter(
          (item) =>
            item.name.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q),
        ),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [rest, searchQuery]);

  const showFeatured = !searchQuery.trim() && featured && featured.items.length > 0;

  return (
    <>
      {showFeatured && (
        <FeaturedCarousel items={featured.items} onSelectItem={onSelectItem} />
      )}

      <CategoryNav
        categories={filteredCategories}
        onSearch={setSearchQuery}
      />
      <div className="order-grid-body">
        {filteredCategories.length === 0 && (
          <div className="order-empty">
            <p>No items match your search.</p>
          </div>
        )}
        {filteredCategories.map((cat) => (
          <section key={cat.id} id={cat.id} className="order-cat-section">
            <h2 className="order-cat-heading">{cat.name}</h2>
            <div className="order-items-grid">
              {cat.items.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  onSelect={onSelectItem}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
