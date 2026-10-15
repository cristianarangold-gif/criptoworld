# CriptoMundo: resumen semanal y boletín — diseño

Fecha: 2026-10-15. Aprobado en conversación por el propietario (Cristian Arango).

## 1. Objetivo
- Un **resumen semanal** en la web que reúna las noticias de la semana y lo que significan para quien vive en España.
- Un **boletín por email** con ese resumen, con suscripción conforme al RGPD.
- Nada se publica ni se envía sin la revisión del propietario.

## 2. Decisiones del propietario
- **Proveedor de email: Brevo**, plan gratuito: empresa francesa, datos en la UE, 300 emails/día y doble confirmación. MailerLite se descarta porque su RSS a email es de pago y su plan gratuito bajó a 250 suscriptores.
- **Envío manual:** el propietario revisa el borrador en Brevo y pulsa «Enviar».
- **Día:** lunes por la mañana, con la semana anterior de lunes a domingo.

## 3. Resumen semanal (PR A)
### Contenido
- Cada resumen es `content/resumenes/<AAAA>-semana-<NN>.md` (semana ISO, por ejemplo `2026-semana-43`). Metadatos:
  - `titulo`;
  - `descripcion` (máximo 160 caracteres);
  - `inicio` y `fin` (lunes y domingo de la semana);
  - `publicado` (AAAA-MM-DD);
  - `fuentes`: al menos una, `https://`.
- **Cuerpo** con las secciones exactas:
  - `## Las noticias de la semana`: cada noticia publicada esa semana con 2–3 líneas y su enlace a `/noticias/<slug>`;
  - `## Lo que importa si vives en España`;
  - `## El mercado en siete días`: cambio de BTC y ETH entre el lunes y el domingo, con su fuente y el momento, sin predicciones;
  - `## Próximas fechas`: 2–4 fechas del calendario, enlazadas a `/calendario`;
  - `## Para aprender esta semana`: una lección, guía, respuesta o ficha, con el motivo.
- 400 palabras o más. Misma guía que las noticias: sin predicciones, sin recomendaciones, sin copiar párrafos y cifras con fuente.
- Si una semana no hubo noticias publicadas, la primera sección lo dice y resume lo más relevante con fuentes externas. La rutina no inventa.

### Validación (`npm test`)
- Formato del slug y `inicio` en lunes con `fin = inicio + 6`.
- Fechas válidas y no futuras.
- Secciones exactas.
- 400 palabras o más.
- Fuentes `https://` y enlaces internos existentes.
- Slugs únicos.

### Páginas
- **`/resumen-semanal`:** índice paginado como `/noticias`, con introducción y `noindex` si está vacío.
- **`/resumen-semanal/<slug>`:** fecha, autor, cuerpo, fuentes y JSON-LD `NewsArticle`.
- **Enlaces:** desde `/noticias` («Resúmenes semanales»), la portada (el último resumen, si existe), el pie, el buscador y el sitemap.

### RSS
**`/feed.xml`** (RSS 2.0) con las 20 últimas publicaciones entre noticias y resúmenes: título, enlace, `guid`, `pubDate` y descripción. Con `<link rel="alternate" type="application/rss+xml">` en el layout.

### Rutina semanal
- Rutina en la nube, **los lunes a las 07:00 de Madrid**, con instrucciones en `docs/rutina-resumen.md`.
- **Pasos:**
  1. lee las noticias de `content/noticias/` con fecha de la semana anterior y el calendario;
  2. obtiene el cambio semanal de BTC y ETH de una fuente citable;
  3. redacta;
  4. ejecuta `npm test`;
  5. abre un PR «Resumen semanal: semana NN»;
  6. avisa al móvil.
- Prohibido fusionar o tocar `main`.

## 4. Boletín (PR B, se activa tras la configuración del propietario)
### Suscripción
- **Formulario `NewsletterForm`** (cliente):
  - un campo email;
  - una casilla **no marcada**: «He leído y acepto la [política de privacidad](/privacidad)»;
  - un campo trampa oculto para bots;
  - un botón.
- **Mensajes:**
  - «Te hemos enviado un email para confirmar» si todo va bien;
  - el error, en caso contrario.
- **Dónde aparece:** `/resumen-semanal`, el final de cada noticia y la portada.
- **`POST /api/newsletter`:**
  1. valida el email y la aceptación;
  2. si el campo trampa tiene contenido, responde 200 sin hacer nada;
  3. llama a Brevo `POST /v3/contacts/doubleOptinConfirmation` con `includeListIds: [BREVO_LIST_ID]`, `templateId: BREVO_DOI_TEMPLATE_ID` y `redirectionUrl: https://criptoworld.org/boletin/confirmado`;
  4. guarda la fecha y el origen de la aceptación como atributos (`CONSENT_DATE`, `CONSENT_SOURCE`).
- **Si faltan las variables de entorno:** responde 503 y el formulario no se muestra.
- **Límite básico por IP:** 5 peticiones cada 10 minutos, en memoria.
- **Páginas `/boletin`** (qué recibes, frecuencia, cómo darte de baja y el formulario) y **`/boletin/confirmado`** (`noindex`).

### Borradores en Brevo
- Workflow de GitHub `boletin-borrador.yml` al hacer push a `main` con cambios en `content/resumenes/**`.
- Ejecuta `node --import tsx scripts/boletin-borrador.ts <archivo>`, que convierte el resumen en HTML de email y llama a `POST /v3/emailCampaigns`:
  - asunto = `titulo`;
  - remitente: `CriptoMundo <contacto@criptoworld.org>`;
  - `recipients.listIds: [BREVO_LIST_ID]`.
- La campaña queda en **borrador**. Nunca se llama a `sendNow`.
- El HTML incluye un enlace a la versión web y el pie con la baja (`{{ unsubscribe }}`).
- La conversión Markdown → HTML de email es una función pura con pruebas.

### Privacidad
Se actualiza `/privacidad` con una sección «Boletín»:
- finalidad;
- base jurídica: el consentimiento (art. 6.1.a RGPD);
- datos: el email y la fecha de alta;
- encargado: Brevo (Sendinblue SAS, Francia; datos en la UE);
- conservación hasta la baja;
- métricas de apertura y clics de Brevo;
- derechos y retirada del consentimiento en cualquier momento.

## 5. Configuración que hace el propietario (con instrucciones)
1. Crear la cuenta gratuita de Brevo, verificar `contacto@criptoworld.org` como remitente, crear la lista «Boletín CriptoMundo» y la plantilla de doble opt-in en español.
2. Autenticar el dominio en Brevo (registros DNS en el panel de Abacus).
3. Crear una clave API y guardarla:
   - en **Vercel**, `BREVO_API_KEY`, `BREVO_LIST_ID` y `BREVO_DOI_TEMPLATE_ID`;
   - en **GitHub Secrets**, `BREVO_API_KEY` y `BREVO_LIST_ID`.

   El agente no ve ni escribe la clave.

## 6. Comprobaciones
- **PR A:**
  - validación del resumen con un ejemplo de pruebas;
  - páginas;
  - RSS válido;
  - la rutina se lanza a mano tras fusionar.
- **PR B:**
  - pruebas de la API con Brevo simulado: validación, campo trampa, 503 sin configurar, límite de peticiones;
  - pruebas del HTML del email;
  - en local, el formulario con teclado y sin scroll horizontal a 375 px;
  - tras la configuración, una suscripción real del propietario y un borrador real.
