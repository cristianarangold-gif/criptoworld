// Comprobación de enlaces internos del contenido en Markdown (noticias, respuestas...).

export const STATIC_PATHS = [
  '/', '/mercado', '/aprende', '/academia', '/herramientas', '/glosario', '/empieza-aqui', '/noticias', '/respuestas', '/cripto', '/comparador-exchanges', '/calendario', '/resumen-semanal',
  '/sobre-nosotros', '/contacto', '/aviso-legal', '/privacidad', '/cookies',
]

export const cleanPath = (href: string) => {
  const p = href.split(/[#?]/)[0]
  return p.length > 1 ? p.replace(/\/+$/, '') : p
}

export function extractInternalLinks(md: string): string[] {
  return [...md.matchAll(/\]\((\/[^)\s]*)\)/g)].map(m => cleanPath(m[1]))
}
