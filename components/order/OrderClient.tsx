'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
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
  const [catalogError, setCatalogError] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CatalogMenuItem | null>(null);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    if (!location) return;
    const controller = new AbortController();
    setLoading(true);
    setCatalogError(false);
    fetch(`/api/square/catalog?locationId=${encodeURIComponent(location.id)}`, {
      signal: controller.signal,
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.categories) setCategories(data.categories);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setCatalogError(true);
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [location]);

  const searchParams = useSearchParams();
  const scrolledRef = useRef(false);

  useEffect(() => {
    if (scrolledRef.current || loading) return;
    const target = searchParams.get('category');
    if (!target) return;

    const match = categories.find(
      (c) => c.name.toLowerCase() === target.toLowerCase(),
    );
    if (!match) return;

    scrolledRef.current = true;
    requestAnimationFrame(() => {
      const el = document.getElementById(match.id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 130;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  }, [categories, loading, searchParams]);

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
        <h1 className="order-title">From our hands <em>to yours</em></h1>
        {location && (
          <button
            className="order-location-badge"
            onClick={() => setShowLocationPicker(true)}
          >
            <MapPinIcon size={14} />
            <span>Pickup from {location.name}</span>
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
        ) : catalogError ? (
          <div className="order-empty-state">
            <p>Could not load menu. Please refresh the page.</p>
          </div>
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
