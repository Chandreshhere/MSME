import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import Marquee from '../components/Marquee';

const ArrowUpRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const STATS = [
  { k: 'Founded', v: '2026' },
  { k: 'Based in', v: 'Bengaluru' },
  { k: 'Cotton', v: '100%' },
  { k: 'Returns', v: '14 days' },
];

const VALUES = [
  { num: '01', title: 'Fabric first', body: 'We start with the cloth — soft, breathable, long-lasting. The cut follows the fabric, never the other way round.' },
  { num: '02', title: 'Small batch', body: 'Smaller runs mean less waste and more attention per garment. No warehouses full of surplus stock.' },
  { num: '03', title: 'Quiet design', body: 'No loud logos or chasing trends. Clothes that still feel right three years from now.' },
];

const PROCESS = [
  { step: 'Step 01', title: 'Sketch', body: 'A small team sketches the season around a few core silhouettes.' },
  { step: 'Step 02', title: 'Source', body: 'Fabric is sourced in India from mills we already know and trust.' },
  { step: 'Step 03', title: 'Sample', body: 'We cut, wash, wear, and revise. Nothing ships until it feels right.' },
  { step: 'Step 04', title: 'Ship', body: 'Made in small runs, packed with care, and sent straight to your door.' },
];

export default function About() {
  return (
    <>
      {/* ───── HERO ───── */}
      <section className="about-hero">
        <div className="container">
          <Reveal as="div" className="crumb">
            <Link to="/">Home</Link> <span>/</span> <span>About</span>
          </Reveal>
          <Reveal as="h1" variant="blur" delay={1}>
            Clothing,<br />made quietly.
          </Reveal>
          <Reveal as="p" delay={2} className="sub">
            Soft Corner is an emerging Indian clothing brand building the kind of
            everyday essentials we wanted for ourselves — softer cottons,
            considered fits, and colours that sit calmly in a wardrobe.
          </Reveal>

          <div className="about-stats">
            {STATS.map((s, i) => (
              <Reveal key={s.k} delay={(i % 4) + 1} className="about-stat">
                <div className="k">{s.k}</div>
                <div className="v">{s.v}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───── STORY ───── */}
      <section className="story">
        <div className="container">
          <div className="story-inner">
            <Reveal>
              <div className="section-label">Our story</div>
              <h2>A brand built around the way you actually dress.</h2>
            </Reveal>
            <Reveal delay={1}>
              <p>
                We started Soft Corner in 2026 after spending years looking for the
                "forever" tee — the one that fits right, washes well, and keeps its
                colour. Instead of compromising, we made our own.
              </p>
              <p>
                Every piece is cut in small batches with trusted mills across India.
                We care about how a garment feels in the hand as much as how it looks
                on a body — and we'd rather do fewer things beautifully than chase
                every trend.
              </p>
            </Reveal>

            <Reveal delay={2} as="blockquote" className="pullquote">
              "We wanted a wardrobe that felt softer — clothes that don't
              ask for attention, just stay with you."
              <cite>— Founder's note</cite>
            </Reveal>

            <Reveal delay={1}>
              <p>
                This is clothing for the quiet part of your day — not a statement, just
                something you reach for. Made in India, sent with care, worn for a
                long time.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <Marquee items={['made in india', 'small batch', 'soft cotton', 'everyday', 'considered']} />

      {/* ───── VALUES ───── */}
      <section className="section" id="values">
        <div className="container">
          <Reveal>
            <div className="section-label">What we believe</div>
            <h2 className="section-title">The three things we won't compromise on.</h2>
          </Reveal>

          <div className="values-grid">
            {VALUES.map((v, i) => (
              <Reveal key={v.num} delay={(i % 3) + 1} className="value-card">
                <div className="num">{v.num}</div>
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───── PROCESS ───── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal>
            <div className="section-label">How we make</div>
            <h2 className="section-title">From fabric to wardrobe — four steps.</h2>
          </Reveal>

          <div className="process-grid">
            {PROCESS.map((p, i) => (
              <Reveal key={p.step} delay={(i % 4) + 1} className="process-step">
                <div className="step-num">{p.step}</div>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───── CTA ───── */}
      <div className="about-cta-wrap">
        <div className="why" style={{ margin: 0 }}>
          <div className="why-wrap">
            <div className="about-cta-grid">
              <Reveal>
                <div className="section-label">Next step</div>
                <h2 className="section-title">Ready to see the collection?</h2>
              </Reveal>
              <Reveal delay={1} className="about-cta-actions">
                <Link to="/shop" className="btn light">Shop now <ArrowUpRight /></Link>
                <Link to="/contact" className="btn light">Say hello <ArrowUpRight /></Link>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
