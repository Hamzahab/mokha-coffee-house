import type { Metadata } from 'next';
import { Reveal } from '@/components/Reveal';
import { ContactForm } from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Mokha Coffee House — general inquiries, event bookings, press, wholesale partnerships, and more.',
};

const contactDetails = [
  { label: 'General', value: 'hello@mymokhacafe.com', href: 'mailto:hello@mymokhacafe.com' },
  { label: 'Events', value: 'events@mymokhacafe.com', href: 'mailto:events@mymokhacafe.com' },
  { label: 'Press', value: 'press@mymokhacafe.com', href: 'mailto:press@mymokhacafe.com' },
  { label: 'Phone', value: '+1 (780) 000–0000', href: 'tel:+17800000000' },
  { label: 'Instagram', value: '@mokha_coffee_house', href: 'https://www.instagram.com/mokha_coffee_house/', external: true },
  { label: 'TikTok', value: '@mokhacoffeehouse', href: 'https://www.tiktok.com/@mokhacoffeehouse', external: true },
  { label: 'YouTube', value: '@mokhacoffeehouse', href: 'https://www.youtube.com/@mokhacoffeehouse', external: true },
];

const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/mokha_coffee_house/' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@mokhacoffeehouse' },
  { label: 'YouTube', href: 'https://www.youtube.com/@mokhacoffeehouse' },
];

const pressItems = [
  { cat: 'Events', title: 'Host at Mokha', desc: 'Private events, corporate gatherings, community nights. Our space becomes yours for the occasion.', email: 'events@mymokhacafe.com' },
  { cat: 'Press & Media', title: 'Tell Our Story', desc: 'For editorial features, photography, broadcast, or brand collaborations — we welcome storytellers.', email: 'press@mymokhacafe.com' },
  { cat: 'Wholesale', title: 'Our Beans, Your Bar', desc: 'Interested in stocking our house blend or single origins? We partner with businesses who share our standards.', email: 'hello@mymokhacafe.com' },
];

export default function ContactPage() {
  return (
    <>
      {/* HERO */}
      <header className="contact-hero">
        <div className="contact-hero-orb" />
        <Reveal as="p" className="eyebrow light">Reach Out</Reveal>
        <Reveal as="h1" className="rd1">Get in<br /><em>touch.</em></Reveal>
        <Reveal as="p" className="contact-hero-sub rd2">Our door is always open, and so is our inbox. Whether it&rsquo;s events, press, partnerships, or simply a hello.</Reveal>
      </header>

      {/* CONTACT GRID */}
      <section className="contact-grid">
        {/* LEFT: details */}
        <div className="contact-col">
          <Reveal as="p" className="eyebrow">Contact Details</Reveal>
          <Reveal as="h2" className="sec-title rd1" style={{ fontSize: 'clamp(32px, 3.5vw, 48px)' }}>We&rsquo;d love to<br />hear from <em>you</em></Reveal>
          <div className="contact-list">
            {contactDetails.map((d) => (
              <Reveal key={d.label} className="contact-row">
                <span className="contact-label">{d.label}</span>
                <span className="contact-value">
                  <a href={d.href} {...(d.external ? { target: '_blank', rel: 'noreferrer' } : {})}>{d.value}</a>
                </span>
              </Reveal>
            ))}
          </div>
          <Reveal className="social-row rd2">
            {socials.map((s) => (
              <a key={s.label} className="social-btn" href={s.href} target="_blank" rel="noreferrer">{s.label}</a>
            ))}
          </Reveal>
        </div>

        <div className="contact-divider" />

        {/* RIGHT: form */}
        <div className="contact-col">
          <Reveal as="p" className="eyebrow">Send a Message</Reveal>
          <Reveal as="h2" className="sec-title rd1" style={{ fontSize: 'clamp(32px, 3.5vw, 48px)' }}>Let&rsquo;s start a<br /><em>conversation</em></Reveal>
          <Reveal className="rd2">
            <ContactForm />
          </Reveal>
        </div>
      </section>

      {/* PRESS / EVENTS / WHOLESALE */}
      <section style={{ background: 'var(--b2)', padding: 0 }}>
        <div className="press-strip">
          {pressItems.map((item, i) => (
            <Reveal key={item.cat} className={`press-item ${i > 0 ? `rd${i}` : ''}`}>
              <p className="press-category">{item.cat}</p>
              <h3 className="press-title">{item.title}</h3>
              <p className="press-desc">{item.desc}</p>
              <a className="press-email" href={`mailto:${item.email}`}>{item.email} →</a>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
