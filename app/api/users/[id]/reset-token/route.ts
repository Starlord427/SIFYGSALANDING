// app/api/users/[id]/reset-token/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'
import { Resend } from 'resend'

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const resend = new Resend(process.env.RESEND_API_KEY)  // ← movido aquí adentro

  const session = await getServerSession(authOptions)
  if (!session?.user || (session.user as any).role !== 'MANAGER')
    return NextResponse.json({ message: 'No autorizado' }, { status: 403 })

  try {
    const user = await prisma.user.findUnique({ where: { id: params.id } })
    if (!user) return NextResponse.json({ message: 'Usuario no encontrado' }, { status: 404 })

    await prisma.passwordResetToken.deleteMany({ where: { userId: user.id } })

    const token     = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000)

    await prisma.passwordResetToken.create({
      data: { token, userId: user.id, expiresAt },
    })

    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`

    await resend.emails.send({
      from:    'SIFYGSA <onboarding@resend.dev>',
      to:      user.email,
      subject: 'Acceso temporal — SIFYGSA',
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;background:#0a0a0a;color:#fff;padding:40px;border-radius:16px;">
          <div style="background:#FF7420;height:4px;border-radius:4px;margin-bottom:32px;"></div>
          <h2 style="color:#fff;font-size:22px;font-weight:900;margin:0 0 8px;">Restablecer tu acceso</h2>
          <p style="color:#9ca3af;font-size:14px;line-height:1.6;margin:0 0 24px;">
            Hola <strong style="color:#fff">${user.fullName}</strong>,<br>
            Un administrador de SIFYGSA generó un enlace para que restablezcas tu contraseña. 
            El enlace expira en <strong style="color:#FF7420">24 horas</strong>.
          </p>
          <a href="${resetUrl}" style="display:inline-block;background:#FF7420;color:#fff;font-weight:700;font-size:14px;padding:14px 28px;border-radius:12px;text-decoration:none;margin-bottom:24px;">
            Establecer nueva contraseña
          </a>
          <p style="color:#4b5563;font-size:12px;margin:0;">
            Si no esperabas este correo, contáctanos de inmediato.<br>
            Por seguridad, no compartas este enlace con nadie.
          </p>
        </div>
      `,
    })

    return NextResponse.json({ message: `Enlace enviado a ${user.email}` })
  } catch (error) {
    console.error('Error manager-reset-token:', error)
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}