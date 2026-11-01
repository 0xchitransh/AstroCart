'use client';

import Image from 'next/image';
import { Heart, ShoppingBag, X } from 'lucide-react';
import { categoryLabel, formatPrice, metaLine } from '@/data/products';
import { useStore } from '@/components/store/StoreProvider';
import { Overlay } from '@/components/ui/Overlay';
import { useRetained } from '@/components/ui/useRetained';

export function QuickView() {
  const { overlay, closeOverlay, openOverlay, wishlist, toggleWishlist } = useStore();
  const product = useRetained(overlay?.type === 'quickview' ? overlay.product : undefined);
  const saved = product ? wishlist.includes(product.id) : false;

  return (
    <Overlay
      open={overlay?.type === 'quickview'}
      onClose={closeOverlay}
      label={product ? `Quick view: ${product.name}` : 'Quick view'}
      variant="modal"
      className="quickview"
    >
      {product && (
        <div className="quickview__body">
          <button type="button" className="icon-btn modal__close" aria-label="Close quick view" onClick={closeOverlay}>
            <X size={22} strokeWidth={1.5} />
          </button>
          <div className="quickview__image">
            <Image src={product.image} alt={product.name} fill sizes="(max-width: 800px) 90vw, 420px" />
          </div>
          <div className="quickview__info">
            <p className="eyebrow">{product.stoneLocal ?? `${categoryLabel(product.category)} design`}</p>
            <h2>{product.name}</h2>
            <p className="card__meta">{metaLine(product)}</p>
            <p className="quickview__price">{formatPrice(product.price)}</p>
            <p className="quickview__desc">{product.desc}</p>
            <ul className="quickview__list">
              <li>{product.kind === 'band' ? 'Panchdhatu band, no stone' : 'Gemstone set in a Panchdhatu band'}</li>
              <li>{categoryLabel(product.category)} design</li>
              <li>Indian sizes 4 to 40, chosen at the next step</li>
            </ul>
            <div className="quickview__actions">
              <button type="button" className="btn btn--dark" onClick={() => openOverlay('config', { product })} data-autofocus>
                <ShoppingBag size={16} strokeWidth={1.5} /> Add to bag
              </button>
              <button
                type="button"
                className={`btn btn--outline-dark ${saved ? 'is-saved' : ''}`}
                aria-pressed={saved}
                onClick={() => toggleWishlist(product)}
              >
                <Heart size={16} strokeWidth={1.5} fill={saved ? 'currentColor' : 'none'} /> {saved ? 'Saved' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </Overlay>
  );
}
