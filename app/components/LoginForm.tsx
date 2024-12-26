'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface LoginFormProps {
  onCancel: () => void;
}

export default function LoginForm({ onCancel }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        if (data.user.isFirstLogin && data.user.role === 'client') {
          router.push('/mac-form');
        } else {
          switch (data.user.role) {
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
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error en el inicio de sesión');
      }
    } catch (error) {
      console.error('Error de inicio de sesión:', error);
      setError('Ocurrió un error. Por favor, intente nuevamente.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6">Iniciar Sesión</h2>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300">Correo electrónico</label>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-300">Contraseña</label>
        <Input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1"
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex justify-between">
        <Button type="button" onClick={onCancel} variant="outline">
          Cancelar
        </Button>
        <Button type="submit">Iniciar Sesión</Button>
      </div>
    </form>
  );
}

