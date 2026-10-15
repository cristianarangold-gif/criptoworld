# Calendario cripto y fiscal — plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `/calendario` con fechas fiscales, normativas y de red verificadas, suscripción `.ics` y botón «Añadir» por fecha.

**Architecture:** Datos en `data/calendario.json` validados por `lib/calendar.ts` (funciones puras: validación, próximos y pasados, ICS y URL de Google Calendar). Página de servidor con `revalidate = 86400`; route handlers `app/calendario.ics/route.ts` y `app/calendario/[id]/route.ts` (para `/calendario/<id>.ics`).

**Tech Stack:** Next.js 16 App Router, TypeScript, node:test + tsx.

**Spec:** `docs/superpowers/specs/2026-10-15-calendario-design.md`

## Global Constraints
- Sin dependencias nuevas.
- Cada evento con fuente oficial `https://`; lo no confirmado no entra o va como `aproximada: true` con la explicación de la estimación.
- Eventos de día completo; `UID` = `<id>@criptoworld.org`.
- Fechas visibles con `formatDate`; zona horaria de Madrid para «hoy».

## Review Focus
1. Escape ICS (comas, punto y coma, saltos de línea, tildes) y líneas de 75 octetos o menos (UTF-8, sin cortar caracteres multibyte).
2. Evento con rango que empezó pero no ha terminado (campaña de la Renta en curso): debe aparecer en «Próximas», no en «Ya pasado».
3. `DTEND` exclusivo: un evento de un día del 5-11 lleva `DTEND` 6-11; un rango del 1-1 al 31-3 lleva `DTEND` 1-4.
4. La ruta `/calendario/<id>.ics` con un id inexistente → 404.
5. Sin JavaScript se ven todas las fechas (los filtros solo ocultan tras la interacción).

---

### Task 1: `lib/calendar.ts` (validación y fechas)
**Files:** Create `lib/calendar.ts`, `tests/calendar.test.ts`, `data/calendario.json` (con `eventos: []` provisional)
**Interfaces:** `Evento`, `CalendarioFile`, `CATEGORIAS`, `validateCalendar(file, known, today): string[]`, `upcoming(eventos, today)` (ordenados por `inicio`; incluye los que tienen `fin ≥ hoy`), `past(eventos, today)` (los más recientes primero).
- [ ] Pruebas: errores de fecha no válida, `fin < inicio`, fuente `http://`, enlace roto, id repetido, categoría desconocida; `upcoming` y `past` con un rango en curso; prueba real «al menos un evento futuro por categoría» (falla hasta la Task 3).
- [ ] FAIL → implementar → PASS salvo la prueba real → commit `Calendario: datos y validación`.

### Task 2: ICS y Google Calendar
**Files:** Modify `lib/calendar.ts`; Test `tests/calendar.test.ts`
**Interfaces:** `toIcs(eventos, { name, url }): string`, `googleCalendarUrl(e, pageUrl): string`.
- [ ] Pruebas:
  - `VCALENDAR` con `VERSION:2.0`, `PRODID`, `X-WR-CALNAME` y un `VEVENT` por evento;
  - `DTSTART;VALUE=DATE:20261105` y `DTEND;VALUE=DATE:20261106`, y en un rango, `DTEND` = día siguiente al fin;
  - escape de `,` `;` y salto de línea;
  - ninguna línea de más de 75 octetos y el plegado no rompe caracteres UTF-8 (se reconstruye igual);
  - fin de línea CRLF;
  - URL de Google con `action=TEMPLATE`, `dates=20261105/20261106` y `text` codificado.
- [ ] FAIL → implementar → PASS → commit `Calendario: exportación ICS y Google Calendar`.

### Task 3: Fechas verificadas
**Files:** Modify `data/calendario.json`
- [ ] Verificar en fuentes oficiales (AEAT, BOE, EUR-Lex, la propia red: altura de bloque actual para estimar los halvings) y escribir los eventos del spec, apartado 3. Lo no confirmado no entra.
- [ ] `npm test` → PASS (incluida la prueba real) → commit `Calendario: fechas verificadas`.

### Task 4: Página y rutas `.ics`
**Files:** Create `app/calendario/page.tsx`, `components/calendar-filter.tsx`, `app/calendario.ics/route.ts`, `app/calendario/[id]/route.ts`
- [ ] Implementar según los apartados 4 y 5 del spec. En la ruta `[id]`, aceptar `<id>.ics` y responder 404 si no existe. Texto propio de 600 palabras o más.
- [ ] `npm test`, `tsc`, `npm run build` → PASS.
- [ ] En local:
  - `/calendario.ics` y `/calendario/<id>.ics` con `Content-Type: text/calendar` y todos los `VEVENT` legibles;
  - `/calendario/no-existe.ics` → 404;
  - filtros con teclado;
  - 375 px sin scroll horizontal;
  - JSON-LD válido.
- [ ] Commit `Página del calendario y suscripción .ics`.

### Task 5: Enlaces, recordatorio y PR
**Files:** Modify:
- `lib/internal-links.ts` (`/calendario`);
- guías de Hacienda y del 721;
- respuestas `cuando-presentar-modelo-721`, `impuesto-patrimonio-criptomonedas` y `dac8-que-cambia`;
- fichas `bitcoin` y `litecoin`;
- `components/footer.tsx`, `app/api/search/route.ts` y `app/sitemap.ts`;
- `docs/mantenimiento-comparador.md` (sección del calendario).
- [ ] Añadir los enlaces; `npm test` y `npm run build` → PASS; en local, enlaces internos sin errores.
- [ ] Actualizar el recordatorio trimestral (`criptomundo-revision-comparador`) para que revise también el calendario.
- [ ] Commit `Enlaces al calendario`; push y abrir el PR.
