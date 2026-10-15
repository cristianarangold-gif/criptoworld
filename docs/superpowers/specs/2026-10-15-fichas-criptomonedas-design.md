# CriptoMundo: fichas de criptomonedas — diseño

Fecha: 2026-10-15. Aprobado en conversación por el propietario (Cristian Arango).

## 1. Objetivo
Responder a lo que busca alguien en España antes de comprar una criptomoneda concreta: qué es, para qué sirve, cómo funciona, sus riesgos concretos, cómo comprarla con seguridad en España y cómo tributa. Las páginas llevan datos en vivo, pero **ni predicciones de precio ni recomendaciones de compra**. Cada texto se escribe a mano con fuentes: nada de páginas generadas desde plantilla, porque Google las penaliza.

## 2. Decisiones del propietario
- **12 fichas:** Bitcoin, Ethereum, XRP, BNB, Solana, Cardano, Dogecoin, Chainlink, Tron, Avalanche, Polkadot y Litecoin.
- Sin stablecoins: ya tienen lecciones (USDT, USDC, stablecoin).
- Una sola entrega (un PR).

## 3. Contenido
- Cada ficha es `content/criptos/<slug>.md`. Metadatos:
  - `nombre`, `simbolo`;
  - `coingecko` (id de CoinGecko) e `historico` (id en `data/historico-mensual.json`);
  - `descripcion` (máximo 160 caracteres);
  - `lanzamiento` (año) y `creador`;
  - `consenso` (texto corto: «Prueba de trabajo», «Prueba de participación»…);
  - `suministro_max` (texto: «21 millones» o «Sin límite»);
  - `web` (URL oficial), `leccion` (opcional, slug de `/academia`) y `updated`;
  - `sources`: al menos una;
  - `related` (opcional).
- **Cuerpo**, con las secciones exactas:
  - `## Qué es`
  - `## Para qué se usa`
  - `## Cómo funciona`
  - `## Riesgos concretos`
  - `## Cómo comprarla en España con seguridad`
  - `## Cómo tributa`

  700 palabras o más, en español de España, con la voz de un aprendiz que divulga.
- **Solapamiento con las lecciones:** cuando la moneda tiene lección (`/academia/bitcoin`, `/academia/ethereum`), la lección explica el concepto y la ficha cubre el ángulo del inversor (datos, riesgos, compra, impuestos). «Cómo funciona» es un resumen breve que enlaza a la lección.
- **Datos de los textos:** se comprueban con fuentes primarias (whitepaper, documentación oficial, ESMA/CNMV y SEC para el caso de Ripple). Las cifras que cambian (precio, capitalización, posición) **no se escriben en el texto**: salen del bloque de datos en vivo.

## 4. Páginas
- **`/cripto`** (índice):
  - introducción: qué son las fichas y que no son recomendaciones;
  - las 12 monedas con precio en euros y cambio en 24 h, ordenadas por capitalización si hay datos y, si no, por el orden fijo del índice.
- **`/cripto/<slug>`**:
  1. H1 «<Nombre> (<SÍMBOLO>): qué es, riesgos y cómo comprarla en España», autor, fecha «Revisada el…» y descripción.
  2. **Bloque en vivo** desde CoinGecko `/coins/markets?vs_currency=eur&ids=…` (revalidate 300): precio, cambio en 24 h, capitalización, posición, suministro en circulación y máximo. Si CoinGecko falla, el bloque no se muestra y la página sigue.
  3. **Ficha técnica:** lanzamiento, creador, consenso, suministro máximo y web oficial.
  4. **Histórico mensual en euros:** `ValueChart` con la serie de cierres, la peor caída desde un máximo de toda la serie (en %) y el botón «Simula una inversión en <Nombre>», que enlaza a `/herramientas/simulador-historico?moneda=<historico>`.
  5. El texto (Markdown).
  6. Fuentes, relacionados (lección, glosario, respuestas) y el aviso «información general, no es una recomendación de inversión».
  7. JSON-LD: `Article` (autor y fechas) y `BreadcrumbList`.

## 5. Datos y simulador
- El histórico pasa de 8 a 12 monedas: se añaden `trx`, `avax`, `dot` y `ltc` en `scripts/actualizar-historico.mjs` (Binance `XXXUSDT` mensual ÷ tipo del BCE, como las demás) y se regenera `data/historico-mensual.json`.
- **Simulador:** la página de la herramienta lee `?moneda=<id>` y, si existe, el componente `Historico` arranca con esa moneda. Un id desconocido se ignora.

## 6. Dónde aparecen
- **`/mercado`:** en la tabla, el nombre de cada una de las 12 monedas enlaza a su ficha. El clic en la fila sigue abriendo el gráfico.
- **Portada:** un bloque de chips «Fichas de criptomonedas».
- Pie de página, buscador y sitemap.
- No entra en el menú principal (no cabe un 8.º apartado a 1024 px).

## 7. Validación (`npm test`, bloquea el despliegue)
Para cada ficha:
- secciones exactas;
- 700 palabras o más;
- `descripcion` de 1 a 160 caracteres;
- al menos una fuente `https://`;
- `coingecko` no vacío;
- `historico` existente en el JSON;
- `leccion` existente si se indica;
- enlaces internos existentes;
- slugs y `coingecko` sin repetir.

Además:
- hay exactamente 12 fichas;
- las 12 monedas tienen al menos 60 meses de histórico (todas cotizan en Binance desde 2020 o antes).

## 8. Errores, accesibilidad y rendimiento
- Sin dependencias nuevas.
- CoinGecko desde el servidor, con caché y `try/catch`.
- El gráfico tiene `role="img"` y `aria-label`.
- El texto es contenido de servidor.

## 9. Comprobaciones en local
- Las 12 fichas cargan.
- El bloque en vivo aparece, y desaparece con CoinGecko caído (simulado en la copia local).
- El botón del simulador preselecciona la moneda.
- `/mercado` enlaza a las fichas.
- No hay enlaces internos rotos.
- No hay scroll horizontal a 375 px.
