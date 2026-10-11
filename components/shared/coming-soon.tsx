import { Construction, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/get-dictionary';

export function ComingSoon({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const c = dict?.common ?? ({} as Record<string, string>);
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-24 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
        <Construction className="h-8 w-8 text-primary" />
      </div>
      <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">
        {c.comingSoon ?? 'Coming Soon'}
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        {c.comingSoonDesc ?? 'This feature is under development and will be available in the next milestone.'}
      </p>
      <Link
        href={`/${locale}`}
        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        {c.backHome ?? 'Back to Home'}
      </Link>
    </div>
  );
}
