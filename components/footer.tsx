import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-card/50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div className="max-w-sm">
            <span className="font-display text-lg font-bold tracking-tight">
              <span className="text-primary">Cripto</span>Mundo
            </span>
            <p className="mt-2 text-sm text-muted-foreground">
              Plataforma informativa y educativa sobre criptomonedas. Datos de mercado en vivo, noticias reales y contenido original.
            </p>
          </div>
          <nav className="flex gap-6 text-sm">
            <Link href="/mercado" className="text-muted-foreground hover:text-foreground transition-colors">Mercado</Link>
            <Link href="/noticias" className="text-muted-foreground hover:text-foreground transition-colors">Noticias</Link>
            <Link href="/aprende" className="text-muted-foreground hover:text-foreground transition-colors">Aprende</Link>
            <Link href="/aviso-legal" className="text-muted-foreground hover:text-foreground transition-colors">Aviso legal</Link>
          </nav>
        </div>
        <div className="mt-8 rounded-lg border border-primary/20 bg-primary/5 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Aviso importante:</strong> La información proporcionada en CriptoMundo tiene carácter exclusivamente informativo y educativo. No constituye asesoramiento financiero, fiscal ni de inversión. Las criptomonedas son activos de alto riesgo y su valor puede fluctuar significativamente. Consulta siempre con un profesional financiero cualificado antes de tomar decisiones de inversión.
            </p>
          </div>
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          © 2024 CriptoMundo. Contenido educativo e informativo.
        </p>
      </div>
    </footer>
  )
}
