// app/api/product-categories/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const categories = await prisma.productCategory.findMany({
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(categories)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Error al obtener categorías' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user || (session.user as any).role !== 'MANAGER')
    return NextResponse.json({ message: 'No autorizado' }, { status: 401 })

  try {
    const { tipo, descripcion, imagen, items, order } = await request.json()
    if (!tipo) return NextResponse.json({ message: 'El nombre es requerido' }, { status: 400 })

    const category = await prisma.productCategory.create({
      data: {
        tipo,
        descripcion: descripcion || null,
        imagen: imagen || null,
        items: items || [],
        order: order ?? 0,
      },
    })
    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Error al crear categoría' }, { status: 500 })
  }
}
