'use client';

import Image from 'next/image';
import { useState } from 'react';
import { X } from 'lucide-react';
import { categoryLabel, formatPrice, type Product } from '@/data/products';
import { useStore } from '@/components/store/StoreProvider';
import { Overlay } from '@/components/ui/Overlay';
import { useRetained } from '@/components/ui/useRetained';

/** Ring configuration (design + Indian size 4–40) shown before a ring is added to the bag. */
export function Configurator() {
  const { overlay, closeOverlay, addToCart } = useStore();
  const open = overlay?.type === 'config';
  const product = useRetained(overlay?.type === 'config' ? overlay.product : undefined);

  return (
    <Overlay open={open} onClose={closeOverlay} label="Configure your ring" variant="modal">
      {product && <ConfiguratorForm key={product.id} product={product} onClose={closeOverlay} onAdd={addToCart} />}
    </Overlay>
  );
}

function ConfiguratorForm({
  product,
  onClose,
  onAdd,
}: {
  product: Product;
  onClose: () => void;
  onAdd: (product: Product, size: string) => void;
}) {
  const [size, setSize] = useState('14');

  return (
    <form
      className="modal__body"
      onSubmit={(e) => {
        e.preventDefault();
        onAdd(product, size);
      }}
    >
      <button type="button" className="icon-btn modal__close" aria-label="Close" onClick={onClose}>
        <X size={22} strokeWidth={1.5} />
      </button>
      <h2 className="modal__title">Configure Your Ring</h2>

      <div className="config__product">
        <div className="config__thumb">
          <Image src={product.image} alt="" fill sizes="88px" />
        </div>
        <div>
          <h3>{product.name}</h3>
          <p className="config__design">{categoryLabel(product.category)} design</p>
          <p className="config__price">{formatPrice(product.price)}</p>
        </div>
      </div>

      <div className="field">
        <label htmlFor="ring-size">Indian Size (4–40)</label>
        <input
          id="ring-size"
          type="number"
          inputMode="numeric"
          min={4}
          max={40}
          step={1}
          value={size}
          onChange={(e) => setSize(e.target.value)}
          required
          data-autofocus
        />
      </div>

      <button type="submit" className="btn btn--dark btn--block">
        Add to Cart – {formatPrice(product.price)}
      </button>
    </form>
  );
}
