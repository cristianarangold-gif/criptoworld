# Fichas de criptomonedas — plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 12 fichas de criptomonedas (`/cripto`, `/cripto/<slug>`) con texto propio, datos en vivo, histórico y enlace al simulador.

**Architecture:** Mismo patrón que guías, noticias y respuestas: `content/criptos/*.md` leídos por `lib/coins.ts`, validados en `npm test`; páginas de servidor; datos en vivo con `fetch` + revalidate; reutiliza `ValueChart`, `HISTORY` y `knownPaths`.

**Tech Stack:** Next.js 16 App Router, TypeScript, gray-matter, node:test + tsx, Tailwind.

**Spec:** `docs/superpowers/specs/2026-10-15-fichas-criptomonedas-design.md`

## Global Constraints
- Sin dependencias nuevas.
- Secciones exactas: `## Qué es`, `## Para qué se usa`, `## Cómo funciona`, `## Riesgos concretos`, `## Cómo comprarla en España con seguridad`, `## Cómo tributa`; ≥ 700 palabras.
- Sin cifras de mercado cambiantes en los textos; sin predicciones ni recomendaciones.
- CoinGecko solo desde el servidor, con revalidate 300 y `try/catch`; si falla, el bloque desaparece.
- Las 12 fichas: bitcoin, ethereum, xrp, bnb, solana, cardano, dogecoin, chainlink, tron, avalanche, polkadot, litecoin (slugs), con ids de CoinGecko `bitcoin, ethereum, ripple, binancecoin, solana, cardano, dogecoin, chainlink, tron, avalanche-2, polkadot, litecoin` e ids de histórico `btc, eth, xrp, bnb, sol, ada, doge, link, trx, avax, dot, ltc`.

## Review Focus
1. CoinGecko devuelve 429 o un array sin alguna moneda → la ficha se muestra sin bloque en vivo, el índice sin precio para esa moneda, nunca un error.
2. `?moneda=` con un id inexistente o con mayúsculas → el simulador arranca en BTC sin romperse.
3. Una ficha cuyo `historico` no tiene datos → el gráfico no se muestra (`ValueChart` devuelve null con <2 puntos).
4. `/mercado` con la tabla en EUR o USD → el enlace a la ficha no interfiere con el clic de fila (stopPropagation).
5. Texto con enlaces a `/glosario#término` o a respuestas → validados por `knownPaths` (incluir `/respuestas/<slug>` y `/cripto/<slug>`).

---

### Task 1: Histórico de 12 monedas y `?moneda=` en el simulador

**Files:**
- Modify: `scripts/actualizar-historico.mjs` (añadir `trx: 'Tron', avax: 'Avalanche', dot: 'Polkadot', ltc: 'Litecoin'`), `data/historico-mensual.json` (regenerado), `components/calculators.tsx` (`Historico` acepta `extra` como `{ coins: HistoryProp; initial?: string }`), `app/herramientas/[slug]/page.tsx` (lee `searchParams.moneda`)
- Test: `tests/historical-data.test.ts`

**Interfaces:**
- Produces: `HISTORY.monedas` con 12 ids; `pickInitialCoin(ids: string[], requested?: string): string` en `lib/historical.ts` (devuelve `requested` en minúsculas si existe; si no, `'btc'`).

- [ ] **Step 1:** Pruebas: `IDS` del test pasa a 12; cada moneda ≥ 60 meses; `pickInitialCoin(['btc','sol'], 'SOL') === 'sol'`, `pickInitialCoin(['btc'], 'xyz') === 'btc'`, `pickInitialCoin(['btc'], undefined) === 'btc'`.
- [ ] **Step 2:** `npm test` → FAIL.
- [ ] **Step 3:** Ampliar el script, ejecutarlo, implementar `pickInitialCoin` y el paso del parámetro.
- [ ] **Step 4:** `npm test` → PASS; `/herramientas/simulador-historico?moneda=sol` arranca en Solana (local).
- [ ] **Step 5:** Commit `Histórico de 12 monedas y moneda inicial en el simulador`.

### Task 2: `lib/coins.ts` y su validación

**Files:**
- Create: `lib/coins.ts`, `tests/coins.test.ts`, `tests/fixtures/criptos/ejemplo.md`, `content/criptos/.gitkeep`
- Modify: `lib/internal-links.ts` (añade `/cripto`, `/respuestas/<slug>` y `/cripto/<slug>` a `knownPaths`)

**Interfaces:**
- Produces:
  - `interface Coin { slug; nombre; simbolo; coingecko; historico; descripcion; lanzamiento; creador; consenso; suministro_max; web; leccion?; updated; sources; related; body; words }`
  - `COIN_SECTIONS`, `loadCoins(dir?)`, `getAllCoins()` (orden fijo del Global Constraints), `getCoin(slug)`, `validateCoins(items, known, historyIds: string[], lessonSlugs: string[]): string[]`.

- [ ] **Step 1:** Pruebas: fixture válida → `[]`; errores para sección ausente, 699 palabras, descripción de 161, sin fuentes, `coingecko` vacío, `historico` inexistente, `leccion` inexistente, enlace roto, slug o `coingecko` repetidos; prueba real sobre `getAllCoins()` → `[]`.
- [ ] **Step 2:** `npm test` → FAIL.
- [ ] **Step 3:** Implementar.
- [ ] **Step 4:** `npm test` → PASS.
- [ ] **Step 5:** Commit `Fichas de criptomonedas: contenido y validación`.

### Task 3: Datos en vivo y páginas `/cripto`

**Files:**
- Create: `lib/coin-market.ts`, `app/cripto/page.tsx`, `app/cripto/[slug]/page.tsx`, `tests/coin-market.test.ts`

**Interfaces:**
- Consumes: `getAllCoins`, `getCoin` (Task 2); `ValueChart` (`components/value-chart.tsx`); `getHistory` (`lib/historical.ts`); `backtest` no (la peor caída se calcula con `maxDrawdownOf`).
- Produces:
  - `type LiveCoin = { price; change24h; marketCap; rank; circulating; maxSupply: number | null }`
  - `parseMarkets(json: unknown): Record<string, LiveCoin>` (por id; ignora entradas sin precio numérico)
  - `getLiveCoins(ids: string[]): Promise<Record<string, LiveCoin>>` (revalidate 300; `{}` si falla)
  - `maxDrawdownOf(prices: number[]): number` (en %, ≤ 0; 0 con menos de 2 precios)

- [ ] **Step 1:** Pruebas: `parseMarkets` con dos monedas (una sin `current_price`) → solo la válida, con `maxSupply` null si viene null; `parseMarkets(null)` → `{}`; `maxDrawdownOf([100, 50, 200, 100])` → −50; `maxDrawdownOf([1])` → 0.
- [ ] **Step 2:** `npm test` → FAIL.
- [ ] **Step 3:** Implementar lib y páginas (spec apartado 4). Para comprobar el aspecto antes de la Task 4, usar la fixture copiada a la copia local `cw-run`.
- [ ] **Step 4:** `npm test`, `tsc`, `npm run build` → PASS.
- [ ] **Step 5:** Commit `Páginas de fichas con datos en vivo e histórico`.

### Task 4: Las 12 fichas

**Files:**
- Create: `content/criptos/<slug>.md` × 12
- Test: `tests/coins.test.ts` (12 fichas, en el orden fijo, todas con `historico` válido)

- [ ] **Step 1:** Prueba de recuento → FAIL.
- [ ] **Step 2:** Investigar cada moneda en fuentes primarias (whitepaper, docs oficiales, SEC/CNMV/ESMA cuando aplique) y escribirla. Datos ya fijados en la web: MiCA en vigor plena en España desde 2026-07-01; tributación como en `/respuestas` (permuta, FIFO, staking como capital mobiliario).
- [ ] **Step 3:** `npm test` → PASS.
- [ ] **Step 4:** Commit `12 fichas de criptomonedas`.

### Task 5: Enlaces y PR

**Files:**
- Modify: `components/mercado-client.tsx` (prop `coinPages: Record<coingeckoId, slug>`; el nombre enlaza a `/cripto/<slug>` con `stopPropagation`), `app/mercado/page.tsx` (pasa el mapa), `app/page.tsx` (chips «Fichas de criptomonedas»), `components/footer.tsx`, `app/api/search/route.ts`, `app/sitemap.ts`
- Test: `tests/coins.test.ts` (`coinPageMap()` devuelve 12 entradas `coingecko → slug`)

- [ ] **Step 1:** Prueba de `coinPageMap()` → FAIL.
- [ ] **Step 2:** Implementar `coinPageMap()` en `lib/coins.ts` y los enlaces.
- [ ] **Step 3:** `npm test`, `npm run build` → PASS. En local: 12 fichas 200, bloque en vivo presente y ausente con CoinGecko caído (copia local), botón del simulador, `/mercado` enlaza, enlaces internos sin errores, sin scroll horizontal a 375 px.
- [ ] **Step 4:** Commit `Enlaces a las fichas desde mercado, portada, pie, buscador y sitemap`; push y abrir el PR.
