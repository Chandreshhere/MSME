import { useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PRODUCTS, getProductById } from '../data/products';
import ProductCard from '../components/ProductCard';
import Reveal from '../components/Reveal';
import { useCart } from '../components/CartContext';

const ArrowUpRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function Product() {
  const { id } = useParams();
  const nav = useNavigate();
  const product = getProductById(id);
  const { add } = useCart();

  if (!product) {
    return (
      <section className="page-header" style={{ paddingBottom: 160 }}>
        <div className="container">
          <h1>Not found.</h1>
          <p className="sub">That piece isn't in our catalogue. Try browsing the full collection.</p>
          <Link to="/shop" className="btn filled" style={{ marginTop: 32 }}>Go to shop <ArrowUpRight /></Link>
        </div>
      </section>
    );
  }

  // Build a simple gallery (since we have one image per product, we vary through related pieces)
  const otherImages = useMemo(
    () => PRODUCTS.filter(p => p.id !== product.id).slice(0, 3).map(p => p.image),
    [product.id]
  );
  const gallery = [product.image, ...otherImages];
  const [activeImg, setActiveImg] = useState(0);

  const [size, setSize] = useState(product.sizes[Math.floor(product.sizes.length / 2)] || 'M');
  const [toast, setToast] = useState(false);

  const related = PRODUCTS.filter(p => p.id !== product.id).slice(0, 4);

  const onAdd = () => {
    add(product.id, size);
    setToast(true);
    setTimeout(() => setToast(false), 1600);
  };

  return (
    <>
      <section className="pd-wrap">
        <div className="container">
          <div className="crumb" style={{ marginBottom: 40 }}>
            <Link to="/">Home</Link> <span>/</span>
            <Link to="/shop">Shop</Link> <span>/</span>
            <span>{product.name}</span>
          </div>

          <div className="pd-grid">
            {/* GALLERY */}
            <div className="pd-gallery">
              <div className="pd-main" style={{ background: product.colorHex + '22' }}>
                <img src={gallery[activeImg]} alt={product.name} />
                <div className="zoom">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 10V4h6M20 14v6h-6M14 4h6v6M4 14v6h6" stroke="#0e0e0d" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </div>
              </div>
              <div className="pd-thumbs">
                {gallery.map((src, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`pd-thumb ${activeImg === i ? 'is-active' : ''}`}
                    onClick={() => setActiveImg(i)}
                    aria-label={`View image ${i + 1}`}
                  >
                    <img src={src} alt="" />
                  </button>
                ))}
              </div>
            </div>

            {/* INFO */}
            <div className="pd-info">
              <div className="pd-category">{product.category} · {product.color}</div>
              <h1 className="pd-title">{product.name}</h1>
              <p className="pd-tagline">{product.tagline}</p>

              <div className="pd-price">{product.currency} {product.price.toLocaleString('en-IN')}</div>
              <div className="pd-sep" />

              <div className="pd-row-label">
                <span>Size · {size}</span>
                <Link to="/contact#sizing">Size guide</Link>
              </div>
              <div className="sizes">
                {product.sizes.map(s => (
                  <button
                    key={s}
                    type="button"
                    className={`size ${size === s ? 'is-active' : ''}`}
                    onClick={() => setSize(s)}
                  >{s}</button>
                ))}
              </div>

              <div className="pd-cta">
                <button className="btn filled" onClick={onAdd}>
                  Add to bag <ArrowUpRight />
                </button>
                <button className="pd-wish" aria-label="Save to wishlist">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </button>
              </div>

              <div className="pd-meta">
                <details open>
                  <summary>Description</summary>
                  <div className="body">{product.description}</div>
                </details>
                <details>
                  <summary>Fabric & care</summary>
                  <div className="body">
                    {product.fabric}. Machine wash cold, inside-out. Line dry in shade. Iron low.
                  </div>
                </details>
                <details>
                  <summary>Shipping & returns</summary>
                  <div className="body">
                    Free delivery across India on orders above ₹ 1,499. Pan-India shipping in 2–4 days.
                    14-day no-questions-asked returns — picked up from your door.
                  </div>
                </details>
                <details>
                  <summary>Fit</summary>
                  <div className="body">
                    Model is 6'0" wearing size M. Oversized through the body with a dropped shoulder.
                    Size down for a regular fit.
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="products-head">
            <Reveal>
              <div className="section-label">You may also like</div>
              <h2 className="section-title">Pairs well with.</h2>
            </Reveal>
            <Reveal delay={1}><Link to="/shop" className="view-all">View all →</Link></Reveal>
          </div>
          <div className="products">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <div className={`toast ${toast ? 'show' : ''}`}>
        Added to bag — {product.name} · {size}
      </div>
    </>
  );
}
