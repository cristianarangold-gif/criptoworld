# CriptoMundo: enriquecimiento visual y nuevas funciones antes de la revisión de AdSense

Fecha: 13 de octubre de 2026 · Estado: aprobado en conversación, pendiente de revisión escrita

## 1. Objetivo y contexto

**Lo que pidió el propietario (Cristian Arango):**
- Prioridad: conseguir la aprobación de AdSense antes que un rediseño completo.
- Añadir herramientas y contenido nuevo que aporten valor.
- Hacer la web más atractiva visualmente (fondo, animaciones, movimiento) **sin rediseñarla**.

**Decisiones tomadas en la conversación:**
- Portada: estilo **C, «gráfico vivo y cinta de precios»**.
- Detalles de movimiento: **2** (brillo que sigue al ratón), **3** (cifras que cuentan hacia arriba) y **4** (barras de progreso).
- Funciones: **glosario A–Z y ruta «Empieza aquí»**, **quizzes en las lecciones**, **test «¿Es una estafa?»** y **simulador histórico con panel de mercado**.

**Criterios de éxito:**
- Ningún contenido de la web queda oculto o invisible al cargar la página, tampoco para el renderizado de Google.
- Todas las páginas nuevas tienen contenido propio y útil, no solo una herramienta vacía, y cumplen las pautas de la Fase 2: autor, fecha de revisión y fuentes cuando hay datos.
- Las animaciones se desactivan con `prefers-reduced-motion` y no penalizan la carga: sin librerías nuevas pesadas y sin imágenes enlazadas desde webs de terceros.
- `npm run build` pasa y cada PR se comprueba en local y en la vista previa antes de fusionarla.

**Fuera de alcance:** rediseño completo (paleta, tipografía, maquetación general), resumen semanal de noticias, newsletter, fichas por moneda y calendario. Quedan para después de la aprobación de AdSense.

## 2. Bloque 1: capa visual (PR 1)

### 2.1 Portada: gráfico vivo y cinta de precios
- Nuevo componente `components/hero-chart.tsx` (cliente), que sustituye el degradado actual de `app/page.tsx`. Contiene:
  - una cuadrícula de fondo en CSS;
  - un SVG con una línea de precio y su área degradada, que se dibuja con `stroke-dashoffset` una sola vez al cargar (no en bucle). Es decorativo: lleva `aria-hidden`.
- El texto, los botones y el resto de la portada siguen siendo **HTML renderizado en el servidor**, visibles desde el primer momento.
- Botones de la portada: principal «Empieza aquí» (`/empieza-aqui`) y secundario «Calculadoras» (`/herramientas`). Como `/empieza-aqui` no existe hasta el PR 2, en el PR 1 el botón principal enlaza a «Guías» (`/aprende`) y el PR 2 lo cambia.
- **Contadores:** «N lecciones · N guías · N herramientas». Las cifras salen de `getAllLessons()`, `getAllGuides()` y `getAllTools()` en el servidor. El componente cliente `components/count-up.tsx` las anima de 0 al valor cuando entran en pantalla (`IntersectionObserver`). **El HTML del servidor ya contiene el número final**: la animación solo lo reproduce.
- **Cinta de precios:** `components/price-ticker.tsx`, al pie de la portada.
  - Datos que recibe desde el servidor: las 6–8 primeras monedas de `getMarketData('eur')` (precio y variación en 24 h) y el índice de miedo y codicia de `lib/sentiment.ts`.
  - Animación en CSS (`translateX`), con la lista duplicada para que el bucle sea continuo. Se pausa al pasar el ratón y con `prefers-reduced-motion`. En ese último caso se muestra como una fila estática con desplazamiento horizontal.
  - Si no hay datos, la cinta no se muestra y la portada no se rompe.

### 2.2 Tarjetas con brillo que sigue al ratón
- Utilidad `components/glow-card.tsx` (cliente): un envoltorio que actualiza las variables CSS `--x` y `--y` con `pointermove` y pinta un `radial-gradient` naranja bajo el cursor, con una ligera elevación (`translateY(-2px)`).
- Solo se activa con `@media (hover: hover)`. En móvil se ve la tarjeta normal.
- Se aplica a las tarjetas de guías (portada y `/aprende`), lecciones (`/academia`) y herramientas (`/herramientas`).

### 2.3 Barras de progreso
- **Progreso de lectura:** `components/reading-progress.tsx`, una barra fina fija bajo la cabecera, con un degradado de naranja a violeta, que se llena según el scroll. Va en las guías y las lecciones. Es decorativa: `aria-hidden`.
- **Progreso de la ruta:** una barra con el porcentaje de pasos completados en `/empieza-aqui` (bloque 2).

### 2.4 Arreglos
- **Contenido invisible:** se eliminan las animaciones de aparición de `framer-motion` que empiezan en `opacity: 0` (`initial="hidden"` / `whileInView`) en `components/home-client.tsx`, `mercado-client.tsx` y `noticias-client.tsx`. El contenido se renderiza visible y sin animación de entrada.
- **Menú (`components/header.tsx`):**
  - Entradas: Empieza aquí · Academia · Guías (`/aprende`) · Herramientas · Mercado · Glosario.
  - Empieza aquí y Glosario se añaden en el PR 2, junto con sus páginas, para no enlazar nunca a páginas que no existen. En el PR 1 el menú queda así: Academia · Guías · Herramientas · Mercado.
  - Noticias sale del menú y pasa al pie de página.
  - «Mi área» pasa a ser un icono con texto accesible (`aria-label`) junto al buscador, sin partirse en dos líneas.
  - El menú móvil mantiene las mismas entradas.
- **Reducir movimiento:** una regla global en `app/globals.css` desactiva animaciones y transiciones cuando `prefers-reduced-motion: reduce`.

## 3. Bloque 2: glosario, ruta y quizzes (PR 2)

### 3.1 Glosario A–Z (`/glosario`)
- **Datos:** `content/glosario.md`, un único archivo con una entrada por término (`### Término`, la definición y un enlace a la lección relacionada). Se genera una primera versión con los **126 términos únicos** de los glosarios de las lecciones y se amplía a **unos 150**, añadiendo términos de las guías: MiCA, CNMV, CASP, FIFO, modelo 721, DAC8, KYC, white paper, slashing, spread…
- Cada definición se revisa a mano para quitar duplicados y unificar el estilo. No se publica ninguna definición generada automáticamente sin revisar.
- `lib/glossary.ts` lee el archivo y genera el *slug* de cada término.
- **Página:** índice de letras, buscador instantáneo en el cliente que filtra la lista ya renderizada en el servidor (todos los términos están en el HTML), anclas `/glosario#slug` y JSON-LD `DefinedTermSet`.
- **Enlaces:** el buscador del sitio incluye los términos. En cada lección, el bloque «Glosario» enlaza cada término a su entrada.

### 3.2 Ruta «Empieza aquí» (`/empieza-aqui`)
- **Datos:** `content/ruta.json`, con 4 etapas y, en cada una, una lista ordenada de pasos `{ tipo: 'leccion' | 'guia' | 'herramienta', slug }`:
  1. **Fundamentos:** bitcoin, blockchain, ethereum, stablecoin, altcoin.
  2. **Comprar y guardar con seguridad:** exchange, guía exchange-autorizado-cnmv, wallet, seed-phrase, guía seguridad-cripto, guía estafas-cripto, test-estafa.
  3. **Hacienda y normativa:** guía mica-regulacion-cripto-espana, guía declarar-criptomonedas-hacienda, guía modelo-721-criptomonedas, calculadora de impuestos.
  4. **Ir más allá:** guía gestion-del-riesgo, guía estrategia-dca, defi, staking, guía analisis-proyectos-cripto, simulador histórico.
- Una validación en el build comprueba que **todos los slugs existen**. Si alguno no existe, el build falla.
- El test de estafa y el simulador histórico no existen hasta el PR 3: el PR 2 publica la ruta sin esos dos pasos, y el PR 3 los añade.
- **Página:** texto introductorio propio, las etapas con sus pasos (título, tipo y tiempo de lectura) y casillas de «hecho».
- **Progreso:** se guarda en `localStorage` (`cm-ruta`), siempre dentro de `try/catch`. Si el usuario tiene la sesión iniciada, se marcan también como hechas las lecciones completadas según `/api/academia/progress`. Barra de avance general y por etapa.

### 3.3 Quizzes en las lecciones
- **Datos:** campo `quiz` en el frontmatter de cada `content/academia/<slug>.md`, una lista de 3–5 preguntas `{ pregunta, opciones: [3–4], correcta: índice, explicacion }`. En total, unas 120 preguntas, todas basadas en el texto revisado de la propia lección.
- **Componente:** `components/lesson-quiz.tsx` (cliente):
  - muestra una pregunta tras otra; al responder, enseña si es correcta y su explicación;
  - al final, la puntuación y, si es baja, un enlace para repasar la lección;
  - si la puntuación es al menos del 60 % y el usuario tiene la sesión iniciada, marca la lección como completada (`POST /api/academia/progress`, `action: 'complete'`).
- Las preguntas se renderizan en el HTML del servidor (enunciado y opciones visibles), y la interactividad se añade en el cliente.
- Una validación en el build comprueba que cada pregunta tiene opciones y que el índice `correcta` es válido.

## 4. Bloque 3: test de estafa, simulador y panel de mercado (PR 3)

### 4.1 Test «¿Es una estafa?» (`/herramientas/test-estafa`)
- Se integra en el sistema de herramientas existente: `content/herramientas/test-estafa.md` con `calculator: estafa`, y un componente nuevo en `components/calculators.tsx`.
- **12 preguntas de sí o no.** Cada una lleva un peso (grave = 3, moderada = 2, leve = 1) y el texto que se muestra si la respuesta es «sí». Las preguntas se basan en la guía de estafas:
  - contacto no solicitado;
  - rentabilidad garantizada o fija;
  - prisa;
  - petición de instalar un programa de acceso remoto;
  - petición de la frase semilla;
  - pago por adelantado para retirar fondos;
  - entidad sin autorización en la CNMV o ESMA;
  - famoso en un anuncio;
  - relación sentimental o de amistad reciente;
  - comisiones por traer a otros;
  - web con pocos datos de la empresa;
  - ofrecimiento de recuperar dinero perdido.
- **Resultado:**
  - «Señales graves», con al menos una señal grave o 5 puntos o más;
  - «Precaución», con 2 a 4 puntos;
  - «Sin señales claras», con 0 o 1 punto. Este nivel aclara que no garantiza que la oferta sea legítima.
  - En todos los casos se muestra la lista de señales detectadas y los pasos siguientes, con enlaces a las advertencias de la CNMV, la guía de estafas, la denuncia y el 017.
- Ninguna respuesta sale del navegador.

### 4.2 Simulador histórico (`/herramientas/simulador-historico`)
- **Datos:** `data/historico-mensual.json`, con el cierre mensual en euros de 8 monedas: BTC, ETH, BNB, SOL, XRP, ADA, DOGE y LINK, desde su primer mes disponible en Binance (2017 para BTC y ETH).
  - Se calcula como el cierre mensual del par `XXXUSDT` en Binance, dividido por el tipo EUR/USD del BCE en el último día hábil de ese mes. Se asume que 1 USDT equivale a 1 USD, y se indica en la página.
  - Lo genera `scripts/actualizar-historico.mjs`, que se ejecuta a mano una vez al mes. El archivo incluye la fecha de actualización y las fuentes.
- **Componente:** `calculator: historico` en `components/calculators.tsx`. Opciones:
  - moneda;
  - modo: todo de golpe o DCA mensual;
  - importe;
  - mes de inicio y mes de fin.
- **Resultado:**
  - total invertido, valor final, ganancia o pérdida y rentabilidad;
  - **peor caída desde un máximo** sufrida durante el periodo, en porcentaje y en euros;
  - un **gráfico SVG** propio, sin librería nueva, con la evolución del valor de la inversión frente a lo aportado.
- La página explica las limitaciones: precios mensuales (no diarios), sin comisiones ni impuestos y con sesgo de supervivencia (solo monedas que siguen existiendo). Incluye un aviso de que una rentabilidad pasada no garantiza nada en el futuro.

### 4.3 Panel de mercado (`/mercado`)
- **Nuevos datos en `lib/sentiment.ts`:**
  - índice de miedo y codicia (`api.alternative.me/fng`), con revalidación cada hora;
  - dominancia de BTC y capitalización total (CoinGecko `/global`), con revalidación cada 10 minutos.
- **Componentes, encima de la tabla:**
  - un velocímetro SVG con el índice y su etiqueta en español;
  - una tarjeta de dominancia de BTC;
  - una tarjeta de capitalización total con su variación en 24 h.
- Cada indicador lleva un texto breve con **qué mide y qué no predice**. Si una fuente falla, solo se oculta su tarjeta.

## 5. Errores, accesibilidad y rendimiento
- **APIs externas** (CoinGecko, alternative.me): siempre desde el servidor, con caché y con `try/catch`. Si fallan, el componente desaparece y la página sigue funcionando.
- **`localStorage`:** siempre dentro de `try/catch`. Sin él, la ruta funciona igual, solo que no recuerda el progreso.
- **Accesibilidad:** foco visible en los controles nuevos, quizzes y test manejables con teclado, `aria-live` en los resultados y SVG decorativos con `aria-hidden`.
- **Rendimiento:** sin dependencias nuevas. Animaciones solo con `transform` y `opacity`, y gráficos en SVG hechos a mano.

## 6. Pruebas y comprobaciones por PR
- `npm run build` pasa en cada PR.
- **Validaciones en el build**, con un fallo explícito si algo no cuadra:
  - slugs de la ruta;
  - estructura de los quizzes;
  - términos del glosario sin duplicados.
- **Comprobaciones en local** (copia de la web en la carpeta temporal y navegador integrado):
  - **PR 1:** el HTML de la portada no contiene `opacity:0`; la cinta muestra datos y se pausa; los contadores terminan en la cifra correcta; la vista móvil a 375 px no tiene scroll horizontal; con `prefers-reduced-motion` no hay animaciones.
  - **PR 2:**
    - todos los términos del glosario tienen ancla y el buscador filtra;
    - la ruta guarda el progreso tras recargar;
    - un quiz completo funciona con teclado;
    - ninguna página tiene enlaces internos rotos.
  - **PR 3:**
    - el test da los tres niveles con casos preparados;
    - el simulador coincide con un cálculo hecho a mano para un caso (BTC, todo de golpe, entre dos meses concretos) y para un DCA corto;
    - la peor caída coincide con el cálculo a mano;
    - el panel se mantiene en pie si se simula un fallo de la API.
- Después de cada fusión, se comprueba la web en producción (criptoworld.org).

## 7. Orden de entrega
1. **PR 1:** capa visual y arreglos.
2. **PR 2:** glosario, ruta y quizzes.
3. **PR 3:** test de estafa, simulador histórico y panel de mercado.

Al terminar el PR 3 y pasadas 2–3 semanas de rastreo, se hace la «revisión final» y el propietario solicita la revisión de AdSense.
