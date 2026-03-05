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

export default function Contacto() {
  const [user, loadingUser] = useAuthState(auth)
  const [showAuth, setShowAuth] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

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
    return <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#FF7420]"></div>
    </div>
  }

  if (showAuth) {
    return <Auth isLogin={false} onBack={() => setShowAuth(false)} />
  }

  const handleContactRequest = () => {
    if (user) {
      setLoading(true)
      router.push('/MAC')
    } else {
      setShowAuth(true)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <Card className="w-full max-w-3xl bg-white">
        <CardHeader className="bg-[#FF7420] text-white rounded-t-lg">
          <CardTitle className="text-3xl font-bold text-center">Solicita una Consulta</CardTitle>
          <CardDescription className="text-center text-white/90">
            En SIFYGSA, estamos listos para atender tus necesidades de seguridad industrial y automatización.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid gap-6 md:grid-cols-2 mb-8">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-[#FF7420] mt-1" />
              <div>
                <h3 className="font-semibold text-lg">Atención Personalizada</h3>
                <p className="text-gray-600">Soluciones adaptadas a tus necesidades específicas</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-[#FF7420] mt-1" />
              <div>
                <h3 className="font-semibold text-lg">Expertos en Seguridad Industrial</h3>
                <p className="text-gray-600">Equipo altamente capacitado y certificado</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-[#FF7420] mt-1" />
              <div>
                <h3 className="font-semibold text-lg">Soluciones a Medida</h3>
                <p className="text-gray-600">Diseñamos e implementamos sistemas que se ajustan a tu industria</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-[#FF7420] mt-1" />
              <div>
                <h3 className="font-semibold text-lg">Tecnología de Vanguardia</h3>
                <p className="text-gray-600">Utilizamos las últimas innovaciones en seguridad y automatización</p>
              </div>
            </div>
          </div>
          <Button 
            onClick={handleContactRequest}
            className="w-full bg-[#FF7420] hover:bg-[#FF7420]/90 text-white py-6 text-lg font-semibold"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
                Cargando...
              </div>
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
  )
}

