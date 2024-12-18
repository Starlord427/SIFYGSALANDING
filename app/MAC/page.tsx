'use client'

import { useState } from 'react'
import ProgressBar from './components/ProgressBar'
import ServiceInfo from './components/ServiceInfo'
import LocationInfo from './components/LocationInfo'
import ProjectDetails from './components/ProjectDetails'
import AdditionalInfo from './components/AdditionalInfo'
import ContactInfo from './components/ContactInfo'
import Summary from './components/Summary'

export default function MAC() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<Record<string, any>>({})

  const updateFormData = (newData: Record<string, any>) => {
    setFormData((prevData) => ({ ...prevData, ...newData }))
  }

  const nextStep = () => setStep((prevStep) => prevStep + 1)
  const prevStep = () => setStep((prevStep) => prevStep - 1)

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
        return <Summary formData={formData} onPrev={prevStep} />
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

