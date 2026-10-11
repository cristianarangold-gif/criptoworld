'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Newspaper, Clock, ExternalLink, Filter } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';
import { timeAgo } from '@/lib/utils';
import type { NewsArticleType } from '@/types';

interface CategoryItem {
  id: number;
  slug: string;
  nameEn: string;
  nameEs: string;
}

export default function NewsPage() {
  const { dict, locale } = useI18n();
  const [articles, setArticles] = useState<NewsArticleType[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('');

  const n = dict?.news ?? ({} as Record<string, string>);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const url = activeCategory ? `/api/news?limit=30&category=${activeCategory}` : '/api/news?limit=30';
        const res = await fetch(url);
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
  }, [activeCategory]);

  // Extract unique categories from articles
  const categories: CategoryItem[] = [];
  const catSlugs = new Set<string>();
  (articles ?? []).forEach((a: NewsArticleType) => {
    if (a?.category && !catSlugs.has(a.category.slug)) {
      catSlugs.add(a.category.slug);
      categories.push(a.category);
    }
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Newspaper className="h-6 w-6 text-primary" />
          <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">
            {n.title ?? 'Crypto News'}
          </h1>
        </div>
        <p className="text-sm text-muted-foreground">{n.subtitle ?? ''}</p>
      </div>

      {/* Categories filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory('')}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
            !activeCategory ? 'bg-primary text-primary-foreground' : 'bg-accent text-accent-foreground hover:bg-accent/80'
          }`}
        >
          {n.allCategories ?? 'All'}
        </button>
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setActiveCategory(cat.slug)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              activeCategory === cat.slug ? 'bg-primary text-primary-foreground' : 'bg-accent text-accent-foreground hover:bg-accent/80'
            }`}
          >
            {locale === 'es' ? cat.nameEs : cat.nameEn}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-64 animate-pulse rounded-xl bg-muted" />
          ))}
        </div>
      ) : articles?.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16 text-muted-foreground">
          <Newspaper className="h-10 w-10" />
          <p className="text-sm">{n.noArticles ?? 'No articles found.'}</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article: NewsArticleType) => (
            <article
              key={article?.id}
              className="group overflow-hidden rounded-xl border border-border/50 bg-card/50 transition-all hover:border-primary/30 hover:shadow-[var(--shadow-md)]"
            >
              {article.image && (
                <div className="relative aspect-video bg-muted">
                  <Image
                    src={article.image}
                    alt={article.title ?? 'article'}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              )}
              <div className="p-4">
                {article.category && (
                  <span className="inline-block rounded bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary mb-2">
                    {locale === 'es' ? article.category.nameEs : article.category.nameEn}
                  </span>
                )}
                <h3 className="text-sm font-semibold text-foreground line-clamp-2 mb-2">
                  {article.originalUrl ? (
                    <a href={article.originalUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                      {article.title}
                    </a>
                  ) : article.title}
                </h3>
                {article.excerpt && (
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{article.excerpt}</p>
                )}
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  {article.readTimeMinutes && (
                    <span className="flex items-center gap-0.5">
                      <Clock className="h-3 w-3" />
                      {article.readTimeMinutes} {n.minRead ?? 'min'}
                    </span>
                  )}
                  {article.originalPublishedAt && <span>{timeAgo(article.originalPublishedAt)}</span>}
                  {article.sourceName && (
                    <span className="flex items-center gap-0.5 text-primary">
                      <ExternalLink className="h-3 w-3" />
                      {article.sourceName}
                    </span>
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
      )}
    </div>
  );
}
