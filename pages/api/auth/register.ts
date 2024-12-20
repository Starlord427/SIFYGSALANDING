import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ResultSetHeader } from 'mysql2';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { fullName, phone, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: 'Faltan campos obligatorios' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres' });
  }

  try {
    // Check if user already exists
    const existingUsers = await query('SELECT * FROM users WHERE email = ?', [email]) as { length: number }[];
    if (existingUsers.length > 0) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert new user
    const result = await query(
      'INSERT INTO users (username, password, role, email, full_name, phone) VALUES (?, ?, ?, ?, ?, ?)',
      [email, hashedPassword, 'client', email, fullName, phone || null]
    ) as ResultSetHeader;

    const userId = result.insertId;

    // Asegúrate de que la clave secreta esté definida
    const secretKey = process.env.JWT_SECRET; // Asegúrate de que esta variable de entorno esté configurada

    if (!secretKey) {
        throw new Error("La clave secreta no está definida");
    }

    // Generar el token JWT
    const token = jwt.sign({ userId }, secretKey, { expiresIn: '1h' });

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: userId,
        email,
        fullName,
        role: 'client'
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}




