# Comparador de exchanges — plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `/comparador-exchanges`: comparador neutral de 12 plataformas autorizadas en España, con datos de la CNMV y de las webs oficiales, cada uno con su fuente y su fecha.

**Architecture:** Datos en `data/exchanges.json` y una instantánea de la lista de la CNMV en `data/cnmv-psc.json`, validados en `npm test` por `lib/exchanges.ts`. Página de servidor con filtros en un componente cliente que solo oculta tarjetas tras la interacción (el HTML inicial muestra las 12).

**Tech Stack:** Next.js 16 App Router, TypeScript, node:test + tsx, Tailwind.

**Spec:** `docs/superpowers/specs/2026-10-15-comparador-exchanges-design.md`

## Global Constraints
- Sin afiliados, sin clasificación: orden alfabético por `nombre`.
- Cada comisión `{ valor, fuente, comprobado }`; si no hay dato claro, «No publicada con claridad». Nunca estimar.
- `entidad` idéntica a la denominación de la lista de la CNMV.
- Sin dependencias nuevas en el proyecto (la extracción del PDF se hace una vez fuera del build).
- Las 12: bit2me, bitpanda, bitvavo, bybit, coinbase, criptan, cryptocom, etoro, kraken, okx, revolut, trade-republic.

## Review Focus
1. Una plataforma pierde su autorización → el test de la instantánea solo detecta lo que esté en `data/cnmv-psc.json`; documentar cómo refrescarla.
2. Filtros sin JavaScript o con lectores de pantalla → todas visibles; los filtros son botones `aria-pressed` y el recuento se anuncia con `aria-live`.
3. Valores `null` (no comprobado) → la interfaz muestra «Sin confirmar», no «No».
4. Tabla en 375 px → tarjetas, sin scroll horizontal.
5. Fechas `comprobado` futuras o mal formadas → error de validación.

---

### Task 1: Instantánea de la lista de la CNMV

**Files:**
- Create: `data/cnmv-psc.json`, `docs/mantenimiento-comparador.md` (cómo refrescar la instantánea y revisar las comisiones cada 3 meses)
- Test: `tests/exchanges.test.ts` (primera parte)

**Interfaces:**
- Produces: `data/cnmv-psc.json` = `{ fecha: '2026-10-15', url: string, entidades: string[] }`.

- [ ] **Step 1:** Prueba: la instantánea tiene ≥ 150 entidades únicas, `fecha` válida e incluye «BITCOINFORME, S.L. (BIT2ME)» y «COINBASE LUXEMBOURG S.A.».
- [ ] **Step 2:** `npm test` → FAIL.
- [ ] **Step 3:** Extraer las denominaciones del PDF oficial (texto extraído con pypdf fuera del repositorio; las denominaciones partidas en dos líneas se unen) y escribir el JSON y el documento de mantenimiento.
- [ ] **Step 4:** `npm test` → PASS.
- [ ] **Step 5:** Commit `Instantánea de la lista de proveedores de la CNMV`.

### Task 2: `lib/exchanges.ts` y su validación

**Files:**
- Create: `lib/exchanges.ts`, `tests/fixtures/exchanges.json` (1 plataforma válida)
- Test: `tests/exchanges.test.ts`

**Interfaces:**
- Produces:
  - tipos `Comision`, `Plataforma`, `ExchangesFile`;
  - `getExchanges(): ExchangesFile` (plataformas ordenadas por `nombre`, con `localeCompare 'es'`);
  - `validateExchanges(file, cnmv: string[], today: string): string[]`;
  - `PAGOS = ['sepa', 'bizum', 'tarjeta']`.

- [ ] **Step 1:** Pruebas: la fixture es válida; errores para `entidad` fuera de la CNMV, comisión sin fuente, fuente `http://`, `comprobado` futura, pago desconocido, `destaca` vacío y slug repetido. Prueba real sobre `data/exchanges.json`, con 12 plataformas.
- [ ] **Step 2:** `npm test` → FAIL.
- [ ] **Step 3:** Implementar. Dejar `data/exchanges.json` con `plataformas: []` hasta la Task 3; la prueba de las 12 se queda fallando hasta entonces y se marca como el objetivo de la Task 3.
- [ ] **Step 4:** `npm test` → PASS salvo la prueba de las 12.
- [ ] **Step 5:** Commit `Comparador: datos y validación`.

### Task 3: Datos verificados de las 12 plataformas

**Files:**
- Modify: `data/exchanges.json`

- [ ] **Step 1:** Para cada plataforma:
  - de la lista de la CNMV: `entidad`, tipo, país, fecha y servicios;
  - de su web oficial (página de tarifas, ayuda y condiciones para España): comisiones, pagos, retirada a wallet, staking, español e informe fiscal;
  - anotar la URL concreta y la fecha de comprobación de cada comisión;
  - si un dato no se puede comprobar: «No publicada con claridad» o `null`.
- [ ] **Step 2:** `npm test` → PASS (incluida la prueba de las 12).
- [ ] **Step 3:** Commit `Comparador: datos de las 12 plataformas`.

### Task 4: Página `/comparador-exchanges`

**Files:**
- Create: `app/comparador-exchanges/page.tsx`, `components/exchange-filter.tsx`

**Interfaces:**
- Consumes: `getExchanges` (Task 2).
- Produces: `ExchangeFilter` (cliente). Botones de filtro con `aria-pressed`; oculta las tarjetas con `data-exchange` que no cumplan y anuncia «N de 12» con `aria-live`.

- [ ] **Step 1:** Prueba en `tests/exchanges.test.ts`: `matchesFilters(p, ['bizum'])` en `lib/exchanges.ts`. Es verdadero solo si `pagos` incluye `bizum`; con `'wallet'` o `'staking'` exige `true`, y `null` no cumple.
- [ ] **Step 2:** `npm test` → FAIL.
- [ ] **Step 3:** Implementar `matchesFilters`, el componente y la página según el apartado 4 del spec. Texto propio de 1.200 palabras o más fuera de la tabla.
- [ ] **Step 4:** `npm test`, `tsc`, `npm run build` → PASS. En local: filtros con teclado, las 12 visibles sin JavaScript (HTML inicial), 375 px sin scroll horizontal y JSON-LD válido.
- [ ] **Step 5:** Commit `Página del comparador de exchanges`.

### Task 5: Enlaces y PR

**Files:**
- Modify:
  - `lib/route-plan.ts`: nuevo tipo de paso `pagina` con un mapa fijo `{ 'comparador-exchanges': { title, href, minutes: 5 } }`;
  - `content/ruta.json`: etapa 2, después de la guía de la CNMV;
  - `lib/internal-links.ts`: `/comparador-exchanges` en `STATIC_PATHS`;
  - `content/guias/exchange-autorizado-cnmv.md` y `content/respuestas/exchanges-autorizados-mica-espana.md`: enlace al comparador;
  - `content/criptos/*.md` (12): una frase con el enlace en «Cómo comprarla en España con seguridad»;
  - `components/footer.tsx`, `app/api/search/route.ts` y `app/sitemap.ts`.
- Test: `tests/route-plan.test.ts`: el paso `pagina` es válido y se resuelve a `/comparador-exchanges`; uno desconocido es un error.

- [ ] **Step 1:** Prueba → FAIL.
- [ ] **Step 2:** Implementar y añadir los enlaces.
- [ ] **Step 3:** `npm test`, `npm run build` → PASS. En local: enlaces internos sin errores.
- [ ] **Step 4:** Commit `Enlaces al comparador`; push y abrir el PR. Ofrecer al propietario un recordatorio trimestral.
