// app/api/consultations/draft/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'

// GET — obtener borrador del usuario
export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user)
    return NextResponse.json({ message: 'No autorizado' }, { status: 401 })

  const userId = (session.user as any).id as string

  try {
    const draft = await prisma.consultationDraft.findUnique({ where: { userId } })
    return NextResponse.json(draft ?? null)
  } catch {
    return NextResponse.json({ message: 'Error interno' }, { status: 500 })
  }
}

// POST — crear o actualizar borrador
export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user)
    return NextResponse.json({ message: 'No autorizado' }, { status: 401 })

  const userId = (session.user as any).id as string

  try {
    const { step, formData } = await request.json()

    const draft = await prisma.consultationDraft.upsert({
      where:  { userId },
      update: { step, formData },
      create: { userId, step, formData },
    })

    return NextResponse.json(draft)
  } catch {
    return NextResponse.json({ message: 'Error interno' }, { status: 500 })
  }
}

// DELETE — limpiar borrador tras envío exitoso
export async function DELETE() {
  const session = await getServerSession(authOptions)
  if (!session?.user)
    return NextResponse.json({ message: 'No autorizado' }, { status: 401 })

  const userId = (session.user as any).id as string

  try {
    await prisma.consultationDraft.deleteMany({ where: { userId } })
    return NextResponse.json({ message: 'Borrador eliminado' })
  } catch {
    return NextResponse.json({ message: 'Error interno' }, { status: 500 })
  }
}
