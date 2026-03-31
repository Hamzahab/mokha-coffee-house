'use client';

import { useCallback, useEffect, useState } from 'react';
import type { CatalogCategory, CatalogMenuItem } from '@/lib/square/types';
import { useCart } from './CartProvider';
import { LocationPicker } from './LocationPicker';
import { ItemGrid } from './ItemGrid';
import { ItemModal } from './ItemModal';
import { CartBar } from './CartBar';
import { SkeletonGrid } from './SkeletonGrid';
import { MapPinIcon, CheckIcon } from './Icons';

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
            <MapPinIcon size={14} />
            <span>{location.name}</span>
            <span className="order-location-change">Change</span>
          </button>
        )}
      </header>

      {showLocationPicker && (
        <LocationPicker onConfirm={() => setShowLocationPicker(false)} />
      )}

      <div className="order-page-menu">
        {loading ? (
          <SkeletonGrid />
        ) : (
          <ItemGrid categories={categories} onSelectItem={setSelectedItem} />
        )}
      </div>

      {selectedItem && (
        <ItemModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onAdded={handleItemAdded}
        />
      )}

      <div className={`order-toast${toast ? ' visible' : ''}`}>
        <CheckIcon size={16} />
        Added to order
      </div>

      <CartBar pulse={toast} />
    </>
  );
}
