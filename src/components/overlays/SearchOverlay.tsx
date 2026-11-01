'use client';

import Image from 'next/image';
import { useDeferredValue, useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { PRODUCTS, formatPrice, metaLine } from '@/data/products';
import { useStore } from '@/components/store/StoreProvider';
import { Overlay } from '@/components/ui/Overlay';

export function SearchOverlay() {
  const { overlay, closeOverlay, openOverlay } = useStore();
  const [query, setQuery] = useState('');
  const deferred = useDeferredValue(query);

  const results = useMemo(() => {
    const q = deferred.trim().toLowerCase();
    if (!q) return PRODUCTS;
    // Every query word must start a word in the product text, so "men" does not also match "women's".
    const tokens = q.split(/\s+/);
    return PRODUCTS.filter((p) => {
      const hay = ` ${[p.name, p.stone, p.stoneLocal, p.planet, p.planetLocal, p.desc].filter(Boolean).join(' ')}`.toLowerCase();
      return tokens.every((t) => hay.includes(` ${t}`));
    });
  }, [deferred]);

  return (
    <Overlay open={overlay?.type === 'search'} onClose={closeOverlay} label="Search products" variant="search">
      <div className="search__bar">
        <Search size={22} strokeWidth={1.5} aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by stone, planet, men's or women's"
          aria-label="Search products"
          data-autofocus
        />
        <button type="button" className="icon-btn" aria-label="Close search" onClick={closeOverlay}>
          <X size={22} strokeWidth={1.5} />
        </button>
      </div>

      <div className="search__results" aria-live="polite">
        <p className="eyebrow">{deferred.trim() ? `${results.length} result${results.length === 1 ? '' : 's'}` : 'All rings'}</p>
        {results.length === 0 ? (
          <p className="empty">No rings match “{deferred}”. Try a stone such as ruby or a planet such as Saturn.</p>
        ) : (
          <ul>
            {results.map((p) => (
              <li key={p.id}>
                <button type="button" onClick={() => openOverlay('quickview', { product: p })}>
                  <span className="search__thumb">
                    <Image src={p.image} alt="" fill sizes="64px" />
                  </span>
                  <span className="search__text">
                    <strong>{p.name}</strong>
                    <small>{metaLine(p)}</small>
                  </span>
                  <span className="search__price">{formatPrice(p.price)}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Overlay>
  );
}
