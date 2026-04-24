import { Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';
import MobileShelf from '../components/MobileShelf';
import Marquee from '../components/Marquee';
import Reveal from '../components/Reveal';

const ArrowUpRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function Home() {
  const featured = PRODUCTS.slice(0, 4);

  return (
    <>
      {/* HERO */}
      <header className="hero">
        <div className="container hero-grid">
          <div>
            <Reveal><div className="eyebrow"><span className="pulse"></span> Based in India. Shipping worldwide.</div></Reveal>
            <Reveal delay={1} variant="blur" as="h1">
              Comfort meets<br />
              everyday style —<br />
              clothing for modern<br />
              living.
            </Reveal>
            <Reveal delay={2} as="p" className="lead">
              Soft Corner is an emerging clothing label crafting essentials in
              breathable fabrics, considered fits, and quiet colour. Built for
              every hour of your day.
            </Reveal>
            <Reveal delay={3}>
              <Link to="/shop" className="btn filled hero-cta">
                Shop now <ArrowUpRight />
              </Link>
            </Reveal>
          </div>

          <Reveal delay={2} className="hero-media">
            <img src="/hero.jpeg" alt="Model wearing Soft Corner essentials" />
            <div className="tag">SS / 26 Collection</div>
          </Reveal>
        </div>
      </header>

      <Marquee items={['essentials', 'oversized', 'tees', 'everyday', 'cotton']} />

      {/* ABOUT */}
      <section className="section" id="about">
        <div className="container">
          <div className="about-grid">
            <Reveal>
              <div className="section-label">About</div>
              <h2 className="section-title">Quiet clothing for an everyday life.</h2>
            </Reveal>
            <Reveal delay={1}>
              <p>
                Soft Corner is an emerging clothing brand built around comfort, considered
                fabrics, and modern lifestyle. Every piece is designed to feel familiar from
                the first wear — soft cottons, boxed silhouettes, and warm colour.
              </p>
              <p>
                We work with small batches and trusted mills to keep quality high and waste
                low. The goal is simple: clothing you reach for every day.
              </p>
              <Link to="/about" className="btn" style={{ marginTop: 32 }}>
                Our story <ArrowUpRight />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="section" id="products" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="products-head">
            <Reveal>
              <div className="section-label">Selected Pieces</div>
              <h2 className="section-title">New arrivals</h2>
            </Reveal>
            <Reveal delay={1}><Link to="/shop" className="view-all">View all collection →</Link></Reveal>
          </div>
          <div className="products has-shelf">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <MobileShelf items={featured} />
        </div>
      </section>

      {/* WHY */}
      <section className="section" id="why" style={{ padding: '0 0 clamp(80px,12vw,160px)' }}>
        <div className="why">
          <div className="why-wrap">
            <Reveal>
              <div className="section-label">Why Soft Corner</div>
              <h2 className="section-title">Made with care, built to last.</h2>
            </Reveal>

            <div className="why-grid">
              <Reveal delay={1} className="why-card">
                <svg className="icon" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="1.4"/>
                  <circle cx="16" cy="16" r="6" stroke="currentColor" strokeWidth="1.4"/>
                </svg>
                <h3>Premium Fabric</h3>
                <p>Soft cottons and durable knits, sourced from trusted mills.</p>
              </Reveal>
              <Reveal delay={2} className="why-card">
                <svg className="icon" viewBox="0 0 32 32" fill="none">
                  <path d="M4 22l8-12 6 8 4-5 6 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h3>Honest Pricing</h3>
                <p>Direct-from-maker model — quality at a price that feels fair.</p>
              </Reveal>
              <Reveal delay={3} className="why-card">
                <svg className="icon" viewBox="0 0 32 32" fill="none">
                  <path d="M3 18h18l-3-3M3 18l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  <rect x="22" y="11" width="7" height="10" rx="1" stroke="currentColor" strokeWidth="1.4"/>
                </svg>
                <h3>Fast Delivery</h3>
                <p>Pan-India shipping in 2–4 days with tracked, carbon-aware partners.</p>
              </Reveal>
              <Reveal delay={4} className="why-card">
                <svg className="icon" viewBox="0 0 32 32" fill="none">
                  <path d="M27 16a11 11 0 11-3.2-7.8L27 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                  <path d="M27 5v6h-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h3>Easy Returns</h3>
                <p>14-day no-questions returns, picked up from your door.</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* SECONDARY PRODUCTS */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="products-head">
            <Reveal>
              <div className="section-label">Also loved</div>
              <h2 className="section-title">More from the shelf.</h2>
            </Reveal>
            <Reveal delay={1}><Link to="/shop" className="view-all">View all →</Link></Reveal>
          </div>
          <div className="products has-shelf">
            {PRODUCTS.slice(4, 8).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <MobileShelf items={PRODUCTS.slice(4, 8)} />
        </div>
      </section>
    </>
  );
}
