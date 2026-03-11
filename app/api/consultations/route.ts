import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user)
    return NextResponse.json({ message: 'No autorizado' }, { status: 401 })

  const userId = (session.user as any).id
  const role   = (session.user as any).role

  try {
    const consultations = await prisma.consultation.findMany({
      where: role === 'CLIENT' ? { clientId: userId } : undefined,
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

    // El form MAC manda servicesAndProducts (array), lo unimos como string para serviceType
    const {
      servicesAndProducts,
      address,
      postalCode,
      latitude,
      longitude,
      projectTypes,
      startDate,
      preferredTime,
      installations,
      budget,
      supportLevel,
      name,
      position,
      organization,
      email,
      phone,
    } = body

    // Validación con los campos reales que manda el form
    if (!servicesAndProducts?.length || !address || !postalCode || !name || !email)
      return NextResponse.json(
        { message: 'Faltan campos obligatorios', received: { servicesAndProducts, address, postalCode, name, email } },
        { status: 400 }
      )

    const consultation = await prisma.consultation.create({
      data: {
        // Guardamos el array como string separado por comas en serviceType
        serviceType:  Array.isArray(servicesAndProducts)
                        ? servicesAndProducts.join(', ')
                        : servicesAndProducts,
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