import { Metadata } from 'next'
import Link from 'next/link'
import { MessageCircleQuestion } from 'lucide-react'
import { getAllAnswers, ANSWER_CATEGORIES, type AnswerCategory } from '@/lib/answers'

export const metadata: Metadata = {
  title: 'Dudas sobre criptomonedas y Hacienda: respuestas rápidas',
  description: 'Respuestas cortas y con fuentes oficiales a las dudas más frecuentes sobre criptomonedas en España: cuándo declarar, cómo tributan el staking o los airdrops, el modelo 721 y MiCA.',
  alternates: { canonical: '/respuestas' },
}

export default function RespuestasPage() {
  const answers = getAllAnswers()
  const groups = (Object.keys(ANSWER_CATEGORIES) as AnswerCategory[])
    .map(c => ({ id: c, title: ANSWER_CATEGORIES[c], items: answers.filter(a => a.categoria === c) }))
    .filter(g => g.items.length)

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3 mb-3">
        <MessageCircleQuestion className="h-7 w-7 text-primary" />
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">Dudas frecuentes</h1>
      </div>
      <div className="space-y-3 text-muted-foreground leading-relaxed">
        <p>
          Las preguntas que más se repiten sobre criptomonedas en España, cada una con una respuesta corta arriba y la
          explicación completa debajo, con un ejemplo con números cuando hace falta. Todas citan la fuente oficial en la
          que se basan: la Agencia Tributaria, el BOE, la CNMV o la normativa europea.
        </p>
        <p>
          Son información general para entender cómo funcionan las cosas, no asesoramiento fiscal. Si tu caso tiene
          particularidades (importes altos, herencias, actividad profesional), consulta con un asesor fiscal.
        </p>
      </div>

      {groups.length === 0 ? (
        <p className="mt-10 rounded-xl border border-border/50 p-6 text-muted-foreground">Todavía no hay respuestas publicadas.</p>
      ) : (
        groups.map(g => (
          <section key={g.id} className="mt-10" aria-labelledby={`cat-${g.id}`}>
            <h2 id={`cat-${g.id}`} className="font-display text-xl font-bold mb-4">{g.title}</h2>
            <ul className="space-y-2">
              {g.items.map(a => (
                <li key={a.slug}>
                  <Link href={`/respuestas/${a.slug}`} className="glow-card glass-card group block rounded-xl p-4">
                    <span className="font-medium text-foreground group-hover:text-primary transition-colors">{a.pregunta}</span>
                    <span className="mt-1 block text-sm text-muted-foreground">{a.descripcion}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))
      )}
    </div>
  )
}
