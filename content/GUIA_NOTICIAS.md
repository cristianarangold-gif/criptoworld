# Guía editorial de noticias de CriptoMundo (uso interno, no se publica)

Se aplica a todas las noticias de `content/noticias/`, también a las que redacta la rutina diaria (`docs/rutina-noticias.md`). `npm test` comprueba automáticamente los puntos marcados con ✔: si alguno falla, Vercel no publica.

## 1. Qué cubrimos
**Prioridad**, de más a menos:
1. **Regulación y Hacienda**: MiCA, CNMV, ESMA, Agencia Tributaria, DAC8, Banco de España, BCE y euro digital.
2. **Seguridad**: hackeos de plataformas, estafas que circulan en España, advertencias de la CNMV.
3. **Cambios relevantes en Bitcoin, Ethereum y las stablecoins**: actualizaciones de red, emisores, cambios de licencia.
4. **Movimientos grandes del mercado** con una causa clara, identificada en fuentes fiables (por ejemplo, Bitcoin cae o sube más de un 5 % en un día por un dato de inflación o una decisión de un banco central). Se explican la causa y el contexto, sin predecir lo que vendrá.

**Si en las últimas 24 horas no hay nada de las prioridades 1–3**, antes de quedarte sin noticia:
- busca un tema de las prioridades 1–2 de **los últimos 7 días** que todavía no esté publicado (por ejemplo, un cambio legal o una advertencia de la CNMV de hace unos días);
- o cubre el movimiento de mercado más relevante del día si cumple el punto 4.

El objetivo es **una noticia útil cada día**. Solo se deja el día sin noticia si nada cumple esta guía.

**Se descarta:**
- noticias de un token concreto que «sube un X %»;
- contenido patrocinado o notas de prensa de proyectos pequeños;
- rumores y filtraciones sin confirmar;
- temas ya publicados en `content/noticias/`;
- dos noticias de mercado seguidas: si ayer se publicó una de precio, hoy se prioriza otro tema.

## 2. Formato del archivo
Ruta: `content/noticias/<slug>.md`. El slug va en minúsculas, sin acentos y con guiones, y describe el tema (`esma-directrices-stablecoins`, no `noticia-15-octubre`).

```markdown
---
titulo: "Titular claro, sin clickbait y sin signos de exclamación"
descripcion: "Una o dos frases que resumen la noticia (máximo 160 caracteres)."
fecha: 2026-10-15
fuentes:
  - title: "ESMA: título de la nota de prensa"
    url: "https://www.esma.europa.eu/..."
relacionados:
  - title: "MiCA: qué cambia en España con la regulación europea de criptoactivos"
    href: "/aprende/mica-regulacion-cripto-espana"
---
Párrafo de entrada: qué ha pasado, quién y cuándo, en 2–4 frases.

## Qué ha pasado

## Qué significa para ti si vives en España

## Para entenderlo
```

**Comprobaciones automáticas:**
- ✔ `titulo` no vacío.
- ✔ `descripcion` de 1 a 160 caracteres.
- ✔ `fecha` válida y no futura (la del día en que se redacta).
- ✔ Al menos una fuente, todas con `https://`. La primera es la fuente primaria: la nota oficial o el medio que dio la noticia.
- ✔ Las tres secciones `##` con ese texto exacto.
- ✔ 400 palabras o más; el objetivo es entre 400 y 800.
- ✔ Enlaces internos que existan: `/academia/<slug>`, `/aprende/<slug>`, `/herramientas/<slug>`, `/glosario#<término>`, `/respuestas/<slug>` o `/noticias/<slug>`.

## 3. Cómo se escribe
- **Español de España**, tono cercano y claro, con la voz de un aprendiz que divulga: se explica, no se aconseja. El autor es Cristian Arango.
- **«Qué ha pasado»:** los hechos, con fechas y cifras de la fuente. Las cifras de precio indican la fuente y el momento: «según CoinGecko, a las 9:00 del 15 de octubre».
- **«Qué significa para ti si vives en España»:** la parte que no tienen los medios en inglés. Qué cambia para quien tiene o quiere tener criptomonedas en España: en la Renta, en el exchange que usa, en su seguridad. Si no cambia nada en la práctica, se dice.
- **«Para entenderlo»:** 1–3 enlaces internos a las lecciones, guías, glosario, herramientas o respuestas que expliquen los conceptos de la noticia, cada uno con una frase de por qué leerlo.

**Prohibido:**
- predecir precios o insinuar hacia dónde irá el mercado;
- recomendar comprar, vender o mantener;
- copiar o traducir párrafos de la fuente: siempre se resume con palabras propias;
- citas literales de más de una frase (y siempre atribuidas);
- cifras sin fuente;
- escribir «hemos probado», «nuestro análisis» o cualquier cosa que sugiera pruebas propias;
- signos de exclamación en el titular.

**Si un dato no se ha podido comprobar en la fuente primaria, no se publica.**

## 4. Resumen semanal

El resumen de cada lunes (`content/resumenes/<AAAA>-semana-<NN>.md`) sigue las mismas reglas que las noticias: nada de predicciones ni recomendaciones, cifras con fuente y sin copiar párrafos. Su estructura y sus pasos están en `docs/rutina-resumen.md`. `npm test` comprueba:

- ✔ El slug `AAAA-semana-NN` (semana ISO), con `inicio` el lunes y `fin` el domingo de esa semana.
- ✔ `publicado` no futuro, `descripcion` de 160 caracteres como máximo y fuentes `https://`.
- ✔ Las cinco secciones exactas: «Las noticias de la semana», «Lo que importa si vives en España», «El mercado en siete días», «Próximas fechas» y «Para aprender esta semana».
- ✔ 400 palabras o más y enlaces internos existentes.

