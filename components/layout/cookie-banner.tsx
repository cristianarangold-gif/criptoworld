'use client';

import { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n/context';
import type { Dictionary } from '@/lib/i18n/get-dictionary';

export function CookieBanner({ dict }: { dict: Dictionary }) {
  const [visible, setVisible] = useState(false);
  const { locale } = useI18n();

  useEffect(() => {
    const consent = localStorage.getItem('coinlens-cookie-consent');
    if (!consent) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem('coinlens-cookie-consent', 'accepted');
    setVisible(false);
  }

  function decline() {
    localStorage.setItem('coinlens-cookie-consent', 'declined');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/50 bg-card/95 p-4 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 sm:flex-row">
        <div className="flex items-start gap-3 flex-1">
          <Cookie className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <p className="text-sm text-muted-foreground">
            {dict?.cookies?.message ?? 'We use cookies to enhance your experience.'}{' '}
            <Link href={`/${locale}/legal/cookies`} className="text-primary hover:underline">
              {dict?.legal?.cookies ?? 'Cookie Policy'}
            </Link>
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={decline}
            className="rounded-lg border border-border px-4 py-1.5 text-sm font-medium text-muted-foreground hover:bg-accent/50 transition-colors"
          >
            {dict?.cookies?.decline ?? 'Decline'}
          </button>
          <button
            onClick={accept}
            className="rounded-lg bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            {dict?.cookies?.accept ?? 'Accept'}
          </button>
        </div>
      </div>
    </div>
  );
}
