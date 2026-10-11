import type { Locale } from '@/lib/i18n/config';

export function OrganizationJsonLd({ locale }: { locale: Locale }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'CoinLens',
    url: `https://coinlens.com/${locale}`,
    logo: 'https://fastly.mwm-storage.mwmcdn.com/raw_files/25fc85dc-f88f-4949-8785-423f8dd6ae15',
    description: locale === 'es'
      ? 'Plataforma de finanzas cripto con precios en tiempo real, noticias verificadas y recursos educativos.'
      : 'Crypto finance platform with real-time prices, verified news, and educational resources.',
    sameAs: [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
