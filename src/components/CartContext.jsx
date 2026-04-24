import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { PRODUCTS } from '../data/products';

const CartContext = createContext(null);

const CART_KEY = 'sc_cart_v1';
const ORDERS_KEY = 'sc_orders_v1';

const SHIPPING_FLAT = 99;
const FREE_SHIPPING_OVER = 1499;

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); }
    catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const add = useCallback((productId, size = 'M') => {
    setCart(prev => {
      const key = `${productId}|${size}`;
      const found = prev.find(i => i.key === key);
      if (found) return prev.map(i => i.key === key ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { key, id: productId, size, qty: 1 }];
    });
  }, []);

  const setQty = useCallback((key, qty) => {
    setCart(prev =>
      qty <= 0
        ? prev.filter(i => i.key !== key)
        : prev.map(i => i.key === key ? { ...i, qty } : i)
    );
  }, []);

  const increment = useCallback((key) => {
    setCart(prev => prev.map(i => i.key === key ? { ...i, qty: i.qty + 1 } : i));
  }, []);

  const decrement = useCallback((key) => {
    setCart(prev => prev
      .map(i => i.key === key ? { ...i, qty: i.qty - 1 } : i)
      .filter(i => i.qty > 0));
  }, []);

  const remove = useCallback((key) => {
    setCart(prev => prev.filter(i => i.key !== key));
  }, []);

  const clear = useCallback(() => setCart([]), []);

  const items = useMemo(() => cart.map(line => {
    const product = PRODUCTS.find(p => p.id === line.id);
    return product ? { ...line, product, lineTotal: product.price * line.qty } : null;
  }).filter(Boolean), [cart]);

  const count = useMemo(() => cart.reduce((n, i) => n + i.qty, 0), [cart]);
  const subtotal = useMemo(() => items.reduce((n, i) => n + i.lineTotal, 0), [items]);
  const shipping = useMemo(() => {
    if (items.length === 0) return 0;
    return subtotal >= FREE_SHIPPING_OVER ? 0 : SHIPPING_FLAT;
  }, [items.length, subtotal]);
  const total = subtotal + shipping;

  const placeOrder = useCallback((shippingInfo, payment = 'cod') => {
    const orderId = 'SC' + Date.now().toString().slice(-8);
    const order = {
      id: orderId,
      placedAt: new Date().toISOString(),
      items: items.map(i => ({
        id: i.id, size: i.size, qty: i.qty,
        name: i.product.name, color: i.product.color,
        image: i.product.image, price: i.product.price,
        lineTotal: i.lineTotal
      })),
      shipping: shippingInfo,
      payment,
      subtotal,
      shippingFee: shipping,
      total,
    };
    try {
      const existing = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
      existing.unshift(order);
      localStorage.setItem(ORDERS_KEY, JSON.stringify(existing));
    } catch { /* ignore */ }
    setCart([]);
    return order;
  }, [items, subtotal, shipping, total]);

  const getOrder = useCallback((orderId) => {
    try {
      const existing = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
      return existing.find(o => o.id === orderId) || null;
    } catch { return null; }
  }, []);

  return (
    <CartContext.Provider value={{
      cart, items, count, subtotal, shipping, total,
      add, setQty, increment, decrement, remove, clear,
      placeOrder, getOrder,
      freeShippingOver: FREE_SHIPPING_OVER,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
