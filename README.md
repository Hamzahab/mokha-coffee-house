# Mokha Next.js Conversion

This is a Vercel-ready Next.js + React + TypeScript + Tailwind project generated from the original static HTML site.

## Included

- App Router structure
- Shared React layout with reusable nav/footer
- Original site styling preserved through migrated global CSS
- Page content ported into React-rendered markup
- Original interactions reimplemented on the client:
  - custom cursor
  - reveal-on-scroll
  - nav scroll state
  - menu tabs
  - contact form success state
  - bean parallax section
- Asset migration for `origin-beans.jpg`

## Run locally

```bash
npm install
npm run dev
```

## Deploy to Vercel

1. Push this folder to GitHub
2. Import the repo into Vercel
3. Deploy with the default Next.js settings

## Environment Variables

Copy `.env.local.example` or create `.env.local` with:

```
SQUARE_ACCESS_TOKEN=...
SQUARE_APPLICATION_ID=...
SQUARE_ENVIRONMENT=production
SQUARE_LOCATION_ID_CASTLEDOWNS=...
SQUARE_LOCATION_ID_CURRENTS=...
NEXT_PUBLIC_LOCATION_ID_CASTLEDOWNS=...
NEXT_PUBLIC_LOCATION_ID_CURRENTS=...
NEXT_PUBLIC_BASE_URL=http://localhost:3000  # production: your Vercel domain
```

## Square Integration

The site uses the Square SDK for catalog, checkout, and business hours.

**Pickup ordering** is fully native — customers browse the live catalog, add items to cart, and check out via Square Payment Links with PICKUP fulfillment.

**Delivery and shipping** currently redirect to the Square Online store (`mokha-coffee-house-ltd.square.site`). This is intentional:

- Square's **Payment Links API only supports PICKUP** fulfillment. It cannot calculate delivery fees, dispatch DoorDash drivers, or handle shipping method selection.
- Square's **DELIVERY fulfillment type is in closed beta** and not available through the public API.
- The Square Online store has native DoorDash integration for delivery and built-in shipping — this is where those orders must be processed today.

### Future: Native Delivery & Shipping

To bring delivery/shipping fully on-site, the options are:

| Approach | Scope | Timeline |
|----------|-------|----------|
| **Square Delivery API** | Native delivery with DoorDash dispatch. Waiting on Square to open the beta. | Unknown (Square-dependent) |
| **DoorDash Drive API** | Direct integration bypassing Square. Requires dev account, sandbox build, live demo, and production approval. ~$9.75/delivery. | 2–3 weeks |
| **Square Web Payments SDK** | For shipping only. Replaces Payment Links with an embedded card form, enabling SHIPMENT fulfillment with on-site address collection. | 1–2 days |

**Do not decommission the Square Online site** until one of the above is implemented.

## Notes

The original visual system and page structure were preserved closely. Page content is rendered from React components while the shared chrome and interactive behavior use the App Router pattern.
