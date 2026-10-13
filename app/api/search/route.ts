export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getAllGuides } from '@/lib/guides'
import { getAllLessons } from '@/lib/academia-data'

const TOOLS = [
  { title: 'Calculadora de inversión', slug: 'inversion', type: 'herramienta' },
  { title: 'Simulador DCA', slug: 'dca', type: 'herramienta' },
  { title: 'Calculadora de staking', slug: 'staking', type: 'herramienta' },
  { title: 'Rentabilidad', slug: 'rentabilidad', type: 'herramienta' },
  { title: 'Comisiones', slug: 'comisiones', type: 'herramienta' },
  { title: 'Conversor EUR/USD', slug: 'conversor', type: 'herramienta' },
  { title: 'Market Cap', slug: 'marketcap', type: 'herramienta' },
  { title: 'BTC \u2194 Satoshis', slug: 'btc-sat', type: 'herramienta' },
  { title: 'ETH \u2194 Gwei', slug: 'eth-gwei', type: 'herramienta' },
  { title: 'Cambio porcentual', slug: 'porcentaje', type: 'herramienta' },
  { title: 'Inter\u00e9s compuesto', slug: 'interes', type: 'herramienta' },
]

const PAGES = [
  { title: 'Mercado en vivo', href: '/mercado', desc: 'Precios de las principales criptomonedas en tiempo real' },
  { title: 'Noticias cripto', href: '/noticias', desc: 'Las \u00faltimas noticias del mundo de las criptomonedas' },
  { title: 'Aprende', href: '/aprende', desc: 'Art\u00edculos educativos sobre criptomonedas' },
  { title: 'Academia Cripto', href: '/academia', desc: 'Lecciones interactivas en 3 niveles' },
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
  TOOLS.forEach(t => {
    if (t.title.toLowerCase().includes(q)) {
      results.push({ type: 'herramienta', title: t.title, href: `/herramientas?t=${t.slug}` })
    }
  })

  return NextResponse.json({ results: results.slice(0, 15) })
}
