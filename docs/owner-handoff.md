# LAYTH STUDIO
### Digital Product & Engineering

---

# Mokha Coffee House — Project Summary
**Prepared for:** Jamal & the Mokha team
**Date:** March 30, 2026

---

## What We Built

A custom ordering website for Mokha Coffee House — designed to feel as intentional as the café itself. Every screen was crafted mobile-first, because that's how your customers will use it.

**Live at:** mokha-coffee-house.vercel.app

### Core Features
- **Online ordering for pickup** — Full menu pulled live from your Square catalog. Customers select a location, browse by category, customize items with modifiers, and check out through Square's secure payment page.
- **Two-location support** — Castledowns and Currents, with distance-based sorting using the customer's location.
- **Scheduled & ASAP ordering** — Pickup time selection driven by your actual Square business hours. ASAP is disabled when the store is closed.
- **Dedicated Beans page** — Showcases the Reserve Collection (single-origin beans and house blend) with storytelling, origin details, and direct links to order retail items for pickup.
- **Catering page** — Positions Mokha as a premium catering option with coffee service, tea, desserts, and full-service packages. Includes an inquiry form that emails your events team directly.
- **Brand experience pages** — Menu highlights, About (your origin story, the Ziara philosophy, timeline), Locations (directions, hours, ratings), and Contact.
- **Privacy Policy & Terms of Service** — Legally compliant pages covering PIPEDA requirements and Square's merchant terms.

### Under the Hood
- Secure API — your Square credentials are never exposed to browsers
- Rate limiting and order validation to prevent abuse
- Keyboard-accessible modals and forms
- SEO metadata on every page (titles, descriptions, Open Graph)
- Security headers (HSTS, X-Frame-Options, etc.)
- Mobile-first responsive design across all pages

---

## What's Next

| Item | Detail |
|------|--------|
| **Custom domain** | Connect your domain (e.g. mymokhacafe.com) to the live site via Vercel — takes ~10 minutes once you're ready. |
| **Item descriptions** | I'll draft descriptions for every menu item — you review and approve, then we publish. This makes the menu feel premium and helps with SEO. |
| **Delivery & shipping** | Delivery and shipping tabs on the order page link to your Square Online store with clear copy explaining the flow. Square Online handles delivery fees, DoorDash dispatch, and shipping natively. See roadmap below for bringing this fully on-site. |
| **Order notifications** | Explore automated SMS to customers when their order is marked complete in your KDS. |
| **Google Business integration** | Structured data (JSON-LD) so your menu and locations appear in Google Maps and "coffee near me" searches. |

### Delivery & Shipping — Current State & Roadmap

**What's live now:** The order page has Pickup, Delivery, and Shipping tabs. Pickup works natively on the custom site. Delivery and Shipping tabs redirect to your Square Online store, which handles the full experience — DoorDash dispatch for delivery, address collection, delivery fee calculation, and shipping method selection. The redirect copy clearly explains what to expect.

**Why delivery/shipping aren't native yet:** Square's Checkout API (Payment Links) only supports **pickup** fulfillment. It cannot calculate delivery fees, dispatch DoorDash drivers, or select shipping methods — those features only exist within Square Online. There is no API to replicate them on a custom site today.

**Path to fully native delivery/shipping:**

- **Square Delivery API (closed beta)** — Square's DELIVERY fulfillment type is currently invite-only. When it opens up, it would allow native delivery with DoorDash dispatch directly from the custom site. This is the cleanest path.
- **DoorDash Drive API (direct integration)** — Bypasses Square entirely for delivery. Requires a DoorDash developer account, sandbox build, live demo, and production approval. Base rate ~$9.75/delivery. Timeline: 2–3 weeks.
- **Square Web Payments SDK** — For shipping only. Would replace Payment Links with an embedded card form, allowing us to create orders with SHIPMENT fulfillment and collect addresses on-site. Timeline: 1–2 days for beans/retail shipping.

**Important:** Do NOT decommission the Square Online site. It handles delivery (DoorDash) and shipping orders. It must stay live until native alternatives are built.

---

## Ongoing Support

Layth Studio will continue to provide:

- **Maintenance & updates** — Bug fixes, Square API changes, and content updates
- **Feature development** — New capabilities as the business grows (loyalty, catering, merch)
- **Performance monitoring** — Ensuring the site stays fast and reliable
- **Design refinement** — Iterating on the experience based on real customer feedback

---

*Layth Studio — Built with craft. Delivered with care.*
