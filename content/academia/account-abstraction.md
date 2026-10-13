---
updated: 2026-10-13
advantages:
  - "Recuperación del acceso mediante guardianes, si se configura antes"
  - "Reglas a medida: multifirma, límites de gasto, direcciones permitidas"
  - "Comisiones patrocinadas por aplicaciones o pagadas en stablecoins"
  - "Varias operaciones en una sola confirmación"
risks:
  - "Una cuenta inteligente es un contrato: un fallo en su código puede comprometer los fondos"
  - "Delegar una cuenta normal en un contrato malicioso (EIP-7702) puede vaciarla"
  - "Algunas funciones dependen de servicios de terceros (patrocinadores de gas, agrupadores)"
  - "Las operaciones pueden costar algo más de gas que una transferencia simple"
commonMistakes:
  - "Creer que la abstracción de cuentas elimina la necesidad de proteger tus claves"
  - "Firmar una delegación EIP-7702 sin saber a qué contrato delegas"
  - "No configurar los guardianes de recuperación antes de necesitarlos"
sources:
  - title: "ethereum.org: Abstracción de cuentas"
    url: "https://ethereum.org/es/roadmap/account-abstraction/"
  - title: "ERC-4337: abstracción de cuentas mediante un mempool alternativo"
    url: "https://eips.ethereum.org/EIPS/eip-4337"
  - title: "EIP-7702: código para cuentas normales (Pectra, mayo de 2025)"
    url: "https://eips.ethereum.org/EIPS/eip-7702"
  - title: "Ethereum Foundation: anuncio de Pectra en la red principal"
    url: "https://blog.ethereum.org/2025/04/23/pectra-mainnet"
---
## Dos tipos de cuenta en Ethereum

Tradicionalmente, Ethereum ha tenido dos tipos de cuenta:

- **Cuentas de propiedad externa** (EOA): las controla una clave privada. Son las de las wallets habituales. Simples, pero rígidas: si pierdes la clave, se acabó; para operar necesitas ETH para el gas; cada operación es una firma.
- **Cuentas de contrato:** son [contratos inteligentes](/academia/smart-contracts), con lógica programable, pero no podían iniciar transacciones por sí mismas.

La **abstracción de cuentas** busca que tu cuenta pueda tener la flexibilidad de un contrato: que las reglas para autorizar una operación las decidas tú, no solo "quien tenga la clave".

## Qué permite

- **Recuperación social:** designas a varias personas o dispositivos de confianza (guardianes) que, juntos, pueden ayudarte a recuperar el acceso si pierdes tu clave.
- **Multifirma:** exigir varias aprobaciones para operaciones importantes.
- **Límites y reglas:** gasto máximo diario, direcciones permitidas, operaciones bloqueadas.
- **Patrocinio del gas:** una aplicación puede pagar las comisiones por ti, o puedes pagarlas en una stablecoin en lugar de en ETH.
- **Operaciones agrupadas:** aprobar y ejecutar en un solo paso lo que antes eran dos o tres transacciones.
- **Claves de sesión:** permisos temporales y limitados, útiles en juegos o aplicaciones.

## Cómo se ha implementado

### ERC-4337 (2023)

Un estándar que consigue la abstracción de cuentas **sin cambiar el protocolo** de Ethereum: las operaciones de los usuarios se agrupan en un circuito paralelo y unos servicios llamados *bundlers* las incluyen en la cadena. Las cuentas son contratos nuevos, así que hay que crear una cuenta inteligente y mover los fondos a ella.

### EIP-7702 (Pectra, mayo de 2025)

La actualización **Pectra**, activada en la red principal el 7 de mayo de 2025, permite que una cuenta normal (EOA) **delegue en el código de un contrato**. En la práctica, tu dirección de siempre puede adquirir funciones de cuenta inteligente, como agrupar operaciones o que te patrocinen el gas, sin cambiar de dirección.

## Un riesgo nuevo que conviene conocer

La delegación de EIP-7702 es muy potente, y por eso muy peligrosa si se usa mal. **Delegar tu cuenta en un contrato malicioso equivale a entregarle el control de tus fondos.** Ya se han visto estafas que consiguen que los usuarios firmen esa delegación. La regla es la de siempre: si tu wallet te pide una firma de delegación que no esperabas o que no entiendes, recházala.

## Lo que no cambia

La abstracción de cuentas mejora la experiencia y permite mejores mecanismos de recuperación, pero **no elimina la responsabilidad**: sigue habiendo claves que proteger, y la recuperación social solo funciona si la has configurado antes de necesitarla. Las bases siguen siendo las de la guía de [seguridad](/aprende/seguridad-cripto).
