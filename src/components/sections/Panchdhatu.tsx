'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { ZodiacWheel } from '@/components/ui/Celestial';
import { useStore } from '@/components/store/StoreProvider';
import { Reveal } from '@/components/ui/Reveal';

const FACTS = [
  { label: 'Five metals', text: 'A traditional alloy of five metals, long used in Indian jewellery and sacred objects.' },
  { label: 'Handcrafted bands', text: 'Each gemstone is set in a Panchdhatu band, with engraved detailing.' },
  { label: 'Made to fit', text: 'Men’s and women’s designs in Indian sizes 4 to 40.' },
];

export function Panchdhatu() {
  const { showCollection } = useStore();

  return (
    <section id="story" className="section story" aria-labelledby="story-title">
      <ZodiacWheel className="story__wheel" />
      <div className="container story__grid">
        <Reveal>
          <div className="story__copy">
            <p className="eyebrow eyebrow--gold">The essence of our craft</p>
            <h2 id="story-title" className="section-title section-title--light">
              What is Panchdhatu?
            </h2>
            <span className="ornament ornament--left" aria-hidden="true" />
            <p className="story__lede">
              Panchdhatu means “five metals”. In Indian tradition the blend is valued for jewellery and ritual
              objects, and it is the foundation of every ring we make.
            </p>
            <dl className="story__facts">
              {FACTS.map((f) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.text}</dd>
                </div>
              ))}
            </dl>
            <button type="button" className="btn btn--gold" onClick={() => showCollection('all')}>
              Discover Our Craft <ArrowRight size={16} strokeWidth={1.75} />
            </button>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <figure className="story__figure">
            <div className="story__frame">
              {/* Close crop of the engraved Panchdhatu band from the product photograph */}
              <Image
                src="/assets/ring_blue.jpg"
                alt="Close view of an engraved Panchdhatu ring band"
                fill
                sizes="(max-width: 900px) 90vw, 45vw"
                className="story__img"
              />
            </div>
            <figcaption>Engraved Panchdhatu band detail</figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
