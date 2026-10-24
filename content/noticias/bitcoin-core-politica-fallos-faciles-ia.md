---
titulo: "Bitcoin Core cambia su política de seguridad para los fallos que cualquiera puede encontrar con ayuda de la IA"
descripcion: "El proyecto corregirá lo antes posible, en todas las versiones mantenidas, los fallos fáciles de descubrir, pues los LLM reducen su dificultad."
fecha: 2026-10-24
fuentes:
  - title: "Bitcoin Core: política de seguridad y avisos (bitcoincore.org)"
    url: "https://bitcoincore.org/en/security-advisories/"
  - title: "GitHub: Update security policy for easy-to-find vulnerabilities (PR 1281)"
    url: "https://github.com/bitcoin-core/bitcoincore.org/pull/1281"
  - title: "Lista bitcoindev: anuncio de Antoine Poinsot (22 de octubre de 2026)"
    url: "https://groups.google.com/g/bitcoindev/c/70VSp_ARD5Q"
  - title: "CriptoNoticias: Bitcoin Core ajusta su política de seguridad ante fallas detectables con IA"
    url: "https://www.criptonoticias.com/tecnologia/bitcoin-core-ajusta-politica-seguridad-fallas-detectables-ia/"
relacionados:
  - title: "Seguridad cripto: cómo protegerte de estafas y hackeos"
    href: "/aprende/seguridad-cripto"
  - title: "Wallet: qué es y cómo elegir una"
    href: "/academia/wallet"
  - title: "Bitcoin: qué es y cómo funciona"
    href: "/academia/bitcoin"
---
Bitcoin Core, el software de referencia que ejecutan la mayoría de los nodos de la red Bitcoin, ha modificado su política de seguridad. El cambio, anunciado el 22 de octubre de 2026 por el desarrollador Antoine Poinsot, afecta a los fallos que cualquiera podría descubrir con poco esfuerzo, por ejemplo preguntándole a un modelo de lenguaje (LLM). Para esos casos el proyecto renuncia a mantenerlos en secreto durante mucho tiempo y prioriza sacar una versión corregida cuanto antes.

## Qué ha pasado

Poinsot explicó el cambio en la lista de correo de desarrolladores bitcoindev el 22 de octubre. La propuesta se había abierto en GitHub el 16 de octubre, en el repositorio de la web del proyecto, y el desarrollador fanquake la fusionó el 22 de octubre tras recibir varias aprobaciones de otros colaboradores.

El motivo que da Poinsot es que ha aumentado el número de informes sobre vulnerabilidades que cualquiera puede redescubrir con facilidad, en parte porque los LLM reducen mucho la dificultad de encontrar ciertos tipos de fallos o de deducir qué corrige un parche publicado sin explicación. Según su mensaje, la política anterior favorecía un largo periodo de embargo, es decir, de silencio sobre los detalles. Como muchos usuarios tardan en actualizar, las correcciones no se llevaban a versiones antiguas y solo llegaban con la siguiente versión mayor. Para los fallos fáciles de encontrar, razona, el embargo protege poco y solo retrasa la disponibilidad de una versión corregida.

La política que figura ahora en bitcoincore.org establece lo siguiente:

- Durante el triaje, el equipo puede marcar un fallo como «fácil de encontrar». Entra aquí, en la práctica, lo que podría descubrirse con una consulta sencilla a un LLM, aunque la categoría no se limita a eso.
- En esos casos se prepara la corrección para todas las versiones que el proyecto mantiene en ese momento y se publica una versión puntual lo antes posible, junto con un aviso de seguridad con algunos detalles.
- Para el resto, los plazos no cambian. Los fallos de gravedad baja se divulgan dos semanas después de publicar la versión mayor que los corrige. Los de gravedad media y alta, dos semanas después de que termine el soporte de la última versión afectada, lo que según la propia página ocurre aproximadamente un año después de la primera versión con la corrección.
- Los fallos críticos quedan fuera de esta política estándar: la página indica que probablemente exigirían un procedimiento a medida.

En la discusión de GitHub hubo matices. Una propuesta para revelar el fallo, como muy tarde, al abrir la corrección pública no se incorporó al texto. Otra, que hacía opcional el aviso de seguridad, fue rechazada por Poinsot porque publicar un aviso sin detalles podría provocar migraciones precipitadas.

Según CriptoNoticias, que recoge la noticia, el cambio llega después de que en agosto un grupo llamado Bitcoin Red Team informara de unos 5.000 problemas potenciales en 390 proyectos, de los que solo una parte se había reproducido entonces, y de que Core Lightning pidiera a sus operadores actualizar tras recibir informes generados con IA. Esos datos proceden del medio, no de la política de Bitcoin Core.

## Qué significa para ti si vives en España

Si tienes bitcoin en un exchange regulado o en una cartera de custodia propia, la política no te obliga a hacer nada hoy. No se ha anunciado ningún fallo concreto ni ninguna vulnerabilidad activa, y esto es un cambio de procedimiento, no un incidente.

Donde sí puede notarse es en quienes ejecutan su propio nodo de Bitcoin Core, algo habitual entre aficionados y usuarios avanzados. Con la nueva política, las versiones puntuales de corrección pueden aparecer con más frecuencia y para versiones que ya no son la última. Mantener el nodo actualizado y leer los avisos de seguridad del proyecto pasa a ser más importante que antes, porque el aviso llegará junto con la versión corregida y no meses después.

Para quien no tiene nodo, la lección es indirecta: la seguridad de tus fondos depende de varias capas (el software de la red, el de tu cartera, el exchange y tus propios hábitos). Conviene mantener actualizadas las aplicaciones de cartera y desconfiar de mensajes que apremien a «actualizar urgentemente» desde enlaces recibidos por correo o redes sociales; los avisos legítimos se consultan siempre en la web oficial del proyecto.

Tampoco cambia nada en la fiscalidad ni en la regulación: es una decisión técnica de un proyecto de software de código abierto.

## Para entenderlo

- [Seguridad cripto: cómo protegerte de estafas y hackeos](/aprende/seguridad-cripto): para repasar los riesgos más comunes y los hábitos básicos de protección, incluidos los falsos avisos de actualización.
- [Wallet: qué es y cómo elegir una](/academia/wallet): para entender qué parte de la seguridad depende del software de tu cartera y cuál de ti.
- [Bitcoin: qué es y cómo funciona](/academia/bitcoin): para situar qué es un nodo y qué papel juega el software de la red.
