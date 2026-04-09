'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import type { StoreLocation } from '@/lib/square/types';
import { CheckIcon, MapPinIcon } from '@/components/order/Icons';

const STORAGE_KEY = 'mokha-cart';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') ?? searchParams.get('order_id');
  const transactionId = searchParams.get('transactionId') ?? searchParams.get('transaction_id');
  const [location, setLocation] = useState<StoreLocation | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.location) setLocation(parsed.location);
      }
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  return (
    <div className="order-confirm-page">
      <div className="order-confirm-check">
        <CheckIcon size={28} />
      </div>
      <h1 className="order-confirm-heading">Order confirmed</h1>
      {(orderId || transactionId) && (
        <p className="order-confirm-id">
          {orderId && <>Order #{orderId.slice(-6).toUpperCase()}</>}
          {transactionId && !orderId && <>Transaction #{transactionId.slice(-6).toUpperCase()}</>}
        </p>
      )}
      <p className="order-confirm-msg">
        Thank you for your order. Your pickup will be ready shortly.
        We look forward to seeing you at Mokha.
      </p>

      {location && (
        <div className="order-confirm-location">
          <MapPinIcon size={18} />
          <div>
            <p className="order-confirm-location-name">{location.name}</p>
            <p className="order-confirm-location-addr">{location.address}, {location.city}</p>
          </div>
        </div>
      )}

      <div className="order-confirm-actions">
        <Link href="/order" className="order-confirm-btn">
          Order again
        </Link>
        {location && (
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(`${location.address}, ${location.city}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="order-confirm-btn-outline"
          >
            Get directions
          </a>
        )}
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="order-confirm-page">
          <p>Loading...</p>
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}
