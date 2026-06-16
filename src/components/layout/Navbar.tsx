'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Menu, Zap, Home, Package, Info, Phone, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { isRtl } from '@/i18n-config';

const navLinks = [
  { key: 'home', href: '#home', Icon: Home },
  { key: 'products', href: '#products', Icon: Package },
  { key: 'about', href: '#about', Icon: Info },
  { key: 'contact', href: '#contact', Icon: Phone },
] as const;

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const rtl = isRtl(locale);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 w-full z-50 flex items-center justify-center p-3 sm:p-4 transition-all duration-300"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div
          className={`relative w-full md:w-auto rounded-3xl border backdrop-blur-xl transition-all duration-300 ${
            scrolled
              ? 'border-[rgba(13,148,136,0.2)] shadow-[0_8px_32px_rgba(13,148,136,0.12),inset_0_1px_3px_rgba(255,255,255,0.3),inset_0_-1px_1px_rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.6)]'
              : 'border-[rgba(255,255,255,0.3)] shadow-[0_8px_32px_rgba(0,0,0,0.06),inset_0_1px_3px_rgba(255,255,255,0.3),inset_0_-1px_1px_rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.15)]'
          }`}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between px-3 sm:px-5 py-2.5 sm:py-3">
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
              className="relative flex items-center gap-2.5 group shrink-0"
              aria-label="CableIran Home"
            >
              <div className="relative">
                <Zap className="size-6 text-[#0D9488] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                <div className="absolute inset-0 bg-[#0D9488]/20 blur-md rounded-full group-hover:bg-[#0D9488]/30 transition-all duration-300" />
              </div>
              <span className="text-lg font-extrabold text-[#0F172A] tracking-tight select-none">
                Cable<span className="gradient-text">Iran</span>
              </span>
              <span className="absolute -inset-1 bg-gradient-to-r from-[#0D9488]/10 to-[#06B6D4]/10 blur-md -z-10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>

            {/* Desktop divider + nav links */}
            <nav className="hidden md:flex items-center gap-1 md:border-l md:pl-4 md:ml-4" dir={rtl ? 'rtl' : 'ltr'}>
              {navLinks.map((link, index) => {
                const { Icon } = link;
                return (
                  <motion.button
                    key={link.key}
                    onClick={() => handleNavClick(link.href)}
                    className="relative flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl font-medium transition-all duration-300 group text-[#475569] hover:text-[#0D9488]"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.4 }}
                  >
                    <Icon className="size-4 transition-all duration-300 text-[#0D9488]/60 group-hover:text-[#0D9488]" />
                    <span className="transition-all duration-300 text-sm sm:text-base">{t(link.key)}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0D9488]/15 to-[#06B6D4]/15 rounded-xl backdrop-blur-sm -z-10 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#0D9488] to-[#06B6D4] rounded-full transition-all duration-300 group-hover:w-3/4" />
                  </motion.button>
                );
              })}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden sm:flex items-center">
                <LanguageSwitcher />
              </div>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden group relative p-2 rounded-xl bg-white/10 border border-gray/50 backdrop-blur-lg transition-all duration-300 hover:bg-white/20 hover:scale-105"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              >
                <AnimatePresence mode="wait">
                  {mobileOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="size-5 text-[#0D9488]" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="size-5 text-[#475569] group-hover:text-[#0D9488] transition-colors duration-300" />
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#0D9488]/10 to-[#06B6D4]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed top-18 left-3 right-3 sm:left-4 sm:right-4 z-50 md:hidden"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="rounded-3xl border border-[rgba(13,148,136,0.15)] bg-white/80 backdrop-blur-xl shadow-[0_16px_48px_rgba(0,0,0,0.1)] p-3 space-y-1" dir={rtl ? 'rtl' : 'ltr'}>
              {navLinks.map((link) => {
                const { Icon } = link;
                return (
                  <button
                    key={link.key}
                    onClick={() => handleNavClick(link.href)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#475569] hover:text-[#0D9488] hover:bg-[#0D9488]/5 transition-all duration-300"
                    style={{ textAlign: rtl ? 'right' : 'left' }}
                  >
                    <Icon className="size-4 text-[#0D9488]/60" />
                    {t(link.key)}
                  </button>
                );
              })}
              <div className="border-t border-[#E2E8F0] my-2" />
              <div className="px-2 py-1">
                <LanguageSwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
