import { getDictionary } from '@/lib/i18n/get-dictionary';
import { isValidLocale, type Locale } from '@/lib/i18n/config';
import { notFound } from 'next/navigation';
import { Scale } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = await getDictionary(locale as Locale);
  return { title: dict?.legal?.terms ?? 'Terms of Service' };
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const isEs = locale === 'es';

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 lg:px-6">
      <div className="mb-8 flex items-center gap-3">
        <Scale className="h-6 w-6 text-primary" />
        <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">
          {isEs ? 'Términos de Servicio' : 'Terms of Service'}
        </h1>
      </div>
      <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground">
        <p>{isEs ? 'Última actualización: Septiembre 2026' : 'Last updated: September 2026'}</p>
        <h2>{isEs ? '1. Aceptación de los Términos' : '1. Acceptance of Terms'}</h2>
        <p>{isEs ? 'Al acceder y utilizar CoinLens, aceptas estos términos de servicio. Si no estás de acuerdo con alguno de estos términos, por favor no utilices nuestro sitio web.' : 'By accessing and using CoinLens, you agree to these terms of service. If you do not agree with any of these terms, please do not use our website.'}</p>
        <h2>{isEs ? '2. Descripción del Servicio' : '2. Description of Service'}</h2>
        <p>{isEs ? 'CoinLens proporciona información sobre el mercado de criptomonedas, incluyendo precios, noticias y contenido educativo. Esta información es únicamente con fines informativos y educativos.' : 'CoinLens provides cryptocurrency market information, including prices, news, and educational content. This information is for informational and educational purposes only.'}</p>
        <h2>{isEs ? '3. Sin Asesoramiento Financiero' : '3. No Financial Advice'}</h2>
        <p>{isEs ? 'Nada de lo publicado en CoinLens constituye asesoramiento financiero, de inversión o de trading. Siempre realiza tu propia investigación antes de tomar decisiones de inversión.' : 'Nothing published on CoinLens constitutes financial, investment, or trading advice. Always do your own research before making investment decisions.'}</p>
        <h2>{isEs ? '4. Propiedad Intelectual' : '4. Intellectual Property'}</h2>
        <p>{isEs ? 'Todo el contenido original de CoinLens está protegido por derechos de autor. Las noticias agregadas de fuentes externas se atribuyen a sus respectivas fuentes originales.' : 'All original CoinLens content is protected by copyright. Aggregated news from external sources is attributed to their respective original sources.'}</p>
        <h2>{isEs ? '5. Limitación de Responsabilidad' : '5. Limitation of Liability'}</h2>
        <p>{isEs ? 'CoinLens no será responsable de las pérdidas financieras que puedan resultar del uso de la información proporcionada en esta plataforma.' : 'CoinLens shall not be liable for financial losses that may result from using the information provided on this platform.'}</p>
      </div>
    </div>
  );
}
