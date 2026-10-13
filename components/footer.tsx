import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'
import { CookieSettingsButton } from '@/components/cookie-settings-button'

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
              Guías en español para entender las criptomonedas, sus riesgos y su normativa, con datos de mercado en vivo.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3">
            <nav aria-label="Contenido" className="flex flex-col gap-2">
              <span className="font-semibold text-foreground">Contenido</span>
              <Link href="/empieza-aqui" className="text-muted-foreground hover:text-foreground transition-colors">Empieza aquí</Link>
              <Link href="/aprende" className="text-muted-foreground hover:text-foreground transition-colors">Guías</Link>
              <Link href="/academia" className="text-muted-foreground hover:text-foreground transition-colors">Academia</Link>
              <Link href="/herramientas" className="text-muted-foreground hover:text-foreground transition-colors">Herramientas</Link>
              <Link href="/mercado" className="text-muted-foreground hover:text-foreground transition-colors">Mercado</Link>
              <Link href="/glosario" className="text-muted-foreground hover:text-foreground transition-colors">Glosario</Link>
              <Link href="/noticias" className="text-muted-foreground hover:text-foreground transition-colors">Noticias</Link>
            </nav>
            <nav aria-label="Sobre CriptoMundo" className="flex flex-col gap-2">
              <span className="font-semibold text-foreground">CriptoMundo</span>
              <Link href="/sobre-nosotros" className="text-muted-foreground hover:text-foreground transition-colors">Quiénes somos</Link>
              <Link href="/contacto" className="text-muted-foreground hover:text-foreground transition-colors">Contacto</Link>
            </nav>
            <nav aria-label="Legal" className="flex flex-col gap-2">
              <span className="font-semibold text-foreground">Legal</span>
              <Link href="/aviso-legal" className="text-muted-foreground hover:text-foreground transition-colors">Aviso legal</Link>
              <Link href="/privacidad" className="text-muted-foreground hover:text-foreground transition-colors">Privacidad</Link>
              <Link href="/cookies" className="text-muted-foreground hover:text-foreground transition-colors">Cookies</Link>
              <CookieSettingsButton className="text-left text-muted-foreground hover:text-foreground transition-colors" />
            </nav>
          </div>
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
          © {new Date().getFullYear()} CriptoMundo · Cristian Arango. Contenido educativo e informativo.
        </p>
      </div>
    </footer>
  )
}
