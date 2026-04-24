import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Reveal from '../components/Reveal';

const FAQ_ITEMS = [
  {
    id: 'shipping',
    q: 'How long does shipping take?',
    a: 'Pan-India shipping is 2–4 business days with tracked couriers. International orders typically take 7–12 days depending on the destination.'
  },
  {
    id: 'returns',
    q: 'What is your return policy?',
    a: 'We accept returns within 14 days of delivery, no questions asked. Returns are picked up from your door at no extra cost, as long as tags are intact.'
  },
  {
    id: 'sizing',
    q: 'How do I pick the right size?',
    a: 'Our tees run oversized with a dropped shoulder. If you are between sizes or prefer a regular fit, size down. A detailed size chart is linked on every product page.'
  },
  {
    id: 'wholesale',
    q: 'Do you do wholesale?',
    a: 'Yes — for stockist enquiries, write to hello@softcorner.com with your storefront, location, and estimated order size.'
  },
  {
    id: 'made',
    q: 'Where are your clothes made?',
    a: 'Everything is cut, sewn, and finished in small batches across India. We work with a handful of trusted mills and ateliers.'
  },
  {
    id: 'msme',
    q: 'Are you MSME / Udyam registered?',
    aNode: (
      <>
        Yes. Soft Corner is a registered MSME enterprise under the Udyam scheme.
        Our registration certificate is available{' '}
        <a href="/msme.html" target="_blank" rel="noreferrer" style={{ textDecoration: 'underline' }}>here</a>.
      </>
    )
  },
];

function FaqItem({ item, open, onToggle }) {
  return (
    <div id={item.id} className={`faq-item ${open ? 'open' : ''}`}>
      <button
        type="button"
        className="faq-trigger"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`${item.id}-panel`}
      >
        <span>{item.q}</span>
        <span className="faq-icon" aria-hidden="true" />
      </button>
      <div className="faq-panel" id={`${item.id}-panel`} role="region">
        <div className="faq-panel-inner">
          <div className="faq-a">{item.aNode || item.a}</div>
        </div>
      </div>
    </div>
  );
}

const ArrowUpRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [openIds, setOpenIds] = useState(() => new Set());
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);
    if (FAQ_ITEMS.some(i => i.id === id)) {
      setOpenIds(prev => {
        const next = new Set(prev);
        next.add(id);
        return next;
      });
    }
  }, [hash]);

  const toggleFaq = (id) => {
    setOpenIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    e.currentTarget.reset();
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <>
      <section className="page-header">
        <div className="container">
          <Reveal as="div" className="crumb">
            <Link to="/">Home</Link> <span>/</span> <span>Contact</span>
          </Reveal>
          <Reveal as="h1" variant="blur" delay={1}>Let's talk.</Reveal>
          <Reveal as="p" delay={2} className="sub">
            Questions about a piece, sizing, or wholesale — drop us a line below and
            we'll usually respond within a working day.
          </Reveal>
        </div>
      </section>

      <section style={{ paddingBottom: 'clamp(80px,12vw,160px)' }}>
        <div className="container">
          <div className="contact-grid">
            <Reveal className="contact-info">
              <div className="section-label">Reach us</div>
              <h2 className="section-title">We read every message.</h2>
              <p>For orders, returns, press, or wholesale — this inbox is the fastest way to us.</p>
              <a href="mailto:support@softcorner.com" className="email-link">support@softcorner.com</a>

              <ul className="info-list">
                <li><span>Studio</span><span>Bengaluru, India</span></li>
                <li><span>Hours</span><span>Mon–Sat · 10:00–19:00</span></li>
                <li><span>Wholesale</span><span>hello@softcorner.com</span></li>
                <li><span>Press</span><span>press@softcorner.com</span></li>
              </ul>
            </Reveal>

            <Reveal delay={1}>
              <form className="contact-form" onSubmit={onSubmit}>
                <div className="field">
                  <input type="text" id="name" placeholder=" " required />
                  <label htmlFor="name">Your name</label>
                </div>
                <div className="field">
                  <input type="email" id="email" placeholder=" " required />
                  <label htmlFor="email">Email address</label>
                </div>
                <div className="field">
                  <input type="text" id="topic" placeholder=" " />
                  <label htmlFor="topic">Topic (optional)</label>
                </div>
                <div className="field">
                  <textarea id="msg" placeholder=" " required />
                  <label htmlFor="msg">Message</label>
                </div>
                <button type="submit" className="btn filled" style={{ justifySelf: 'start' }}>
                  {sent ? 'Sent ✓' : 'Send message'} <ArrowUpRight />
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" id="faq" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="about-grid" style={{ marginBottom: 40 }}>
            <Reveal>
              <div className="section-label">Help</div>
              <h2 className="section-title">Frequently asked.</h2>
            </Reveal>
            <Reveal delay={1}>
              <p style={{ color: 'var(--muted)' }}>
                Everything we get asked the most, in one place. Still stuck? The form above
                lands straight in our inbox.
              </p>
            </Reveal>
          </div>

          <div className="faq">
            {FAQ_ITEMS.map(item => (
              <FaqItem
                key={item.id}
                item={item}
                open={openIds.has(item.id)}
                onToggle={() => toggleFaq(item.id)}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
