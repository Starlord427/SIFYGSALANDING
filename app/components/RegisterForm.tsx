import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface RegisterFormProps {
  onCancel: () => void;
}

export default function RegisterForm({ onCancel }: RegisterFormProps) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validación básica
    if (!fullName || !email || !password) {
      setError('Por favor, complete todos los campos obligatorios.');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, phone, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        router.push('/mac-form');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error en el registro');
      }
    } catch (error) {
      console.error('Error de registro:', error);
      setError('Ocurrió un error. Por favor, intente nuevamente.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6">Crear Cuenta</h2>
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-300">Nombre completo *</label>
        <Input
          type="text"
          id="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          className="mt-1"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-300">Número de teléfono</label>
        <Input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mt-1"
          placeholder="Opcional"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300">Correo electrónico *</label>
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
        <label htmlFor="password" className="block text-sm font-medium text-gray-300">Contraseña *</label>
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
        <Button type="submit">Registrarse</Button>
      </div>
      <p className="text-sm text-gray-400 mt-4">* Campos obligatorios</p>
    </form>
  );
}


