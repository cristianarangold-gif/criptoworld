# CriptoMundo: noticias diarias y respuestas fiscales — diseño

Fecha: 2026-10-15. Aprobado en conversación por el propietario (Cristian Arango).

## 1. Objetivo
Dar a criptoworld.org contenido que cambie cada día y responder a las dudas fiscales y legales más buscadas, sin perder el nivel actual: fuentes, fecha, autor y nada de consejos de inversión. La revisión de AdSense está prevista para principios de noviembre de 2026; las noticias deben empezar cuanto antes para llegar con 2–3 semanas de publicación continua.

Este es el primer proyecto de una serie. Los siguientes, cada uno con su propio diseño: fichas de criptomonedas, comparador de plataformas autorizadas, calendario cripto y fiscal, y resumen semanal con boletín.

## 2. Decisiones del propietario
- **1–2 noticias al día.**
- **Aprobación igual que en Radar IA:** la rutina abre un PR normal por noticia y avisa al móvil; el propietario publica fusionando. Nada se publica sin su revisión.
- **Respuestas: una página por pregunta**, con una página que las agrupa.
- Enfoque elegido: noticias como archivos Markdown en el repositorio (no base de datos ni panel; no traducción automática de RSS).

## 3. Noticias diarias

### 3.1 Contenido y páginas
- Cada noticia es `content/noticias/<slug>.md`. Metadatos:
  - `titulo`;
  - `descripcion` (máximo 160 caracteres);
  - `fecha` (AAAA-MM-DD);
  - `fuentes`: lista de `{ title, url }`, al menos una;
  - `relacionados` (opcional): enlaces internos `{ title, href }`.
- `lib/news.ts` las lee (como `lib/guides.ts`), las ordena de más reciente a más antigua y normaliza la fecha.
- `/noticias`: listado paginado (12 por página, `?pagina=N`) con título, fecha y descripción. Es indexable cuando hay al menos una noticia; si no hay ninguna, muestra un texto y queda en `noindex`.
- `/noticias/<slug>`: la noticia con fecha, autor (enlace a `/sobre-nosotros`), cuerpo, fuentes y relacionados, más JSON-LD `NewsArticle` (`headline`, `datePublished`, `dateModified`, `author`, `publisher`, `mainEntityOfPage`).
- Se elimina la lista de titulares RSS: `app/noticias/page.tsx` actual, `components/noticias-client.tsx`, `app/api/news/route.ts` y `lib/rss.ts` (si nadie más lo usa). El buscador (`app/api/search/route.ts`) deja de usar el RSS e incluye las noticias propias.
- **Menú:** «Noticias» entra en el menú principal, después de «Empieza aquí». Debe caber en una línea a 1024 px; si no cabe, se resuelve con espaciado, nunca quitando apartados.
- **Portada:** bloque «Últimas noticias» con las 3 más recientes; no se muestra si no hay noticias.
- **Sitemap** con cada noticia y su `lastModified`.

### 3.2 Guía editorial (`content/GUIA_NOTICIAS.md`)
- **Extensión:** 400–800 palabras.
- **Estructura:**
  1. párrafo de entrada (qué ha pasado, quién y cuándo);
  2. `## Qué ha pasado`;
  3. `## Qué significa para ti si vives en España`;
  4. `## Para entenderlo`, con 1–3 enlaces internos a lecciones, guías, glosario, herramientas o respuestas.
- **Prioridad:**
  - regulación (MiCA, CNMV, ESMA, Hacienda, DAC8, Banco de España, BCE y euro digital);
  - seguridad, hackeos y estafas;
  - cambios relevantes en Bitcoin, Ethereum y stablecoins;
  - movimientos grandes de mercado solo si tienen causa clara.
- **Se descarta:** noticias de un token concreto que «sube un X %», contenido patrocinado, notas de prensa de proyectos pequeños y rumores.
- **Prohibido:**
  - predecir precios;
  - recomendar comprar o vender;
  - copiar o traducir párrafos;
  - citas de más de una frase;
  - cifras sin fuente;
  - escribir «hemos probado».
- Las cifras de precio indican la fuente y el momento.
- Tono de divulgador aprendiz, como el resto de la web: explica, no aconseja.

### 3.3 Recogida de candidatas
- `scripts/noticias-candidatas.mjs` (Node, sin dependencias nuevas) lee las fuentes de `data/fuentes-noticias.txt`, una por línea con el formato `nombre | url | oficial|medio`.
- Fuentes con RSS comprobado el 2026-10-15:
  - CoinDesk, Cointelegraph, The Block, Decrypt y CriptoNoticias (medios);
  - ESMA, BCE (notas de prensa) y Comisión Europea (oficiales).
- La CNMV, la Agencia Tributaria y el Banco de España no tienen RSS accesible: la rutina las consulta buscando en la web lo publicado en las últimas 24 horas.
- **Salida:** Markdown con las candidatas de las últimas 26 horas, primero las oficiales y después por fecha, con un máximo de 15. Si no hay ninguna, no escribe nada (código de salida 0). Si una fuente falla, se anota en la salida y se sigue con las demás.
- La lógica de lectura de RSS/Atom y de filtrado vive en `lib/news-feed.ts`, que es pura y tiene pruebas. El script solo descarga e imprime.

### 3.4 Rutina diaria
- Rutina en la nube de Claude Code, a las 06:30 hora de Madrid (`30 4 * * *` UTC en horario de verano; se revisa al cambiar la hora), sobre el repositorio `cristianarangold-gif/criptoworld`.
- Sus instrucciones están en `docs/rutina-noticias.md`:
  1. ejecutar el script de candidatas y buscar noticias oficiales españolas de las últimas 24 horas;
  2. elegir 1–2 candidatas;
  3. comprobar que no estén ya publicadas en `content/noticias/` ni en un PR abierto;
  4. leer la fuente primaria completa (si no puede, descarta la candidata);
  5. redactar siguiendo la guía;
  6. ejecutar `npm test`;
  7. abrir un PR normal por noticia en una rama `noticia/<slug>`, con título «Noticia: <titular>» y, en el cuerpo, las fuentes leídas y las candidatas descartadas con su motivo;
  8. enviar un aviso al móvil con los titulares y enlaces, o el motivo si hoy no hay noticia.
- La rutina nunca fusiona ni hace push a `main`.
- **No hay workflow de GitHub ni issue diaria:** en Radar IA el cron de GitHub llegaba con horas de retraso; aquí la propia rutina recoge las candidatas.
- **Acciones del propietario, una sola vez:** instalar la app de Claude para GitHub en el repositorio `criptoworld` y aprobar la creación de la rutina. La rutina se crea después de fusionar el PR A, y el primer día se lanza a mano para revisar el resultado.

### 3.5 Validación (pruebas en `npm test`, que bloquean el despliegue)
Para cada noticia en `content/noticias/`:
- `titulo` no vacío;
- `descripcion` de 1 a 160 caracteres;
- `fecha` válida y no futura;
- al menos una fuente con URL `https://`;
- las tres secciones `##` obligatorias;
- 400 palabras o más en el cuerpo;
- los enlaces internos del cuerpo y de `relacionados` apuntan a páginas existentes (lecciones, guías, herramientas, glosario, respuestas o noticias);
- slugs sin repetir.

## 4. Respuestas fiscales y legales

### 4.1 Contenido y páginas
- Cada respuesta es `content/respuestas/<slug>.md`. Metadatos:
  - `pregunta`;
  - `descripcion` (máximo 160 caracteres);
  - `categoria`: `hacienda` | `normativa` | `seguridad-herencias`;
  - `corta`: la respuesta corta, de 25 a 70 palabras;
  - `updated`;
  - `sources`: al menos una oficial, de `agenciatributaria.gob.es`, `boe.es`, `cnmv.es`, `eur-lex.europa.eu`, `esma.europa.eu` o `hacienda.gob.es`;
  - `related` (opcional).
- El cuerpo es la explicación con un ejemplo con números cuando aplique, de 300 palabras o más.
- `lib/answers.ts` las lee y agrupa por categoría.
- `/respuestas`: página índice, con introducción y la lista por categorías.
- `/respuestas/<slug>`:
  - la pregunta como H1;
  - la respuesta corta destacada;
  - la explicación;
  - el aviso «información general, no asesoramiento fiscal»;
  - fuentes, fecha de revisión y relacionados;
  - JSON-LD `FAQPage` con una sola pregunta y su respuesta corta.
- **Enlaces:** desde la etapa 3 de la ruta (la respuesta 1), el pie de página, las guías de Hacienda y del modelo 721, la calculadora del IRPF, el buscador y el sitemap.

### 4.2 Las 20 preguntas
**Hacienda:**
1. ¿Tengo que declarar si no he vendido?
2. ¿Cambiar una cripto por otra tributa?
3. ¿Pagar con cripto tributa?
4. ¿Cómo se calcula la ganancia (FIFO)?
5. ¿Puedo compensar pérdidas?
6. ¿Cómo tributa el staking?
7. ¿Y los airdrops?
8. ¿Y la minería?
9. ¿Pasar de un exchange a mi wallet tributa?
10. ¿Comprar con euros tributa?
11. ¿Qué pasa si no declaro?
12. ¿Cuándo hay que presentar el modelo 721?
13. ¿Qué son los modelos 172 y 173?
14. ¿Qué cambia con DAC8?
15. ¿Las stablecoins tributan igual?

**Seguridad y herencias:**
16. ¿Cómo declaro una estafa o un hackeo?
17. ¿Cómo se heredan y tributan?
18. ¿Hay que pagar el Impuesto sobre el Patrimonio?

**Normativa:**
19. ¿Es legal comprar criptomonedas en España?
20. ¿Qué exchanges pueden operar en España con MiCA?

Cada respuesta se verifica con la fuente oficial antes de escribirla. Si la norma o la doctrina de Hacienda no son claras, la página lo dice y explica las posturas, sin inventar una respuesta firme.

### 4.3 Validación
- `corta` de 25 a 70 palabras;
- `categoria` válida;
- al menos una fuente oficial (dominios de 4.1);
- 300 palabras o más en el cuerpo;
- enlaces internos existentes;
- slugs sin repetir;
- exactamente 20 respuestas en esta entrega.

## 5. Errores, accesibilidad y rendimiento
- Sin dependencias nuevas.
- El script de candidatas tolera fuentes caídas.
- Las páginas son contenido de servidor, sin JavaScript necesario para leerlas.
- Se mantienen el foco visible, los encabezados en orden y el contraste actual.
- El test `no-hidden-content` sigue pasando.

## 6. Pruebas y comprobaciones
- `npm test` y `npm run build` pasan en cada PR.
- **En local:**
  - `/noticias` con 0 noticias (`noindex` y el texto de espera) y con noticias de ejemplo de las pruebas;
  - paginación;
  - JSON-LD válido;
  - el menú con 7 apartados en una línea a 1024 y 1280 px y sin scroll horizontal a 375 y 820 px;
  - las 20 respuestas cargan;
  - ningún enlace interno roto.
- **Tras fusionar:** comprobación en producción. La primera ejecución de la rutina se revisa con el propietario.

## 7. Entrega
- **PR A:**
  - sección de noticias y borrado del RSS;
  - `lib/news.ts`, `lib/news-feed.ts` y el script de candidatas;
  - la guía editorial y `docs/rutina-noticias.md`;
  - menú, portada y sitemap.

  Sin noticias publicadas: la primera llega con la rutina.
- **Tras fusionar el PR A:** se crea la rutina y se lanza a mano.
- **PR B:** las 20 respuestas, `/respuestas` y los enlaces desde el resto de la web.
