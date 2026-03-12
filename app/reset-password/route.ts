// app/api/auth/reset-password/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json()

    if (!token || !password)
      return NextResponse.json({ message: 'Datos incompletos' }, { status: 400 })

    if (password.length < 8)
      return NextResponse.json({ message: 'La contraseña debe tener al menos 8 caracteres' }, { status: 400 })

    // Validar token
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
      include: { user: true },
    })

    if (!resetToken)
      return NextResponse.json({ message: 'Token inválido o expirado' }, { status: 400 })

    if (resetToken.usedAt)
      return NextResponse.json({ message: 'Este enlace ya fue utilizado' }, { status: 400 })

    if (resetToken.expiresAt < new Date())
      return NextResponse.json({ message: 'El enlace ha expirado. Solicita uno nuevo.' }, { status: 400 })

    // Hash y actualizar contraseña
    const hashed = await bcrypt.hash(password, 12)

    await prisma.$transaction([
      prisma.user.update({
        where: { id: resetToken.userId },
        data:  { password: hashed },
      }),
      prisma.passwordResetToken.update({
        where: { id: resetToken.id },
        data:  { usedAt: new Date() },
      }),
    ])

    return NextResponse.json({ message: 'Contraseña actualizada exitosamente' })
  } catch (error) {
    console.error('Error reset-password:', error)
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}

// GET — validar token antes de mostrar el formulario
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')

  if (!token)
    return NextResponse.json({ valid: false, message: 'Token requerido' })

  const resetToken = await prisma.passwordResetToken.findUnique({ where: { token } })

  if (!resetToken || resetToken.usedAt || resetToken.expiresAt < new Date())
    return NextResponse.json({ valid: false, message: 'Token inválido o expirado' })

  return NextResponse.json({ valid: true })
}
