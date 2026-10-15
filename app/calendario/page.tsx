import { Metadata } from 'next'
import Link from 'next/link'
import { CalendarDays, CalendarPlus, Download, ExternalLink } from 'lucide-react'
import { getCalendar, upcoming, past, googleCalendarUrl, CATEGORIAS, CATEGORIA_LABEL, type Evento } from '@/lib/calendar'
import { formatDate } from '@/lib/guides'
import { CalendarFilter } from '@/components/calendar-filter'
import { SITE } from '@/lib/site'
import { cn } from '@/lib/utils'

// Se regenera cada día para mover a «Ya pasado» lo que haya terminado.
export const revalidate = 86400

export const metadata: Metadata = {
  title: 'Calendario cripto y fiscal: Renta, modelo 721, MiCA y halvings',
  description: 'Las fechas que importan si tienes criptomonedas en España: plazos de la Renta y del modelo 721, normativa europea (MiCA, DAC8) y halvings de Bitcoin y Litecoin. Suscríbete desde tu calendario.',
  alternates: { canonical: '/calendario' },
}

const PAGE_URL = `${SITE.url}/calendario`
const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
const monthKey = (d: string) => d.slice(0, 7)
const monthTitle = (k: string) => `${MESES[Number(k.slice(5, 7)) - 1]} de ${k.slice(0, 4)}`
const CAT_STYLE: Record<string, string> = {
  hacienda: 'border-amber-500/40 text-amber-500',
  normativa: 'border-sky-500/40 text-sky-400',
  red: 'border-emerald-500/40 text-emerald-500',
}

function fechas(e: Evento) {
  return e.fin ? `Del ${formatDate(e.inicio)} al ${formatDate(e.fin)}` : formatDate(e.inicio)
}

function Item({ e, pasado = false }: { e: Evento; pasado?: boolean }) {
  return (
    <li id={pasado ? undefined : e.id} data-cat={e.categoria} className={cn('scroll-mt-24 rounded-xl border border-border/50 p-4', !pasado && 'glass-card')}>
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className={cn('rounded-full border px-2 py-0.5 font-medium', CAT_STYLE[e.categoria])}>{CATEGORIA_LABEL[e.categoria]}</span>
        <time dateTime={e.inicio} className="text-muted-foreground">{fechas(e)}</time>
        {e.aproximada && <span className="rounded-full border border-border/60 px-2 py-0.5 text-muted-foreground">Fecha aproximada</span>}
      </div>
      <h4 className="mt-2 font-semibold text-foreground">{e.titulo}</h4>
      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{e.descripcion}</p>
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
        {e.enlace && <Link href={e.enlace.href} className="text-primary underline underline-offset-2">{e.enlace.title}</Link>}
        <a href={e.fuente.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary">
          <ExternalLink className="h-3 w-3" />Fuente: {e.fuente.title}
        </a>
      </div>
      {!pasado && (
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          <a href={googleCalendarUrl(e, PAGE_URL)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 px-3 py-1.5 hover:bg-muted/50">
            <CalendarPlus className="h-3.5 w-3.5" />Google Calendar
          </a>
          <a href={`/calendario/${e.id}.ics`} className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 px-3 py-1.5 hover:bg-muted/50">
            <Download className="h-3.5 w-3.5" />Archivo .ics
          </a>
        </div>
      )}
    </li>
  )
}

export default function CalendarioPage() {
  const { revisado, eventos } = getCalendar()
  const today = new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Madrid' })
  const next = upcoming(eventos, today)
  const done = past(eventos, today)
  const months = [...new Set(next.map(e => monthKey(e.inicio < today ? today : e.inicio)))]
  const host = SITE.url.replace(/^https?:\/\//, '')

  const jsonLd = [
    ...next.map(e => ({
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: e.titulo,
      description: e.descripcion,
      startDate: e.inicio,
      endDate: e.fin ?? e.inicio,
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
      location: { '@type': 'VirtualLocation', url: e.fuente.url },
      organizer: { '@type': 'Organization', name: SITE.name, url: SITE.url },
      url: `${PAGE_URL}#${e.id}`,
    })),
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE.url },
        { '@type': 'ListItem', position: 2, name: 'Calendario cripto y fiscal', item: PAGE_URL },
      ],
    },
  ]

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="flex items-center gap-3 mb-3">
        <CalendarDays className="h-7 w-7 text-primary" />
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">Calendario cripto y fiscal</h1>
      </div>
      <div className="space-y-3 text-muted-foreground leading-relaxed">
        <p>
          Las fechas que importan si tienes criptomonedas y vives en España: los plazos de Hacienda (la Renta, el modelo 721,
          el Impuesto sobre el Patrimonio), los cambios de la normativa europea y los hitos técnicos previsibles de las redes,
          como los halvings de Bitcoin y Litecoin. Cada fecha enlaza a su fuente oficial y a la página de CriptoMundo que la
          explica.
        </p>
        <p>
          Cuando una fecha todavía no es oficial, la marcamos como <strong className="text-foreground">«Fecha aproximada»</strong> y
          explicamos de dónde sale la estimación. No incluimos predicciones de mercado ni eventos promocionales.
        </p>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        <CalendarDays className="mr-1.5 inline h-3.5 w-3.5 align-[-2px]" />
        Revisado el <time dateTime={revisado}>{formatDate(revisado)}</time> por{' '}
        <Link href="/sobre-nosotros" className="text-foreground hover:text-primary">{SITE.owner}</Link>.
      </p>

      <section aria-labelledby="suscribete" className="mt-8 rounded-xl border border-primary/30 bg-primary/5 p-5">
        <h2 id="suscribete" className="font-display text-lg font-bold">Llévatelo a tu calendario</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Suscríbete y las fechas aparecerán en tu calendario; cuando añadamos fechas nuevas, se actualizarán solas.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <a href={`webcal://${host}/calendario.ics`} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            <CalendarPlus className="h-4 w-4" />Suscribirme
          </a>
          <a href="/calendario.ics" className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/50 px-4 py-2 text-sm font-semibold hover:bg-muted">
            <Download className="h-4 w-4" />Descargar .ics
          </a>
        </div>
        <details className="mt-3 text-sm text-muted-foreground">
          <summary className="cursor-pointer text-primary">Cómo añadirlo en Google Calendar, iPhone u Outlook</summary>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li><strong className="text-foreground">Google Calendar</strong> (en el ordenador): «Otros calendarios» → «+» → «Desde URL», y pega <code className="text-foreground">{`${SITE.url}/calendario.ics`}</code>.</li>
            <li><strong className="text-foreground">iPhone y Mac</strong>: pulsa «Suscribirme» y confirma en la app Calendario.</li>
            <li><strong className="text-foreground">Outlook</strong>: «Agregar calendario» → «Suscribirse desde la web», y pega la misma dirección.</li>
          </ul>
        </details>
      </section>

      <section aria-labelledby="proximas" className="mt-10">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 id="proximas" className="font-display text-2xl font-bold">Próximas fechas</h2>
          <CalendarFilter options={CATEGORIAS.map(c => ({ id: c, label: CATEGORIA_LABEL[c] }))} />
        </div>
        <div className="space-y-8">
          {months.map(m => (
            <div key={m} data-month={m}>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">{monthTitle(m)}</h3>
              <ul className="space-y-3">
                {next.filter(e => monthKey(e.inicio < today ? today : e.inicio) === m).map(e => (
                  <Item key={e.id} e={e} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-12 space-y-8 leading-relaxed">
        <section>
          <h2 className="font-display text-2xl font-bold mb-3">Cómo usar este calendario</h2>
          <div className="space-y-3 text-muted-foreground">
            <p>
              La mayoría de las fechas de Hacienda se repiten cada año: el modelo 721 entre el 1 de enero y el 31 de marzo, la
              campaña de la Renta entre abril y el 30 de junio y, si fraccionas el pago, el segundo plazo el 5 de noviembre.
              Lo que cambia es el ejercicio al que se refieren: en la Renta de 2027 declaras lo que hiciste en 2026. Por eso
              conviene preparar los datos con tiempo, sobre todo si has usado varias plataformas: descarga el historial de cada
              una en enero, antes de que empiece la campaña.
            </p>
            <p>
              Las fechas de normativa marcan cuándo cambia lo que pueden hacer las plataformas contigo o lo que Hacienda sabe de
              ti. No te obligan a hacer nada ese día, pero conviene conocerlas: por ejemplo, desde que se aplique el intercambio
              de información de la DAC8, Hacienda recibirá los datos de tus operaciones en exchanges de otros países de la UE.
            </p>
            <p>
              Las fechas de las redes, como los halvings, son técnicas: el día exacto depende de lo rápido que se produzcan los
              bloques, así que las estimamos y las actualizamos cuando se acercan. No son una señal para comprar ni para vender:
              que un halving haya coincidido con subidas en el pasado no garantiza nada.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold mb-3">Por qué el 31 de diciembre importa tanto</h2>
          <div className="space-y-3 text-muted-foreground">
            <p>
              Es la fecha de referencia para dos obligaciones. El modelo 721 se presenta si, ese día, tus criptomonedas
              custodiadas por plataformas extranjeras valen más de 50.000 €. Y el Impuesto sobre el Patrimonio valora tus
              criptos al precio de mercado de ese día. Como el precio puede cambiar mucho en pocas horas, guarda una captura o
              un extracto de tus saldos con su valor en euros a 31 de diciembre: te ahorrará problemas si Hacienda te pregunta.
            </p>
            <p>
              Lo explicamos con detalle en <Link href="/respuestas/cuando-presentar-modelo-721" className="text-primary underline underline-offset-2">¿Cuándo hay que presentar el modelo 721?</Link> y en{' '}
              <Link href="/respuestas/impuesto-patrimonio-criptomonedas" className="text-primary underline underline-offset-2">¿Hay que pagar el Impuesto sobre el Patrimonio?</Link>.
              Si es tu primera Renta con criptomonedas, empieza por la <Link href="/aprende/declarar-criptomonedas-hacienda" className="text-primary underline underline-offset-2">guía para declarar criptomonedas</Link>.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold mb-3">Cómo mantenemos las fechas</h2>
          <p className="text-muted-foreground">
            Cada fecha procede de una fuente oficial: la Agencia Tributaria, el BOE, la Comisión Europea, EUR-Lex o la propia
            red en el caso de los halvings. Cada enero añadimos las fechas fiscales del año siguiente y, cuando la Agencia
            Tributaria publica el calendario oficial de la Renta, confirmamos las que estaban marcadas como aproximadas. Si ves
            una fecha que ha cambiado, escríbeme a <a href={`mailto:${SITE.email}`} className="text-primary underline">{SITE.email}</a>.
          </p>
        </section>

        {done.length > 0 && (
          <details className="rounded-xl border border-border/50 p-4">
            <summary className="cursor-pointer font-display text-lg font-bold">Ya pasado ({done.length})</summary>
            <ul className="mt-4 space-y-3">
              {done.map(e => <Item key={e.id} e={e} pasado />)}
            </ul>
          </details>
        )}

        <p className="rounded-lg border border-border/50 p-4 text-xs text-muted-foreground">
          Información general con fines divulgativos, no asesoramiento fiscal. Los plazos oficiales pueden cambiar: comprueba
          siempre la fuente antes de presentar una declaración.
        </p>
      </div>
    </div>
  )
}
