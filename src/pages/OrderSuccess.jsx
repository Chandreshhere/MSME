import { Link, useParams } from 'react-router-dom';
import Reveal from '../components/Reveal';
import { useCart } from '../components/CartContext';

const ArrowUpRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const formatINR = (n) => `₹ ${n.toLocaleString('en-IN')}`;

export default function OrderSuccess() {
  const { id } = useParams();
  const { getOrder } = useCart();
  const order = getOrder(id);

  if (!order) {
    return (
      <section className="page-header" style={{ paddingBottom: 200 }}>
        <div className="container">
          <div className="crumb"><Link to="/">Home</Link> <span>/</span> <span>Order</span></div>
          <h1>Order not found.</h1>
          <p className="sub">We couldn't find an order with that reference. Try checking your bag or start a new one.</p>
          <div style={{ display: 'flex', gap: 12, marginTop: 40, flexWrap: 'wrap' }}>
            <Link to="/shop" className="btn filled">Shop <ArrowUpRight /></Link>
            <Link to="/" className="btn">Home <ArrowUpRight /></Link>
          </div>
        </div>
      </section>
    );
  }

  const placed = new Date(order.placedAt);
  const placedStr = placed.toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });

  return (
    <>
      <section className="page-header" style={{ paddingBottom: 40 }}>
        <div className="container">
          <Reveal as="div" className="crumb">
            <Link to="/">Home</Link> <span>/</span> <span>Order {order.id}</span>
          </Reveal>
          <Reveal className="order-success-eyebrow">
            <span className="pulse" /> Order placed
          </Reveal>
          <Reveal as="h1" variant="blur" delay={1}>
            Thank you.<br />Your order is in.
          </Reveal>
          <Reveal as="p" delay={2} className="sub">
            A confirmation has been sent to <strong style={{ color: 'var(--ink)' }}>{order.shipping.email}</strong>.
            We'll email you again as soon as it ships from our Bengaluru studio.
          </Reveal>
        </div>
      </section>

      <section style={{ paddingBottom: 'clamp(80px,12vw,160px)' }}>
        <div className="container">
          <div className="order-grid">
            {/* LEFT — items */}
            <div>
              <div className="order-head">
                <div>
                  <div className="order-kv-label">Order</div>
                  <div className="order-kv-value">{order.id}</div>
                </div>
                <div>
                  <div className="order-kv-label">Placed</div>
                  <div className="order-kv-value">{placedStr}</div>
                </div>
                <div>
                  <div className="order-kv-label">Payment</div>
                  <div className="order-kv-value">
                    {order.payment === 'cod' ? 'Cash on Delivery' : 'Prepaid (demo)'}
                  </div>
                </div>
              </div>

              <h3 className="order-section-title">Items</h3>
              <ul className="order-items">
                {order.items.map((i, idx) => (
                  <li key={idx}>
                    <div className="order-item-img">
                      <img src={i.image} alt={i.name} />
                      <span className="checkout-item-qty">{i.qty}</span>
                    </div>
                    <div className="order-item-body">
                      <div className="checkout-item-name">{i.name}</div>
                      <div className="checkout-item-meta">{i.color} · Size {i.size}</div>
                    </div>
                    <div className="checkout-item-price">{formatINR(i.lineTotal)}</div>
                  </li>
                ))}
              </ul>

              <div style={{ display: 'flex', gap: 12, marginTop: 40, flexWrap: 'wrap' }}>
                <Link to="/shop" className="btn filled">Continue shopping <ArrowUpRight /></Link>
                <Link to="/" className="btn">Back home <ArrowUpRight /></Link>
              </div>
            </div>

            {/* RIGHT — summary + shipping */}
            <aside className="cart-summary">
              <h3 className="cart-summary-title">Summary</h3>
              <div className="cart-summary-row"><span>Subtotal</span><span>{formatINR(order.subtotal)}</span></div>
              <div className="cart-summary-row"><span>Shipping</span><span>{order.shippingFee === 0 ? 'Free' : formatINR(order.shippingFee)}</span></div>
              <div className="cart-summary-row total"><span>Total</span><span>{formatINR(order.total)}</span></div>

              <h3 className="cart-summary-title" style={{ marginTop: 32 }}>Shipping to</h3>
              <address className="order-address">
                <strong>{order.shipping.fullName}</strong><br />
                {order.shipping.addressLine}<br />
                {order.shipping.city}, {order.shipping.state} {order.shipping.pincode}<br />
                {order.shipping.phone} · {order.shipping.email}
              </address>
              {order.shipping.notes && (
                <div className="order-notes"><strong>Notes:</strong> {order.shipping.notes}</div>
              )}
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
