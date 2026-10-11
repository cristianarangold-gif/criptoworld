import { prisma } from '@/lib/db';
import { slugify } from '@/lib/utils';

interface RSSItem {
  title: string;
  link: string;
  description?: string;
  pubDate?: string;
  author?: string;
  image?: string;
}

const RSS_FEEDS = [
  { url: 'https://www.coindesk.com/arc/outboundfeeds/rss/', source: 'CoinDesk', sourceUrl: 'https://www.coindesk.com' },
  { url: 'https://cointelegraph.com/rss', source: 'Cointelegraph', sourceUrl: 'https://cointelegraph.com' },
  { url: 'https://decrypt.co/feed', source: 'Decrypt', sourceUrl: 'https://decrypt.co' },
];

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  bitcoin: ['bitcoin', 'btc', 'satoshi'],
  ethereum: ['ethereum', 'eth', 'vitalik', 'solidity'],
  altcoins: ['altcoin', 'solana', 'cardano', 'ripple', 'xrp', 'dogecoin', 'polkadot', 'avalanche', 'bnb', 'polygon'],
  markets: ['market', 'price', 'bull', 'bear', 'rally', 'crash', 'trading', 'volume'],
  regulation: ['regulation', 'sec', 'law', 'ban', 'compliance', 'legal', 'government', 'policy'],
  defi: ['defi', 'decentralized finance', 'yield', 'liquidity', 'protocol', 'lending'],
  blockchain: ['blockchain', 'layer', 'consensus', 'node', 'mining', 'proof'],
  exchanges: ['exchange', 'binance', 'coinbase', 'kraken', 'trading platform'],
  web3: ['web3', 'nft', 'metaverse', 'dao', 'decentralized'],
  institutional: ['institutional', 'etf', 'blackrock', 'grayscale', 'fund', 'bank', 'wall street'],
  technology: ['technology', 'upgrade', 'fork', 'development', 'open source'],
};

function classifyCategory(text: string): string {
  const lower = text.toLowerCase();
  let bestCat = 'markets';
  let bestScore = 0;
  for (const [cat, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    const score = keywords.reduce((acc: number, kw: string) => acc + (lower.includes(kw) ? 1 : 0), 0);
    if (score > bestScore) {
      bestScore = score;
      bestCat = cat;
    }
  }
  return bestCat;
}

function stripHtml(html: string): string {
  return html?.replace(/<[^>]*>/g, '')?.replace(/&[a-z]+;/gi, ' ')?.replace(/\s+/g, ' ')?.trim() ?? '';
}

function extractImage(html: string): string | null {
  const match = html?.match(/<img[^>]+src=["']([^"']+)["']/);
  return match?.[1] ?? null;
}

function estimateReadTime(text: string): number {
  const words = text?.split(/\s+/)?.length ?? 0;
  return Math.max(1, Math.round(words / 200));
}

function parseRSSXml(xml: string): RSSItem[] {
  const items: RSSItem[] = [];
  const itemRegex = /<item>(.*?)<\/item>/gs;
  let match;
  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1] ?? '';
    const getTag = (tag: string): string => {
      const r = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[(.+?)\\]\\]><\\/${tag}>|<${tag}[^>]*>(.+?)<\\/${tag}>`, 's');
      const m = r.exec(block);
      return (m?.[1] ?? m?.[2] ?? '').trim();
    };
    const desc = getTag('description') || getTag('content:encoded') || '';
    items.push({
      title: stripHtml(getTag('title')),
      link: getTag('link'),
      description: stripHtml(desc).slice(0, 500),
      pubDate: getTag('pubDate'),
      author: getTag('dc:creator') || getTag('author') || undefined,
      image: extractImage(desc) || extractImage(getTag('media:content')) || undefined,
    });
  }
  return items;
}

export async function aggregateNews(): Promise<{ inserted: number; errors: string[] }> {
  let inserted = 0;
  const errors: string[] = [];

  // Ensure categories exist
  const categoryNames: Record<string, { en: string; es: string }> = {
    bitcoin: { en: 'Bitcoin', es: 'Bitcoin' },
    ethereum: { en: 'Ethereum', es: 'Ethereum' },
    altcoins: { en: 'Altcoins', es: 'Altcoins' },
    markets: { en: 'Markets', es: 'Mercados' },
    regulation: { en: 'Regulation', es: 'Regulación' },
    defi: { en: 'DeFi', es: 'DeFi' },
    blockchain: { en: 'Blockchain', es: 'Blockchain' },
    exchanges: { en: 'Exchanges', es: 'Exchanges' },
    web3: { en: 'Web3', es: 'Web3' },
    institutional: { en: 'Institutional', es: 'Institucional' },
    technology: { en: 'Technology', es: 'Tecnología' },
    trading: { en: 'Trading', es: 'Trading' },
  };

  const catMap: Record<string, number> = {};
  for (const [slug, names] of Object.entries(categoryNames)) {
    const cat = await prisma.newsCategory.upsert({
      where: { slug },
      update: {},
      create: { slug, nameEn: names.en, nameEs: names.es },
    });
    catMap[slug] = cat.id;
  }

  for (const feed of RSS_FEEDS) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 10000);
      const res = await fetch(feed.url, { signal: controller.signal });
      clearTimeout(timer);
      if (!res.ok) {
        errors.push(`${feed.source}: HTTP ${res.status}`);
        continue;
      }
      const xml = await res.text();
      const items = parseRSSXml(xml);

      for (const item of items.slice(0, 20)) {
        if (!item.link || !item.title) continue;
        const canonicalUrl = item.link.split('?')[0];
        // Skip if already exists (dedup by URL)
        const exists = await prisma.newsArticle.findUnique({ where: { originalUrl: canonicalUrl } });
        if (exists) continue;

        const catSlug = classifyCategory(`${item.title} ${item.description ?? ''}`);
        const slug = slugify(item.title).slice(0, 120) + '-' + Date.now().toString(36);

        await prisma.newsArticle.create({
          data: {
            slug,
            title: item.title,
            excerpt: item.description?.slice(0, 300) ?? null,
            content: null,
            image: item.image ?? null,
            sourceName: feed.source,
            sourceUrl: feed.sourceUrl,
            originalUrl: canonicalUrl,
            originalPublishedAt: item.pubDate ? new Date(item.pubDate) : null,
            author: item.author ?? null,
            categoryId: catMap[catSlug] ?? null,
            status: 'PUBLISHED',
            featured: false,
            readTimeMinutes: estimateReadTime(item.description ?? ''),
            isEditorial: false,
            locale: 'en',
          },
        });
        inserted++;
      }
    } catch (err) {
      errors.push(`${feed.source}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  return { inserted, errors };
}
