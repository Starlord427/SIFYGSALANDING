// app/api/consultations/[id]/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user)
    return NextResponse.json({ message: 'No autorizado' }, { status: 401 })

  try {
    const consultation = await prisma.consultation.findUnique({
      where: { id: params.id }, // String cuid, sin parseInt
      include: {
        client:      { select: { fullName: true, email: true, phone: true } },
        salesperson: { select: { fullName: true, email: true } },
      },
    })
    if (!consultation)
      return NextResponse.json({ message: 'Consulta no encontrada' }, { status: 404 })

    return NextResponse.json(consultation)
  } catch (error) {
    console.error('Error al obtener consulta:', error)
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}

async function updateHandler(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user)
    return NextResponse.json({ message: 'No autorizado' }, { status: 401 })

  const id     = params.id // String cuid
  const role   = (session.user as any).role   as string
  const userId = (session.user as any).id     as string

  try {
    const { salespersonId, status } = await request.json()

    if (role === 'SALESPERSON') {
      const existing = await prisma.consultation.findUnique({ where: { id } })
      if (!existing)
        return NextResponse.json({ message: 'No encontrada' }, { status: 404 })
      if (salespersonId && existing.status !== 'PENDING')
        return NextResponse.json({ message: 'Esta consulta ya fue asignada' }, { status: 403 })
      if (status === 'COMPLETED' && existing.salespersonId !== userId)
        return NextResponse.json({ message: 'No autorizado' }, { status: 403 })
    }

    const updated = await prisma.consultation.update({
      where: { id },
      data: {
        // salespersonId es String? — no necesita conversión
        ...(salespersonId !== undefined && { salespersonId: salespersonId as string }),
        ...(status        !== undefined && { status }),
      },
    })

    return NextResponse.json({ message: 'Consulta actualizada', consultation: updated })
  } catch (error) {
    console.error('Error al actualizar consulta:', error)
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}

export const PUT   = updateHandler
export const PATCH = updateHandler