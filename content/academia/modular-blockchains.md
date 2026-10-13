---
updated: 2026-10-13
sources:
  - title: "ethereum.org: Disponibilidad de datos"
    url: "https://ethereum.org/es/developers/docs/data-availability/"
  - title: "ethereum.org: Danksharding y blobs"
    url: "https://ethereum.org/es/roadmap/danksharding/"
  - title: "Celestia: documentación sobre blockchains modulares"
    url: "https://docs.celestia.org/learn/how-celestia-works/overview"
quiz:
  - {"pregunta": "¿Qué es una blockchain modular?", "opciones": ["Una blockchain privada", "Una blockchain sin token", "Una que reparte ejecución, consenso, liquidación y datos entre capas especializadas"], "correcta": 2, "explicacion": "Los rollups sobre Ethereum son el ejemplo más claro."}
  - {"pregunta": "¿Por qué es importante la disponibilidad de datos para un rollup?", "opciones": ["Para que sea más rápido", "Para que cualquiera pueda comprobar si el operador hace trampa y reconstruir los saldos", "Para cobrar menos impuestos"], "correcta": 1, "explicacion": "Si se ocultaran los datos, nadie podría verificar ni salir."}
  - {"pregunta": "¿Es lo mismo disponibilidad de datos que almacenamiento permanente?", "opciones": ["Sí", "Depende de la red", "No: garantiza que los datos se publicaron y pudieron descargarse durante un tiempo"], "correcta": 2, "explicacion": "No promete guardarlos para siempre."}
  - {"pregunta": "Si un rollup publica sus datos en una capa menos segura que Ethereum, ¿qué ocurre?", "opciones": ["Su seguridad depende también de esa capa", "Nada, sigue siendo igual de seguro", "Deja de funcionar"], "correcta": 0, "explicacion": "La seguridad de una red modular es la de su eslabón más débil."}
---
## Las cuatro tareas de una blockchain

Toda blockchain hace, en esencia, cuatro trabajos:

1. **Ejecución:** procesar las transacciones y calcular el nuevo estado (saldos, contratos).
2. **Liquidación** (*settlement*): ser el lugar donde se resuelven las disputas y se verifican las pruebas, y donde el resultado se considera definitivo.
3. **Consenso:** acordar el orden de las transacciones.
4. **Disponibilidad de datos:** garantizar que los datos de las transacciones se han publicado y que cualquiera puede descargarlos para verificar.

## Monolíticas frente a modulares

Una blockchain **monolítica** hace las cuatro tareas en la misma red. Es lo que hacían originalmente Bitcoin y Ethereum, y lo que hacen muchas [capas 1](/academia/layer-1) que buscan velocidad.

Una arquitectura **modular** reparte esas tareas entre capas especializadas. El ejemplo más claro es el de los [rollups](/academia/rollups):

| Tarea | En un rollup sobre Ethereum |
|---|---|
| Ejecución | El rollup |
| Liquidación | Ethereum (contratos que verifican pruebas) |
| Consenso | Ethereum, para el orden definitivo |
| Disponibilidad de datos | Ethereum (blobs) u otra capa especializada |

## Por qué importa la disponibilidad de datos

Para que un rollup sea seguro, los datos de sus transacciones deben estar **publicados y accesibles**. Si un operador publicara solo el resultado y ocultara los datos, nadie podría comprobar si ha hecho trampa ni reconstruir los saldos para salir.

Publicar esos datos en Ethereum era caro. Por eso han surgido dos respuestas:

- **Ethereum** creó un espacio específico y más barato para datos, los *blobs*, con la actualización Dencun de 2024, y trabaja en ampliarlo con técnicas que permiten a cada nodo comprobar solo muestras de los datos en lugar de descargarlos todos.
- **Capas de disponibilidad de datos** independientes, como Celestia, que se especializan solo en esa tarea y que algunos rollups usan en lugar de Ethereum.

No es lo mismo **disponibilidad** que **almacenamiento**: la disponibilidad garantiza que los datos se publicaron y pudieron descargarse durante un tiempo, no que se guarden para siempre.

## Ventajas y compromisos

**A favor:** cada capa se optimiza para su tarea; se puede escalar mucho más; es más fácil lanzar una red a medida (*appchain*).

**En contra:** más piezas significan más dependencias y más puntos de fallo. Y la seguridad de una red modular es la de su eslabón más débil: un rollup que guarda sus datos en una capa menos segura que Ethereum no hereda toda la seguridad de Ethereum, aunque liquide en ella.

## Lo práctico para el usuario

Cuando una red se presente como "asegurada por Ethereum", pregunta **dónde publica sus datos**. Si no es en Ethereum, su seguridad depende también de esa otra capa. L2BEAT recoge este dato para cada red.
