import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../auth/[...nextauth]/route'  // ← ruta correcta
import { prisma } from '@/lib/prisma'                              // ← corregido

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user)
    return NextResponse.json({ message: 'No autorizado' }, { status: 401 })

  try {
    const consultation = await prisma.consultation.findUnique({
      where: { id: params.id },
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

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user)
    return NextResponse.json({ message: 'No autorizado' }, { status: 401 })

  try {
    const { salespersonId, status } = await request.json()
    const updated = await prisma.consultation.update({
      where: { id: params.id },
      data: {
        ...(salespersonId && { salespersonId }),
        ...(status        && { status }),
      },
    })
    return NextResponse.json({ message: 'Consulta actualizada', consultation: updated })
  } catch (error) {
    console.error('Error al actualizar consulta:', error)
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}
