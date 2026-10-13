# CriptoMundo, enriquecimiento visual y nuevas funciones: plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Hacer CriptoMundo más atractivo y útil antes de pedir la revisión de AdSense: portada con gráfico vivo y cinta de precios, microanimaciones, glosario, ruta guiada, quizzes, test de estafa, simulador histórico y panel de mercado.

**Architecture:**
- Next.js 16 (App Router). El contenido vive en archivos (`content/**.md`, `content/*.json`, `data/*.json`), leídos en el servidor con loaders en `lib/`. La interactividad va en componentes cliente pequeños en `components/`.
- La lógica pura (cálculos, validaciones, parsers) vive en módulos `lib/` sin dependencias de React y se prueba con `node:test`.
- Las animaciones usan CSS (`transform` y `opacity`) y se apagan con `prefers-reduced-motion`.
- Se entrega en 3 PR: PR 1 (tareas 1–5), PR 2 (tareas 6–9) y PR 3 (tareas 10–13).

**Tech Stack:** Next.js 16.3, React 19, TypeScript, Tailwind 3, gray-matter, `node:test` + `tsx` (ya instalado) para las pruebas, Node 22 (`~/.local/node/bin`).

**Spec:** `docs/superpowers/specs/2026-10-13-criptomundo-enriquecimiento-design.md`

## Global Constraints
- Sin dependencias nuevas en `dependencies`. Sin imágenes enlazadas desde webs de terceros.
- Ningún contenido renderizado en el servidor puede empezar oculto: prohibido `opacity: 0` inicial y `initial="hidden"` en el contenido.
- Toda animación se desactiva con `@media (prefers-reduced-motion: reduce)`.
- Las APIs externas solo se llaman desde el servidor, con `next: { revalidate }` y `try/catch`. Si fallan, el componente no se muestra y la página sigue funcionando.
- `localStorage` siempre dentro de `try/catch`.
- Importes en euros con formato `es-ES` (`useGrouping: 'always'`).
- Textos en español de España y sin promesas de rentabilidad. Cada página de contenido nueva lleva autor (`SITE.owner`), fecha de revisión y fuentes cuando hay datos.
- Las páginas nuevas solo entran en el menú y en la ruta en el mismo PR que las crea.
- Pruebas: `npm test` (`node --import tsx --test tests/*.test.ts`) y `npm run build` deben pasar antes de cada commit de cierre de tarea.

## Review Focus
1. **CoinGecko o alternative.me caídos o con límite de peticiones:** la portada y `/mercado` se cargan sin cinta, sin velocímetro y sin errores (tareas 2 y 13).
2. **Contenido invisible para Google:** el HTML del servidor de la portada no contiene `opacity:0` y los contadores ya llevan la cifra final (tareas 3 y 5).
3. **Usuario con «reducir movimiento» activado:** no hay movimiento y la cinta se puede desplazar a mano (tareas 2 y 5).
4. **Rangos de fechas inválidos en el simulador** (fin anterior al inicio, moneda sin datos en el mes elegido): se muestra un aviso, no `NaN` (tarea 12).
5. **`localStorage` bloqueado** (navegación privada): la ruta se muestra y se puede marcar en la sesión, sin errores (tarea 8).

---

## PR 1: capa visual y arreglos (rama `pr1-capa-visual`)

### Task 1: Infraestructura de pruebas y estadísticas del sitio

**Files:**
- Modify: `package.json` (script `"test": "node --import tsx --test tests/*.test.ts"`)
- Create: `lib/site-stats.ts`
- Test: `tests/site-stats.test.ts`

**Interfaces:**
- Produces: `getSiteStats(): { lessons: number; guides: number; tools: number }` (servidor; usa `getAllLessons`, `getAllGuides` y `getAllTools`).

- [ ] **Step 1:** Prueba `getSiteStats devuelve los recuentos reales`: `lessons === 29`, `guides === 9` y `tools === 9` (los valores actuales de `content/`).
- [ ] **Step 2:** `npm test`, que debe FALLAR porque el módulo no existe.
- [ ] **Step 3:** Implementar `getSiteStats()`.
- [ ] **Step 4:** `npm test`, que debe pasar (PASS).
- [ ] **Step 5:** Commit `Pruebas con node:test y estadísticas del sitio`.

### Task 2: Datos de sentimiento y cinta de precios

**Files:**
- Create: `lib/sentiment.ts`, `components/price-ticker.tsx`
- Modify: `app/globals.css` (keyframes `ticker` y regla global de reducir movimiento)
- Test: `tests/sentiment.test.ts`

**Interfaces:**
- Produces:
  - `classifyFearGreed(value: number): string`. Rangos: 0–24 «Miedo extremo», 25–44 «Miedo», 45–55 «Neutral», 56–75 «Codicia» y 76–100 «Codicia extrema».
  - `parseFearGreed(json: unknown): { value: number; label: string } | null`.
  - `getFearGreed(): Promise<{ value: number; label: string } | null>`, que llama a `https://api.alternative.me/fng/?limit=1` con `revalidate: 3600`.
  - `toTickerItems(coins: CoinMarket[], n = 8): { symbol: string; price: number; change: number }[]`, que descarta las monedas sin precio.
  - `<PriceTicker items={...} fearGreed={...} />`: componente cliente que no renderiza nada si `items.length === 0`.

- [ ] **Step 1:** Pruebas:
  - `classifyFearGreed(0) === 'Miedo extremo'`, `(24) → 'Miedo extremo'`, `(25) → 'Miedo'`, `(50) → 'Neutral'`, `(57) → 'Codicia'` y `(100) → 'Codicia extrema'`;
  - `parseFearGreed({data:[{value:'57'}]})` da `{value:57,label:'Codicia'}`;
  - `parseFearGreed({})`, `parseFearGreed(null)` y `parseFearGreed({data:[{value:'abc'}]})` dan `null`;
  - `toTickerItems` con 10 monedas devuelve 8, en mayúsculas, y omite las que tienen `current_price` nulo.
- [ ] **Step 2:** `npm test`, que debe FALLAR.
- [ ] **Step 3:** Implementar `lib/sentiment.ts` y `PriceTicker`:
  - lista duplicada dentro de un contenedor con `animation: ticker 40s linear infinite`;
  - `hover:[animation-play-state:paused]`;
  - con reducir movimiento, sin animación y con `overflow-x:auto`;
  - variación en verde o rojo, con `formatEur` (tarea 3).
- [ ] **Step 4:** `npm test`, que debe pasar (PASS).
- [ ] **Step 5:** Commit `Índice de miedo y codicia y cinta de precios`.

### Task 3: Portada con gráfico vivo, contadores y mercado en euros

**Files:**
- Create: `components/hero-chart.tsx`, `components/count-up.tsx`
- Modify:
  - `app/page.tsx`: hero, contadores y cinta; `getMarketData('eur')`; botón principal «Guías» (`/aprende`) y secundario «Calculadoras» (`/herramientas`).
  - `components/home-client.tsx`: sin `motion`, con `formatEur`.
  - `lib/format.ts`: `formatEur(value: number | null | undefined): string`, con 2 decimales si el valor es ≥ 1 y 6 si es < 1, y el sufijo « €».
- Test: `tests/format.test.ts`

**Interfaces:**
- Consumes: `getSiteStats()` (tarea 1); `toTickerItems`, `getFearGreed` y `PriceTicker` (tarea 2).
- Produces:
  - `<HeroChart />`: SVG decorativo (`aria-hidden`), con la línea dibujada una sola vez (`stroke-dashoffset`, 2,5 s).
  - `<CountUp value={number} />`: renderiza `value` en el HTML del servidor y, en el cliente, anima de 0 a `value` en 1,2 s al entrar en pantalla (`IntersectionObserver`). Sin animación con reducir movimiento.

- [ ] **Step 1:** Pruebas: `formatEur(61240.5) === '61.240,50 €'`, `formatEur(1200) === '1.200,00 €'`, `formatEur(0.5) === '0,500000 €'` y `formatEur(null) === '—'`.
- [ ] **Step 2:** `npm test`, que debe FALLAR.
- [ ] **Step 3:** Implementar `formatEur`, `HeroChart` y `CountUp`. Integrar en `app/page.tsx`: texto «N lecciones · N guías · N herramientas» con `CountUp`, y `PriceTicker` al pie del hero con los datos del servidor. En `home-client.tsx`, quitar `framer-motion` (cada `motion.*` pasa a ser el elemento HTML normal) y usar `formatEur`.
- [ ] **Step 4:** `npm test` y `npm run build`, que deben pasar (PASS).
- [ ] **Step 5:** Commit `Portada con gráfico vivo, contadores y precios en euros`.

### Task 4: Tarjetas con brillo y barra de progreso de lectura

**Files:**
- Create: `components/glow-card.tsx`, `components/reading-progress.tsx`
- Modify:
  - `app/globals.css`: clase `.glow-card` con `radial-gradient` en `var(--x) var(--y)`, solo dentro de `@media (hover:hover)`.
  - `components/home-client.tsx`, `app/aprende/page.tsx`, `app/academia/academia-client.tsx` y `app/herramientas/page.tsx`: envolver las tarjetas.
  - `app/aprende/[slug]/page.tsx` y `app/academia/[slug]/lesson-client.tsx`: añadir `<ReadingProgress />`.

**Interfaces:**
- Produces:
  - `<GlowCard className?: string, children>`: un `div` que actualiza `--x` y `--y` en `onPointerMove`.
  - `<ReadingProgress />`: barra fija `top-16` de 2 px, con `transform: scaleX(progress)`, `aria-hidden`.

- [ ] **Step 1:** Implementar ambos componentes y la clase CSS. Es pura presentación, así que no lleva prueba unitaria.
- [ ] **Step 2:** `npm run build`, que debe pasar (PASS).
- [ ] **Step 3:** Comprobar en local (copia en `cw-run` y `preview_start criptomundo`): en `/aprende`, `--x` cambia al mover el ratón sobre una tarjeta; en una guía, la barra llega a `scaleX(1)` al final de la página.
- [ ] **Step 4:** Commit `Tarjetas con brillo y barra de progreso de lectura`.

### Task 5: Menú, contenido visible y reducir movimiento

**Files:**
- Modify:
  - `components/header.tsx`: `NAV` = Academia, Guías (`/aprende`), Herramientas y Mercado. «Mi área» pasa a ser un icono con `aria-label="Mi área"` junto al buscador. Se quita «Inicio», porque el logo ya lleva a la portada.
  - `components/footer.tsx`: enlace a Noticias.
  - `components/noticias-client.tsx`: sin `initial` y sin `whileInView`.
  - `app/globals.css`: regla `@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; } }`.
- Test: `tests/no-hidden-content.test.ts`

- [ ] **Step 1:** Prueba `ningún componente de contenido arranca oculto`: lee `components/*.tsx` y `app/**/*.tsx` y comprueba que ninguno contiene `initial="hidden"`, `whileInView` ni `initial={{ opacity: 0` (salvo `mercado-client.tsx`, cuyo panel de detalle se abre al hacer clic; se permite de forma explícita).
- [ ] **Step 2:** `npm test`, que debe FALLAR porque `noticias-client.tsx` aún los contiene.
- [ ] **Step 3:** Aplicar los cambios.
- [ ] **Step 4:** `npm test` y `npm run build`, que deben pasar (PASS).
- [ ] **Step 5:** Comprobar en local:
  - `curl` o `fetch` de la portada: `opacity:0` aparece 0 veces;
  - a 375 px, `scrollWidth <= innerWidth`;
  - con el menú de escritorio, ninguna entrada ocupa dos líneas (altura del `nav` ≤ 40 px);
  - con `prefers-reduced-motion` emulado, la cinta no se mueve.
- [ ] **Step 6:** Commit `Menú más corto, contenido siempre visible y reducir movimiento`. Abrir el PR 1.

## PR 2: glosario, ruta y quizzes (rama `pr2-glosario-ruta-quizzes`)

### Task 6: Glosario A–Z

**Files:**
- Create: `content/glosario.md`, `lib/glossary.ts`, `app/glosario/page.tsx`, `components/glossary-filter.tsx`
- Modify: `app/api/search/route.ts` (términos con `href: /glosario#slug`), `app/sitemap.ts` y `app/academia/[slug]/lesson-client.tsx` (cada término del bloque Glosario enlaza a `/glosario#slug`)
- Test: `tests/glossary.test.ts`

**Interfaces:**
- Produces:
  - `parseGlossary(md: string): { term: string; slug: string; definition: string; lesson?: string }[]`. Formato: `### Término`, uno o más párrafos de definición y una línea opcional `Lección: slug`.
  - `getGlossary()`, que lee `content/glosario.md`.
  - `termSlug(term: string): string`, que reutiliza `slugifyHeading` de `components/markdown.tsx`.

- [ ] **Step 1:** Pruebas:
  - `parseGlossary` de un texto con 2 términos da 2 entradas con su slug y su lección;
  - `termSlug('Pérdida impermanente') === 'perdida-impermanente'`;
  - sobre el archivo real, ningún slug está repetido, hay al menos 140 términos, toda `lesson` existe en `getAllLessons()` y todo término de los glosarios de las lecciones aparece en el glosario.
- [ ] **Step 2:** `npm test`, que debe FALLAR.
- [ ] **Step 3:**
  - Generar el borrador de `content/glosario.md` con los 126 términos únicos de las lecciones y revisarlo a mano: definiciones unificadas, sin duplicados.
  - Añadir unos 25 términos de las guías: MiCA, CNMV, ESMA, CASP, FIFO, modelo 721, modelo 720, DAC8, KYC, white paper, slashing, spread, custodia, autocustodia, permuta, base del ahorro, *address poisoning*, *SIM swapping*, *pig butchering*, *rug pull*, EURC, ficha de dinero electrónico, ficha referenciada a activos, blob y secuenciador.
  - Implementar el loader y la página: letras A–Z con anclas, `GlossaryFilter` (oculta en el cliente los términos que no coinciden, sin quitarlos del HTML), JSON-LD `DefinedTermSet` y metadatos con `canonical`.
- [ ] **Step 4:** `npm test` y `npm run build`, que deben pasar (PASS).
- [ ] **Step 5:** Commit `Glosario A–Z enlazado desde las lecciones y el buscador`.

### Task 7: Quizzes en las lecciones

**Files:**
- Modify: los 29 archivos `content/academia/*.md` (campo `quiz` en el frontmatter), `lib/academia-data.ts` (tipo `QuizQuestion` y campo `quiz?: QuizQuestion[]`, que se lee del frontmatter) y `app/academia/[slug]/lesson-client.tsx`
- Create: `lib/quiz.ts`, `components/lesson-quiz.tsx`
- Test: `tests/quiz.test.ts`

**Interfaces:**
- Produces:
  - `type QuizQuestion = { pregunta: string; opciones: string[]; correcta: number; explicacion: string }`.
  - `validateQuiz(q: QuizQuestion[]): string[]`: lista de errores; vacía si es válido. Exige 3–5 preguntas, 3–4 opciones por pregunta, `correcta` dentro de rango y `explicacion` no vacía.
  - `scoreQuiz(answers: number[], quiz: QuizQuestion[]): { correct: number; total: number; passed: boolean }`, con `passed` si `correct / total >= 0.6`.
  - `<LessonQuiz slug quiz />`.

- [ ] **Step 1:** Pruebas:
  - `validateQuiz` detecta `correcta` fuera de rango, 2 opciones y 6 preguntas;
  - `scoreQuiz([0,1,2],quiz3)` con 2 aciertos da `{correct:2,total:3,passed:true}`, y con 1 acierto `passed:false`;
  - sobre las 29 lecciones reales, `validateQuiz` devuelve `[]`.
- [ ] **Step 2:** `npm test`, que debe FALLAR.
- [ ] **Step 3:**
  - Escribir 3–5 preguntas por lección, basadas solo en el texto revisado de esa lección.
  - Implementar `LessonQuiz`:
    - enunciado y opciones visibles en el HTML del servidor;
    - botones con teclado, corrección y explicación tras cada respuesta, resultado con `aria-live`;
    - si `passed` y hay sesión iniciada, `POST /api/academia/progress {lessonSlug, action:'complete'}`.
- [ ] **Step 4:** `npm test` y `npm run build`, que deben pasar (PASS).
- [ ] **Step 5:** Commit `Quizzes de 3–5 preguntas en las 29 lecciones`.

### Task 8: Ruta «Empieza aquí»

**Files:**
- Create: `content/ruta.json`, `lib/route-plan.ts`, `app/empieza-aqui/page.tsx`, `components/route-progress.tsx`
- Modify: `app/sitemap.ts`
- Test: `tests/route-plan.test.ts`

**Interfaces:**
- Produces:
  - `type RouteStep = { tipo: 'leccion' | 'guia' | 'herramienta'; slug: string }` y `type RouteStage = { titulo: string; descripcion: string; pasos: RouteStep[] }`.
  - `validateRoute(stages: RouteStage[], known: { leccion: string[]; guia: string[]; herramienta: string[] }): string[]`.
  - `resolveStep(step): { title: string; href: string; minutes: number }`.
  - `<RouteProgress stages={resolved} />`: casillas y barras; clave `localStorage` `cm-ruta` (lista de hrefs); une el resultado con `GET /api/academia/progress` si hay sesión.

- [ ] **Step 1:** Pruebas:
  - `validateRoute` devuelve un error que nombra el slug inexistente;
  - el `content/ruta.json` real no da errores;
  - tiene 4 etapas y los pasos del spec, apartado 3.2, sin `test-estafa` ni `simulador-historico`.
- [ ] **Step 2:** `npm test`, que debe FALLAR.
- [ ] **Step 3:** Implementar. La página lleva una introducción propia (unas 150 palabras), autor y fecha. `RouteProgress` envuelve las lecturas y escrituras de `localStorage` en `try/catch`; si falla, mantiene el estado en memoria.
- [ ] **Step 4:** `npm test` y `npm run build`, que deben pasar (PASS).
- [ ] **Step 5:** Commit `Ruta «Empieza aquí» con progreso`.

### Task 9: Menú y portada para el PR 2

**Files:**
- Modify: `components/header.tsx` (`NAV` = Empieza aquí, Academia, Guías, Herramientas, Mercado y Glosario) y `app/page.tsx` (botón principal «Empieza aquí» → `/empieza-aqui`)

- [ ] **Step 1:** Aplicar los cambios.
- [ ] **Step 2:** `npm run build`, que debe pasar (PASS). En local, comprobar los enlaces internos de todas las páginas de contenido: ningún 4xx. Es el mismo script de comprobación que se usó en la Fase 2.
- [ ] **Step 3:** Commit y abrir el PR 2.

## PR 3: test de estafa, simulador y panel de mercado (rama `pr3-estafa-simulador-mercado`)

### Task 10: Test «¿Es una estafa?»

**Files:**
- Create: `lib/scam-test.ts`, `content/herramientas/test-estafa.md` (`calculator: estafa`, `order: 10`)
- Modify: `components/calculators.tsx` (componente `Estafa` en `CALCULATORS`) y `content/ruta.json` (añade `test-estafa` a la etapa 2)
- Test: `tests/scam-test.test.ts`

**Interfaces:**
- Produces:
  - `SCAM_QUESTIONS: { id: string; pregunta: string; peso: 1 | 2 | 3; senal: string }[]`, con las 12 preguntas del spec, apartado 4.1. Graves (peso 3): rentabilidad garantizada, frase semilla, pago por adelantado para retirar, acceso remoto y recuperar dinero perdido.
  - `scoreScam(yes: string[]): { level: 'grave' | 'precaucion' | 'sin-senales'; points: number; signals: string[] }`. Es `grave` si hay alguna pregunta de peso 3 o 5 puntos o más; `precaucion` con 2 a 4 puntos; `sin-senales` con 0 o 1.

- [ ] **Step 1:** Pruebas: `scoreScam([])` da `sin-senales`; una pregunta de peso 1, `sin-senales`; una de peso 2, `precaucion`; una de peso 3, `grave`; dos de peso 2 más una de peso 1, `grave` (5 puntos); y las señales se devuelven en el orden de las preguntas.
- [ ] **Step 2:** `npm test`, que debe FALLAR.
- [ ] **Step 3:** Implementar la lógica, el componente (botones Sí/No con teclado y resultado con `aria-live`) y el texto de la página, con su explicación, cómo usarlo, sus límites, enlaces a la CNMV y la guía de estafas, y fuentes.
- [ ] **Step 4:** `npm test` y `npm run build`, que deben pasar (PASS).
- [ ] **Step 5:** Actualizar `tests/site-stats.test.ts` (`tools === 10`). Commit `Test «¿Es una estafa?»`.

### Task 11: Datos históricos mensuales

**Files:**
- Create: `scripts/actualizar-historico.mjs`, `data/historico-mensual.json`, `lib/historical.ts`
- Test: `tests/historical-data.test.ts`

**Interfaces:**
- Produces:
  - `data/historico-mensual.json` = `{ actualizado: 'AAAA-MM-DD', fuentes: string[], monedas: { [id: 'btc'|'eth'|'bnb'|'sol'|'xrp'|'ada'|'doge'|'link']: { nombre: string; desde: 'AAAA-MM'; cierres: [ 'AAAA-MM', number ][] } } }`. El último mes incluido es el último mes cerrado.
  - `getHistory(id: string): { month: string; price: number }[]`.
- El script descarga `GET https://api.binance.com/api/v3/klines?symbol=<SYM>USDT&interval=1M&limit=1000` y `https://data-api.ecb.europa.eu/service/data/EXR/D.USD.EUR.SP00.A?format=csvdata&startPeriod=2017-01-01`. Para cada mes, divide el cierre en USD entre el último tipo diario del BCE de ese mes y redondea a 6 cifras significativas.

- [ ] **Step 1:** Pruebas sobre el JSON real:
  - las 8 monedas están presentes y los meses son consecutivos, sin huecos;
  - todos los precios son mayores que 0;
  - BTC empieza en `2017-08` o antes;
  - el cierre de BTC de `2021-10` está entre 45.000 y 60.000 € (control de cordura);
  - `actualizado` es una fecha válida.
- [ ] **Step 2:** `npm test`, que debe FALLAR porque el archivo no existe.
- [ ] **Step 3:** Escribir el script, ejecutarlo (`node scripts/actualizar-historico.mjs`) y escribir `lib/historical.ts`.
- [ ] **Step 4:** `npm test`, que debe pasar (PASS).
- [ ] **Step 5:** Commit `Datos históricos mensuales en euros (Binance × BCE)`.

### Task 12: Simulador histórico

**Files:**
- Create: `lib/backtest.ts`, `content/herramientas/simulador-historico.md` (`calculator: historico`, `order: 11`), `components/value-chart.tsx`
- Modify: `components/calculators.tsx` (componente `Historico`, que recibe la historia como prop desde la página: se añade `extra?: unknown` a `<Calculator>`; la página de la herramienta pasa `getHistory()` de todas las monedas cuando `calculator === 'historico'`) y `content/ruta.json` (añade `simulador-historico` a la etapa 4)
- Test: `tests/backtest.test.ts`

**Interfaces:**
- Produces:
  - `backtest(prices: {month: string; price: number}[], opts: { mode: 'lump' | 'dca'; amount: number; from: string; to: string }): { invested: number; value: number; profit: number; roi: number; maxDrawdown: { pct: number; eur: number }; series: { month: string; invested: number; value: number }[] } | { error: string }`.
  - En modo `lump`, `amount` se invierte en `from`. En modo `dca`, `amount` se invierte cada mes de `from` a `to`, ambos incluidos.
  - La valoración se hace al cierre de cada mes.
  - `maxDrawdown` es la mayor caída de `value` desde un máximo previo de la serie.
  - Errores: «El mes final es anterior al inicial» y «No hay datos de esta moneda para ese periodo».

- [ ] **Step 1:** Pruebas con la serie `[{'2020-01',100},{'2020-02',50},{'2020-03',200}]`:
  - `lump`, 100 € de 01 a 03: `value` 200, `roi` 100 y `maxDrawdown.pct` −50;
  - `dca`, 100 €/mes de 01 a 03: `invested` 300 y unidades 1 + 2 + 0,5 = 3,5, así que `value` 700;
  - `from > to` da un error;
  - un mes inexistente da un error;
  - además, un caso real: BTC `lump` de `2021-01` a `2022-12` comparado con el cálculo hecho a mano sobre el JSON.
- [ ] **Step 2:** `npm test`, que debe FALLAR.
- [ ] **Step 3:**
  - Implementar `backtest`.
  - Implementar `ValueChart`: SVG propio con dos líneas, invertido y valor, y ejes de meses y euros; `role="img"` con `aria-label` que resume el resultado.
  - Implementar el componente `Historico`: selects de moneda y meses, importe y modo, con los errores mostrados como aviso.
  - Escribir la página: explicación, ejemplo resuelto con los valores por defecto (BTC, 1.000 € de golpe en `2021-01` hasta el último mes) y limitaciones (cierres mensuales, sin comisiones, sesgo de supervivencia, rentabilidad pasada).
- [ ] **Step 4:** `npm test` y `npm run build`, que deben pasar (PASS). En local, comprobar que los valores por defecto coinciden con el ejemplo de la página.
- [ ] **Step 5:** Actualizar `tests/site-stats.test.ts` (`tools === 11`). Commit `Simulador histórico con peor caída y gráfico`.

### Task 13: Panel de mercado

**Files:**
- Create: `components/fear-greed-gauge.tsx`, `components/market-panel.tsx`
- Modify: `lib/sentiment.ts` (`getGlobalMarket(): Promise<{ btcDominance: number; totalCapEur: number; capChange24h: number } | null>`, que llama a CoinGecko `/global` con `revalidate: 600`) y `app/mercado/page.tsx` (panel encima de la tabla)
- Test: `tests/sentiment.test.ts` (ampliado)

**Interfaces:**
- Consumes: `getFearGreed()` (tarea 2).
- Produces:
  - `parseGlobal(json: unknown)`, la función pura usada por `getGlobalMarket`.
  - `<MarketPanel fearGreed global />`: cada tarjeta se oculta si su dato es `null`.

- [ ] **Step 1:** Pruebas:
  - `parseGlobal` de un JSON de ejemplo (`data.market_cap_percentage.btc`, `data.total_market_cap.eur`, `data.market_cap_change_percentage_24h_usd`) da los 3 valores;
  - un JSON incompleto da `null`.
- [ ] **Step 2:** `npm test`, que debe FALLAR.
- [ ] **Step 3:** Implementar:
  - el velocímetro SVG: semicírculo de rojo a verde, con una aguja en `value/100 × 180°` y la etiqueta de `classifyFearGreed`;
  - las tarjetas, cada una con su texto de qué mide y qué no predice.
- [ ] **Step 4:** `npm test` y `npm run build`, que deben pasar (PASS). En local, simular un fallo de la API (devolver `null`) y comprobar que `/mercado` muestra la tabla sin el panel.
- [ ] **Step 5:** Commit `Panel de mercado: miedo y codicia, dominancia y capitalización`. Abrir el PR 3.
