export type Category = 'mens' | 'womens';

export const CATEGORIES: { id: Category; label: string; title: string }[] = [
  { id: 'mens', label: "Men's", title: "Men's Panchdhatu Rings" },
  { id: 'womens', label: "Women's", title: "Women's Panchdhatu Rings" },
];

export const categoryLabel = (c: Category) => (c === 'mens' ? "Men's" : "Women's");

/** Price of a Panchdhatu band (terms.pdf). A stone ring costs stone price + band price. */
export const BAND_PRICE = 1000;

/** A gemstone, independent of men's / women's design. */
export type Gem = {
  /** Used in ids, image file names and collection filters */
  slug: string;
  stone: string;
  /** Traditional (Hindi) name of the gemstone, where there is one */
  stoneLocal?: string;
  /** Planet traditionally linked with the stone in Vedic astrology (Navaratna stones only) */
  planet?: string;
  planetLocal?: string;
  /** Price of the stone alone, from terms.pdf */
  stonePrice: number;
  desc: string;
  /** Representative gemstone colour, used for subtle accents only */
  tone: string;
};

const setIn = (stone: string, local?: string) =>
  `${stone}${local ? ` (${local})` : ''} set in a Panchdhatu band.`;

/** Display order on the storefront. Stone prices are from terms.pdf. */
export const GEMS: Gem[] = [
  {
    slug: 'ruby',
    stone: 'Ruby',
    stoneLocal: 'Manik',
    planet: 'Sun',
    planetLocal: 'Surya',
    stonePrice: 2500,
    desc: 'Boosts confidence, vitality, and leadership.',
    tone: '#B5213A',
  },
  {
    slug: 'yellow-sapphire',
    stone: 'Yellow Sapphire',
    stoneLocal: 'Pukhraj',
    planet: 'Jupiter',
    planetLocal: 'Guru',
    stonePrice: 1500,
    desc: 'Attracts prosperity and divine knowledge.',
    tone: '#E2B63A',
  },
  {
    slug: 'blue-sapphire',
    stone: 'Blue Sapphire',
    stoneLocal: 'Neelam',
    planet: 'Saturn',
    planetLocal: 'Shani',
    stonePrice: 1500,
    desc: 'Brings focus, discipline, and rapid success.',
    tone: '#2B4DB3',
  },
  {
    slug: 'emerald',
    stone: 'Emerald',
    stoneLocal: 'Panna',
    planet: 'Mercury',
    planetLocal: 'Budh',
    stonePrice: 1900,
    desc: 'Enhances intellect, communication, and wealth.',
    tone: '#1F9461',
  },
  {
    slug: 'coral',
    stone: 'Coral',
    stoneLocal: 'Moonga',
    planet: 'Mars',
    planetLocal: 'Mangal',
    stonePrice: 1500,
    desc: setIn('Coral', 'Moonga'),
    tone: '#D9503F',
  },
  {
    slug: 'pearl',
    stone: 'Pearl',
    stoneLocal: 'Moti',
    planet: 'Moon',
    planetLocal: 'Chandra',
    stonePrice: 1500,
    desc: setIn('Pearl', 'Moti'),
    tone: '#E6DFD0',
  },
  {
    slug: 'diamond',
    stone: 'Diamond',
    stoneLocal: 'Heera',
    planet: 'Venus',
    planetLocal: 'Shukra',
    stonePrice: 2500,
    desc: setIn('Diamond', 'Heera'),
    tone: '#BFD9EA',
  },
  {
    slug: 'hessonite',
    stone: 'Hessonite',
    stoneLocal: 'Gomed',
    planet: 'Rahu',
    planetLocal: 'Rahu',
    stonePrice: 1500,
    desc: setIn('Hessonite', 'Gomed'),
    tone: '#C8682A',
  },
  {
    slug: 'cats-eye',
    stone: "Cat's Eye",
    stoneLocal: 'Lehsunia',
    planet: 'Ketu',
    planetLocal: 'Ketu',
    stonePrice: 1500,
    desc: setIn("Cat's Eye", 'Lehsunia'),
    tone: '#8A8F3A',
  },
  {
    slug: 'turquoise',
    stone: 'Turquoise',
    stoneLocal: 'Firoza',
    stonePrice: 2000,
    desc: setIn('Turquoise', 'Firoza'),
    tone: '#2FB5B0',
  },
  {
    slug: 'gomti-chakra',
    stone: 'Gomti Chakra',
    stonePrice: 1500,
    desc: setIn('Gomti Chakra'),
    tone: '#E9DFC9',
  },
];

export const gemRingPrice = (g: Gem) => g.stonePrice + BAND_PRICE;

export type Product = {
  id: string;
  /** Gem slug, or 'plain-band' */
  slug: string;
  category: Category;
  kind: 'stone' | 'band';
  name: string;
  image: string;
  desc: string;
  /** Final price (stone ring prices already include the band) */
  price: number;
  /** Gemstone name shown on cards ('Plain Band' for bands) */
  stone: string;
  stoneLocal?: string;
  planet?: string;
  planetLocal?: string;
  /** Representative colour, used for subtle accents only */
  tone: string;
};

export const BAND_SLUG = 'plain-band';

const stoneProducts = (category: Category): Product[] =>
  GEMS.map((g) => ({
    id: `${category}-${g.slug}`,
    slug: g.slug,
    category,
    kind: 'stone',
    name: `${categoryLabel(category)} ${g.stone} Ring`,
    image: `/assets/${category}/${g.slug}.jpg`,
    desc: g.desc,
    price: gemRingPrice(g),
    stone: g.stone,
    stoneLocal: g.stoneLocal,
    planet: g.planet,
    planetLocal: g.planetLocal,
    tone: g.tone,
  }));

const bandProduct = (category: Category): Product => ({
  id: `${category}-${BAND_SLUG}`,
  slug: BAND_SLUG,
  category,
  kind: 'band',
  name: `${categoryLabel(category)} Plain Band`,
  image: `/assets/${category}/${BAND_SLUG}.jpg`,
  desc: 'A plain Panchdhatu band without a stone.',
  price: BAND_PRICE,
  stone: 'Plain Band',
  tone: '#C6A46A',
});

export const PRODUCTS: Product[] = (['mens', 'womens'] as const).flatMap((c) => [
  ...stoneProducts(c),
  bandProduct(c),
]);

export const productFor = (slug: string, category: Category) =>
  PRODUCTS.find((p) => p.slug === slug && p.category === category);

/** "Ruby | Sun (Surya)", or just the stone name when it has no linked planet. */
export function metaLine(p: { stone: string; planet?: string; planetLocal?: string }) {
  if (!p.planet) return p.stone;
  const local = p.planetLocal && p.planetLocal !== p.planet ? ` (${p.planetLocal})` : '';
  return `${p.stone} | ${p.planet}${local}`;
}

export const formatPrice = (n: number) => `₹${n.toLocaleString('en-IN')}`;
