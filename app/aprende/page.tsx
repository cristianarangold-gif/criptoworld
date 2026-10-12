import { Metadata } from 'next'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import { BookOpen, Clock, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Aprende',
  description: 'Artículos educativos originales sobre criptomonedas, blockchain, estrategias de inversión y gestión de riesgo.',
}

export default async function AprendePage() {
  const articles = await prisma.article.findMany({ orderBy: { createdAt: 'asc' } }).catch(() => [])
  const categories = [...new Set((articles ?? []).map((a: any) => a?.category).filter(Boolean))]

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold tracking-tight">Aprende sobre criptomonedas</h1>
        <p className="mt-2 text-muted-foreground">Contenido educativo original en español. Artículos escritos para entender el ecosistema cripto de forma clara y responsable.</p>
      </div>

      {(articles ?? []).length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-30" />
          <p>No hay artículos disponibles todavía.</p>
        </div>
      ) : (
        <div className="space-y-12">
          {categories.map((cat: string) => (
            <section key={cat}>
              <h2 className="font-display text-xl font-bold mb-4 text-secondary">{cat}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(articles ?? []).filter((a: any) => a?.category === cat).map((a: any) => (
                  <Link
                    key={a?.id}
                    href={`/aprende/${a?.slug}`}
                    className="glass-card rounded-xl p-5 hover:border-primary/30 transition-all group flex flex-col"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen className="h-4 w-4 text-secondary" />
                      <span className="text-xs text-secondary font-medium">{a?.category}</span>
                    </div>
                    <h3 className="text-base font-semibold group-hover:text-primary transition-colors">{a?.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{a?.description}</p>
                    <div className="mt-auto pt-4 flex items-center justify-between">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {a?.readTime ?? 5} min lectura
                      </span>
                      <span className="text-xs text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        Leer <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
