# CoinLens — Project Instructions

## Overview
CoinLens is a professional crypto finance platform (market data + news + education + portfolio). Built iteratively by milestones (M1–M7).

## Current State: M1 Complete
- **Pages**: Home, /markets (table), /news (from DB), /learn (academy landing), /portfolio, /watchlist, /login, /register (coming soon placeholders), legal pages (terms, privacy, cookies, risk-disclosure), 404 custom
- **i18n**: EN/ES with /[locale] routing, proxy.ts redirect / → /en, dictionaries in messages/en.json + es.json, I18nProvider context for client components
- **DB**: PostgreSQL with Prisma — tables: news_categories, news_articles, cryptocurrencies, newsletter_subscribers
- **Market Data**: CoinGecko API (public, server-side) with CoinCap fallback, in-memory cache (90s markets, 120s global)
- **News**: RSS aggregator (CoinDesk, Cointelegraph, Decrypt), dedup by URL, keyword classification, /api/cron/news endpoint (protected by CRON_SECRET)
- **Design**: Dark-first theme, teal primary (#00D4AA), navy backgrounds, DM Sans / Plus Jakarta Sans / JetBrains Mono fonts

## Design System
- Primary color: teal (HSL 165 100% 42% dark / 38% light)
- Background dark: HSL 222 47% 7%, Card: 222 40% 10%
- Success: green-500, Destructive: red-500, Warning: amber-500
- Semantic Tailwind classes only (bg-primary, text-muted-foreground, etc.)
- shadcn/ui components from scaffold

## Architecture Decisions
- All market data server-side only; never expose API keys to client
- News articles from RSS always store original_url, source_name, original_published_at
- Editorial content marked with isEditorial=true, author="CoinLens Editorial"
- Newsletter saves to DB; email sending deferred to future milestone
- No auth/dashboard/portfolio logic yet (M5/M6)

## User Preferences
- Working language with user: Spanish
- App content: English primary, Spanish secondary
- Dark mode as default theme
- Never invent news or fake prices
- Financial disclaimer required on all financial content
- Production quality: strict TypeScript, small components, no console errors

## Upcoming Milestones
- M2: Markets + Crypto detail pages (chart, stats, full table)
- M3: News complete (categories, search, article page, share)
- M4: Academy (articles, levels, content)
- M5: Auth + Dashboard + Portfolio
- M6: Admin panel + Alerts
- M7: Final polish
