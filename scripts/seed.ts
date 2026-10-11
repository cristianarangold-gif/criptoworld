import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const CATEGORIES = [
  { slug: 'bitcoin', nameEn: 'Bitcoin', nameEs: 'Bitcoin' },
  { slug: 'ethereum', nameEn: 'Ethereum', nameEs: 'Ethereum' },
  { slug: 'altcoins', nameEn: 'Altcoins', nameEs: 'Altcoins' },
  { slug: 'markets', nameEn: 'Markets', nameEs: 'Mercados' },
  { slug: 'regulation', nameEn: 'Regulation', nameEs: 'Regulación' },
  { slug: 'defi', nameEn: 'DeFi', nameEs: 'DeFi' },
  { slug: 'blockchain', nameEn: 'Blockchain', nameEs: 'Blockchain' },
  { slug: 'exchanges', nameEn: 'Exchanges', nameEs: 'Exchanges' },
  { slug: 'web3', nameEn: 'Web3', nameEs: 'Web3' },
  { slug: 'institutional', nameEn: 'Institutional', nameEs: 'Institucional' },
  { slug: 'technology', nameEn: 'Technology', nameEs: 'Tecnología' },
  { slug: 'trading', nameEn: 'Trading', nameEs: 'Trading' },
];

const EDITORIAL_ARTICLES = [
  {
    slug: 'bitcoin-market-analysis-september-2026',
    title: 'Bitcoin Market Analysis — September 2026',
    excerpt: 'An editorial overview of Bitcoin\'s current market position, key support levels, and what the macro environment means for BTC holders.',
    author: 'CoinLens Editorial',
    categorySlug: 'bitcoin',
    readTimeMinutes: 5,
    featured: true,
  },
  {
    slug: 'ethereum-network-upgrade-outlook',
    title: 'Ethereum Network Upgrade: What to Expect',
    excerpt: 'Ethereum continues to evolve with network upgrades driving DeFi and staking adoption. Here\'s our editorial analysis of what lies ahead.',
    author: 'CoinLens Editorial',
    categorySlug: 'ethereum',
    readTimeMinutes: 4,
    featured: false,
  },
  {
    slug: 'altcoin-market-rotation-analysis',
    title: 'Altcoin Market Rotation: Sectors to Watch',
    excerpt: 'Beyond BTC and ETH, the altcoin market shows interesting rotation patterns. Our editorial analysis of key sectors and projects.',
    author: 'CoinLens Editorial',
    categorySlug: 'altcoins',
    readTimeMinutes: 6,
    featured: false,
  },
  {
    slug: 'institutional-crypto-adoption-2026',
    title: 'Institutional Crypto Adoption in 2026: A Year in Review',
    excerpt: 'From ETF inflows to corporate treasury diversification, we analyze how institutional participation has shaped the crypto market this year.',
    author: 'CoinLens Editorial',
    categorySlug: 'institutional',
    readTimeMinutes: 7,
    featured: false,
  },
  {
    slug: 'defi-lending-protocols-comparison',
    title: 'DeFi Lending Protocols: A Comparative Analysis',
    excerpt: 'An editorial comparison of the leading DeFi lending protocols, their risks, yields, and security track records.',
    author: 'CoinLens Editorial',
    categorySlug: 'defi',
    readTimeMinutes: 8,
    featured: false,
  },
  {
    slug: 'crypto-regulation-global-landscape',
    title: 'Global Crypto Regulation: Where Things Stand',
    excerpt: 'A comprehensive editorial overview of cryptocurrency regulation across major jurisdictions and what it means for the industry.',
    author: 'CoinLens Editorial',
    categorySlug: 'regulation',
    readTimeMinutes: 6,
    featured: false,
  },
];

async function main() {
  console.log('Seeding categories...');
  const catMap: Record<string, number> = {};
  for (const cat of CATEGORIES) {
    const result = await prisma.newsCategory.upsert({
      where: { slug: cat.slug },
      update: { nameEn: cat.nameEn, nameEs: cat.nameEs },
      create: { slug: cat.slug, nameEn: cat.nameEn, nameEs: cat.nameEs },
    });
    catMap[cat.slug] = result.id;
    console.log(`  Category: ${cat.slug} (id: ${result.id})`);
  }

  console.log('Seeding editorial articles...');
  for (const article of EDITORIAL_ARTICLES) {
    await prisma.newsArticle.upsert({
      where: { slug: article.slug },
      update: {
        title: article.title,
        excerpt: article.excerpt,
        author: article.author,
        categoryId: catMap[article.categorySlug] ?? null,
        readTimeMinutes: article.readTimeMinutes,
        featured: article.featured,
        isEditorial: true,
        status: 'PUBLISHED',
      },
      create: {
        slug: article.slug,
        title: article.title,
        excerpt: article.excerpt,
        content: null,
        image: null,
        sourceName: null,
        sourceUrl: null,
        originalUrl: null,
        originalPublishedAt: null,
        author: article.author,
        categoryId: catMap[article.categorySlug] ?? null,
        status: 'PUBLISHED',
        featured: article.featured,
        readTimeMinutes: article.readTimeMinutes,
        isEditorial: true,
        locale: 'en',
      },
    });
    console.log(`  Article: ${article.slug}`);
  }

  console.log('Seed complete.');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
