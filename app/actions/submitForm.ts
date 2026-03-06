// app/actions/submitForm.ts
// Reemplaza la versión con Firebase Client SDK

'use server'

import { prisma } from '@/src/lib/prisma'

export async function submitForm(formData: FormData) {
  const name     = formData.get('name')     as string
  const email    = formData.get('email')    as string
  const services = formData.get('services') as string

  if (!name || !email || !services) {
    return { success: false, message: 'Faltan campos obligatorios' }
  }

  try {
    const result = await prisma.customerRequest.create({
      data: { name, email, services },
    })

    return { success: true, message: 'Formulario enviado con éxito', id: result.id }
  } catch (error) {
    console.error('Error al enviar el formulario:', error)
    return { success: false, message: 'Error al enviar el formulario' }
  }
}
