---
updated: 2026-10-13
practicalExamples:
  - "Comprobar en un explorador de bloques cuántas direcciones concentran la mayor parte de un token"
  - "Seguir los movimientos de la dirección del equipo de un proyecto antes de un desbloqueo de tokens"
  - "Verificar que una transacción tuya se ha confirmado y con qué comisión"
  - "Observar entradas grandes de BTC en exchanges como dato de contexto, no como señal de compra o venta"
advantages:
  - "Los datos son públicos y verificables por cualquiera"
  - "Permite comprobar afirmaciones de un proyecto (reparto de tokens, uso real)"
  - "Ayuda a detectar concentraciones de tokens y movimientos de los iniciados"
  - "Información que no existe con esta transparencia en los mercados tradicionales"
sources:
  - title: "ethereum.org: Exploradores de bloques"
    url: "https://ethereum.org/es/developers/docs/data-and-analytics/block-explorers/"
  - title: "ethereum.org: Datos y análisis"
    url: "https://ethereum.org/es/developers/docs/data-and-analytics/"
quiz:
  - {"pregunta": "¿Qué herramienta básica permite ver cualquier transacción pública?", "opciones": ["Un gestor de contraseñas", "Un explorador de bloques", "Un VPN"], "correcta": 1, "explicacion": "Muestra transacciones, saldos, contratos y mayores poseedores de un token."}
  - {"pregunta": "¿Predicen el precio las métricas on-chain?", "opciones": ["Sí, con exactitud", "No; dan contexto, pero no predicen el precio", "Solo en Bitcoin"], "correcta": 1, "explicacion": "Han funcionado en algunos ciclos y fallado en otros."}
  - {"pregunta": "¿Por qué una dirección no equivale a una persona?", "opciones": ["Porque las direcciones son secretas", "Porque cambian cada día", "Porque un exchange usa miles de direcciones y una persona puede tener muchas"], "correcta": 2, "explicacion": "Las etiquetas de las plataformas de análisis son estimaciones."}
  - {"pregunta": "¿Qué uso del análisis on-chain es más fiable?", "opciones": ["Adivinar el precio de mañana", "Saber la identidad de cualquiera", "Comprobar hechos, como el reparto de tokens o los movimientos del equipo"], "correcta": 2, "explicacion": "Úsalo para verificar, no como una bola de cristal."}
---
## Qué es

El **análisis on-chain** consiste en estudiar los datos públicos de una blockchain (transacciones, saldos de direcciones, actividad de contratos) para entender qué está pasando en una red o en un proyecto. Es posible porque en las blockchains públicas como Bitcoin y Ethereum **todo queda registrado y es visible para cualquiera**.

## La herramienta básica: el explorador de bloques

Un **explorador de bloques** es una web que muestra los datos de una blockchain de forma legible. Con él puedes:

- Ver el estado de una transacción y su comisión.
- Consultar el saldo y el historial de cualquier dirección.
- Ver el código de un contrato verificado y quién puede modificarlo.
- Ver los mayores poseedores de un token.

Es la herramienta más útil para un usuario normal, mucho antes que cualquier métrica sofisticada.

## Usos prácticos y fiables

- **Verificar un proyecto:** ¿el reparto de tokens coincide con lo que dice su documentación? ¿Hay unas pocas direcciones con la mayoría? Lo explicamos en [tokenomics](/academia/tokenomics).
- **Vigilar a los iniciados:** las direcciones del equipo o de los inversores iniciales suelen ser conocidas; si empiezan a enviar grandes cantidades a exchanges, es información relevante.
- **Comprobar el uso real:** número de usuarios, transacciones o valor depositado en un protocolo, frente a lo que proclama su marketing.
- **Investigar una estafa:** seguir el rastro de los fondos ayuda a la policía y a las plataformas a identificar a los responsables.

## Métricas de mercado: con mucha cautela

Existen muchas métricas que intentan medir el comportamiento de los inversores, sobre todo en Bitcoin: flujos de entrada y salida de exchanges, porcentaje de monedas en beneficio, antigüedad de las monedas que se mueven, etc. Pueden dar **contexto**, pero hay que tener claro que:

- **No predicen el precio.** Han funcionado en algunos ciclos y fallado en otros.
- **Una dirección no es una persona.** Un exchange puede usar miles de direcciones, y una persona, muchas. Las etiquetas que asignan las plataformas de análisis son estimaciones.
- **Se pueden manipular.** El volumen falso (*wash trading*) y los movimientos entre direcciones propias inflan la actividad aparente.
- **Correlación no es causalidad.** Que salga BTC de los exchanges puede significar acumulación… o simplemente que una plataforma ha reorganizado sus wallets.

## Privacidad: la otra cara

Si cualquiera puede analizar la blockchain, también pueden analizar **tus** movimientos. Cuando una dirección queda vinculada a tu identidad (porque la usaste para retirar desde una plataforma o porque la publicaste), todo su historial queda asociado a ti. Es una buena razón para no publicar tus direcciones ni presumir de saldos.

## En resumen

Usa el análisis on-chain para **comprobar hechos**: transacciones, reparto de tokens, movimientos del equipo. No lo uses como una bola de cristal para adivinar el precio.
