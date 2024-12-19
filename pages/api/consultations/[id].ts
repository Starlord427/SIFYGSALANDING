import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  switch (req.method) {
    case 'GET':
      try {
        const results = await query('SELECT * FROM consultations WHERE id = ?', [id]) as any[];
        if (results.length > 0) {
          res.status(200).json(results[0]);
        } else {
          res.status(404).json({ message: 'Consultation not found' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Error fetching consultation' });
      }
      break;

    case 'PUT':
      try {
        const { salesperson_id, status } = req.body;
        await query(
          'UPDATE consultations SET salesperson_id = ?, status = ? WHERE id = ?',
          [salesperson_id, status, id]
        );
        res.status(200).json({ message: 'Consultation updated' });
      } catch (error) {
        res.status(500).json({ message: 'Error updating consultation' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

