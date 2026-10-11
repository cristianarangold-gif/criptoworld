'use client';

import { useState } from 'react';
import { Mail, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';

export function NewsletterForm() {
  const { dict, locale } = useI18n();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'exists'>('idle');

  const h = dict?.home ?? ({} as Record<string, string>);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), locale }),
      });
      if (res.status === 409) {
        setStatus('exists');
        return;
      }
      if (!res.ok) {
        setStatus('error');
        return;
      }
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section className="bg-gradient-to-b from-primary/5 via-primary/10 to-transparent">
      <div className="mx-auto max-w-7xl px-4 py-14 lg:px-6">
        <div className="mx-auto max-w-xl text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <Mail className="h-6 w-6 text-primary" />
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
              {h.newsletterTitle ?? 'Crypto Daily Newsletter'}
            </h2>
          </div>
          <p className="mb-6 text-sm text-muted-foreground">
            {h.newsletterSubtitle ?? 'Get crypto news in your inbox.'}
          </p>

          {status === 'success' ? (
            <div className="flex items-center justify-center gap-2 rounded-lg bg-green-500/10 p-4 text-green-500">
              <CheckCircle className="h-5 w-5" />
              <span className="text-sm font-medium">{h.newsletterSuccess ?? 'Successfully subscribed!'}</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-3">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setStatus('idle'); }}
                  placeholder={h.newsletterPlaceholder ?? 'Enter your email'}
                  className="w-full rounded-lg border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
              >
                {status === 'loading' && <Loader2 className="h-4 w-4 animate-spin" />}
                {h.newsletterCta ?? 'Subscribe'}
              </button>
            </form>
          )}

          {status === 'error' && (
            <div className="mt-3 flex items-center justify-center gap-1 text-xs text-red-500">
              <AlertCircle className="h-3.5 w-3.5" />
              {h.newsletterError ?? 'Something went wrong.'}
            </div>
          )}
          {status === 'exists' && (
            <div className="mt-3 flex items-center justify-center gap-1 text-xs text-amber-500">
              <AlertCircle className="h-3.5 w-3.5" />
              {h.newsletterExists ?? 'Already subscribed.'}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
