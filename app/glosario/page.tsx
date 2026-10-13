import { Metadata } from 'next'
import Link from 'next/link'
import { BookMarked, CalendarDays } from 'lucide-react'
import { getGlossary } from '@/lib/glossary'
import { getLessonBySlug } from '@/lib/academia-data'
import { fold } from '@/lib/slug'
import { Markdown } from '@/components/markdown'
import { GlossaryFilter } from '@/components/glossary-filter'
import { formatDate } from '@/lib/guides'
import { SITE } from '@/lib/site'

const UPDATED = '2026-10-14'

export const metadata: Metadata = {
  title: 'Glosario cripto de la A a la Z',
  description: 'Más de 160 términos de criptomonedas, blockchain, DeFi y normativa explicados en español: qué es una frase semilla, el gas, el staking, MiCA, el modelo 721 y mucho más.',
  alternates: { canonical: '/glosario' },
}

const initial = (term: string) => {
  const c = fold(term).charAt(0).toUpperCase()
  return /[A-Z]/.test(c) ? c : '#'
}

export default function GlosarioPage() {
  const terms = getGlossary()
  const groups = new Map<string, typeof terms>()
  for (const t of terms) {
    const k = initial(t.term)
    groups.set(k, [...(groups.get(k) ?? []), t])
  }
  const letters = [...groups.keys()]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'Glosario cripto de CriptoMundo',
    url: `${SITE.url}/glosario`,
    inLanguage: 'es-ES',
    hasDefinedTerm: terms.map(t => ({
      '@type': 'DefinedTerm',
      name: t.term,
      description: t.definition.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\*/g, ''),
      url: `${SITE.url}/glosario#${t.slug}`,
    })),
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="flex items-center gap-3 mb-3">
        <BookMarked className="h-7 w-7 text-primary" />
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">Glosario cripto</h1>
      </div>
      <p className="text-muted-foreground leading-relaxed max-w-3xl">
        Los términos que aparecen en las lecciones y guías de CriptoMundo, explicados en una o dos frases. Cuando
        un término tiene una lección propia, encontrarás el enlace para profundizar.
      </p>
      <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
        <CalendarDays className="h-3.5 w-3.5" />
        Revisado el <time dateTime={UPDATED}>{formatDate(UPDATED)}</time> por{' '}
        <Link href="/sobre-nosotros" className="text-foreground hover:text-primary">{SITE.owner}</Link>
      </p>

      <div className="mt-8">
        <GlossaryFilter total={terms.length} />
      </div>

      <nav aria-label="Letras" className="sticky top-16 z-30 -mx-4 mt-6 flex flex-wrap gap-1 bg-background/90 px-4 py-3 backdrop-blur">
        {letters.map(l => (
          <a key={l} href={`#letra-${l}`} className="rounded-md px-2 py-1 text-sm font-semibold text-muted-foreground hover:bg-muted hover:text-primary">
            {l}
          </a>
        ))}
      </nav>

      <div className="mt-4 space-y-10">
        {letters.map(l => (
          <section key={l} id={`letra-${l}`} data-letter-group className="scroll-mt-32">
            <h2 className="font-display text-2xl font-bold text-primary mb-4">{l}</h2>
            <dl className="space-y-5">
              {groups.get(l)!.map(t => {
                const lesson = t.lesson ? getLessonBySlug(t.lesson) : undefined
                return (
                  <div key={t.slug} id={t.slug} data-term={fold(`${t.term} ${t.definition}`)} className="scroll-mt-32 rounded-lg border border-border/40 p-4 target:border-primary/60 target:bg-primary/5">
                    <dt className="font-semibold text-foreground">{t.term}</dt>
                    <dd className="mt-1 text-sm [&_p]:my-0">
                      <Markdown source={t.definition} />
                      {lesson && (
                        <Link href={`/academia/${lesson.slug}`} className="mt-2 inline-block text-xs text-primary underline underline-offset-2">
                          Lección: {lesson.title}
                        </Link>
                      )}
                    </dd>
                  </div>
                )
              })}
            </dl>
          </section>
        ))}
      </div>
    </div>
  )
}
