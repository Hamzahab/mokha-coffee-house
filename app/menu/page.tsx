import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { TabsMenu } from '@/components/TabsMenu';

/* ── data ── */
const coffeeItems = [
  { cat: 'Espresso', name: ['House ', <em key="s">Signature</em>, ' Latte'], desc: 'Our house blend pulled at precision, with velvety steamed milk and a foam art finish.', price: '$7', num: '01' },
  { cat: 'Espresso', name: ['Double ', <em key="e">Espresso</em>], desc: 'Two perfectly pulled shots. Clean, structured, honest. The benchmark for everything we do.', price: '$5', num: '02' },
  { cat: 'Specialty', name: ['Cardamom ', <em key="c">Cloud</em>], desc: 'Espresso layered with cardamom-spiced milk foam. A nod to the Gulf tradition of qahwa.', price: '$8', num: '03' },
  { cat: 'Cold', name: ['Cold Brew ', <em key="n">Noir</em>], desc: 'Steeped 18 hours. Smooth, low-acid, deep. Served over a single large ice cube.', price: '$8', num: '04' },
  { cat: 'Drip', name: ['Pour ', <em key="o">Over</em>], desc: 'A slow, meditative ritual. Your choice of single origin, brewed to order at the bar.', price: '$9', num: '05' },
  { cat: 'Seasonal', name: ['Rotating ', <em key="f">Feature</em>], desc: "Our barista\u2019s current obsession. Changes monthly. Ask at the bar for today\u2019s offering.", price: 'Market', num: '06' },
];

const teaItems = [
  { cat: 'Traditional', name: ['Adani ', <em key="t">Tea</em>], desc: 'Loose-leaf Yemeni black tea, weighed to order. Brewed strong with a pour of evaporated milk.', price: '$6', num: '01' },
  { cat: 'Traditional', name: ['Mofowar ', <em key="b">Blend</em>], desc: 'A fragrant spiced blend — ginger, cinnamon, cardamom — steeped by hand. A ceremony in a cup.', price: '$6', num: '02' },
  { cat: 'Herbal', name: ['Mint ', <em key="r">Refresh</em>], desc: 'Fresh-steeped mint leaves with a touch of honey. Light, clean, and endlessly soothing.', price: '$6', num: '03' },
  { cat: 'Specialty', name: ['Saffron ', <em key="g">Gold</em>], desc: 'A rare Yemeni brew — saffron threads steeped with rose water and a pinch of cardamom.', price: '$9', num: '04' },
  { cat: 'Iced', name: ['Iced ', <em key="a">Adani</em>], desc: 'All the depth of the classic, chilled and poured over ice. Best enjoyed on a sun-lit afternoon.', price: '$7', num: '05' },
  { cat: 'Seasonal', name: ['Rotating ', <em key="bl">Blend</em>], desc: "Our tea house curator\u2019s monthly selection. Sourced globally, brewed with care. Ask the team.", price: 'Market', num: '06' },
];

const foodItems = [
  { cat: 'Pastry', name: ['Morning ', <em key="p">Provisions</em>], desc: 'Rotating pastries baked fresh daily. Buttery, layered, and made to be enjoyed at a table.', price: '$5–$7', num: '01' },
  { cat: 'Mezze', name: ['Shared ', <em key="pl">Plate</em>], desc: 'A spread of seasonal bites — warm bread, dips, and small plates prepared to be shared across a table.', price: '$16', num: '02' },
  { cat: 'Light Meal', name: ['Seasonal ', <em key="k">Kitchen</em>], desc: "Food prepared like a meal in our home. Rotating daily plates — ask your host what\u2019s on today.", price: 'Market', num: '03' },
];

const reserveItems = [
  { origin: 'Yemen · Haraz Mountains', cat: 'Reserve', name: ['Yemeni ', <em key="so">Single Origin</em>], desc: "The coffee that started everything. Traced to the Haraz highlands. Fruity, wine-forward, ancient terroir. Unlike anything you\u2019ve tasted before.", price: 'From $12', num: 'R1' },
  { origin: 'Ethiopia · Yirgacheffe', cat: 'Reserve', name: ['Yirgacheffe ', <em key="na">Natural</em>], desc: 'Naturally processed in the Gedeo highlands. Blueberry, jasmine, and a syrupy body. A truly singular cup.', price: 'From $11', num: 'R2' },
  { origin: 'Colombia · Huila', cat: 'Reserve', name: ['Huila ', <em key="w">Washed</em>], desc: 'A classic washed Colombian from a small Huila estate. Bright acidity, caramel sweetness, clean finish.', price: 'From $10', num: 'R3' },
  { origin: 'Panama · Geisha', cat: 'Reserve · Rare', name: ['Geisha ', <em key="an">Anaerobic</em>], desc: 'Limited availability. Anaerobically fermented Geisha from a Boquete micro-lot. Florals and tropical fruit — extraordinary.', price: 'From $18', num: 'R4' },
];

const inStoreTag = (
  <span style={{ fontSize: 8, letterSpacing: '.25em', textTransform: 'uppercase' as const, color: 'var(--gold3)', fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif", opacity: 0.6 }}>In-Store</span>
);

function MenuCard({ cat, name, desc, price, num, delay = '' }: { cat: string; name: React.ReactNode[]; desc: string; price: string; num: string; delay?: string }) {
  return (
    <Reveal className={`menu-card ${delay}`}>
      <p className="card-category">{cat}</p>
      <h3 className="card-name">{name}</h3>
      <p className="card-desc">{desc}</p>
      <div className="card-footer">
        <p className="card-price">{price}</p>
        {inStoreTag}
      </div>
      <span className="card-num">{num}</span>
    </Reveal>
  );
}

function ReserveCard({ origin, cat, name, desc, price, num, delay = '' }: { origin: string; cat: string; name: React.ReactNode[]; desc: string; price: string; num: string; delay?: string }) {
  return (
    <Reveal className={`menu-card reserve-card ${delay}`}>
      <div className="origin-tag">{origin}</div>
      <p className="card-category">{cat}</p>
      <h3 className="card-name">{name}</h3>
      <p className="card-desc">{desc}</p>
      <div className="card-footer">
        <p className="card-price">{price}</p>
        {inStoreTag}
      </div>
      <span className="card-num">{num}</span>
    </Reveal>
  );
}

const delays = ['', 'rd1', 'rd2', 'rd3', '', 'rd1'];

/* ── page ── */
export default function MenuPage() {
  const tabs = [
    {
      id: 'coffee',
      label: 'Coffee',
      content: (
        <div className="menu-grid">
          {coffeeItems.map((item, i) => (
            <MenuCard key={item.num} {...item} delay={delays[i]} />
          ))}
        </div>
      ),
    },
    {
      id: 'tea',
      label: 'Tea House',
      content: (
        <div className="menu-grid three-col">
          {teaItems.map((item, i) => (
            <MenuCard key={item.num} {...item} delay={delays[i]} />
          ))}
        </div>
      ),
    },
    {
      id: 'food',
      label: 'Kitchen',
      content: (
        <div className="menu-grid three-col">
          {foodItems.map((item, i) => (
            <MenuCard key={item.num} {...item} delay={delays[i]} />
          ))}
        </div>
      ),
    },
    {
      id: 'reserve',
      label: 'Reserve',
      reserve: true,
      content: (
        <>
          <div className="reserve-header">
            <div className="reserve-badge">★ Reserve Collection</div>
            <h2 className="reserve-title">The <em>Reserve</em></h2>
            <p className="reserve-desc">Our most exceptional coffees — rare origins, exceptional lots, served with ceremony. Each cup arrives with a short glass of sparkling water and a brief from our roaster.</p>
          </div>
          <div className="menu-grid two-col">
            {reserveItems.map((item, i) => (
              <ReserveCard key={item.num} {...item} delay={delays[i]} />
            ))}
          </div>
        </>
      ),
    },
  ];

  return (
    <>
      {/* MENU HERO */}
      <header className="menu-hero">
        <div className="menu-hero-orb" />
        <Reveal as="p" className="eyebrow light" style={{ justifyContent: 'center', marginBottom: 20 }}>Curated Selection</Reveal>
        <Reveal as="h1" className="rd1">The<br /><em>menu</em></Reveal>
        <Reveal as="p" className="menu-hero-sub rd2">Every item considered. Every bean traced. Every cup made for the person holding it.</Reveal>
      </header>

      {/* TABS + MENU BODY */}
      <TabsMenu tabs={tabs} />

      {/* ORDER ONLINE CTA */}
      <div className="menu-order-banner">
        <div>
          <p className="menu-order-banner-title">Ready to order?</p>
          <p className="menu-order-banner-desc">Browse the full menu, customize your drink, and pick up at your nearest location.</p>
        </div>
        <Link className="btn-primary" href="/order">Order for Pickup</Link>
      </div>
    </>
  );
}
