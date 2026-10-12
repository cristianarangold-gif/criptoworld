export const dynamic = 'force-dynamic'

import { Metadata } from 'next'
import { Search } from 'lucide-react'
import { BuscarClient } from './buscar-client'

export const metadata: Metadata = {
  title: 'Buscar — CriptoMundo',
  description: 'Busca lecciones, art\u00edculos, herramientas y m\u00e1s en CriptoMundo.',
}

export default async function BuscarPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams
  return <BuscarClient initialQuery={q || ''} />
}
