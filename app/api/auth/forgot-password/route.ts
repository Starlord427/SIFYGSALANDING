// app/api/auth/forgot-password/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { email, phone } = await request.json()

    if (!email && !phone)
      return NextResponse.json({ message: 'Proporciona tu correo o teléfono' }, { status: 400 })

    // Buscar usuario por email o teléfono
    const user = await prisma.user.findFirst({
      where: email
        ? { email: email.toLowerCase().trim() }
        : { phone: phone.trim() },
    })

    // Siempre responder igual para no revelar si el usuario existe
    if (!user || user.status === 'INACTIVE') {
      return NextResponse.json({ message: 'Si los datos son correctos, recibirás un enlace en tu correo.' })
    }

    // Invalidar tokens anteriores del mismo usuario
    await prisma.passwordResetToken.deleteMany({ where: { userId: user.id } })

    // Generar token seguro
    const token     = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000) // 1 hora

    await prisma.passwordResetToken.create({
      data: { token, userId: user.id, expiresAt },
    })

    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`

    // Enviar email
    await resend.emails.send({
      from: 'SIFYGSA <onboarding@resend.dev>',
      to:   user.email,
      subject: 'Restablecer contraseña — SIFYGSA',
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;background:#0a0a0a;color:#fff;padding:40px;border-radius:16px;">
          <div style="background:#FF7420;height:4px;border-radius:4px;margin-bottom:32px;"></div>
          <h2 style="color:#fff;font-size:22px;font-weight:900;margin:0 0 8px;">Restablecer contraseña</h2>
          <p style="color:#9ca3af;font-size:14px;line-height:1.6;margin:0 0 24px;">
            Hola <strong style="color:#fff">${user.fullName}</strong>,<br>
            Recibimos una solicitud para restablecer tu contraseña. El enlace expira en <strong style="color:#FF7420">1 hora</strong>.
          </p>
          <a href="${resetUrl}" style="display:inline-block;background:#FF7420;color:#fff;font-weight:700;font-size:14px;padding:14px 28px;border-radius:12px;text-decoration:none;margin-bottom:24px;">
            Restablecer contraseña
          </a>
          <p style="color:#4b5563;font-size:12px;margin:0;">
            Si no solicitaste esto, ignora este correo. Tu contraseña no cambiará.<br>
            Por seguridad, no compartas este enlace.
          </p>
          <div style="border-top:1px solid rgba(255,255,255,0.05);margin-top:32px;padding-top:16px;">
            <p style="color:#374151;font-size:11px;margin:0;">SIFYGSA — Sistemas de Seguridad Industrial</p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ message: 'Si los datos son correctos, recibirás un enlace en tu correo.' })
  } catch (error) {
    console.error('Error forgot-password:', error)
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}
