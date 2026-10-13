import { Space_Grotesk, Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { ChunkLoadErrorHandler } from '@/components/chunk-load-error-handler'
import { Providers } from '@/components/providers'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { GoogleAnalytics } from '@/components/google-analytics'
import { ConsentDefaults } from '@/components/consent-defaults'
import { GlowTracker } from '@/components/glow-tracker'

export const dynamic = 'force-dynamic'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display', display: 'swap' })
const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://criptoworld.org'),
  title: { default: 'CriptoMundo — Información y educación cripto', template: '%s | CriptoMundo' },
  description: 'Plataforma de información, educación y herramientas sobre criptomonedas. Datos de mercado en vivo, noticias reales y artículos educativos.',
  icons: { icon: '/favicon.svg', shortcut: '/favicon.svg' },
  openGraph: {
    title: 'CriptoMundo — Información y educación cripto',
    description: 'Datos de mercado en vivo, noticias reales y artículos educativos sobre criptomonedas.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'es_ES',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${inter.variable} font-sans antialiased`}>
        <ConsentDefaults />
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7428485851163208"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        <GoogleAnalytics />
        <Providers>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Toaster />
          <ChunkLoadErrorHandler />
          <GlowTracker />
        </Providers>
      </body>
    </html>
  )
}
