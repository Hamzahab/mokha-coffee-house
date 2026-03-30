# Square Ordering Integration — Reference

> Single source of truth for the Square ordering integration in the Mokha Coffee House Next.js site.
> This doc is committed with the codebase and updated as deliverables land.

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│  Client (React)                                         │
│                                                         │
│  /order page                                            │
│    ├── LocationPicker  (full-screen sheet, mobile)       │
│    ├── FeaturedCarousel (horizontal "Most popular" row)  │
│    ├── CategoryNav     (sticky horizontal pills)        │
│    ├── ItemGrid        (1-col mobile, 2-col desktop)    │
│    │   └── ItemCard    (image + name + price)           │
│    ├── ItemModal       (bottom sheet w/ variations)     │
│    ├── CartBar         (sticky bottom bar)              │
│    └── CartView        (full-screen cart)               │
│                                                         │
│  CartProvider (React Context + localStorage)            │
└────────────┬───────────────────────────┬────────────────┘
             │                           │
    GET /api/square/catalog     POST /api/square/order
             │                           │
             ▼                           ▼
┌────────────────────┐     ┌──────────────────────────┐
│  Square Catalog    │     │  Square Checkout API      │
│  API               │     │  (paymentLinks.create()   │
│  (items, images,   │     │   builds the order +      │
│   categories,      │     │   payment link in one     │
│   modifiers)       │     │   call → redirect to      │
└────────────────────┘     │   Square hosted checkout) │
                           └──────────┬───────────────┘
                                      │
                                      ▼
                           /order/confirmation
                           (after Square redirects back)
```

## Environment Variables

| Variable | Description | Where to find |
|---|---|---|
| `SQUARE_ACCESS_TOKEN` | Production access token | Square Developer → Apps → MCH_Admin → Credentials |
| `SQUARE_APPLICATION_ID` | Application ID | Square Developer → Apps → MCH_Admin → Credentials |
| `SQUARE_ENVIRONMENT` | `production` or `sandbox` | Set based on deployment stage |
| `SQUARE_LOCATION_ID_CASTLEDOWNS` | Location ID for Castledowns store | Square Dashboard → Locations |
| `SQUARE_LOCATION_ID_CURRENTS` | Location ID for Currents store | Square Dashboard → Locations |
| `SQUARE_ONLINE_SITE_CHANNEL_ID` | Channel ID for online-visible items | Square Dashboard → Online → Site |
| `NEXT_PUBLIC_BASE_URL` | Site URL for checkout redirect | Your deployment URL |

**Never expose** `SQUARE_ACCESS_TOKEN` to the client. It is only used in API routes and server components.

## File Structure

```
lib/square/
  client.ts              Singleton SquareClient instance
  catalog.ts             Fetch + normalize catalog from Square
  checkout.ts            Create payment link (order + checkout in one API call)
  config.ts              Featured items list + category display order
  format.ts              Shared price formatting utilities
  types.ts               All normalized TypeScript types

app/api/square/
  catalog/route.ts       GET — returns normalized catalog JSON (dynamic route)
  order/route.ts         POST — creates order + payment link, returns checkout URL

app/order/
  page.tsx               Main ordering page (SSR with revalidate = 60)
  layout.tsx             Order layout with CartProvider
  confirmation/page.tsx  Post-checkout confirmation

components/order/
  CartProvider.tsx        React Context for cart state (reducer + localStorage)
  LocationPicker.tsx      Store + order type selection
  FeaturedCarousel.tsx    Horizontal "Most popular" carousel
  CategoryNav.tsx         Horizontal scrollable category tabs (includes search)
  OrderClient.tsx         Client wrapper that composes all order UI components
  ItemGrid.tsx            Responsive item grid with category sections
  ItemCard.tsx            Single item card
  ItemModal.tsx           Bottom-sheet item detail modal
  CartBar.tsx             Sticky bottom cart summary bar
  CartView.tsx            Full-screen cart view
```

## Normalized Types

Square returns a flat object model. We normalize it into nested, frontend-friendly types:

```typescript
interface CatalogCategory {
  id: string;
  name: string;          // e.g. "HOT BEVERAGES"
  ordinal: number;       // display order from config.ts
  items: CatalogMenuItem[];
}

interface CatalogMenuItem {
  id: string;
  name: string;
  description: string;
  imageUrl: string | null;
  categoryIds: string[];           // an item can belong to multiple categories
  variations: ItemVariation[];     // sizes / options (at least one)
  modifierLists: ModifierList[];   // add-ons, customizations
  onSale: boolean;                 // reserved for future use (always false for now)
  stockStatus: StockStatus;        // 'in_stock' | 'low_stock' | 'out_of_stock'
}

interface ItemVariation {
  id: string;            // this is the catalog_object_id used in orders
  name: string;
  priceCents: number;    // price in cents (e.g. 325 = CAD$3.25)
  currency: string;      // "CAD"
}

interface ModifierList {
  id: string;
  name: string;
  selectionType: 'SINGLE' | 'MULTIPLE';
  minSelected: number;   // 0 = optional
  maxSelected: number;
  modifiers: Modifier[];
}

interface Modifier {
  id: string;
  name: string;
  priceCents: number;
  currency: string;
}
```

## Square API Usage

### Catalog (read)

We use `client.catalog.search()` with:
- `objectTypes: ['ITEM', 'CATEGORY']`
- `includeRelatedObjects: true` (pulls in images, modifier lists, modifiers)
- `limit: 1000`

The response has `objects` (items + categories) and `relatedObjects` (images, modifier lists).
We build lookup maps for images, modifier lists, and categories, then nest everything under `CatalogCategory[]`.

**Caching**: The server component in `app/order/page.tsx` uses `revalidate = 60` for ISR. The API route at `/api/square/catalog` is dynamic (reads `request.url`) and does not cache independently.

### Checkout (write)

We call `client.checkout.paymentLinks.create()` which creates both the order and payment link in a single API call:
- `order.locationId` — the selected store
- `order.lineItems[]` — each with `catalogObjectId` (variation ID), `quantity`, `modifiers[]`
- `order.fulfillments[]` — single `PICKUP` fulfillment with customer details
- `checkoutOptions.redirectUrl` — where Square sends the customer after payment

### Inventory

We call `client.inventory.batchGetCounts()` to check stock levels for inventory-tracked variations. Items are marked `out_of_stock` only when **all** tracked variations are out. An item with some in-stock and some out-of-stock sizes remains orderable.

## Data Flow

### Menu Display
1. User visits `/order`
2. Server component calls `fetchCatalog(locationId)` directly (no API route needed for SSR)
3. Returns `CatalogCategory[]` → passed to client components
4. `FeaturedCarousel` renders the "Most popular" row
5. `CategoryNav` renders pills, `ItemGrid` renders cards per category

### Adding to Cart
1. User taps `ItemCard` → `ItemModal` opens (bottom sheet)
2. User selects variation, modifiers, quantity
3. Taps "Add to order" → `CartProvider` adds `CartItem` to state + localStorage
4. `CartBar` updates with new count + total

### Checkout
1. User taps "Checkout" in `CartView`
2. Client POSTs to `/api/square/order` with cart items + location
3. Server calls `paymentLinks.create()` (creates order + payment link)
4. Server returns `{ checkoutUrl, orderId }`
5. Client redirects to Square-hosted checkout
6. Customer pays on Square's page
7. Square redirects to `/order/confirmation`

## Deliverable Status

| # | Deliverable | Status |
|---|---|---|
| D1 | Foundation + Catalog | ✅ Done |
| D2 | Order Page (mobile-first) | ✅ Done |
| D3 | Item Detail (bottom sheet) | ✅ Done |
| D4 | Cart System | ✅ Done |
| D5 | Location Picker | ✅ Done |
| D6 | Checkout Flow | ✅ Done |
| D7 | Confirmation Page | ✅ Done |
| D8 | Polish | ✅ Done |

## Reusability

The `lib/square/` layer is designed to be lifted into any coffee shop (or restaurant) project:
- No Mokha-specific logic — just Square API normalization
- Types are POS-agnostic (could be adapted to Toast, Clover, etc.)
- Components in `components/order/` are generic ordering UI patterns

To reuse for another shop:
1. Copy `lib/square/` and `components/order/`
2. Set the new shop's Square credentials in `.env.local`
3. Update `config.ts` with the shop's featured items and category display order
4. Adjust styling (colors, fonts) in CSS
5. Deploy
