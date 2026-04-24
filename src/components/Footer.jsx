import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <div className="footer-tag">Comfort meets everyday style.</div>
            <div className="socials">
              <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor"/></svg></a>
              <a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.56v14H.22V8zm7.34 0h4.36v1.93h.06c.61-1.09 2.1-2.24 4.32-2.24 4.62 0 5.47 3.04 5.47 6.99V22h-4.56v-6.4c0-1.53-.03-3.5-2.13-3.5-2.13 0-2.46 1.66-2.46 3.39V22H7.56V8z"/></svg></a>
              <a href="#" aria-label="Twitter"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2H21.5l-7.5 8.57L23 22h-6.7l-5.25-6.86L4.97 22H1.71l8.02-9.16L1 2h6.86l4.74 6.27L18.244 2zm-2.36 18h1.85L7.22 4H5.24l10.64 16z"/></svg></a>
              <a href="mailto:support@softcorner.com" aria-label="Email"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 7 9-7"/></svg></a>
            </div>
          </div>

          <div>
            <h4>Shop</h4>
            <Link to="/shop">All</Link>
            <Link to="/shop?filter=new">New arrivals</Link>
            <Link to="/shop?filter=best">Bestsellers</Link>
            <Link to="/shop">T-Shirts</Link>
          </div>
          <div>
            <h4>Company</h4>
            <Link to="/about">About</Link>
            <Link to="/about#values">Our values</Link>
            <Link to="/contact">Contact</Link>
            <a href="/msme.html" target="_blank" rel="noreferrer">MSME / Udyam</a>
          </div>
          <div>
            <h4>Help</h4>
            <Link to="/contact#shipping">Shipping</Link>
            <Link to="/contact#returns">Returns</Link>
            <Link to="/contact#sizing">Size guide</Link>
            <Link to="/contact#faq">FAQ</Link>
          </div>
        </div>

        <div className="footer-meta">
          <div>© 2026 Soft Corner — All rights reserved.</div>
          <div>MSME / Udyam Registered · Made in India</div>
        </div>

        <div className="footer-word">soft·corner</div>
      </div>
    </footer>
  );
}
