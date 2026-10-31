'use client';

import Image from 'next/image';
import { ArrowRight, Flower2, Gem, Hammer, Orbit, Ruler, Users } from 'lucide-react';
import { Particles, ZodiacWheel } from '@/components/ui/Celestial';
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
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__vignette" />
        <Particles />
      </div>

      <div className="container hero__grid">
        <div className="hero__top">
          <p className="eyebrow eyebrow--gold hero-anim" style={{ ['--d' as string]: '0.1s' }}>
            Astrology meets craftsmanship
          </p>
          <h1 id="hero-title" className="hero__title hero-anim" style={{ ['--d' as string]: '0.25s' }}>
            Divine
            <br />
            Panchdhatu Rings
          </h1>
        </div>

        <div className="hero__visual hero-anim hero-anim--ring" style={{ ['--d' as string]: '0.35s' }}>
          <ZodiacWheel className="hero__wheel" />
          <div className="hero__glow" aria-hidden="true" />
          <Image
            src="/assets/ring_blue.jpg"
            alt="Blue sapphire ring set in an engraved Panchdhatu band, resting on dark stone"
            fill
            priority
            sizes="(max-width: 700px) 92vw, (max-width: 1100px) 50vw, 40vw"
            className="hero__ring"
          />
        </div>

        <div className="hero__bottom">
          <p className="hero__lede hero-anim" style={{ ['--d' as string]: '0.45s' }}>
            Handcrafted with sacred Panchdhatu and authentic gemstones, our rings are designed to bring
            harmony, positivity and balance into your life.
          </p>
          <div className="hero-anim" style={{ ['--d' as string]: '0.55s' }}>
            <button type="button" className="btn btn--gold" onClick={() => showCollection('all')}>
              Explore Collection <ArrowRight size={16} strokeWidth={1.75} />
            </button>
          </div>
          <ul className="hero__chips hero-anim" style={{ ['--d' as string]: '0.65s' }}>
            <li>
              <Users size={16} strokeWidth={1.5} /> Men&apos;s &amp; ladies&apos; designs
            </li>
            <li>
              <Ruler size={16} strokeWidth={1.5} /> Indian sizes 4–40
            </li>
          </ul>
        </div>

        <ul className="hero__highlights" aria-label="Brand highlights">
          {HIGHLIGHTS.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="hero-anim" style={{ ['--d' as string]: `${0.5 + i * 0.1}s` }}>
              <span className="hero__hl-icon">
                <Icon size={22} strokeWidth={1.25} />
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
