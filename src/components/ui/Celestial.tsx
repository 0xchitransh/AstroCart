/** Decorative celestial artwork. Pure SVG/CSS, deterministic so server and client markup match. */

const pt = (r: number, deg: number) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return { x: (300 + r * Math.cos(a)).toFixed(2), y: (300 + r * Math.sin(a)).toFixed(2) };
};

const STAR = 'M0,-7 L1.7,-1.7 L7,0 L1.7,1.7 L0,7 L-1.7,1.7 L-7,0 L-1.7,-1.7Z';

export function ZodiacWheel({ className = '' }: { className?: string }) {
  const ticks = Array.from({ length: 72 }, (_, i) => i);
  const sectors = Array.from({ length: 12 }, (_, i) => i);
  const rays = Array.from({ length: 16 }, (_, i) => i);

  return (
    <svg
      className={`zodiac-wheel ${className}`}
      viewBox="0 0 600 600"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="300" cy="300" r="292" strokeWidth="1" />
      <circle cx="300" cy="300" r="268" strokeWidth="0.8" />
      <circle cx="300" cy="300" r="202" strokeWidth="0.8" />
      <circle cx="300" cy="300" r="132" strokeWidth="0.6" strokeDasharray="2 6" />
      <circle cx="300" cy="300" r="78" strokeWidth="0.8" />

      {ticks.map((i) => {
        const long = i % 6 === 0;
        const a = pt(268, i * 5);
        const b = pt(long ? 280 : 275, i * 5);
        return <line key={`t${i}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} strokeWidth={long ? 1 : 0.6} />;
      })}

      {sectors.map((i) => {
        const a = pt(202, i * 30);
        const b = pt(268, i * 30);
        return <line key={`s${i}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} strokeWidth="0.7" />;
      })}

      {sectors.map((i) => {
        const p = pt(235, i * 30 + 15);
        return (
          <path
            key={`m${i}`}
            d={STAR}
            transform={`translate(${p.x} ${p.y}) rotate(${i * 30 + 15})`}
            fill="currentColor"
            stroke="none"
            opacity="0.75"
          />
        );
      })}

      {rays.map((i) => {
        const a = pt(46, i * 22.5);
        const b = pt(i % 2 === 0 ? 68 : 60, i * 22.5);
        return <line key={`r${i}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} strokeWidth="0.9" />;
      })}
      <circle cx="300" cy="300" r="30" strokeWidth="1" />
      <circle cx="300" cy="300" r="18" strokeWidth="0.7" />
      <circle cx="300" cy="300" r="4" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Small set of slowly drifting gold motes. Fixed count keeps rendering cost negligible. */
export function Particles({ count = 26 }: { count?: number }) {
  return (
    <div className="particles" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => {
        const left = (i * 37 + 11) % 100;
        const top = (i * 53 + 7) % 100;
        const size = 1.5 + ((i * 7) % 4) * 0.75;
        const dur = 9 + ((i * 5) % 9);
        const delay = -((i * 3) % 11);
        return (
          <span
            key={i}
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              animationDuration: `${dur}s`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </div>
  );
}
