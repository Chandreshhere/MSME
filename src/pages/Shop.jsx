import { useMemo, useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';
import Reveal from '../components/Reveal';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'new', label: 'New arrivals' },
  { id: 'best', label: 'Bestsellers' },
  { id: 'light', label: 'Light tones' },
  { id: 'dark', label: 'Dark tones' },
];

const lightIds = ['p1', 'p3', 'p4', 'p6'];
const darkIds = ['p2', 'p5', 'p7', 'p8'];

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const initial = params.get('filter') || 'all';
  const [filter, setFilter] = useState(initial);
  const [sort, setSort] = useState('featured');

  useEffect(() => {
    if (filter === 'all') { params.delete('filter'); setParams(params, { replace: true }); }
    else { params.set('filter', filter); setParams(params, { replace: true }); }
  }, [filter]); // eslint-disable-line

  const list = useMemo(() => {
    let l = [...PRODUCTS];
    if (filter === 'new') l = l.filter(p => p.new);
    if (filter === 'best') l = l.filter(p => p.best);
    if (filter === 'light') l = l.filter(p => lightIds.includes(p.id));
    if (filter === 'dark') l = l.filter(p => darkIds.includes(p.id));

    if (sort === 'low') l.sort((a, b) => a.price - b.price);
    if (sort === 'high') l.sort((a, b) => b.price - a.price);
    if (sort === 'name') l.sort((a, b) => a.name.localeCompare(b.name));
    return l;
  }, [filter, sort]);

  return (
    <>
      <section className="page-header">
        <div className="container">
          <Reveal as="div" className="crumb">
            <Link to="/">Home</Link> <span>/</span> <span>Shop</span>
          </Reveal>
          <Reveal as="h1" variant="blur" delay={1}>The collection.</Reveal>
          <Reveal as="p" delay={2} className="sub">
            Everyday essentials in cotton, cut with room to breathe and coloured to last.
            Browse the full catalogue of the SS/26 drop below.
          </Reveal>
        </div>
      </section>

      <section style={{ paddingBottom: 'clamp(80px,12vw,160px)' }}>
        <div className="container">
          <div className="shop-bar">
            <div className="chips">
              {FILTERS.map(f => (
                <button
                  key={f.id}
                  className={`chip ${filter === f.id ? 'is-active' : ''}`}
                  onClick={() => setFilter(f.id)}
                >{f.label}</button>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span className="result-count">{list.length} piece{list.length !== 1 && 's'}</span>
              <select className="sort-select" value={sort} onChange={e => setSort(e.target.value)}>
                <option value="featured">Featured</option>
                <option value="low">Price · low to high</option>
                <option value="high">Price · high to low</option>
                <option value="name">Name · A→Z</option>
              </select>
            </div>
          </div>

          {list.length === 0 ? (
            <div style={{ padding: '80px 0', textAlign: 'center', color: 'var(--muted)' }}>
              No pieces match this filter yet.
            </div>
          ) : (
            <div className="products">
              {list.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
