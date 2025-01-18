import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const productsRef = collection(db, 'products');

  switch (req.method) {
    case 'GET':
      try {
        const results = await getDocs(productsRef);
        const products = results.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(products);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).json({ message: 'Error al obtener los productos' });
      }
      break;

    case 'POST':
      try {
        const { name, category, description, price, stock } = req.body;
        const result = await addDoc(productsRef, { name, category, description, price, stock });
        res.status(201).json({ message: 'Producto creado', id: result.id });
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

