import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getLessonBySlug, getAllLessons, getLessonNavigation, getLevelLabel, getLevelColor, getLevelBg } from '@/lib/academia-data'
import { LessonClient } from './lesson-client'
import { SITE } from '@/lib/site'

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
    alternates: { canonical: `/academia/${slug}` },
    openGraph: { type: 'article', title: lesson.title, description: lesson.simpleExplanation },
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: lesson.title,
    description: lesson.simpleExplanation,
    inLanguage: 'es-ES',
    mainEntityOfPage: `${SITE.url}/academia/${slug}`,
    author: { '@type': 'Person', name: SITE.owner, url: `${SITE.url}/sobre-nosotros` },
    publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    ...(lesson.updated ? { dateModified: lesson.updated } : {}),
    ...(lesson.sources?.length ? { citation: lesson.sources.map(s => s.url) } : {}),
  }

  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <LessonClient
      lesson={lesson}
      nav={nav}
      levelLabel={levelLabel}
      levelColor={levelColor}
      levelBg={levelBg}
    />
    </>
  )
}
