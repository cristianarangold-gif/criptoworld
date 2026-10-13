---
updated: 2026-10-13
sources:
  - title: "ethereum.org: Introducción a los contratos inteligentes"
    url: "https://ethereum.org/es/smart-contracts/"
  - title: "ethereum.org: Contratos inteligentes (documentación)"
    url: "https://ethereum.org/es/developers/docs/smart-contracts/"
  - title: "ethereum.org: Seguridad de contratos inteligentes"
    url: "https://ethereum.org/es/developers/docs/smart-contracts/security/"
quiz:
  - {"pregunta": "¿Qué es un contrato inteligente?", "opciones": ["Un contrato en papel escaneado", "Un programa guardado en una blockchain que se ejecuta tal como está escrito", "Un acuerdo firmado ante notario"], "correcta": 1, "explicacion": "Nadie puede impedir su ejecución salvo que el propio código lo prevea."}
  - {"pregunta": "¿Garantiza una auditoría que un contrato no tiene fallos?", "opciones": ["Sí, siempre", "No, reduce el riesgo pero no lo elimina", "Solo si es de una gran empresa"], "correcta": 1, "explicacion": "Los auditores revisan una versión concreta y pueden pasar por alto fallos."}
  - {"pregunta": "¿Qué deberías preguntar sobre un contrato actualizable?", "opciones": ["Cuánto gas consume", "En qué lenguaje está escrito", "Quién puede actualizarlo y con cuánto aviso"], "correcta": 2, "explicacion": "Si una sola dirección puede cambiarlo, tus fondos dependen de esa persona."}
  - {"pregunta": "Tu wallet te pide aprobar un permiso ilimitado para mover tus tokens en una web desconocida. ¿Qué haces?", "opciones": ["Lo acepto para ir más rápido", "Lo acepto si la web es bonita", "Lo rechazo"], "correcta": 2, "explicacion": "Muchas estafas consisten precisamente en conseguir que firmes ese permiso."}
---
## Una máquina expendedora digital

La comparación clásica es la de una máquina expendedora: si introduces el importe correcto y pulsas un botón, la máquina te entrega el producto. No hace falta un dependiente ni confiar en nadie, porque las reglas están en la propia máquina.

Un **contrato inteligente** es lo mismo, pero en forma de programa guardado en una blockchain como [Ethereum](/academia/ethereum). Contiene un código y unos datos, y se ejecuta exactamente como está escrito cuando alguien le envía una transacción. Nadie, ni siquiera quien lo creó, puede impedir su ejecución, salvo que el propio código prevea esa posibilidad.

## Qué lo hace distinto de un programa normal

- **Es público.** Cualquiera puede ver el código (si se ha publicado) y todas sus operaciones.
- **No se puede modificar** una vez desplegado, salvo que se haya diseñado para ser actualizable. Si lo es, conviene saber **quién** puede cambiarlo.
- **Controla fondos.** Puede recibir, guardar y enviar criptomonedas según sus reglas.
- **Cuesta ejecutarlo.** Cada operación consume [gas](/academia/gas).

Pese a su nombre, no es un contrato en sentido jurídico: es código. Que algo esté en un contrato inteligente no significa que sea legal ni que te dé derechos ante un tribunal.

## Para qué se usan

- **Tokens:** cada token ERC-20 o NFT es un contrato que lleva la cuenta de quién tiene qué.
- **[DeFi](/academia/defi):** exchanges descentralizados, préstamos con liquidación automática, [stablecoins](/academia/stablecoin).
- **Calendarios de desbloqueo:** liberar los tokens de un equipo poco a poco.
- **Wallets inteligentes:** cuentas con reglas propias, como límites de gasto o recuperación social (lo vemos en [abstracción de cuentas](/academia/account-abstraction)).

## El gran riesgo: el código hace lo que dice, no lo que se pretendía

Si un contrato tiene un error, el error también se ejecuta exactamente como está escrito. La historia de las criptomonedas está llena de ataques que aprovecharon fallos de programación para llevarse cientos de millones. Algunos tipos de fallo conocidos:

- **Reentrada:** el contrato envía fondos antes de actualizar su contabilidad, y el atacante vuelve a llamarlo una y otra vez.
- **Manipulación de precios** a través de [oráculos](/academia/oraculos) poco robustos, a veces con préstamos instantáneos (*flash loans*).
- **Control de acceso mal configurado:** funciones críticas que cualquiera puede llamar.

Una **auditoría** de una empresa de seguridad reduce el riesgo, pero no lo elimina: los auditores revisan una versión concreta del código y pueden pasar por alto fallos.

## Lo que esto significa para ti como usuario

1. **Lee lo que firmas.** Cuando tu wallet te pide aprobar una transacción, estás llamando a un contrato. Si te pide permiso para mover tus tokens, piensa si es necesario.
2. **Evita los permisos ilimitados** a contratos que no conoces, y revoca los antiguos.
3. **Comprueba la dirección del contrato** en fuentes oficiales: las webs falsas te llevan a contratos maliciosos.
4. **Pregunta quién puede cambiar el contrato.** Si una sola dirección puede actualizarlo, congelar fondos o crear tokens, tu dinero depende de esa persona.

Lo ampliamos en la [guía de seguridad](/aprende/seguridad-cripto).
