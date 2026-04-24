import { useState } from 'react';
import ProductCard from './ProductCard';

export default function MobileShelf({ items }) {
  const [index, setIndex] = useState(0);

  if (!items?.length) return null;
  const len = items.length;
  const mod = (n) => ((n % len) + len) % len;

  const prevIdx = mod(index - 1);
  const nextIdx = mod(index + 1);

  const positionFor = (i) => {
    if (i === index) return 'center';
    if (i === prevIdx) return 'prev';
    if (i === nextIdx) return 'next';
    return 'far';
  };

  return (
    <div className="shelf-carousel" aria-roledescription="carousel">
      <div className="shelf-viewport">
        {/* Ghost sizer: invisible copy of the centered card that gives the
            viewport its natural height so the absolutely-positioned slides
            below always sit in the right place. */}
        <div className="shelf-ghost" aria-hidden="true">
          <ProductCard product={items[index]} />
        </div>

        {items.map((item, i) => {
          const pos = positionFor(i);
          return (
            <div
              key={item.id}
              className={`shelf-slide pos-${pos}`}
              aria-hidden={pos !== 'center'}
            >
              <ProductCard product={item} />
            </div>
          );
        })}
      </div>

      <div className="shelf-controls">
        <button
          type="button"
          className="shelf-arrow"
          aria-label="Previous product"
          onClick={() => setIndex(prevIdx)}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="shelf-dots" aria-hidden="true">
          {items.map((_, i) => (
            <span key={i} className={`shelf-dot ${i === index ? 'is-active' : ''}`} />
          ))}
        </div>

        <button
          type="button"
          className="shelf-arrow"
          aria-label="Next product"
          onClick={() => setIndex(nextIdx)}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
