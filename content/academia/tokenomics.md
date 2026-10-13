---
updated: 2026-10-13
sources:
  - title: "Reglamento (UE) 2023/1114 (MiCA): contenido obligatorio del white paper, EUR-Lex"
    url: "https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32023R1114"
  - title: "ethereum.org: Estándar de token ERC-20"
    url: "https://ethereum.org/es/developers/docs/standards/tokens/erc-20/"
  - title: "Satoshi Nakamoto: Bitcoin, a Peer-to-Peer Electronic Cash System (white paper, 2008)"
    url: "https://bitcoin.org/bitcoin.pdf"
quiz:
  - {"pregunta": "¿Cómo se calcula la capitalización de mercado?", "opciones": ["Precio × tokens en circulación", "Precio × oferta máxima", "Volumen diario × 365"], "correcta": 0, "explicacion": "La valoración totalmente diluida, en cambio, usa la oferta máxima."}
  - {"pregunta": "Si solo circula el 10 % de la oferta y el resto se irá liberando, ¿qué riesgo hay?", "opciones": ["Ninguno", "Mucha presión vendedora futura", "Que el token desaparezca"], "correcta": 1, "explicacion": "Para mantener el precio, la demanda tendría que crecer en la misma proporción."}
  - {"pregunta": "¿Qué es un calendario de vesting?", "opciones": ["Un plan de pagos de comisiones", "La fecha de lanzamiento", "El ritmo al que se desbloquean los tokens de equipo e inversores"], "correcta": 2, "explicacion": "Los grandes desbloqueos suelen coincidir con caídas de precio."}
  - {"pregunta": "¿Genera demanda por sí solo un token que solo sirve para votar?", "opciones": ["Sí, siempre", "No necesariamente", "Solo en mercados alcistas"], "correcta": 1, "explicacion": "Un derecho de voto sin usos ni ingresos depende sobre todo de la especulación."}
---
## Qué es la tokenomics

**Tokenomics** (de *token* y *economics*) es el diseño económico de un token: cuántos existen, cómo se crean y se destruyen, quién los recibió al principio, cuándo pueden venderse y para qué sirven. Es una de las partes más importantes al estudiar un proyecto, porque determina buena parte de la oferta y la demanda futuras.

## Las cifras clave

| Concepto | Qué significa |
|---|---|
| Oferta en circulación | Tokens que ya pueden comprarse y venderse |
| Oferta total | Tokens creados, incluidos los bloqueados |
| Oferta máxima | Límite que nunca se superará (si existe) |
| Capitalización de mercado | Precio × oferta en circulación |
| Valoración totalmente diluida (FDV) | Precio × oferta máxima |

Si la capitalización es muy inferior a la valoración totalmente diluida, hay muchos tokens por liberar. Ejemplo: un token a 2 € con 100 millones en circulación y 1.000 millones de oferta máxima tiene una capitalización de 200 millones de euros, pero una valoración diluida de 2.000 millones. Para que el precio se mantenga cuando se liberen los 900 millones restantes, la demanda tendría que multiplicarse.

## Emisión: ¿se crean tokens nuevos?

- **Oferta fija:** Bitcoin tiene un máximo de 21 millones y un calendario de emisión conocido.
- **Emisión continua:** muchas redes emiten tokens nuevos para recompensar a validadores o usuarios. Eso es inflación: diluye a los que ya los tienen.
- **Quema:** algunos protocolos destruyen tokens, por ejemplo con parte de las comisiones, como hace [Ethereum](/academia/gas).

Lo relevante es el **balance neto**: ¿la oferta crece o decrece, y a qué ritmo?

## Reparto inicial y desbloqueos

Mira qué porcentaje recibieron el equipo, los inversores privados, la fundación, la comunidad y los usuarios. Un reparto en el que los iniciados tienen la mayoría significa que controlan el proyecto y que pueden vender grandes cantidades.

Esos tokens suelen liberarse según un **calendario de desbloqueo** (*vesting*): por ejemplo, un año sin poder vender y después liberación mensual durante tres años. Las fechas de grandes desbloqueos suelen coincidir con presión vendedora. Muchos proyectos publican su calendario, y hay herramientas que lo resumen.

## Utilidad: ¿por qué alguien querría el token?

- **Pagar comisiones** de la red.
- **Garantía** en un sistema de [staking](/academia/staking).
- **Gobernanza:** votar cambios del protocolo. Ojo: un derecho de voto sin ingresos ni usos no genera demanda por sí solo.
- **Acceso** a un servicio.

Si el único motivo para tener el token es que "va a subir", la demanda depende solo de la especulación.

## Con MiCA, por escrito

En la UE, quien ofrezca un criptoactivo al público debe publicar un *white paper* con información sobre el emisor, el proyecto, los derechos que da el token, la tecnología y los riesgos. Es un buen punto de partida, aunque no lo revise ninguna autoridad en cuanto a su calidad como inversión.

## Señales de alarma

- Gran parte de la oferta en pocas direcciones.
- Desbloqueos masivos próximos.
- Emisión alta sin un uso que genere demanda.
- Contratos que permiten al equipo crear tokens a voluntad.

Lo resumimos en la plantilla de [cómo analizar un proyecto cripto](/aprende/analisis-proyectos-cripto).
