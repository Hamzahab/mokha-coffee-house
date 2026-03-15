import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { BeanParallax } from '@/components/BeanParallax';
import { LazyYouTube } from '@/components/LazyYouTube';

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-photo" />
        <div className="hero-photo-fade" />
        <div className="hero-orb orb-1" />
        <div className="hero-orb orb-2" />
        <div className="hero-orb orb-3" />
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="line-1">Come as a stranger</span>
            <span className="line-2">Leave as family.</span>
          </h1>
          <p className="hero-eyebrow">
            <span />Yemeni Coffee House · Edmonton<span />
          </p>
          <div className="hero-divider" />
          <p className="hero-desc">Est. Port of Mocha · 15th Century</p>
        </div>
        <div className="hero-scroll">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-strip">
        <div className="marquee-track">
          {['Specialty Coffee', 'Port of Mocha · Yemen', 'Single Origin Beans', 'الزيارة · Ziara', 'Edmonton, Alberta', 'In-House Roasting', '90 Min Average Stay'].flatMap((text, i) => [
            <div key={`a${i}`} className="marquee-item">{text}<span className="marquee-dot" /></div>,
            <div key={`b${i}`} className="marquee-item">{text}<span className="marquee-dot" /></div>,
          ])}
        </div>
      </div>

      {/* ZIARA CONCEPT */}
      <section className="ziara" id="concept" style={{ padding: 0 }}>
        <div className="ziara-visual">
          <div className="ziara-photo" />
          <div className="ziara-photo-overlay" />
          <div className="frame-corner fc-tl" />
          <div className="frame-corner fc-tr" />
          <div className="frame-corner fc-bl" />
          <div className="frame-corner fc-br" />
        </div>
        <div className="ziara-content">
          <Reveal as="p" className="eyebrow">The Concept</Reveal>
          <Reveal as="h2" className="sec-title rd1">The art of<br /><em>Ziara</em></Reveal>
          <Reveal as="p" className="sec-body rd2">In Arabic, Ziara means visiting — and at Mokha, it is a philosophy. Every cup poured is an act of hospitality. Every table is a gathering of strangers who leave as friends.</Reveal>
          <Reveal as="p" className="sec-body rd2">Rooted in centuries-old Arabian coffee house tradition, we&rsquo;ve brought that warmth to the heart of Edmonton. This generation craves real connection — not curated feeds, but genuine human warmth.</Reveal>
          <Reveal className="rd3"><Link className="tlink" href="/about">Discover our roots</Link></Reveal>
        </div>
      </section>

      {/* HISTORY */}
      <section className="history-section" id="roots">
        <div className="history-content">
          <Reveal as="p" className="eyebrow light">Our Roots</Reveal>
          <Reveal as="h2" className="sec-title light rd1">500 years of<br />the <em>coffee house</em></Reveal>
          <Reveal as="p" className="sec-body light rd2" style={{ maxWidth: 560 }}>The Port of Mocha shaped the world&rsquo;s relationship with coffee. Merchants, scholars, travellers — all stopped at this Yemeni port where cultures met over a perfect cup. We carry that legacy to Edmonton.</Reveal>
          <div className="timeline-grid">
            <Reveal className="timeline-item">
              <p className="timeline-date">1450 — Yemen</p>
              <h3 className="timeline-event">The First Coffee Houses</h3>
              <p className="timeline-desc">Sufi monks in the hills of Yemen brew the world&rsquo;s first recorded coffee. The coffee house is born as a space for contemplation, debate, and connection.</p>
            </Reveal>
            <Reveal className="timeline-item rd1">
              <p className="timeline-date">1512 — Mecca</p>
              <h3 className="timeline-event">Banned for Free Thought</h3>
              <p className="timeline-desc">The Grand Sheikh of Mecca bans coffee houses — fearing intellectual debate and the will to challenge authority. The ban is ignored. Coffee wins.</p>
            </Reveal>
            <Reveal className="timeline-item rd2">
              <p className="timeline-date">Today — Edmonton</p>
              <h3 className="timeline-event">Mokha Opens Its Doors</h3>
              <p className="timeline-desc">A city built by newcomers. A generation hungry for real connection. Mokha opens as the port where everyone docks — regardless of origin.</p>
            </Reveal>
          </div>
          <div style={{ marginTop: 52 }}>
            <Link className="tlink" href="/about">Read the full story</Link>
          </div>
        </div>
      </section>

      {/* BEAN BREAK — parallax + centered quote */}
      <div className="bean-break" id="beanBreak">
        <div className="bean-photo" id="beanPhoto" />
        <div className="bean-scrim" />
        <div className="bean-fade-top" />
        <div className="bean-fade-bottom" />
        <div className="bean-quote-block" id="beanQuote">
          <div className="bean-quote-rule" />
          <p className="bean-quote-text">
            Where coffee was born,<br />
            we learned to <em>listen</em>.
          </p>
          <div className="bean-quote-rule-bottom" />
        </div>
        <div className="bean-caption" id="beanCaption">
          <div className="bean-caption-line" />
          <span className="bean-caption-text">Haraz Mountains · Yemen · Single Origin</span>
        </div>
        <BeanParallax />
      </div>

      {/* ATMOSPHERE — text left, video right */}
      <section className="atmosphere" id="atmosphere" style={{ padding: 0 }}>
        <div className="atm-content">
          <Reveal as="p" className="eyebrow">The Atmosphere</Reveal>
          <Reveal as="h2" className="sec-title rd1">More than<br /><em>coffee</em></Reveal>
          <Reveal as="p" className="sec-body rd2">When guests average ninety minutes, they&rsquo;re not just here for the drink. They&rsquo;re here for the conversation, the energy, the feeling of belonging. That&rsquo;s what we&rsquo;ve built.</Reveal>
          <Reveal as="p" className="sec-body rd2">Mokha is the living room this city didn&rsquo;t know it needed — where a university student, an immigrant family, and a first date can all feel equally at home at adjacent tables.</Reveal>
          <Reveal className="rd3"><Link className="tlink" href="/about">Our philosophy</Link></Reveal>
        </div>
        <LazyYouTube
          className="atm-video"
          src="https://www.youtube.com/embed/tcvGJZgFLjU?controls=0&rel=0&playsinline=1&autoplay=1&mute=1&loop=1&playlist=tcvGJZgFLjU&cc_load_policy=0&start=2&modestbranding=1"
          title="Mokha Coffee House"
        />
      </section>

      {/* VISIT CTA */}
      <section className="visit-cta" id="visit">
        <div className="ring-pulse rp1" />
        <div className="ring-pulse rp2" />
        <div className="ring-pulse rp3" />
        <div className="visit-inner">
          <Reveal as="p" className="visit-eyebrow">Open Daily · Two Edmonton Locations</Reveal>
          <Reveal as="h2" className="visit-title rd1">Come<br /><em>visit us</em></Reveal>
          <Reveal className="visit-buttons rd2">
            <Link className="btn-primary" href="/menu">View Full Menu</Link>
            <Link className="btn-dark" href="/locations">Get Directions</Link>
          </Reveal>
          <Reveal className="visit-info rd3">
            <div className="info-item">
              <p className="info-label">Castledowns Hours</p>
              <p className="info-value">Mon–Sun · 8am – 12am</p>
            </div>
            <div className="info-item">
              <p className="info-label">Currents Hours</p>
              <p className="info-value">Mon–Sun · 9am – 11pm</p>
            </div>
            <div className="info-item">
              <p className="info-label">Reservations</p>
              <p className="info-value">Walk-in always welcome</p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
