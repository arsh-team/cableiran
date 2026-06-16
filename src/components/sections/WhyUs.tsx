'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ShieldCheck, BadgeDollarSign, Truck } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

const pillars = [
  { key: 'pillar1', icon: ShieldCheck, gradient: 'from-[#0D9488]/10 to-[#06B6D4]/10', iconColor: 'text-[#0D9488]' },
  { key: 'pillar2', icon: BadgeDollarSign, gradient: 'from-[#D97706]/10 to-[#F59E0B]/10', iconColor: 'text-[#D97706]' },
  { key: 'pillar3', icon: Truck, gradient: 'from-[#0D9488]/10 to-[#14B8A6]/10', iconColor: 'text-[#0D9488]' },
] as const;

export default function WhyUs() {
  const t = useTranslations('why_us');

  return (
    <section id="about" className="py-24 px-4 bg-[#F8FAFC] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full section-divider" />
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-[#0D9488]/3 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-[#D97706]/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block text-xs font-semibold tracking-wider uppercase text-[#0D9488] mb-3">Why Choose Us</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-4">
            {t('title')}
          </h2>
          <p className="text-[#64748B] text-base sm:text-lg max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Pillar cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.key}
                initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <GlassCard className="h-full text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${pillar.gradient} mb-6`}>
                    <Icon className={`size-7 ${pillar.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-[#0F172A] mb-3">
                    {t(`${pillar.key}_title`)}
                  </h3>
                  <p className="text-[#64748B] text-sm leading-relaxed">
                    {t(`${pillar.key}_desc`)}
                  </p>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
