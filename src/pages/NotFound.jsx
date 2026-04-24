import { Link } from 'react-router-dom';

const ArrowUpRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function NotFound() {
  return (
    <section className="page-header" style={{ paddingBottom: 200 }}>
      <div className="container">
        <div className="crumb"><Link to="/">Home</Link> <span>/</span> <span>404</span></div>
        <h1>404.</h1>
        <p className="sub">
          That page wandered off. Try heading back home or browse the collection.
        </p>
        <div style={{ display: 'flex', gap: 12, marginTop: 40, flexWrap: 'wrap' }}>
          <Link to="/" className="btn filled">Go home <ArrowUpRight /></Link>
          <Link to="/shop" className="btn">Shop <ArrowUpRight /></Link>
        </div>
      </div>
    </section>
  );
}
