import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getLessonBySlug, getAllLessons, getLessonNavigation, getLevelLabel, getLevelColor, getLevelBg } from '@/lib/academia-data'
import { LessonClient } from './lesson-client'

export async function generateStaticParams() {
  return getAllLessons().map(l => ({ slug: l.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const lesson = getLessonBySlug(slug)
  if (!lesson) return { title: 'Lección no encontrada' }
  return {
    title: `${lesson.title} — Academia Cripto`,
    description: lesson.simpleExplanation,
    openGraph: { title: lesson.title, description: lesson.simpleExplanation },
  }
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const lesson = getLessonBySlug(slug)
  if (!lesson) notFound()

  const rawNav = getLessonNavigation(slug)
  const nav = {
    prev: rawNav.prev ? { slug: rawNav.prev.slug, title: rawNav.prev.title } : null,
    next: rawNav.next ? { slug: rawNav.next.slug, title: rawNav.next.title } : null,
  }
  const levelLabel = getLevelLabel(lesson.level)
  const levelColor = getLevelColor(lesson.level)
  const levelBg = getLevelBg(lesson.level)

  return (
    <LessonClient
      lesson={lesson}
      nav={nav}
      levelLabel={levelLabel}
      levelColor={levelColor}
      levelBg={levelBg}
    />
  )
}
