import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Asegura que las peticiones tengan body parsing habilitado
export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Manejar solo POST
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Método no permitido' });
  }

  try {
    // Verificar body
    if (!req.body) {
      return res.status(400).json({ success: false, message: 'Body vacío. Enviar JSON válido' });
    }

    // Obtener datos del body
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Se requiere correo electrónico y contraseña' });
    }

    // Buscar el usuario en la base de datos
    const [rows]: any = await query('SELECT * FROM users WHERE email = ?', [email]);

    if (!rows || rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
    }

    const user = rows[0];

    // Comprobar contraseña
    if (!user) {
      return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
    }

    // Validar JWT_SECRET
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('JWT_SECRET no está configurado en las variables de entorno');
      return res.status(500).json({ success: false, message: 'Error de configuración del servidor' });
    }

    // Crear token
    const token = jwt.sign(
      { userId: user.id, username: user.username, role: user.role },
      jwtSecret,
      { expiresIn: '1h' }
    );

    // Respuesta exitosa
    res.status(200).json({
      success: true,
      message: 'Inicio de sesión exitoso',
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Error de inicio de sesión:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
}