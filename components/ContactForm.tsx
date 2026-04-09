'use client';

import { useState, type FormEvent } from 'react';

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      topic ? `${topic} — from ${name}` : `Message from ${name}`,
    );
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nTopic: ${topic || 'General'}\n\n${message}`,
    );
    window.location.href = `mailto:hello@mymokhacafe.com?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label" htmlFor="contact-name">Your Name</label>
        <input
          id="contact-name"
          className="form-input"
          placeholder="Jamal Al-Yemeni"
          required
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="contact-email">Email Address</label>
        <input
          id="contact-email"
          className="form-input"
          placeholder="hello@yourname.com"
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="contact-topic">Reason for Reaching Out</label>
        <select
          id="contact-topic"
          className="form-select"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        >
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
        <label className="form-label" htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          className="form-textarea"
          placeholder="Tell us what's on your mind..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <button
        className="btn-primary"
        style={{ width: '100%', textAlign: 'center', border: 'none', cursor: 'pointer', marginTop: 8 }}
        type="submit"
      >
        Send Message
      </button>
    </form>
  );
}
