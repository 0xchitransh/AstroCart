'use client';

import Image from 'next/image';
import { ArrowRight, Flower2, Gem, Hammer, Orbit } from 'lucide-react';
import { useStore } from '@/components/store/StoreProvider';

const HIGHLIGHTS = [
  { icon: Gem, title: 'Authentic Gemstones', text: 'Carefully selected stones' },
  { icon: Flower2, title: 'Sacred Panchdhatu', text: 'Traditional five-metal blend' },
  { icon: Orbit, title: 'Astrology Inspired', text: 'Rooted in Vedic traditions' },
  { icon: Hammer, title: 'Premium Craftsmanship', text: 'Handcrafted ring designs' },
];

export function Hero() {
  const { showCollection } = useStore();

  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="eyebrow hero-anim" style={{ ['--d' as string]: '0.1s' }}>
            Astrology meets craftsmanship
          </p>
          <h1 id="hero-title" className="hero__title hero-anim" style={{ ['--d' as string]: '0.22s' }}>
            Divine
            <br />
            Panchdhatu Rings
          </h1>
          <p className="hero__lede hero-anim" style={{ ['--d' as string]: '0.34s' }}>
            Handcrafted with sacred Panchdhatu and authentic gemstones, our rings are designed to bring
            harmony, positivity and balance into your life.
          </p>
          <div className="hero__cta hero-anim" style={{ ['--d' as string]: '0.46s' }}>
            <button type="button" className="btn btn--dark" onClick={() => showCollection('all')}>
              Explore Collection <ArrowRight size={16} strokeWidth={1.75} />
            </button>
            <div className="hero__links">
              <button type="button" className="link-arrow" onClick={() => showCollection('all', 'mens')}>
                Shop Men&apos;s <ArrowRight size={15} strokeWidth={1.5} />
              </button>
              <button type="button" className="link-arrow" onClick={() => showCollection('all', 'womens')}>
                Shop Women&apos;s <ArrowRight size={15} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>

        <div className="hero__visual hero-anim hero-anim--ring" style={{ ['--d' as string]: '0.3s' }}>
          <button
            type="button"
            className="hero__photo hero__photo--main"
            onClick={() => showCollection('all', 'womens')}
            aria-label="Shop women's Panchdhatu rings"
          >
            <Image
              src="/assets/womens/blue-sapphire.jpg"
              alt="Women's blue sapphire ring in a Panchdhatu band"
              fill
              priority
              sizes="(max-width: 900px) 80vw, 40vw"
            />
            <span className="hero__tag">
              Women&apos;s <ArrowRight size={13} strokeWidth={1.75} />
            </span>
          </button>
          <button
            type="button"
            className="hero__photo hero__photo--inset"
            onClick={() => showCollection('all', 'mens')}
            aria-label="Shop men's Panchdhatu rings"
          >
            <Image
              src="/assets/mens/ruby.jpg"
              alt="Men's ruby ring in a Panchdhatu band"
              fill
              priority
              sizes="(max-width: 900px) 40vw, 18vw"
            />
            <span className="hero__tag">
              Men&apos;s <ArrowRight size={13} strokeWidth={1.75} />
            </span>
          </button>
        </div>

        <ul className="hero__highlights" aria-label="Brand highlights">
          {HIGHLIGHTS.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="hero-anim" style={{ ['--d' as string]: `${0.55 + i * 0.08}s` }}>
              <span className="hero__hl-icon">
                <Icon size={20} strokeWidth={1.25} />
              </span>
              <span>
                <strong>{title}</strong>
                <small>{text}</small>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
