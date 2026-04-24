import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Reveal from '../components/Reveal';
import { useCart } from '../components/CartContext';

const ArrowUpRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const formatINR = (n) => `₹ ${n.toLocaleString('en-IN')}`;

export default function Checkout() {
  const { items, subtotal, shipping, total, placeOrder } = useCart();
  const navigate = useNavigate();
  const [payment, setPayment] = useState('cod');
  const [placing, setPlacing] = useState(false);

  if (items.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (placing) return;
    setPlacing(true);

    const fd = new FormData(e.currentTarget);
    const shippingInfo = {
      fullName: fd.get('fullName'),
      email: fd.get('email'),
      phone: fd.get('phone'),
      addressLine: fd.get('addressLine'),
      city: fd.get('city'),
      state: fd.get('state'),
      pincode: fd.get('pincode'),
      notes: fd.get('notes') || '',
    };

    setTimeout(() => {
      const order = placeOrder(shippingInfo, payment);
      navigate(`/order/${order.id}`, { replace: true });
    }, 600);
  };

  return (
    <>
      <section className="page-header" style={{ paddingBottom: 40 }}>
        <div className="container">
          <Reveal as="div" className="crumb">
            <Link to="/">Home</Link> <span>/</span>{' '}
            <Link to="/cart">Bag</Link> <span>/</span> <span>Checkout</span>
          </Reveal>
          <Reveal as="h1" variant="blur" delay={1}>Checkout.</Reveal>
          <Reveal as="p" delay={2} className="sub">
            Just a few details and we'll pack your pieces. This is a demo store — no real payment is taken.
          </Reveal>
        </div>
      </section>

      <section style={{ paddingBottom: 'clamp(80px,12vw,160px)' }}>
        <div className="container">
          <form className="checkout-grid" onSubmit={onSubmit}>
            {/* FORM */}
            <div className="checkout-form">
              <div className="checkout-section">
                <h3 className="checkout-title">Contact</h3>
                <div className="form-row">
                  <div className="field"><input type="text" name="fullName" id="fullName" placeholder=" " required /><label htmlFor="fullName">Full name</label></div>
                </div>
                <div className="form-row two">
                  <div className="field"><input type="email" name="email" id="email" placeholder=" " required /><label htmlFor="email">Email</label></div>
                  <div className="field"><input type="tel" name="phone" id="phone" placeholder=" " required pattern="[0-9+\-\s]{8,}" /><label htmlFor="phone">Phone</label></div>
                </div>
              </div>

              <div className="checkout-section">
                <h3 className="checkout-title">Shipping address</h3>
                <div className="form-row">
                  <div className="field"><input type="text" name="addressLine" id="addressLine" placeholder=" " required /><label htmlFor="addressLine">Street address</label></div>
                </div>
                <div className="form-row two">
                  <div className="field"><input type="text" name="city" id="city" placeholder=" " required /><label htmlFor="city">City</label></div>
                  <div className="field"><input type="text" name="state" id="state" placeholder=" " required /><label htmlFor="state">State</label></div>
                </div>
                <div className="form-row two">
                  <div className="field"><input type="text" name="pincode" id="pincode" placeholder=" " required pattern="[0-9]{4,10}" /><label htmlFor="pincode">Pincode</label></div>
                  <div className="field"><input type="text" name="notes" id="notes" placeholder=" " /><label htmlFor="notes">Delivery notes (optional)</label></div>
                </div>
              </div>

              <div className="checkout-section">
                <h3 className="checkout-title">Payment</h3>
                <div className="pay-options">
                  <label className={`pay-option ${payment === 'cod' ? 'is-active' : ''}`}>
                    <input type="radio" name="payment" value="cod" checked={payment === 'cod'} onChange={() => setPayment('cod')} />
                    <div>
                      <div className="pay-name">Cash on Delivery</div>
                      <div className="pay-sub">Pay when your order arrives at your door.</div>
                    </div>
                  </label>
                  <label className={`pay-option ${payment === 'prepaid' ? 'is-active' : ''}`}>
                    <input type="radio" name="payment" value="prepaid" checked={payment === 'prepaid'} onChange={() => setPayment('prepaid')} />
                    <div>
                      <div className="pay-name">Prepaid · UPI / Card (demo)</div>
                      <div className="pay-sub">Simulated only — no real charge.</div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* SUMMARY */}
            <aside className="cart-summary checkout-summary">
              <h3 className="cart-summary-title">Your order</h3>

              <ul className="checkout-items">
                {items.map(i => (
                  <li key={i.key}>
                    <div className="checkout-item-img">
                      <img src={i.product.image} alt={i.product.name} />
                      <span className="checkout-item-qty">{i.qty}</span>
                    </div>
                    <div className="checkout-item-body">
                      <div className="checkout-item-name">{i.product.name}</div>
                      <div className="checkout-item-meta">{i.product.color} · Size {i.size}</div>
                    </div>
                    <div className="checkout-item-price">{formatINR(i.lineTotal)}</div>
                  </li>
                ))}
              </ul>

              <div className="cart-summary-row"><span>Subtotal</span><span>{formatINR(subtotal)}</span></div>
              <div className="cart-summary-row"><span>Shipping</span><span>{shipping === 0 ? 'Free' : formatINR(shipping)}</span></div>
              <div className="cart-summary-row total"><span>Total</span><span>{formatINR(total)}</span></div>

              <button type="submit" className="btn filled" disabled={placing} style={{ width: '100%', justifyContent: 'center', marginTop: 24 }}>
                {placing ? 'Placing order…' : 'Place order'} <ArrowUpRight />
              </button>
              <Link to="/cart" className="cart-continue">← Back to bag</Link>
            </aside>
          </form>
        </div>
      </section>
    </>
  );
}
