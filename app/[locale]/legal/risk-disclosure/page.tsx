import { getDictionary } from '@/lib/i18n/get-dictionary';
import { isValidLocale, type Locale } from '@/lib/i18n/config';
import { notFound } from 'next/navigation';
import { AlertTriangle } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = await getDictionary(locale as Locale);
  return { title: dict?.legal?.riskDisclosure ?? 'Risk Disclosure' };
}

export default async function RiskDisclosurePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const isEs = locale === 'es';

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 lg:px-6">
      <div className="mb-8 flex items-center gap-3">
        <AlertTriangle className="h-6 w-6 text-warning" />
        <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">
          {isEs ? 'Aviso de Riesgo' : 'Risk Disclosure'}
        </h1>
      </div>
      <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground">
        <div className="rounded-lg border border-warning/20 bg-warning/5 p-4 not-prose mb-6">
          <p className="text-sm font-medium text-foreground">
            {isEs
              ? 'Las inversiones en criptomonedas implican un riesgo significativo. La información proporcionada en este sitio web es solo con fines educativos e informativos y no debe considerarse asesoramiento financiero.'
              : 'Cryptocurrency investments involve significant risk. The information provided on this website is for educational and informational purposes only and should not be considered financial advice.'}
          </p>
        </div>
        <h2>{isEs ? '1. Volatilidad del Mercado' : '1. Market Volatility'}</h2>
        <p>{isEs ? 'Los mercados de criptomonedas son extremadamente volátiles. Los precios pueden experimentar cambios drásticos en periodos muy cortos. El valor de tu inversión puede disminuir significativamente.' : 'Cryptocurrency markets are extremely volatile. Prices can experience dramatic changes in very short periods. The value of your investment may decrease significantly.'}</p>
        <h2>{isEs ? '2. Riesgo de Pérdida Total' : '2. Risk of Total Loss'}</h2>
        <p>{isEs ? 'Existe la posibilidad de perder la totalidad de tu inversión en criptomonedas. Nunca inviertas más de lo que puedas permitirte perder.' : 'There is a possibility of losing your entire cryptocurrency investment. Never invest more than you can afford to lose.'}</p>
        <h2>{isEs ? '3. Sin Garantías' : '3. No Guarantees'}</h2>
        <p>{isEs ? 'CoinLens no garantiza la exactitud de los datos del mercado ni el rendimiento de ninguna criptomoneda. Los datos se proporcionan tal cual desde fuentes de terceros.' : 'CoinLens does not guarantee the accuracy of market data or the performance of any cryptocurrency. Data is provided as-is from third-party sources.'}</p>
        <h2>{isEs ? '4. Haz tu Propia Investigación' : '4. Do Your Own Research'}</h2>
        <p>{isEs ? 'Siempre realiza tu propia investigación antes de tomar decisiones de inversión. Consulta con un asesor financiero profesional si tienes dudas.' : 'Always do your own research before making investment decisions. Consult with a professional financial advisor if you have doubts.'}</p>
      </div>
    </div>
  );
}
