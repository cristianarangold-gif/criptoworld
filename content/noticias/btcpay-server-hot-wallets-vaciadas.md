---
titulo: "BTCPay Server pide apagar los servidores tras vaciarse hot wallets y apunta a versiones anteriores a la 2.4.2"
descripcion: "BTCPay Server avisó el 1 de noviembre de ataques a hot wallets. Los robos afectan a versiones antiguas; la 2.4.7 no ha dado señales de problemas."
fecha: 2026-11-02
fuentes:
  - title: "CoinDesk: BTCPay, a bitcoin payment tool, tells users to switch off their servers after reports of drained wallets"
    url: "https://www.coindesk.com/tech/2026/11/02/btcpay-a-bitcoin-payment-tool-tells-users-to-switch-off-their-servers-after-reports-of-drained-wallets"
  - title: "Cointelegraph: BTCPay Server warns of hot wallet thefts running on outdated software"
    url: "https://cointelegraph.com/news/btcpay-server-hot-wallet-thefts-older-versions"
  - title: "GitHub: versiones de BTCPay Server (v2.4.6 y v2.4.7)"
    url: "https://github.com/btcpayserver/btcpayserver/releases"
  - title: "BTCPay Server: Security Advisory, update to 2.4.2 immediately (agosto de 2026)"
    url: "https://blog.btcpayserver.org/security-advisory-btcpay-server-2-4-2/"
relacionados:
  - title: "Hot wallet"
    href: "/glosario#hot-wallet"
  - title: "Seed phrase: qué es y cómo guardarla"
    href: "/academia/seed-phrase"
  - title: "Seguridad en criptomonedas: cómo proteger tus fondos paso a paso"
    href: "/aprende/seguridad-cripto"
---
BTCPay Server, el programa gratuito y de código abierto con el que muchos comercios aceptan pagos en bitcoin, pidió el domingo 1 de noviembre de 2026 a sus usuarios que apagaran sus servidores. Había recibido avisos de que atacantes estaban vaciando hot wallets, es decir, carteras cuya frase de recuperación está guardada en un servidor conectado a internet. El lunes 2, el proyecto indicó que los robos afectan a instalaciones con versiones antiguas del programa.

## Qué ha pasado

Según CoinDesk, que cita la publicación de BTCPay en X, el proyecto escribió que recibía informes de hot wallets «barridas» por atacantes no autorizados, es decir, con todos sus fondos movidos en una sola transacción. Pidió a quien administre un servidor que lo detuviera con el script `./btcpay-down.sh` hasta que terminara la investigación.

Unas dos horas después, el fundador, Nicolas Dorier, añadió en X que los robos «parecen implicar» versiones anteriores a la 2.4.2 y que los servidores públicos del propio proyecto, con la 2.4.7, no fueron atacados. Según CoinDesk, explicó que el atacante entró como administrador en los servidores afectados y que se desconoce cómo consiguió ese acceso.

Cointelegraph recoge que, el lunes, BTCPay dijo haber identificado un vector de ataque que afecta a las versiones 2.4.1 o anteriores. También afirmó no tener informes creíbles de vaciados entre quienes usan la última versión, la 2.4.7, y pidió a los operadores que actualicen. Cointelegraph añade que la 2.4.1 salió el 23 de julio de 2026.

Lo que no se sabe: el proyecto no ha publicado cuántos servidores están afectados, cuánto dinero se ha perdido ni cómo se obtuvo el acceso de administrador. Cointelegraph señala que tampoco está claro si este ataque guarda relación con el de agosto.

Aquel ataque de agosto es el antecedente. Según el aviso de seguridad de BTCPay del 7 de agosto, una vulnerabilidad crítica afectaba a todas las versiones anteriores a la 2.4.2 y, en instalaciones con LND, permitía a un tercero obtener credenciales para controlar un nodo de Lightning y mover sus fondos. La 2.4.2 la corrigió. En la página de versiones del proyecto en GitHub constan después la 2.4.6 (26 de octubre) y la 2.4.7 (29 de octubre), ambas con correcciones de seguridad.

BTCPay no es una empresa con control central: cada comercio instala y administra su propio servidor. Por eso el proyecto no pudo apagar nada por su cuenta y tuvo que pedírselo a cada operador.

## Qué significa para ti si vives en España

Si solo compras criptomonedas en un exchange o guardas las tuyas en una hardware wallet, este aviso no te afecta directamente: BTCPay Server lo instalan quienes cobran con bitcoin, como tiendas, asociaciones o desarrolladores.

Si tienes un comercio o un servidor propio con BTCPay, las fuentes y la documentación del proyecto apuntan a lo siguiente. Comprueba qué versión usas y actualiza a la última. Según la documentación citada por CoinDesk, una hot wallet guarda la frase en el servidor y este puede firmar pagos sin otra aprobación, algo que el propio proyecto marca como peligroso. Por eso, lo que conviene hacer es dejar en una hot wallet solo lo que necesites para operar y guardar el resto en una cartera cuya frase no esté en un servidor. Si ves movimientos que no reconoces, BTCPay pide enviar información y registros a su equipo de seguridad.

Si hubieras perdido fondos, lo primero es denunciar y guardar los hashes de las transacciones. Cómo puede tratarse esa pérdida en la Renta lo explica la respuesta [declarar una estafa o un hackeo](/respuestas/declarar-estafa-o-hackeo).

Si no cambia nada en tu operativa, tampoco hay una acción fiscal nueva: el aviso no modifica ninguna obligación en España.

## Para entenderlo

- [Hot wallet](/glosario#hot-wallet): define este tipo de cartera y explica por qué guardar la frase en un servidor la hace más expuesta.
- [Seed phrase](/academia/seed-phrase): explica por qué quien conoce la frase de recuperación controla todos los fondos.
- [Seguridad en criptomonedas](/aprende/seguridad-cripto): repasa cómo repartir fondos y reducir riesgos al guardarlos.
