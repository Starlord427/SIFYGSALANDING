'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Label from '@/components/ui/Label';
import { Eye, EyeOff } from 'lucide-react';

interface AuthProps {
  isLogin?: boolean;
}

export default function Auth({ isLogin = true }: AuthProps) {
  const router = useRouter();
  const [isLoginView, setIsLoginView] = useState(isLogin);
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
      if (isLoginView) {
        // Login
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message);

        // Manejar el token y redirigir según el rol
        const userRole = data.user.role;
        switch (userRole) {
          case 'client':
            router.push('/client-dashboard');
            break;
          case 'salesperson':
            router.push('/salesperson-dashboard');
            break;
          case 'manager':
            router.push('/manager-dashboard');
            break;
          default:
            setError('Rol de usuario desconocido');
        }
      } else {
        // Register
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password, name, phone }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message);

        // Redirigir después del registro
        router.push('/mac-form');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-12">
        <div className="bg-[#FF7420] rounded-lg p-8 max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-white text-center mb-2">
            {isLoginView ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLoginView && (
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

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <Button
              type="submit"
              className="w-full bg-[#FF7420] hover:bg-[#FF5500] text-white"
              disabled={loading}
            >
              {loading ? 'Procesando...' : isLoginView ? 'Iniciar Sesión' : 'Registrarse'}
            </Button>

            <p className="text-center text-gray-600">
              {isLoginView ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}
              <button
                type="button"
                className="ml-1 text-[#FF7420] hover:text-[#FF5500]"
                onClick={() => setIsLoginView(!isLoginView)}
              >
                {isLoginView ? 'Regístrate' : 'Inicia sesión'}
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
} 