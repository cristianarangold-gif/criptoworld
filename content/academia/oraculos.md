---
updated: 2026-10-13
sources:
  - title: "ethereum.org: Oráculos"
    url: "https://ethereum.org/es/developers/docs/oracles/"
  - title: "ethereum.org: Seguridad de contratos inteligentes"
    url: "https://ethereum.org/es/developers/docs/smart-contracts/security/"
quiz:
  - {"pregunta": "¿Para qué sirve un oráculo?", "opciones": ["Para minar bloques", "Para llevar datos del mundo exterior, como precios, a la blockchain", "Para guardar claves"], "correcta": 1, "explicacion": "Un contrato inteligente no puede consultar por sí mismo datos externos."}
  - {"pregunta": "¿Qué pasa si un contrato recibe un dato falso de un oráculo?", "opciones": ["Toma una decisión equivocada con total fidelidad", "Lo detecta y lo corrige solo", "Se detiene automáticamente"], "correcta": 0, "explicacion": "Un contrato es tan fiable como los datos que recibe."}
  - {"pregunta": "¿Qué suelen usar los ataques de manipulación de precios en DeFi?", "opciones": ["Contraseñas robadas", "Ataques al hardware", "Préstamos instantáneos para mover el precio de un pool poco líquido"], "correcta": 2, "explicacion": "Todo ocurre en una sola transacción; la defensa es usar oráculos que combinen muchas fuentes."}
  - {"pregunta": "¿Qué oráculo es más robusto?", "opciones": ["Una sola web de precios", "Una red descentralizada que combina muchas fuentes", "El precio de un pool pequeño"], "correcta": 1, "explicacion": "Combinar fuentes independientes dificulta la manipulación."}
---
## El problema del oráculo

Una blockchain solo conoce lo que ocurre dentro de ella. Un [contrato inteligente](/academia/smart-contracts) no puede consultar por sí mismo el precio del euro, el resultado de un partido o la temperatura de una ciudad. Y, sin embargo, muchas aplicaciones necesitan esos datos: un protocolo de préstamos tiene que saber cuánto vale tu garantía para decidir si te liquida.

Un **oráculo** es el sistema que lleva datos del mundo exterior a la blockchain. Y aquí aparece la paradoja: un contrato puede ser perfecto y descentralizado, pero si recibe un dato falso, tomará una decisión equivocada con total fidelidad. **Un contrato es tan fiable como los datos que recibe.**

## Tipos de oráculos

| Tipo | Cómo funciona | Riesgo |
|---|---|---|
| Centralizado | Una sola entidad publica el dato | Si falla o miente, el contrato falla |
| Red descentralizada | Muchos operadores independientes reportan el dato y se combina (por ejemplo, la mediana) | Más robusto, aunque depende de la calidad de las fuentes |
| Precio de un exchange descentralizado | El contrato lee el precio de un pool de liquidez | Se puede manipular con operaciones grandes o préstamos instantáneos |

Existen redes de oráculos especializadas que agregan precios de muchas fuentes y los publican en la blockchain cada cierto tiempo o cuando el precio se mueve más de un umbral.

## Ataques de manipulación

Uno de los ataques más repetidos en [DeFi](/academia/defi) consiste en manipular el precio que lee un protocolo:

1. El atacante pide un **préstamo instantáneo** (*flash loan*) de una gran cantidad, que debe devolver en la misma transacción.
2. Usa ese dinero para mover el precio de un pool poco líquido del que el protocolo obtiene su precio.
3. Con el precio falseado, pide prestado mucho más de lo que su garantía vale realmente, o provoca liquidaciones.
4. Devuelve el préstamo y se queda la diferencia.

Todo ocurre en segundos. La defensa es usar oráculos que combinen muchas fuentes y precios promediados en el tiempo.

## Más allá de los precios

- **Aleatoriedad verificable** para sorteos o juegos en blockchain.
- **Resultados de eventos** para mercados de predicción o seguros.
- **Pruebas de reservas** que publican si los activos que respaldan un token existen.
- **Mensajes entre blockchains**, una función que se solapa con la de los [puentes](/academia/bridges).

## Qué mirar como usuario

Antes de depositar en un protocolo de préstamos o en una [stablecoin](/academia/stablecoin) que depende de precios, pregunta: ¿de dónde saca el precio? ¿De una sola fuente o de varias? ¿Qué pasa si el oráculo deja de actualizarse? Los protocolos serios lo explican en su documentación.
