export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ progress: [] })
    }
    const progress = await prisma.academyProgress.findMany({
      where: { userId: session.user.id },
      select: { lessonSlug: true, completed: true, viewedAt: true, completedAt: true },
    })
    return NextResponse.json({ progress })
  } catch (e) {
    console.error('GET /api/academia/progress error:', e)
    return NextResponse.json({ progress: [] })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }
    const body = await req.json()
    const { lessonSlug, action } = body as { lessonSlug: string; action: 'view' | 'complete' }
    if (!lessonSlug || !action) {
      return NextResponse.json({ error: 'Parámetros inválidos' }, { status: 400 })
    }

    if (action === 'view') {
      await prisma.academyProgress.upsert({
        where: { userId_lessonSlug: { userId: session.user.id, lessonSlug } },
        create: { userId: session.user.id, lessonSlug, viewedAt: new Date() },
        update: { viewedAt: new Date() },
      })
    } else if (action === 'complete') {
      await prisma.academyProgress.upsert({
        where: { userId_lessonSlug: { userId: session.user.id, lessonSlug } },
        create: { userId: session.user.id, lessonSlug, completed: true, completedAt: new Date(), viewedAt: new Date() },
        update: { completed: true, completedAt: new Date() },
      })
    }

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('POST /api/academia/progress error:', e)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
