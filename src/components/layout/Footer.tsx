'use client';

import { BRAND, CONTACT } from '@/data/site';
import { PRODUCTS } from '@/data/products';
import { useStore } from '@/components/store/StoreProvider';

export function Footer() {
  const { showCollection, openOverlay } = useStore();
  const hasContact = Boolean(CONTACT.email || CONTACT.phone || CONTACT.whatsapp);
  const socials = [
    { label: 'Instagram', href: CONTACT.instagram },
    { label: 'Facebook', href: CONTACT.facebook },
    { label: 'WhatsApp', href: CONTACT.whatsapp },
  ].filter((s) => s.href);

  return (
    <footer id="contact" className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <span className="nav__brand nav__brand--light">{BRAND}</span>
          <p>
            Panchdhatu rings set with astrology-associated gemstones, handcrafted in men&apos;s and
            ladies&apos; designs.
          </p>
          {socials.length > 0 && (
            <ul className="footer__social" aria-label="Social links">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav aria-label="Collections">
          <h2 className="footer__h">Collections</h2>
          <ul>
            {PRODUCTS.map((p) => (
              <li key={p.id}>
                <button type="button" onClick={() => showCollection(p.id)}>
                  {p.stone} Ring
                </button>
              </li>
            ))}
            <li>
              <button type="button" onClick={() => showCollection('all')}>
                View all
              </button>
            </li>
          </ul>
        </nav>

        <nav aria-label="Explore">
          <h2 className="footer__h">About {BRAND}</h2>
          <ul>
            <li>
              <a href="#story">Our Story</a>
            </li>
            <li>
              <a href="#gemstone-guide">Gemstone Guide</a>
            </li>
            <li>
              <a href="#astrology">Astrology</a>
            </li>
          </ul>
        </nav>

        <nav aria-label="Policies">
          <h2 className="footer__h">Policies</h2>
          <ul>
            <li>
              <button type="button" onClick={() => openOverlay('policy', { section: 'returns' })}>
                Returns &amp; exchanges
              </button>
            </li>
            <li>
              <button type="button" onClick={() => openOverlay('policy')}>
                Terms &amp; disclaimer
              </button>
            </li>
          </ul>
          {hasContact && (
            <>
              <h2 className="footer__h footer__h--spaced">Support</h2>
              <ul>
                {CONTACT.email && (
                  <li>
                    <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
                  </li>
                )}
                {CONTACT.phone && (
                  <li>
                    <a href={`tel:${CONTACT.phone.replace(/\s+/g, '')}`}>{CONTACT.phone}</a>
                  </li>
                )}
              </ul>
            </>
          )}
        </nav>
      </div>

      <div className="container footer__base">
        <p>© {new Date().getFullYear()} {BRAND}. All rights reserved.</p>
        <p>Astrology-based, belief-based products. No outcome is guaranteed.</p>
      </div>
    </footer>
  );
}
