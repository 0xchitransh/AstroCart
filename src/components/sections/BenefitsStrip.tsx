import { PackageCheck, Ruler, ShieldCheck, Users } from 'lucide-react';

/** Every item reflects the actual ordering flow and the published terms. */
const BENEFITS = [
  { icon: Users, title: 'Men’s & Women’s Designs', text: 'Choose the fit that suits you' },
  { icon: Ruler, title: 'Sizes 4 to 40', text: 'Select your Indian ring size' },
  { icon: ShieldCheck, title: 'Secure Checkout', text: 'Payments handled by Razorpay' },
  { icon: PackageCheck, title: 'Inspect on Delivery', text: 'Report wrong or damaged items promptly' },
];

export function BenefitsStrip() {
  return (
    <section className="benefits" aria-label="Why shop with us">
      <ul className="container benefits__list">
        {BENEFITS.map(({ icon: Icon, title, text }) => (
          <li key={title}>
            <Icon size={28} strokeWidth={1.1} aria-hidden="true" />
            <span>
              <strong>{title}</strong>
              <small>{text}</small>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
