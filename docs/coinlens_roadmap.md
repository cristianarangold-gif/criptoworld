# CoinLens — Crypto Finance Platform

**PROJECT ROADMAP · Fase 1: Análisis y Arquitectura**

> Nombre de marca provisional (placeholder). La identidad se puede renombrar en una fase posterior sin coste de arquitectura.

---

## 1. Análisis del proyecto

**Producto:** plataforma financiera especializada en Bitcoin y criptomonedas que combina:
datos de mercado en tiempo real, noticias con fuentes verificables, academia de inversión,
tracker de portfolio personal y watchlist — con identidad visual propia (premium, fintech, dark-first).

**Audiencia:** público internacional (inglés como idioma principal, español como segunda lengua) con dos perfiles:
lector/inversor informado y principiante que necesita educación.

**Restricciones críticas del producto:**
- No inventar noticias: todo artículo externo debe tener fuente, URL original y fecha real.
- Los datos de mercado deben proceder de APIs reales; si se usa contenido demo, debe etiquetarse como tal.
- Disclaimer financiero explícito en todo el contenido editorial.
- Cumplimiento básico de privacidad/cookies (páginas legales, aviso de cookies).

**Enfoque de entrega:** construcción iterativa por hitos verificables (ver §9). Cada hito se
despliega y se puede revisar antes de continuar. Esto evita el riesgo de un "monolito inacabado".

---

## 2. Decisiones de arquitectura y stack (con justificación)

| Decisión | Elección | Por qué |
|---|---|---|
| Framework | **Next.js (App Router) + React + TypeScript** | SSR/ISR para SEO y rendimiento, API routes para backend unificado, ecosistema maduro, portabilidad a Vercel. |
| Estilos | **Tailwind CSS + shadcn/ui** | Design system profesional rápido de construir, accesible y sin dependencias pesadas. |
| Base de datos | **PostgreSQL** (hosted, gestionado por la plataforma) | Elección del usuario. Postgres gestionado evita operar Supabase por separado; el esquema es 100% portable a Supabase/Vercel Postgres si se migra el hosting. |
| ORM | **Prisma** | Migraciones versionadas, tipos generados, mantenible. |
| Autenticación | **Auth.js (NextAuth) con Credentials (email+password) + bcrypt** | Sin dependencias externas; sesiones en cookies httpOnly seguras; verificación por email con token en BD. Google OAuth se añadirá después (requiere client ID del usuario). |
| Precios de mercado | **CoinGecko API (pública, cacheada) + fallback CoinCap** | Sin API key en el punto de entrada; capa de datos propia con caché, retry y fallback (ver §4). |
| Gráficos | **lightweight-charts** (precio) + **Recharts** (portfolio/alocación) | TradingView-like para precio con buen comportamiento móvil; Recharts para charts de cartera. |
| Noticias | **Agregación RSS server-side con atribución** (ver §5) | Fuentes reales y verificables sin depender de APIs de pago ni de contenido inventado. |
| i18n | **Rutas `/en` y `/es` + diccionarios de UI** | SEO correcto por idioma, sin recarga (conmutador de idioma client-side que cambia la ruta). |
| Despliegue | **Hosting de la plataforma Abacus (preview + producción)** | Despliegue gestionado; el código Next.js es portable a Vercel en el futuro con el mismo esquema. |
| CMS | **CMS propio sobre el panel /admin** | Para noticias, artículos educativos y contenido de home; sin coste por usuario, control total y datos en la misma BD. Integración con Sanity/Strapi se puede añadir después sin romper nada. |

**Por qué no:** no se usa Supabase como servicio externo (misma BD Postgres sin cuenta adicional que gestionar); no se
usa CMS externo en v1 (coste/registro innecesario); no se exponen claves en el frontend nunca.

---

## 3. Estructura del proyecto

```
coinlens/
├─ app/
│  ├─ [locale]/                    # rutas internacionalizadas (/en, /es)
│  │  ├─ (public)/
│  │  │  ├─ page.tsx               # Home
│  │  │  ├─ markets/               # tabla de criptomonedas
│  │  │  ├─ crypto/[slug]/         # detalle de criptomoneda + gráfico
│  │  │  ├─ news/                  # blog + categorías + buscador
│  │  │  ├─ news/[slug]/           # artículo
│  │  │  ├─ learn/                 # Crypto Academy
│  │  │  ├─ learn/[slug]/
│  │  │  ├─ dashboard/             # privado (portfolio, watchlist)
│  │  │  ├─ login | register | forgot-password
│  │  │  ├─ legal/                 # terms, privacy, cookies, risk
│  │  │  └─ ...
│  │  └─ layout.tsx                # html lang, fonts, theme, header/footer
│  ├─ admin/                       # panel de administración (rol ADMIN)
│  ├─ api/                         # route handlers (backend)
│  └─ sitemap.ts | robots.ts | manifest.ts
├─ components/  (ui/ shadcn, layout/, market/, news/, portfolio/, shared/)
├─ lib/         (db, auth, api-clients, cache, i18n, seo, validators)
├─ services/    (coingecko, coincap, news-aggregator, market-data)
├─ messages/    (en.json, es.json)
├─ prisma/      (schema + migrations + seeds)
├─ types/       (dominio tipado)
├─ hooks/       (react hooks reutilizables)
├─ public/      (imágenes, favicon, og)
└─ .env         (solo variables de servidor; nunca en frontend)
```

---

## 4. Capa de datos de mercado

- **CoinGecko API pública** (server-side, sin key): `/coins/markets`, `/coins/{id}` (ATH, ATL, supply, rank), `/coins/{id}/market_chart` (historico).
- **Fallback CoinCap**: si CoinGecko falla o limita, se sirve desde CoinCap.
- **Caché**: caché en memoria/BD con TTL (60–120 s para tickers, 24 h para metadatos) + `stale-while-revalidate`.
- **Rate limiting** en las rutas API propias, **timeout y retry**, y **estados de error/fallback claros en UI** (skeletons, empty states).
- Las claves (si alguna API las requiere) viven solo en variables de entorno del servidor.
- Datos de ejemplo, si se usan durante desarrollo, **siempre etiquetados como demo**.

## 5. Sistema de noticias (sin noticias inventadas)

1. **Agregador server-side** consulta feeds RSS reales (p. ej. CoinDesk, Cointelegraph, The Block, Decrypt…): título, imagen, resumen, autor, fecha original y **URL original**.
2. **Dedupe** por hash de URL canónica; se guarda en BD con estado `DRAFT | PUBLISHED`.
3. **Clasificación** por palabras clave en categorías propias (Bitcoin, Ethereum, Altcoins, Markets, Regulation…).
4. Refresco automático cada hora (**stale-while-revalidate** + endpoint interno `/api/cron/news` invocable por un cron externo o el agente programado de la plataforma), más botón "refresh" en admin.
5. El contenido editorial propio (academy, análisis) lo escribe la plataforma y se marca con su autor y fecha; nunca se presenta como noticia externa.
6. Disclaimer financiero estándar en todo artículo y pie de contenido.

## 6. Esquema de base de datos (v1 ampliable)

Tablas principales (PostgreSQL + Prisma):
`users`, `profiles` (rol: USER/ADMIN), `cryptocurrencies` (catálogo + snapshot), `news_articles`
(+ `news_categories`, relación N:M), `academy_articles`, `academy_categories`,
`portfolio_assets`, `transactions` (BUY/SELL/TRANSFER/STAKING_REWARD), `watchlists`,
`price_alerts` (arquitectura preparada), `newsletter_subscribers`, `sessions`/`verification_tokens`.

Convenciones: `id` UUID/autoincremental, `created_at`/`updated_at` en todas las tablas,
índices en las columnas de búsqueda/filtro (slug, categoría, fecha, user_id, asset_id),
FKs con `ON DELETE` coherente, checks de valores (amount > 0, tipo de transacción).

## 7. Autenticación, seguridad y privacidad

- Registro email+password (bcrypt, sin texto plano), login, **verificación de email por token** y **recuperación de contraseña** (token con expiración en BD).
- Sesiones en **cookies httpOnly + Secure + SameSite**; protección CSRF en mutaciones; validación de entrada en servidor (zod); queries parametrizadas (Prisma) → sin SQL injection; escape automático React → XSS mitigado.
- **Rate limiting** en login/registro/API.
- Panel `/admin` con **protección real en servidor** (rol ADMIN verificado en cada request), no solo UI.
- Páginas legales: Terms, Privacy, Cookie Policy, Risk Disclosure + aviso de cookies (consentimiento básico).

## 8. SEO, rendimiento y experiencia

- HTML semántico, metadata dinámica por página/idioma (title, description, canonical, OG, Twitter), rutas amigables.
- `sitemap.xml`, `robots.txt`, **JSON-LD** (Organization, NewsArticle, Article, BreadcrumbList).
- SSR/ISR para contenido público, `next/image` (lazy), `next/font` (self-hosted), sin JS innecesario.
- Skeletons, empty/error states, 404 personalizada, tooltips y microinteracciones sobrias.
- Objetivo Lighthouse ≥ 90 en las páginas clave; responsive mobile-first.

## 9. Roadmap por entregas (hitos verificables)

| Hito | Fases | Contenido |
|---|---|---|
| **M1 — Fundación + Home** | 2, 3, 4, 5, 14 | Scaffold, design system dark/light, header/nav/footer, i18n EN/ES, Home: ticker, market overview, trending, noticias (agregador RSS + BD), insights, newsletter (arquitectura), legal básico, SEO base |
| **M2 — Markets + Crypto** | 6, 7 | `/markets` (tabla completa: rank, precio, 1h/24h/7d, market cap, volumen, supply; búsqueda, orden, filtros, paginación), páginas `/crypto/[slug]` con gráfico interactivo 1D–ALL, stats, noticias del activo |
| **M3 — News completo** | 8 | `/news`: categorías, trending/latest/most read, buscador, artículo SEO completo (share, relacionados, fuentes), refresh automático |
| **M4 — Academy** | 9 | `/learn`: niveles Beginner/Investing/Security/Advanced, artículos con dificultad y tiempo de lectura, buscador global |
| **M5 — Cuentas + Dashboard** | 10, 11, 12, 13, 14 | Auth completo, dashboard (valor, P/L, alocación, watchlist, transacciones recientes), portfolio tracker con cálculos correctos y gráficos, watchlist |
| **M6 — Admin + Alertas** | 28, 29, 15 | `/admin` protegido (noticias, artículos, categorías, destacados, home content, usuarios), arquitectura de price alerts |
| **M7 — Pulido final** | 15–20 | SEO completo, seguridad, rendimiento, testing desktop/tablet/móvil y navegadores, despliegue definitivo, auditoría final |

Cada hito termina desplegado y con estado ✅ / pendiente explícito; las fases se pueden
reordenar dentro de un hito si la implementación lo aconseja.

---

*CoinLens — documento de arquitectura v1. Fechado: septiembre 2026.*
