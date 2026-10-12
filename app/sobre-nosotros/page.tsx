import { Metadata } from 'next'
import Link from 'next/link'
import { Users } from 'lucide-react'
import { LegalPage } from '@/components/legal-page'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Quiénes somos',
  description: 'Quién está detrás de CriptoMundo, cómo se elaboran los contenidos y qué fuentes se usan.',
  alternates: { canonical: '/sobre-nosotros' },
}

const aboutJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'Quiénes somos — CriptoMundo',
  url: `${SITE.url}/sobre-nosotros`,
  mainEntity: {
    '@type': 'Person',
    name: SITE.owner,
    email: `mailto:${SITE.email}`,
  },
  publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url },
}

export default function SobreNosotrosPage() {
  return (
    <LegalPage
      icon={Users}
      title="Quiénes somos"
      intro="CriptoMundo es un proyecto divulgativo en español para entender las criptomonedas sin humo: qué son, cómo funcionan, qué riesgos tienen y qué dice la normativa española y europea."
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }} />

      <section>
        <h2>Quién está detrás</h2>
        <p>
          Me llamo <strong>{SITE.owner}</strong> y vivo en España. No soy economista, asesor financiero ni
          trabajo en el sector: soy alguien que está aprendiendo sobre criptomonedas y que decidió ordenar lo que
          aprende para que a otras personas les cueste menos. CriptoMundo nace de las preguntas que me hice al
          empezar: qué es exactamente una wallet, por qué una stablecoin puede perder su paridad, cómo se
          declaran las criptomonedas a Hacienda o cómo distinguir un proyecto serio de una estafa.
        </p>
        <p className="mt-3">
          Precisamente porque no soy un experto, mi regla es no pedirte que me creas a mí: cada explicación debe
          apoyarse en fuentes que puedas comprobar.
        </p>
      </section>

      <section>
        <h2>Cómo se elaboran los contenidos</h2>
        <ul>
          <li><strong>Fuentes primarias.</strong> Me baso en organismos oficiales (CNMV, Banco de España, Agencia Tributaria, Comisión Europea y la normativa MiCA), en la documentación técnica de cada proyecto (whitepapers y documentación oficial) y en medios especializados de referencia.</li>
          <li><strong>Herramientas de IA como apoyo.</strong> Uso asistentes de inteligencia artificial para ayudarme a redactar y revisar textos. Las cifras, fechas y normas se contrastan con las fuentes antes de publicar.</li>
          <li><strong>Correcciones abiertas.</strong> Si encuentras un error, escríbeme a <a href={`mailto:${SITE.email}`}>{SITE.email}</a> y lo corregiré.</li>
          <li><strong>Datos de mercado de terceros.</strong> Los precios vienen de CoinGecko y pueden tener retraso; no son una cotización para operar.</li>
        </ul>
      </section>

      <section>
        <h2>Lo que CriptoMundo no es</h2>
        <ul>
          <li>No es asesoramiento financiero, fiscal ni legal, ni una recomendación para comprar o vender ningún activo.</li>
          <li>No es un exchange ni una plataforma de inversión: aquí no se puede comprar ni custodiar criptomonedas.</li>
          <li>No promete rentabilidades. Las criptomonedas son activos de alto riesgo y puedes perder todo lo que inviertas.</li>
        </ul>
      </section>

      <section>
        <h2>Cómo se financia</h2>
        <p>
          La web se mantiene con publicidad de Google AdSense, que se muestra separada del contenido. Los
          anunciantes no deciden qué se publica. Si algún día hay contenido patrocinado o enlaces de afiliado, se
          indicará claramente en la propia página.
        </p>
      </section>

      <section>
        <h2>Contacto</h2>
        <p>
          Puedes escribirme a <a href={`mailto:${SITE.email}`}>{SITE.email}</a> o ver todas las opciones en la
          página de <Link href="/contacto">Contacto</Link>.
        </p>
      </section>
    </LegalPage>
  )
}
