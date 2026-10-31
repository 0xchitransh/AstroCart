'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS, formatPrice } from '@/data/products';
import { useStore } from '@/components/store/StoreProvider';
import { Reveal } from '@/components/ui/Reveal';

export function GemstoneGuide() {
  const { showCollection, openOverlay } = useStore();
  const [activeId, setActiveId] = useState(PRODUCTS[0].id);
  const active = PRODUCTS.find((p) => p.id === activeId) ?? PRODUCTS[0];

  const onTabKey = (e: React.KeyboardEvent, index: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft' && e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    e.preventDefault();
    const dir = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : -1;
    const next = PRODUCTS[(index + dir + PRODUCTS.length) % PRODUCTS.length];
    setActiveId(next.id);
    document.getElementById(`gem-tab-${next.id}`)?.focus();
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
              {PRODUCTS.map((p, i) => (
                <button
                  key={p.id}
                  id={`gem-tab-${p.id}`}
                  type="button"
                  role="tab"
                  aria-selected={p.id === activeId}
                  aria-controls="gem-panel"
                  tabIndex={p.id === activeId ? 0 : -1}
                  className={`guide__tab ${p.id === activeId ? 'is-active' : ''}`}
                  onClick={() => setActiveId(p.id)}
                  onKeyDown={(e) => onTabKey(e, i)}
                >
                  <span className="guide__dot" style={{ background: p.tone }} aria-hidden="true" />
                  <span className="guide__tab-text">
                    <strong>{p.stone}</strong>
                    <small>{p.stoneLocal}</small>
                  </span>
                </button>
              ))}
            </div>

            <div id="gem-panel" role="tabpanel" aria-labelledby={`gem-tab-${active.id}`} className="guide__panel" key={active.id}>
              <div className="guide__image">
                <Image
                  src={active.image}
                  alt={`${active.name}`}
                  fill
                  sizes="(max-width: 900px) 90vw, 40vw"
                />
              </div>
              <div className="guide__detail">
                <p className="eyebrow">{active.stoneLocal}</p>
                <h3>{active.stone}</h3>
                <dl className="guide__meta">
                  <div>
                    <dt>Traditionally linked planet</dt>
                    <dd>
                      {active.planet} ({active.planetLocal})
                    </dd>
                  </div>
                  <div>
                    <dt>Set in</dt>
                    <dd>Panchdhatu band</dd>
                  </div>
                  <div>
                    <dt>Ring price</dt>
                    <dd>{formatPrice(active.price)}</dd>
                  </div>
                </dl>
                <p className="guide__desc">{active.desc}</p>
                <p className="fineprint">
                  Associations follow Vedic tradition and are shared for information. They are a matter of
                  belief, and no outcome is guaranteed.
                </p>
                <div className="guide__actions">
                  <button type="button" className="btn btn--dark" onClick={() => showCollection(active.id)}>
                    Explore in collection <ArrowRight size={16} strokeWidth={1.75} />
                  </button>
                  <button
                    type="button"
                    className="btn btn--outline-dark"
                    onClick={() => openOverlay('quickview', { product: active })}
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
