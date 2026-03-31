'use client';

import { useCallback, useEffect, useState } from 'react';
import type { CatalogCategory, CatalogMenuItem } from '@/lib/square/types';
import { useCart } from './CartProvider';
import { LocationPicker } from './LocationPicker';
import { ItemGrid } from './ItemGrid';
import { ItemModal } from './ItemModal';
import { CartBar } from './CartBar';

interface OrderClientProps {
  categories: CatalogCategory[];
}

export function OrderClient({ categories: initialCategories }: OrderClientProps) {
  const { location } = useCart();
  const [categories, setCategories] = useState(initialCategories);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CatalogMenuItem | null>(null);
  const [showLocationPicker, setShowLocationPicker] = useState(!location);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    if (!location) return;
    setLoading(true);
    fetch(`/api/square/catalog?locationId=${encodeURIComponent(location.id)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.categories) setCategories(data.categories);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [location]);

  const handleItemAdded = useCallback(() => {
    setToast(true);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(false), 2000);
    return () => clearTimeout(t);
  }, [toast]);

  return (
    <>
      <header className="order-header">
        <p className="order-eyebrow">Order Online</p>
        <h1 className="order-title">Place your <em>order</em></h1>
        {location && (
          <button
            className="order-location-badge"
            onClick={() => setShowLocationPicker(true)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>{location.name}</span>
            <span className="order-location-change">Change</span>
          </button>
        )}
      </header>

      {showLocationPicker && (
        <LocationPicker onConfirm={() => setShowLocationPicker(false)} />
      )}

      {loading && (
        <div className="order-loading">
          <div className="order-loading-spinner" />
          <p>Updating menu…</p>
        </div>
      )}

      <div style={{ opacity: loading ? 0.4 : 1, transition: 'opacity 0.3s', pointerEvents: loading ? 'none' : 'auto' }}>
        <ItemGrid categories={categories} onSelectItem={setSelectedItem} />
      </div>

      {selectedItem && (
        <ItemModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onAdded={handleItemAdded}
        />
      )}

      <div className={`order-toast${toast ? ' visible' : ''}`}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M20 6 9 17l-5-5" />
        </svg>
        Added to order
      </div>

      <CartBar pulse={toast} />
    </>
  );
}
