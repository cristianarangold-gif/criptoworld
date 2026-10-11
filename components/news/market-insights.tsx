import { BarChart3, TrendingUp, Layers, Building2, Globe } from 'lucide-react';
import type { Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/get-dictionary';

const INSIGHTS_EN = [
  {
    icon: TrendingUp,
    title: 'Bitcoin Market Analysis',
    excerpt: 'An overview of Bitcoin\'s price action, key support and resistance levels, and what the current macro environment means for BTC.',
    tag: 'Bitcoin',
  },
  {
    icon: Layers,
    title: 'Ethereum Outlook',
    excerpt: 'Ethereum continues to evolve with network upgrades and growing DeFi adoption. Here\'s what to watch in the coming months.',
    tag: 'Ethereum',
  },
  {
    icon: BarChart3,
    title: 'Altcoin Market Overview',
    excerpt: 'Beyond BTC and ETH, the altcoin market shows interesting patterns. Key projects to monitor and sector rotations in play.',
    tag: 'Altcoins',
  },
  {
    icon: Building2,
    title: 'Institutional Crypto Adoption',
    excerpt: 'From ETF inflows to corporate treasury diversification, institutional participation in crypto markets continues to grow.',
    tag: 'Institutional',
  },
  {
    icon: Globe,
    title: 'Macro Events & Crypto',
    excerpt: 'Interest rates, inflation data, and geopolitical shifts — understanding how global macro events affect cryptocurrency valuations.',
    tag: 'Markets',
  },
];

const INSIGHTS_ES = [
  {
    icon: TrendingUp,
    title: 'Análisis del Mercado de Bitcoin',
    excerpt: 'Un análisis de la acción del precio de Bitcoin, niveles clave de soporte y resistencia, y qué significa el entorno macro actual para BTC.',
    tag: 'Bitcoin',
  },
  {
    icon: Layers,
    title: 'Perspectiva de Ethereum',
    excerpt: 'Ethereum continúa evolucionando con actualizaciones de red y creciente adopción DeFi. Esto es lo que hay que vigilar en los próximos meses.',
    tag: 'Ethereum',
  },
  {
    icon: BarChart3,
    title: 'Panorama del Mercado de Altcoins',
    excerpt: 'Más allá de BTC y ETH, el mercado de altcoins muestra patrones interesantes. Proyectos clave a monitorizar y rotaciones sectoriales.',
    tag: 'Altcoins',
  },
  {
    icon: Building2,
    title: 'Adopción Institucional Cripto',
    excerpt: 'Desde flujos de ETF hasta diversificación de tesorería corporativa, la participación institucional en los mercados cripto sigue creciendo.',
    tag: 'Institucional',
  },
  {
    icon: Globe,
    title: 'Eventos Macro y Cripto',
    excerpt: 'Tipos de interés, datos de inflación y cambios geopolíticos — cómo los eventos macro globales afectan las valoraciones de criptomonedas.',
    tag: 'Mercados',
  },
];

export function MarketInsights({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const insights = locale === 'es' ? INSIGHTS_ES : INSIGHTS_EN;
  const h = dict?.home ?? ({} as Record<string, string>);

  return (
    <section className="bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
        <div className="mb-8">
          <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
            {h.insightsTitle ?? 'Market Insights'}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">{h.insightsSubtitle ?? ''}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {insights.map((insight) => {
            const Icon = insight.icon;
            return (
              <article
                key={insight.title}
                className="group rounded-xl border border-border/50 bg-card/80 p-5 transition-all hover:border-primary/30 hover:shadow-[var(--shadow-md)]"
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <span className="rounded bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground">
                    {insight.tag}
                  </span>
                </div>
                <h3 className="font-display text-base font-bold text-foreground mb-2">{insight.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{insight.excerpt}</p>
                <p className="mt-3 text-[10px] text-muted-foreground/60 italic">
                  {locale === 'es' ? 'Editorial — Equipo CoinLens' : 'Editorial — CoinLens Team'}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
