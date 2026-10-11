import { getDictionary } from '@/lib/i18n/get-dictionary';
import { isValidLocale, type Locale } from '@/lib/i18n/config';
import { notFound } from 'next/navigation';
import { Cookie } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = await getDictionary(locale as Locale);
  return { title: dict?.legal?.cookies ?? 'Cookie Policy' };
}

export default async function CookiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const isEs = locale === 'es';

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 lg:px-6">
      <div className="mb-8 flex items-center gap-3">
        <Cookie className="h-6 w-6 text-primary" />
        <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">
          {isEs ? 'Política de Cookies' : 'Cookie Policy'}
        </h1>
      </div>
      <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground">
        <p>{isEs ? 'Última actualización: Septiembre 2026' : 'Last updated: September 2026'}</p>
        <h2>{isEs ? '1. Qué son las Cookies' : '1. What are Cookies'}</h2>
        <p>{isEs ? 'Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. Se utilizan ampliamente para hacer que los sitios web funcionen de manera más eficiente.' : 'Cookies are small text files stored on your device when you visit a website. They are widely used to make websites work more efficiently.'}</p>
        <h2>{isEs ? '2. Cookies que Utilizamos' : '2. Cookies We Use'}</h2>
        <p>{isEs ? 'Cookies esenciales: necesarias para el funcionamiento básico del sitio (preferencia de tema, idioma, consentimiento de cookies). No recopilamos cookies de seguimiento ni publicitarias.' : 'Essential cookies: necessary for basic site operation (theme preference, language, cookie consent). We do not use tracking or advertising cookies.'}</p>
        <h2>{isEs ? '3. Control de Cookies' : '3. Cookie Control'}</h2>
        <p>{isEs ? 'Puedes controlar y eliminar cookies a través de la configuración de tu navegador. Ten en cuenta que desactivar cookies puede afectar la funcionalidad del sitio.' : 'You can control and delete cookies through your browser settings. Note that disabling cookies may affect site functionality.'}</p>
      </div>
    </div>
  );
}
