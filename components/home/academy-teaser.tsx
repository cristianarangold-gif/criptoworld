import Link from 'next/link';
import { GraduationCap, BookOpen, Shield, Cpu, ArrowRight } from 'lucide-react';
import type { Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/get-dictionary';

const LEVELS = [
  { key: 'beginner', icon: BookOpen, color: 'text-green-500 bg-green-500/10' },
  { key: 'investing', icon: GraduationCap, color: 'text-blue-500 bg-blue-500/10' },
  { key: 'security', icon: Shield, color: 'text-amber-500 bg-amber-500/10' },
  { key: 'advanced', icon: Cpu, color: 'text-purple-500 bg-purple-500/10' },
] as const;

export function AcademyTeaser({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const h = dict?.home ?? ({} as Record<string, string>);
  const l = dict?.learn ?? ({} as Record<string, string>);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
      <div className="mb-8 text-center">
        <div className="mb-3 flex items-center justify-center gap-2">
          <GraduationCap className="h-6 w-6 text-primary" />
          <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
            {h.academyTitle ?? 'Crypto Academy'}
          </h2>
        </div>
        <p className="text-sm text-muted-foreground">{h.academySubtitle ?? ''}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {LEVELS.map((level) => {
          const Icon = level.icon;
          const title = (l as Record<string, string>)?.[level.key] ?? level.key;
          const desc = (l as Record<string, string>)?.[`${level.key}Desc`] ?? '';
          return (
            <Link
              key={level.key}
              href={`/${locale}/learn`}
              className="group rounded-xl border border-border/50 bg-card/80 p-5 transition-all hover:border-primary/30 hover:shadow-[var(--shadow-md)]"
            >
              <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${level.color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-base font-bold text-foreground mb-1">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{desc}</p>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 text-center">
        <Link
          href={`/${locale}/learn`}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          {h.academyCta ?? 'Start Learning'}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
