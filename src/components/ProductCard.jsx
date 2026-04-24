import { Link } from 'react-router-dom';

export default function ProductCard({ product, className = '' }) {
  return (
    <Link to={`/product/${product.id}`} className={`product ${className}`}>
      <div className="product-img">
        {product.badge && <span className="badge">{product.badge}</span>}
        <img src={product.image} alt={product.name} loading="lazy" />
        <span className="quick" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 12L12 2M12 2H4M12 2V10" stroke="#0e0e0d" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>
      <div className="product-info">
        <div>
          <div className="product-name">{product.name}</div>
          <div className="product-cat">{product.category} · {product.color}</div>
        </div>
        <div className="product-price">{product.currency} {product.price.toLocaleString('en-IN')}</div>
      </div>
    </Link>
  );
}
