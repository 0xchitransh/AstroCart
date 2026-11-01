'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { GEMS, formatPrice, gemRingPrice, productFor, type Gem } from '@/data/products';
import { useStore } from '@/components/store/StoreProvider';
import { Reveal } from '@/components/ui/Reveal';

/** Orbit placement (percent of the diagram box). The Sun sits at the centre. Keyed by gem slug. */
const ORBITS: Record<string, { r: number; angle: number }> = {
  ruby: { r: 0, angle: 0 },
  emerald: { r: 22, angle: -55 },
  pearl: { r: 34, angle: 80 },
  diamond: { r: 22, angle: 125 },
  coral: { r: 34, angle: 205 },
  'yellow-sapphire': { r: 34, angle: 320 },
  'blue-sapphire': { r: 45, angle: 28 },
  hessonite: { r: 45, angle: 150 },
  'cats-eye': { r: 45, angle: 270 },
};

/** Only stones with a traditionally linked planet appear on the diagram. */
const PLANET_GEMS = GEMS.filter((g) => g.planet && ORBITS[g.slug]);

const place = (slug: string) => {
  const { r, angle } = ORBITS[slug];
  const rad = (angle * Math.PI) / 180;
  return { left: `${(50 + r * Math.cos(rad)).toFixed(2)}%`, top: `${(50 + r * Math.sin(rad)).toFixed(2)}%` };
};

export function CosmicConnection() {
  const { showCollection, openOverlay } = useStore();
  const [activeId, setActiveId] = useState<string>('ruby');
  const active: Gem = PLANET_GEMS.find((g) => g.slug === activeId) ?? PLANET_GEMS[0];
  const mensRing = productFor(active.slug, 'mens');
  const womensRing = productFor(active.slug, 'womens');

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

            {PLANET_GEMS.map((g) => (
              <button
                key={g.slug}
                type="button"
                className={`planet ${g.slug === 'ruby' ? 'planet--sun' : ''} ${g.slug === active.slug ? 'is-active' : ''}`}
                style={{ ...place(g.slug), ['--tone' as string]: g.tone }}
                aria-pressed={g.slug === active.slug}
                aria-label={`${g.planet}${g.planetLocal && g.planetLocal !== g.planet ? ` (${g.planetLocal})` : ''}, ${g.stone}`}
                onClick={() => setActiveId(g.slug)}
              >
                <span className="planet__orb" aria-hidden="true" />
                <span className="planet__label">{g.planet}</span>
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
                {active.planet}
                {active.planetLocal && active.planetLocal !== active.planet ? ` · ${active.planetLocal}` : ''}
              </p>
              <h3>{active.stone}</h3>
              <p>{active.desc}</p>
              <p className="cosmic__price">{active.stone} Ring · {formatPrice(gemRingPrice(active))}</p>
              <div className="cosmic__actions">
                {mensRing && (
                  <button type="button" className="btn btn--gold" onClick={() => openOverlay('quickview', { product: mensRing })}>
                    Men&apos;s ring <ArrowRight size={16} strokeWidth={1.75} />
                  </button>
                )}
                {womensRing && (
                  <button type="button" className="btn btn--gold" onClick={() => openOverlay('quickview', { product: womensRing })}>
                    Women&apos;s ring <ArrowRight size={16} strokeWidth={1.75} />
                  </button>
                )}
                <button type="button" className="btn btn--outline-light" onClick={() => showCollection(active.slug)}>
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
