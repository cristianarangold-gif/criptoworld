import { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, Clock, ArrowRight, GraduationCap } from 'lucide-react'
import { getAllGuides, GUIDE_CATEGORIES, formatDate } from '@/lib/guides'

export const metadata: Metadata = {
  title: 'Guías prácticas sobre criptomonedas',
  description: 'Guías en español para declarar criptomonedas a Hacienda, comprobar si un exchange está autorizado, evitar estafas y gestionar el riesgo.',
  alternates: { canonical: '/aprende' },
}

export default function AprendePage() {
  const guides = getAllGuides()

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-3xl">
        <h1 className="font-display text-3xl font-bold tracking-tight">Guías prácticas</h1>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          Respuestas a las dudas que surgen cuando pasas de la teoría a la práctica: qué hay que declarar a Hacienda,
          cómo saber si una plataforma está autorizada, cómo proteger tus fondos o cómo invertir sin jugarte lo que no
          puedes perder. Cada guía cita sus fuentes y muestra la fecha de su última revisión.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          ¿Buscas los conceptos básicos (qué es Bitcoin, una wallet o una stablecoin)? Están en la{' '}
          <Link href="/academia" className="text-primary underline inline-flex items-center gap-1">
            <GraduationCap className="h-3.5 w-3.5" />Academia
          </Link>.
        </p>
      </div>

      <div className="space-y-12">
        {GUIDE_CATEGORIES.map(cat => {
          const list = guides.filter(g => g.category === cat)
          if (!list.length) return null
          return (
            <section key={cat}>
              <h2 className="font-display text-xl font-bold mb-4 text-secondary">{cat}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {list.map(g => (
                  <Link
                    key={g.slug}
                    href={`/aprende/${g.slug}`}
                    className="glass-card rounded-xl p-5 hover:border-primary/30 transition-all group flex flex-col"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen className="h-4 w-4 text-secondary" />
                      <span className="text-xs text-secondary font-medium">{g.category}</span>
                    </div>
                    <h3 className="text-base font-semibold group-hover:text-primary transition-colors">{g.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{g.description}</p>
                    <div className="mt-auto pt-4 flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {g.readTime} min · {formatDate(g.updated)}
                      </span>
                      <span className="text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        Leer <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
