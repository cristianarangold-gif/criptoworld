import { getDictionary } from '@/lib/i18n/get-dictionary';
import { isValidLocale, type Locale } from '@/lib/i18n/config';
import { HeroSection } from '@/components/market/hero-section';
import { TrendingCoins } from '@/components/market/trending-coins';
import { LatestNews } from '@/components/news/latest-news';
import { MarketInsights } from '@/components/news/market-insights';
import { TopGainersLosers } from '@/components/market/top-gainers-losers';
import { AcademyTeaser } from '@/components/home/academy-teaser';
import { NewsletterForm } from '@/components/home/newsletter-form';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = await getDictionary(locale as Locale);
  return {
    title: `CoinLens — ${dict?.site?.tagline ?? 'Your lens into the crypto market'}`,
    description: dict?.site?.description ?? '',
    alternates: {
      canonical: `/${locale}`,
      languages: { en: '/en', es: '/es' },
    },
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <HeroSection />
      <TrendingCoins />
      <LatestNews />
      <MarketInsights locale={locale as Locale} dict={dict} />
      <TopGainersLosers />
      <AcademyTeaser locale={locale as Locale} dict={dict} />
      <NewsletterForm />
    </>
  );
}
