'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface LoginFormProps {
  onCancel: () => void;
}

export default function LoginForm({ onCancel }: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
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
      } else {
        setError('Credenciales inválidas');
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
        <label htmlFor="username" className="block text-sm font-medium text-gray-300">Nombre de usuario</label>
        <Input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="mt-1"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-300">Contraseña</label>
        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
          >
            {showPassword ? 'Ocultar' : 'Ver'}
          </button>
        </div>
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

