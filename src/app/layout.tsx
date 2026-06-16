import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getLocale } from 'next-intl/server';
import { Inter } from "next/font/google";
import { isRtl } from '@/i18n-config';
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-geist-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Iranian Cable & Telecom — Global Fiber Optic & Power Cable Manufacturer",
  description: "Iran's leading manufacturer of fiber optic telecom cables, power lines, and network cables. International standards, competitive pricing, worldwide shipping.",
  openGraph: {
    title: "Iranian Cable & Telecom — Global Manufacturer",
    description: "Premium fiber optic and power cables from Iran's #1 manufacturer",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  const rtl = isRtl(locale);

  return (
    <html lang={locale} dir={rtl ? 'rtl' : 'ltr'} className={inter.variable}>
      <body className="antialiased min-h-screen flex flex-col bg-[#F8FAFC] overflow-x-hidden">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
