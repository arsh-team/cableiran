// This file contains ONLY constants and types - safe for both client and server
export const locales = ['en', 'ar', 'ru', 'fa-AF', 'es', 'pt'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';
export const rtlLocales: Locale[] = ['ar', 'fa-AF'];

export function isRtl(locale: string): boolean {
  return rtlLocales.includes(locale as Locale);
}
