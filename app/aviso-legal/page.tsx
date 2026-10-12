import { Metadata } from 'next'
import { AlertTriangle, ShieldAlert } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Aviso legal',
  description: 'Información legal y descargo de responsabilidad de CriptoMundo.',
}

export default function AvisoLegalPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3 mb-8">
        <ShieldAlert className="h-8 w-8 text-primary" />
        <h1 className="font-display text-3xl font-bold tracking-tight">Aviso legal y descargo de responsabilidad</h1>
      </div>

      <div className="space-y-8 text-sm text-muted-foreground leading-relaxed">
        <section>
          <h2 className="font-display text-lg font-bold text-foreground mb-3">Naturaleza de la información</h2>
          <p>CriptoMundo es una plataforma con fines exclusivamente informativos y educativos. Toda la información, datos, artículos, análisis, simulaciones y herramientas proporcionados a través de esta plataforma se ofrecen únicamente con propósitos educativos y de información general.</p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-foreground mb-3">No constituye asesoramiento financiero</h2>
          <p>Nada de lo contenido en CriptoMundo debe interpretarse como asesoramiento financiero, de inversión, fiscal, legal o de cualquier otra índole profesional. Las criptomonedas son activos altamente volátiles y de alto riesgo. Su valor puede fluctuar drásticamente en periodos cortos de tiempo, y es posible perder la totalidad del capital invertido.</p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-foreground mb-3">Datos de mercado</h2>
          <p>Los precios, gráficos y datos de mercado mostrados provienen de APIs públicas de terceros (como CoinGecko y CoinCap). CriptoMundo no garantiza la exactitud, integridad ni actualidad de estos datos. Los precios pueden tener un retraso y diferir de los precios reales de negociación en exchanges.</p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-foreground mb-3">Noticias</h2>
          <p>Las noticias mostradas proceden de fuentes externas públicas (feeds RSS). CriptoMundo muestra los titulares y enlaces originales sin modificar su contenido. La responsabilidad del contenido noticioso corresponde a sus respectivas fuentes originales.</p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-foreground mb-3">Cartera virtual y simulador</h2>
          <p>La cartera virtual y el simulador de inversión son herramientas exclusivamente educativas. Los resultados mostrados se basan en datos históricos y actuales de mercado, pero los rendimientos pasados no garantizan resultados futuros. Estas herramientas no deben utilizarse como base para decisiones de inversión reales.</p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-foreground mb-3">Recomendación</h2>
          <p>Antes de realizar cualquier inversión en criptomonedas u otros activos financieros, consulta con un profesional financiero cualificado. Invierte únicamente capital que estés dispuesto a perder en su totalidad.</p>
        </section>

        <div className="rounded-lg border border-primary/20 bg-primary/5 p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground mb-1">Advertencia de riesgo</p>
              <p>Invertir en criptomonedas implica riesgos significativos, incluyendo la posible pérdida total del capital invertido. Las criptomonedas no están reguladas en muchas jurisdicciones y pueden no estar protegidas por esquemas de garantía de depósitos.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
