'use client'

import { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/Label"
import { Eye, EyeOff } from 'lucide-react';

interface AuthProps {
  authType: 'login' | 'register';
  onAuthSuccess: (role: string) => void;
}

export default function Auth({ authType, onAuthSuccess }: AuthProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (authType === 'login') {
        // Login
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Obtener el rol del usuario desde Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (!userDoc.exists()) {
          throw new Error('No se encontró información del usuario');
        }

        const userData = userDoc.data();
        const userRole = userData.role;

        if (!userRole) {
          throw new Error('Rol de usuario no definido');
        }

        onAuthSuccess(userRole);
      } else {
        // Register
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Actualizar el perfil del usuario
        await updateProfile(user, { 
          displayName: name 
        });

        // Guardar información adicional en Firestore
        await setDoc(doc(db, 'users', user.uid), {
          fullName: name,
          email,
          phone,
          role: 'client', // Por defecto, los nuevos usuarios son clientes
          createdAt: new Date(),
          status: 'active'
        });

        onAuthSuccess('client');
      }
    } catch (err: any) {
      console.error('Error de autenticación:', err);
      setError(err.message || 'Ocurrió un error durante la autenticación. Por favor, intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FF7420] rounded-lg p-8 max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-white text-center mb-2">
        {authType === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {authType === 'register' && (
          <>
            <div className="space-y-2">
              <Label htmlFor="name" className="text-black">Nombre</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-white text-black border-gray-300"
                placeholder="Tu nombre completo"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-black">Teléfono</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="bg-white text-black border-gray-300"
                placeholder="Número de teléfono"
              />
            </div>
          </>
        )}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-black">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-white text-black border-gray-300"
            placeholder="tu@email.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="text-black">Contraseña</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-white text-black border-gray-300 pr-10"
              placeholder="••••••••"
              minLength={6}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
            </button>
          </div>
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center bg-white/90 p-2 rounded">
            {error}
          </p>
        )}

        <Button
          type="submit"
          className="w-full bg-black hover:bg-gray-900 text-white"
          disabled={loading}
        >
          {loading ? 'Procesando...' : authType === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
        </Button>
      </form>
    </div>
  );
}