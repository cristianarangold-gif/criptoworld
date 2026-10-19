import { Metadata } from 'next'
import { getAllLessons, getLessonsByLevel, getLevelLabel, getLevelColor, getLevelBg, LEVEL_INFO } from '@/lib/academia-data'
import { AcademiaClient } from './academia-client'

export const metadata: Metadata = {
  title: 'Academia Cripto — CriptoMundo',
  description: 'Aprende criptomonedas desde cero. 29 lecciones interactivas en 3 niveles: principiante, intermedio y avanzado. Contenido en español.',
  alternates: { canonical: '/academia' },
  openGraph: {
    title: 'Academia Cripto — CriptoMundo',
    description: 'Cursos gratuitos de criptomonedas en español. Desde los conceptos básicos hasta estrategias avanzadas.',
  },
}

export default function AcademiaPage() {
  const levels = ([1, 2, 3] as const).map(level => ({
    level,
    label: getLevelLabel(level),
    color: getLevelColor(level),
    bg: getLevelBg(level),
    info: LEVEL_INFO.find(li => li.level === level)!,
    lessons: getLessonsByLevel(level),
  }))

  return <AcademiaClient levels={levels} />
}
