import fs from 'fs'
import path from 'path'
import { getAllLessons, getLessonBySlug } from '@/lib/academia-data'
import { getAllGuides, getGuide } from '@/lib/guides'
import { getAllTools, getTool } from '@/lib/tools'

// Ruta «Empieza aquí»: etapas con pasos que apuntan a lecciones, guías o herramientas existentes.

export type RouteStep = { tipo: 'leccion' | 'guia' | 'herramienta'; slug: string }
export type RouteStage = { titulo: string; descripcion: string; pasos: RouteStep[] }
export type ResolvedStep = RouteStep & { title: string; href: string; minutes: number }

const TIPO_LABEL: Record<RouteStep['tipo'], string> = { leccion: 'lección', guia: 'guía', herramienta: 'herramienta' }

export function validateRoute(stages: RouteStage[], known: Record<RouteStep['tipo'], string[]>): string[] {
  return stages.flatMap(stage =>
    stage.pasos
      .filter(p => !known[p.tipo]?.includes(p.slug))
      .map(p => `«${stage.titulo}»: no existe la ${TIPO_LABEL[p.tipo] ?? p.tipo} «${p.slug}»`),
  )
}

export function knownSlugs(): Record<RouteStep['tipo'], string[]> {
  return {
    leccion: getAllLessons().map(l => l.slug),
    guia: getAllGuides().map(g => g.slug),
    herramienta: getAllTools().map(t => t.slug),
  }
}

export function getRoute(): RouteStage[] {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'content', 'ruta.json'), 'utf8'))
}

export function resolveStep(step: RouteStep): ResolvedStep {
  if (step.tipo === 'leccion') {
    const l = getLessonBySlug(step.slug)!
    return { ...step, title: l.title, href: `/academia/${l.slug}`, minutes: l.readTime }
  }
  if (step.tipo === 'guia') {
    const g = getGuide(step.slug)!
    return { ...step, title: g.title, href: `/aprende/${g.slug}`, minutes: g.readTime }
  }
  const t = getTool(step.slug)!
  return { ...step, title: t.title, href: `/herramientas/${t.slug}`, minutes: 3 }
}
