# CriptoMundo: calendario cripto y fiscal — diseño

Fecha: 2026-10-15. Aprobado en conversación por el propietario (Cristian Arango).

## 1. Objetivo
Una página con las fechas que importan a quien tiene criptomonedas en España, para no perderse ningún plazo y para que el lector vuelva cuando llega cada uno.

## 2. Decisiones del propietario
- **Contenido:** fechas oficiales (Hacienda y normativa) más hitos técnicos previsibles de las redes. No se incluyen reuniones de bancos centrales ni eventos de mercado.
- **Suscripción:** sí. Hay un `.ics` de suscripción y un botón «Añadir» por fecha.

## 3. Datos: `data/calendario.json`
`{ revisado: 'AAAA-MM-DD', eventos: Evento[] }`

Cada evento (`Evento`):
- `id` (kebab-case, único);
- `titulo`;
- `categoria`: `hacienda` | `normativa` | `red`;
- `inicio` (AAAA-MM-DD) y `fin` (opcional, igual o posterior a `inicio`);
- `aproximada`: boolean. Si es `true`, la página muestra «Fecha aproximada» y el texto explica de dónde sale la estimación;
- `descripcion`: 1–3 frases;
- `enlace` (opcional): `{ title, href }` interno;
- `fuente`: `{ title, url }` con `https://`.

**Contenido mínimo,** verificado en fuentes oficiales durante la implementación; lo que no se confirme no entra:
- **Hacienda:**
  - segundo plazo de la Renta 2025 (5-11-2026);
  - valoración a 31 de diciembre de 2026 (721 y Patrimonio);
  - modelos 172/173 de los proveedores (enero de 2027);
  - modelo 721 (1-1 a 31-3-2027);
  - campaña de la Renta y el Patrimonio 2026 (abril–30 de junio de 2027, aproximada hasta que la AEAT publique su calendario);
  - segundo plazo de la Renta 2026 (5-11-2027).
- **Normativa:**
  - primer intercambio de información DAC8 entre administraciones de la UE (2027);
  - aplicación del Reglamento europeo contra el blanqueo, con sus restricciones a cuentas anónimas y monedas de privacidad en los proveedores, si se confirma la fecha en el texto oficial.
- **Red:**
  - halving de Litecoin (2027, aproximada);
  - halving de Bitcoin (2028, aproximada), estimados a partir de la altura de bloque actual;
  - actualizaciones de Ethereum solo si tienen fecha anunciada oficialmente.

**Validación** (`npm test`, bloquea el despliegue):
- fechas válidas y `fin ≥ inicio`;
- `fuente` con `https://`;
- `enlace.href` existente;
- ids únicos;
- categorías válidas;
- `revisado` es una fecha válida;
- al menos un evento futuro en cada categoría, respecto a la fecha del build.

## 4. Página `/calendario`
- **H1:** «Calendario cripto y fiscal».
- **Introducción:** qué incluye y cómo se mantiene, con la fecha de revisión y el autor.
- **Botón de suscripción** con `webcal://criptoworld.org/calendario.ics`, más un enlace `https` alternativo. Debajo, instrucciones breves para Google Calendar, iPhone y Outlook.
- **Filtros** por categoría: componente cliente. El HTML inicial muestra todo.
- **«Próximas fechas»**, agrupadas por mes. Cada evento muestra:
  - la fecha (o el rango) y la etiqueta de su categoría;
  - «Fecha aproximada», si procede;
  - la descripción, el enlace interno y la fuente;
  - los botones «Google Calendar» (enlace de plantilla) y «.ics».
- **«Ya pasado»:** los eventos cuyo `fin` (o `inicio`) es anterior a hoy, en un `<details>`. La página se regenera cada día (`revalidate = 86400`).
- **Texto propio** («Cómo usar este calendario», «Por qué el 31 de diciembre importa tanto»…) de 600 palabras o más.
- **JSON-LD:** `Event` por cada fecha futura (nombre, fechas, `eventStatus` programado, `eventAttendanceMode` online, `location` virtual con la URL de la fuente) y `BreadcrumbList`.

## 5. Archivos `.ics`
- **`/calendario.ics`** (route handler, `text/calendar; charset=utf-8`):
  - todos los eventos como eventos de día completo (`DTSTART;VALUE=DATE`, con `DTEND` al día siguiente del fin);
  - `UID` estable: `<id>@criptoworld.org`;
  - `SUMMARY`, `DESCRIPTION` (con «Fecha aproximada» si procede y la URL de la página) y `URL`;
  - `X-WR-CALNAME` «CriptoMundo: calendario cripto y fiscal»;
  - líneas de 75 octetos como máximo y escape de `,`, `;`, `\` y saltos de línea.
- **`/calendario/<id>.ics`:** un solo evento con el mismo formato.
- **Funciones puras** con pruebas en `lib/calendar.ts`: `toIcs(eventos, opts)`, `googleCalendarUrl(evento)`, `upcoming(eventos, hoy)` y `past(eventos, hoy)`.

## 6. Enlaces
- Guías de Hacienda y del modelo 721.
- Respuestas sobre el 721, el Patrimonio y la DAC8.
- Fichas de Bitcoin y Litecoin.
- Pie de página, buscador y sitemap.

## 7. Mantenimiento
- Cada enero se añaden las fechas fiscales del año siguiente.
- Cuando la AEAT publique el calendario de la Renta, se confirman las fechas aproximadas.
- Se añade una línea al recordatorio trimestral del comparador para revisar también el calendario.
- La validación «al menos un evento futuro por categoría» obliga a mantenerlo.

## 8. Comprobaciones en local
- Las rutas `.ics` devuelven `text/calendar` válido: un parser simple lee todos los `VEVENT`.
- Los filtros funcionan con teclado.
- No hay scroll horizontal a 375 px.
- No hay enlaces rotos.
- El JSON-LD es válido.
