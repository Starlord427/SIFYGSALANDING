'use client'

import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'
import Auth from '@/components/Auth'

type AuthType = 'login' | 'register' | null

export default function Contacto() {
  const { data: session, status } = useSession()
  const [authType, setAuthType] = useState<AuthType>(null)
  const router = useRouter()

  // Si ya está logueado, redirigir según rol
  if (status === 'authenticated' && !authType) {
    const role = (session.user as any)?.role ?? 'CLIENT'
    if      (role === 'MANAGER')     router.push('/dashboard/manager')
    else if (role === 'SALESPERSON') router.push('/dashboard/sales')
    else                             router.push('/dashboard/client')
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-[#FF7420]" />
      </div>
    )
  }

  const handleAuthSuccess = (role: string) => {
    if      (role === 'MANAGER')     router.push('/dashboard/manager')
    else if (role === 'SALESPERSON') router.push('/dashboard/sales')
    else                             router.push('/dashboard/client')
  }

  // Pantalla de login o registro
  if (authType) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
        <Button
          onClick={() => setAuthType(null)}
          className="mb-6 bg-transparent text-[#FF7420] hover:bg-[#FF7420]/10 self-start ml-4"
        >
          ← Volver
        </Button>
        <Auth authType={authType} onAuthSuccess={handleAuthSuccess} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero */}
      <section className="relative py-20 bg-[url('/images/industrial-bg.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative container mx-auto px-4 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Liderando en Soluciones Industriales y<br />
            Sistemas de Seguridad
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12 text-lg text-white">
            <div className="flex items-center gap-3"><CheckCircle className="w-6 h-6 text-[#FF7420]" /><span>Personal Profesional</span></div>
            <div className="flex items-center gap-3"><CheckCircle className="w-6 h-6 text-[#FF7420]" /><span>100% Satisfacción</span></div>
            <div className="flex items-center gap-3"><CheckCircle className="w-6 h-6 text-[#FF7420]" /><span>Pruebas Precisas</span></div>
            <div className="flex items-center gap-3"><CheckCircle className="w-6 h-6 text-[#FF7420]" /><span>Precios Transparentes</span></div>
          </div>
        </div>
      </section>

      {/* Card única */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">

            {/* Header */}
            <div className="bg-[#FF7420] px-8 py-10 text-center">
              <h2 className="text-3xl font-bold text-white mb-2">Solicita una Consulta</h2>
              <p className="text-white/90 text-sm">
                Crea tu cuenta o inicia sesión para comenzar
              </p>
            </div>

            {/* Features */}
            <div className="px-8 py-8 grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100">
              <FeatureItem title="Atención Personalizada"    desc="Soluciones adaptadas a tus necesidades" />
              <FeatureItem title="Expertos Certificados"     desc="Equipo altamente capacitado" />
              <FeatureItem title="Soluciones a Medida"       desc="Diseñamos sistemas para tu industria" />
              <FeatureItem title="Tecnología de Vanguardia"  desc="Últimas innovaciones en seguridad" />
            </div>

            {/* Botones */}
            <div className="px-8 py-8 flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => setAuthType('register')}
                className="flex-1 bg-[#FF7420] hover:bg-[#FF5500] text-white py-6 text-base font-semibold"
              >
                Crear Cuenta
              </Button>
              <Button
                onClick={() => setAuthType('login')}
                variant="outline"
                className="flex-1 border-2 border-[#FF7420] text-[#FF7420] hover:bg-[#FF7420] hover:text-white py-6 text-base font-semibold"
              >
                Iniciar Sesión
              </Button>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

function FeatureItem({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="flex items-start gap-3">
      <CheckCircle className="w-5 h-5 text-[#FF7420] mt-0.5 flex-shrink-0" />
      <div>
        <p className="font-semibold text-gray-800">{title}</p>
        <p className="text-sm text-gray-500">{desc}</p>
      </div>
    </div>
  )
}
