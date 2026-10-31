import Script from 'next/script';
import { StoreProvider } from '@/components/store/StoreProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { BenefitsStrip } from '@/components/sections/BenefitsStrip';
import { Collection } from '@/components/sections/Collection';
import { Panchdhatu } from '@/components/sections/Panchdhatu';
import { GemstoneGuide } from '@/components/sections/GemstoneGuide';
import { CosmicConnection } from '@/components/sections/CosmicConnection';
import { CartDrawer } from '@/components/overlays/CartDrawer';
import { Configurator } from '@/components/overlays/Configurator';
import { Checkout } from '@/components/overlays/Checkout';
import { QuickView } from '@/components/overlays/QuickView';
import { SearchOverlay } from '@/components/overlays/SearchOverlay';
import { PolicyModal } from '@/components/overlays/PolicyModal';
import { Toast } from '@/components/overlays/Toast';

export default function Home() {
  return (
    <StoreProvider>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      <a href="#collection" className="skip-link">
        Skip to products
      </a>
      <Navbar />

      <main>
        <Hero />
        <BenefitsStrip />
        <Collection />
        <Panchdhatu />
        <GemstoneGuide />
        <CosmicConnection />
      </main>

      <Footer />

      <CartDrawer />
      <Configurator />
      <Checkout />
      <QuickView />
      <SearchOverlay />
      <PolicyModal />
      <Toast />
    </StoreProvider>
  );
}
