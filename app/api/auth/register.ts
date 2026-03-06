import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/firebaseConfig';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { fullName, phone, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: 'Faltan campos obligatorios' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres' });
  }

  try {
    // Verificar si el usuario ya existe
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return res.status(409).json({ message: 'El usuario ya existe' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Agregar el nuevo usuario a Firestore
    const docRef = await addDoc(usersRef, {
      fullName,
      phone,
      email,
      password: hashedPassword,
      role: 'client',
    });

    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      throw new Error("La clave secreta no está definida");
    }

    const token = jwt.sign({ userId: docRef.id }, secretKey, { expiresIn: '1h' });

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      token,
      user: {
        id: docRef.id,
        email,
        fullName,
        role: 'client'
      }
    });
  } catch (error) {
    console.error('Error de registro:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}




