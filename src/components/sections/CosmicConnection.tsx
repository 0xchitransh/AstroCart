'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS, formatPrice, type Product } from '@/data/products';
import { useStore } from '@/components/store/StoreProvider';
import { Reveal } from '@/components/ui/Reveal';

/** Orbit placement (percent of the diagram box). The Sun sits at the centre. */
const ORBITS: Record<string, { r: number; angle: number }> = {
  ruby: { r: 0, angle: 0 },
  emerald: { r: 22, angle: -55 },
  'yellow-sapphire': { r: 34, angle: 205 },
  'blue-sapphire': { r: 45, angle: 28 },
};

const place = (id: string) => {
  const { r, angle } = ORBITS[id];
  const rad = (angle * Math.PI) / 180;
  return { left: `${(50 + r * Math.cos(rad)).toFixed(2)}%`, top: `${(50 + r * Math.sin(rad)).toFixed(2)}%` };
};

export function CosmicConnection() {
  const { showCollection, openOverlay } = useStore();
  const [activeId, setActiveId] = useState<string>('ruby');
  const active: Product = PRODUCTS.find((p) => p.id === activeId) ?? PRODUCTS[0];

  return (
    <section id="astrology" className="section cosmic" aria-labelledby="cosmic-title">
      <div className="container cosmic__grid">
        <Reveal>
          <div className="cosmic__diagram">
            <svg viewBox="0 0 100 100" className="cosmic__orbits" aria-hidden="true" focusable="false">
              {[22, 34, 45].map((r) => (
                <circle key={r} cx="50" cy="50" r={r} fill="none" stroke="currentColor" strokeWidth="0.25" vectorEffect="non-scaling-stroke" />
              ))}
              <circle cx="50" cy="50" r="49.4" fill="none" stroke="currentColor" strokeWidth="0.25" strokeDasharray="0.6 1.6" vectorEffect="non-scaling-stroke" />
            </svg>

            {PRODUCTS.map((p) => (
              <button
                key={p.id}
                type="button"
                className={`planet ${p.id === 'ruby' ? 'planet--sun' : ''} ${p.id === activeId ? 'is-active' : ''}`}
                style={{ ...place(p.id), ['--tone' as string]: p.tone }}
                aria-pressed={p.id === activeId}
                aria-label={`${p.planet} (${p.planetLocal}), ${p.stone}`}
                onClick={() => setActiveId(p.id)}
              >
                <span className="planet__orb" aria-hidden="true" />
                <span className="planet__label">{p.planet}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="cosmic__copy">
            <p className="eyebrow eyebrow--gold">Astrology experience</p>
            <h2 id="cosmic-title" className="section-title section-title--light">
              Find Your Cosmic Connection
            </h2>
            <span className="ornament ornament--left" aria-hidden="true" />
            <p className="cosmic__lede">
              In Vedic tradition each planet is linked with a gemstone. Select a planet to see its stone and
              the ring we make with it.
            </p>

            <div className="cosmic__card" aria-live="polite">
              <p className="eyebrow eyebrow--gold">
                {active.planet} · {active.planetLocal}
              </p>
              <h3>{active.stone}</h3>
              <p>{active.desc}</p>
              <p className="cosmic__price">{active.name} · {formatPrice(active.price)}</p>
              <div className="cosmic__actions">
                <button type="button" className="btn btn--gold" onClick={() => openOverlay('quickview', { product: active })}>
                  View ring <ArrowRight size={16} strokeWidth={1.75} />
                </button>
                <button type="button" className="btn btn--outline-light" onClick={() => showCollection(active.id)}>
                  Shop this stone
                </button>
              </div>
            </div>

            <p className="fineprint fineprint--light">
              Traditional associations, shared for information only. Beliefs about gemstones are personal and
              no result is guaranteed. Consult a qualified astrologer for personal guidance.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
