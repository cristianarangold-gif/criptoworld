---
titulo: "1Password sufre una brecha en sus sistemas: expuestos nombres y correos, pero no las bóvedas"
descripcion: "Un atacante entró en el GitHub de un empleado de 1Password y descargó datos de cuentas. La empresa asegura que las bóvedas no se vieron afectadas."
fecha: 2026-11-26
fuentes:
  - title: "1Password: Update on the November 2026 security incident"
    url: "https://1password.com/blog/update-on-nov-2026-security-incident"
  - title: "Cointelegraph: 1Password hacker stole customer names and emails, but vaults safe"
    url: "https://cointelegraph.com/news/1password-hacker-stole-customer-names-and-emails-but-vaults-safe"
relacionados:
  - title: "Seguridad en criptomonedas: cómo proteger tus fondos paso a paso"
    href: "/aprende/seguridad-cripto"
  - title: "Phishing en el glosario"
    href: "/glosario#phishing"
  - title: "Estafas con criptomonedas: cómo reconocerlas"
    href: "/aprende/estafas-cripto"
---
1Password, uno de los gestores de contraseñas más usados del mundo, ha reconocido una brecha de seguridad en sus sistemas internos. Según la empresa, un atacante descargó datos administrativos de un subconjunto de clientes, como nombres y correos electrónicos. La compañía afirma que en ningún momento tuvo acceso al contenido de las bóvedas, donde se guardan las contraseñas y otros secretos.

## Qué ha pasado

Según el comunicado de 1Password, la investigación empezó el 19 de noviembre de 2026, al detectar indicios de que alguien había accedido a la cuenta corporativa de GitHub de un empleado. La empresa publicó su actualización el 25 de noviembre. Con ese acceso, el atacante pudo llegar al código fuente, introducir código malicioso en servicios internos y, con él, descargar datos de clientes. También copió código de repositorios privados y llegó al sistema que construye y publica el software.

Los datos descargados corresponden a registros de cuentas de un subconjunto de usuarios. Incluyen nombres y correos electrónicos, identificadores de cuenta, fechas de creación y de último inicio de sesión, claves públicas y otros metadatos internos que la empresa califica de no secretos. También se obtuvieron tokens presentes en ciertos enlaces de invitación, de aprovisionamiento y de recuperación de cuentas. 1Password no da una cifra de afectados y señala que ha avisado de forma individual a un pequeño número de usuarios que estaban en proceso de invitación o de recuperación.

La empresa sostiene que las bóvedas y su contenido, las claves que las protegen, las claves de recuperación y las aplicaciones no se vieron afectadas. Añade que los tokens robados no bastan por sí solos para entrar en una cuenta, porque haría falta además un inicio de sesión corporativo o el código que llega al correo registrado, y dice no haber encontrado evidencia de tomas de control de cuentas.

Como respuesta, 1Password desactivó la cuenta de GitHub afectada, revocó el token robado, rotó las credenciales internas que podían estar expuestas y reforzó los controles de su infraestructura. Además, alargó el código de los correos de invitación y recuperación: pasa de seis dígitos numéricos a diez caracteres alfanuméricos. Ha contratado a expertos independientes para validar la contención. Según Cointelegraph, que recogió la noticia, la empresa de seguridad se asoció en 2022 con Phantom para que los usuarios pudieran guardar en 1Password las contraseñas y las frases de recuperación de sus wallets.

## Qué significa para ti si vives en España

Si usas 1Password, la propia empresa dice que no tienes que cambiar nada en tu cuenta. Lo que sí conviene es estar atento, porque lo robado, un nombre y un correo asociados a un gestor de contraseñas, es justo lo que usan los estafadores para fabricar mensajes creíbles. 1Password avisa de que pueden llegar correos, SMS o llamadas inesperados que mencionen invitaciones o intentos de recuperación de la cuenta. Recuerda que la empresa afirma que nunca te pedirá la contraseña de tu cuenta ni la Secret Key, y que solo debes introducirlas en la aplicación oficial o escribiendo tú mismo la dirección del sitio oficial. Si dudas, el contacto indicado para avisar de actividad sospechosa es support@1password.com.

Para quien guarda cosas relacionadas con criptomonedas en un gestor de contraseñas, como el acceso a un exchange o la frase de recuperación de una wallet, este incidente es un recordatorio práctico. De momento no hay constancia de que se haya perdido ninguna bóveda, pero sí de que un correo que dice venir de tu gestor puede ser falso. Activa la verificación en dos pasos en tus exchanges y revisa que los avisos de seguridad que recibes llevan a la web oficial y no a un enlace del mensaje.

En la práctica, esta brecha no cambia tus obligaciones fiscales ni tus derechos como cliente de un exchange autorizado en España. Si recibes un mensaje sospechoso y has perdido dinero por un engaño, en la respuesta sobre estafas e hackeos explicamos cómo se trata en la Renta.

## Para entenderlo

- [Seguridad en criptomonedas: cómo proteger tus fondos paso a paso](/aprende/seguridad-cripto): explica por qué la frase de recuperación debe guardarse con cuidado y cómo reducir riesgos.
- [Phishing en el glosario](/glosario#phishing): cómo funcionan los mensajes falsos que imitan a una empresa de confianza.
- [Estafas con criptomonedas: cómo reconocerlas](/aprende/estafas-cripto): ejemplos de engaños frecuentes y señales para detectarlos.
