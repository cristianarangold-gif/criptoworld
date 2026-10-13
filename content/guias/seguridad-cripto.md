---
title: "Seguridad en criptomonedas: cómo proteger tus fondos paso a paso"
description: "Guía práctica para proteger tus criptomonedas: elegir entre exchange y wallet propia, guardar la frase semilla, activar la verificación en dos pasos, evitar el phishing y revisar los permisos de tu wallet."
summary: "La seguridad de tus criptos depende de quién guarda las claves. En un exchange, protege tu cuenta con una contraseña única y verificación en dos pasos con app o llave física (no SMS). En tu propia wallet, la frase semilla es tu dinero: apúntala en papel o metal, guárdala fuera de internet y no se la des a nadie. Revisa siempre la dirección antes de enviar y no firmes transacciones que no entiendas."
category: "Seguridad"
order: 11
published: 2026-10-13
updated: 2026-10-13
related: ["estafas-cripto", "exchange-autorizado-cnmv"]
sources:
  - title: "INCIBE: Línea de Ayuda en Ciberseguridad 017"
    url: "https://www.incibe.es/linea-de-ayuda-en-ciberseguridad"
  - title: "Bitcoin.org: Protege tu monedero"
    url: "https://bitcoin.org/es/asegure-su-monedero"
  - title: "ethereum.org: Seguridad y prevención de estafas"
    url: "https://ethereum.org/es/security/"
---

En el sistema bancario, si alguien entra en tu cuenta, el banco puede bloquear operaciones, investigar y, a veces, devolverte el dinero. Con las criptomonedas, **una transferencia confirmada no se puede deshacer**. Eso hace que la seguridad sea tu responsabilidad en mucha mayor medida.

## Lo primero: ¿quién guarda tus claves?

Toda criptomoneda está controlada por una **clave privada**. Quien tiene la clave, tiene los fondos. Hay dos formas básicas de guardar criptos:

| | En un exchange (custodia) | En tu propia wallet (autocustodia) |
|---|---|---|
| Quién guarda las claves | La plataforma | Tú |
| Si olvidas la contraseña | Puedes recuperarla | Si pierdes la frase semilla, pierdes los fondos |
| Riesgo principal | Que la plataforma quiebre, sea hackeada o bloquee tu cuenta | Errores propios, robo de la frase semilla, malware |
| Adecuado para | Cantidades que vas a mover o vender pronto | Ahorro a largo plazo, si sabes protegerlo |

No hay una opción perfecta. Muchas personas combinan ambas: una cantidad pequeña en un exchange [autorizado](/aprende/exchange-autorizado-cnmv) para operar y el resto en una wallet propia.

## Si usas un exchange

1. **Contraseña única y larga.** Que no uses en ningún otro sitio. Un gestor de contraseñas te lo pone fácil.
2. **Verificación en dos pasos (2FA) con app o llave física.** Usa una app de autenticación o una llave de seguridad física. **Evita el SMS**: con la técnica del *SIM swapping*, un delincuente puede conseguir un duplicado de tu tarjeta SIM y recibir tus códigos.
3. **Protege también tu correo electrónico.** Si alguien entra en tu email, puede restablecer la contraseña del exchange. Activa el 2FA también ahí.
4. **Lista blanca de direcciones de retirada.** Muchas plataformas permiten que solo se pueda retirar a direcciones aprobadas previamente, con un periodo de espera para añadir nuevas.
5. **Código antiphishing.** Algunos exchanges te dejan configurar una palabra que aparecerá en todos sus correos legítimos. Si un correo no la lleva, es falso.
6. **No dejes en el exchange más de lo necesario.** Ninguna plataforma está libre de quiebras o hackeos, y no existe un fondo de garantía para criptoactivos.

## Si usas tu propia wallet

### La frase semilla es el dinero

Al crear una wallet, te dará una **frase semilla** (*seed phrase*) de 12 o 24 palabras. Con esas palabras, cualquiera puede recuperar tu wallet en cualquier dispositivo y llevarse los fondos.

- **Apúntala en papel** (o grábala en una placa de metal, que resiste el fuego y el agua) en el momento de crear la wallet.
- **Nunca la guardes en formato digital:** ni foto, ni nota del móvil, ni correo, ni nube, ni gestor de contraseñas conectado.
- **Guárdala en un lugar seguro** y piensa en una segunda copia en otro lugar distinto.
- **No se la des a nadie.** Ningún soporte, exchange ni fabricante te la pedirá nunca. Quien te la pide quiere robarte.
- **Piensa en tus herederos.** Si te pasara algo, ¿alguien de confianza sabría que existe y cómo encontrarla?

### Wallet de hardware para cantidades importantes

Una **wallet de hardware** es un dispositivo físico que guarda las claves sin conectarlas a internet y firma las transacciones dentro del propio aparato. Es la opción más segura para guardar a largo plazo.

- **Cómprala siempre en la web oficial del fabricante** o en un distribuidor oficial, nunca de segunda mano.
- **Inicialízala tú mismo.** Si un dispositivo llega con una frase semilla ya escrita, no lo uses: está manipulado.
- **Comprueba en la pantalla del dispositivo** la dirección y el importe antes de confirmar.

### Wallets en el móvil o el navegador

Son cómodas para cantidades pequeñas y para usar aplicaciones DeFi, pero están expuestas a malware y a webs maliciosas. Descárgalas solo desde la tienda oficial o la web del proyecto, y mantenlas actualizadas.

## Antes de enviar criptos

- **Comprueba la red.** Enviar un token por una red distinta de la que admite el destino puede hacer que se pierda.
- **Comprueba la dirección completa,** no solo el principio y el final. Existe una técnica llamada *address poisoning*: el atacante te envía una transacción minúscula desde una dirección que empieza y termina igual que una que usas, para que la copies por error de tu historial.
- **Haz una transferencia de prueba** con una cantidad pequeña cuando envíes a una dirección nueva.
- **Desconfía del portapapeles.** Hay malware que cambia la dirección que has copiado por otra.

## Firmas y permisos: el riesgo de DeFi

Cuando conectas tu wallet a una aplicación, a menudo le das **permiso** para mover ciertos tokens. Una web maliciosa puede pedirte una firma que, en la práctica, le autoriza a vaciar esos tokens.

- **Lee lo que firmas.** Si la wallet muestra un aviso o no entiendes la operación, cancela.
- **Escribe tú las direcciones** de las webs o usa marcadores; no entres desde anuncios o mensajes.
- **Revisa y revoca permisos antiguos** desde la propia wallet o con herramientas de revisión de permisos.
- **Usa una wallet separada** con poco saldo para probar aplicaciones nuevas.

## Errores habituales

- Hacer una foto de la frase semilla "por si acaso".
- Usar el mismo correo y contraseña en todas partes.
- Instalar programas de acceso remoto porque te lo pide un supuesto asesor.
- Pinchar en enlaces de correos o SMS sobre "problemas con tu cuenta".
- Presumir en redes sociales de cuánto tienes en criptomonedas.

Si crees que tu cuenta o tu wallet está comprometida, actúa rápido: mueve los fondos a una wallet nueva creada desde cero, cambia contraseñas y llama al **017**, la línea gratuita de ayuda en ciberseguridad de INCIBE. Si ha habido robo, denúncialo; lo explicamos en la guía de [estafas con criptomonedas](/aprende/estafas-cripto).
