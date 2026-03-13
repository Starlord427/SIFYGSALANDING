// app/api/product-categories/[id]/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user || (session.user as any).role !== 'MANAGER')
    return NextResponse.json({ message: 'No autorizado' }, { status: 401 })

  try {
    const { tipo, descripcion, imagen, items, order } = await request.json()
    const category = await prisma.productCategory.update({
      where: { id: params.id },
      data: {
        tipo,
        descripcion: descripcion || null,
        imagen: imagen || null,
        items: items || [],
        order: order ?? 0,
        updatedAt: new Date(),
      },
    })
    return NextResponse.json(category)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Error al actualizar categoría' }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user || (session.user as any).role !== 'MANAGER')
    return NextResponse.json({ message: 'No autorizado' }, { status: 401 })

  try {
    await prisma.productCategory.delete({ where: { id: params.id } })
    return NextResponse.json({ message: 'Categoría eliminada' })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Error al eliminar categoría' }, { status: 500 })
  }
}
