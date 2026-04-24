import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import { useCart } from '../components/CartContext';

const ArrowUpRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const formatINR = (n) => `₹ ${n.toLocaleString('en-IN')}`;

export default function Cart() {
  const { items, count, subtotal, shipping, total, increment, decrement, remove, freeShippingOver } = useCart();

  if (items.length === 0) {
    return (
      <section className="page-header" style={{ paddingBottom: 160 }}>
        <div className="container">
          <Reveal as="div" className="crumb">
            <Link to="/">Home</Link> <span>/</span> <span>Bag</span>
          </Reveal>
          <Reveal as="h1" variant="blur" delay={1}>Your bag<br />is empty.</Reveal>
          <Reveal as="p" delay={2} className="sub">
            Nothing here yet — browse the collection and pick a piece you love.
            Your bag will keep whatever you add, even if you close the tab.
          </Reveal>
          <Reveal delay={3} style={{ display: 'flex', gap: 12, marginTop: 40, flexWrap: 'wrap' }}>
            <Link to="/shop" className="btn filled">Start shopping <ArrowUpRight /></Link>
            <Link to="/" className="btn">Back home <ArrowUpRight /></Link>
          </Reveal>
        </div>
      </section>
    );
  }

  const away = Math.max(0, freeShippingOver - subtotal);

  return (
    <>
      <section className="page-header" style={{ paddingBottom: 40 }}>
        <div className="container">
          <Reveal as="div" className="crumb">
            <Link to="/">Home</Link> <span>/</span> <span>Bag</span>
          </Reveal>
          <Reveal as="h1" variant="blur" delay={1}>Your bag.</Reveal>
          <Reveal as="p" delay={2} className="sub">
            {count} piece{count !== 1 ? 's' : ''} in your bag.{' '}
            {away > 0
              ? <>Add <strong style={{ color: 'var(--ink)' }}>{formatINR(away)}</strong> more to unlock free shipping.</>
              : <>You've unlocked free shipping.</>}
          </Reveal>
        </div>
      </section>

      <section style={{ paddingBottom: 'clamp(80px,12vw,160px)' }}>
        <div className="container">
          <div className="cart-grid">
            {/* LEFT — items */}
            <div className="cart-items">
              {items.map(item => (
                <article key={item.key} className="cart-line">
                  <Link to={`/product/${item.id}`} className="cart-line-img">
                    <img src={item.product.image} alt={item.product.name} />
                  </Link>

                  <div className="cart-line-body">
                    <div className="cart-line-top">
                      <div>
                        <Link to={`/product/${item.id}`} className="cart-line-name">
                          {item.product.name}
                        </Link>
                        <div className="cart-line-meta">
                          {item.product.category} · {item.product.color} · Size {item.size}
                        </div>
                      </div>
                      <div className="cart-line-price">{formatINR(item.lineTotal)}</div>
                    </div>

                    <div className="cart-line-bottom">
                      <div className="qty">
                        <button type="button" aria-label="Decrease quantity" onClick={() => decrement(item.key)}>−</button>
                        <span>{item.qty}</span>
                        <button type="button" aria-label="Increase quantity" onClick={() => increment(item.key)}>+</button>
                      </div>
                      <button type="button" className="cart-remove" onClick={() => remove(item.key)}>Remove</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* RIGHT — summary */}
            <aside className="cart-summary">
              <h3 className="cart-summary-title">Order summary</h3>

              <div className="cart-summary-row">
                <span>Subtotal</span>
                <span>{formatINR(subtotal)}</span>
              </div>
              <div className="cart-summary-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatINR(shipping)}</span>
              </div>
              <div className="cart-summary-row total">
                <span>Total</span>
                <span>{formatINR(total)}</span>
              </div>

              <Link to="/checkout" className="btn filled" style={{ width: '100%', justifyContent: 'center', marginTop: 24 }}>
                Checkout <ArrowUpRight />
              </Link>
              <Link to="/shop" className="cart-continue">Continue shopping →</Link>

              <ul className="cart-reassure">
                <li>Free returns within 14 days</li>
                <li>Shipped tracked from Bengaluru</li>
                <li>Secure checkout · test mode</li>
              </ul>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
