import { Metadata } from 'next'
import Link from 'next/link'
import { CalendarDays, ExternalLink, Landmark, ShieldAlert } from 'lucide-react'
import { getCambios, getRegistro, normalizeSearch, summarize, SERVICIOS, TIPOS, type Entidad } from '@/lib/cnmv'
import { getExchanges } from '@/lib/exchanges'
import { formatDate } from '@/lib/guides'
import { CnmvFilter } from '@/components/cnmv-filter'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Empresas autorizadas por MiCA en España: listado y buscador',
  description: 'Busca entre los proveedores de criptoactivos de la lista de la CNMV: país, tipo de entidad, servicios y fechas. Con las altas y bajas de cada actualización.',
  alternates: { canonical: '/empresas-autorizadas-mica' },
}

const REGISTRO_CNMV = 'https://www.cnmv.es/portal/Consultas/Proveedores-Servicios-Criptoactivos.aspx'
const REGISTRO_ESMA = 'https://www.esma.europa.eu/investor-corner/is-the-firm-regulated'
const ADVERTENCIAS_CNMV = 'https://www.cnmv.es/Portal/BusquedaAdvertencias.aspx?lang=es'

const tipoLabel = (e: Entidad) => TIPOS.find(t => t.id === e.tipo)?.label ?? 'Sin clasificar'

const SERVICIO_INFO: [string, string][] = [
  ['Custodia y administración', 'Guarda tus criptoactivos o las claves que dan acceso a ellos.'],
  ['Gestión plataforma de negociación', 'Opera un mercado donde se cruzan compras y ventas de terceros.'],
  ['Canje criptos por fondos', 'Te compra o te vende criptoactivos a cambio de euros u otra moneda oficial.'],
  ['Canje criptos por criptos', 'Te cambia un criptoactivo por otro.'],
  ['Ejecución', 'Ejecuta órdenes de compra o venta por cuenta de sus clientes.'],
  ['Colocación', 'Comercializa criptoactivos entre compradores en nombre de quien los ofrece.'],
  ['Recepción y transmisión órdenes', 'Recibe tu orden y la pasa a otra entidad para que la ejecute.'],
  ['Asesoramiento', 'Da recomendaciones personalizadas sobre criptoactivos.'],
  ['Gestión de carteras', 'Decide las inversiones de tu cartera siguiendo el mandato que le das.'],
  ['Servicios de transferencia', 'Mueve criptoactivos de una dirección o cuenta a otra por encargo tuyo.'],
]

function Fechas({ e }: { e: Entidad }) {
  const fechas = new Set(e.servicios.map(s => s.desde))
  if (fechas.size === 1) {
    const [unica] = fechas
    return (
      <>
        <p className="mt-2 text-sm text-muted-foreground">{e.servicios.map(s => s.servicio).join(' · ')}</p>
        <p className="mt-2 text-xs text-muted-foreground">{unica ? <>Desde el {formatDate(unica)}</> : 'Fecha no indicada en la lista'}</p>
      </>
    )
  }
  return (
    <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
      {e.servicios.map(s => (
        <li key={s.servicio}>{s.servicio} <span className="text-xs">({s.desde ? `desde el ${formatDate(s.desde)}` : 'fecha no indicada'})</span></li>
      ))}
    </ul>
  )
}

export default function EmpresasAutorizadasMicaPage() {
  const { fecha, comprobado, url, entidades } = getRegistro()
  const { inicio, cambios } = getCambios()
  const resumen = summarize(entidades)
  const marcas = new Map(getExchanges().plataformas.map(p => [p.entidad, p.nombre]))
  const paises = resumen.paises.map(p => p.pais).sort((a, b) => a.localeCompare(b, 'es'))
  const tipos = TIPOS.filter(t => entidades.some(e => e.tipo === t.id)).map(t => ({ id: t.id, label: t.label }))

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE.url },
        { '@type': 'ListItem', position: 2, name: 'Empresas autorizadas por MiCA', item: `${SITE.url}/empresas-autorizadas-mica` },
      ],
    },
  ]

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-3xl">
        <div className="flex items-center gap-3 mb-3">
          <Landmark className="h-7 w-7 shrink-0 text-primary" />
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">Empresas autorizadas por MiCA en España</h1>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          Desde el 1 de julio de 2026, solo pueden ofrecer servicios con criptoactivos en España las entidades de la relación que
          publica la CNMV. La lista oficial es un PDF de {resumen.total} empresas; aquí la tienes para buscar por nombre o marca,
          filtrar por país o servicio y ver desde cuándo puede operar cada una.
        </p>
        <div className="mt-5 flex items-start gap-3 rounded-xl border border-primary/30 bg-primary/5 p-4 text-sm">
          <ShieldAlert className="h-5 w-5 shrink-0 text-primary" />
          <p>
            <strong className="text-foreground">Estar en la lista no es una recomendación.</strong> Significa que la empresa puede prestar
            esos servicios, no que sea segura ni adecuada para ti, y no te protege de perder dinero si baja el precio. Esta página es una copia
            hecha por nosotros y puede tener errores o ir con retraso: antes de decidir, manda siempre el{' '}
            <a href={REGISTRO_CNMV} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">registro de la CNMV</a>.
          </p>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          <CalendarDays className="mr-1.5 inline h-3.5 w-3.5 align-[-2px]" />
          Lista de la CNMV del <time dateTime={fecha}>{formatDate(fecha)}</time>, comprobada el{' '}
          <time dateTime={comprobado}>{formatDate(comprobado)}</time>.{' '}
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">Ver el PDF oficial</a>.
        </p>
      </div>

      <dl className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border/50 p-4">
          <dt className="text-xs text-muted-foreground">Entidades en la lista</dt>
          <dd className="mt-1 font-display text-3xl font-bold">{resumen.total}</dd>
        </div>
        <div className="rounded-xl border border-border/50 p-4">
          <dt className="text-xs text-muted-foreground">Empresas y bancos españoles</dt>
          <dd className="mt-1 font-display text-3xl font-bold">{resumen.espanolas}</dd>
        </div>
        <div className="rounded-xl border border-border/50 p-4">
          <dt className="text-xs text-muted-foreground">Países de origen más frecuentes</dt>
          <dd className="mt-1 text-sm font-medium">{resumen.paises.filter(p => p.pais !== 'España').slice(0, 3).map(p => `${p.pais} (${p.n})`).join(', ')}</dd>
        </div>
      </dl>

      <div className="mt-6">
        <CnmvFilter paises={paises} tipos={tipos} servicios={SERVICIOS} total={resumen.total} />
      </div>

      <ul className="mt-6 grid gap-4 lg:grid-cols-2">
        {entidades.map(e => {
          const marca = marcas.get(e.nombre)
          return (
            <li
              key={e.nombre}
              data-entidad
              data-q={normalizeSearch(`${e.nombre} ${marca ?? ''}`)}
              data-pais={e.pais ?? ''}
              data-tipo={e.tipo}
              data-servicios={e.servicios.map(s => s.servicio).join('|')}
              className="rounded-xl border border-border/50 p-4"
            >
              <h2 className="font-display font-bold break-words">{e.nombre}</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                {tipoLabel(e)} · {e.pais ?? 'País no indicado en la lista'}
                {marca && (
                  <> · <Link href="/comparador-exchanges" className="text-primary underline underline-offset-2">{marca} en el comparador</Link></>
                )}
              </p>
              <Fechas e={e} />
            </li>
          )
        })}
      </ul>

      <div className="mt-12 max-w-3xl space-y-10 leading-relaxed">
        <section>
          <h2 className="font-display text-2xl font-bold mb-3">Cambios en la lista</h2>
          {cambios.length === 0 ? (
            <p className="text-muted-foreground">
              Empezamos a seguir la lista con la versión del {formatDate(inicio)}. Cada mes la comparamos con la anterior y anotamos aquí qué
              empresas entran y cuáles salen.
            </p>
          ) : (
            <ul className="space-y-4 text-muted-foreground">
              {cambios.map(c => (
                <li key={c.fecha}>
                  <h3 className="font-semibold text-foreground">Lista del {formatDate(c.fecha)}</h3>
                  {c.altas.length > 0 && <p>Entran: {c.altas.join(', ')}.</p>}
                  {c.bajas.length > 0 && <p>Salen: {c.bajas.join(', ')}.</p>}
                </li>
              ))}
            </ul>
          )}
          {cambios.length > 0 && (
            <p className="mt-3 text-sm text-muted-foreground">
              Una salida puede deberse a un cambio de nombre o a una reorganización: no significa por sí sola que la empresa haya perdido la autorización. Comprueba cada caso en la CNMV.
            </p>
          )}
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold mb-3">Qué significa cada tipo de entidad</h2>
          <dl className="space-y-3 text-muted-foreground">
            <div><dt className="font-semibold text-foreground">Empresa española</dt><dd>Un proveedor de servicios de criptoactivos (PSC) con sede en España, supervisado por la CNMV.</dd></div>
            <div><dt className="font-semibold text-foreground">Banco español</dt><dd>Una entidad de crédito española que también presta servicios con criptoactivos.</dd></div>
            <div><dt className="font-semibold text-foreground">Extranjera con sucursal en España</dt><dd>Autorizada en otro país, con una sucursal aquí.</dd></div>
            <div><dt className="font-semibold text-foreground">Extranjera con pasaporte europeo</dt><dd>Autorizada por el supervisor de otro país del Espacio Económico Europeo, y opera en España en libre prestación de servicios («LP» en el PDF). Su supervisor principal es el de ese país.</dd></div>
          </dl>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold mb-3">Qué significa cada servicio</h2>
          <p className="mb-3 text-muted-foreground">La autorización es por servicios: una empresa puede poder custodiar criptoactivos y no poder asesorarte. Comprueba que tenga el que vas a usar.</p>
          <dl className="space-y-3 text-muted-foreground">
            {SERVICIO_INFO.map(([s, d]) => (
              <div key={s}><dt className="font-semibold text-foreground">{s}</dt><dd>{d}</dd></div>
            ))}
          </dl>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold mb-3">Cómo usar esta lista</h2>
          <ol className="list-decimal space-y-2 pl-5 text-muted-foreground">
            <li><strong className="text-foreground">Busca la empresa, no solo la marca.</strong> La lista usa el nombre legal, que suele aparecer en el aviso legal de la web o de la app.</li>
            <li><strong className="text-foreground">Mira el servicio y la fecha.</strong> Comprueba que la empresa puede prestar lo que vas a contratar.</li>
            <li><strong className="text-foreground">Confírmalo en la fuente oficial.</strong> Consulta el <a href={REGISTRO_CNMV} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">registro de la CNMV</a> y, si es extranjera, el de <a href={REGISTRO_ESMA} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">ESMA</a>.</li>
            <li><strong className="text-foreground">Revisa las advertencias.</strong> Busca el nombre en la <a href={ADVERTENCIAS_CNMV} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">lista de advertencias de la CNMV</a>.</li>
          </ol>
          <p className="mt-4 text-muted-foreground">
            Te lo explicamos con más detalle en la{' '}
            <Link href="/aprende/exchange-autorizado-cnmv" className="text-primary underline underline-offset-2">guía para comprobar si un exchange está autorizado</Link>
            . Si buscas dónde comprar, compara comisiones y servicios en el{' '}
            <Link href="/comparador-exchanges" className="text-primary underline underline-offset-2">comparador de exchanges</Link>
            , y si quieres entender la norma, lee{' '}
            <Link href="/aprende/mica-regulacion-cripto-espana" className="text-primary underline underline-offset-2">qué cambia MiCA en España</Link>.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold mb-3">De dónde salen los datos</h2>
          <p className="text-muted-foreground">
            Copiamos la «Relación de proveedores de servicios de criptoactivos» de la CNMV, sin añadir valoraciones. Hemos unificado erratas de escritura en países y
            servicios. Cuando el PDF no indica un dato, lo decimos en lugar de suponerlo. Las marcas enlazadas al comparador las añadimos nosotros.
          </p>
          <ul className="mt-3 space-y-1 text-sm">
            {[['PDF de la relación de proveedores (CNMV)', url], ['Registro de proveedores de servicios de criptoactivos (CNMV)', REGISTRO_CNMV], ['¿Está regulada la entidad? (ESMA)', REGISTRO_ESMA]].map(([t, u]) => (
              <li key={u}>
                <a href={u} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-1 text-muted-foreground hover:text-primary">
                  <ExternalLink className="mt-1 h-3 w-3 shrink-0" />{t}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
