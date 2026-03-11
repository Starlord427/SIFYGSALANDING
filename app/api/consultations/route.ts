// app/api/consultations/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user)
    return NextResponse.json({ message: 'No autorizado' }, { status: 401 })

  const userId = (session.user as any).id as string
  const role   = (session.user as any).role as string

  try {
    const where =
      role === 'CLIENT'      ? { clientId: userId } :
      role === 'SALESPERSON' ? { OR: [{ salespersonId: null, status: 'PENDING' as const }, { salespersonId: userId }] } :
      undefined // MANAGER ve todas

    const consultations = await prisma.consultation.findMany({
      where,
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

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user)
    return NextResponse.json({ message: 'No autorizado' }, { status: 401 })

  try {
    const body = await request.json()
    const {
      servicesAndProducts, address, postalCode, latitude, longitude,
      projectTypes, startDate, installations, budget,
      supportLevel, name, organization, email, phone,
    } = body

    if (!servicesAndProducts?.length || !address || !postalCode || !name || !email)
      return NextResponse.json({ message: 'Faltan campos obligatorios' }, { status: 400 })

    const consultation = await prisma.consultation.create({
      data: {
        serviceType:  Array.isArray(servicesAndProducts) ? servicesAndProducts.join(', ') : servicesAndProducts,
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
        status:       'PENDING',
        clientId:     (session.user as any).id as string,
      },
    })

    return NextResponse.json({ message: 'Consulta creada exitosamente', id: consultation.id }, { status: 201 })
  } catch (error) {
    console.error('Error al crear la consulta:', error)
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}