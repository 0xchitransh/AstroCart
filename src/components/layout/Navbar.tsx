'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ArrowRight, Menu, Search, ShoppingBag, X } from 'lucide-react';
import { BRAND, NAV_LINKS } from '@/data/site';
import { PRODUCTS, formatPrice } from '@/data/products';
import { useStore } from '@/components/store/StoreProvider';
import { Overlay } from '@/components/ui/Overlay';

export function Navbar() {
  const { cart, overlay, openOverlay, closeOverlay, showCollection } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mega) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMega(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [mega]);

  const bagLabel = cart.length === 0 ? 'Open shopping bag' : `Open shopping bag, ${cart.length} item${cart.length > 1 ? 's' : ''}`;

  return (
    <>
      <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="container nav__inner">
          <button
            type="button"
            className="icon-btn nav__burger"
            aria-label="Open menu"
            onClick={() => openOverlay('menu')}
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>

          <a href="#home" className="nav__brand" aria-label={`${BRAND} home`}>
            {BRAND}
          </a>

          <nav className="nav__links" aria-label="Primary">
            {NAV_LINKS.map((link) =>
              'mega' in link && link.mega ? (
                <div
                  key={link.label}
                  className="nav__item nav__item--mega"
                  onMouseEnter={() => setMega(true)}
                  onMouseLeave={() => setMega(false)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setMega(false);
                  }}
                >
                  <a
                    href={link.href}
                    className="nav__link"
                    aria-haspopup="true"
                    aria-expanded={mega}
                    onFocus={() => setMega(true)}
                    onClick={() => setMega(false)}
                  >
                    {link.label}
                  </a>
                  <div className={`mega ${mega ? 'is-open' : ''}`} inert={!mega}>
                    <div className="mega__grid">
                      {PRODUCTS.map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          className="mega__item"
                          onClick={() => {
                            setMega(false);
                            showCollection(p.id);
                          }}
                        >
                          <span className="mega__thumb">
                            <Image src={p.image} alt="" fill sizes="72px" />
                          </span>
                          <span className="mega__text">
                            <span className="mega__name">{p.stone}</span>
                            <span className="mega__meta">
                              {p.planet} ({p.planetLocal}) · {formatPrice(p.price)}
                            </span>
                          </span>
                        </button>
                      ))}
                      <button
                        type="button"
                        className="mega__all"
                        onClick={() => {
                          setMega(false);
                          showCollection('all');
                        }}
                      >
                        View all products <ArrowRight size={16} strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="nav__link"
                  aria-current={link.label === 'Home' && !scrolled ? 'page' : undefined}
                >
                  {link.label}
                </a>
              ),
            )}
          </nav>

          <div className="nav__actions">
            <button type="button" className="icon-btn" aria-label="Search products" onClick={() => openOverlay('search')}>
              <Search size={21} strokeWidth={1.5} />
            </button>
            <button type="button" className="icon-btn nav__bag" aria-label={bagLabel} onClick={() => openOverlay('cart')}>
              <ShoppingBag size={21} strokeWidth={1.5} />
              {cart.length > 0 && <span className="nav__count">{cart.length}</span>}
            </button>
          </div>
        </div>
      </header>

      <Overlay open={overlay?.type === 'menu'} onClose={closeOverlay} label="Menu" variant="drawer-left" className="menu-drawer">
        <div className="drawer__head">
          <span className="nav__brand">{BRAND}</span>
          <button type="button" className="icon-btn" aria-label="Close menu" onClick={closeOverlay} data-autofocus>
            <X size={22} strokeWidth={1.5} />
          </button>
        </div>
        <nav className="menu-drawer__links" aria-label="Mobile">
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href} onClick={closeOverlay}>
              {link.label}
              <ArrowRight size={16} strokeWidth={1.5} />
            </a>
          ))}
        </nav>
        <div className="menu-drawer__foot">
          <button type="button" className="btn btn--outline-dark" onClick={() => openOverlay('search')}>
            <Search size={16} strokeWidth={1.5} /> Search products
          </button>
        </div>
      </Overlay>
    </>
  );
}
