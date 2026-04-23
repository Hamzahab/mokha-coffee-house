import type { Metadata } from 'next';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { CateringForm } from '@/components/CateringForm';

export const metadata: Metadata = {
  title: 'Catering',
  description: 'Bring the Mokha experience to your event. Specialty coffee service, traditional teas, house-made desserts, and full-service catering for corporate events, weddings, and gatherings in Edmonton.',
};

export default function CateringPage() {
  return (
    <>
      {/* HERO */}
      <header className="catering-hero">
        <div className="catering-hero-orb" />
        <Reveal as="p" className="eyebrow light" style={{ justifyContent: 'center', marginBottom: 20 }}>
          Private Events & Catering
        </Reveal>
        <Reveal as="h1" className="rd1">
          Bring Mokha<br />to <em>you</em>
        </Reveal>
        <Reveal as="p" className="catering-hero-sub rd2">
          The warmth of our house — the coffee, the desserts, the hospitality — carried to your table, wherever it may be.
        </Reveal>
      </header>

      {/* INTRO + OFFERINGS as a single editorial flow */}
      <section className="catering-body">
        <div className="catering-body-inner">
          <Reveal as="p" className="eyebrow">The Experience</Reveal>
          <Reveal as="h2" className="sec-title rd1">More than a menu —<br />a <em>moment</em></Reveal>
          <Reveal as="p" className="sec-body rd2">
            When Mokha caters your event, we don&rsquo;t just drop off trays. We bring the same intention that defines every cup poured in our café — single-origin beans roasted in-house, desserts made by hand, and a team that treats your guests like our own.
          </Reveal>

          <div className="catering-services">
            <Reveal className="catering-service">
              <span className="catering-service-label">Coffee Service</span>
              <p className="catering-service-text">A full espresso bar or pour-over station staffed by our baristas. Single-origin beans, signature lattes, and traditional brews — served on-site at your venue.</p>
            </Reveal>
            <Reveal className="catering-service rd1">
              <span className="catering-service-label">Tea &amp; Specialty</span>
              <p className="catering-service-text">Adani tea, iced Spanish lattes, ceremonial serves. The full specialty menu with the same craft we pour in-house.</p>
            </Reveal>
            <Reveal className="catering-service rd2">
              <span className="catering-service-label">Dessert &amp; Bakery</span>
              <p className="catering-service-text">House-made baklava, Umm Ali, caramel milk cake, and seasonal platters — crafted to complement the coffee experience.</p>
            </Reveal>
            <Reveal className="catering-service rd3">
              <span className="catering-service-label">Full-Service Catering</span>
              <p className="catering-service-text">The complete Mokha experience. Coffee, tea, food, and dessert — composed as one. Customized to your event, your guests, your dietary needs.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="catering-process" style={{ background: 'var(--b2)', padding: 0 }}>
        <div className="catering-process-inner">
          <Reveal as="p" className="eyebrow light" style={{ justifyContent: 'center' }}>The Process</Reveal>
          <Reveal as="h2" className="sec-title light rd1" style={{ textAlign: 'center' }}>
            From inquiry to <em>execution</em>
          </Reveal>
          <Reveal className="catering-process-grid rd2">
            <div className="catering-process-step">
              <div className="catering-process-num">01</div>
              <div className="catering-process-rule" />
              <h3 className="catering-process-title">Inquire</h3>
              <p className="catering-process-body">Tell us about your event — the date, the size, the venue, and what you envision. No detail is too small.</p>
            </div>
            <div className="catering-process-step">
              <div className="catering-process-num">02</div>
              <div className="catering-process-rule" />
              <h3 className="catering-process-title">Design</h3>
              <p className="catering-process-body">We craft a menu and service plan tailored to your gathering. You taste, refine, and approve before the day.</p>
            </div>
            <div className="catering-process-step">
              <div className="catering-process-num">03</div>
              <div className="catering-process-rule" />
              <h3 className="catering-process-title">Experience</h3>
              <p className="catering-process-body">Our team arrives, sets up, and serves. You focus on your guests. We handle the rest — from first pour to last plate.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* INQUIRY FORM */}
      <section className="catering-inquiry">
        <div className="catering-inquiry-inner">
          <div className="catering-inquiry-text">
            <Reveal as="p" className="eyebrow">Get Started</Reveal>
            <Reveal as="h2" className="sec-title rd1">
              Let&rsquo;s plan<br />something <em>memorable</em>
            </Reveal>
            <Reveal as="p" className="sec-body rd2">
              Whether it&rsquo;s an intimate dinner for 20 or a corporate reception for 200 — fill out the form and our events team will be in touch within 24 hours.
            </Reveal>
            <Reveal className="rd3">
              <p className="catering-inquiry-direct">
                Or reach us directly at{' '}
                <a href="mailto:events@mymokhacafe.com">events@mymokhacafe.com</a>
              </p>
            </Reveal>
          </div>
          <Reveal className="catering-inquiry-form rd2">
            <CateringForm />
          </Reveal>
        </div>
      </section>

      {/* CTA BANNER */}
      <div className="menu-order-banner">
        <div>
          <p className="menu-order-banner-title">Want to visit us instead?</p>
          <p className="menu-order-banner-desc">
            Browse our full menu, order for pickup, or find your nearest location.
          </p>
        </div>
        <Link className="btn-primary" href="/order">Order for Pickup</Link>
      </div>
    </>
  );
}
