'use client';

import { useState, type FormEvent } from 'react';

export function CateringForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [eventType, setEventType] = useState('');
  const [guestCount, setGuestCount] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Catering Inquiry — ${eventType || 'General'} — from ${name}`,
    );
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nEvent Type: ${eventType || 'Not specified'}\nEstimated Guests: ${guestCount || 'Not specified'}\n\n${message}`,
    );
    window.location.href = `mailto:events@mymokhacafe.com?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="catering-form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="catering-name">Your Name</label>
          <input
            id="catering-name"
            className="form-input"
            placeholder="Jamal Al-Yemeni"
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="catering-email">Email Address</label>
          <input
            id="catering-email"
            className="form-input"
            placeholder="hello@yourcompany.com"
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="catering-form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="catering-phone">Phone Number</label>
          <input
            id="catering-phone"
            className="form-input"
            placeholder="+1 (780) 000-0000"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="catering-guests">Estimated Guests</label>
          <input
            id="catering-guests"
            className="form-input"
            placeholder="e.g. 50"
            type="number"
            min="1"
            value={guestCount}
            onChange={(e) => setGuestCount(e.target.value)}
          />
        </div>
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="catering-type">Type of Event</label>
        <select
          id="catering-type"
          className="form-select"
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
        >
          <option value="">Select event type</option>
          <option>Corporate Event</option>
          <option>Wedding or Engagement</option>
          <option>Private Gathering</option>
          <option>Community Event</option>
          <option>Conference or Workshop</option>
          <option>Other</option>
        </select>
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="catering-message">Tell Us About Your Event</label>
        <textarea
          id="catering-message"
          className="form-textarea"
          placeholder="Date, venue, dietary needs, any special requests..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <button
        className="btn-primary"
        style={{ width: '100%', textAlign: 'center', border: 'none', cursor: 'pointer', marginTop: 8 }}
        type="submit"
      >
        Send Inquiry
      </button>
    </form>
  );
}
