---
updated: 2026-10-13
practicalExamples:
  - "Comprobar en qué red está un token antes de enviarlo, porque el mismo nombre puede existir en varias capas 1"
  - "Comparar cuántos validadores independientes tiene una red antes de confiarle fondos importantes"
  - "Tener un poco del token nativo de cada red que uses para pagar sus comisiones"
advantages:
  - "Cada red define sus propias reglas y su propio modelo de seguridad"
  - "Las más consolidadas llevan años funcionando con miles de nodos"
  - "Son la base sobre la que se construyen aplicaciones y redes de capa 2"
sources:
  - title: "ethereum.org: Mecanismos de consenso"
    url: "https://ethereum.org/es/developers/docs/consensus-mechanisms/"
  - title: "ethereum.org: Escalabilidad"
    url: "https://ethereum.org/es/developers/docs/scaling/"
  - title: "Satoshi Nakamoto: Bitcoin, a Peer-to-Peer Electronic Cash System (white paper, 2008)"
    url: "https://bitcoin.org/bitcoin.pdf"
---
## Qué es una capa 1

Una **capa 1** (*layer 1*) es una blockchain base: tiene su propia red de nodos, su propio mecanismo de consenso, su propio token nativo y no depende de otra cadena para su seguridad. Bitcoin, Ethereum, Solana o Cardano son capas 1.

Sobre ellas se pueden construir otras capas, como las [redes de capa 2](/academia/layer-2), que procesan operaciones fuera de la cadena principal y se apoyan en ella para su seguridad.

## El trilema de la escalabilidad

Diseñar una capa 1 implica equilibrar tres objetivos que tiran en direcciones opuestas:

- **Seguridad:** que sea muy caro atacarla.
- **Descentralización:** que la mantengan muchos participantes independientes, y que cualquiera pueda verificarla con un ordenador normal.
- **Escalabilidad:** que procese muchas operaciones por segundo y con comisiones bajas.

Es fácil conseguir dos y muy difícil las tres a la vez. Una red puede ser rapidísima si la mantienen pocos ordenadores potentes, pero entonces está más centralizada. Bitcoin y Ethereum priorizan la seguridad y la descentralización, y buscan escalar mediante capas superiores.

## Diferencias que importan

| Aspecto | Qué preguntar |
|---|---|
| Consenso | ¿Prueba de trabajo, de participación u otro? ¿Qué cuesta atacarla? |
| Validadores | ¿Cuántos hay y cuán repartidos están? ¿Quién puede ser validador? |
| Requisitos de un nodo | ¿Puede una persona normal verificar la red, o hacen falta servidores caros? |
| Historial | ¿Ha sufrido caídas o paradas? ¿Cuánto tiempo lleva funcionando? |
| Ecosistema | ¿Hay uso real, desarrolladores y aplicaciones, o sobre todo especulación? |

## Monolíticas y modulares

Las capas 1 tradicionales hacen todo en la misma cadena: ejecutar las transacciones, ordenarlas, asegurar su validez y guardar los datos. Son **monolíticas**. La tendencia reciente es separar esas funciones en capas especializadas, lo que se llama [blockchains modulares](/academia/modular-blockchains). Ethereum, por ejemplo, se ha orientado a ser la capa de seguridad y de datos para las redes de capa 2.

## Errores habituales

- **Elegir una red solo por su velocidad** sin mirar cuántos validadores la mantienen.
- **Enviar tokens a la red equivocada.** Un mismo token puede existir en varias capas 1; si envías por una red que el destino no admite, puedes perderlo.
- **Pensar que "más transacciones por segundo" es igual a "mejor".** Lo que importa es si la red es segura y si alguien la usa de verdad.

Ninguna mención a redes concretas es una recomendación de inversión. Si te interesa el token de una capa 1, usa la lista de comprobación de [cómo analizar un proyecto cripto](/aprende/analisis-proyectos-cripto).
