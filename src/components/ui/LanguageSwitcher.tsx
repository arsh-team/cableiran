'use client';

import { useCallback } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { locales, type Locale } from '@/i18n-config';

const localeFlags: Record<string, string> = {
  en: '🇬🇧',
  ar: '🇸🇦',
  ru: '🇷🇺',
  'fa-AF': '🇦🇫',
  es: '🇪🇸',
  pt: '🇧🇷',
};

export default function LanguageSwitcher() {
  const t = useTranslations('languages');
  const currentLocale = useLocale();

  const handleChange = useCallback(async (locale: Locale) => {
    try {
      await fetch('/api/locale', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ locale }),
      });
      window.location.reload();
    } catch {
      window.location.href = `${window.location.pathname}?locale=${locale}`;
    }
  }, []);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-[#64748B] hover:text-[#0D9488] hover:bg-[#0D9488]/5"
          aria-label={t(currentLocale as Locale)}
        >
          <Globe className="size-4" />
          <span className="hidden sm:inline text-sm">
            {localeFlags[currentLocale]} {t(currentLocale as Locale)}
          </span>
          <span className="sm:hidden text-lg">{localeFlags[currentLocale]}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-48 p-1 bg-white/90 backdrop-blur-xl border-[rgba(13,148,136,0.15)] shadow-xl"
        align="end"
      >
        {locales.map((locale) => (
          <button
            key={locale}
            onClick={() => handleChange(locale)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
              currentLocale === locale
                ? 'bg-[#0D9488]/10 text-[#0D9488] font-medium'
                : 'text-[#475569] hover:bg-[#0D9488]/5 hover:text-[#0F172A]'
            }`}
          >
            <span className="text-lg">{localeFlags[locale]}</span>
            <span>{t(locale)}</span>
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
}
