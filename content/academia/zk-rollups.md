---
updated: 2026-10-13
practicalExamples:
  - "Retirar fondos de un ZK-rollup a Ethereum sin esperar el plazo de impugnación de los optimistic rollups"
  - "Comprobar en L2BEAT quién genera las pruebas y quién puede actualizar los contratos de un ZK-rollup"
  - "Verificar con una sola prueba en Ethereum la validez de miles de transacciones"
commonMistakes:
  - "Pensar que 'ZK' significa automáticamente que las transacciones son privadas"
  - "Dar por hecho que un ZK-rollup es más seguro sin mirar su nivel de madurez"
  - "Confundir distintos sistemas de prueba (SNARK, STARK) como si fueran lo mismo"
sources:
  - title: "ethereum.org: Zero-knowledge rollups"
    url: "https://ethereum.org/es/developers/docs/scaling/zk-rollups/"
  - title: "ethereum.org: Pruebas de conocimiento cero"
    url: "https://ethereum.org/es/zero-knowledge-proofs/"
  - title: "L2BEAT: análisis de riesgos de las redes de capa 2"
    url: "https://l2beat.com/scaling/summary"
---
## Pruebas de conocimiento cero, en una frase

Una **prueba de conocimiento cero** (*zero-knowledge proof*, ZK) permite demostrar que una afirmación es verdadera **sin revelar toda la información** que la sustenta, y de forma que verificar la prueba sea muchísimo más rápido que repetir el cálculo.

Para escalar blockchains, lo importante es la segunda parte: comprimir la verificación. En lugar de que Ethereum vuelva a ejecutar miles de transacciones, basta con que compruebe una prueba pequeña de que se ejecutaron correctamente.

## Cómo funciona un ZK-rollup

1. El **secuenciador** recibe y ordena las transacciones.
2. Un **probador** (*prover*) ejecuta el lote y genera una prueba criptográfica de que el nuevo estado es correcto. Es un cálculo pesado que requiere hardware potente.
3. El rollup publica en Ethereum los datos comprimidos del lote y la prueba.
4. Un contrato en Ethereum **verifica la prueba**. Si es válida, el nuevo estado queda aceptado de forma definitiva.

## Frente a los optimistic rollups

| | ZK-rollups | [Optimistic rollups](/academia/rollups) |
|---|---|---|
| Garantía de corrección | Prueba matemática con cada lote | Plazo para presentar pruebas de fraude |
| Retirada a Ethereum | En cuanto se verifica la prueba | Tras el plazo (unos 7 días) |
| Coste de funcionamiento | Generar pruebas es caro | Más barato de operar |
| Compatibilidad con Ethereum | Históricamente más difícil, hoy muy mejorada | Alta desde el principio |

## SNARK y STARK

Son dos grandes familias de sistemas de prueba:

- **SNARK:** pruebas muy pequeñas y baratas de verificar. Algunas necesitan una "ceremonia" inicial de configuración en la que hay que confiar en que se destruyeron ciertos datos secretos.
- **STARK:** no necesitan esa configuración inicial y se consideran resistentes a futuros ordenadores cuánticos, a cambio de pruebas más grandes.

No es que una sea mejor que la otra: son compromisos distintos.

## "ZK" no significa privado

Aunque la tecnología permite ocultar información, **la mayoría de ZK-rollups no son privados**: publican los datos de las transacciones para que cualquiera pueda reconstruir el estado. Usan las pruebas para escalar, no para ocultar. Existen proyectos centrados en la privacidad, pero son otra categoría.

## Riesgos

- **Complejidad:** los circuitos que generan las pruebas son software muy complejo; un error podría aceptar un estado incorrecto. Por eso muchos rollups mantienen mecanismos de seguridad adicionales.
- **Centralización:** en muchos casos un único secuenciador y un único probador, operados por el equipo.
- **Contratos actualizables:** quién puede cambiarlos y con cuánto aviso es una pregunta clave.

Como con cualquier [red de capa 2](/academia/layer-2), consulta su nivel de madurez antes de dejar fondos importantes.
