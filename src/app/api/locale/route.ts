import { NextResponse } from 'next/server';
import { locales, type Locale } from '@/i18n-config';

export async function POST(request: Request) {
  const body = await request.json();
  const locale = body.locale as Locale;

  if (!locales.includes(locale)) {
    return NextResponse.json({ error: 'Invalid locale' }, { status: 400 });
  }

  const response = NextResponse.json({ success: true, locale });
  response.cookies.set('NEXT_LOCALE', locale, {
    path: '/',
    maxAge: 31536000,
  });

  return response;
}
