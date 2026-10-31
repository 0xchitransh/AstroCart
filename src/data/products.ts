export type Product = {
  id: string;
  name: string;
  image: string;
  desc: string;
  price: number; // Price includes the 1000 band price
  /** Gemstone name shown on cards */
  stone: string;
  /** Traditional (Hindi) name of the gemstone */
  stoneLocal: string;
  /** Planet traditionally associated with the gemstone in Vedic astrology */
  planet: string;
  planetLocal: string;
  /** Representative gemstone colour, used for subtle accents only */
  tone: string;
};

export const PRODUCTS: Product[] = [
  {
    id: 'yellow-sapphire',
    name: 'Yellow Sapphire Ring',
    image: '/assets/ring_yellow.jpg',
    desc: 'Attracts prosperity and divine knowledge.',
    price: 2500,
    stone: 'Yellow Sapphire',
    stoneLocal: 'Pukhraj',
    planet: 'Jupiter',
    planetLocal: 'Guru',
    tone: '#E2B63A',
  },
  {
    id: 'blue-sapphire',
    name: 'Blue Sapphire Ring',
    image: '/assets/ring_blue.jpg',
    desc: 'Brings focus, discipline, and rapid success.',
    price: 2500,
    stone: 'Blue Sapphire',
    stoneLocal: 'Neelam',
    planet: 'Saturn',
    planetLocal: 'Shani',
    tone: '#2B4DB3',
  },
  {
    id: 'emerald',
    name: 'Emerald Ring',
    image: '/assets/ring_emerald.jpg',
    desc: 'Enhances intellect, communication, and wealth.',
    price: 2900,
    stone: 'Emerald',
    stoneLocal: 'Panna',
    planet: 'Mercury',
    planetLocal: 'Budh',
    tone: '#1F9461',
  },
  {
    id: 'ruby',
    name: 'Ruby Ring',
    image: '/assets/ring_ruby.jpg',
    desc: 'Boosts confidence, vitality, and leadership.',
    price: 3500,
    stone: 'Ruby',
    stoneLocal: 'Manik',
    planet: 'Sun',
    planetLocal: 'Surya',
    tone: '#B5213A',
  },
];

export const formatPrice = (n: number) => `₹${n.toLocaleString('en-IN')}`;
