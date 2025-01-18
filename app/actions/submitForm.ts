'use server'

import { db } from '@/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export async function submitForm(formData: FormData) {
  const name = formData.get('name');
  const email = formData.get('email');
  const services = formData.get('services');

  try {
    const requestsRef = collection(db, 'customer_requests');
    const result = await addDoc(requestsRef, { name, email, services });

    return { success: true, message: 'Formulario enviado con éxito', id: result.id };
  } catch (error) {
    console.error('Error al enviar el formulario:', error);
    return { success: false, message: 'Error al enviar el formulario' };
  }
}

