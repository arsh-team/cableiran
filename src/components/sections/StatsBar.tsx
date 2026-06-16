'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Building2, Globe2, Cable, Award } from 'lucide-react';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

const stats = [
  { key: 'years', value: 40, Icon: Building2 },
  { key: 'countries', value: 35, Icon: Globe2 },
  { key: 'cable_types', value: 200, Icon: Cable },
  { key: 'standards', value: 50, Icon: Award },
] as const;

export default function StatsBar() {
  const t = useTranslations('stats');

  return (
    <section className="relative py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="glass-card-elevated glass-shimmer p-6 sm:p-8"
          initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.Icon;
              return (
                <motion.div
                  key={stat.key}
                  className="text-center group"
                  initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#0D9488]/8 mb-3 group-hover:bg-[#0D9488]/15 transition-colors duration-300">
                    <Icon className="size-5 text-[#0D9488]" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold gradient-text mb-1">
                    <AnimatedCounter
                      target={stat.value}
                      suffix="+"
                      duration={2}
                    />
                  </div>
                  <div className="text-[#64748B] text-xs sm:text-sm font-medium">
                    {t(stat.key)}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
