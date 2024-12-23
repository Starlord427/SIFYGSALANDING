'use client'

import { useState } from 'react'
import MAC from '../MAC/page'
import { Button } from "@/components/ui/button"
import { CheckCircle } from 'lucide-react'

export default function Contacto() {
  const [showMAC, setShowMAC] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = () => {
    setIsLoggedIn(true)
    setShowMAC(true)
  }

  const handleRegister = () => {
    setIsLoggedIn(true)
    setShowMAC(true)
  }

  if (showMAC) {
    return <MAC />
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative py-20 bg-[url('/images/industrial-bg.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Liderando en Soluciones Industriales y<br />
            Sistemas de Seguridad
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
            <div className="flex items-center gap-3 text-white">
              <CheckCircle className="w-6 h-6 text-[#FF7420]" />
              <span>Personal Profesional</span>
            </div>
            <div className="flex items-center gap-3 text-white">
              <CheckCircle className="w-6 h-6 text-[#FF7420]" />
              <span>100% Satisfacción</span>
            </div>
            <div className="flex items-center gap-3 text-white">
              <CheckCircle className="w-6 h-6 text-[#FF7420]" />
              <span>Pruebas Precisas</span>
            </div>
            <div className="flex items-center gap-3 text-white">
              <CheckCircle className="w-6 h-6 text-[#FF7420]" />
              <span>Precios Transparentes</span>
            </div>
          </div>
        </div>
      </section>

      {/* MAC Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {!isLoggedIn ? (
            <div className="bg-[#FF7420] rounded-lg p-8 max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-6">
                ¿Tienes cuenta? Inicia sesión o regístrate para comenzar tu Consulta.
              </h2>
              <div className="flex justify-center gap-4">
                <Button 
                  onClick={handleLogin} 
                  className="bg-white text-[#FF7420] hover:bg-gray-100"
                >
                  Iniciar Sesión
                </Button>
                <Button 
                  onClick={handleRegister}
                  className="bg-black text-white hover:bg-gray-900"
                >
                  Crear Cuenta
                </Button>
              </div>
            </div>
          ) : (
            <Button 
              onClick={() => setShowMAC(true)} 
              className="mx-auto block bg-[#FF7420] hover:bg-[#FF7420]/90"
            >
              Acceder al Módulo de Atención al Cliente
            </Button>
          )}
        </div>
      </section>
    </div>
  )
}

