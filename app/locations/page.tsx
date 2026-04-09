import type { Metadata } from 'next';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'Locations',
  description: 'Visit Mokha Coffee House at Castledowns or Currents Drive in Edmonton, Alberta. Hours, directions, and parking info for both locations.',
};

const locations = [
  {
    num: 'Location 01',
    name: 'Castledowns',
    tagline: 'The original house',
    rows: [
      { label: 'Address', value: '5344 Admiral Girouard St' },
      { label: 'City', value: 'Edmonton, AB T5X 3N5' },
      { label: 'Hours', value: 'Mon–Sun · 8am – 12am' },
      { label: 'Parking', value: 'Street & lot available' },
      { label: 'Reservations', value: 'Walk-in always welcome' },
      { label: 'Rating', value: '4.9 ★★★★★' },
    ],
    mapQuery: '5344+Admiral+Girouard+St+Edmonton+AB',
  },
  {
    num: 'Location 02',
    name: 'Currents',
    tagline: 'The second home',
    rows: [
      { label: 'Address', value: '6089 Currents Dr NW' },
      { label: 'City', value: 'Edmonton, AB' },
      { label: 'Hours', value: 'Mon–Sun · 9am – 11pm' },
      { label: 'Parking', value: 'Free lot on site' },
      { label: 'Reservations', value: 'Walk-in always welcome' },
      { label: 'Rating', value: '4.9 ★★★★★' },
    ],
    mapQuery: '6089+Currents+Dr+NW+Edmonton+AB',
  },
];

function LocationCard({ loc }: { loc: typeof locations[number] }) {
  return (
    <div className="loc-card">
      <Reveal as="p" className="loc-number">{loc.num}</Reveal>
      <Reveal as="h2" className="loc-name rd1"><em>{loc.name}</em></Reveal>
      <Reveal as="p" className="loc-tagline rd1">{loc.tagline}</Reveal>
      <div className="loc-details">
        {loc.rows.map((row) => (
          <Reveal key={row.label} className="loc-row">
            <span className="loc-label">{row.label}</span>
            <span className="loc-value">{row.value}</span>
          </Reveal>
        ))}
      </div>
      <Reveal className="loc-buttons rd2">
        <a className="btn-primary" href={`https://maps.google.com/?q=${loc.mapQuery}`} target="_blank" rel="noreferrer">Get Directions</a>
        <Link className="btn-dark" href="/menu">Order Now</Link>
      </Reveal>
    </div>
  );
}

export default function LocationsPage() {
  return (
    <>
      {/* HERO */}
      <header className="loc-hero">
        <div className="loc-hero-orb" />
        <Reveal as="p" className="eyebrow light" style={{ justifyContent: 'center', marginBottom: 20 }}>Find Us</Reveal>
        <Reveal as="h1" className="rd1">Two homes.<br /><em>One city.</em></Reveal>
        <Reveal as="p" className="loc-hero-sub rd2">Both locations carry the same warmth, the same cup, and the same open door.</Reveal>
      </header>

      {/* LOCATION CARDS — grid: 1fr 1px 1fr */}
      <section className="locations-grid">
        <LocationCard loc={locations[0]} />
        <div className="loc-divider" />
        <LocationCard loc={locations[1]} />
      </section>

      {/* ATMOSPHERE STATS STRIP */}
      <div className="atm-strip">
        <Reveal className="atm-item">
          <p className="atm-num">90</p>
          <p className="atm-label">Average minutes per visit</p>
        </Reveal>
        <Reveal className="atm-item rd1">
          <p className="atm-num">4.9★</p>
          <p className="atm-label">Google rating</p>
        </Reveal>
        <Reveal className="atm-item rd2">
          <p className="atm-num">2</p>
          <p className="atm-label">Edmonton locations</p>
        </Reveal>
      </div>

      {/* VISIT INVITE */}
      <section className="visit-invite">
        <Reveal as="p" className="eyebrow" style={{ justifyContent: 'center' }}>Every day</Reveal>
        <Reveal as="h2" className="sec-title rd1" style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 20px' }}>No reservations.<br /><em>Just good company.</em></Reveal>
        <Reveal as="p" className="sec-body rd2" style={{ textAlign: 'center', margin: '0 auto 44px', maxWidth: 480 }}>No dress code. Just great coffee, good people, and a table that&rsquo;s yours as long as you want it.</Reveal>
        <Reveal className="rd3" style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link className="btn-primary" href="/menu">View Menu</Link>
          <Link className="btn-dark" href="/contact">Contact Us</Link>
        </Reveal>
      </section>
    </>
  );
}
