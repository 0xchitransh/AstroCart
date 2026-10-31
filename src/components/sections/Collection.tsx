'use client';

import Image from 'next/image';
import { ArrowRight, Eye, Heart } from 'lucide-react';
import { PRODUCTS, formatPrice, type Product } from '@/data/products';
import { useStore } from '@/components/store/StoreProvider';
import { Reveal } from '@/components/ui/Reveal';

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { wishlist, toggleWishlist, openOverlay } = useStore();
  const saved = wishlist.includes(product.id);

  return (
    <article className="card" style={{ ['--i' as string]: index }}>
      <div className="card__media">
        <Image
          src={product.image}
          alt={`${product.name} with ${product.stone.toLowerCase()} set in a Panchdhatu band`}
          fill
          sizes="(max-width: 700px) 50vw, (max-width: 1100px) 50vw, 25vw"
        />
        <button
          type="button"
          className={`card__wish ${saved ? 'is-saved' : ''}`}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          onClick={() => toggleWishlist(product)}
        >
          <Heart size={18} strokeWidth={1.5} />
        </button>
        <button type="button" className="card__quick" onClick={() => openOverlay('quickview', { product })}>
          <Eye size={16} strokeWidth={1.5} /> Quick view
        </button>
      </div>
      <div className="card__body">
        <div className="card__text">
          <h3>{product.name}</h3>
          <p className="card__meta">
            {product.stone} <span aria-hidden="true">|</span>
            <span className="sr-only">,</span> {product.planet} ({product.planetLocal})
          </p>
        </div>
        <p className="card__price">{formatPrice(product.price)}</p>
        <button
          type="button"
          className="card__add"
          aria-label={`Choose size and add ${product.name} to bag`}
          title="Add to bag"
          onClick={() => openOverlay('config', { product })}
        >
          <ArrowRight size={18} strokeWidth={1.5} />
        </button>
      </div>
    </article>
  );
}

export function Collection() {
  const { filter, setFilter, wishlist } = useStore();

  const chips = [
    { id: 'all', label: 'All' },
    ...PRODUCTS.map((p) => ({ id: p.id, label: p.stone })),
    { id: 'saved', label: `Saved${wishlist.length ? ` (${wishlist.length})` : ''}` },
  ];

  const visible =
    filter === 'all'
      ? PRODUCTS
      : filter === 'saved'
        ? PRODUCTS.filter((p) => wishlist.includes(p.id))
        : PRODUCTS.filter((p) => p.id === filter);

  return (
    <section id="collection" className="section collection" aria-labelledby="collection-title">
      <div className="container">
        <Reveal>
          <header className="section-head">
            <p className="eyebrow">Our signature collection</p>
            <h2 id="collection-title" className="section-title">
              Shop by Gemstone
            </h2>
            <span className="ornament" aria-hidden="true" />
            <button type="button" className="link-arrow section-head__aside" onClick={() => setFilter('all')}>
              View All Products <ArrowRight size={15} strokeWidth={1.5} />
            </button>
          </header>
        </Reveal>

        <Reveal delay={80}>
          <div className="chips" role="group" aria-label="Filter products">
            {chips.map((chip) => (
              <button
                key={chip.id}
                type="button"
                className={`chip ${filter === chip.id ? 'is-active' : ''}`}
                aria-pressed={filter === chip.id}
                onClick={() => setFilter(chip.id)}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid" aria-live="polite">
          {visible.length === 0 ? (
            <p className="empty">
              {filter === 'saved'
                ? 'Nothing saved yet. Tap the heart on any ring to keep it here.'
                : 'No products match this filter.'}
            </p>
          ) : (
            visible.map((product, i) => (
              <Reveal key={product.id} delay={i * 90}>
                <ProductCard product={product} index={i} />
              </Reveal>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
