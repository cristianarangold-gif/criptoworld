'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, ExternalLink, ArrowRight, Newspaper } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';
import { timeAgo } from '@/lib/utils';
import type { NewsArticleType } from '@/types';

export function LatestNews() {
  const { dict, locale } = useI18n();
  const [articles, setArticles] = useState<NewsArticleType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch('/api/news?limit=7');
        if (!res.ok) return;
        const json = await res.json();
        if (!cancelled) setArticles(json?.data ?? []);
      } catch {
        // silent
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const h = dict?.home ?? ({} as Record<string, string>);
  const n = dict?.news ?? ({} as Record<string, string>);
  const featured = articles?.[0];
  const rest = articles?.slice(1) ?? [];

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
            {h.latestNewsTitle ?? 'Latest Crypto News'}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">{h.latestNewsSubtitle ?? ''}</p>
        </div>
        <Link
          href={`/${locale}/news`}
          className="hidden items-center gap-1 rounded-lg bg-accent/50 px-3 py-1.5 text-sm font-medium text-foreground hover:bg-accent transition-colors sm:flex"
        >
          {h.viewAllNews ?? 'View All News'}
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {loading ? (
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="h-80 animate-pulse rounded-xl bg-muted" />
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-24 animate-pulse rounded-xl bg-muted" />
            ))}
          </div>
        </div>
      ) : articles?.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-12 text-muted-foreground">
          <Newspaper className="h-10 w-10" />
          <p className="text-sm">{n.noArticles ?? 'No articles found.'}</p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Featured article */}
          {featured && (
            <article className="group relative overflow-hidden rounded-xl border border-border/50 bg-card/50 transition-all hover:border-primary/30 hover:shadow-[var(--shadow-md)]">
              {featured.image && (
                <div className="relative aspect-video bg-muted">
                  <Image
                    src={featured.image}
                    alt={featured.title ?? 'article'}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              )}
              <div className="p-5">
                {featured.category && (
                  <span className="inline-block rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary mb-2">
                    {locale === 'es' ? featured.category.nameEs : featured.category.nameEn}
                  </span>
                )}
                <h3 className="font-display text-lg font-bold text-foreground line-clamp-2 mb-2">
                  {featured.originalUrl ? (
                    <a href={featured.originalUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                      {featured.title}
                    </a>
                  ) : featured.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{featured.excerpt ?? ''}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  {featured.author && <span>{featured.author}</span>}
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {featured.readTimeMinutes ?? 1} {n.minRead ?? 'min read'}
                  </span>
                  {featured.originalPublishedAt && <span>{timeAgo(featured.originalPublishedAt)}</span>}
                  {featured.sourceName && (
                    <span className="flex items-center gap-1 text-primary">
                      <ExternalLink className="h-3 w-3" />
                      {featured.sourceName}
                    </span>
                  )}
                  {featured.isEditorial && (
                    <span className="rounded bg-primary/20 px-1.5 py-0.5 text-primary text-[10px] font-medium">
                      {n.editorial ?? 'Editorial'}
                    </span>
                  )}
                </div>
              </div>
            </article>
          )}

          {/* Side articles */}
          <div className="space-y-4">
            {rest.map((article: NewsArticleType) => (
              <article
                key={article?.id}
                className="group flex gap-4 rounded-xl border border-border/50 bg-card/50 p-4 transition-all hover:border-primary/30 hover:shadow-[var(--shadow-md)]"
              >
                {article.image && (
                  <div className="relative aspect-square w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                    <Image
                      src={article.image}
                      alt={article.title ?? 'article'}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  {article.category && (
                    <span className="inline-block rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary mb-1">
                      {locale === 'es' ? article.category.nameEs : article.category.nameEn}
                    </span>
                  )}
                  <h4 className="text-sm font-semibold text-foreground line-clamp-2 mb-1">
                    {article.originalUrl ? (
                      <a href={article.originalUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                        {article.title}
                      </a>
                    ) : article.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    {article.readTimeMinutes && (
                      <span className="flex items-center gap-0.5">
                        <Clock className="h-3 w-3" />
                        {article.readTimeMinutes} {n.minRead ?? 'min'}
                      </span>
                    )}
                    {article.originalPublishedAt && <span>{timeAgo(article.originalPublishedAt)}</span>}
                    {article.sourceName && (
                      <span className="text-primary">{article.sourceName}</span>
                    )}
                    {article.isEditorial && (
                      <span className="rounded bg-primary/20 px-1 py-0.5 text-primary text-[10px] font-medium">
                        {n.editorial ?? 'Editorial'}
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* Mobile CTA */}
      <div className="mt-6 text-center sm:hidden">
        <Link
          href={`/${locale}/news`}
          className="inline-flex items-center gap-1 rounded-lg bg-accent/50 px-4 py-2 text-sm font-medium text-foreground hover:bg-accent transition-colors"
        >
          {h.viewAllNews ?? 'View All News'}
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
}
