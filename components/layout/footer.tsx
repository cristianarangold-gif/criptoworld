import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';
import type { Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/get-dictionary';

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const f = dict?.footer ?? ({} as Record<string, string>);
  const l = dict?.legal ?? ({} as Record<string, string>);

  const sections = [
    {
      title: f.market ?? 'Market',
      links: [
        { label: f.cryptocurrencies ?? 'Cryptocurrencies', href: `/${locale}/markets` },
        { label: f.bitcoin ?? 'Bitcoin', href: `/${locale}/markets` },
        { label: f.ethereum ?? 'Ethereum', href: `/${locale}/markets` },
        { label: f.trending ?? 'Trending', href: `/${locale}/markets` },
      ],
    },
    {
      title: f.resources ?? 'Resources',
      links: [
        { label: dict?.nav?.news ?? 'News', href: `/${locale}/news` },
        { label: f.cryptoAcademy ?? 'Crypto Academy', href: `/${locale}/learn` },
        { label: f.marketAnalysis ?? 'Market Analysis', href: `/${locale}/news` },
      ],
    },
    {
      title: f.legalTitle ?? 'Legal',
      links: [
        { label: l.privacy ?? 'Privacy', href: `/${locale}/legal/privacy` },
        { label: l.terms ?? 'Terms', href: `/${locale}/legal/terms` },
        { label: l.cookies ?? 'Cookies', href: `/${locale}/legal/cookies` },
        { label: l.riskDisclosure ?? 'Risk Disclosure', href: `/${locale}/legal/risk-disclosure` },
      ],
    },
  ];

  return (
    <footer className="border-t border-border/50 bg-card/50">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href={`/${locale}`} className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="font-display text-sm font-bold text-primary-foreground">CL</span>
              </div>
              <span className="font-display text-lg font-bold tracking-tight">
                Coin<span className="text-primary">Lens</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {dict?.site?.description ?? 'Real-time crypto prices, market data, verified news.'}
            </p>
          </div>

          {/* Link columns */}
          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="mb-3 text-sm font-semibold text-foreground">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-10 rounded-lg border border-warning/20 bg-warning/5 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
            <p className="text-xs leading-relaxed text-muted-foreground">
              {f.disclaimer ?? 'Cryptocurrency investments involve significant risk.'}
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-border/50 pt-6">
          <p className="text-center text-xs text-muted-foreground">
            {f.copyright ?? '© 2026 CoinLens. All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  );
}
