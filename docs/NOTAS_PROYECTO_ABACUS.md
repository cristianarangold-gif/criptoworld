# CriptoMundo — Notas del Proyecto

## Resumen
Plataforma informativa y educativa sobre criptomonedas, en español. MVP: landing, mercado en vivo, noticias RSS reales, artículos educativos originales, área personal con cartera virtual y simulador.

## Diseño
- Tema: dark fintech (#070B14 fondo, #0D1420 paneles, naranja Bitcoin #F7931A como primary, violeta Ethereum #627EEA como secondary, verde #10B981 ganancias, rojo #EF4444 pérdidas)
- Tipografía: Space Grotesk (display) + Inter (sans)
- Estilo: glassmorphism sutil (glass-card), bordes suaves, glow effects

## Datos externos (server-side)
- CoinGecko API (mercado) con revalidate 60s, fallback CoinCap
- RSS: CoinDesk, Cointelegraph, Cointelegraph ES, Decrypt — caché 1h, deduplicación por URL
- NUNCA claves API en frontend; todo fetch server-side

## Base de datos
- User (auth), PortfolioPosition (cartera virtual), Article (educativos, sembrados)
- 10 artículos educativos completos en español, sembrados

## Auth
- Email/contraseña con Auth.js v5, JWT strategy
- Páginas: /login, /signup, /area-personal (protegida)

## Estructura de páginas
- / (home): hero + mercado resumen + noticias + artículos
- /mercado: tabla en vivo, buscador, detalle con gráfico
- /noticias: feed RSS real con categorías
- /aprende: listado artículos + /aprende/[slug]
- /area-personal: cartera virtual CRUD + simulador
- /aviso-legal: disclaimer completo
- /login, /signup: auth pages

## Reglas del usuario
- Todo en español
- Nunca inventar noticias ni datos
- Avisos legales "no asesoramiento" obligatorios
- Sin funciones extra no pedidas
