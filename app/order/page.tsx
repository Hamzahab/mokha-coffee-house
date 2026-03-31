import { fetchCatalog } from '@/lib/square/catalog';
import { OrderClient } from '@/components/order/OrderClient';

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
            <p className="order-eyebrow">Order Online</p>
            <h1 className="order-title">Place your <em>order</em></h1>
          </header>
          <div className="order-empty-state">
            <p>Menu is currently unavailable. Please try again later.</p>
          </div>
        </>
      ) : (
        <OrderClient categories={categories} />
      )}
    </div>
  );
}
