import { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useCart } from './CartContext';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const location = useLocation();

  useEffect(() => { setOpen(false); }, [location.pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <Link to="/" className="brand">
            soft<span className="dot">.</span><span className="sub">corner</span>
          </Link>

          <div className="nav-links">
            <NavLink to="/" end className={({ isActive }) => isActive ? 'is-active' : ''}>Home</NavLink>
            <NavLink to="/shop" className={({ isActive }) => isActive ? 'is-active' : ''}>Shop</NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? 'is-active' : ''}>About</NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? 'is-active' : ''}>Contact</NavLink>
          </div>

          <div className="nav-side">
            <Link to="/cart" className="nav-cta" aria-label={`Cart, ${count} item${count !== 1 ? 's' : ''}`}>
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M4 6h12l-1 10.5a1 1 0 0 1-1 .9H6a1 1 0 0 1-1-.9L4 6Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 6V4.5a3 3 0 0 1 6 0V6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
              <span className="cart-label">Bag</span>
              <span className="cart-count">{count}</span>
            </Link>
            <button
              className={`hamburger ${open ? 'open' : ''}`}
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen(v => !v)}
            >
              <i />
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu ${open ? 'open' : ''}`} aria-hidden={!open}>
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </>
  );
}
