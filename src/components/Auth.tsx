// src/components/Auth.tsx
// Reemplaza la versión con Firebase Auth

'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button }   from '@/components/ui/button'
import { Input }    from '@/components/ui/input'
import { Label }    from '@/components/ui/label'
import { Eye, EyeOff } from 'lucide-react'

interface AuthProps {
  authType: 'login' | 'register'
  onAuthSuccess?: (role: string) => void
}

export default function Auth({ authType, onAuthSuccess }: AuthProps) {
  const router = useRouter()
  const [email,        setEmail]        = useState('')
  const [password,     setPassword]     = useState('')
  const [name,         setName]         = useState('')
  const [phone,        setPhone]        = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error,        setError]        = useState('')
  const [loading,      setLoading]      = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (authType === 'register') {
        // 1. Crear usuario en la base de datos
        const res = await fetch('/api/auth/register', {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify({ fullName: name, phone, email, password }),
        })

        const data = await res.json()

        if (!res.ok) {
          setError(data.message || 'Error al registrarse')
          return
        }
      }

      // 2. Iniciar sesión con next-auth (funciona tanto para login como post-registro)
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Credenciales inválidas. Verifica tu correo y contraseña.')
        return
      }

      // 3. Obtener sesión para conocer el rol
      router.refresh()
      await new Promise(resolve => setTimeout(resolve, 500))

      // 4. Obtener sesión para conocer el rol
      const sessionRes  = await fetch('/api/auth/session')
      const sessionData = await sessionRes.json()
      const role        = sessionData?.user?.role ?? 'CLIENT'

      onAuthSuccess?.(role)

      // 5. Redirigir según rol
      if      (role === 'MANAGER')     router.push('/dashboard/manager')
      else if (role === 'SALESPERSON') router.push('/dashboard/sales')
        else                             router.push('/dashboard/client')

    } catch (err) {
      console.error('Error de autenticación:', err)
      setError('Error al conectar. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-[#FF7420] rounded-lg p-8 w-full max-w-md mx-auto shadow-xl">
      <h1 className="text-3xl font-bold text-white text-center mb-6">
        {authType === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {authType === 'register' && (
          <>
            <div className="space-y-1">
              <Label htmlFor="name" className="text-white">Nombre Completo</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-white text-black"
                placeholder="Juan Pérez"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="phone" className="text-white">Teléfono</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-white text-black"
                placeholder="5512345678"
              />
            </div>
          </>
        )}

        <div className="space-y-1">
          <Label htmlFor="email" className="text-white">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-white text-black"
            placeholder="tu@email.com"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="password" className="text-white">Contraseña</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-white text-black pr-10"
              placeholder="••••••••"
              minLength={6}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {error && (
          <div className="text-red-600 text-sm font-medium text-center bg-white p-2 rounded-md">
            {error}
          </div>
        )}

        <Button
          type="submit"
          className="w-full bg-black hover:bg-zinc-900 text-white font-bold py-3 mt-2"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Procesando...
            </span>
          ) : (
            authType === 'login' ? 'Entrar' : 'Registrarme'
          )}
        </Button>
      </form>
    </div>
  )
}
