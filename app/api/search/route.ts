export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getAllGuides } from '@/lib/guides'
import { getAllTools } from '@/lib/tools'
import { getAllNews } from '@/lib/news'
import { getAllAnswers } from '@/lib/answers'
import { getAllCoins } from '@/lib/coins'
import { getGlossary } from '@/lib/glossary'
import { getAllLessons } from '@/lib/academia-data'


const PAGES = [
  { title: 'Mercado en vivo', href: '/mercado', desc: 'Precios de las principales criptomonedas en tiempo real' },
  { title: 'Noticias cripto', href: '/noticias', desc: 'Las \u00faltimas noticias del mundo de las criptomonedas' },
  { title: 'Aprende', href: '/aprende', desc: 'Art\u00edculos educativos sobre criptomonedas' },
  { title: 'Academia Cripto', href: '/academia', desc: 'Lecciones interactivas en 3 niveles' },
  { title: 'Resumen semanal', href: '/resumen-semanal', desc: 'Lo más importante de la semana en criptomonedas, cada lunes' },
  { title: 'Calendario cripto y fiscal', href: '/calendario', desc: 'Plazos de la Renta y el modelo 721, normativa y halvings' },
  { title: 'Comparador de exchanges', href: '/comparador-exchanges', desc: 'Comisiones y servicios de 12 plataformas autorizadas en España' },
  { title: 'Herramientas', href: '/herramientas', desc: 'Calculadoras y herramientas para inversores' },
  { title: '\u00c1rea personal', href: '/area-personal', desc: 'Tu cartera virtual y simulador' },
]

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q')?.trim().toLowerCase() || ''
  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] })
  }

  const results: { type: string; title: string; href: string; desc?: string }[] = []

  // Search pages
  PAGES.forEach(p => {
    if (p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)) {
      results.push({ type: 'p\u00e1gina', title: p.title, href: p.href, desc: p.desc })
    }
  })

  // Search academia lessons
  const lessons = getAllLessons()
  lessons.forEach(l => {
    if (l.title.toLowerCase().includes(q) || l.simpleExplanation.toLowerCase().includes(q)) {
      results.push({ type: 'lecci\u00f3n', title: l.title, href: `/academia/${l.slug}`, desc: l.simpleExplanation.slice(0, 100) })
    }
  })

  // Search guides
  getAllGuides().forEach(g => {
    if (g.title.toLowerCase().includes(q) || g.description.toLowerCase().includes(q)) {
      results.push({ type: 'gu\u00eda', title: g.title, href: `/aprende/${g.slug}`, desc: g.description.slice(0, 100) })
    }
  })

  // Search tools
  getAllTools().forEach(t => {
    if (t.title.toLowerCase().includes(q) || t.short.toLowerCase().includes(q)) {
      results.push({ type: 'herramienta', title: t.title, href: `/herramientas/${t.slug}`, desc: t.short.slice(0, 100) })
    }
  })

  // Search news
  getAllNews().forEach(n => {
    if (n.titulo.toLowerCase().includes(q) || n.descripcion.toLowerCase().includes(q)) {
      results.push({ type: 'noticia', title: n.titulo, href: `/noticias/${n.slug}`, desc: n.descripcion.slice(0, 100) })
    }
  })

  // Search coin pages
  getAllCoins().forEach(c => {
    if (c.nombre.toLowerCase().includes(q) || c.simbolo.toLowerCase().includes(q)) {
      results.push({ type: 'ficha', title: c.nombre === c.simbolo ? c.nombre : `${c.nombre} (${c.simbolo})`, href: `/cripto/${c.slug}`, desc: c.descripcion.slice(0, 100) })
    }
  })

  // Search answers
  getAllAnswers().forEach(a => {
    if (a.pregunta.toLowerCase().includes(q) || a.descripcion.toLowerCase().includes(q)) {
      results.push({ type: 'respuesta', title: a.pregunta, href: `/respuestas/${a.slug}`, desc: a.descripcion.slice(0, 100) })
    }
  })

  // Search glossary
  getGlossary().forEach(t => {
    if (t.term.toLowerCase().includes(q)) {
      results.push({ type: 'glosario', title: t.term, href: `/glosario#${t.slug}`, desc: t.definition.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').slice(0, 100) })
    }
  })

  return NextResponse.json({ results: results.slice(0, 15) })
}
