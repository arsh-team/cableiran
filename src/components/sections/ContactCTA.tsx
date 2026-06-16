'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Phone, Send, Clock, MessageCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { getWhatsAppLink, getTelegramLink } from '@/lib/whatsapp';

export default function ContactCTA() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    product: '',
    message: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const buildWhatsAppMessage = () => {
    const parts = [
      formData.name && `Name: ${formData.name}`,
      formData.country && `Country: ${formData.country}`,
      formData.product && `Product: ${formData.product}`,
      formData.message && `Message: ${formData.message}`,
    ].filter(Boolean);
    return parts.join('\n');
  };

  const whatsappLink = getWhatsAppLink(buildWhatsAppMessage());

  return (
    <section id="contact" className="py-24 px-4 relative bg-gradient-to-b from-[#F1F5F9] to-[#F8FAFC]">
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 section-divider" />

      {/* Background decoration */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-[#0D9488]/3 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-[#D97706]/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative">
        {/* Section header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block text-xs font-semibold tracking-wider uppercase text-[#0D9488] mb-3">Get In Touch</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-4">
            {t('title')}
          </h2>
          <p className="text-[#64748B] text-base sm:text-lg">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact form */}
          <motion.div
            className="glass-card-elevated glass-shimmer p-6 sm:p-8"
            initial={{ opacity: 0, x: -40, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#334155] mb-1.5">
                  {t('form_name')}
                </label>
                <Input
                  id="name"
                  placeholder={t('form_placeholder_name')}
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="bg-white/60 backdrop-blur-sm border-[#E2E8F0] text-[#0F172A] placeholder:text-[#94A3B8] rounded-xl focus:border-[#0D9488] focus:ring-[#0D9488]/20 transition-all"
                />
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium text-[#334155] mb-1.5">
                  {t('form_country')}
                </label>
                <Input
                  id="country"
                  placeholder={t('form_placeholder_country')}
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  className="bg-white/60 backdrop-blur-sm border-[#E2E8F0] text-[#0F172A] placeholder:text-[#94A3B8] rounded-xl focus:border-[#0D9488] focus:ring-[#0D9488]/20 transition-all"
                />
              </div>

              <div>
                <label htmlFor="product" className="block text-sm font-medium text-[#334155] mb-1.5">
                  {t('form_product')}
                </label>
                <Input
                  id="product"
                  placeholder={t('form_placeholder_product')}
                  value={formData.product}
                  onChange={(e) => handleInputChange('product', e.target.value)}
                  className="bg-white/60 backdrop-blur-sm border-[#E2E8F0] text-[#0F172A] placeholder:text-[#94A3B8] rounded-xl focus:border-[#0D9488] focus:ring-[#0D9488]/20 transition-all"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#334155] mb-1.5">
                  {t('form_message')}
                </label>
                <Textarea
                  id="message"
                  placeholder={t('form_placeholder_message')}
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className="bg-white/60 backdrop-blur-sm border-[#E2E8F0] text-[#0F172A] placeholder:text-[#94A3B8] rounded-xl focus:border-[#0D9488] focus:ring-[#0D9488]/20 min-h-[100px] transition-all"
                />
              </div>

              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="block">
                <Button className="w-full bg-[#22C55E] hover:bg-[#16A34A] text-white font-semibold h-11 rounded-xl whatsapp-pulse shadow-lg shadow-[#22C55E]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#22C55E]/30">
                  <Send className="size-4 mr-2" />
                  {t('form_send')}
                </Button>
              </a>
            </div>
          </motion.div>

          {/* Contact info */}
          <motion.div
            className="flex flex-col gap-5"
            initial={{ opacity: 0, x: 40, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Phone */}
            <div className="glass-card p-5 flex items-center gap-4 hover:shadow-lg hover:shadow-[#0D9488]/5 transition-all duration-300">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0D9488]/10 to-[#06B6D4]/10 shrink-0">
                <Phone className="size-5 text-[#0D9488]" />
              </div>
              <div>
                <p className="text-xs text-[#94A3B8] mb-0.5 font-medium uppercase tracking-wider">{t('phone')}</p>
                <a
                  href="tel:+989192960344"
                  className="text-lg font-semibold text-[#0F172A] hover:text-[#0D9488] transition-colors"
                  dir="ltr"
                >
                  {t('phone_number')}
                </a>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="glass-card p-5 flex items-center gap-4 hover:shadow-lg hover:shadow-[#22C55E]/5 transition-all duration-300">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-[#22C55E]/10 to-[#16A34A]/10 shrink-0">
                <MessageCircle className="size-5 text-[#22C55E]" />
              </div>
              <div>
                <p className="text-xs text-[#94A3B8] mb-1 font-medium uppercase tracking-wider">{t('whatsapp')}</p>
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#22C55E] text-sm font-semibold hover:underline"
                >
                  wa.me/989192960344
                </a>
              </div>
            </div>

            {/* Telegram */}
            <div className="glass-card p-5 flex items-center gap-4 hover:shadow-lg hover:shadow-[#0EA5E9]/5 transition-all duration-300">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0EA5E9]/10 to-[#0284C7]/10 shrink-0">
                <Send className="size-5 text-[#0EA5E9]" />
              </div>
              <div>
                <p className="text-xs text-[#94A3B8] mb-1 font-medium uppercase tracking-wider">{t('telegram')}</p>
                <a
                  href={getTelegramLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0EA5E9] text-sm font-semibold hover:underline"
                >
                  t.me/+989192960344
                </a>
              </div>
            </div>

            {/* Response time */}
            <div className="glass-card p-5 text-center bg-gradient-to-br from-[#0D9488]/5 to-[#D97706]/5">
              <div className="flex items-center justify-center gap-2">
                <Clock className="size-4 text-[#D97706]" />
                <p className="text-[#D97706] text-sm font-semibold">
                  {t('subtitle')}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
