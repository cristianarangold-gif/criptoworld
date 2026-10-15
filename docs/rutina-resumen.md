# Rutina semanal del resumen de CriptoMundo (instrucciones para el agente)

Eres el redactor del resumen semanal de CriptoMundo (https://criptoworld.org). Trabajas en el repositorio `cristianarangold-gif/criptoworld`. **Nunca publicas nada**: tu trabajo termina en un pull request normal (no borrador) que Cristian Arango revisa y fusiona. Tienes prohibido fusionar, hacer push a `main` o cambiar archivos fuera de `content/resumenes/`.

Antes de empezar, lee `content/GUIA_NOTICIAS.md` (también se aplica al resumen) y su apartado «Resumen semanal».

## Pasos

1. **Prepara el entorno:** ejecuta `npm ci`.
2. **Calcula la semana:** `npx tsx scripts/semana-anterior.ts` imprime el `slug`, el `inicio` (lunes) y el `fin` (domingo) de la semana que vas a resumir. El archivo será `content/resumenes/<slug>.md`. Si ya existe en `main` o en un PR abierto (`gh pr list --state open --search "Resumen semanal"`), avisa a Cristian (paso 8) y termina.
3. **Reúne el material:**
   - las noticias de `content/noticias/` con `fecha` entre `inicio` y `fin`, ambos incluidos;
   - las fechas próximas de `data/calendario.json` (las 2–4 siguientes a hoy);
   - el cambio semanal de Bitcoin y Ethereum en euros. Consulta CoinGecko, por ejemplo `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=eur&days=9&interval=daily`, y usa el cierre del domingo frente al del domingo anterior. Cita la fuente y la fecha en el texto.
4. **Redacta** `content/resumenes/<slug>.md` con los metadatos:
   - `titulo`: «Resumen semanal: …», con lo más importante de la semana y sin signos de exclamación;
   - `descripcion`: 160 caracteres como máximo;
   - `inicio`, `fin` y `publicado` (hoy, en Madrid);
   - `fuentes`: CoinGecko y las fuentes primarias de lo que cites que no esté ya en una noticia publicada.

   Después un párrafo de entrada y las secciones exactas:
   1. `## Las noticias de la semana`: cada noticia publicada esa semana en 2–3 líneas, con enlace a `/noticias/<slug>`. Si no hubo noticias publicadas, dilo y resume lo más relevante de la semana con sus fuentes.
   2. `## Lo que importa si vives en España`: la idea práctica de la semana.
   3. `## El mercado en siete días`: el cambio de BTC y ETH con su fuente. Explica el contexto, pero **no predigas** ni recomiendes nada.
   4. `## Próximas fechas`: enlazadas a `/calendario`.
   5. `## Para aprender esta semana`: una lección, guía, respuesta o ficha relacionada con la semana, con el motivo.

   Extensión: 400–700 palabras.
5. **Valida** con `npm test`. Todo debe pasar.
6. **Abre el PR:**
   1. crea la rama `resumen/<slug>` desde `main`;
   2. haz el commit solo del archivo nuevo;
   3. ábrelo con el título «Resumen semanal: semana NN de AAAA» y, en el cuerpo, un resumen en dos líneas y las fuentes consultadas.
7. **No toques Brevo ni envíes nada:** cuando Cristian fusione, un workflow crea el borrador del boletín y él lo envía.
8. **Avisa a Cristian** con una notificación al móvil: el enlace al PR o el motivo si no lo has abierto.
