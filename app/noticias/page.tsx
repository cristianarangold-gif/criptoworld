import { Metadata } from 'next'
import { getNews } from '@/lib/rss'
import { NoticiasClient } from '@/components/noticias-client'

export const metadata: Metadata = {
  title: 'Noticias',
  description: 'Noticias reales del mundo cripto de fuentes como CoinDesk, Cointelegraph y Decrypt.',
}

export default async function NoticiasPage() {
  const news = await getNews().catch(() => [])
  return <NoticiasClient initialNews={news} />
}
