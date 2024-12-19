import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Permitir solo POST
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  // Validar el cuerpo de la solicitud
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required' });
  }

  try {
    // Buscar usuario en la base de datos
    const [rows]: any = await query('SELECT * FROM users WHERE username = ?', [username]);

    if (!rows || rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const user = rows[0];

    // Verificar la contraseña
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Verificar si existe la clave secreta (protegemos runtime)
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('JWT_SECRET no está configurado en las variables de entorno');
      return res.status(500).json({ success: false, message: 'Server configuration error' });
    }

    // Crear el token JWT
    const token = jwt.sign(
      { userId: user.id, username: user.username, role: user.role },
      jwtSecret,
      { expiresIn: '1h' }
    );

    // Enviar respuesta exitosa con token y datos no sensibles del usuario
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    });
  } catch (error) {
    // Loguear todos los errores para diagnóstico interno
    console.error('Login Error:', error);

    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}