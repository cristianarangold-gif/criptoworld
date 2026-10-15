# Resumen semanal y boletín — plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Resumen semanal en la web (rutina de los lunes con PR) y boletín por Brevo con doble confirmación y borradores que envía el propietario.

**Architecture:**
- Resúmenes en `content/resumenes/*.md` (mismo patrón que las noticias, con `lib/digests.ts`).
- RSS por route handler.
- Formulario y `/api/newsletter` con una capa pura de validación más una llamada a Brevo inyectable para las pruebas.
- Workflow de GitHub con un script que crea el borrador.

**Tech Stack:** Next.js 16 App Router, TypeScript, node:test + tsx, GitHub Actions, Brevo API v3.

**Spec:** `docs/superpowers/specs/2026-10-15-resumen-boletin-design.md`

## Global Constraints
- Sin dependencias nuevas (Brevo por `fetch`).
- La clave de Brevo solo en variables de entorno (Vercel) y GitHub Secrets; nunca en el repositorio ni en los registros.
- Nunca enviar campañas: solo crear borradores.
- Casilla de consentimiento no marcada; doble confirmación obligatoria.
- Resumen ≥ 400 palabras con secciones exactas; rutina sin permiso para fusionar.

## Review Focus
1. `/api/newsletter` sin variables de entorno → 503 y formulario oculto, nunca un 500 con traza.
2. Email con mayúsculas o espacios → se normaliza; email no válido → 400 sin llamar a Brevo.
3. Brevo responde con error (por ejemplo, contacto ya existente) → mensaje claro al usuario, sin filtrar detalles de la API.
4. Semana ISO en cambio de año (semana 1 que empieza en diciembre) → el slug y las fechas cuadran.
5. RSS con caracteres especiales (`&`, `<`, tildes) → XML válido.

---

## PR A — Resumen semanal

### Task 1: `lib/digests.ts` y validación
**Files:** Create `lib/digests.ts`, `tests/digests.test.ts`, `tests/fixtures/resumenes/2026-semana-42.md`, `content/resumenes/.gitkeep`; Modify `lib/known-paths.ts` (añade `/resumen-semanal/<slug>`) y `lib/internal-links.ts` (`/resumen-semanal`)
**Interfaces:** `Digest`, `DIGEST_SECTIONS`, `isoWeek(date): { year, week }`, `weekRange(year, week): { inicio, fin }`, `loadDigests(dir?)`, `getAllDigests()`, `getDigest(slug)`, `validateDigests(items, known, today)`.
- [ ] Pruebas:
  - `isoWeek('2026-10-12')` = 2026-S42 y `weekRange(2026, 42)` = 12-10 a 18-10;
  - cambio de año: `isoWeek('2026-12-28')` = 2026-S53 y `isoWeek('2027-01-04')` = 2027-S1;
  - la fixture es válida;
  - errores de slug, inicio no lunes, fin ≠ inicio + 6, fecha futura, sección ausente, 399 palabras, fuente `http`, enlace roto y slug repetido;
  - prueba real sobre `getAllDigests()`.
- [ ] FAIL → implementar → PASS → commit `Resumen semanal: contenido y validación`.

### Task 2: Páginas, RSS y enlaces
**Files:** Create `app/resumen-semanal/page.tsx`, `app/resumen-semanal/[slug]/page.tsx`, `app/feed.xml/route.ts`, `lib/feed.ts`, `tests/feed.test.ts`; Modify `app/layout.tsx` (enlace RSS), `app/noticias/page.tsx`, `app/page.tsx`, `components/footer.tsx`, `app/api/search/route.ts` y `app/sitemap.ts`
**Interfaces:** `toRss(items: { title, url, date, description }[], channel): string`.
- [ ] Pruebas de `toRss`: XML con `<rss version="2.0">`, escape de `&` `<` `"`, `pubDate` en RFC 822 y un máximo de 20 elementos.
- [ ] FAIL → implementar las páginas (con `paginate` de `lib/news.ts`) y el RSS → `npm test`, `npm run build` → en local:
  - páginas con la fixture copiada solo a `cw-run`;
  - `/feed.xml` válido;
  - enlaces internos sin errores;
  - 375 px sin scroll horizontal.
- [ ] Commit `Páginas del resumen semanal y feed RSS`.

### Task 3: Guía de la rutina y PR A
**Files:** Create `docs/rutina-resumen.md`; Modify `content/GUIA_NOTICIAS.md` (apartado del resumen semanal)
- [ ] Escribir los pasos del apartado 3 del spec (comandos exactos, rama `resumen/<slug>`, prohibiciones).
- [ ] `npm test` → commit `Guía y rutina del resumen semanal`; push; PR A. Tras la fusión: crear la rutina de los lunes (RemoteTrigger) y lanzarla a mano.

## PR B — Boletín

### Task 4: API de suscripción
**Files:** Create `lib/newsletter.ts`, `app/api/newsletter/route.ts`, `tests/newsletter.test.ts`
**Interfaces:**
- `parseSignup(body): { ok: true, email } | { ok: false, status, error }`;
- `subscribe(email, deps: { fetch, env, now })`;
- `rateLimit(ip, now)`.
- [ ] Pruebas:
  - email normalizado;
  - sin consentimiento → 400;
  - campo trampa → `ok` sin llamada;
  - variables de entorno ausentes → 503;
  - llamada a Brevo con el endpoint DOI, `includeListIds`, `templateId`, `redirectionUrl` y los atributos de consentimiento (con `fetch` simulado);
  - error de Brevo → mensaje genérico;
  - límite de 5 peticiones por IP cada 10 minutos.
- [ ] FAIL → implementar → PASS → commit `Boletín: API de suscripción con doble confirmación`.

### Task 5: Formulario, páginas del boletín y privacidad
**Files:** Create `components/newsletter-form.tsx`, `app/boletin/page.tsx`, `app/boletin/confirmado/page.tsx`; Modify `app/privacidad/page.tsx`, `app/resumen-semanal/page.tsx`, `app/noticias/[slug]/page.tsx`, `app/page.tsx` y el pie
- [ ] El formulario solo se muestra si `newsletterEnabled()` (las variables existen en el servidor).
- [ ] La sección de privacidad sigue el apartado 4 del spec.
- [ ] `npm test` y build; en local sin variables, el formulario no aparece y `/boletin` explica que estará disponible pronto. Con variables falsas y Brevo simulado: envío, mensajes, teclado y 375 px.
- [ ] Commit `Boletín: formulario, páginas y política de privacidad`.

### Task 6: Borrador en Brevo y PR B
**Files:** Create `lib/email-html.ts`, `scripts/boletin-borrador.ts`, `.github/workflows/boletin-borrador.yml`, `tests/email-html.test.ts`
**Interfaces:**
- `digestToEmailHtml(digest, siteUrl): string`;
- `createDraft(digest, deps)`, que llama a `POST /v3/emailCampaigns` sin `sendNow`.
- [ ] Pruebas:
  - el HTML contiene el título, las secciones, los enlaces absolutos a criptoworld.org, la versión web y `{{ unsubscribe }}`;
  - escapa el HTML;
  - `createDraft` envía el asunto, el remitente, `listIds` y `htmlContent`, y nunca llama a `sendNow`.
- [ ] FAIL → implementar → PASS. El workflow se activa con `push` a `main` y `paths: content/resumenes/**`, procesa solo los archivos añadidos y usa los secrets. Sin secrets, termina con un aviso y sin error.
- [ ] Commit `Boletín: borrador automático en Brevo`; push; PR B, con las instrucciones de configuración para el propietario.
