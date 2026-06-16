import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';
import { locales, defaultLocale, type Locale } from './i18n-config';

const messageImports: Record<Locale, () => Promise<{ default: Record<string, unknown> }>> = {
  en: () => import('../messages/en.json'),
  ar: () => import('../messages/ar.json'),
  ru: () => import('../messages/ru.json'),
  'fa-AF': () => import('../messages/fa-AF.json'),
  es: () => import('../messages/es.json'),
  pt: () => import('../messages/pt.json'),
};

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get('NEXT_LOCALE')?.value;
  const locale = locales.includes(localeCookie as Locale) ? (localeCookie as Locale) : defaultLocale;

  const messages = (await messageImports[locale]()).default;

  return {
    locale,
    messages,
  };
});
