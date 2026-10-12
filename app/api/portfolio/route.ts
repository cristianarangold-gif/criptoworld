export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
  const positions = await prisma.portfolioPosition.findMany({
    where: { userId: session.user.id },
    orderBy: { buyDate: 'desc' },
  })
  return NextResponse.json(positions)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
  try {
    const body = await req.json()
    const { coinId, coinName, coinSymbol, amount, buyPrice, investedUsd, buyDate } = body
    if (!coinId || !amount || !buyPrice || !investedUsd || !buyDate) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 })
    }
    const position = await prisma.portfolioPosition.create({
      data: {
        userId: session.user.id,
        coinId,
        coinName: coinName || coinId,
        coinSymbol: coinSymbol || '',
        amount: parseFloat(amount),
        buyPrice: parseFloat(buyPrice),
        investedUsd: parseFloat(investedUsd),
        buyDate: new Date(buyDate),
      },
    })
    return NextResponse.json(position, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Error al crear posici\u00f3n' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
  try {
    const { id } = await req.json()
    if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 })
    await prisma.portfolioPosition.deleteMany({
      where: { id, userId: session.user.id },
    })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Error al eliminar' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
  try {
    const body = await req.json()
    const { id, coinId, coinName, coinSymbol, amount, buyPrice, investedUsd, buyDate } = body
    if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 })
    const updated = await prisma.portfolioPosition.updateMany({
      where: { id, userId: session.user.id },
      data: {
        ...(coinId && { coinId }),
        ...(coinName && { coinName }),
        ...(coinSymbol && { coinSymbol }),
        ...(amount && { amount: parseFloat(amount) }),
        ...(buyPrice && { buyPrice: parseFloat(buyPrice) }),
        ...(investedUsd && { investedUsd: parseFloat(investedUsd) }),
        ...(buyDate && { buyDate: new Date(buyDate) }),
      },
    })
    return NextResponse.json(updated)
  } catch {
    return NextResponse.json({ error: 'Error al actualizar' }, { status: 500 })
  }
}
