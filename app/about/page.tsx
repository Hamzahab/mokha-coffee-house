import Link from 'next/link';
import { Reveal } from '@/components/Reveal';

export default function AboutPage() {
  return (
    <>
      {/* PAGE HERO */}
      <header className="about-hero">
        <div className="about-hero-photo" />
        <div className="about-hero-gradient" />
        <div className="about-hero-orb" />
        <div className="about-hero-content">
          <Reveal as="p" className="eyebrow light">Our Roots</Reveal>
          <Reveal as="h1" className="rd1" style={{
            fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
            fontSize: 'clamp(52px, 8vw, 108px)',
            fontWeight: 300,
            lineHeight: 0.94,
            color: 'var(--cream)',
          }}>
            <span style={{ display: 'block', fontWeight: 300, fontSize: '.82em', letterSpacing: '.01em', marginBottom: 6 }}>The story behind</span>
            <span style={{ display: 'block', fontStyle: 'italic', color: 'var(--gold)' }}>the cup.</span>
          </Reveal>
          <Reveal as="p" className="about-hero-sub rd2">Mokha is named after the Yemeni port city that gave the world its first coffee trade — a place where strangers became guests and guests became friends.</Reveal>
        </div>
      </header>

      {/* ORIGIN */}
      <section className="origin">
        <div className="origin-content">
          <Reveal as="p" className="eyebrow">The Origin</Reveal>
          <Reveal as="h2" className="sec-title rd1">An immigrant story,<br />a hospitality story,<br />a <em>coffee</em> story</Reveal>
          <Reveal as="p" className="sec-body rd2">Mokha was founded by a Yemeni family who carried the traditions of their home across oceans and planted them in the heart of Alberta. Edmonton is a city of immigrants — and Mokha is its coffee house.</Reveal>
          <Reveal as="p" className="sec-body rd2">The Port of Mocha was the world&rsquo;s first great coffee trade route. Ships from every nation stopped there. Cultures collided over a cup. That same energy lives in every corner of our café.</Reveal>
          <Reveal as="blockquote" className="pull-quote rd3">&ldquo;We didn&rsquo;t open a café. We opened our home.&rdquo;</Reveal>
        </div>
        <div className="origin-visual">
          <Reveal className="origin-glyph">موخا</Reveal>
          <Reveal className="origin-dates rd1">
            <div className="origin-date-row">
              <span className="origin-date">1450</span>
              <span className="origin-place">Yemen</span>
            </div>
            <div className="origin-date-row">
              <span className="origin-date">1600s</span>
              <span className="origin-place">Europe</span>
            </div>
            <div className="origin-date-row">
              <span className="origin-date">Today</span>
              <span className="origin-place">Edmonton</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FULL TIMELINE */}
      <section className="timeline-section" style={{ background: 'var(--b2)' }}>
        <div className="tl-overlay" style={{ display: 'none' }} />
        <div className="timeline-section-inner">
          <Reveal as="p" className="eyebrow light">Five Centuries</Reveal>
          <Reveal as="h2" className="sec-title light rd1">The long road<br />to <em>Edmonton</em></Reveal>
          <div className="tl-full">
            <Reveal className="tl-row">
              <span className="tl-year">1450</span>
              <span className="tl-event">The First Coffee Houses, Yemen</span>
              <span className="tl-desc">Sufi monks in the hills of Yemen brew the world&rsquo;s first recorded coffee drinks. The coffee house emerges as a space of contemplation, conversation, and connection.</span>
            </Reveal>
            <Reveal className="tl-row rd1">
              <span className="tl-year">1512</span>
              <span className="tl-event">Banned for Free Thought, Mecca</span>
              <span className="tl-desc">The Grand Sheikh of Mecca bans coffee houses — fearing they foster intellectual debate and the will to challenge authority. The ban is ignored. Coffee wins.</span>
            </Reveal>
            <Reveal className="tl-row rd2">
              <span className="tl-year">1600s</span>
              <span className="tl-event">The Penny University, Europe</span>
              <span className="tl-desc">Coffee houses spread as the engine of the Enlightenment. Newton, Voltaire, Lloyd&rsquo;s of London — all born in coffee houses. For the price of a penny, anyone could enter and debate.</span>
            </Reveal>
            <Reveal className="tl-row">
              <span className="tl-year">2020</span>
              <span className="tl-event">Mokha Opens, Edmonton</span>
              <span className="tl-desc">A generation hungry for real connection after years of distance. Mokha opens its doors — and its home — to everyone, regardless of origin.</span>
            </Reveal>
            <Reveal className="tl-row rd1">
              <span className="tl-year">Today</span>
              <span className="tl-event">Two Locations, One Community</span>
              <span className="tl-desc">Castledowns and Currents Drive. The same warmth, the same hospitality, the same cup. Growing — not just as a café, but as a community hub for Edmonton.</span>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WATCH OUR STORY */}
      <a className="watch-panel" href="https://www.youtube.com/watch?v=tcvGJZgFLjU" target="_blank" rel="noreferrer">
        <div className="watch-thumb" />
        <div className="watch-overlay" />
        <Reveal className="watch-inner">
          <div className="watch-play">
            <div className="watch-triangle" />
          </div>
          <p className="watch-label">Watch Our Story</p>
          <p className="watch-title">Inside Mokha —<br />from bean to cup to community.</p>
        </Reveal>
      </a>

      {/* ZIARA PHILOSOPHY */}
      <section className="ziara-philosophy" style={{ padding: 0 }}>
        <div className="zp-content">
          <Reveal as="p" className="eyebrow">The Philosophy</Reveal>
          <Reveal as="h2" className="sec-title rd1">Ziara —<br />the art of <em>visiting</em></Reveal>
          <Reveal as="p" className="sec-body rd2">In Arab culture, receiving a guest in your home is among the highest expressions of character. You don&rsquo;t merely serve them — you become responsible for their comfort, their joy, their memory of you.</Reveal>
          <Reveal as="p" className="sec-body rd2">At Mokha, every person who walks through our door is a guest in our home. From the first interaction to the last sip.</Reveal>
          <Reveal className="rd3"><Link className="tlink" href="/menu">View our menu</Link></Reveal>
        </div>
        <div className="zp-visual">
          {[
            { num: '01', title: 'Welcome', body: 'From the moment a guest walks in, they are received. Eye contact, a greeting, an immediate sense that they belong here.' },
            { num: '02', title: 'Cup', body: 'Every drink is made with the same care as something prepared for a guest in your home. No shortcuts. No indifference.' },
            { num: '03', title: 'Stay', body: "Guests are never hurried. The 90-minute average stay isn\u2019t a quirk — it\u2019s the point. A good host makes you want to linger." },
            { num: '04', title: 'Memory', body: "Every guest leaves with a feeling. That feeling is Mokha\u2019s true product — not the coffee, but the experience of having been genuinely welcomed." },
          ].map((p, i) => (
            <Reveal key={p.num} className={`zp-principle ${i > 0 ? `rd${i}` : ''}`}>
              <p className="zp-num">{p.num}</p>
              <p className="zp-title">The <em>{p.title}</em></p>
              <p className="zp-body">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FOUNDER */}
      <section className="founder">
        <div className="founder-orb" />
        <div className="founder-inner">
          <Reveal as="p" className="eyebrow light" style={{ justifyContent: 'center' }}>The Founder&rsquo;s Vision</Reveal>
          <Reveal as="blockquote" className="founder-quote rd1">&ldquo;I wanted to build a place where anyone in Edmonton could walk in and feel like they were visiting a friend&rsquo;s home — regardless of where they came from.&rdquo;</Reveal>
          <Reveal as="p" className="founder-name rd2">Jamal</Reveal>
          <Reveal as="p" className="founder-title rd2">Founder, Mokha Coffee House</Reveal>
          <Reveal className="founder-cta rd3">
            <Link className="btn-primary" href="/locations">Visit Us</Link>
            <Link className="btn-outline" href="/contact">Get in Touch</Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
