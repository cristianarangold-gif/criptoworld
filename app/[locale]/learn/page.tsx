import { getDictionary } from '@/lib/i18n/get-dictionary';
import { isValidLocale, type Locale } from '@/lib/i18n/config';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { GraduationCap, BookOpen, Shield, Cpu, TrendingUp, Clock, ArrowRight } from 'lucide-react';

const LEVELS = [
  {
    key: 'beginner',
    icon: BookOpen,
    color: 'text-green-500 bg-green-500/10 border-green-500/20',
    articles: [
      { en: 'What is Bitcoin?', es: '¿Qué es Bitcoin?' },
      { en: 'What is Cryptocurrency?', es: '¿Qué es una Criptomoneda?' },
      { en: 'How does Blockchain work?', es: '¿Cómo funciona Blockchain?' },
      { en: 'What is Ethereum?', es: '¿Qué es Ethereum?' },
      { en: 'What is a Crypto Wallet?', es: '¿Qué es una Wallet Cripto?' },
      { en: 'What is an Exchange?', es: '¿Qué es un Exchange?' },
      { en: 'What are Private Keys?', es: '¿Qué son las Claves Privadas?' },
      { en: 'What are Stablecoins?', es: '¿Qué son las Stablecoins?' },
    ],
  },
  {
    key: 'investing',
    icon: TrendingUp,
    color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    articles: [
      { en: 'How to buy Bitcoin', es: 'Cómo comprar Bitcoin' },
      { en: 'How to build a crypto portfolio', es: 'Cómo construir un portafolio cripto' },
      { en: 'Dollar Cost Averaging', es: 'Dollar Cost Averaging (DCA)' },
      { en: 'Risk Management', es: 'Gestión de Riesgo' },
      { en: 'Diversification', es: 'Diversificación' },
      { en: 'Market Capitalization', es: 'Capitalización de Mercado' },
      { en: 'Fundamental Analysis', es: 'Análisis Fundamental' },
    ],
  },
  {
    key: 'security',
    icon: Shield,
    color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    articles: [
      { en: 'How to protect your crypto', es: 'Cómo proteger tus criptomonedas' },
      { en: 'Seed phrases explained', es: 'Frases semilla explicadas' },
      { en: 'Hardware wallets', es: 'Wallets de hardware' },
      { en: 'Common crypto scams', es: 'Estafas cripto comunes' },
      { en: 'Phishing attacks', es: 'Ataques de phishing' },
      { en: 'Exchange security', es: 'Seguridad en exchanges' },
    ],
  },
  {
    key: 'advanced',
    icon: Cpu,
    color: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
    articles: [
      { en: 'DeFi explained', es: 'DeFi explicado' },
      { en: 'Staking guide', es: 'Guía de staking' },
      { en: 'Liquidity Pools', es: 'Pools de Liquidez' },
      { en: 'Smart Contracts', es: 'Contratos Inteligentes' },
      { en: 'Tokenomics', es: 'Tokenomics' },
      { en: 'Layer 1 vs Layer 2', es: 'Layer 1 vs Layer 2' },
      { en: 'Web3 fundamentals', es: 'Fundamentos de Web3' },
    ],
  },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = await getDictionary(locale as Locale);
  return {
    title: dict?.learn?.title ?? 'Crypto Academy',
    description: dict?.learn?.subtitle ?? '',
    alternates: {
      canonical: `/${locale}/learn`,
      languages: { en: '/en/learn', es: '/es/learn' },
    },
  };
}

export default async function LearnPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);
  const l = dict?.learn ?? ({} as Record<string, string>);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      <div className="mb-10 text-center">
        <div className="mb-3 flex items-center justify-center gap-2">
          <GraduationCap className="h-7 w-7 text-primary" />
          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">
            {l.title ?? 'Crypto Academy'}
          </h1>
        </div>
        <p className="mx-auto max-w-2xl text-muted-foreground">{l.subtitle ?? ''}</p>
      </div>

      <div className="space-y-10">
        {LEVELS.map((level) => {
          const Icon = level.icon;
          const title = (l as Record<string, string>)?.[level.key] ?? level.key;
          const desc = (l as Record<string, string>)?.[`${level.key}Desc`] ?? '';
          return (
            <section key={level.key}>
              <div className="mb-4 flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${level.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-foreground">{title}</h2>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {level.articles.map((article) => (
                  <div
                    key={article.en}
                    className={`group rounded-xl border bg-card/50 p-4 transition-all hover:shadow-[var(--shadow-md)] ${level.color.split(' ').pop()}`}
                  >
                    <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {locale === 'es' ? article.es : article.en}
                    </h3>
                    <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>5-8 {dict?.news?.minRead ?? 'min read'}</span>
                      <span className="rounded bg-accent px-1.5 py-0.5 text-[10px] font-medium capitalize">{title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
