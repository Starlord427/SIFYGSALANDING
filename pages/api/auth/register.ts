import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Permitir solo POST
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { fullName, phone, email, password } = req.body;

  // Validación básica de entradas
  if (!fullName || !email || !password) {
    return res.status(400).json({ success: false, message: 'Missing required fields: fullName, email, or password' });
  }

  try {
    // Verificar si ya existe el usuario (basado en el email)
    const [rows]: any = await query('SELECT id FROM users WHERE email = ?', [email]);

    // Validar que `rows` sea un arreglo antes de acceder a `length`
    if (!rows || !Array.isArray(rows)) {
      throw new Error('Database query did not return a valid result'); // Opcional, para mayor seguridad
    }

    if (rows.length > 0) {
      return res.status(409).json({ success: false, message: 'User already exists' });
    }

    // Hash de la contraseña con bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insertar nuevo usuario en la base de datos
    const result: any = await query(
      'INSERT INTO users (full_name, phone, email, password, role) VALUES (?, ?, ?, ?, ?)',
      [fullName, phone || null, email, hashedPassword, 'client']
    );

    const userId = result.insertId;

    // Confirmar disponibilidad de la variable JWT_SECRET antes de generar el token
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('JWT_SECRET is not configured');
      return res.status(500).json({ success: false, message: 'Server configuration error' });
    }

    // Generar token JWT
    const token = jwt.sign(
      { userId, email, role: 'client' },
      jwtSecret,
      { expiresIn: '1h' }
    );

    // Responder con éxito y enviar el token al cliente
    res.status(201).json({
      success: true,
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
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}


