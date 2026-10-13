'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { CheckCircle2, XCircle, HelpCircle, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'
import { scoreQuiz, type QuizQuestion } from '@/lib/quiz'

// Quiz al final de cada lección. Todas las preguntas y opciones se renderizan desde el servidor
// (visibles sin JavaScript); al responder se muestra la corrección y la explicación.
export function LessonQuiz({ slug, quiz, onPassed }: { slug: string; quiz: QuizQuestion[]; onPassed?: () => void }) {
  const { data: session } = useSession() || {}
  const [answers, setAnswers] = useState<(number | undefined)[]>(() => quiz.map(() => undefined))
  const [saved, setSaved] = useState(false)

  const answered = answers.filter(a => a !== undefined).length
  const done = answered === quiz.length
  const result = done ? scoreQuiz(answers as number[], quiz) : null

  async function choose(qi: number, oi: number) {
    if (answers[qi] !== undefined) return
    const next = answers.map((a, i) => (i === qi ? oi : a))
    setAnswers(next)
    if (next.every(a => a !== undefined) && scoreQuiz(next as number[], quiz).passed && session?.user && !saved) {
      try {
        await fetch('/api/academia/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lessonSlug: slug, action: 'complete' }),
        })
        setSaved(true)
        onPassed?.()
      } catch {}
    }
  }

  return (
    <section className="glass-card rounded-xl p-6 mb-8" aria-labelledby="quiz-title">
      <div className="flex items-center gap-2 mb-1">
        <HelpCircle className="h-5 w-5 text-primary" />
        <h2 id="quiz-title" className="font-display text-lg font-bold">Comprueba lo que has aprendido</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-6">{quiz.length} preguntas. Elige una respuesta en cada una y verás la explicación.</p>

      <ol className="space-y-6">
        {quiz.map((q, qi) => {
          const chosen = answers[qi]
          return (
            <li key={qi}>
              <fieldset>
                <legend className="font-medium text-foreground mb-3">
                  {qi + 1}. {q.pregunta}
                </legend>
                <div className="grid gap-2">
                  {q.opciones.map((o, oi) => {
                    const isChosen = chosen === oi
                    const isCorrect = q.correcta === oi
                    return (
                      <button
                        key={oi}
                        type="button"
                        onClick={() => choose(qi, oi)}
                        disabled={chosen !== undefined}
                        aria-pressed={isChosen}
                        className={cn(
                          'flex items-start gap-2 rounded-lg border px-3 py-2.5 text-left text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                          chosen === undefined && 'border-border/60 hover:border-primary/50 hover:bg-muted/50',
                          chosen !== undefined && isCorrect && 'border-emerald-500/60 bg-emerald-500/10 text-foreground',
                          chosen !== undefined && isChosen && !isCorrect && 'border-red-500/60 bg-red-500/10 text-foreground',
                          chosen !== undefined && !isChosen && !isCorrect && 'border-border/40 opacity-60'
                        )}
                      >
                        {chosen !== undefined && isCorrect && <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-emerald-500" aria-label="Respuesta correcta" />}
                        {chosen !== undefined && isChosen && !isCorrect && <XCircle className="h-4 w-4 mt-0.5 shrink-0 text-red-500" aria-label="Tu respuesta, incorrecta" />}
                        <span>{o}</span>
                      </button>
                    )
                  })}
                </div>
                {chosen !== undefined && (
                  <p className="mt-2 text-sm text-muted-foreground" aria-live="polite">
                    <strong className={chosen === q.correcta ? 'text-emerald-500' : 'text-red-400'}>
                      {chosen === q.correcta ? 'Correcto. ' : 'No exactamente. '}
                    </strong>
                    {q.explicacion}
                  </p>
                )}
              </fieldset>
            </li>
          )
        })}
      </ol>

      <div className="mt-6 border-t border-border/40 pt-4" aria-live="polite">
        {result ? (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm">
              <strong className="text-foreground">
                {result.correct} de {result.total} correctas.
              </strong>{' '}
              <span className="text-muted-foreground">
                {result.passed
                  ? session?.user
                    ? 'Lección marcada como completada.'
                    : 'Buen trabajo. Inicia sesión si quieres guardar tu progreso.'
                  : 'Repasa la lección y vuelve a intentarlo.'}
              </span>
            </p>
            <button
              type="button"
              onClick={() => setAnswers(quiz.map(() => undefined))}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 px-3 py-1.5 text-sm hover:bg-muted"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Repetir
            </button>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            {answered} de {quiz.length} respondidas
          </p>
        )}
      </div>
    </section>
  )
}
