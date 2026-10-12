'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, BookOpen, Lightbulb, AlertTriangle, XCircle, BookMarked, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'

type LessonData = {
  slug: string
  title: string
  level: number
  readTime: number
  simpleExplanation: string
  detailedExplanation: string
  practicalExamples: string[]
  relatedConcepts: string[]
  advantages: string[]
  risks: string[]
  commonMistakes: string[]
  glossary: Record<string, string>
}

type NavData = { prev: { slug: string; title: string } | null; next: { slug: string; title: string } | null }

function renderInline(text: string): React.ReactNode {
  // Parse **bold** inline markdown
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>
    }
    return <span key={i}>{part}</span>
  })
}

export function LessonClient({ lesson, nav, levelLabel, levelColor, levelBg }: {
  lesson: LessonData
  nav: NavData
  levelLabel: string
  levelColor: string
  levelBg: string
}) {
  const { data: session } = useSession() || {}
  const [completed, setCompleted] = useState(false)
  const [saving, setSaving] = useState(false)
  const [glossaryOpen, setGlossaryOpen] = useState(false)

  useEffect(() => {
    if (session?.user) {
      fetch('/api/academia/progress')
        .then(r => r.json())
        .then(d => {
          const p = (d.progress || []).find((x: any) => x.lessonSlug === lesson.slug)
          if (p?.completed) setCompleted(true)
        })
        .catch(() => {})
      // Mark as viewed
      fetch('/api/academia/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonSlug: lesson.slug, action: 'view' }),
      }).catch(() => {})
    }
  }, [session, lesson.slug])

  const markComplete = async () => {
    setSaving(true)
    try {
      await fetch('/api/academia/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonSlug: lesson.slug, action: 'complete' }),
      })
      setCompleted(true)
    } catch {}
    setSaving(false)
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/academia" className="hover:text-primary transition-colors">Academia</Link>
        <span>/</span>
        <span className={cn('font-medium', levelColor)}>{levelLabel}</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <span className={cn('inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium mb-4', levelBg, levelColor)}>
          {levelLabel}
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight leading-tight">{lesson.title}</h1>
        <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{lesson.readTime} min lectura</span>
          {completed && <span className="flex items-center gap-1 text-emerald-500"><CheckCircle2 className="h-4 w-4" />Completada</span>}
        </div>
      </div>

      {/* Simple explanation */}
      <div className="glass-card rounded-xl p-6 mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="h-5 w-5 text-primary" />
          <h2 className="font-display font-bold">En pocas palabras</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed">{lesson.simpleExplanation}</p>
      </div>

      {/* Detailed explanation (markdown-like) */}
      <div className="prose-content mb-8">
        {lesson.detailedExplanation.split('\n').map((line, i) => {
          if (line.startsWith('## ')) return <h2 key={i} className="font-display text-xl font-bold mt-8 mb-3">{line.slice(3)}</h2>
          if (line.startsWith('### ')) return <h3 key={i} className="font-display text-lg font-semibold mt-6 mb-2 text-primary">{line.slice(4)}</h3>
          if (line.startsWith('- ')) return <li key={i} className="ml-4 text-muted-foreground leading-relaxed list-disc">{renderInline(line.slice(2))}</li>
          if (line.trim() === '') return <div key={i} className="h-3" />
          return <p key={i} className="text-muted-foreground leading-relaxed">{renderInline(line)}</p>
        })}
      </div>

      {/* Practical examples */}
      {lesson.practicalExamples.length > 0 && (
        <div className="glass-card rounded-xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-5 w-5 text-secondary" />
            <h2 className="font-display font-bold">Ejemplos prácticos</h2>
          </div>
          <ul className="space-y-2">
            {lesson.practicalExamples.map((ex, i) => (
              <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                <span className="text-secondary mt-0.5">•</span>
                <span>{ex}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Advantages & Risks */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        {lesson.advantages.length > 0 && (
          <div className="glass-card rounded-xl p-5">
            <h3 className="flex items-center gap-2 font-semibold text-sm mb-3 text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />Ventajas
            </h3>
            <ul className="space-y-1.5">
              {lesson.advantages.map((a, i) => (
                <li key={i} className="text-sm text-muted-foreground flex gap-2"><span className="text-emerald-500">✓</span>{a}</li>
              ))}
            </ul>
          </div>
        )}
        {lesson.risks.length > 0 && (
          <div className="glass-card rounded-xl p-5">
            <h3 className="flex items-center gap-2 font-semibold text-sm mb-3 text-red-400">
              <AlertTriangle className="h-4 w-4" />Riesgos
            </h3>
            <ul className="space-y-1.5">
              {lesson.risks.map((r, i) => (
                <li key={i} className="text-sm text-muted-foreground flex gap-2"><span className="text-red-500">✗</span>{r}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Common mistakes */}
      {lesson.commonMistakes.length > 0 && (
        <div className="glass-card rounded-xl p-5 mb-6 border-red-500/20">
          <h3 className="flex items-center gap-2 font-semibold text-sm mb-3">
            <XCircle className="h-4 w-4 text-red-400" />Errores comunes
          </h3>
          <ul className="space-y-1.5">
            {lesson.commonMistakes.map((m, i) => (
              <li key={i} className="text-sm text-muted-foreground">⚠ {m}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Glossary */}
      {Object.keys(lesson.glossary).length > 0 && (
        <div className="glass-card rounded-xl mb-6 overflow-hidden">
          <button onClick={() => setGlossaryOpen(!glossaryOpen)} className="w-full flex items-center justify-between p-5 text-left">
            <span className="flex items-center gap-2 font-semibold text-sm">
              <BookMarked className="h-4 w-4 text-primary" />Glosario ({Object.keys(lesson.glossary).length} términos)
            </span>
            {glossaryOpen ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
          </button>
          {glossaryOpen && (
            <div className="px-5 pb-5 space-y-2">
              {Object.entries(lesson.glossary).map(([term, def]) => (
                <div key={term} className="text-sm">
                  <span className="font-medium text-primary">{term}:</span>{' '}
                  <span className="text-muted-foreground">{def}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Related concepts */}
      {lesson.relatedConcepts.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="text-sm text-muted-foreground mr-1">Temas relacionados:</span>
          {lesson.relatedConcepts.map(c => (
            <span key={c} className="inline-flex rounded-full bg-muted px-3 py-0.5 text-xs text-muted-foreground">{c}</span>
          ))}
        </div>
      )}

      {/* Mark complete button */}
      {session?.user && !completed && (
        <div className="flex justify-center mb-8">
          <button
            onClick={markComplete}
            disabled={saving}
            className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            <CheckCircle2 className="h-4 w-4" />
            {saving ? 'Guardando...' : 'Marcar como completada'}
          </button>
        </div>
      )}
      {completed && (
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-6 py-3 text-sm font-medium text-emerald-400">
            <CheckCircle2 className="h-4 w-4" />
            Lección completada
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4 border-t border-border/50 pt-6">
        {nav.prev ? (
          <Link href={`/academia/${nav.prev.slug}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">{nav.prev.title}</span>
            <span className="sm:hidden">Anterior</span>
          </Link>
        ) : <div />}
        <Link href="/academia" className="text-sm text-muted-foreground hover:text-primary transition-colors">
          Ver todas
        </Link>
        {nav.next ? (
          <Link href={`/academia/${nav.next.slug}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <span className="hidden sm:inline">{nav.next.title}</span>
            <span className="sm:hidden">Siguiente</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        ) : <div />}
      </div>

      {/* Disclaimer */}
      <div className="mt-8 rounded-xl border border-border/50 bg-muted/30 p-4 text-xs text-muted-foreground">
        <p><strong>Aviso:</strong> Este contenido es exclusivamente educativo e informativo. No constituye asesoramiento financiero, de inversión ni legal. Las criptomonedas conllevan riesgos significativos. Consulta siempre con un profesional cualificado.</p>
      </div>
    </div>
  )
}
