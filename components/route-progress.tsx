'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { CheckCircle2, Circle, Clock, BookOpen, GraduationCap, Calculator, MessageCircleQuestion, Scale } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ResolvedStep } from '@/lib/route-plan'

type Stage = { titulo: string; descripcion: string; pasos: ResolvedStep[] }

const KEY = 'cm-ruta'
const ICON = { leccion: GraduationCap, guia: BookOpen, herramienta: Calculator, respuesta: MessageCircleQuestion, pagina: Scale }
const LABEL = { leccion: 'Lección', guia: 'Guía', herramienta: 'Herramienta', respuesta: 'Respuesta', pagina: 'Comparador' }

function load(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? '[]')
    return Array.isArray(v) ? v.filter(x => typeof x === 'string') : []
  } catch {
    return []
  }
}

function save(done: string[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(done))
  } catch {
    // Sin almacenamiento (navegación privada, bloqueo): el progreso se mantiene solo en esta visita.
  }
}

function Bar({ value, label }: { value: number; label: string }) {
  return (
    <div className="h-1.5 w-full rounded-full bg-muted" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(value * 100)} aria-label={label}>
      <div className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-[width] duration-500" style={{ width: `${value * 100}%` }} />
    </div>
  )
}

// Ruta con casillas de «hecho». El progreso se guarda en el navegador y, si hay sesión, se suman
// las lecciones completadas en la Academia.
export function RouteProgress({ stages }: { stages: Stage[] }) {
  const { data: session } = useSession() || {}
  const [done, setDone] = useState<string[]>([])

  useEffect(() => setDone(load()), [])

  useEffect(() => {
    if (!session?.user) return
    fetch('/api/academia/progress')
      .then(r => r.json())
      .then(d => {
        const completed = (d.progress || []).filter((p: { completed?: boolean }) => p.completed).map((p: { lessonSlug: string }) => `/academia/${p.lessonSlug}`)
        setDone(prev => Array.from(new Set([...prev, ...completed])))
      })
      .catch(() => {})
  }, [session])

  function toggle(href: string) {
    setDone(prev => {
      const next = prev.includes(href) ? prev.filter(h => h !== href) : [...prev, href]
      save(next)
      return next
    })
  }

  const all = stages.flatMap(s => s.pasos)
  const total = all.filter(p => done.includes(p.href)).length

  return (
    <div>
      <div className="glass-card rounded-xl p-5 mb-8 sticky top-20 z-20">
        <div className="flex items-center justify-between mb-2 text-sm">
          <span className="font-semibold text-foreground">Tu progreso</span>
          <span className="text-muted-foreground" aria-live="polite">{total} de {all.length} pasos</span>
        </div>
        <Bar value={all.length ? total / all.length : 0} label="Progreso total de la ruta" />
      </div>

      <ol className="space-y-10">
        {stages.map((stage, si) => {
          const hechos = stage.pasos.filter(p => done.includes(p.href)).length
          return (
            <li key={stage.titulo}>
              <div className="flex items-baseline gap-3 mb-1">
                <span className="font-display text-sm font-bold text-primary">Etapa {si + 1}</span>
                <h2 className="font-display text-xl font-bold">{stage.titulo}</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{stage.descripcion}</p>
              <div className="mb-4 flex items-center gap-3">
                <Bar value={stage.pasos.length ? hechos / stage.pasos.length : 0} label={`Progreso de la etapa ${stage.titulo}`} />
                <span className="text-xs text-muted-foreground whitespace-nowrap">{hechos}/{stage.pasos.length}</span>
              </div>
              <ul className="space-y-2">
                {stage.pasos.map(p => {
                  const isDone = done.includes(p.href)
                  const Icon = ICON[p.tipo]
                  return (
                    <li key={p.href} className={cn('glow-card glass-card flex items-center gap-3 rounded-xl p-3', isDone && 'border-emerald-500/30')}>
                      <button
                        type="button"
                        onClick={() => toggle(p.href)}
                        aria-pressed={isDone}
                        aria-label={isDone ? `Desmarcar «${p.title}»` : `Marcar «${p.title}» como hecho`}
                        className="shrink-0 rounded-full p-1 text-muted-foreground hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        {isDone ? <CheckCircle2 className="h-5 w-5 text-emerald-500" /> : <Circle className="h-5 w-5" />}
                      </button>
                      <Link href={p.href} className="flex-1 min-w-0 group">
                        <span className={cn('block text-sm font-medium group-hover:text-primary transition-colors', isDone && 'text-muted-foreground')}>{p.title}</span>
                        <span className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                          <Icon className="h-3 w-3" />
                          {LABEL[p.tipo]}
                          <Clock className="h-3 w-3 ml-1" />
                          {p.minutes} min
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
