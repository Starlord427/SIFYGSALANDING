'use client'

import { useState } from 'react'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from 'lucide-react'

interface AuthProps {
  authType: 'login' | 'register'
  onAuthSuccess: (role: string) => void
}

export default function Auth({ authType, onAuthSuccess }: AuthProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (authType === 'login') {
        // --- PROCESO DE LOGIN ---
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const user = userCredential.user
        
        const userDoc = await getDoc(doc(db, 'users', user.uid))
        if (!userDoc.exists()) {
          throw new Error('No se encontró información del usuario en nuestra base de datos.')
        }

        const userData = userDoc.data()
        const userRole = userData.role || 'client'

        onAuthSuccess(userRole)
      } else {
        // --- PROCESO DE REGISTRO ---
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user

        await updateProfile(user, { displayName: name })

        // Guardar en Firestore
        await setDoc(doc(db, 'users', user.uid), {
          fullName: name,
          email,
          phone,
          role: 'client', // Rol por defecto
          createdAt: new Date(),
          status: 'active',
          hasCompletedMACForm: false
        })

        onAuthSuccess('client')
      }
    } catch (err: any) {
      console.error('Error de autenticación:', err)
      // Mensajes de error más amigables
      if (err.code === 'auth/user-not-found') setError('No existe una cuenta con este correo.')
      else if (err.code === 'auth/wrong-password') setError('Contraseña incorrecta.')
      else if (err.code === 'auth/email-already-in-use') setError('Este correo ya está registrado.')
      else setError(err.message || 'Error al intentar conectar. Revisa tus datos.')
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
                required
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
              type={showPassword ? "text" : "password"}
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
          <div className="text-red-600 text-sm font-medium text-center bg-white p-2 rounded-md animate-pulse">
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
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
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