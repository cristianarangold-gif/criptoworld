---
updated: 2026-10-13
advantages:
  - "Con una wallet propia, solo tú controlas tus fondos"
  - "Acceso 24 horas sin depender de horarios ni de una empresa"
  - "Una misma wallet puede gestionar varias criptomonedas y redes"
  - "Las wallets de hardware mantienen las claves fuera de internet"
sources:
  - title: "ethereum.org: Wallets de Ethereum"
    url: "https://ethereum.org/es/wallets/"
  - title: "Bitcoin.org: Elige tu monedero"
    url: "https://bitcoin.org/es/elige-tu-monedero"
  - title: "Bitcoin.org: Asegura tu monedero"
    url: "https://bitcoin.org/es/asegure-su-monedero"
quiz:
  - {"pregunta": "¿Dónde están realmente tus criptomonedas?", "opciones": ["Dentro de la wallet", "En la blockchain", "En el servidor del fabricante"], "correcta": 1, "explicacion": "La wallet guarda las claves que permiten moverlas; las criptomonedas están registradas en la blockchain."}
  - {"pregunta": "En una wallet custodiada (tu cuenta en un exchange), ¿quién guarda las claves?", "opciones": ["Tú", "Nadie", "La plataforma"], "correcta": 2, "explicacion": "Por eso, si la plataforma quiebra o bloquea tu cuenta, puedes perder el acceso a tus fondos."}
  - {"pregunta": "¿Qué caracteriza a una wallet fría?", "opciones": ["Solo funciona con poco saldo", "La gestiona un banco", "Guarda las claves sin conexión a internet"], "correcta": 2, "explicacion": "Las wallets de hardware firman dentro del dispositivo: la clave privada nunca sale de él."}
  - {"pregunta": "¿Qué puedes compartir sin riesgo para recibir fondos?", "opciones": ["La frase semilla", "La clave privada", "Tu dirección"], "correcta": 2, "explicacion": "La dirección sirve para recibir; la clave privada y la frase semilla dan control total y nunca se comparten."}
---
## Las criptomonedas no están "dentro" de la wallet

Es el malentendido más común. Tus bitcoins o tus ethers no se guardan en el móvil ni en el dispositivo: viven en la [blockchain](/academia/blockchain), que es un registro público. Lo que guarda la wallet son las **claves** que demuestran que esos fondos son tuyos y te permiten moverlos.

- **Clave privada:** el secreto que permite firmar transacciones. Quien la tiene controla los fondos. Nunca se comparte.
- **Clave pública y dirección:** se derivan de la clave privada y sirven para recibir. Puedes compartir tu dirección como compartirías un número de cuenta.

Casi todas las wallets modernas generan todas sus claves a partir de una única [frase semilla](/academia/seed-phrase) de 12 o 24 palabras. Con ella puedes recuperar la wallet en cualquier otro dispositivo.

## Custodia: ¿quién tiene las claves?

Esta es la distinción más importante:

| | Wallet custodiada | Wallet propia (autocustodia) |
|---|---|---|
| Ejemplo | Tu cuenta en un exchange | MetaMask, una wallet de hardware… |
| Quién guarda las claves | La plataforma | Tú |
| Si olvidas la contraseña | La plataforma te ayuda a recuperarla | Solo te salva la frase semilla |
| Si la empresa quiebra o bloquea tu cuenta | Puedes perder el acceso | No te afecta |
| Responsabilidad de la seguridad | Compartida con la plataforma | Toda tuya |

En el mundillo se repite la frase "not your keys, not your coins" (si no son tus claves, no son tus monedas). La quiebra del exchange FTX en 2022, que dejó a sus clientes sin acceso a sus fondos, es el ejemplo más citado.

## Calientes y frías

### Wallets calientes (*hot wallets*)

Son aplicaciones para el móvil, el ordenador o el navegador que están **conectadas a internet**. Son cómodas para el uso diario y para conectarse a aplicaciones de [DeFi](/academia/defi), pero están expuestas a malware, a webs fraudulentas y a errores al firmar.

### Wallets frías (*cold wallets*)

Guardan las claves **sin conexión a internet**. La más habitual es la **wallet de hardware**: un pequeño dispositivo que firma las transacciones dentro de sí mismo, de modo que la clave privada nunca sale del aparato. Son la opción recomendada para cantidades importantes o ahorro a largo plazo.

## Cómo elegir

- **Para empezar con cantidades pequeñas:** la cuenta en una plataforma [autorizada](/aprende/exchange-autorizado-cnmv) puede bastar, siempre con verificación en dos pasos.
- **Para usar aplicaciones DeFi:** una wallet caliente de un proyecto reconocido, descargada desde su web oficial.
- **Para guardar a largo plazo:** una wallet de hardware comprada al fabricante oficial.

Muchas personas combinan varias: una wallet caliente con poco saldo para el día a día y una fría para el ahorro.

## Las cinco reglas básicas

1. **Apunta la frase semilla en papel** al crear la wallet y guárdala fuera de internet.
2. **No compartas nunca** la frase semilla ni la clave privada. Nadie legítimo te las pedirá.
3. **Descarga las wallets solo desde la web o tienda oficial.** Hay copias falsas que roban fondos.
4. **Comprueba la dirección y la red** antes de enviar, y haz un envío de prueba si es la primera vez.
5. **Lee lo que firmas.** Si no entiendes una transacción o la wallet te avisa de un riesgo, cancela.

Lo desarrollamos paso a paso en la guía de [seguridad en criptomonedas](/aprende/seguridad-cripto).
