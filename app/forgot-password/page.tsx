// app/forgot-password/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ForgotPassword() {
  const [mode,      setMode]    = useState<'email' | 'phone'>('email')
  const [value,     setValue]   = useState('')
  const [loading,   setLoading] = useState(false)
  const [sent,      setSent]    = useState(false)
  const [error,     setError]   = useState('')

  const handleSubmit = async () => {
    if (!value.trim()) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mode === 'email' ? { email: value } : { phone: value }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message)
      setSent(true)
    } catch (e: any) {
      setError(e.message ?? 'Error al procesar la solicitud')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 pt-20">
      <div className="w-full max-w-md">

        {/* Header naranja */}
        <div className="bg-[#FF7420] rounded-t-3xl p-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-4 h-px bg-white/60" />
            <span className="text-white/70 text-[10px] font-bold uppercase tracking-[0.3em]">Recuperación</span>
          </div>
          <h1 className="text-white font-black text-2xl">¿Olvidaste tu contraseña?</h1>
          <p className="text-white/80 text-sm mt-1">Te enviaremos un enlace para restablecerla</p>
        </div>

        {/* Formulario */}
        <div className="bg-[#141414] rounded-b-3xl border border-white/5 border-t-0 p-8">
          {sent ? (
            <div className="text-center py-4">
              <div className="w-14 h-14 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-white font-bold text-sm mb-2">Correo enviado</p>
              <p className="text-gray-500 text-xs leading-relaxed">
                Si los datos son correctos, recibirás un enlace en tu correo. Revisa tu bandeja de spam.
              </p>
              <Link href="/contacto" className="inline-block mt-6 text-[#FF7420] text-xs font-semibold hover:text-[#e5681c] transition-colors">
                Volver al inicio de sesión
              </Link>
            </div>
          ) : (
            <div className="space-y-5">

              {/* Toggle email/teléfono */}
              <div className="flex rounded-xl overflow-hidden border border-white/10">
                {(['email', 'phone'] as const).map(m => (
                  <button
                    key={m}
                    onClick={() => { setMode(m); setValue('') }}
                    className={`flex-1 py-2.5 text-xs font-bold transition-colors ${
                      mode === m ? 'bg-[#FF7420] text-white' : 'bg-[#1a1a1a] text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    {m === 'email' ? 'Correo electrónico' : 'Teléfono'}
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">
                  {mode === 'email' ? 'Correo electrónico' : 'Número de teléfono'}
                </label>
                <input
                  type={mode === 'email' ? 'email' : 'tel'}
                  placeholder={mode === 'email' ? 'correo@empresa.com' : '+52 921 000 0000'}
                  value={value}
                  onChange={e => setValue(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                  className="w-full bg-[#1a1a1a] border border-white/10 hover:border-white/20 focus:border-[#FF7420]/50 text-white placeholder-gray-600 text-sm px-4 py-3 rounded-xl outline-none transition-colors"
                />
              </div>

              {error && (
                <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2.5">{error}</p>
              )}

              <button
                onClick={handleSubmit}
                disabled={loading || !value.trim()}
                className="w-full bg-[#FF7420] hover:bg-[#e5681c] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl text-sm transition-colors"
              >
                {loading ? 'Enviando...' : 'Enviar enlace de recuperación'}
              </button>

              <Link href="/contacto" className="block text-center text-gray-600 hover:text-gray-400 text-xs transition-colors">
                Volver al inicio de sesión
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
