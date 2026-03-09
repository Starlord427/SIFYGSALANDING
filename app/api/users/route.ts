import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'                              // ← corregido

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user || (session.user as any).role !== 'MANAGER')
    return NextResponse.json({ message: 'No autorizado' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const role = searchParams.get('role')?.toUpperCase()

  try {
    const users = await prisma.user.findMany({
      where: role ? { role: role as any } : undefined,
      select: { id: true, fullName: true, email: true, role: true, status: true },
      orderBy: { fullName: 'asc' },
    })
    return NextResponse.json(users)
  } catch (error) {
    console.error('Error al obtener usuarios:', error)
    return NextResponse.json({ message: 'Error interno' }, { status: 500 })
  }
}
