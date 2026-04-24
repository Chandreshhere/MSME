import { useEffect, useRef } from 'react';

export default function Reveal({ as: Tag = 'div', delay = 0, variant = '', className = '', children, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { el.classList.add('in'); io.unobserve(el); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cls = [
    'reveal',
    variant ? `reveal-${variant}` : '',
    delay ? `delay-${delay}` : '',
    className
  ].filter(Boolean).join(' ');
  return <Tag ref={ref} className={cls} {...rest}>{children}</Tag>;
}
