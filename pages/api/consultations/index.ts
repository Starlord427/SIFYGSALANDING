import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Verificar si el usuario está autenticado
  const session = await getSession({ req });
  if (!session || !session.user) {
    return res.status(401).json({ message: 'No autorizado' });
  }

  if (req.method === 'POST') {
    try {
      const { 
        serviceType, 
        address, 
        postalCode, 
        projectTypes, 
        startDate, 
        installations, 
        budget, 
        supportLevel, 
        name, 
        organization, 
        email, 
        phone 
      } = req.body;

      // Insertar la consulta en la base de datos
      const result = await query(
        `INSERT INTO consultations 
        (client_id, service_type, location, postal_code, project_types, start_date, installations, budget, support_level, contact_name, organization, email, phone, status) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          session.user.email,
          serviceType, 
          address, 
          postalCode, 
          JSON.stringify(projectTypes), 
          startDate, 
          installations, 
          budget, 
          supportLevel, 
          name, 
          organization, 
          email, 
          phone,
          'pending'
        ]
      );

      res.status(201).json({ message: 'Consulta creada exitosamente', id: (result as any[])[0].insertId });
    } catch (error) {
      console.error('Error al crear la consulta:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Método ${req.method} No Permitido`);
  }
}



