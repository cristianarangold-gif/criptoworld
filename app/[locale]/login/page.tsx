import { getDictionary } from '@/lib/i18n/get-dictionary';
import { isValidLocale, type Locale } from '@/lib/i18n/config';
import { notFound } from 'next/navigation';
import { ComingSoon } from '@/components/shared/coming-soon';

export default async function LoginPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);
  return <ComingSoon locale={locale as Locale} dict={dict} />;
}
