/**
 * Single source of truth for brand name and business information.
 * Contact / social fields are intentionally empty: they are only rendered
 * when filled in, so the storefront never shows invented details.
 */
export const BRAND = 'Astrocart';

export const CONTACT = {
  email: '',
  phone: '',
  instagram: '',
  facebook: '',
  whatsapp: '',
};

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Collections', href: '#collection', mega: true },
  { label: 'Gemstone Guide', href: '#gemstone-guide' },
  { label: 'Astrology', href: '#astrology' },
  { label: 'Our Story', href: '#story' },
  { label: 'Contact', href: '#contact' },
] as const;

export type TermClause = { id: string; title: string; body: string };

/** Terms taken from the business terms document (terms.pdf). */
export const TERMS: TermClause[] = [
  {
    id: 'belief',
    title: 'Astrology / Belief-Based Product',
    body: `These rings, stones and bands are sold as astrology-based/spiritual products. Any belief regarding their astrological or spiritual effects is a matter of individual belief. The product may be perceived as having a positive effect, a negative effect, or no noticeable effect. ${BRAND} does not guarantee or represent that any particular result will occur.`,
  },
  {
    id: 'outcome',
    title: 'No Guaranteed Outcome',
    body: 'We do not guarantee success, wealth, health improvement, relationship results, protection, removal of problems, or any other personal, medical, financial, professional or spiritual outcome from the use of these products.',
  },
  {
    id: 'advice',
    title: 'Medical / Professional Advice',
    body: 'These products are not a substitute for medical, legal, financial or other professional advice or treatment. Customers should consult a qualified professional whenever appropriate.',
  },
  {
    id: 'responsibility',
    title: 'Customer Responsibility',
    body: `Customers are responsible for selecting the appropriate stone, design and ring size. If a customer chooses a stone based on advice from an astrologer or another person, that advice is outside ${BRAND}'s responsibility.`,
  },
  {
    id: 'returns',
    title: 'No Return / Exchange',
    body: 'Once an order is confirmed and the goods are supplied, returns or exchanges are not accepted for change of mind, personal preference, incorrect size selected by the customer, or dissatisfaction with an astrological/spiritual result. This policy does not exclude any return, replacement, refund or other right that may be required under applicable law, including for a wrong, defective or materially non-conforming product.',
  },
  {
    id: 'buyback',
    title: 'No Buy-Back / Resale Value',
    body: `${BRAND} does not provide any guaranteed buy-back, exchange or resale value for these astrology products. We are not responsible for the customer's ability to resell the product to any third party.`,
  },
  {
    id: 'appearance',
    title: 'Product Appearance',
    body: 'Actual colour, finish, stone appearance and minor design details may differ slightly from photographs or screen displays.',
  },
  {
    id: 'pricing',
    title: 'Pricing & Availability',
    body: 'Product prices, designs, stone availability and promotional offers may change without prior notice. The price applicable to a confirmed order will govern that order.',
  },
  {
    id: 'inspection',
    title: 'Inspection on Delivery',
    body: `Customers should inspect the package and product promptly after delivery and contact ${BRAND} as soon as possible if the product received is wrong, damaged or materially different from the confirmed order.`,
  },
  {
    id: 'acceptance',
    title: 'Acceptance of Terms',
    body: 'By placing an order, the customer confirms that they have read and understood the product description, pricing and applicable terms and are purchasing the product with the above limitations and disclosures.',
  },
];
