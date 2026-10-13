'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { TrendingUp, BookOpen, GraduationCap, Calculator, User, Menu, X, LogOut } from 'lucide-react'
import { SearchBar } from '@/components/search-bar'

// Menú principal. Empieza aquí y Glosario se añaden junto con sus páginas (PR 2).
// Noticias está en el pie; «Mi área» es un icono junto al buscador.
const NAV = [
  { href: '/academia', label: 'Academia', icon: GraduationCap },
  { href: '/aprende', label: 'Guías', icon: BookOpen },
  { href: '/herramientas', label: 'Herramientas', icon: Calculator },
  { href: '/mercado', label: 'Mercado', icon: TrendingUp },
]

export function Header() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-display text-xl font-bold tracking-tight">
            <span className="text-primary">Cripto</span>Mundo
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV.map((item) => {
            const Icon = item.icon
            const active = pathname === item.href || (item.href !== '/' && pathname?.startsWith?.(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  active
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <SearchBar />
          <Link
            href="/area-personal"
            aria-label="Mi área"
            title="Mi área"
            className={cn(
              'rounded-lg p-2 transition-colors',
              pathname?.startsWith('/area-personal') ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
          >
            <User className="h-4 w-4" />
          </Link>
          {session?.user ? (
            <button
              onClick={() => signOut({ redirectTo: '/' })}
              className="flex items-center gap-1.5 rounded-lg bg-muted px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Salir
            </button>
          ) : (
            <Link
              href="/login"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Iniciar sesión
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-muted-foreground" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl px-4 py-4 space-y-1">
          {NAV.map((item) => {
            const Icon = item.icon
            const active = pathname === item.href || (item.href !== '/' && pathname?.startsWith?.(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  active ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted'
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
          <Link
            href="/area-personal"
            onClick={() => setOpen(false)}
            className={cn(
              'flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
              pathname?.startsWith('/area-personal') ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted'
            )}
          >
            <User className="h-4 w-4" />
            Mi área
          </Link>
          <div className="pt-2 border-t border-border/40">
            {session?.user ? (
              <button
                onClick={() => { setOpen(false); signOut({ redirectTo: '/' }) }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                <LogOut className="h-4 w-4" />
                Salir
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="block rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground"
              >
                Iniciar sesión
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
