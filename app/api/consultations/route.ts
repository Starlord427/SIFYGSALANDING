// app/api/consultations/route.ts
// Reemplaza: pages/api/consultations/index.ts

import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/route'
import { prisma } from '@/src/lib/prisma'

// GET /api/consultations — Lista todas las consultas del usuario
export async function GET(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return NextResponse.json({ message: 'No autorizado' }, { status: 401 })
  }

  const userId = (session.user as any).id
  const role   = (session.user as any).role

  try {
    const consultations = await prisma.consultation.findMany({
      where: role === 'CLIENT' ? { clientId: userId } : undefined, // Managers ven todas
      include: {
        client:      { select: { fullName: true, email: true } },
        salesperson: { select: { fullName: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(consultations)
  } catch (error) {
    console.error('Error al obtener consultas:', error)
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}

// POST /api/consultations — Crea una nueva consulta
export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return NextResponse.json({ message: 'No autorizado' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const {
      serviceType,
      address,
      postalCode,
      latitude,    // ← Coordenadas de georreferenciación
      longitude,   // ← Coordenadas de georreferenciación
      projectTypes,
      startDate,
      installations,
      budget,
      supportLevel,
      name,
      organization,
      email,
      phone,
    } = body

    // Validaciones básicas
    if (!serviceType || !address || !postalCode || !name || !email) {
      return NextResponse.json(
        { message: 'Faltan campos obligatorios' },
        { status: 400 }
      )
    }

    const consultation = await prisma.consultation.create({
      data: {
        serviceType,
        location:     address,
        postalCode,
        latitude:     latitude  ? parseFloat(latitude)  : null,
        longitude:    longitude ? parseFloat(longitude) : null,
        projectTypes: projectTypes ?? [],
        startDate:    startDate ? new Date(startDate) : null,
        installations,
        budget,
        supportLevel,
        contactName:  name,
        organization,
        email,
        phone,
        clientId: (session.user as any).id,
      },
    })

    return NextResponse.json(
      { message: 'Consulta creada exitosamente', id: consultation.id },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error al crear la consulta:', error)
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}
