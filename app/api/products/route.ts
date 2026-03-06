// app/api/products/route.ts
// Reemplaza: pages/api/products/index.ts

import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/route'
import { prisma } from '@/src/lib/prisma'

// GET /api/products — Público, cualquiera puede ver productos
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { name: 'asc' },
    })
    return NextResponse.json(products)
  } catch (error) {
    console.error('Error al obtener productos:', error)
    return NextResponse.json({ message: 'Error al obtener productos' }, { status: 500 })
  }
}

// POST /api/products — Solo MANAGER puede crear productos
export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user || (session.user as any).role !== 'MANAGER') {
    return NextResponse.json({ message: 'No autorizado' }, { status: 401 })
  }

  try {
    const { name, category, description, price, stock } = await request.json()

    if (!name || !category || price === undefined) {
      return NextResponse.json({ message: 'Faltan campos obligatorios' }, { status: 400 })
    }

    const product = await prisma.product.create({
      data: { name, category, description, price: parseFloat(price), stock: parseInt(stock) ?? 0 },
    })

    return NextResponse.json({ message: 'Producto creado', product }, { status: 201 })
  } catch (error) {
    console.error('Error al crear producto:', error)
    return NextResponse.json({ message: 'Error al crear producto' }, { status: 500 })
  }
}
