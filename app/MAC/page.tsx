'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import ProgressBar from './components/ProgressBar'
import ServiceInfo from './components/ServiceInfo'
import LocationInfo from './components/LocationInfo'
import ProjectDetails from './components/ProjectDetails'
import AdditionalInfo from './components/AdditionalInfo'
import ContactInfo from './components/ContactInfo'
import Summary from './components/Summary'

// Tipo completo del formulario — alineado con el schema de Prisma
interface MACFormData {
  // Paso 1 - Servicios
  servicesAndProducts?: string[]
  serviceType?: string
  // Paso 2 - Ubicación
  address?: string
  postalCode?: string
  latitude?: number | null
  longitude?: number | null
  // Paso 3 - Detalles del proyecto
  projectTypes?: string[]
  startDate?: string
  installations?: string
  budget?: string
  // Paso 4 - Info adicional
  supportLevel?: string
  // Paso 5 - Contacto
  name?: string
  position?: string
  organization?: string
  email?: string
  phone?: string
}

export default function MAC() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<MACFormData>({})
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceType:   formData.serviceType ?? formData.servicesAndProducts?.join(', '),
          address:       formData.address,
          postalCode:    formData.postalCode,
          latitude:      formData.latitude,
          longitude:     formData.longitude,
          projectTypes:  formData.projectTypes ?? [],
          startDate:     formData.startDate,
          installations: formData.installations,
          budget:        formData.budget,
          supportLevel:  formData.supportLevel,
          name:          formData.name,
          organization:  formData.organization,
          email:         formData.email,
          phone:         formData.phone,
        }),
      })

      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.message ?? 'Error al enviar')
      }

      toast.success('¡Solicitud enviada con éxito! Nos pondremos en contacto pronto.')
      setTimeout(() => router.push('/'), 2000)

    } catch (error: any) {
      console.error('Error:', error)
      toast.error(error.message ?? 'Ocurrió un error. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const updateFormData = (newData: Partial<MACFormData>) => {
    setFormData(prev => ({ ...prev, ...newData }))
  }

  const nextStep = () => setStep(prev => prev + 1)
  const prevStep = () => setStep(prev => prev - 1)

  const renderStep = () => {
    switch (step) {
      case 1: return <ServiceInfo   onNext={nextStep}                   updateFormData={updateFormData} />
      case 2: return <LocationInfo  onNext={nextStep} onPrev={prevStep} updateFormData={updateFormData} />
      case 3: return <ProjectDetails onNext={nextStep} onPrev={prevStep} updateFormData={updateFormData} />
      case 4: return <AdditionalInfo onNext={nextStep} onPrev={prevStep} updateFormData={updateFormData} />
      case 5: return <ContactInfo   onNext={nextStep} onPrev={prevStep} updateFormData={updateFormData} />
      case 6: return <Summary formData={formData} onPrev={prevStep} onSubmit={handleSubmit} loading={loading} />
      default: return null
    }
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-12">
        <div className="bg-[#FF7420] rounded-lg p-8 max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-white text-center mb-2">
            Módulo de Atención al Cliente (MAC)
          </h1>
          <p className="text-center text-white mb-8">
            El control total sobre nuestros productos y servicios nos permite ofrecer a nuestros clientes la mejor calidad, precios y servicios.
          </p>
          <div className="bg-white p-8 rounded-lg">
            <ProgressBar currentStep={step} totalSteps={6} />
            {renderStep()}
          </div>
        </div>
      </div>
    </div>
  )
}
