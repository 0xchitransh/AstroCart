'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES, GEMS, formatPrice, gemRingPrice, productFor, type Category } from '@/data/products';
import { useStore } from '@/components/store/StoreProvider';
import { Reveal } from '@/components/ui/Reveal';

export function GemstoneGuide() {
  const { showCollection, openOverlay } = useStore();
  const [activeId, setActiveId] = useState(GEMS[0].slug);
  const [cat, setCat] = useState<Category>('mens');
  const active = GEMS.find((g) => g.slug === activeId) ?? GEMS[0];
  const ring = productFor(active.slug, cat);

  const onTabKey = (e: React.KeyboardEvent, index: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft' && e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    e.preventDefault();
    const dir = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : -1;
    const next = GEMS[(index + dir + GEMS.length) % GEMS.length];
    setActiveId(next.slug);
    document.getElementById(`gem-tab-${next.slug}`)?.focus();
  };

  return (
    <section id="gemstone-guide" className="section guide" aria-labelledby="guide-title">
      <div className="container">
        <Reveal>
          <header className="section-head">
            <p className="eyebrow">Gemstone guide</p>
            <h2 id="guide-title" className="section-title">
              Know Your Stone
            </h2>
            <span className="ornament" aria-hidden="true" />
            <p className="section-head__sub">
              Choose a gemstone to read about it and see the ring that carries it.
            </p>
          </header>
        </Reveal>

        <Reveal delay={100}>
          <div className="guide__layout">
            <div className="guide__tabs" role="tablist" aria-label="Gemstones" aria-orientation="vertical">
              {GEMS.map((p, i) => (
                <button
                  key={p.slug}
                  id={`gem-tab-${p.slug}`}
                  type="button"
                  role="tab"
                  aria-selected={p.slug === activeId}
                  aria-controls="gem-panel"
                  tabIndex={p.slug === activeId ? 0 : -1}
                  className={`guide__tab ${p.slug === activeId ? 'is-active' : ''}`}
                  onClick={() => setActiveId(p.slug)}
                  onKeyDown={(e) => onTabKey(e, i)}
                >
                  <span className="guide__dot" style={{ background: p.tone }} aria-hidden="true" />
                  <span className="guide__tab-text">
                    <strong>{p.stone}</strong>
                    {p.stoneLocal && <small>{p.stoneLocal}</small>}
                  </span>
                </button>
              ))}
            </div>

            <div id="gem-panel" role="tabpanel" aria-labelledby={`gem-tab-${active.slug}`} className="guide__panel" key={active.slug}>
              <div className="guide__image">
                <Image
                  src={ring?.image ?? ''}
                  alt={ring?.name ?? active.stone}
                  fill
                  sizes="(max-width: 900px) 90vw, 40vw"
                />
              </div>
              <div className="guide__detail">
                {active.stoneLocal && <p className="eyebrow">{active.stoneLocal}</p>}
                <h3>{active.stone}</h3>
                <div className="segmented segmented--small" role="group" aria-label="Ring design">
                  {CATEGORIES.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      className={`segmented__btn ${cat === c.id ? 'is-active' : ''}`}
                      aria-pressed={cat === c.id}
                      onClick={() => setCat(c.id)}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
                <dl className="guide__meta">
                  {active.planet && (
                    <div>
                      <dt>Traditionally linked planet</dt>
                      <dd>
                        {active.planet}
                        {active.planetLocal && active.planetLocal !== active.planet ? ` (${active.planetLocal})` : ''}
                      </dd>
                    </div>
                  )}
                  <div>
                    <dt>Set in</dt>
                    <dd>Panchdhatu band</dd>
                  </div>
                  <div>
                    <dt>Ring price</dt>
                    <dd>{formatPrice(gemRingPrice(active))}</dd>
                  </div>
                </dl>
                <p className="guide__desc">{active.desc}</p>
                <p className="fineprint">
                  {active.planet
                    ? 'Associations follow Vedic tradition and are shared for information. They are a matter of belief, and no outcome is guaranteed.'
                    : 'Beliefs about gemstones are a matter of personal belief, and no outcome is guaranteed.'}
                </p>
                <div className="guide__actions">
                  <button type="button" className="btn btn--dark" onClick={() => showCollection(active.slug, cat)}>
                    Explore in collection <ArrowRight size={16} strokeWidth={1.75} />
                  </button>
                  <button
                    type="button"
                    className="btn btn--outline-dark"
                    onClick={() => ring && openOverlay('quickview', { product: ring })}
                  >
                    Quick view
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
