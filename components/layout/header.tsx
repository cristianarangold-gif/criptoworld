'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, Menu, X, Globe, Sun, Moon, LogIn, UserPlus } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import type { Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/get-dictionary';
import { useMounted } from '@/components/client-only';

const NAV_ITEMS = [
  { key: 'markets', href: '/markets' },
  { key: 'news', href: '/news' },
  { key: 'learn', href: '/learn' },
  { key: 'portfolio', href: '/portfolio' },
  { key: 'watchlist', href: '/watchlist' },
] as const;

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  const otherLocale = locale === 'en' ? 'es' : 'en';

  function switchLocale() {
    const newPath = pathname.replace(`/${locale}`, `/${otherLocale}`);
    router.push(newPath);
  }

  function isActive(href: string) {
    return pathname?.includes(href) ?? false;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-6">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="font-display text-sm font-bold text-primary-foreground">CL</span>
          </div>
          <span className="font-display text-lg font-bold tracking-tight">
            Coin<span className="text-primary">Lens</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              href={`/${locale}${item.href}`}
              className={cn(
                'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive(item.href)
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
              )}
            >
              {(dict?.nav as Record<string, string>)?.[item.key] ?? item.key}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Search toggle */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="rounded-lg p-2 text-muted-foreground hover:bg-accent/50 hover:text-foreground transition-colors"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </button>

          {/* Locale switch */}
          <button
            onClick={switchLocale}
            className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium text-muted-foreground hover:bg-accent/50 hover:text-foreground transition-colors"
            aria-label={dict?.nav?.language ?? 'Language'}
          >
            <Globe className="h-3.5 w-3.5" />
            <span className="uppercase">{otherLocale}</span>
          </button>

          {/* Theme toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-lg p-2 text-muted-foreground hover:bg-accent/50 hover:text-foreground transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          )}

          {/* Auth buttons (desktop) */}
          <div className="hidden items-center gap-2 md:flex">
            <Link
              href={`/${locale}/login`}
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground hover:bg-accent/50 hover:text-foreground transition-colors"
            >
              <LogIn className="h-3.5 w-3.5" />
              {dict?.nav?.login ?? 'Log In'}
            </Link>
            <Link
              href={`/${locale}/register`}
              className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <UserPlus className="h-3.5 w-3.5" />
              {dict?.nav?.signup ?? 'Sign Up'}
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-muted-foreground hover:bg-accent/50 md:hidden"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Search bar */}
      {searchOpen && (
        <div className="border-t border-border/50 bg-background/95 px-4 py-3 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder={dict?.nav?.search ?? 'Search...'}
                className="w-full rounded-lg border border-border bg-card py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                autoFocus
              />
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border/50 bg-background/95 backdrop-blur-xl md:hidden">
          <nav className="mx-auto max-w-7xl space-y-1 px-4 py-3">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.key}
                href={`/${locale}${item.href}`}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive(item.href)
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
                )}
              >
                {(dict?.nav as Record<string, string>)?.[item.key] ?? item.key}
              </Link>
            ))}
            <div className="flex gap-2 pt-2">
              <Link
                href={`/${locale}/login`}
                onClick={() => setMobileOpen(false)}
                className="flex-1 rounded-lg border border-border py-2 text-center text-sm font-medium text-foreground"
              >
                {dict?.nav?.login ?? 'Log In'}
              </Link>
              <Link
                href={`/${locale}/register`}
                onClick={() => setMobileOpen(false)}
                className="flex-1 rounded-lg bg-primary py-2 text-center text-sm font-medium text-primary-foreground"
              >
                {dict?.nav?.signup ?? 'Sign Up'}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
