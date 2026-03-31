'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { StoreLocation } from '@/lib/square/types';
import { useCart } from './CartProvider';
import { MapPinIcon } from './Icons';

const LOCATIONS: StoreLocation[] = [
  {
    id: process.env.NEXT_PUBLIC_LOCATION_ID_CASTLEDOWNS ?? 'castledowns',
    name: 'Mokha Coffee House Ltd.',
    address: '5344 Admiral Girouard Street NW',
    city: 'Edmonton AB T5E 6Z7',
  },
  {
    id: process.env.NEXT_PUBLIC_LOCATION_ID_CURRENTS ?? 'currents',
    name: 'Mokha Coffee House Ltd. Windermere',
    address: '10-6085 Currents Dr NW',
    city: 'Edmonton AB T6W 0L9',
  },
];

interface LocationPickerProps {
  onConfirm: () => void;
}

export function LocationPicker({ onConfirm }: LocationPickerProps) {
  const { location, setLocation } = useCart();
  const backdropRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<string>(location?.id ?? '');
  const [activeTab, setActiveTab] = useState<'pickup' | 'delivery' | 'shipping'>('pickup');

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleConfirm = useCallback(() => {
    const loc = LOCATIONS.find((l) => l.id === selected);
    if (!loc) return;
    setLocation(loc);
    setVisible(false);
    setTimeout(onConfirm, 300);
  }, [selected, setLocation, onConfirm]);

  return (
    <div
      ref={backdropRef}
      className={`order-loc-backdrop${visible ? ' visible' : ''}`}
    >
      <div className={`order-loc-sheet${visible ? ' visible' : ''}`}>
        {/* Tabs */}
        <div className="order-loc-tabs">
          {(['pickup', 'delivery', 'shipping'] as const).map((tab) => (
            <button
              key={tab}
              className={`order-loc-tab${activeTab === tab ? ' active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === 'pickup' ? (
          <>
            <h2 className="order-loc-heading">Select location</h2>
            <div className="order-loc-find">
              <MapPinIcon size={14} />
              <span>Find the nearest store</span>
            </div>

            <div className="order-loc-divider" />

            {LOCATIONS.map((loc) => (
              <div key={loc.id}>
                <button
                  className={`order-loc-card${selected === loc.id ? ' selected' : ''}`}
                  onClick={() => setSelected(loc.id)}
                >
                  <span className="order-loc-radio">
                    <span className="order-loc-radio-inner" />
                  </span>
                  <span className="order-loc-card-info">
                    <span className="order-loc-card-name">{loc.name}</span>
                    <span className="order-loc-card-addr">
                      {loc.address}<br />{loc.city}
                    </span>
                  </span>
                </button>
                <div className="order-loc-divider" />
              </div>
            ))}

            <button
              className="order-loc-confirm-btn"
              disabled={!selected}
              onClick={handleConfirm}
            >
              View menu
            </button>
          </>
        ) : (
          <div className="order-loc-coming-soon">
            {activeTab === 'delivery' ? 'Delivery' : 'Shipping'} coming soon.
          </div>
        )}
      </div>
    </div>
  );
}
