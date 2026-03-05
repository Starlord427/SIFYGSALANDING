'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ArrowRight } from 'lucide-react'
import Auth from '@/components/Auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'

type AuthType = 'login' | 'register' | null;

export default function Contacto() {
  const [user, loadingUser] = useAuthState(auth)
  const [authType, setAuthType] = useState<AuthType>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // Efecto para redirección automática si ya está logueado
  useEffect(() => {
    const checkUserAndRedirect = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid))
        const userData = userDoc.data()
        
        if (!userData?.hasCompletedMACForm) {
          router.push('/MAC')
        }
      }
    }

    if (!loadingUser) {
      checkUserAndRedirect()
    }
  }, [user, loadingUser, router])

  if (loadingUser) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#FF7420]"></div>
      </div>
    )
  }

  const handleAuthClick = (type: 'login' | 'register') => {
    setAuthType(type)
  }

  const handleAuthSuccess = (role: string) => {
    switch (role) {
      case 'client':
        router.push('/client-dashboard')
        break
      case 'salesperson':
        router.push('/salesperson-dashboard')
        break
      case 'manager':
        router.push('/manager-dashboard')
        break
      default:
        router.push('/MAC')
    }
  }

  const handleContactRequest = () => {
    if (user) {
      setLoading(true)
      router.push('/MAC')
    } else {
      setAuthType('register')
    }
  }

  // Si se está mostrando el componente de Auth
  if (authType) {
    return (
      <div className="min-h-screen bg-black p-4 flex flex-col items-center justify-center">
        <Button 
          onClick={() => setAuthType(null)}
          className="mb-4 bg-transparent text-[#FF7420] hover:bg-[#FF7420]/10"
        >
          &larr; Volver
        </Button>
        <Auth authType={authType} onAuthSuccess={handleAuthSuccess} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
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

      {/* Main Content Card */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          {!user && (
            <div className="bg-[#FF7420] rounded-lg p-8 mb-12 text-center text-white">
              <h2 className="text-2xl font-bold mb-6">Inicia sesión o regístrate para comenzar tu Consulta.</h2>
              <div className="flex justify-center gap-4">
                <Button onClick={() => handleAuthClick('login')} className="bg-white text-[#FF7420] hover:bg-gray-100">Iniciar Sesión</Button>
                <Button onClick={() => handleAuthClick('register')} className="bg-black text-white hover:bg-gray-900">Crear Cuenta</Button>
              </div>
            </div>
          )}

          <Card className="bg-white">
            <CardHeader className="bg-[#FF7420] text-white rounded-t-lg">
              <CardTitle className="text-3xl font-bold text-center">Solicita una Consulta</CardTitle>
              <CardDescription className="text-center text-white/90">
                Atención experta en seguridad industrial y automatización.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid gap-6 md:grid-cols-2 mb-8">
                <FeatureItem title="Atención Personalizada" desc="Soluciones adaptadas a tus necesidades específicas" />
                <FeatureItem title="Expertos Certificados" desc="Equipo altamente capacitado" />
                <FeatureItem title="Soluciones a Medida" desc="Diseñamos sistemas que se ajustan a tu industria" />
                <FeatureItem title="Tecnología de Vanguardia" desc="Últimas innovaciones en seguridad" />
              </div>

              <Button 
                onClick={handleContactRequest}
                className="w-full bg-[#FF7420] hover:bg-[#FF7420]/90 text-white py-6 text-lg font-semibold"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center"><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" /> Cargando...</div>
                ) : (
                  <>
                    {user ? "Ir al Formulario MAC" : "Crear Cuenta y Solicitar Consulta"}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

function FeatureItem({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="flex items-start gap-3">
      <CheckCircle className="w-6 h-6 text-[#FF7420] mt-1 flex-shrink-0" />
      <div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-gray-600">{desc}</p>
      </div>
    </div>
  )
}
