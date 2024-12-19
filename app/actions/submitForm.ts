'use server'

import { query } from '@/lib/db';

export async function submitForm(formData: FormData) {
  const name = formData.get('name');
  const email = formData.get('email');
  const services = formData.get('services');
  // ... obtén otros campos del formulario

  try {
    const result = await query(
      'INSERT INTO customer_requests (name, email, services) VALUES (?, ?, ?)',
      [name, email, services]
    );

    return { success: true, message: 'Formulario enviado con éxito' };
  } catch (error) {
    console.error('Error al enviar el formulario:', error);
    return { success: false, message: 'Error al enviar el formulario' };
  }
}

