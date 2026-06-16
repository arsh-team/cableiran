'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FiberBackground from '@/components/ui/FiberBackground';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.4,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function Hero() {
  const t = useTranslations('hero');

  const scrollToProducts = () => {
    document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#F0FDFA] via-[#F8FAFC] to-[#ECFDF5]"
    >
      {/* Fiber background animation */}
      <FiberBackground />

      {/* Circuit grid overlay */}
      <div className="absolute inset-0 circuit-grid pointer-events-none" />

      {/* Floating decorative blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#0D9488]/5 rounded-full blur-3xl floating-blob pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#D97706]/5 rounded-full blur-3xl floating-blob-delayed pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#06B6D4]/3 rounded-full blur-3xl pointer-events-none" />

      {/* Gradient overlay at bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#F8FAFC] pointer-events-none" />

      {/* Cable cross-section decorative element — 3D effect */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block opacity-15 pointer-events-none" aria-hidden="true">
        <motion.svg
          width="500"
          height="500"
          viewBox="0 0 500 500"
          fill="none"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="250" cy="250" r="220" stroke="#0D9488" strokeWidth="0.8" opacity="0.3" />
          <circle cx="250" cy="250" r="170" stroke="#0D9488" strokeWidth="0.8" opacity="0.4" />
          <circle cx="250" cy="250" r="120" stroke="#0D9488" strokeWidth="1.2" opacity="0.5" />
          <circle cx="250" cy="250" r="70" stroke="#D97706" strokeWidth="0.8" opacity="0.4" />
          <circle cx="250" cy="250" r="25" fill="#0D9488" opacity="0.4" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <line
              key={angle}
              x1={250 + 70 * Math.cos(angle * Math.PI / 180)}
              y1={250 + 70 * Math.sin(angle * Math.PI / 180)}
              x2={250 + 170 * Math.cos(angle * Math.PI / 180)}
              y2={250 + 170 * Math.sin(angle * Math.PI / 180)}
              stroke="#0D9488"
              strokeWidth="0.4"
              opacity="0.2"
            />
          ))}
        </motion.svg>
      </div>

      {/* Main content */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >

        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#0F172A] leading-[1.1] mb-6"
        >
          {t('headline').split(' ').map((word, i, arr) => (
            <span key={i}>
              {i === arr.length - 2 ? (
                <span className="gradient-text gradient-text-animated">{word} </span>
              ) : (
                <>{word} </>
              )}
            </span>
          ))}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-[#475569] text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t('subheadline')}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            onClick={scrollToProducts}
            size="lg"
            className="bg-[#0D9488] hover:bg-[#0F766E] text-white font-semibold px-8 h-12 rounded-2xl shadow-lg shadow-[#0D9488]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#0D9488]/30 hover:-translate-y-0.5"
          >
            {t('cta_products')}
            <ArrowDown className="size-4 ml-1" />
          </Button>

          <WhatsAppButton
            label={t('cta_whatsapp')}
            size="lg"
            variant="outline"
          />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[#94A3B8] text-xs font-medium tracking-wider uppercase">Scroll</span>
          <ArrowDown className="size-4 text-[#0D9488]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
