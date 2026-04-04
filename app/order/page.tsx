import { fetchCatalog } from '@/lib/square/catalog';
import { OrderClient } from '@/components/order/OrderClient';
import { OrderErrorBoundary } from '@/components/order/OrderErrorBoundary';

export const revalidate = 60;

const defaultLocationId = process.env.SQUARE_LOCATION_ID_CASTLEDOWNS;

export default async function OrderPage() {
  let categories: Awaited<ReturnType<typeof fetchCatalog>> = [];
  try {
    categories = await fetchCatalog(defaultLocationId);
  } catch {
    // fall through with empty array
  }

  return (
    <div className="order-page">
      {categories.length === 0 ? (
        <>
          <header className="order-header">
            <h1 className="order-title">From our hands <em>to yours</em></h1>
          </header>
          <div className="order-empty-state">
            <p>Menu is currently unavailable. Please try again later.</p>
          </div>
        </>
      ) : (
        <OrderErrorBoundary>
          <OrderClient categories={categories} />
        </OrderErrorBoundary>
      )}
    </div>
  );
}
