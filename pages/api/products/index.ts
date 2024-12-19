import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      try {
        const results = await query('SELECT * FROM products ORDER BY name ASC', []);
        res.status(200).json(results);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).json({ message: 'Error al obtener los productos' });
      }
      break;

    case 'POST':
      try {
        const { name, category, description, price, stock } = req.body;
        const result = await query(
          'INSERT INTO products (name, category, description, price, stock) VALUES (?, ?, ?, ?, ?)',
          [name, category, description, price, stock]
        ) as { insertId: number };
        res.status(201).json({ message: 'Producto creado', id: result.insertId });
      } catch (error) {
        console.error('Error al crear el producto:', error);
        res.status(500).json({ message: 'Error al crear el producto' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Método ${req.method} no permitido`);
  }
}

