---
updated: 2026-10-13
practicalExamples:
  - "Depositar ETH como garantía en un protocolo de préstamos y pedir prestada una stablecoin, vigilando el precio de liquidación"
  - "Cambiar un token por otro en un exchange descentralizado desde tu propia wallet"
  - "Aportar dos tokens a un pool de liquidez para cobrar parte de las comisiones de intercambio"
advantages:
  - "Accesible desde cualquier lugar con una wallet, sin abrir una cuenta"
  - "Las reglas están en código público que cualquiera puede revisar"
  - "Funciona 24 horas, todos los días"
  - "Los protocolos se pueden combinar entre sí"
risks:
  - "Fallos o ataques en los contratos inteligentes, sin nadie que responda"
  - "Liquidaciones automáticas si cae el valor de tu garantía"
  - "Rentabilidades que dependen de incentivos temporales o de riesgos ocultos"
  - "Webs falsas y firmas maliciosas que vacían wallets"
  - "Tratamiento fiscal poco claro en muchas operaciones"
commonMistakes:
  - "Elegir un protocolo por la rentabilidad más alta sin preguntarse de dónde sale"
  - "Pedir prestado sin entender a qué precio te liquidan"
  - "Dar permisos ilimitados a contratos que no conoces"
  - "No guardar registro de las operaciones para Hacienda"
sources:
  - title: "ethereum.org: Finanzas descentralizadas (DeFi)"
    url: "https://ethereum.org/es/defi/"
  - title: "ethereum.org: Contratos inteligentes"
    url: "https://ethereum.org/es/developers/docs/smart-contracts/"
  - title: "CNMV: Nueva regulación de criptoactivos, Reglamento MiCA"
    url: "https://www.cnmv.es/portal/mica/regulacion-criptoactivos"
---
## Qué es DeFi

**DeFi** (*decentralized finance*, finanzas descentralizadas) es el conjunto de aplicaciones que ofrecen servicios financieros (cambiar divisas, prestar, pedir prestado, generar rendimiento) mediante [contratos inteligentes](/academia/smart-contracts) en una blockchain, sin un banco o una empresa que custodie el dinero.

En lugar de abrir una cuenta, conectas tu propia [wallet](/academia/wallet) a la aplicación. Tus fondos pasan a un contrato que funciona según reglas escritas en código y visibles para cualquiera. Nadie puede saltarse esas reglas… pero tampoco hay nadie al que reclamar si algo sale mal.

## Las piezas principales

### Exchanges descentralizados

Permiten cambiar un token por otro directamente desde tu wallet. La mayoría no casa órdenes de compradores y vendedores, sino que usa [pools de liquidez](/academia/liquidity-pools): depósitos de dos tokens cuyo precio se ajusta automáticamente con cada operación.

### Préstamos

Depositas criptomonedas como **garantía** y puedes pedir prestadas otras, siempre por un valor menor que la garantía (es decir, **sobrecolateralizado**). Si el valor de la garantía cae por debajo de un umbral, el protocolo la **liquida** automáticamente para devolver el préstamo, normalmente con una penalización.

Ejemplo: depositas ETH por valor de 1.000 € y pides prestados 500 € en una stablecoin. Si ETH cae lo suficiente como para que tu garantía ya no cubra el margen exigido, el contrato venderá parte de tus ETH sin preguntarte.

### Stablecoins y staking líquido

Muchas [stablecoins](/academia/stablecoin) y servicios de [staking](/academia/staking) se apoyan en DeFi, y los tokens que generan se pueden reutilizar en otros protocolos. A esa capacidad de encajar piezas se le llama **composabilidad**: es la gran fortaleza de DeFi y también su gran riesgo, porque un fallo en una pieza se propaga a todas las que dependen de ella.

## ¿De dónde sale la rentabilidad?

Es la pregunta más importante. En DeFi la rentabilidad puede venir de:

- **Intereses** que pagan quienes piden prestado.
- **Comisiones** de intercambio en los pools de liquidez.
- **Recompensas en tokens** del propio protocolo, a menudo temporales y que pueden perder valor rápidamente.

Si no sabes explicar de dónde sale un rendimiento, probablemente estás asumiendo un riesgo que no ves. Los rendimientos muy altos y "garantizados" son una señal clásica de [estafa](/aprende/estafas-cripto).

## Riesgos específicos

- **Errores en el código.** Ha habido ataques que han vaciado protocolos de cientos de millones. Una auditoría reduce el riesgo, pero no lo elimina.
- **Oráculos manipulados.** Los protocolos dependen de [oráculos](/academia/oraculos) para conocer precios; si se manipulan, pueden producirse liquidaciones injustas o robos.
- **Firmas maliciosas.** Las webs falsas que imitan a un protocolo conocido piden permisos que permiten vaciar tu wallet. Revisa la [guía de seguridad](/aprende/seguridad-cripto).
- **Sin protección regulatoria.** MiCA regula a los intermediarios identificables; los protocolos plenamente descentralizados quedan en gran parte fuera, sin un supervisor ante el que reclamar.

## Y Hacienda

Muchas operaciones en DeFi pueden generar ganancias o rendimientos que tributan: permutas de tokens, intereses o recompensas. Los criterios de la Agencia Tributaria no están consolidados para todas ellas, así que guarda un registro detallado y consulta con un asesor. La base está explicada en [cómo declarar criptomonedas a Hacienda](/aprende/declarar-criptomonedas-hacienda).
