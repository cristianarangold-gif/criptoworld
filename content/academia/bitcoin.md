---
updated: 2026-10-13
practicalExamples:
  - "Comprar una fracción de bitcoin (por ejemplo, 50 € en satoshis) en una plataforma autorizada"
  - "Enviar BTC a otra persona en cualquier país pagando solo la comisión de la red, sin depender de horarios bancarios"
  - "Guardar BTC a largo plazo en una wallet propia de la que solo tú tienes la frase semilla"
  - "Consultar en un explorador de bloques cualquier transacción pública de la red"
advantages:
  - "Oferta máxima fija de 21 millones, conocida de antemano"
  - "Ninguna empresa ni gobierno controla la red por sí solo"
  - "Funciona sin interrupciones relevantes desde enero de 2009"
  - "Código abierto, revisado por desarrolladores de todo el mundo"
  - "Transferencias a cualquier lugar del mundo, 24 horas al día"
sources:
  - title: "Satoshi Nakamoto: Bitcoin, a Peer-to-Peer Electronic Cash System (white paper, 2008)"
    url: "https://bitcoin.org/bitcoin.pdf"
  - title: "Bitcoin.org: Cómo funciona Bitcoin"
    url: "https://bitcoin.org/es/como-funciona"
  - title: "Bitcoin.org: Lo que debes saber"
    url: "https://bitcoin.org/es/debes-saber"
  - title: "CNMV: riesgos de los criptoactivos y Reglamento MiCA"
    url: "https://www.cnmv.es/portal/mica/regulacion-criptoactivos"
quiz:
  - {"pregunta": "¿Cuántos bitcoins existirán como máximo?", "opciones": ["21 millones", "100 millones", "No hay límite"], "correcta": 0, "explicacion": "Las reglas de Bitcoin fijan una oferta máxima de 21 millones; los nuevos solo se crean como recompensa a los mineros."}
  - {"pregunta": "¿Qué ocurre en un halving?", "opciones": ["Se duplica el número de bitcoins", "Se reduce a la mitad la recompensa de los mineros", "Se divide cada bitcoin en dos"], "correcta": 1, "explicacion": "Cada 210.000 bloques (unos cuatro años) la recompensa por bloque se reduce a la mitad; en 2024 pasó a 3,125 BTC."}
  - {"pregunta": "¿Por qué se dice que Bitcoin es seudónimo y no anónimo?", "opciones": ["Porque las transacciones son privadas", "Porque solo la policía puede verlas", "Porque las transacciones son públicas aunque no muestren nombres"], "correcta": 2, "explicacion": "Cualquiera puede ver qué dirección envía a cuál; lo que no aparece es la identidad, que puede llegar a relacionarse con una persona."}
  - {"pregunta": "¿Cuántos satoshis tiene un bitcoin?", "opciones": ["100.000.000", "1.000", "1.000.000"], "correcta": 0, "explicacion": "Un bitcoin se divide en 100 millones de satoshis, así que puedes comprar la fracción que quieras."}
---
## Cómo funciona Bitcoin

Bitcoin funciona sobre una red de miles de ordenadores, llamados **nodos**, repartidos por todo el mundo. Cada nodo guarda una copia completa del registro de todas las transacciones realizadas desde 2009: la [blockchain](/academia/blockchain). Cuando envías bitcoins, tu transacción se difunde por la red, los nodos comprueban que es válida (que los fondos existen y que tú tienes derecho a gastarlos) y queda pendiente de incluirse en un bloque.

Esa inclusión la hacen los **mineros**. Compiten por resolver un problema matemático que requiere mucha potencia de cálculo; el primero que lo resuelve añade el siguiente bloque a la cadena y recibe una recompensa en bitcoins nuevos más las comisiones de las transacciones incluidas. Este sistema se llama **prueba de trabajo** (*Proof of Work*) y es lo que hace muy costoso alterar el historial: para reescribir un bloque antiguo habría que rehacer todo el trabajo de los bloques posteriores más rápido que el resto de la red.

Se añade un bloque nuevo cada **10 minutos** de media. Por eso se suele recomendar esperar varias confirmaciones (bloques posteriores) antes de considerar firme una transacción importante.

## La oferta limitada y los halvings

Las reglas de Bitcoin fijan que nunca existirán más de **21 millones de bitcoins**. Los nuevos bitcoins solo se crean como recompensa a los mineros, y esa recompensa se reduce a la mitad cada 210.000 bloques, aproximadamente cada cuatro años. Es el **halving**:

| Año | Recompensa por bloque |
|---|---|
| 2009 | 50 BTC |
| 2012 | 25 BTC |
| 2016 | 12,5 BTC |
| 2020 | 6,25 BTC |
| 2024 | 3,125 BTC |

A este ritmo, el último bitcoin se emitirá hacia el año 2140. A partir de entonces, los mineros vivirán solo de las comisiones.

Cada bitcoin se divide en 100 millones de unidades llamadas **satoshis**, así que no hace falta comprar un bitcoin entero: puedes comprar la fracción que quieras.

## Qué significa que sea descentralizado

Ninguna empresa, banco o gobierno puede por sí solo cambiar las reglas de Bitcoin, emitir más monedas o anular transacciones. Los cambios en el software solo prosperan si los adopta la mayoría de quienes ejecutan nodos. Esto tiene dos caras:

- **Ventaja:** nadie puede congelar tu wallet propia ni bloquear un pago legítimo.
- **Inconveniente:** nadie puede ayudarte si te equivocas. Si envías a una dirección errónea o te roban la [frase semilla](/academia/seed-phrase), no hay a quién reclamar.

## Transparente, pero no anónimo

Todas las transacciones son **públicas**: cualquiera puede ver qué dirección envió cuánto a qué otra dirección. Lo que no aparece es el nombre de las personas. Por eso se dice que Bitcoin es **seudónimo**, no anónimo. Cuando compras en una plataforma autorizada, esta conoce tu identidad, y las autoridades pueden relacionar direcciones con personas.

## Bitcoin como inversión

Hay quien lo considera una especie de "oro digital" por su escasez programada. Otros lo consideran un activo especulativo sin valor intrínseco. Lo que es un hecho es su **volatilidad**: Bitcoin ha caído varias veces más de un 70 % desde sus máximos, y en periodos de semanas son habituales los movimientos de más del 20 %.

> Si te planteas invertir, lee antes la guía de [gestión del riesgo](/aprende/gestion-del-riesgo): fondo de emergencia, solo dinero que podrías perder y nada de préstamos. Y recuerda que vender o cambiar bitcoins tributa: lo explicamos en [cómo declarar criptomonedas a Hacienda](/aprende/declarar-criptomonedas-hacienda).

## Consumo de energía

La prueba de trabajo consume mucha electricidad, porque la seguridad de la red depende precisamente del coste de minar. Es una de las críticas más extendidas a Bitcoin. Sus defensores señalan que una parte creciente de la minería usa energía renovable o excedentaria; sus críticos, que el consumo total sigue siendo comparable al de países enteros. Otras redes, como [Ethereum](/academia/ethereum), usan prueba de participación, que consume mucho menos.
