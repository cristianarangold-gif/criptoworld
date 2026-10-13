import { getAllLessons } from '@/lib/academia-data'
import { getAllGuides } from '@/lib/guides'
import { getAllTools } from '@/lib/tools'

// Recuentos que muestra la portada; salen del contenido real, así que se actualizan solos.
export function getSiteStats(): { lessons: number; guides: number; tools: number } {
  return { lessons: getAllLessons().length, guides: getAllGuides().length, tools: getAllTools().length }
}
