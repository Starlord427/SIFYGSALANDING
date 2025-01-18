import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/firebaseConfig';
import { collection, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  switch (req.method) {
    case 'GET':
      try {
        const consultationsRef = collection(db, 'consultations');
        const q = query(consultationsRef, where('id', '==', id));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const consultation = querySnapshot.docs[0].data();
          res.status(200).json({ id: querySnapshot.docs[0].id, ...consultation });
        } else {
          res.status(404).json({ message: 'Consulta no encontrada' });
        }
      } catch (error) {
        console.error('Error fetching consultation:', error);
        res.status(500).json({ message: 'Error fetching consultation' });
      }
      break;

    case 'PUT':
      try {
        const { salesperson_id, status } = req.body;
        const consultationRef = doc(db, 'consultations', id as string);
        await updateDoc(consultationRef, {
          salesperson_id,
          status,
        });
        res.status(200).json({ message: 'Consulta actualizada' });
      } catch (error) {
        console.error('Error updating consultation:', error);
        res.status(500).json({ message: 'Error updating consultation' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Método ${req.method} no permitido`);
  }
}

