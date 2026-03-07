import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'   // ← corregido
import bcrypt from 'bcrypt'

export async function POST(request: Request) {
  try {
    const { fullName, phone, email, password } = await request.json()

    if (!fullName || !email || !password)
      return NextResponse.json({ message: 'Faltan campos obligatorios' }, { status: 400 })

    if (password.length < 6)
      return NextResponse.json({ message: 'La contraseña debe tener al menos 6 caracteres' }, { status: 400 })

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser)
      return NextResponse.json({ message: 'El usuario ya existe' }, { status: 409 })

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: { fullName, phone, email, password: hashedPassword },
      select: { id: true, email: true, fullName: true, role: true },
    })

    return NextResponse.json({ message: 'Usuario registrado exitosamente', user }, { status: 201 })
  } catch (error) {
    console.error('Error de registro:', error)
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}
