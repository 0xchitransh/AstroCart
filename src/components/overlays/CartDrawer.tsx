'use client';

import Image from 'next/image';
import { ShoppingBag, X } from 'lucide-react';
import { formatPrice } from '@/data/products';
import { useStore } from '@/components/store/StoreProvider';
import { Overlay } from '@/components/ui/Overlay';

export function CartDrawer() {
  const { cart, cartTotal, removeFromCart, overlay, closeOverlay, openOverlay, showCollection } = useStore();

  return (
    <Overlay open={overlay?.type === 'cart'} onClose={closeOverlay} label="Your shopping bag" variant="drawer-right">
      <div className="drawer__head">
        <h2 className="drawer__title">Your Shopping Bag</h2>
        <button type="button" className="icon-btn" aria-label="Close shopping bag" onClick={closeOverlay} data-autofocus>
          <X size={22} strokeWidth={1.5} />
        </button>
      </div>

      <div className="cart__items">
        {cart.length === 0 ? (
          <div className="cart__empty">
            <ShoppingBag size={40} strokeWidth={1} aria-hidden="true" />
            <p>Your bag is empty.</p>
            <button type="button" className="btn btn--outline-dark" onClick={() => showCollection('all')}>
              Browse rings
            </button>
          </div>
        ) : (
          <ul>
            {cart.map((item) => (
              <li className="cart__item" key={item.cartId}>
                <div className="cart__thumb">
                  <Image src={item.image} alt="" fill sizes="88px" />
                </div>
                <div className="cart__info">
                  <h3>{item.name}</h3>
                  <p>
                    {item.design === 'mens' ? "Men's" : "Ladies'"} design · Size {item.size}
                  </p>
                  <p className="cart__price">{formatPrice(item.price)}</p>
                  <button type="button" className="text-btn" onClick={() => removeFromCart(item.cartId)}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {cart.length > 0 && (
        <div className="cart__foot">
          <div className="cart__total">
            <span>Total</span>
            <span>{formatPrice(cartTotal)}</span>
          </div>
          <button type="button" className="btn btn--gold btn--block" onClick={() => openOverlay('checkout')}>
            Checkout Now
          </button>
        </div>
      )}
    </Overlay>
  );
}
