import React, { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const payload = Object.fromEntries(data.entries());
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Network error');
      setStatus('Sent!');
    } catch (err) {
      const query = new URLSearchParams(payload).toString();
      window.open(`mailto:example@example.com?${query}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} aria-label="contact form" className="space-y-2">
      <input name="name" placeholder="Name" required className="border p-2" />
      <input name="email" type="email" placeholder="Email" required className="border p-2" />
      <textarea name="message" placeholder="Message" required className="border p-2" />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">Send</button>
      {status && <p>{status}</p>}
    </form>
  );
}
