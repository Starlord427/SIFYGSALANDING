'use client'

import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle } from 'lucide-react'
import Auth from '@/components/Auth'

type AuthType = 'login' | 'register' | null

const features = [
  { title: "Atención Personalizada",   desc: "Soluciones adaptadas a tus necesidades específicas" },
  { title: "Expertos Certificados",    desc: "Equipo altamente capacitado y certificado" },
  { title: "Soluciones a Medida",      desc: "Diseñamos sistemas para tu industria" },
  { title: "Tecnología de Vanguardia", desc: "Últimas innovaciones en seguridad industrial" },
]

const badges = [
  "Personal Profesional",
  "100% Satisfacción",
  "Pruebas Precisas",
  "Precios Transparentes",
]

export default function Contacto() {
  const { data: session, status } = useSession()
  const [authType, setAuthType] = useState<AuthType>(null)
  const router = useRouter()

  if (status === 'authenticated' && !authType) {
    const role = (session.user as any)?.role ?? 'CLIENT'
    if      (role === 'MANAGER')     router.push('/dashboard/manager')
    else if (role === 'SALESPERSON') router.push('/dashboard/sales')
    else                             router.push('/dashboard/client')
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#FF7420]" />
      </div>
    )
  }

  const handleAuthSuccess = (role: string) => {
    if      (role === 'MANAGER')     router.push('/dashboard/manager')
    else if (role === 'SALESPERSON') router.push('/dashboard/sales')
    else                             router.push('/dashboard/client')
  }

  // ── Pantalla de auth ──
  if (authType) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <button
            onClick={() => setAuthType(null)}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm font-medium transition-colors mb-8 group"
          >
            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver
          </button>
          <div className="bg-[#141414] rounded-3xl border border-white/5 overflow-hidden">
            <div className="px-6 py-5 border-b border-white/5">
              <div className="inline-flex items-center gap-2 mb-1">
                <span className="w-4 h-px bg-[#FF7420]" />
                <span className="text-[#FF7420] text-[10px] font-bold uppercase tracking-[0.3em]">
                  {authType === 'login' ? 'Acceso' : 'Nueva cuenta'}
                </span>
              </div>
              <h2 className="text-xl font-black text-white">
                {authType === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
              </h2>
            </div>
            <div className="p-6">
              <Auth authType={authType} onAuthSuccess={handleAuthSuccess} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── Pantalla principal ──
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">

      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/images/industrial-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-transparent to-[#0a0a0a]" />
        <div className="relative max-w-7xl mx-auto px-6 md:px-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-px bg-[#FF7420]" />
            <span className="text-[#FF7420] text-xs font-semibold uppercase tracking-[0.3em]">Contacto</span>
          </div>
          <h1 className="text-3xl md:text-6xl font-black tracking-tight leading-tight max-w-3xl mb-10">
            Liderando en Soluciones<br />
            Industriales y Sistemas de<br />
            <span className="text-[#FF7420]">Seguridad</span>
          </h1>
          <div className="flex flex-wrap gap-3">
            {badges.map((b, i) => (
              <div key={i} className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                <CheckCircle className="w-3.5 h-3.5 text-[#FF7420] shrink-0" />
                <span className="text-sm text-gray-300">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Card principal */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 pb-20">
        <div className="grid lg:grid-cols-5 gap-6">

          {/* Features — izquierda */}
          <div className="lg:col-span-2 bg-[#141414] rounded-3xl border border-white/5 p-8 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-4 h-px bg-[#FF7420]" />
                <span className="text-[#FF7420] text-[10px] font-bold uppercase tracking-[0.3em]">¿Por qué elegirnos?</span>
              </div>
              <h2 className="text-2xl font-black mb-8 leading-tight">
                Soluciones con respaldo<br />y experiencia
              </h2>
              <ul className="space-y-5">
                {features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#FF7420]/10 border border-[#FF7420]/20 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-[#FF7420]" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-white">{f.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{f.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mt-10 pt-8 border-t border-white/5">
              {[["10+", "Años de exp."], ["200+", "Proyectos"], ["98%", "Satisfacción"], ["24/7", "Soporte"]].map(([val, label], i) => (
                <div key={i} className="bg-[#1a1a1a] rounded-2xl p-4">
                  <p className="text-2xl font-black text-[#FF7420]">{val}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Acciones — derecha */}
          <div className="lg:col-span-3 flex flex-col gap-4">

            {/* Banner naranja */}
            <div className="bg-[#FF7420] rounded-3xl p-8 md:p-10">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-4 h-px bg-white/60" />
                <span className="text-white/70 text-[10px] font-bold uppercase tracking-[0.3em]">Acceso</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
                Solicita una Consulta
              </h2>
              <p className="text-white/80 text-sm">
                Crea tu cuenta o inicia sesión para comenzar y gestionar tu solicitud de forma personalizada.
              </p>
            </div>

            {/* Botón Crear Cuenta */}
            <button
              onClick={() => setAuthType('register')}
              className="group bg-[#141414] hover:bg-[#1a1a1a] border border-white/5 hover:border-[#FF7420]/30 rounded-3xl p-7 flex items-center justify-between transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,116,32,0.08)]"
            >
              <div className="text-left">
                <div className="inline-flex items-center gap-2 mb-1">
                  <span className="w-4 h-px bg-[#FF7420]" />
                  <span className="text-[#FF7420] text-[10px] font-bold uppercase tracking-widest">Nuevo usuario</span>
                </div>
                <p className="text-white font-black text-lg">Crear Cuenta</p>
                <p className="text-gray-500 text-xs mt-1">Regístrate y accede a tu panel de consultas</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#FF7420] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>

            {/* Botón Iniciar Sesión */}
            <button
              onClick={() => setAuthType('login')}
              className="group bg-[#141414] hover:bg-[#1a1a1a] border border-white/5 hover:border-white/10 rounded-3xl p-7 flex items-center justify-between transition-all duration-300"
            >
              <div className="text-left">
                <div className="inline-flex items-center gap-2 mb-1">
                  <span className="w-4 h-px bg-gray-500" />
                  <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Ya tengo cuenta</span>
                </div>
                <p className="text-white font-black text-lg">Iniciar Sesión</p>
                <p className="text-gray-500 text-xs mt-1">Accede a tu panel y gestiona tus consultas</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors">
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>

          </div>
        </div>
      </section>

    </div>
  )
}