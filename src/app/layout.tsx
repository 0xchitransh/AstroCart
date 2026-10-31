import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import { BRAND } from '@/data/site';

const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const sans = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${BRAND} | Divine Panchdhatu Rings & Astrological Gemstones`,
  description: `${BRAND} offers handcrafted Panchdhatu rings set with Yellow Sapphire, Blue Sapphire, Emerald and Ruby, in men's and ladies' designs and Indian sizes 4 to 40.`,
  openGraph: {
    title: `${BRAND} | Divine Panchdhatu Rings`,
    description: 'Handcrafted Panchdhatu rings set with astrology-associated gemstones.',
    images: ['/assets/ring_blue.jpg'],
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#24120D',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}.hero-anim{animation:none!important;opacity:1!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
