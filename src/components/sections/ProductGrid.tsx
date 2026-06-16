'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/ui/GlassCard';
import { getProductIcon } from '@/components/ui/ProductIcons';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { products, categories } from '@/lib/products';
import { getProductInquiryLink } from '@/lib/whatsapp';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import type { Product } from '@/lib/products';

export default function ProductGrid() {
  const t = useTranslations();
  const locale = useLocale();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = activeFilter === 'all'
    ? products
    : products.filter((p) => p.category === activeFilter);

  return (
    <section id="products" className="py-24 px-4 bg-gradient-to-b from-[#F8FAFC] to-[#F1F5F9]">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block text-xs font-semibold tracking-wider uppercase text-[#0D9488] mb-3">Our Products</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-4">
            {t('products.title')}
          </h2>
          <p className="text-[#64748B] text-base sm:text-lg max-w-2xl mx-auto">
            {t('products.subtitle')}
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeFilter === cat.id
                  ? 'bg-[#0D9488] text-white shadow-lg shadow-[#0D9488]/20'
                  : 'text-[#64748B] hover:text-[#0D9488] hover:bg-[#0D9488]/5 bg-white/60 backdrop-blur-sm border border-[#E2E8F0]'
              }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {t(`products.${cat.key}`)}
            </motion.button>
          ))}
        </motion.div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9, filter: 'blur(4px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.9, filter: 'blur(4px)' }}
                transition={{ duration: 0.4, delay: index * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <GlassCard className="flex flex-col h-full">
                  {/* Icon */}
                  <div className="mb-4 flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0D9488]/10 to-[#06B6D4]/10">
                    {getProductIcon(product.icon, 36)}
                  </div>

                  {/* Category badge */}
                  <span className="inline-block self-start text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-lg bg-[#0D9488]/8 text-[#0D9488] mb-3">
                    {t(`products.category_${product.category}`)}
                  </span>

                  {/* Name */}
                  <h3 className="text-lg font-semibold text-[#0F172A] mb-2 leading-snug">
                    {t(`product_names.${product.slug}`)}
                  </h3>

                  {/* Description - truncated */}
                  <p className="text-[#64748B] text-sm leading-relaxed mb-3 line-clamp-2">
                    {t(`product_descriptions.${product.slug}`)}
                  </p>

                  {/* Spec summary */}
                  <p className="text-xs text-[#D97706]/80 mb-4 font-mono leading-relaxed">
                    {t(`product_specs.${product.slug}`)}
                  </p>

                  {/* Actions */}
                  <div className="mt-auto flex flex-col gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[#0D9488] hover:bg-[#0D9488]/10 justify-center gap-1.5 rounded-xl"
                      onClick={() => setSelectedProduct(product)}
                    >
                      <Info className="size-3.5" />
                      {t('products.learn_more')}
                    </Button>
                    <a
                      href={getProductInquiryLink(t(`product_names.${product.slug}`), locale)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-[#22C55E]/30 text-[#22C55E] hover:bg-[#22C55E]/8 hover:border-[#22C55E]/50 gap-1.5 rounded-xl"
                      >
                        <ExternalLink className="size-3.5" />
                        {t('products.inquire')}
                      </Button>
                    </a>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Product detail dialog */}
        <Dialog
          open={!!selectedProduct}
          onOpenChange={(open) => !open && setSelectedProduct(null)}
        >
          {selectedProduct && (
            <DialogContent className="bg-white/95 backdrop-blur-2xl border-[rgba(13,148,136,0.15)] max-w-lg max-h-[85vh] overflow-y-auto shadow-2xl">
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0D9488]/10 to-[#06B6D4]/10">
                    {getProductIcon(selectedProduct.icon, 32)}
                  </div>
                  <div>
                    <DialogTitle className="text-[#0F172A] text-lg">
                      {t(`product_names.${selectedProduct.slug}`)}
                    </DialogTitle>
                    <span className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-lg bg-[#0D9488]/8 text-[#0D9488]">
                      {t(`products.category_${selectedProduct.category}`)}
                    </span>
                  </div>
                </div>
                <DialogDescription className="text-[#64748B] text-sm leading-relaxed pt-2">
                  {t(`product_descriptions.${selectedProduct.slug}`)}
                </DialogDescription>
              </DialogHeader>

              {/* Specifications */}
              <div className="space-y-4 mt-2">
                <div>
                  <h4 className="text-sm font-semibold text-[#0F172A] mb-2">
                    {t('product_detail.specifications')}
                  </h4>
                  <p className="text-sm text-[#D97706] font-mono leading-relaxed bg-[#D97706]/5 rounded-xl p-3">
                    {t(`product_specs.${selectedProduct.slug}`)}
                  </p>
                </div>

                {/* Standards */}
                <div>
                  <h4 className="text-sm font-semibold text-[#0F172A] mb-2">
                    {t('product_detail.standards')}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {(t.raw(`product_standards.${selectedProduct.slug}`) as string[]).map((standard) => (
                      <span
                        key={standard}
                        className="inline-block px-3 py-1 rounded-lg text-xs font-medium bg-[#0D9488]/8 text-[#0D9488] border border-[#0D9488]/15"
                      >
                        {standard}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Inquire button */}
                <div className="pt-4 border-t border-[#E2E8F0]">
                  <WhatsAppButton
                    message={
                      locale === 'en'
                        ? `Hello, I'm interested in your ${t(`product_names.${selectedProduct.slug}`)}. Please provide more information.`
                        : undefined
                    }
                    label={t('product_detail.inquire')}
                    size="md"
                    className="w-full"
                  />
                </div>
              </div>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </section>
  );
}
