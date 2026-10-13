---
updated: 2026-10-13
sources:
  - title: "ethereum.org: Bloques"
    url: "https://ethereum.org/es/developers/docs/blocks/"
  - title: "ethereum.org: Mecanismos de consenso"
    url: "https://ethereum.org/es/developers/docs/consensus-mechanisms/"
  - title: "Satoshi Nakamoto: Bitcoin, a Peer-to-Peer Electronic Cash System (white paper, 2008)"
    url: "https://bitcoin.org/bitcoin.pdf"
quiz:
  - {"pregunta": "¿Qué contiene cada bloque, además de transacciones?", "opciones": ["El hash del bloque anterior", "La contraseña de los usuarios", "Una copia de todas las wallets"], "correcta": 0, "explicacion": "Incluir el hash del bloque anterior encadena los bloques: modificar uno obligaría a recalcular todos los siguientes."}
  - {"pregunta": "¿Qué garantiza una blockchain?", "opciones": ["Que los datos son verdaderos", "Que los datos no se han modificado después de escribirlos", "Que las operaciones son privadas"], "correcta": 1, "explicacion": "Una blockchain no comprueba si un dato es cierto; solo hace muy difícil cambiarlo una vez registrado."}
  - {"pregunta": "En la prueba de participación, ¿qué arriesga un validador que hace trampa?", "opciones": ["Parte de las criptomonedas que ha bloqueado", "La electricidad gastada", "Nada"], "correcta": 0, "explicacion": "Es el slashing: el validador pierde parte de su garantía si actúa de forma deshonesta."}
  - {"pregunta": "¿Cuándo tiene más sentido usar una blockchain?", "opciones": ["Cuando varias partes que no confían entre sí comparten un registro", "Siempre que haya que guardar datos", "Cuando se necesita la máxima velocidad"], "correcta": 0, "explicacion": "Si una base de datos normal gestionada por una empresa funcionaría igual, la blockchain probablemente sobra."}
---
## Una analogía para empezar

Imagina un libro de cuentas del que existen miles de copias idénticas repartidas por el mundo. Cada pocos minutos se añade una página nueva con las últimas operaciones. Antes de añadirla, todos comprueban que las operaciones son válidas, y cada página lleva un sello que depende del contenido de todas las anteriores. Si alguien intentara cambiar una página antigua en su copia, el sello dejaría de cuadrar y el resto de copias lo rechazaría.

Eso, simplificado, es una blockchain: una **base de datos compartida**, en la que solo se puede **añadir** información y en la que es extremadamente difícil **modificar** lo ya escrito.

## Cómo es un bloque por dentro

Cada bloque contiene, entre otras cosas:

- **Un conjunto de transacciones** u operaciones.
- **Una marca de tiempo.**
- **El hash del bloque anterior.**
- **Su propio hash**, calculado a partir de todo lo anterior.

Un **hash** es una huella digital: una función matemática convierte cualquier cantidad de datos en una cadena corta de longitud fija. Si cambias una sola coma de los datos, el hash cambia por completo. Como cada bloque incluye el hash del anterior, los bloques quedan **encadenados**: modificar uno obligaría a recalcular todos los siguientes.

## El consenso: ¿quién decide qué bloque se añade?

En una red sin jefe hace falta un método para que todos acuerden cuál es la versión válida del registro. Es el **mecanismo de consenso**. Los dos más importantes son:

| | Prueba de trabajo (PoW) | Prueba de participación (PoS) |
|---|---|---|
| Quién propone bloques | Mineros que gastan potencia de cálculo | Validadores que bloquean criptomonedas como garantía |
| Qué arriesgan si hacen trampa | La electricidad y el equipo invertidos | Una parte de lo que han bloqueado (*slashing*) |
| Consumo energético | Muy alto | Muy bajo |
| Ejemplo | Bitcoin | Ethereum desde 2022 |

En ambos casos la idea es la misma: que hacer trampa cueste más de lo que se puede ganar.

## Públicas y privadas

- **Blockchains públicas** (Bitcoin, Ethereum): cualquiera puede leerlas, enviar transacciones y participar en el consenso.
- **Blockchains privadas o de consorcio**: solo participan entidades autorizadas. Se usan en algunos proyectos empresariales, pero renuncian a buena parte de la descentralización, que es lo que da sentido a una blockchain pública.

## Lo que una blockchain hace bien… y lo que no

Una blockchain resulta útil cuando varias partes que **no confían entre sí** necesitan compartir un registro sin depender de un intermediario. Es el caso del dinero digital, de los [contratos inteligentes](/academia/smart-contracts) o de la tokenización de activos.

En cambio, no es la mejor solución para todo:

- **Es más lenta y cara** que una base de datos tradicional.
- **No garantiza que los datos sean ciertos**, solo que no se han modificado después de escribirlos. Si alguien registra un dato falso, quedará registrado para siempre.
- **No es privada** por defecto: en las públicas, cualquiera puede ver las operaciones.

> Una pregunta útil ante cualquier proyecto que presume de "usar blockchain": ¿funcionaría igual con una base de datos normal gestionada por una empresa? Si la respuesta es sí, la blockchain probablemente sea solo marketing.

## Escalabilidad: el gran reto

Que miles de nodos verifiquen todo tiene un coste: las blockchains públicas procesan relativamente pocas transacciones por segundo. Para resolverlo existen las soluciones de [capa 2](/academia/layer-2), que procesan operaciones fuera de la cadena principal y anotan en ella solo un resumen.
