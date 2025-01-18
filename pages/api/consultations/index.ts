import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (!session || !session.user) {
    return res.status(401).json({ message: 'No autorizado' });
  }

  if (req.method === 'POST') {
    try {
      const { serviceType, address, postalCode, projectTypes, startDate, installations, budget, supportLevel, name, organization, email, phone } = req.body;

      // Insertar la consulta en Firestore
      const consultationsRef = collection(db, 'consultations');
      const result = await addDoc(consultationsRef, {
        client_id: session.user.email,
        service_type: serviceType,
        location: address,
        postal_code: postalCode,
        project_types: JSON.stringify(projectTypes),
        start_date: startDate,
        installations,
        budget,
        support_level: supportLevel,
        contact_name: name,
        organization,
        email,
        phone,
        status: 'pending',
      });

      res.status(201).json({ message: 'Consulta creada exitosamente', id: result.id });
    } catch (error) {
      console.error('Error al crear la consulta:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Método ${req.method} No Permitido`);
  }
}



