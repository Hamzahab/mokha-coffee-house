import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Reveal } from '@/components/Reveal';
import { reserveItems } from '@/lib/beans-data';
import { fetchCatalog } from '@/lib/square/catalog';
import { formatItemPriceFrom } from '@/lib/square/format';
import type { CatalogMenuItem } from '@/lib/square/types';

export const metadata: Metadata = {
  title: 'Our Beans',
  description: 'Single-origin beans and our signature espresso blend — roasted in small batches, traceable to their origin. Take the Mokha experience home.',
};

export const revalidate = 120;

export default async function BeansPage() {
  let retailItems: CatalogMenuItem[] = [];

  try {
    const categories = await fetchCatalog();
    const retailCat = categories.find(
      (c) => c.name.toLowerCase() === 'retail',
    );
    if (retailCat) {
      retailItems = retailCat.items.filter((item) => item.imageUrl);
    }
  } catch {
    // Catalog unavailable — page still renders editorial content
  }

  return (
    <>
      {/* HERO */}
      <header className="beans-hero">
        <div className="beans-hero-orb" />
        <Reveal as="p" className="eyebrow light" style={{ justifyContent: 'center', marginBottom: 20 }}>
          The Reserve
        </Reveal>
        <Reveal as="h1" className="rd1">
          Our<br /><em>beans</em>
        </Reveal>
        <Reveal as="p" className="beans-hero-sub rd2">
          Single-origin beans and our signature blend — roasted in small batches and traceable to their source. Take the Mokha experience home.
        </Reveal>
      </header>

      {/* PHILOSOPHY */}
      <section className="beans-philosophy">
        <div className="beans-philosophy-inner">
          <Reveal as="p" className="eyebrow">Our Approach</Reveal>
          <Reveal as="h2" className="sec-title rd1">From origin<br />to <em>cup</em></Reveal>
          <Reveal as="p" className="sec-body rd2">
            Every bag we sell carries the story of its land. We source directly from growers in Yemen, Ethiopia, Colombia, and Costa Rica — regions where coffee cultivation is an art passed down through generations.
          </Reveal>
          <Reveal as="p" className="sec-body rd3">
            Our beans are roasted in small batches to preserve the distinct character of each origin. No blending for convenience, no hiding behind dark roasts. What you taste is the terroir itself.
          </Reveal>
        </div>
      </section>

      {/* RESERVE COLLECTION — editorial cards */}
      <section className="beans-reserve" style={{ background: 'var(--b2)', padding: 0 }}>
        <div className="beans-reserve-inner">
          <div className="reserve-header" style={{ textAlign: 'center' }}>
            <Reveal>
              <div className="reserve-badge">★ Reserve Collection</div>
            </Reveal>
            <Reveal className="rd1">
              <h2 className="reserve-title">The <em>Reserve</em></h2>
            </Reveal>
            <Reveal className="rd2">
              <p className="reserve-desc">
                Single-origin beans and our signature blend — roasted in small batches and available to take home. Each bag is traceable to its origin.
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
                  <Link href="/order?category=retail" className="tlink" style={{ fontSize: 9 }}>
                    Order
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* LIVE RETAIL ITEMS from Square */}
      {retailItems.length > 0 && (
        <section className="beans-retail" style={{ background: 'var(--b2)' }}>
          <Reveal as="p" className="eyebrow light" style={{ justifyContent: 'center' }}>
            Also Available
          </Reveal>
          <Reveal as="h2" className="sec-title light rd1" style={{ textAlign: 'center' }}>
            Shop <em>retail</em>
          </Reveal>
          <div className="beans-retail-grid">
            {retailItems.map((item, i) => (
              <Reveal key={item.id} className={`beans-retail-card ${i % 2 === 1 ? 'rd1' : i % 3 === 2 ? 'rd2' : ''}`}>
                <Link href="/order?category=retail" className="beans-retail-link">
                  {item.imageUrl && (
                    <div className="beans-retail-img-wrap">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        width={400}
                        height={400}
                        sizes="(max-width: 600px) 80vw, 280px"
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZThlMGQyIi8+PC9zdmc+"
                        className="beans-retail-img"
                      />
                    </div>
                  )}
                  <h3 className="beans-retail-name">{item.name}</h3>
                  {item.description && (
                    <p className="beans-retail-desc">{item.description}</p>
                  )}
                  <p className="beans-retail-price">{formatItemPriceFrom(item)}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* CTA BANNER */}
      <div className="menu-order-banner">
        <div>
          <p className="menu-order-banner-title">Ready to order?</p>
          <p className="menu-order-banner-desc">
            Browse our full menu and order beans for pickup at your nearest location.
          </p>
        </div>
        <Link className="btn-primary" href="/order?category=retail">Order Beans</Link>
      </div>
    </>
  );
}
