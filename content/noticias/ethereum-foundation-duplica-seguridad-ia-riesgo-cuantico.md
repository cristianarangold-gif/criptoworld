---
titulo: "La Ethereum Foundation duplica su equipo de seguridad y ve en la IA un riesgo más urgente que el cuántico"
descripcion: "La fundación plantea firmas basadas en hashes para validadores, wallets y blobs, mantiene 2029 como fecha límite interna y revisará el calendario en enero."
fecha: 2026-11-25
fuentes:
  - title: "Ethereum Foundation: PQAI #0 (blog oficial, 23 de noviembre de 2026)"
    url: "https://blog.ethereum.org/en/2026/11/23/pqai-0"
  - title: "The Block: Ethereum Foundation doubles protocol security team, calls AI a more urgent risk than quantum"
    url: "https://www.theblock.co/news/ecosystems/2026-11-24-ethereum-foundation-doubles-protocol-security-team-calls-ai-a-more-urgent-risk-than-quantum-445497"
relacionados:
  - title: "Ethereum: qué es y cómo funciona"
    href: "/academia/ethereum"
  - title: "Clave privada en el glosario"
    href: "/glosario#clave-privada"
  - title: "Seguridad en criptomonedas: cómo proteger tus fondos paso a paso"
    href: "/aprende/seguridad-cripto"
---
La Ethereum Foundation (EF) publicó el 23 de noviembre de 2026 en su blog oficial un plan para reforzar la criptografía de Ethereum. En él explica que ha duplicado su equipo de seguridad del protocolo y que considera la inteligencia artificial un riesgo más inmediato que la computación cuántica. Es un plan de trabajo a varios años vista: hoy no cambia nada para quien usa la red.

## Qué ha pasado

Según la entrada de la EF, la fundación lleva años preparando defensas contra el riesgo cuántico, pero ahora ve la IA como una amenaza más urgente. Sus argumentos son que los modelos ya encuentran errores en software de producción más rápido de lo que las personas pueden revisarlos, y que han empezado a mejorar algoritmos antiguos. La EF aclara que esto no significa que la IA vaya a romper las suposiciones matemáticas de las que depende la criptografía actual. Su razonamiento es de gestión de riesgos: prefiere apoyarse en supuestos más sencillos antes que esperar a que la IA mejore de forma exponencial.

Para ello propone sustituir las curvas elípticas, que son la base de las firmas actuales, por criptografía basada en funciones hash. Como el protocolo ya depende de la seguridad de los hashes, el cambio no añade una suposición nueva. El plan afecta a tres áreas: el consenso, donde los validadores firmarían con claves basadas en hashes; las cuentas de usuario, donde las wallets ofrecerían una vía sencilla para migrar a este tipo de firmas; y los datos, donde los blobs pasarían a usar compromisos basados en hashes.

La fundación dice que ha duplicado el tamaño de su equipo de seguridad del protocolo para compensar un ritmo de desarrollo más rápido, que facilita introducir errores. La entrada no da cifras de personal. También avisa de que las nuevas firmas serán mucho más grandes, por lo que habrá que vigilar los requisitos de hardware para que se puedan seguir ejecutando nodos en casa.

Sobre los plazos, la EF mantiene 2029 como fecha límite interna y prevé revisar el calendario en enero. Justin Drake propuso en Devcon diciembre de 2028 como objetivo, según recoge la propia entrada. The Block añade que Ethlabs, una organización sin ánimo de lucro fundada por antiguos investigadores de la EF, plantea adelantar la fecha a 2027 con una iniciativa llamada pqai27. La EF indica además que ya han empezado las especificaciones tempranas y la primera devnet de la parte de consenso, y que quedan llamadas de desarrolladores este año para decidir qué funciones se podrían retirar de la próxima actualización.

The Block menciona también que Protocol Guild, un grupo independiente que financia a desarrolladores del núcleo de Ethereum, informó de una caída del 9,5 % en sus miembros, hasta 172. Su organizador, Trent Van Epps, advirtió de que la falta de fondos podría ralentizar las actualizaciones.

## Qué significa para ti si vives en España

En la práctica, hoy no tienes que hacer nada. No hace falta mover fondos, cambiar de wallet ni modificar cómo guardas tus claves, y la noticia no altera cómo declaras tus operaciones en la Renta. No hay una vulnerabilidad descrita ni un ataque en curso: se trata de una hoja de ruta técnica con fechas todavía por confirmar.

Lo que sí conviene entender es por qué importa. Tus fondos en Ethereum se protegen con una clave privada, y las firmas actuales se apoyan en matemáticas que un ordenador cuántico muy potente podría llegar a poner en duda en el futuro. Si la red cambia sus reglas de firma, la migración llegará a través de las wallets y los exchanges, con avisos oficiales de cada proveedor y de la comunidad de Ethereum.

Mientras tanto, mantén la precaución habitual. Cada anuncio técnico de este tipo suele venir acompañado de mensajes falsos que te piden tu frase semilla o que «migres» tus fondos a una web concreta. Ninguna actualización legítima de Ethereum te exige hacerlo, y esta ni siquiera está en marcha. Si dudas de un aviso, no pulses enlaces recibidos por mensaje y entra siempre desde la web oficial de tu wallet o de tu plataforma.

## Para entenderlo

- [Ethereum: qué es y cómo funciona](/academia/ethereum): explica la red cuya seguridad criptográfica quiere reforzar la fundación.
- [Clave privada en el glosario](/glosario#clave-privada): aclara qué protege tus fondos y por qué las firmas son el punto en el que se centra el cambio.
- [Seguridad en criptomonedas: cómo proteger tus fondos paso a paso](/aprende/seguridad-cripto): recoge hábitos para no caer en los mensajes falsos que acompañan a estos anuncios.
