---
updated: 2026-10-13
sources:
  - title: "BIP-39: Mnemonic code for generating deterministic keys (especificación)"
    url: "https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki"
  - title: "ethereum.org: Seguridad y prevención de estafas"
    url: "https://ethereum.org/es/security/"
  - title: "Bitcoin.org: Asegura tu monedero"
    url: "https://bitcoin.org/es/asegure-su-monedero"
quiz:
  - {"pregunta": "¿Qué permite la frase semilla?", "opciones": ["Solo cambiar la contraseña de la app", "Ver el saldo sin conexión", "Recuperar todas las claves de la wallet en otro dispositivo"], "correcta": 2, "explicacion": "Todas las claves y direcciones se calculan a partir de esas palabras; quien las tiene controla los fondos."}
  - {"pregunta": "¿Cuál es la forma más segura de guardarla?", "opciones": ["En una foto en el móvil", "Escrita a mano en papel o en metal, fuera de internet", "En un correo enviado a ti mismo"], "correcta": 1, "explicacion": "Cualquier copia digital puede acabar en manos de un malware o de alguien que acceda a tus cuentas."}
  - {"pregunta": "El soporte de tu exchange te pide la frase semilla para «sincronizar» tu wallet. ¿Qué haces?", "opciones": ["Se la doy si el correo parece oficial", "Le doy solo la mitad de las palabras", "No se la doy: es una estafa"], "correcta": 2, "explicacion": "Nadie legítimo te pedirá nunca tu frase semilla. Quien te la pide quiere vaciar tu wallet."}
  - {"pregunta": "Si crees que alguien ha visto tu frase semilla, ¿qué debes hacer?", "opciones": ["Crear una wallet nueva y mover allí los fondos", "Cambiar el PIN de la app", "Nada, si la wallet sigue funcionando"], "correcta": 0, "explicacion": "La wallet antigua no se puede arreglar: quien tenga las palabras tendrá acceso para siempre."}
---
## Qué es exactamente

Cuando creas una [wallet propia](/academia/wallet), el programa genera un número aleatorio enorme y lo convierte en una lista de **12 o 24 palabras** sacadas de un diccionario estándar de 2.048 palabras. Ese estándar se llama **BIP-39** y lo usan la gran mayoría de wallets.

A partir de esas palabras se calculan, de forma matemática y siempre igual, **todas las claves privadas y direcciones** de tu wallet. Por eso la frase semilla es, en la práctica, la llave maestra de todos tus fondos:

- Si **pierdes el móvil o se rompe la wallet de hardware**, introduces las palabras en otro dispositivo compatible y recuperas todo.
- Si **alguien consigue tus palabras**, puede hacer exactamente lo mismo y vaciar tu wallet desde cualquier lugar del mundo, sin necesidad de tu dispositivo ni de tu contraseña.

El orden de las palabras importa, y una sola palabra mal escrita genera una wallet distinta.

## Por qué no hay "recuperar contraseña"

En una wallet propia no existe una empresa que guarde una copia de tus claves. Esa es precisamente su ventaja (nadie puede bloquear tus fondos) y su mayor riesgo: **si pierdes la frase semilla y el dispositivo, nadie puede devolverte el acceso**. Se estima que una parte importante de todos los bitcoins emitidos está perdida para siempre por esta razón.

## Cómo guardarla bien

1. **Escríbela a mano en papel** en el momento de crear la wallet, en orden y numerada. Compruébala dos veces.
2. **Nunca la digitalices:** ni foto, ni captura de pantalla, ni nota en el móvil, ni correo, ni documento en la nube, ni gestor de contraseñas conectado. Cualquier copia digital puede acabar en manos de un malware o de alguien que acceda a tu cuenta.
3. **Protégela del fuego y del agua.** Para cantidades importantes existen placas de acero o titanio donde se graban o encajan las letras.
4. **Haz una segunda copia** y guárdala en otro lugar seguro (otra vivienda, una caja de seguridad), para que un incendio o una mudanza no te dejen sin ninguna.
5. **Piensa en la herencia.** Si te pasara algo, ¿alguien de confianza sabría que existe y dónde está, sin que eso la exponga hoy?

## Frase de contraseña adicional (*passphrase*)

Muchas wallets permiten añadir una palabra extra, elegida por ti, a la frase semilla. Con ella, quien encuentre tus 24 palabras no podrá acceder a los fondos sin esa palabra adicional. Es una capa de seguridad potente, pero exige recordarla o guardarla aparte: si la olvidas, los fondos protegidos con ella se pierden.

## La regla de oro

> **Nadie legítimo te pedirá nunca tu frase semilla.** Ni el soporte de tu exchange, ni el fabricante de tu wallet, ni una web que te ofrece un airdrop, ni un "técnico" que quiere ayudarte a "sincronizar" tu cartera. Quien te la pide quiere robarte.

Las estafas más habituales para conseguirla son los mensajes de falso soporte en redes sociales, las webs que imitan a una wallet conocida y las aplicaciones falsas en las tiendas. Las explicamos en la guía de [estafas con criptomonedas](/aprende/estafas-cripto).

## Si crees que tu frase está comprometida

Crea **una wallet nueva desde cero**, con una frase semilla nueva generada en un dispositivo de confianza, y mueve allí tus fondos cuanto antes. La wallet antigua no se puede "arreglar": quien tenga las palabras tendrá acceso para siempre.
