import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import { BookOpen, Clock, ArrowLeft, AlertTriangle } from 'lucide-react'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = await prisma.article.findUnique({ where: { slug } }).catch(() => null)
  if (!article) return { title: 'Artículo no encontrado' }
  return { title: article.title, description: article.description }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await prisma.article.findUnique({ where: { slug } }).catch(() => null)
  if (!article) notFound()

  const related = await prisma.article.findMany({
    where: { category: article.category, slug: { not: slug } },
    take: 3,
  }).catch(() => [])

  // Simple markdown-like rendering: split by ## for sections
  const sections = article.content.split(/\n## /).map((s: string, i: number) => {
    if (i === 0) return { title: null, body: s.trim() }
    const nl = s.indexOf('\n')
    return { title: nl > 0 ? s.slice(0, nl).trim() : s.trim(), body: nl > 0 ? s.slice(nl).trim() : '' }
  })

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/aprende" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" />
        Volver a artículos
      </Link>

      <article>
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="h-4 w-4 text-secondary" />
          <span className="text-sm text-secondary font-medium">{article.category}</span>
          <span className="text-muted-foreground">·</span>
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            {article.readTime} min lectura
          </span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-6">{article.title}</h1>

        {/* TL;DR */}
        <div className="glass-card rounded-xl p-5 mb-8 border-l-4 border-secondary">
          <p className="text-sm font-semibold text-secondary mb-1">TL;DR</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{article.description}</p>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          {sections.map((sec: any, i: number) => (
            <div key={i} className="mb-8">
              {sec.title && <h2 className="font-display text-xl font-bold mb-3 text-foreground">{sec.title}</h2>}
              {sec.body.split('\n\n').map((p: string, j: number) => (
                <p key={j} className="text-sm text-muted-foreground leading-relaxed mb-3">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>

        {/* Educational disclaimer */}
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 mt-8">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Aviso educativo:</strong> Este artículo tiene carácter exclusivamente informativo y educativo. No constituye asesoramiento financiero ni recomendación de inversión.
            </p>
          </div>
        </div>
      </article>

      {/* Related */}
      {(related ?? []).length > 0 && (
        <section className="mt-12 pt-8 border-t border-border/40">
          <h3 className="font-display text-lg font-bold mb-4">Artículos relacionados</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {related.map((r: any) => (
              <Link
                key={r?.id}
                href={`/aprende/${r?.slug}`}
                className="glass-card rounded-xl p-4 hover:border-primary/30 transition-all group"
              >
                <h4 className="text-sm font-semibold group-hover:text-primary transition-colors">{r?.title}</h4>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{r?.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
