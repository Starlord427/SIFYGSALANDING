// src/components/Auth.tsx
'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'

interface AuthProps {
  authType: 'login' | 'register'
  onAuthSuccess?: (role: string) => void
}

const DarkInput = ({
  id, type = 'text', value, onChange, placeholder, required = false, minLength, children
}: {
  id: string; type?: string; value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string; required?: boolean; minLength?: number
  children?: React.ReactNode
}) => (
  <div className="relative">
    <input
      id={id} type={type} value={value} onChange={onChange}
      placeholder={placeholder} required={required} minLength={minLength}
      className="w-full bg-[#1a1a1a] border border-white/10 hover:border-white/20 focus:border-[#FF7420]/50 text-white placeholder-gray-600 text-sm px-4 py-3 rounded-xl outline-none transition-colors pr-10"
    />
    {children}
  </div>
)

export default function Auth({ authType, onAuthSuccess }: AuthProps) {
  const router = useRouter()
  const [email,        setEmail]        = useState('')
  const [password,     setPassword]     = useState('')
  const [name,         setName]         = useState('')
  const [phone,        setPhone]        = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error,        setError]        = useState('')
  const [loading,      setLoading]      = useState(false)
  const [registered,   setRegistered]   = useState(false) // ← nuevo estado

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (authType === 'register') {
        const res  = await fetch('/api/auth/register', {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify({ fullName: name, phone, email, password }),
        })
        const data = await res.json()
        if (!res.ok) { setError(data.message || 'Error al registrarse'); return }

        // ── Mostrar pantalla de éxito y luego continuar ──
        setRegistered(true)
        await new Promise(resolve => setTimeout(resolve, 2500))
        setRegistered(false)
      }

      const result = await signIn('credentials', { email, password, redirect: false })
      if (result?.error) { setError('Credenciales inválidas. Verifica tu correo y contraseña.'); return }

      router.refresh()
      await new Promise(resolve => setTimeout(resolve, 500))

      const sessionRes  = await fetch('/api/auth/session')
      const sessionData = await sessionRes.json()
      const role        = sessionData?.user?.role ?? 'CLIENT'

      onAuthSuccess?.(role)

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

  // ── Pantalla de éxito al registrarse ──────────────────────────
  if (registered) {
    return (
      <div className="bg-[#141414] border border-white/5 rounded-3xl overflow-hidden w-full max-w-md mx-auto">
        <div className="bg-green-500 px-8 py-6">
          <div className="inline-flex items-center gap-2 mb-1">
            <span className="w-4 h-px bg-white/60" />
            <span className="text-white/70 text-[10px] font-bold uppercase tracking-[0.3em]">SIFYGSA</span>
          </div>
          <h1 className="text-2xl font-black text-white">¡Cuenta creada!</h1>
        </div>
        <div className="p-8 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-white font-bold text-sm mb-2">¡Bienvenido a SIFYGSA!</p>
          <p className="text-gray-500 text-xs leading-relaxed mb-6">
            Tu cuenta fue creada exitosamente.<br />Iniciando sesión automáticamente...
          </p>
          <div className="flex items-center gap-2 text-gray-600 text-xs">
            <div className="animate-spin rounded-full h-3.5 w-3.5 border-t-2 border-green-500" />
            Redirigiendo a tu panel...
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#141414] border border-white/5 rounded-3xl overflow-hidden w-full max-w-md mx-auto">

      {/* Header */}
      <div className="bg-[#FF7420] px-8 py-6">
        <div className="inline-flex items-center gap-2 mb-1">
          <span className="w-4 h-px bg-white/60" />
          <span className="text-white/70 text-[10px] font-bold uppercase tracking-[0.3em]">SIFYGSA</span>
        </div>
        <h1 className="text-2xl font-black text-white">
          {authType === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
        </h1>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="p-8 space-y-4">

        {authType === 'register' && (
          <>
            <div>
              <label htmlFor="name" className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Nombre Completo</label>
              <DarkInput id="name" value={name} onChange={e => setName(e.target.value)} placeholder="Juan Pérez" required />
            </div>
            <div>
              <label htmlFor="phone" className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Teléfono</label>
              <DarkInput id="phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="5512345678" />
            </div>
          </>
        )}

        <div>
          <label htmlFor="email" className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Correo electrónico</label>
          <DarkInput id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@email.com" required />
        </div>

        <div>
          <label htmlFor="password" className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Contraseña</label>
          <div className="relative">
            <input
              id="password" type="password" value={password}
              onChange={e => setPassword(e.target.value)}
              required minLength={6} autoComplete="new-password"
              className={`w-full bg-[#1a1a1a] border border-white/10 hover:border-white/20 focus:border-[#FF7420]/50 placeholder-gray-600 text-sm px-4 py-3 pr-11 rounded-xl outline-none transition-colors [&::-ms-reveal]:hidden [&::-webkit-credentials-auto-fill-button]:hidden ${showPassword ? 'text-transparent caret-white' : 'text-white'}`}
              placeholder={showPassword ? '' : '••••••••'}
            />
            {showPassword && password && (
              <span className="absolute inset-y-0 left-4 flex items-center text-sm text-white pointer-events-none tracking-wide">{password}</span>
            )}
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 w-11 flex items-center justify-center text-gray-600 hover:text-[#FF7420] transition-colors">
              <div className="relative w-4 h-4">
                <Eye    className={`absolute inset-0 h-4 w-4 transition-all duration-200 ${showPassword ? 'opacity-0 scale-75' : 'opacity-100 scale-100'}`} />
                <EyeOff className={`absolute inset-0 h-4 w-4 transition-all duration-200 ${showPassword ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`} />
              </div>
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium text-center px-4 py-2.5 rounded-xl">{error}</div>
        )}

        <button
          type="submit" disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 bg-[#FF7420] hover:bg-[#e5681c] disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-colors mt-2"
        >
          {loading ? (
            <><div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />Procesando...</>
          ) : (
            authType === 'login' ? 'Entrar' : 'Registrarme'
          )}
        </button>

        {authType === 'login' && (
          <div className="text-center pt-1">
            <Link href="/forgot-password" className="text-gray-600 hover:text-gray-400 text-xs transition-colors">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
        )}

      </form>
    </div>
  )
}