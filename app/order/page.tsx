import { Suspense } from 'react';
import { fetchCatalog } from '@/lib/square/catalog';
import { OrderClient } from '@/components/order/OrderClient';
import { OrderErrorBoundary } from '@/components/order/OrderErrorBoundary';
import { SkeletonGrid } from '@/components/order/SkeletonGrid';
import { LocationGate } from '@/components/order/LocationGate';

export const revalidate = 60;

const defaultLocationId = process.env.SQUARE_LOCATION_ID_CASTLEDOWNS;

async function CatalogLoader() {
  let categories: Awaited<ReturnType<typeof fetchCatalog>> = [];
  try {
    categories = await fetchCatalog(defaultLocationId);
  } catch {
    // fall through with empty array
  }

  if (categories.length === 0) {
    return (
      <div className="order-empty-state">
        <p>Menu is currently unavailable. Please try again later.</p>
      </div>
    );
  }

  return (
    <OrderErrorBoundary>
      <OrderClient categories={categories} />
    </OrderErrorBoundary>
  );
}

export default function OrderPage() {
  return (
    <div className="order-page">
      <LocationGate />
      <Suspense
        fallback={
          <>
            <header className="order-header">
              <h1 className="order-title">From our hands <em>to yours</em></h1>
            </header>
            <SkeletonGrid />
          </>
        }
      >
        <CatalogLoader />
      </Suspense>
    </div>
  );
}
