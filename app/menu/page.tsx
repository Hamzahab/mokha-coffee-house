import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Reveal } from '@/components/Reveal';
import { fetchCatalog } from '@/lib/square/catalog';
import { formatItemPriceFrom } from '@/lib/square/format';
import { MENU_HIGHLIGHTS } from '@/lib/square/config';
import type { CatalogMenuItem, CatalogCategory } from '@/lib/square/types';
import { reserveItems } from '@/lib/beans-data';

export const metadata: Metadata = {
  title: 'Menu',
  description: 'Explore our curated selection of single-origin coffee, traditional teas, house-made desserts, and retail bags. Order for pickup at any Mokha location.',
};

export const revalidate = 120;

/* ── helpers ── */

const HIGHLIGHT_COUNT = 3;

function resolveHighlightItems(
  allItems: CatalogMenuItem[],
  categories: CatalogCategory[],
  itemNames: string[],
  squareCategories: string[],
): CatalogMenuItem[] {
  const lowerNames = itemNames.map((n) => n.toLowerCase());
  const nameOrder = new Map(lowerNames.map((n, i) => [n, i]));

  const seenNames = new Set<string>();
  const byName = allItems
    .filter((item) => {
      const lower = item.name.toLowerCase();
      if (!nameOrder.has(lower) || !item.imageUrl || seenNames.has(lower)) return false;
      seenNames.add(lower);
      return true;
    })
    .sort(
      (a, b) =>
        (nameOrder.get(a.name.toLowerCase()) ?? 999) -
        (nameOrder.get(b.name.toLowerCase()) ?? 999),
    );

  if (byName.length >= HIGHLIGHT_COUNT) return byName.slice(0, HIGHLIGHT_COUNT);

  const seen = new Set(byName.map((i) => i.id));
  const lowerCats = new Set(squareCategories.map((c) => c.toLowerCase()));
  const backfill = categories
    .filter((cat) => lowerCats.has(cat.name.toLowerCase()))
    .flatMap((cat) => cat.items)
    .filter((item) => item.imageUrl && !seen.has(item.id));

  const combined = [...byName, ...backfill];
  return combined.slice(0, HIGHLIGHT_COUNT);
}

/* ── page ── */

export default async function MenuPage() {
  let highlights: { key: string; heading: string; description: string; items: CatalogMenuItem[] }[] = [];

  try {
    const categories = await fetchCatalog();
    const allItems = categories.flatMap((c) => c.items);

    highlights = MENU_HIGHLIGHTS.map((section) => ({
      key: section.key,
      heading: section.heading,
      description: section.description,
      items: resolveHighlightItems(allItems, categories, section.itemNames, section.squareCategories),
    }));
  } catch {
    // Catalog unavailable — highlights will be empty, page still renders editorial content
  }

  return (
    <>
      {/* HERO */}
      <header className="menu-hero">
        <div className="menu-hero-orb" />
        <Reveal as="p" className="eyebrow light" style={{ justifyContent: 'center', marginBottom: 20 }}>
          Curated Selection
        </Reveal>
        <Reveal as="h1" className="rd1">
          The<br /><em>menu</em>
        </Reveal>
        <Reveal as="p" className="menu-hero-sub rd2">
          Every item considered. Every bean traced. Every cup made for the person holding it.
        </Reveal>
      </header>

      {/* HIGHLIGHT SECTIONS */}
      <div className="menu-sections">
        {highlights.map((section) => (
          <section key={section.key} className="menu-section">
            <Reveal className="menu-section-header">
              <h2 className="menu-section-heading">{section.heading}</h2>
              <p className="menu-section-desc">{section.description}</p>
            </Reveal>

            {section.items.length > 0 && (
              <div className="menu-highlights-grid">
                {section.items.map((item, i) => (
                  <Reveal key={item.id} className={`menu-highlight-card ${i === 1 ? 'rd1' : i === 2 ? 'rd2' : ''}`}>
                    <Link href="/order" className="menu-highlight-link">
                      {item.imageUrl && (
                        <div className="menu-highlight-img-wrap">
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            width={400}
                            height={400}
                            sizes="(max-width: 600px) 80vw, 280px"
                            placeholder="blur"
                            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZThlMGQyIi8+PC9zdmc+"
                            className="menu-highlight-img"
                          />
                        </div>
                      )}
                      <h3 className="menu-highlight-name">{item.name}</h3>
                      <p className="menu-highlight-price">{formatItemPriceFrom(item)}</p>
                    </Link>
                  </Reveal>
                ))}
              </div>
            )}

            <Reveal className="menu-section-cta-wrap rd1">
              <Link href="/order" className="menu-section-cta">
                See all {section.heading.toLowerCase()} & order
                <span className="menu-section-cta-arrow">&rarr;</span>
              </Link>
            </Reveal>
          </section>
        ))}

        {/* RESERVE — editorial */}
        <section className="menu-section menu-section-reserve">
          <div className="reserve-header">
            <Reveal>
              <div className="reserve-badge">★ Reserve Collection</div>
            </Reveal>
            <Reveal className="rd1">
              <h2 className="reserve-title">The <em>Reserve</em></h2>
            </Reveal>
            <Reveal className="rd2">
              <p className="reserve-desc">
                Single-origin beans and our signature blend — roasted in small batches and available to take home.
                Each bag is traceable to its origin.
              </p>
            </Reveal>
          </div>
          <div className="menu-reserve-grid">
            {reserveItems.map((item, i) => (
              <Reveal key={item.cat + i} className={`menu-card reserve-card ${i % 2 === 1 ? 'rd1' : ''}`}>
                <div className="origin-tag">{item.origin}</div>
                <p className="card-category">{item.cat}</p>
                <h3 className="card-name">{item.name}</h3>
                <p className="card-desc">{item.desc}</p>
                <div className="card-footer">
                  <p className="card-price">{item.price}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </div>

      {/* CTA BANNER */}
      <div className="menu-order-banner">
        <div>
          <p className="menu-order-banner-title">Ready to order?</p>
          <p className="menu-order-banner-desc">
            Browse the full menu, customize your drink, and pick up at your nearest location.
          </p>
        </div>
        <Link className="btn-primary" href="/order">Order for Pickup</Link>
      </div>
    </>
  );
}
