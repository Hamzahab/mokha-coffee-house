'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') ?? searchParams.get('order_id');
  const transactionId = searchParams.get('transactionId') ?? searchParams.get('transaction_id');

  useEffect(() => {
    try {
      localStorage.removeItem('mokha-cart');
    } catch {
      // ignore
    }
  }, []);

  return (
    <div className="order-confirm-page">
      <div className="order-confirm-check">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M20 6 9 17l-5-5" />
        </svg>
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
      <Link href="/order" className="order-confirm-btn">
        Order again
      </Link>
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
