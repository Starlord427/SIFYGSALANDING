import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Faltan campos obligatorios' });
  }

  try {
    // Verificar si el usuario existe
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const user = querySnapshot.docs[0].data();
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      throw new Error("La clave secreta no está definida");
    }

    const token = jwt.sign({ userId: querySnapshot.docs[0].id }, secretKey, { expiresIn: '1h' });

    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      token,
      user: {
        id: querySnapshot.docs[0].id,
        email,
        fullName: user.fullName,
        role: user.role,
      }
    });
  } catch (error) {
    console.error('Error de inicio de sesión:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}