'use client';

import { useState, type FormEvent } from 'react';

export function ContactForm() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 0' }}>
        <p style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontSize: 28, fontStyle: 'italic', color: 'var(--gold)', marginBottom: 10 }}>Message sent.</p>
        <p style={{ fontSize: 13, color: 'var(--g)' }}>We&rsquo;ll be in touch soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">Your Name</label>
        <input className="form-input" placeholder="Jamal Al-Yemeni" required type="text" />
      </div>
      <div className="form-group">
        <label className="form-label">Email Address</label>
        <input className="form-input" placeholder="hello@yourname.com" required type="email" />
      </div>
      <div className="form-group">
        <label className="form-label">Reason for Reaching Out</label>
        <select className="form-select">
          <option value="">Select a topic</option>
          <option>General Inquiry</option>
          <option>Event Booking</option>
          <option>Press &amp; Media</option>
          <option>Wholesale / Partnerships</option>
          <option>Careers</option>
          <option>Feedback</option>
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Message</label>
        <textarea className="form-textarea" placeholder="Tell us what's on your mind..." />
      </div>
      <button className="btn-primary" style={{ width: '100%', textAlign: 'center', border: 'none', cursor: 'pointer', marginTop: 8 }} type="submit">Send Message</button>
    </form>
  );
}
