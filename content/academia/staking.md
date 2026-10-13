---
updated: 2026-10-13
practicalExamples:
  - "Delegar tus tokens a un validador desde tu propia wallet y cobrar parte de sus recompensas"
  - "Usar el servicio de staking de una plataforma autorizada, aceptando que ella custodia tus fondos"
  - "Recibir un token de staking líquido (como stETH) que representa tu ETH bloqueado"
advantages:
  - "Genera recompensas por ayudar a asegurar la red"
  - "En redes de prueba de participación, sustituye a la minería con mucho menos consumo"
  - "Delegar o usar staking líquido no exige montar un nodo propio"
  - "El staking líquido permite seguir usando un token que representa tus fondos"
sources:
  - title: "ethereum.org: Staking de Ether"
    url: "https://ethereum.org/es/staking/"
  - title: "ethereum.org: Prueba de participación"
    url: "https://ethereum.org/es/developers/docs/consensus-mechanisms/pos/"
  - title: "Buscador de consultas vinculantes de la Dirección General de Tributos"
    url: "https://petete.tributos.hacienda.gob.es/consultas/"
---
## La idea básica

En las blockchains que usan **prueba de participación** (*Proof of Stake*), como Ethereum, la seguridad no la aportan mineros con ordenadores, sino **validadores** que bloquean criptomonedas como garantía. Los validadores proponen y verifican bloques y, a cambio, reciben recompensas. Si actúan de forma deshonesta o negligente, pueden perder parte de lo bloqueado: es el **slashing**.

Hacer **staking** es bloquear tus criptomonedas para participar en ese sistema, directa o indirectamente, a cambio de una parte de las recompensas.

## Cuatro formas de hacerlo

| Forma | Cómo funciona | Riesgo principal |
|---|---|---|
| Validador propio | Montas tu propio nodo. En Ethereum hacen falta 32 ETH | Errores técnicos que provoquen penalizaciones |
| Delegación | En algunas redes, asignas tus tokens a un validador sin cederle la propiedad | Que el validador sea penalizado |
| Staking líquido | Depositas en un protocolo y recibes un token que representa tu depósito | Fallos en el contrato o que el token pierda su paridad |
| Staking en una plataforma | La plataforma lo hace por ti y te paga | Que la plataforma quiebre o bloquee retiradas |

## ¿Cuánto se gana?

La rentabilidad depende de la red y cambia con el tiempo. En Ethereum ha rondado el **3 % anual** en ETH en los últimos años. Dos matices importantes:

- **La rentabilidad se cobra en el propio token.** Si ganas un 3 % en ETH pero ETH cae un 40 %, en euros has perdido mucho dinero.
- **No está garantizada.** Baja cuando hay más gente haciendo staking, y las plataformas descuentan su comisión.

Desconfía de quien ofrezca rentabilidades fijas y muy altas por "staking": a menudo son [esquemas fraudulentos](/aprende/estafas-cripto) que usan el nombre para parecer legítimos.

## Riesgos que conviene entender

- **Bloqueo.** Retirar puede tardar días o semanas, según la red y la cola de salida. Si necesitas vender rápido, puede que no puedas.
- **Slashing.** Una parte de lo bloqueado puede perderse si el validador falla.
- **Riesgo de contrato** en el staking líquido: un error en el código o un ataque pueden afectar a todos los depósitos.
- **Pérdida de paridad** del token líquido en momentos de pánico, aunque luego se recupere.
- **Riesgo de plataforma:** si haces staking a través de un exchange, este custodia tus fondos. Comprueba que está [autorizado](/aprende/exchange-autorizado-cnmv).

## Cómo tributa en España

Según el criterio de la Dirección General de Tributos, las recompensas de staking se consideran **rendimientos del capital mobiliario** y se integran en la base del ahorro, valoradas en euros en el momento en que las recibes. Si después vendes esas criptomonedas, tendrás además una ganancia o pérdida patrimonial. Lo explicamos en [cómo declarar criptomonedas a Hacienda](/aprende/declarar-criptomonedas-hacienda).

## Para profundizar

El staking es la base del [restaking](/academia/restaking), que reutiliza los fondos bloqueados para asegurar otros servicios a cambio de más recompensas… y más riesgos.
