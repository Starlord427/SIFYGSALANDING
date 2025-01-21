"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/Label"
import { Eye, EyeOff, CheckCircle } from "lucide-react"
import { ServiceInfo, LocationInfo, ProjectDetails, AdditionalInfo, ContactInfo, Summary, ProgressBar } from "@/app/MAC/components"
import MACForm from "@/app/mac-form/page"
interface AuthProps {
  isLogin: boolean;
  onBack: () => void;
}

interface FormData {
  [key: string]: any;
}

export default function Auth({ isLogin, onBack }: AuthProps) {
  const router = useRouter()
  const [isLoginView, setIsLoginView] = useState(isLogin)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showMAC, setShowMAC] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (isLoginView) {
        // Login logic
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        })

        const data = await response.json()
        if (!response.ok) throw new Error(data.message)

        // Handle token and redirect based on role
        const userRole = data.user.role
        setIsLoggedIn(true)
        setShowMAC(true)
        // You can still use the switch statement here if you want to redirect to different dashboards
        // For now, we'll just show the MAC component
      } else {
        // Register logic
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, name, phone }),
        })

        const data = await response.json()
        if (!response.ok) throw new Error(data.message)

        setIsLoggedIn(true)
        setShowMAC(true)
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (showMAC) {
    return <MACForm />
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

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12 text-lg">
            <div className="flex items-center gap-3 text-white md:justify-center">
              <CheckCircle className="w-6 h-6 text-[#FF7420]" />
              <span>Personal Profesional</span>
            </div>
            <div className="flex items-center gap-3 text-white md:justify-center">
              <CheckCircle className="w-6 h-6 text-[#FF7420]" />
              <span>100% Satisfacción</span>
            </div>
            <div className="flex items-center gap-3 text-white md:justify-center">
              <CheckCircle className="w-6 h-6 text-[#FF7420]" />
              <span>Pruebas Precisas</span>
            </div>
            <div className="flex items-center gap-3 text-white md:justify-center">
              <CheckCircle className="w-6 h-6 text-[#FF7420]" />
              <span>Precios Transparentes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Auth Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-[#FF7420] rounded-lg p-8 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              {isLoginView ? "Iniciar Sesión" : "Crear Cuenta"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLoginView && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">
                      Nombre
                    </Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="bg-white text-black border-gray-300"
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white">
                      Teléfono
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="bg-white text-black border-gray-300"
                      placeholder="Número de teléfono"
                    />
                  </div>
                </>
              )}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white text-black border-gray-300"
                  placeholder="tu@email.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Contraseña
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-white text-black border-gray-300 pr-10"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              {error && <p className="text-red-500 text-sm text-center">{error}</p>}

              <Button type="submit" className="w-full bg-black text-white hover:bg-gray-900" disabled={loading}>
                {loading ? "Procesando..." : isLoginView ? "Iniciar Sesión" : "Registrarse"}
              </Button>

              <p className="text-center text-white">
                {isLoginView ? "¿No tienes una cuenta?" : "¿Ya tienes una cuenta?"}
                <button
                  type="button"
                  className="ml-1 text-black hover:text-gray-800"
                  onClick={() => setIsLoginView(!isLoginView)}
                >
                  {isLoginView ? "Regístrate" : "Inicia sesión"}
                </button>
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

