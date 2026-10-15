# Noticias diarias y respuestas fiscales — plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Sección de noticias propias en Markdown (redactadas por una rutina diaria y aprobadas por PR) y 20 respuestas fiscales/legales con una página por pregunta.

**Architecture:** Igual que guías y herramientas: archivos en `content/` leídos por un `lib/*.ts` con gray-matter, páginas de servidor en `app/`, y validación en `npm test` (que ya bloquea el build). La rutina en la nube usa un script Node que reutiliza un parser RSS puro con pruebas.

**Tech Stack:** Next.js 16 App Router, TypeScript, gray-matter, node:test + tsx, Tailwind.

**Spec:** `docs/superpowers/specs/2026-10-15-noticias-y-respuestas-design.md`

## Global Constraints
- Sin dependencias nuevas.
- Textos en español de España; fechas visibles con `formatDate` de `lib/guides.ts`; autor `SITE.owner` con enlace a `/sobre-nosotros`.
- Noticias: `descripcion` ≤ 160 caracteres; cuerpo ≥ 400 palabras; secciones `## Qué ha pasado`, `## Qué significa para ti si vives en España`, `## Para entenderlo`.
- Respuestas: `corta` 25–70 palabras; cuerpo ≥ 300 palabras; categorías `hacienda` | `normativa` | `seguridad-herencias`; al menos una fuente de `agenciatributaria.gob.es`, `boe.es`, `cnmv.es`, `eur-lex.europa.eu`, `esma.europa.eu` o `hacienda.gob.es`.
- La rutina nunca fusiona ni hace push a `main`.
- `/noticias` con 0 noticias: `noindex`.
- Menú de 7 apartados en una línea a 1024 px; sin scroll horizontal a 375 y 820 px.

## Review Focus
1. Fechas de noticias como `Date` de gray-matter → deben salir AAAA-MM-DD (el bug «Invalid Date» ya pasó una vez).
2. Enlaces internos con ancla o barra final (`/glosario#gas`, `/aprende/x/`) → el validador debe aceptarlos si la página existe.
3. RSS con CDATA, entidades HTML y Atom sin `pubDate` → el parser no debe romper ni perder fechas.
4. Página `?pagina=` fuera de rango o no numérica → 404, no una página vacía indexable.
5. Directorio `content/noticias/` vacío (solo `.gitkeep`) → `lib/news` devuelve [] sin fallar y la portada oculta el bloque.

---

### Task 1: Validador de enlaces internos

**Files:**
- Create: `lib/internal-links.ts`
- Test: `tests/internal-links.test.ts`

**Interfaces:**
- Produces:
  - `extractInternalLinks(md: string): string[]`: rutas de enlaces Markdown `](/...)`, sin ancla ni barra final.
  - `knownPaths(extra?: string[]): Set<string>`: `/`, páginas estáticas del sitemap, `/academia/<slug>`, `/aprende/<slug>`, `/herramientas/<slug>`, `/glosario`, `/empieza-aqui`, `/noticias`, `/respuestas` y lo que llegue en `extra`.

- [ ] **Step 1:** Pruebas: `extractInternalLinks('[a](/glosario#gas) [b](https://x.com) [c](/aprende/estafas-cripto/)')` → `['/glosario', '/aprende/estafas-cripto']`; `knownPaths()` contiene `/academia/bitcoin`, `/aprende/estafas-cripto`, `/herramientas/test-estafa` y no `/aprende/no-existe`; `knownPaths(['/noticias/x']).has('/noticias/x')`.
- [ ] **Step 2:** `npm test` → FAIL (módulo no existe).
- [ ] **Step 3:** Implementar.
- [ ] **Step 4:** `npm test` → PASS.
- [ ] **Step 5:** Commit `Validador de enlaces internos`.

### Task 2: Contenido de noticias (`lib/news.ts`) y su validación

**Files:**
- Create: `lib/news.ts`, `content/noticias/.gitkeep`, `tests/fixtures/noticias/` (2 noticias de ejemplo válidas para pruebas), `tests/news.test.ts`

**Interfaces:**
- Consumes: `extractInternalLinks`, `knownPaths` (Task 1).
- Produces:
  - `interface NewsItem { slug; titulo; descripcion; fecha; fuentes: {title,url}[]; relacionados: {title,href}[]; body; words }`
  - `loadNews(dir?: string): NewsItem[]` (por defecto `content/noticias`; ordenadas por `fecha` desc y luego slug; fechas `Date` → AAAA-MM-DD; ignora archivos que no sean `.md`).
  - `getAllNews()`, `getNews(slug)`.
  - `validateNews(items: NewsItem[], known: Set<string>, today: string): string[]` (lista de errores con el slug).
  - `NEWS_SECTIONS` (las tres secciones obligatorias).

- [ ] **Step 1:** Pruebas:
  - `loadNews('tests/fixtures/noticias')` da 2 noticias, la más reciente primero, con `fecha` en formato AAAA-MM-DD aunque el YAML no lleve comillas;
  - `validateNews` sobre las fixtures da `[]`;
  - errores esperados (cada uno en un caso): descripción de 161 caracteres, fecha futura, sin fuentes, fuente `http://`, falta `## Para entenderlo`, 399 palabras, enlace `/aprende/no-existe`, slug repetido;
  - `validateNews(getAllNews(), knownPaths(...), hoy)` da `[]` (la prueba real que bloquea el build);
  - `loadNews` de un directorio vacío devuelve `[]`.
- [ ] **Step 2:** `npm test` → FAIL.
- [ ] **Step 3:** Implementar.
- [ ] **Step 4:** `npm test` → PASS.
- [ ] **Step 5:** Commit `Noticias en Markdown con validación`.

### Task 3: Páginas de noticias, borrado del RSS, menú, portada, buscador y sitemap

**Files:**
- Replace: `app/noticias/page.tsx` (listado paginado)
- Create: `app/noticias/[slug]/page.tsx`, `components/news-card.tsx`
- Delete: `components/noticias-client.tsx`, `app/api/news/route.ts`, `lib/rss.ts`
- Modify: `components/header.tsx` (NAV: «Noticias» con icono `Newspaper` después de «Empieza aquí»), `components/footer.tsx`, `app/page.tsx` (bloque «Últimas noticias», 3, oculto si no hay), `app/api/search/route.ts` (tipo `noticia`), `app/sitemap.ts` (`/noticias` y cada noticia con `lastModified`)
- Test: `tests/news-pages.test.ts`

**Interfaces:**
- Consumes: `getAllNews`, `getNews` (Task 2).
- Produces: `paginate<T>(items: T[], page: number, size = 12): { items: T[]; page: number; pages: number } | null` en `lib/news.ts` (null si `page` no es entero ≥1 o supera `pages`; con 0 elementos, la página 1 es válida y `pages` = 1).

- [ ] **Step 1:** Pruebas de `paginate`: 25 elementos → 3 páginas, la 3 tiene 1; página 4, 0, 1.5 y NaN → null; 0 elementos, página 1 → `{items: [], page: 1, pages: 1}`.
- [ ] **Step 2:** `npm test` → FAIL.
- [ ] **Step 3:** Implementar `paginate`, las páginas y los cambios:
  - `/noticias`: H1 «Noticias cripto», intro de 2–3 frases (qué cubrimos y que cada noticia cita sus fuentes y la revisa el autor), tarjetas, paginación con enlaces `?pagina=N`; `notFound()` si `paginate` da null; `robots: noindex` y texto de espera si no hay noticias; canonical `/noticias` (y `?pagina=N` cuando N>1).
  - `/noticias/<slug>`: H1, fecha + autor, `Markdown`, fuentes, relacionados, JSON-LD `NewsArticle`, aviso breve «Información general, no es asesoramiento financiero».
  - Para comprobar el aspecto en local, copiar temporalmente las fixtures a `content/noticias/` en la copia de `cw-run` (nunca en el repo).
- [ ] **Step 4:** `npm test`, `npx tsc --noEmit`, `npm run build` → PASS. En local: `/noticias` vacío (noindex en el HTML), con las fixtures (listado, página, paginación, `?pagina=9` → 404), menú en una línea a 1024 y 1280 px, sin scroll horizontal a 375 y 820 px, portada sin bloque con 0 noticias y con bloque con fixtures.
- [ ] **Step 5:** Commit `Sección de noticias propia en lugar del RSS`.

### Task 4: Script de candidatas

**Files:**
- Create: `lib/news-feed.ts`, `scripts/noticias-candidatas.mjs`, `data/fuentes-noticias.txt`
- Test: `tests/news-feed.test.ts`

**Interfaces:**
- Produces:
  - `parseSources(txt: string): { name: string; url: string; official: boolean }[]` (líneas `nombre | url | oficial|medio`; ignora vacías y `#`).
  - `parseFeed(xml: string, source: {name, official}): { title; url; published: Date | null; source: string; official: boolean }[]` (RSS `item` y Atom `entry`; CDATA y entidades decodificadas; Atom usa `published` o `updated`).
  - `selectCandidates(items, now: Date, hours = 26, limit = 15)`: sin fecha o fuera de ventana → fuera; sin URL repetida; oficiales primero y luego por fecha desc.
  - `toMarkdown(items, failures: string[]): string` ('' si no hay candidatas).
- El script (`.mjs`) importa la lógica con `tsx`: se ejecuta `npx tsx scripts/noticias-candidatas.mjs`. Descarga cada fuente con User-Agent propio y 15 s de timeout; una fuente caída va a `failures`.
- Fuentes iniciales: CoinDesk, Cointelegraph, The Block, Decrypt, CriptoNoticias (medio); ESMA, BCE, Comisión Europea (oficial), con las URL comprobadas el 2026-10-15 que figuran en el spec.

- [ ] **Step 1:** Pruebas con XML de ejemplo en línea: RSS con CDATA y `&amp;`, Atom con solo `updated`, ventana de 26 h, dedupe por URL, orden (oficial antigua antes que medio reciente), límite 15, `toMarkdown([], [])` = '', `parseSources` ignora comentarios.
- [ ] **Step 2:** `npm test` → FAIL.
- [ ] **Step 3:** Implementar; ejecutar el script de verdad y comprobar que lista candidatas.
- [ ] **Step 4:** `npm test` → PASS.
- [ ] **Step 5:** Commit `Script de noticias candidatas`.

### Task 5: Guía editorial, instrucciones de la rutina y PR A

**Files:**
- Create: `content/GUIA_NOTICIAS.md` (apartado 3.2 del spec, más la plantilla de frontmatter y un esqueleto con las tres secciones), `docs/rutina-noticias.md` (pasos 1–8 del apartado 3.4 del spec, con los comandos exactos: `npx tsx scripts/noticias-candidatas.mjs`, `npm ci`, `npm test`; rama `noticia/<slug>`; título «Noticia: <titular>»; prohibido fusionar o tocar `main`).
- Ninguna prueba nueva: la guía y la rutina se validan con `validateNews` (Task 2).

- [ ] **Step 1:** Escribir los dos documentos. Comprobar que `content/GUIA_NOTICIAS.md` no lo carga `lib/news.ts` (está fuera de `content/noticias/`).
- [ ] **Step 2:** `npm test` y `npm run build` → PASS.
- [ ] **Step 3:** Commit `Guía editorial y rutina de noticias`; push y abrir el PR A. Tras la fusión: crear la rutina (RemoteTrigger) con el propietario y lanzarla a mano.

### Task 6: Respuestas (`lib/answers.ts`), páginas y validación

**Files:**
- Create: `lib/answers.ts`, `app/respuestas/page.tsx`, `app/respuestas/[slug]/page.tsx`, `tests/answers.test.ts`, `tests/fixtures/respuestas/` (1 válida)
- Modify: `app/sitemap.ts`, `app/api/search/route.ts` (tipo `respuesta`), `components/footer.tsx`

**Interfaces:**
- Consumes: `extractInternalLinks`, `knownPaths` (Task 1).
- Produces:
  - `interface Answer { slug; pregunta; descripcion; categoria: 'hacienda'|'normativa'|'seguridad-herencias'; corta; updated; sources; related; body; words }`
  - `ANSWER_CATEGORIES` (id → título: «Hacienda», «Normativa», «Seguridad y herencias»), `loadAnswers(dir?)`, `getAllAnswers()`, `getAnswer(slug)`, `validateAnswers(items, known): string[]`, `OFFICIAL_DOMAINS`.

- [ ] **Step 1:** Pruebas: fixture válida → `[]`; errores para `corta` de 24 y de 71 palabras, categoría desconocida, sin fuente oficial (solo `cointelegraph.com`), 299 palabras, enlace roto, slug repetido; subdominios válidos (`sede.agenciatributaria.gob.es`); prueba real sobre `getAllAnswers()` → `[]`.
- [ ] **Step 2:** `npm test` → FAIL.
- [ ] **Step 3:** Implementar lib y páginas (spec 4.1: H1 pregunta, respuesta corta destacada, cuerpo, aviso «información general, no asesoramiento fiscal», fuentes, fecha, relacionados, JSON-LD `FAQPage`; índice agrupado por categoría con intro).
- [ ] **Step 4:** `npm test` → PASS.
- [ ] **Step 5:** Commit `Respuestas: páginas y validación`.

### Task 7: Las 20 respuestas

**Files:**
- Create: `content/respuestas/<slug>.md` × 20 (lista del apartado 4.2 del spec).
- Test: en `tests/answers.test.ts`, `getAllAnswers().length === 20` y 15/3/2 por categoría.

- [ ] **Step 1:** Prueba de recuento → FAIL.
- [ ] **Step 2:** Investigar cada respuesta en la fuente oficial (AEAT, BOE, consultas vinculantes de la DGT, CNMV, ESMA) y escribirla. Datos ya fijados en la web y que deben mantenerse coherentes: escala del ahorro 19/21/23/27/30 % (30 % desde 300.000 € por la Ley 7/2024); modelo 721 con más de 50.000 € a 31 de diciembre, del 1 de enero al 31 de marzo; fin del periodo transitorio MiCA en España el 2026-07-01; DAC8 pendiente de transposición. Donde la doctrina no sea clara, explicarlo sin dar una respuesta firme.
- [ ] **Step 3:** `npm test` → PASS.
- [ ] **Step 4:** Commit `20 respuestas fiscales y legales`.

### Task 8: Enlaces a las respuestas y PR B

**Files:**
- Modify: `content/ruta.json` (etapa 3: la respuesta «¿Tengo que declarar si no he vendido?» como paso; añadir el tipo `respuesta` a `lib/route-plan.ts` con `href /respuestas/<slug>` y 2 minutos), `content/guias/declarar-criptomonedas-hacienda.md` y `content/guias/modelo-721-criptomonedas.md` (enlace «Dudas frecuentes» a 2–4 respuestas), `content/herramientas/calculadora-impuestos-criptomonedas.md` (enlace a la respuesta de FIFO y a la de compensar pérdidas)
- Test: `tests/route-plan.test.ts` (paso de tipo `respuesta` válido y resuelto)

- [ ] **Step 1:** Prueba: `validateRoute` acepta el tipo `respuesta` con un slug existente y rechaza uno inexistente; `resolveStep` da `/respuestas/<slug>`.
- [ ] **Step 2:** `npm test` → FAIL.
- [ ] **Step 3:** Implementar y añadir los enlaces.
- [ ] **Step 4:** `npm test`, `npm run build` → PASS; en local, las 20 respuestas cargan y no hay enlaces internos rotos.
- [ ] **Step 5:** Commit `Enlaces a las respuestas desde la ruta, las guías y la calculadora`; push y abrir el PR B.
