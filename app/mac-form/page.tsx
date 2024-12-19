'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ProgressBar from '../MAC/components/ProgressBar'
import ServiceInfo from '../MAC/components/ServiceInfo'
import LocationInfo from '../MAC/components/LocationInfo'
import ProjectDetails from '../MAC/components/ProjectDetails'
import AdditionalInfo from '../MAC/components/AdditionalInfo'
import ContactInfo from '../MAC/components/ContactInfo'
import Summary from '../MAC/components/Summary'

interface FormData {
  [key: string]: any;
}

export default function MACForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({})
  const router = useRouter()

  useEffect(() => {
    // Aquí puedes poner cualquier lógica que necesite el router
  }, [router])

  const updateFormData = (newData: FormData) => {
    setFormData((prevData) => ({ ...prevData, ...newData }))
  }

  const nextStep = () => setStep((prevStep) => prevStep + 1)
  const prevStep = () => setStep((prevStep) => prevStep - 1)

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/consultations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        router.push('/client-dashboard')
      } else {
        throw new Error('Error al enviar la consulta')
      }
    } catch (error) {
      console.error('Error:', error)
      // Manejar el error (por ejemplo, mostrar un mensaje al usuario)
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return <ServiceInfo onNext={nextStep} updateFormData={updateFormData} />
      case 2:
        return <LocationInfo onNext={nextStep} onPrev={prevStep} updateFormData={updateFormData} />
      case 3:
        return <ProjectDetails onNext={nextStep} onPrev={prevStep} updateFormData={updateFormData} />
      case 4:
        return <AdditionalInfo onNext={nextStep} onPrev={prevStep} updateFormData={updateFormData} />
      case 5:
        return <ContactInfo onNext={nextStep} onPrev={prevStep} updateFormData={updateFormData} />
      case 6:
        return <Summary formData={formData} onPrev={prevStep} onSubmit={handleSubmit} />
      default:
        return null
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
            El control total sobre nuestros productos y servicios nos permite ofrecer a nuestros clientes la mejor calidad, precios y servicios. Nos enorgullecemos de todo lo que hacemos en SIFYGSA.
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

