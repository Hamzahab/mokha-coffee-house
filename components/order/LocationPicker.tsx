'use client';

import { useCallback, useEffect, useState } from 'react';
import type { StoreLocation } from '@/lib/square/types';
import { useCart } from './CartProvider';
import { MapPinIcon } from './Icons';

interface LocationWithCoords extends StoreLocation {
  lat: number;
  lng: number;
}

const LOCATIONS: LocationWithCoords[] = [
  {
    id: process.env.NEXT_PUBLIC_LOCATION_ID_CASTLEDOWNS ?? 'castledowns',
    name: 'Mokha Coffee House Ltd.',
    address: '5344 Admiral Girouard Street NW',
    city: 'Edmonton AB T5E 6Z7',
    lat: 53.6003,
    lng: -113.5133,
  },
  {
    id: process.env.NEXT_PUBLIC_LOCATION_ID_CURRENTS ?? 'currents',
    name: 'Mokha Coffee House Ltd. Windermere',
    address: '10-6085 Currents Dr NW',
    city: 'Edmonton AB T6W 0L9',
    lat: 53.4374,
    lng: -113.6048,
  },
];

const SQUARE_ONLINE_URLS: Record<string, string> = {
  [process.env.NEXT_PUBLIC_LOCATION_ID_CASTLEDOWNS ?? 'castledowns']:
    'https://mokha-coffee-house-ltd.square.site/s/order?location=LVYX76SPXC68V',
  [process.env.NEXT_PUBLIC_LOCATION_ID_CURRENTS ?? 'currents']:
    'https://mokha-coffee-house-ltd.square.site/s/order?location=LF4R3GRSF9ZC6',
};

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

interface LocationPickerProps {
  onConfirm: () => void;
}

export function LocationPicker({ onConfirm }: LocationPickerProps) {
  const { location, setLocation } = useCart();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<string>(location?.id ?? '');
  const [activeTab, setActiveTab] = useState<'pickup' | 'delivery' | 'shipping'>('pickup');
  const [distances, setDistances] = useState<Record<string, number>>({});

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    document.body.style.overflow = 'hidden';

    let watchId: number | undefined;
    if ('geolocation' in navigator) {
      watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const d: Record<string, number> = {};
          for (const loc of LOCATIONS) {
            d[loc.id] = haversineKm(pos.coords.latitude, pos.coords.longitude, loc.lat, loc.lng);
          }
          setDistances(d);
          if (watchId != null) navigator.geolocation.clearWatch(watchId);
        },
        () => { /* permission denied — distances stay empty */ },
      );
    }

    return () => {
      document.body.style.overflow = '';
      if (watchId != null) navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  const handleConfirm = useCallback(() => {
    const loc = LOCATIONS.find((l) => l.id === selected);
    if (!loc) return;
    setLocation(loc);
    setVisible(false);
    setTimeout(onConfirm, 300);
  }, [selected, setLocation, onConfirm]);

  return (
    <div className={`order-loc-backdrop${visible ? ' visible' : ''}`}>
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
                    {distances[loc.id] != null && (
                      <span className="order-loc-card-dist">
                        {distances[loc.id] < 1
                          ? `${Math.round(distances[loc.id] * 1000)} m away`
                          : `${distances[loc.id].toFixed(1)} km away`}
                      </span>
                    )}
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
          <div className="order-loc-redirect">
            <p className="order-loc-redirect-title">
              {activeTab === 'delivery' ? 'Delivery' : 'Shipping'} is available through our partner checkout
            </p>
            <p className="order-loc-redirect-desc">
              {activeTab === 'delivery'
                ? 'Get your order delivered to your door via our Square Online store.'
                : 'Have items shipped to you via our Square Online store.'}
            </p>
            <div className="order-loc-redirect-links">
              {LOCATIONS.map((loc) => (
                <a
                  key={loc.id}
                  href={SQUARE_ONLINE_URLS[loc.id]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="order-loc-redirect-btn"
                >
                  <MapPinIcon size={14} />
                  <span>{loc.name.replace('Mokha Coffee House Ltd.', '').trim() || 'Castledowns'}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
