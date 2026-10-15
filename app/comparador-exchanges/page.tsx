import { Metadata } from 'next'
import Link from 'next/link'
import { CalendarDays, ExternalLink, Scale, ShieldCheck } from 'lucide-react'
import { getExchanges, matchesFilters, FILTROS, type Plataforma } from '@/lib/exchanges'
import cnmv from '@/data/cnmv-psc.json'
import { formatDate } from '@/lib/guides'
import { ExchangeFilter } from '@/components/exchange-filter'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Comparador de exchanges autorizados en España: comisiones y servicios',
  description: 'Compara 12 plataformas para comprar criptomonedas autorizadas en España bajo MiCA: comisiones, Bizum o tarjeta, retirada a tu wallet, staking e informe fiscal. Sin afiliados.',
  alternates: { canonical: '/comparador-exchanges' },
}

const yesNo = (v: boolean | null) => (v === true ? 'Sí' : v === false ? 'No' : 'Sin confirmar')
const PAGO_LABEL: Record<string, string> = { sepa: 'Transferencia SEPA', bizum: 'Bizum', tarjeta: 'Tarjeta' }
const tipoLabel = (p: Plataforma) => (p.tipo === 'espanola' ? 'Española (CNMV)' : `Pasaporte europeo (${p.pais})`)
const flags = (p: Plataforma) => FILTROS.map(f => f.id).filter(id => matchesFilters(p, [id])).join(' ')

function Detalle({ p }: { p: Plataforma }) {
  const rows: [string, (typeof p.comisiones)[keyof typeof p.comisiones]][] = [
    ['Compra rápida (app)', p.comisiones.compra_rapida],
    ['Mercado avanzado (taker)', p.comisiones.mercado_taker],
    ['Depósito de euros', p.comisiones.deposito_eur],
    ['Retirada de euros', p.comisiones.retirada_eur],
  ]
  return (
    <details className="mt-3 rounded-lg border border-border/40 p-3 text-sm">
      <summary className="cursor-pointer font-medium text-primary">Detalle, fuentes y qué vigilar</summary>
      <dl className="mt-3 space-y-2">
        <div><dt className="text-xs text-muted-foreground">Entidad en la CNMV</dt><dd>{p.entidad} · {tipoLabel(p)} · desde el {formatDate(p.desde)}</dd></div>
        <div><dt className="text-xs text-muted-foreground">Servicios MiCA autorizados</dt><dd>{p.servicios.join(', ')}</dd></div>
        {rows.map(([label, c]) => (
          <div key={label}>
            <dt className="text-xs text-muted-foreground">{label}</dt>
            <dd>
              {c.valor}{' '}
              <a href={c.fuente} target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground underline underline-offset-2 hover:text-primary">
                (fuente, {formatDate(c.comprobado)})
              </a>
            </dd>
          </div>
        ))}
        <div><dt className="text-xs text-muted-foreground">Staking · Informe fiscal</dt><dd>{yesNo(p.staking)} · {yesNo(p.informe_fiscal)}</dd></div>
        <div><dt className="text-xs text-muted-foreground">Destaca</dt><dd>{p.destaca}</dd></div>
        <div><dt className="text-xs text-muted-foreground">Ojo con</dt><dd>{p.ojo}</dd></div>
        <div>
          <dt className="text-xs text-muted-foreground">Fuentes</dt>
          <dd>
            <ul className="space-y-1">
              {p.fuentes.map(f => (
                <li key={f.url}>
                  <a href={f.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-1 text-muted-foreground hover:text-primary">
                    <ExternalLink className="h-3 w-3 mt-1 shrink-0" />{f.title}
                  </a>
                </li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>
    </details>
  )
}

export default function ComparadorPage() {
  const { revisado, plataformas } = getExchanges()
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Exchanges autorizados en España comparados por CriptoMundo',
      itemListOrder: 'https://schema.org/ItemListOrderAscending',
      numberOfItems: plataformas.length,
      itemListElement: plataformas.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.nombre, url: p.web })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE.url },
        { '@type': 'ListItem', position: 2, name: 'Comparador de exchanges', item: `${SITE.url}/comparador-exchanges` },
      ],
    },
  ]

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-3xl">
        <div className="flex items-center gap-3 mb-3">
          <Scale className="h-7 w-7 text-primary" />
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">Comparador de exchanges autorizados en España</h1>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          Doce plataformas para comprar criptomonedas que, según la CNMV, pueden operar en España bajo el reglamento europeo
          MiCA. Para cada una comparamos lo que más afecta a tu bolsillo y a tu seguridad: cuánto cuesta comprar, cómo puedes
          ingresar el dinero, si puedes sacar tus criptos a una wallet propia y si te ayuda con la declaración de la Renta.
        </p>
        <div className="mt-5 flex items-start gap-3 rounded-xl border border-primary/30 bg-primary/5 p-4 text-sm">
          <ShieldCheck className="h-5 w-5 shrink-0 text-primary" />
          <p>
            <strong className="text-foreground">No cobramos de ninguna plataforma.</strong> No hay enlaces de afiliado ni
            clasificación: el orden es alfabético. Cada dato tiene su fuente y la fecha en que lo comprobamos.
          </p>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          <CalendarDays className="mr-1.5 inline h-3.5 w-3.5 align-[-2px]" />
          Datos revisados el <time dateTime={revisado}>{formatDate(revisado)}</time> por{' '}
          <Link href="/sobre-nosotros" className="text-foreground hover:text-primary">{SITE.owner}</Link>. Lista de la CNMV del{' '}
          {formatDate(cnmv.fecha)}.
        </p>
      </div>

      <div className="mt-8">
        <ExchangeFilter options={FILTROS} total={plataformas.length} />
      </div>

      {/* Escritorio: tabla. Móvil y tableta: tarjetas. Ambas se generan en el servidor. */}
      <div className="mt-6 hidden lg:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50 text-left text-xs text-muted-foreground">
              <th className="py-2 pr-3 font-medium">Plataforma</th>
              <th className="py-2 pr-3 font-medium">Compra rápida</th>
              <th className="py-2 pr-3 font-medium">Mercado avanzado</th>
              <th className="py-2 pr-3 font-medium">Pagos</th>
              <th className="py-2 pr-3 font-medium">Wallet propia</th>
              <th className="py-2 font-medium">En español</th>
            </tr>
          </thead>
          {plataformas.map(p => (
            <tbody key={p.slug} data-exchange={p.slug} data-flags={flags(p)} className="border-b border-border/30 align-top">
              <tr>
                <td className="py-3 pr-3">
                  <a href={p.web} target="_blank" rel="noopener noreferrer" className="font-semibold text-foreground hover:text-primary">{p.nombre}</a>
                  <span className="block text-xs text-muted-foreground">{tipoLabel(p)}</span>
                </td>
                <td className="py-3 pr-3">{p.comisiones.compra_rapida.valor}</td>
                <td className="py-3 pr-3">{p.comisiones.mercado_taker.valor}</td>
                <td className="py-3 pr-3">{p.pagos.map(x => PAGO_LABEL[x]).join(', ')}</td>
                <td className="py-3 pr-3">{yesNo(p.retirada_wallet)}</td>
                <td className="py-3">{yesNo(p.espanol)}</td>
              </tr>
              <tr>
                <td colSpan={6} className="pb-3"><Detalle p={p} /></td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:hidden">
        {plataformas.map(p => (
          <li key={p.slug} data-exchange={p.slug} data-flags={flags(p)} className="glass-card rounded-xl p-4">
            <a href={p.web} target="_blank" rel="noopener noreferrer" className="font-display text-lg font-bold text-foreground hover:text-primary">{p.nombre}</a>
            <p className="text-xs text-muted-foreground">{tipoLabel(p)}</p>
            <dl className="mt-3 space-y-2 text-sm">
              <div><dt className="text-xs text-muted-foreground">Compra rápida</dt><dd>{p.comisiones.compra_rapida.valor}</dd></div>
              <div><dt className="text-xs text-muted-foreground">Mercado avanzado</dt><dd>{p.comisiones.mercado_taker.valor}</dd></div>
              <div><dt className="text-xs text-muted-foreground">Pagos</dt><dd>{p.pagos.map(x => PAGO_LABEL[x]).join(', ')}</dd></div>
              <div className="flex gap-6">
                <div><dt className="text-xs text-muted-foreground">Wallet propia</dt><dd>{yesNo(p.retirada_wallet)}</dd></div>
                <div><dt className="text-xs text-muted-foreground">En español</dt><dd>{yesNo(p.espanol)}</dd></div>
              </div>
            </dl>
            <Detalle p={p} />
          </li>
        ))}
      </ul>

      <div className="mt-12 max-w-3xl space-y-10 leading-relaxed">
        <section>
          <h2 className="font-display text-2xl font-bold mb-3">Cómo hemos elegido y comparado</h2>
          <div className="space-y-3 text-muted-foreground">
            <p>
              Hemos incluido las plataformas más usadas por particulares en España que aparecen en la «Relación de proveedores
              de servicios de criptoactivos» de la CNMV. Desde el 1 de julio de 2026 solo pueden ofrecer servicios en España las
              empresas de esa lista: las españolas, autorizadas por la propia CNMV, y las de otros países de la UE que operan
              aquí con el llamado pasaporte europeo. Que una plataforma no esté en este comparador no significa que no esté
              autorizada; puedes comprobar cualquiera en el registro, como explicamos en la{' '}
              <Link href="/aprende/exchange-autorizado-cnmv" className="text-primary underline underline-offset-2">guía para comprobar si un exchange está autorizado</Link>.
            </p>
            <p>
              Los datos regulatorios (entidad, país, fecha y servicios autorizados) salen de la lista oficial de la CNMV. Las
              comisiones y servicios, de la página de tarifas o del centro de ayuda de cada plataforma, y cada uno lleva enlazada
              su fuente con la fecha en que lo comprobamos. Cuando una plataforma no publica un dato con claridad, o sus propias
              páginas se contradicen, lo indicamos así en lugar de estimarlo: «No publicada con claridad» o «Sin confirmar».
            </p>
            <p>
              Las comisiones cambian a menudo y pueden depender de tu nivel, de tu volumen o del método de pago. Úsalo como
              punto de partida y comprueba siempre la tarifa en la pantalla de confirmación antes de operar. Revisamos estos
              datos cada tres meses y en cuanto una noticia afecta a alguna plataforma.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold mb-3">Qué significa cada comisión</h2>
          <div className="space-y-3 text-muted-foreground">
            <p>
              <strong className="text-foreground">Compra rápida.</strong> Es lo que pagas al comprar desde la app con un botón,
              sin elegir precio. Puede ser un porcentaje claro (por ejemplo, un 1 %) o ir escondida en el precio como un
              <em> diferencial</em>: la plataforma te vende un poco más caro que el precio de mercado. El diferencial es difícil de
              comparar porque cambia según el momento y la moneda, así que mira siempre el desglose antes de confirmar.
            </p>
            <p>
              <strong className="text-foreground">Mercado avanzado.</strong> Muchas plataformas tienen una segunda pantalla
              (Kraken Pro, Bit2Me Pro, Revolut X…) con un libro de órdenes, donde las comisiones son mucho más bajas. Ahí se
              distingue entre <em>maker</em> (pones una orden que espera a otra) y <em>taker</em> (compras al precio que hay
              en ese momento). Para una compra normal pagarás la tarifa taker, por eso es la que mostramos.
            </p>
            <p>
              <strong className="text-foreground">Depósitos y retiradas.</strong> Ingresar euros por transferencia SEPA suele
              ser gratis; con tarjeta, Apple Pay o Google Pay es habitual pagar entre un 1 % y un 4 %. Algunas plataformas cobran
              también por sacar los euros a tu banco. Si quieres calcular cuánto te cuesta una operación concreta, usa la{' '}
              <Link href="/herramientas/calculadora-comisiones" className="text-primary underline underline-offset-2">calculadora de comisiones</Link>.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold mb-3">Cómo elegir según tu caso</h2>
          <div className="space-y-4 text-muted-foreground">
            <div>
              <h3 className="font-semibold text-foreground">Vas a comprar una cantidad pequeña cada mes</h3>
              <p>
                Lo que más pesa es la comisión de cada compra y que puedas programar compras periódicas. Ingresa el dinero por
                transferencia (no con tarjeta) y compara la compra rápida con el mercado avanzado: en compras de 50 o 100 €, la
                diferencia entre un 1 % y un 0,25 % es pequeña cada mes, pero se acumula con los años. Una comisión fija por
                operación, como la de 1 € de Trade Republic, sale cara en compras muy pequeñas y barata en compras grandes. La
                estrategia está explicada en la <Link href="/aprende/estrategia-dca" className="text-primary underline underline-offset-2">guía de DCA</Link>.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Vas a operar a menudo</h3>
              <p>
                Busca un mercado avanzado con comisión taker baja y descuentos por volumen. Ten en cuenta que operar mucho
                multiplica también las operaciones que tendrás que declarar, porque cada venta o cambio entre criptos tributa:
                lo explicamos en <Link href="/respuestas/cambiar-cripto-por-otra-tributa" className="text-primary underline underline-offset-2">¿Cambiar una cripto por otra tributa?</Link>.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Quieres guardar tus criptos en tu propia wallet</h3>
              <p>
                Comprueba que la plataforma permite retirar a direcciones externas y cuánto cobra por ello. Algunas apps de
                inversión no permiten sacar las criptos, o solo a su propia wallet. Antes de mover cantidades importantes,
                aprende a custodiar la frase semilla con la <Link href="/aprende/seguridad-cripto" className="text-primary underline underline-offset-2">guía de seguridad</Link>.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Prefieres hacerlo todo desde tu banco o tu app de siempre</h3>
              <p>
                Revolut y Trade Republic permiten comprar criptos con el saldo de su cuenta, y varios bancos españoles (como
                BBVA, CaixaBank o Renta 4) figuran también en la lista de la CNMV. Es cómodo, pero suele tener menos monedas y,
                a veces, más limitaciones para sacar las criptos.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Te preocupa la Renta</h3>
              <p>
                Un informe fiscal descargable ahorra mucho trabajo, sobre todo si solo usas una plataforma. Aun así, la
                responsabilidad de declarar es tuya, y si usas varias plataformas tendrás que juntar los datos aplicando el
                método FIFO: <Link href="/respuestas/calcular-ganancia-fifo" className="text-primary underline underline-offset-2">¿Cómo se calcula la ganancia?</Link>.
                Si las criptos están en una plataforma extranjera y superan 50.000 € a 31 de diciembre, tendrás que presentar el{' '}
                <Link href="/respuestas/cuando-presentar-modelo-721" className="text-primary underline underline-offset-2">modelo 721</Link>.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold mb-3">Lo que la autorización no garantiza</h2>
          <div className="space-y-3 text-muted-foreground">
            <p>
              La autorización MiCA obliga a las plataformas a cumplir requisitos de capital, a separar tus fondos de los suyos y
              a informarte de los riesgos. Pero no te protege de las caídas de precio, y las criptomonedas no están cubiertas
              por el Fondo de Garantía de Depósitos. Tampoco te protege de las estafas que suplantan a plataformas reales: entra
              siempre desde la web o la app oficial, activa la verificación en dos pasos y desconfía de cualquiera que te
              contacte en nombre de la plataforma. Si una oferta te hace dudar, pásala por el{' '}
              <Link href="/herramientas/test-estafa" className="text-primary underline underline-offset-2">test «¿Es una estafa?»</Link>.
            </p>
            <p>
              Si quieres entender qué cambia con el reglamento europeo, lo tienes en la{' '}
              <Link href="/aprende/mica-regulacion-cripto-espana" className="text-primary underline underline-offset-2">guía de MiCA</Link> y en{' '}
              <Link href="/respuestas/exchanges-autorizados-mica-espana" className="text-primary underline underline-offset-2">¿Qué exchanges pueden operar en España con MiCA?</Link>.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold mb-3">Preguntas frecuentes</h2>
          <div className="space-y-4 text-muted-foreground">
            <div>
              <h3 className="font-semibold text-foreground">¿Cuál es el exchange más barato?</h3>
              <p>
                Depende de cómo compres. Para compras desde la app con un botón, las comisiones más bajas que hemos podido
                comprobar están en torno al 0,25 %; las más altas, alrededor del 1 % más el diferencial. En los mercados
                avanzados la comisión taker baja a menos del 0,1 % en algún caso. Pero la comisión no lo es todo: si pagas con
                tarjeta, puedes sumar entre un 1 % y un 4 % solo por el método de pago.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">¿Por qué no aparece Binance?</h3>
              <p>
                Porque no figura en la lista de proveedores autorizados de la CNMV que hemos usado, del{' '}
                {formatDate(cnmv.fecha)}. Según la información publicada, retiró su solicitud de autorización MiCA antes del fin
                del periodo transitorio y, desde julio de 2026, no puede ofrecer nuevas operaciones a clientes en España. Si
                tienes fondos allí, revisa los avisos de la plataforma sobre cómo retirarlos.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">¿Es seguro dejar las criptos en el exchange?</h3>
              <p>
                Con MiCA, las plataformas autorizadas deben custodiar tus criptos separadas de las suyas, lo que reduce el
                riesgo si la empresa quiebra. Aun así, dependes de su seguridad y de su solvencia. Para cantidades que no vas a
                mover en mucho tiempo, muchas personas prefieren una wallet propia, siempre que sepan custodiar la frase semilla.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">¿Qué pasa si una plataforma deja de estar autorizada?</h3>
              <p>
                No puede seguir ofreciendo servicios en España, pero normalmente debe permitirte retirar tus fondos. Por eso
                conviene no concentrar todo en una sola plataforma y comprobar de vez en cuando el registro de la CNMV. Si
                ocurre con alguna de las doce de este comparador, lo actualizaremos en cuanto lo sepamos.
              </p>
            </div>
          </div>
        </section>

        <p className="rounded-lg border border-border/50 p-4 text-xs text-muted-foreground">
          Información general con fines divulgativos; no es una recomendación de inversión ni de ninguna plataforma. Las
          comisiones pueden haber cambiado desde la fecha de revisión. ¿Has visto un dato desactualizado? Escríbeme a{' '}
          <a href={`mailto:${SITE.email}`} className="text-primary underline">{SITE.email}</a>.
        </p>
      </div>
    </div>
  )
}
