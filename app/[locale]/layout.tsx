import type { ReactNode } from 'react';
import { isValidLocale, type Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import { I18nProvider } from '@/lib/i18n/context';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { CryptoTicker } from '@/components/layout/crypto-ticker';
import { CookieBanner } from '@/components/layout/cookie-banner';
import { OrganizationJsonLd } from './json-ld';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);

  return (
    <I18nProvider locale={locale as Locale} dict={dict}>
      <OrganizationJsonLd locale={locale as Locale} />
      <div className="flex min-h-screen flex-col">
        <CryptoTicker />
        <Header locale={locale as Locale} dict={dict} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale as Locale} dict={dict} />
        <CookieBanner dict={dict} />
      </div>
    </I18nProvider>
  );
}
