'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Zap, Phone, MessageCircle, Send } from 'lucide-react';
import { getWhatsAppLink, getTelegramLink } from '@/lib/whatsapp';
import { products } from '@/lib/products';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <footer className="bg-[#0F172A] text-white relative overflow-hidden" role="contentinfo">
      {/* Top accent line */}
      <div className="h-1 bg-gradient-to-r from-[#0D9488] via-[#06B6D4] to-[#0D9488]" />

      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-[#0D9488]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-[#D97706]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <Zap className="size-6 text-[#0D9488]" />
              <span className="text-lg font-bold">
                Cable<span className="gradient-text">Iran</span>
              </span>
            </div>
            <p className="text-[#94A3B8] text-sm leading-relaxed">
              {t('footer.tagline')}
            </p>
            <div className="pt-2">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">{t('footer.products')}</h3>
            <ul className="space-y-2">
              {products.slice(0, 5).map((product) => (
                <li key={product.id}>
                  <a
                    href="#products"
                    className="text-[#94A3B8] text-sm hover:text-[#0D9488] transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    {t(`product_names.${product.slug}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">{t('footer.company')}</h3>
            <ul className="space-y-2">
              {['home', 'products', 'about', 'contact'].map((key) => (
                <li key={key}>
                  <a
                    href={`#${key}`}
                    className="text-[#94A3B8] text-sm hover:text-[#0D9488] transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(`#${key}`)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    {t(`nav.${key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">{t('contact.phone')}</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+989192960344"
                  className="flex items-center gap-2 text-[#94A3B8] text-sm hover:text-[#0D9488] transition-colors"
                >
                  <Phone className="size-4 shrink-0" />
                  +98 919 296 0344
                </a>
              </li>
              <li>
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#94A3B8] text-sm hover:text-[#22C55E] transition-colors"
                >
                  <MessageCircle className="size-4 shrink-0" />
                  {t('contact.whatsapp')}
                </a>
              </li>
              <li>
                <a
                  href={getTelegramLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#94A3B8] text-sm hover:text-[#0EA5E9] transition-colors"
                >
                  <Send className="size-4 shrink-0" />
                  {t('contact.telegram')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#64748B] text-xs text-center sm:text-left">
            &copy; {new Date().getFullYear()} CableIran. {t('footer.rights')}
          </p>
          <p className="text-[#D97706] text-xs font-medium flex items-center gap-1.5">
            <span className="text-base">🇮🇷</span>
            {t('footer.manufactured')}
          </p>
        </div>
      </div>
    </footer>
  );
}
