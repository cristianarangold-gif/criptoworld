---
updated: 2026-10-13
practicalExamples:
  - "Cambiar un token por otro en un exchange descentralizado desde tu propia wallet"
  - "Bloquear ETH en staking a través de un validador o un servicio de staking, asumiendo sus riesgos"
  - "Usar una red de capa 2 para hacer operaciones con comisiones mucho más bajas"
  - "Consultar en un explorador de bloques cualquier contrato o transacción pública"
sources:
  - title: "ethereum.org: ¿Qué es Ethereum?"
    url: "https://ethereum.org/es/what-is-ethereum/"
  - title: "ethereum.org: La Fusión (The Merge)"
    url: "https://ethereum.org/es/roadmap/merge/"
  - title: "ethereum.org: Gas y comisiones"
    url: "https://ethereum.org/es/developers/docs/gas/"
  - title: "ethereum.org: Staking"
    url: "https://ethereum.org/es/staking/"
quiz:
  - {"pregunta": "¿Qué permite Ethereum que no era el objetivo original de Bitcoin?", "opciones": ["Ejecutar contratos inteligentes", "Minar con el móvil", "Transferencias anónimas"], "correcta": 0, "explicacion": "Ethereum es una blockchain en la que cualquiera puede ejecutar programas: los contratos inteligentes."}
  - {"pregunta": "¿Qué cambió con La Fusión (The Merge) en 2022?", "opciones": ["Ethereum pasó de la minería a la prueba de participación", "Se dividió en dos redes", "Se eliminaron las comisiones"], "correcta": 0, "explicacion": "El cambio redujo el consumo energético de la red en torno a un 99,95 %."}
  - {"pregunta": "¿Es siempre deflacionario ETH?", "opciones": ["Sí, siempre", "Nunca", "Depende de la actividad: con poca actividad su oferta puede crecer"], "correcta": 2, "explicacion": "La quema de comisiones puede superar la emisión cuando hay mucha actividad, pero desde 2024 ha habido periodos de crecimiento de la oferta."}
  - {"pregunta": "¿Cómo tributan en España las recompensas de staking de ETH, según el criterio de Hacienda?", "opciones": ["No tributan", "Como rendimientos del capital mobiliario", "Como premios de lotería"], "correcta": 1, "explicacion": "Se integran en la base del ahorro, valoradas en euros cuando las recibes."}
---
## Más que una moneda

[Bitcoin](/academia/bitcoin) nació para ser dinero digital. Ethereum, propuesto en 2013 por Vitalik Buterin y lanzado en 2015, nació con una idea más amplia: una blockchain en la que cualquiera pueda **ejecutar programas**. Esos programas se llaman [contratos inteligentes](/academia/smart-contracts) y funcionan exactamente como están escritos, sin que nadie pueda pararlos ni cambiarlos una vez publicados.

Conviene distinguir dos nombres:

- **Ethereum** es la red, la plataforma.
- **Ether (ETH)** es su criptomoneda, que se usa para pagar las comisiones de la red y como garantía en el sistema de seguridad.

## Qué se ha construido sobre Ethereum

Gracias a los contratos inteligentes, sobre Ethereum funcionan:

- **Tokens:** cualquiera puede crear un token siguiendo el estándar ERC-20. Muchas [stablecoins](/academia/stablecoin) funcionan así.
- **[DeFi](/academia/defi):** exchanges descentralizados, plataformas de préstamos y otros servicios financieros sin intermediario.
- **NFT:** tokens únicos que representan la propiedad de un objeto digital.
- **[Redes de capa 2](/academia/layer-2):** redes que procesan operaciones fuera de Ethereum y anotan en ella un resumen, con comisiones mucho más bajas.

## La Fusión: de minería a staking

En septiembre de 2022, Ethereum completó **La Fusión** (*The Merge*): dejó la prueba de trabajo (minería) y pasó a la **prueba de participación**. Ahora la seguridad la aportan **validadores** que bloquean ETH como garantía; si actúan de forma deshonesta, pierden parte de lo bloqueado. Según la Fundación Ethereum, el cambio redujo el consumo energético de la red en torno a un **99,95 %**.

El [staking](/academia/staking) de ETH genera una rentabilidad variable, que en los últimos años ha rondado el 3 % anual, pero no está garantizada y tiene riesgos: el precio de ETH puede caer, los servicios de staking pueden fallar y, en algunos casos, los fondos quedan bloqueados un tiempo. En España, según el criterio de Hacienda, las recompensas de staking tributan como rendimiento del capital mobiliario.

## El gas: lo que cuesta usar la red

Cada operación en Ethereum consume una cantidad de **[gas](/academia/gas)**, que se paga en ETH. El precio del gas sube cuando hay mucha demanda. Desde 2021, una parte de cada comisión se **quema** (se destruye), lo que reduce la oferta de ETH. Cuando la actividad es alta, se pueden quemar más ETH de los que se emiten como recompensa a los validadores.

Para operaciones pequeñas, las redes de capa 2 suelen ser mucho más baratas que la red principal.

## Riesgos que conviene conocer

- **Volatilidad:** ETH es tan volátil como el resto del mercado cripto, o más que Bitcoin.
- **Errores en contratos:** un fallo en un contrato inteligente puede hacer perder fondos, y no hay marcha atrás.
- **Firmar sin entender:** muchas estafas consisten en conseguir que firmes una transacción que da permiso para mover tus tokens. Lo explicamos en la guía de [seguridad](/aprende/seguridad-cripto).
- **Competencia:** otras blockchains compiten por los mismos usos.

Y, como siempre, vender o cambiar ETH tributa en la Renta: lo explicamos en [cómo declarar criptomonedas a Hacienda](/aprende/declarar-criptomonedas-hacienda).
