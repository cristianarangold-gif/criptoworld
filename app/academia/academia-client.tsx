'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { GraduationCap, BookOpen, Clock, CheckCircle2, ArrowRight, Trophy, Star, Zap, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'

type Lesson = {
  slug: string
  title: string
  level: number
  readTime: number
  simpleExplanation: string
}

type LevelData = {
  level: number
  label: string
  color: string
  bg: string
  info: { title: string; description: string; emoji: string; color: string; level: number }
  lessons: Lesson[]
}

type Progress = { lessonSlug: string; completed: boolean }

const LEVEL_ICONS: Record<number, any> = {
  1: Star,
  2: Zap,
  3: Trophy,
}

export function AcademiaClient({ levels }: { levels: LevelData[] }) {
  const { data: session } = useSession() || {}
  const [progress, setProgress] = useState<Progress[]>([])

  useEffect(() => {
    if (session?.user) {
      fetch('/api/academia/progress')
        .then(r => r.json())
        .then(d => setProgress(d.progress || []))
        .catch(() => {})
    }
  }, [session])

  const completedSlugs = new Set(progress.filter(p => p.completed).map(p => p.lessonSlug))
  const totalLessons = levels.reduce((s, l) => s + l.lessons.length, 0)
  const totalCompleted = completedSlugs.size

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="relative mb-12 overflow-hidden rounded-2xl glass-card p-8 sm:p-12">
        <div className="hero-gradient absolute inset-0" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15">
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold tracking-tight">Academia Cripto</h1>
              <p className="text-muted-foreground">Tu camino al conocimiento crypto</p>
            </div>
          </div>
          <p className="max-w-2xl text-muted-foreground leading-relaxed">
            Aprende sobre criptomonedas, blockchain y finanzas descentralizadas con nuestras
            <span className="text-foreground font-medium"> {totalLessons} lecciones interactivas</span> en español.
            Desde conceptos básicos hasta estrategias avanzadas.
          </p>
          {session?.user && totalCompleted > 0 && (
            <div className="mt-6 flex items-center gap-4">
              <div className="flex-1 max-w-xs">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Progreso total</span>
                  <span className="text-primary font-medium">{totalCompleted}/{totalLessons}</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${(totalCompleted / totalLessons) * 100}%` }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Levels */}
      <div className="space-y-12">
        {levels.map((lvl) => {
          const Icon = LEVEL_ICONS[lvl.level] || Star
          const levelCompleted = lvl.lessons.filter(l => completedSlugs.has(l.slug)).length
          return (
            <section key={lvl.level}>
              <div className="flex items-center gap-3 mb-6">
                <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg', lvl.bg)}>
                  <Icon className={cn('h-5 w-5', lvl.color)} />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold">{lvl.info.title}</h2>
                  <p className="text-sm text-muted-foreground">{lvl.info.description}</p>
                </div>
                {session?.user && (
                  <div className="ml-auto hidden sm:flex items-center gap-2">
                    <span className={cn('text-sm font-medium', lvl.color)}>{levelCompleted}/{lvl.lessons.length}</span>
                    <div className="w-24 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className={cn('h-full rounded-full transition-all', lvl.level === 1 ? 'bg-emerald-500' : lvl.level === 2 ? 'bg-primary' : 'bg-secondary')} style={{ width: `${lvl.lessons.length ? (levelCompleted / lvl.lessons.length) * 100 : 0}%` }} />
                    </div>
                  </div>
                )}
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {lvl.lessons.map((lesson, idx) => {
                  const done = completedSlugs.has(lesson.slug)
                  return (
                    <Link
                      key={lesson.slug}
                      href={`/academia/${lesson.slug}`}
                      className="glow-card glass-card rounded-xl p-5 hover:border-primary/30 group flex flex-col"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className={cn('inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium', lvl.bg, lvl.color)}>
                          {lvl.label}
                        </span>
                        {done && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                      </div>
                      <h3 className="text-base font-semibold group-hover:text-primary transition-colors leading-snug">
                        {lesson.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                        {lesson.simpleExplanation}
                      </p>
                      <div className="mt-auto pt-4 flex items-center justify-between">
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {lesson.readTime} min
                        </span>
                        <span className="text-xs text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          Leer <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </section>
          )
        })}
      </div>

      {/* Disclaimer */}
      <div className="mt-12 rounded-xl border border-border/50 bg-muted/30 p-4 text-xs text-muted-foreground">
        <p><strong>Aviso:</strong> El contenido educativo de esta sección es informativo y no constituye asesoramiento financiero. Las criptomonedas son activos volátiles y de alto riesgo. Investiga siempre por tu cuenta antes de tomar decisiones de inversión.</p>
      </div>
    </div>
  )
}
