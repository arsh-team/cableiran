'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const posters = [
  { src: '/images/poster1.jpg', alt: 'CableIran Poster 1' },
  { src: '/images/poster2.jpg', alt: 'CableIran Poster 2' },
  { src: '/images/poster3.png', alt: 'CableIran Poster 3' },
];

export default function PosterGallery() {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [active, close]);

  return (
    <section className="py-20 px-4 bg-[#F8FAFC] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 section-divider" />
      <div className="absolute top-1/3 -right-40 w-80 h-80 bg-[#0D9488]/3 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -left-40 w-80 h-80 bg-[#D97706]/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block text-xs font-semibold tracking-wider uppercase text-[#0D9488] mb-3">Gallery</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-4">
            Our Posters
          </h2>
          <p className="text-[#64748B] text-base sm:text-lg max-w-2xl mx-auto">
            Explore our latest promotional materials and brand visuals
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posters.map((poster, index) => (
            <motion.div
              key={poster.src}
              initial={{ opacity: 0, y: 50, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: index * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94] as const,
              }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative cursor-pointer"
              onClick={() => setActive(index)}
            >
              <div className="relative rounded-3xl overflow-hidden bg-white shadow-lg shadow-[#0D9488]/5 border border-[#E2E8F0] transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-[#0D9488]/15 group-hover:border-[#0D9488]/30">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={poster.src}
                    alt={poster.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="inline-block text-xs font-semibold tracking-wider uppercase text-white/90 bg-[#0D9488]/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      {poster.alt}
                    </span>
                  </div>
                </div>
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-[#0F172A]/80 backdrop-blur-xl" />

            {/* Close button */}
            <button
              onClick={close}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 p-2.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-lg text-white hover:bg-white/20 hover:scale-110 transition-all duration-300"
              aria-label="Close fullscreen view"
            >
              <X className="size-6" />
            </button>

            {/* Image */}
            <motion.img
              src={posters[active].src}
              alt={posters[active].alt}
              className="relative z-10 max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
