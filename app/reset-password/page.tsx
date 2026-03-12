// app/reset-password/page.tsx
'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'

function ResetForm() {
  const searchParams = useSearchParams()
  const router       = useRouter()
  const token        = searchParams.get('token') ?? ''

  const [validating, setValidating] = useState(true)
  const [tokenValid, setTokenValid] = useState(false)
  const [password,   setPassword]   = useState('')
  const [confirm,    setConfirm]    = useState('')
  const [showPw,     setShowPw]     = useState(false)
  const [showConfirm,setShowConfirm]= useState(false)
  const [loading,    setLoading]    = useState(false)
  const [success,    setSuccess]    = useState(false)
  const [error,      setError]      = useState('')

  useEffect(() => {
    if (!token) { setValidating(false); return }
    fetch(`/api/auth/reset-password?token=${token}`)
      .then(r => r.json())
      .then(d => { setTokenValid(d.valid); setValidating(false) })
      .catch(() => setValidating(false))
  }, [token])

  const rules = [
    { label: 'Al menos 8 caracteres',                  ok: password.length >= 8 },
    { label: 'Al menos una mayúscula',                  ok: /[A-Z]/.test(password) },
    { label: 'Al menos un número',                      ok: /[0-9]/.test(password) },
    { label: 'Al menos un carácter especial (!@#$...)', ok: /[^A-Za-z0-9]/.test(password) },
    { label: 'Las contraseñas coinciden',               ok: password === confirm && confirm.length > 0 },
  ]

  const allValid = rules.every(r => r.ok)

  const handleSubmit = async () => {
    if (!allValid) return
    setLoading(true)
    setError('')
    try {
      const res  = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message)
      setSuccess(true)
      setTimeout(() => router.push('/contacto'), 3000)
    } catch (e: any) {
      setError(e.message ?? 'Error al restablecer la contraseña')
    } finally {
      setLoading(false)
    }
  }

  // Reutilizable para los dos inputs de contraseña
  const PasswordInput = ({
    value, onChange, show, onToggle, placeholder
  }: {
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    show: boolean
    onToggle: () => void
    placeholder: string
  }) => (
    <div className="relative">
      <input
        type="password"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full bg-[#1a1a1a] border border-white/10 focus:border-[#FF7420]/50 placeholder-gray-600 text-sm px-4 py-3 pr-11 rounded-xl outline-none transition-colors
          [&::-ms-reveal]:hidden [&::-webkit-credentials-auto-fill-button]:hidden
          ${show ? 'text-transparent caret-white' : 'text-white'}`}
      />
      {show && value && (
        <span className="absolute inset-y-0 left-4 flex items-center text-sm text-white pointer-events-none tracking-wide">
          {value}
        </span>
      )}
      <button
        type="button"
        onClick={onToggle}
        className="absolute inset-y-0 right-0 w-11 flex items-center justify-center text-gray-600 hover:text-[#FF7420] transition-colors"
      >
        <div className="relative w-4 h-4">
          <Eye    className={`absolute inset-0 h-4 w-4 transition-all duration-200 ${show ? 'opacity-0 scale-75' : 'opacity-100 scale-100'}`} />
          <EyeOff className={`absolute inset-0 h-4 w-4 transition-all duration-200 ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`} />
        </div>
      </button>
    </div>
  )

  if (validating) return (
    <div className="bg-[#141414] rounded-b-3xl border border-white/5 border-t-0 p-8 flex items-center justify-center py-16">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#FF7420]" />
    </div>
  )

  return (
    <div className="bg-[#141414] rounded-b-3xl border border-white/5 border-t-0 p-8">
      {!tokenValid ? (
        <div className="text-center py-4">
          <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <p className="text-white font-bold text-sm mb-2">Enlace inválido o expirado</p>
          <p className="text-gray-500 text-xs leading-relaxed mb-6">Este enlace ya fue usado o expiró. Solicita uno nuevo.</p>
          <Link href="/forgot-password" className="inline-flex items-center gap-2 bg-[#FF7420] hover:bg-[#e5681c] text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-colors">
            Solicitar nuevo enlace
          </Link>
        </div>
      ) : success ? (
        <div className="text-center py-4">
          <div className="w-14 h-14 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-white font-bold text-sm mb-2">¡Contraseña actualizada!</p>
          <p className="text-gray-500 text-xs">Redirigiendo al inicio de sesión...</p>
        </div>
      ) : (
        <div className="space-y-5">

          <div>
            <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Nueva contraseña</label>
            <PasswordInput
              value={password}
              onChange={e => setPassword(e.target.value)}
              show={showPw}
              onToggle={() => setShowPw(!showPw)}
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Confirmar contraseña</label>
            <PasswordInput
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              show={showConfirm}
              onToggle={() => setShowConfirm(!showConfirm)}
              placeholder="••••••••"
            />
          </div>

          {/* Checklist */}
          <div className="space-y-1.5 bg-[#1a1a1a] rounded-xl p-4 border border-white/5">
            {rules.map((r, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 transition-colors ${r.ok ? 'bg-green-500' : 'bg-white/10'}`}>
                  {r.ok && <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                </div>
                <span className={`text-xs transition-colors ${r.ok ? 'text-green-400' : 'text-gray-600'}`}>{r.label}</span>
              </div>
            ))}
          </div>

          {error && (
            <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2.5">{error}</p>
          )}

          <button
            onClick={handleSubmit}
            disabled={!allValid || loading}
            className="w-full bg-[#FF7420] hover:bg-[#e5681c] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl text-sm transition-colors"
          >
            {loading ? 'Actualizando...' : 'Establecer nueva contraseña'}
          </button>

          <div className="text-center pt-1">
            <Link href="/contacto" className="text-gray-600 hover:text-gray-400 text-xs transition-colors">
              Volver al inicio de sesión
            </Link>
          </div>

        </div>
      )}
    </div>
  )
}

export default function ResetPassword() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 pt-20">
      <div className="w-full max-w-md">
        <div className="bg-[#FF7420] rounded-t-3xl p-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-4 h-px bg-white/60" />
            <span className="text-white/70 text-[10px] font-bold uppercase tracking-[0.3em]">Seguridad</span>
          </div>
          <h1 className="text-white font-black text-2xl">Nueva contraseña</h1>
          <p className="text-white/80 text-sm mt-1">Elige una contraseña segura para tu cuenta</p>
        </div>
        <Suspense fallback={<div className="bg-[#141414] rounded-b-3xl p-8"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#FF7420] mx-auto" /></div>}>
          <ResetForm />
        </Suspense>
      </div>
    </div>
  )
}