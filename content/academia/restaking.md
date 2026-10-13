---
updated: 2026-10-13
practicalExamples:
  - "Depositar ETH ya puesto en staking en un protocolo de restaking para asegurar servicios adicionales"
  - "Recibir un token de restaking líquido que representa la posición, sumando una capa más de contratos"
  - "Un servicio nuevo alquila seguridad económica a validadores de Ethereum en lugar de crear su propia red"
sources:
  - title: "EigenCloud (EigenLayer): documentación oficial"
    url: "https://docs.eigencloud.xyz/"
  - title: "ethereum.org: Staking de Ether"
    url: "https://ethereum.org/es/staking/"
  - title: "Cointelegraph: EigenLayer empezará a aplicar slashing a los restakers en abril (2025)"
    url: "https://cointelegraph.com/news/eigenlayer-slashing-restakers-april"
quiz:
  - {"pregunta": "¿Qué es el restaking?", "opciones": ["Hacer staking dos veces del mismo token en la misma red", "Usar ETH ya en staking como garantía para asegurar otros servicios", "Retirar del staking"], "correcta": 1, "explicacion": "A cambio de recompensas adicionales, y de más riesgos."}
  - {"pregunta": "¿Qué ocurre con los riesgos al encadenar staking, staking líquido y restaking líquido?", "opciones": ["Se anulan", "Desaparecen con la auditoría", "Se suman"], "correcta": 2, "explicacion": "Cada capa añade su propio riesgo: slashing, contratos, paridad del token…"}
  - {"pregunta": "¿Qué es un AVS?", "opciones": ["Una wallet", "Un exchange", "Un servicio que se asegura mediante restaking"], "correcta": 2, "explicacion": "Puentes, oráculos o capas de datos pueden alquilar seguridad así."}
  - {"pregunta": "Antes de hacer restaking, ¿qué deberías poder explicar?", "opciones": ["A qué servicios te expones y cuándo te pueden penalizar", "Solo la rentabilidad anunciada", "El precio del gas"], "correcta": 0, "explicacion": "Si no puedes explicarlo, no tiene sentido arriesgar fondos importantes."}
---
## La idea

En [staking](/academia/staking), bloqueas ETH como garantía para asegurar Ethereum. El **restaking** consiste en usar **esa misma garantía** para asegurar también otros servicios, a cambio de recompensas adicionales. Si el validador cumple, cobra de varios sitios; si falla, puede ser penalizado por varios sitios.

Para los proyectos nuevos, el atractivo es claro: en lugar de crear su propia red de validadores y su propio token desde cero, **alquilan seguridad económica** a validadores que ya tienen ETH bloqueado.

## Cómo funciona, simplificado

1. Tienes ETH en staking, directamente o a través de un token de staking líquido.
2. Lo depositas en un protocolo de restaking, el más conocido es EigenLayer, lanzado en 2023.
3. Eliges (o el protocolo elige por ti) **operadores** que prestan servicios a terceros: puentes, [oráculos](/academia/oraculos), capas de disponibilidad de datos, etc. A estos servicios se les llama **AVS** (*actively validated services*).
4. Los AVS pagan recompensas por esa seguridad.
5. Si un operador incumple las reglas de un AVS, ese AVS puede quitarle parte de la garantía (**slashing**).

En EigenLayer, el slashing en la red principal se activó en abril de 2025, con un sistema en el que operadores y usuarios deciden a qué servicios se exponen. Retirar fondos exige además un periodo de espera.

## Restaking líquido

Igual que existe el staking líquido, existen tokens de **restaking líquido**: depositas en un protocolo que hace el restaking por ti y te da un token que representa tu posición, utilizable en otros protocolos de [DeFi](/academia/defi). Es cómodo, pero suma otra capa más de contratos y de dependencia de terceros.

## Riesgos que se acumulan

Cada capa añade su propio riesgo, y se suman:

| Capa | Riesgo |
|---|---|
| ETH | Que el precio caiga |
| Staking | Slashing del validador en Ethereum |
| Staking líquido | Fallos del contrato o pérdida de paridad del token |
| Restaking | Slashing por cada servicio asegurado; fallos del protocolo |
| Restaking líquido | Otro contrato más; liquidez del token en momentos de pánico |

Además, que la misma garantía respalde a muchos servicios a la vez crea un riesgo sistémico: un fallo grave podría propagarse en cadena.

## Para quién tiene sentido

El restaking es un tema **avanzado**. Las recompensas adicionales no están garantizadas y en muchas ocasiones han dependido de incentivos temporales en puntos o tokens. Si no puedes explicar a qué servicios estás expuesto y qué condiciones de penalización tienen, no tiene sentido arriesgar fondos importantes.

En España, las recompensas obtenidas probablemente sigan el criterio del staking (rendimientos del capital mobiliario), pero no hay un criterio específico consolidado: consulta con un asesor y revisa [cómo declarar criptomonedas a Hacienda](/aprende/declarar-criptomonedas-hacienda).
