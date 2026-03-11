'use client'

import { useState, useEffect } from 'react'
import ProgressBar    from './components/ProgressBar'
import ServiceInfo    from './components/ServiceInfo'
import LocationInfo   from './components/LocationInfo'
import ProjectDetails from './components/ProjectDetails'
import AdditionalInfo from './components/AdditionalInfo'
import ContactInfo    from './components/ContactInfo'
import Summary        from './components/Summary'

const STORAGE_KEY = 'mac_form_draft'

export default function MAC() {
  const [step, setStep]         = useState(1)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [restored, setRestored] = useState(false)

  // Restaurar borrador al montar
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY)
      if (saved) {
        const { step: savedStep, formData: savedData } = JSON.parse(saved)
        if (savedStep)  setStep(savedStep)
        if (savedData)  setFormData(savedData)
        if (savedStep > 1) setRestored(true)
      }
    } catch {}
  }, [])

  // Guardar borrador en cada cambio
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ step, formData }))
    } catch {}
  }, [step, formData])

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/consultations', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(formData),
      })
      if (!response.ok) throw new Error('Error al enviar el formulario')
      sessionStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const updateFormData = (newData: Record<string, any>) => {
    setFormData((prev) => ({ ...prev, ...newData }))
  }

  const nextStep = () => setStep((s) => s + 1)
  const prevStep = () => setStep((s) => s - 1)

  // Cada step recibe initialData para pre-cargar sus campos locales
  const renderStep = () => {
    switch (step) {
      case 1: return (
        <ServiceInfo
          onNext={nextStep}
          updateFormData={updateFormData}
          initialData={{ servicesAndProducts: formData.servicesAndProducts }}
        />
      )
      case 2: return (
        <LocationInfo
          onNext={nextStep} onPrev={prevStep}
          updateFormData={updateFormData}
          initialData={{
            address:    formData.address,
            postalCode: formData.postalCode,
            latitude:   formData.latitude,
            longitude:  formData.longitude,
          }}
        />
      )
      case 3: return (
        <ProjectDetails
          onNext={nextStep} onPrev={prevStep}
          updateFormData={updateFormData}
          initialData={{
            projectTypes:  formData.projectTypes,
            startDate:     formData.startDate,
            preferredTime: formData.preferredTime,
          }}
        />
      )
      case 4: return (
        <AdditionalInfo
          onNext={nextStep} onPrev={prevStep}
          updateFormData={updateFormData}
          initialData={{
            installations: formData.installations,
            budget:        formData.budget,
            supportLevel:  formData.supportLevel,
          }}
        />
      )
      case 5: return (
        <ContactInfo
          onNext={nextStep} onPrev={prevStep}
          updateFormData={updateFormData}
          initialData={{
            name:         formData.name,
            position:     formData.position,
            organization: formData.organization,
            email:        formData.email,
            phone:        formData.phone,
          }}
        />
      )
      case 6: return (
        <Summary formData={formData} onPrev={prevStep} onSubmit={handleSubmit} />
      )
      default: return null
    }
  }

  const stepLabels = ['Servicios', 'Ubicación', 'Proyecto', 'Adicional', 'Contacto', 'Resumen']

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-20">
      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* Título */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-6 h-px bg-[#FF7420]" />
            <span className="text-[#FF7420] text-[10px] font-bold uppercase tracking-[0.3em]">Solicitud</span>
            <span className="w-6 h-px bg-[#FF7420]" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">Nueva Consulta</h1>
          <p className="text-gray-400 text-sm max-w-lg mx-auto leading-relaxed">
            El control total sobre nuestros productos y servicios nos permite ofrecer la mejor calidad, precios y servicio.
          </p>
        </div>

        {/* Step labels */}
        <div className="hidden md:flex items-center justify-center gap-1 mb-8">
          {stepLabels.map((label, i) => {
            const n         = i + 1
            const active    = n === step
            const completed = n < step
            return (
              <div key={n} className="flex items-center gap-1">
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  active    ? 'bg-[#FF7420] text-white' :
                  completed ? 'bg-[#FF7420]/20 text-[#FF7420]' :
                              'bg-white/5 text-gray-600'
                }`}>
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black ${
                    active    ? 'bg-white text-[#FF7420]' :
                    completed ? 'bg-[#FF7420] text-white' :
                                'bg-white/10 text-gray-500'
                  }`}>
                    {completed ? '✓' : n}
                  </span>
                  {label}
                </div>
                {i < stepLabels.length - 1 && (
                  <div className={`w-6 h-px ${n < step ? 'bg-[#FF7420]/40' : 'bg-white/10'}`} />
                )}
              </div>
            )
          })}
        </div>

        {/* Aviso borrador restaurado */}
        {restored && step > 1 && (
          <div className="mb-4 flex items-center justify-between bg-[#FF7420]/10 border border-[#FF7420]/20 rounded-2xl px-5 py-3">
            <p className="text-[#FF7420] text-xs font-semibold">
              ✓ Progreso restaurado — continúa desde donde lo dejaste
            </p>
            <button
              onClick={() => {
                sessionStorage.removeItem(STORAGE_KEY)
                setStep(1)
                setFormData({})
                setRestored(false)
              }}
              className="text-gray-500 hover:text-red-400 text-[10px] font-semibold transition-colors"
            >
              Reiniciar
            </button>
          </div>
        )}

        {/* Tarjeta principal */}
        <div className="bg-[#141414] rounded-3xl border border-white/5 overflow-hidden">
          <ProgressBar currentStep={step} totalSteps={6} />
          <div className="p-8 md:p-10">
            {renderStep()}
          </div>
        </div>

      </div>
    </div>
  )
}