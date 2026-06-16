'use client';

import { useEffect } from 'react';
import { useLocale } from 'next-intl';
import { isRtl, type Locale } from '@/i18n-config';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import StatsBar from '@/components/sections/StatsBar';
import ProductGrid from '@/components/sections/ProductGrid';
import WhyUs from '@/components/sections/WhyUs';
import PosterGallery from '@/components/sections/PosterGallery';
import ContactCTA from '@/components/sections/ContactCTA';

export default function Home() {
  const locale = useLocale() as Locale;
  const rtl = isRtl(locale);

  useEffect(() => {
    const html = document.documentElement;
    html.dir = rtl ? 'rtl' : 'ltr';
    html.lang = locale;
  }, [locale, rtl]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]" dir={rtl ? 'rtl' : 'ltr'}>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <StatsBar />
        <ProductGrid />
        <WhyUs />
        <PosterGallery />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}
