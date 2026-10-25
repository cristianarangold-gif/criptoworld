---
titulo: "Electrum 4.8.3 corrige un fallo que permitía a un servidor malicioso desviar el pago al acelerar una transacción"
descripcion: "Electrum publicó el 23 de octubre la versión 4.8.3 para cerrar un fallo de gravedad alta: un servidor malicioso podía engañar al acelerar un pago."
fecha: 2026-10-25
fuentes:
  - title: "Electrum: aviso de seguridad GHSA-6jp4-8v48-cc5v"
    url: "https://github.com/spesmilo/electrum/security/advisories/GHSA-6jp4-8v48-cc5v"
  - title: "Electrum: notas de la versión (RELEASE-NOTES)"
    url: "https://github.com/spesmilo/electrum/blob/master/RELEASE-NOTES"
  - title: "CriptoNoticias: Electrum corrige un fallo de seguridad crítico en su versión 4.8.3"
    url: "https://www.criptonoticias.com/seguridad-bitcoin/electrum-corrige-fallo-de-seguridad-critico-en-su-version/"
relacionados:
  - title: "Seguridad en criptomonedas: cómo proteger tus fondos paso a paso"
    href: "/aprende/seguridad-cripto"
  - title: "Mempool en el glosario"
    href: "/glosario#mempool"
  - title: "Nodo en el glosario"
    href: "/glosario#nodo"
---
Electrum, una de las wallets de Bitcoin más veteranas, publicó el 23 de octubre de 2026 la versión 4.8.3, una actualización de seguridad. Corrige un fallo que el propio proyecto califica de gravedad alta: un servidor malicioso al que se conecte la wallet podía hacer creer al usuario que su pago era otro y empujarlo a «acelerarlo» con una comisión mayor, de modo que el dinero acabara en manos del atacante.

## Qué ha pasado

Según el aviso de seguridad del proyecto (GHSA-6jp4-8v48-cc5v), el problema afecta a todas las versiones anteriores a la 4.8.3. No tiene asignado un identificador CVE. Las notas de la versión lo describen como «un servidor malicioso puede reemplazar una transacción recién emitida e intentar engañar al usuario para que la acelere con RBF».

Para entenderlo conviene saber cómo funciona Electrum. Es una wallet «ligera»: no descarga toda la cadena de bloques, sino que pregunta a servidores externos por el estado de las transacciones. Cuando el usuario envía un pago, la wallet lo emite a través de uno de esos servidores. El aviso explica el ataque en estos pasos:

- El servidor malicioso descarta la transacción que acaba de emitir el usuario.
- En su lugar, enseña a la wallet otra transacción que entra en conflicto con la original y que envía los fondos a una dirección del atacante.
- La wallet no comprobaba las firmas de esas transacciones pendientes de confirmar, así que la falsa parecía válida y aparecía como no confirmada.
- Si el usuario, al ver que su pago tarda, decide subir la comisión con RBF (el mecanismo que permite sustituir una transacción pendiente por otra con más comisión), la wallet firma la versión falsa y el pago llega al atacante.

Es decir, hacen falta dos condiciones: que la persona esté conectada a un servidor malicioso y que decida acelerar la transacción. Aun así, el aviso afirma que algunos servidores ya explotaban el fallo y que un usuario perdió dinero. El proyecto prometió publicar más adelante los detalles técnicos.

La versión 4.8.3 corrige el problema verificando las firmas de las transacciones pendientes que gastan desde direcciones de la propia wallet. El aviso reconoce una limitación: la protección cubre solo las entradas propias, de modo que las transacciones en las que la wallet únicamente recibe fondos siguen sin validarse del todo.

La 4.8.3 es la cuarta actualización de seguridad de Electrum en poco más de tres meses, según las notas de la versión: las 4.8.0 (8 de julio), 4.8.1 (10 de agosto) y 4.8.2 (11 de septiembre) también se publicaron como actualizaciones de seguridad.

## Qué significa para ti si vives en España

Si usas Electrum, la medida es sencilla: actualiza a la 4.8.3 descargándola solo desde la web oficial del proyecto. No hace falta mover tus bitcoin ni cambiar tu frase semilla: el fallo, tal como lo describe el aviso, no revela claves, sino que se aprovecha de un momento concreto en que tú firmas una transacción.

Mientras no actualices, el aviso recomienda revisar siempre las direcciones de destino y los importes de cualquier transacción antes de firmar, incluidas las que subes de comisión. Si solo te conectas a servidores propios o de confianza, el aviso indica que no estás afectado.

Si usas otra wallet o dejas tus criptomonedas en un exchange autorizado en España, esta noticia no te obliga a hacer nada: el fallo es específico de Electrum. Sí es un buen recordatorio de que la seguridad no depende solo de guardar bien la clave privada, sino también de revisar lo que firmas.

En cuanto a impuestos, un pago desviado por un fallo como este no cambia por sí solo tus obligaciones, pero si llegaras a perder fondos por un robo, conviene saber cómo se trata en la declaración de la Renta; tienes la explicación en la respuesta sobre estafas y hackeos de nuestro sitio.

## Para entenderlo

- [Seguridad en criptomonedas](/aprende/seguridad-cripto): repasa las buenas prácticas básicas, desde las copias de la frase semilla hasta la verificación de lo que firmas.
- [Mempool en el glosario](/glosario#mempool): explica la «sala de espera» donde esperan las transacciones sin confirmar, que es donde se produce este engaño.
- [Nodo en el glosario](/glosario#nodo): aclara qué es un nodo y por qué conectarte a uno propio o de confianza reduce este tipo de riesgo.
- [Declarar una estafa o un hackeo](/respuestas/declarar-estafa-o-hackeo): qué ocurre con la Renta si pierdes fondos por un robo.
