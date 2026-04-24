const Star = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
    <path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" stroke="#0e0e0d" strokeWidth="1.4"/>
  </svg>
);

export default function Marquee({ items }) {
  const list = [...items, ...items]; // duplicate for seamless loop
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {list.map((t, i) => (
          <div key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 80 }}>
            <span>{t}</span>
            <Star />
          </div>
        ))}
      </div>
    </div>
  );
}
