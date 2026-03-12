// app/MAC/page.tsx
'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import ProgressBar    from './components/ProgressBar'
import ServiceInfo    from './components/ServiceInfo'
import LocationInfo   from './components/LocationInfo'
import ProjectDetails from './components/ProjectDetails'
import AdditionalInfo from './components/AdditionalInfo'
import ContactInfo    from './components/ContactInfo'
import Summary        from './components/Summary'

const SESSION_KEY = 'mac_form_draft'

export default function MAC() {
  const router                        = useRouter()
  const [step, setStep]               = useState(1)
  const [formData, setFormData]       = useState<Record<string, any>>({})
  const [restored, setRestored]       = useState(false)
  const [dbDraftId, setDbDraftId]     = useState<string | null>(null)
  const [saving, setSaving]           = useState(false)
  const saveTimeout                   = useRef<ReturnType<typeof setTimeout>>()

  // ── 1. Al montar: cargar borrador (DB primero, sessionStorage como fallback) ──
  useEffect(() => {
    const loadDraft = async () => {
      try {
        // Intenta DB primero
        const res = await fetch('/api/consultations/draft')
        if (res.ok) {
          const draft = await res.json()
          if (draft) {
            setStep(draft.step ?? 1)
            setFormData(draft.formData ?? {})
            setDbDraftId(draft.id)
            if (draft.step > 1) setRestored(true)
            return
          }
        }
      } catch {}

      // Fallback: sessionStorage
      try {
        const saved = sessionStorage.getItem(SESSION_KEY)
        if (saved) {
          const { step: s, formData: d } = JSON.parse(saved)
          if (s) setStep(s)
          if (d) setFormData(d)
          if (s > 1) setRestored(true)
        }
      } catch {}
    }
    loadDraft()
  }, [])

  // ── 2. Guardar borrador (debounced) en DB + sessionStorage ──
  const saveDraft = useCallback(async (currentStep: number, currentData: Record<string, any>) => {
    // sessionStorage inmediato
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify({ step: currentStep, formData: currentData }))
    } catch {}

    // DB con debounce de 800ms para no hacer un request por cada keystroke
    clearTimeout(saveTimeout.current)
    saveTimeout.current = setTimeout(async () => {
      setSaving(true)
      try {
        await fetch('/api/consultations/draft', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ step: currentStep, formData: currentData }),
        })
      } catch {}
      setSaving(false)
    }, 800)
  }, [])

  // ── 3. Limpiar borrador ──
  const clearDraft = async () => {
    sessionStorage.removeItem(SESSION_KEY)
    try { await fetch('/api/consultations/draft', { method: 'DELETE' }) } catch {}
    setStep(1)
    setFormData({})
    setRestored(false)
    setDbDraftId(null)
  }

  // ── 4. Actualizar formData y guardar ──
  const updateFormData = (newData: Record<string, any>) => {
    setFormData(prev => {
      const updated = { ...prev, ...newData }
      saveDraft(step, updated)
      return updated
    })
  }

  const nextStep = () => {
    const next = step + 1
    setStep(next)
    saveDraft(next, formData)
  }

  const prevStep = () => {
    const prev = step - 1
    setStep(prev)
    saveDraft(prev, formData)
  }

  // ── 5. Submit final ──
  const handleSubmit = async () => {
    const response = await fetch('/api/consultations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    if (!response.ok) throw new Error('Error al enviar')
    await clearDraft()
  }

  const renderStep = () => {
    switch (step) {
      case 1: return <ServiceInfo    onNext={nextStep} updateFormData={updateFormData} initialData={{ servicesAndProducts: formData.servicesAndProducts }} />
      case 2: return <LocationInfo   onNext={nextStep} onPrev={prevStep} updateFormData={updateFormData} initialData={{ address: formData.address, postalCode: formData.postalCode, latitude: formData.latitude, longitude: formData.longitude }} />
      case 3: return <ProjectDetails onNext={nextStep} onPrev={prevStep} updateFormData={updateFormData} initialData={{ projectTypes: formData.projectTypes, startDate: formData.startDate, preferredTime: formData.preferredTime }} />
      case 4: return <AdditionalInfo onNext={nextStep} onPrev={prevStep} updateFormData={updateFormData} initialData={{ installations: formData.installations, budget: formData.budget, supportLevel: formData.supportLevel }} />
      case 5: return <ContactInfo    onNext={nextStep} onPrev={prevStep} updateFormData={updateFormData} initialData={{ name: formData.name, position: formData.position, organization: formData.organization, email: formData.email, phone: formData.phone }} />
      case 6: return <Summary formData={formData} onPrev={prevStep} onSubmit={handleSubmit} />
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

        {/* Stepper */}
        <div className="hidden md:flex items-center justify-center gap-1 mb-8">
          {stepLabels.map((label, i) => {
            const n = i + 1
            const active    = n === step
            const completed = n < step
            return (
              <div key={n} className="flex items-center gap-1">
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${active ? 'bg-[#FF7420] text-white' : completed ? 'bg-[#FF7420]/20 text-[#FF7420]' : 'bg-white/5 text-gray-600'}`}>
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black ${active ? 'bg-white text-[#FF7420]' : completed ? 'bg-[#FF7420] text-white' : 'bg-white/10 text-gray-500'}`}>
                    {completed ? '✓' : n}
                  </span>
                  {label}
                </div>
                {i < stepLabels.length - 1 && <div className={`w-6 h-px ${n < step ? 'bg-[#FF7420]/40' : 'bg-white/10'}`} />}
              </div>
            )
          })}
        </div>

        {/* Banner borrador */}
        {restored && step > 1 && (
          <div className="mb-4 flex items-center justify-between bg-[#FF7420]/10 border border-[#FF7420]/20 rounded-2xl px-5 py-3">
            <div className="flex items-center gap-2">
              <span className="text-[#FF7420] text-xs font-semibold">✓ Progreso restaurado</span>
              {saving && <span className="text-gray-600 text-[10px]">Guardando...</span>}
              {!saving && <span className="text-gray-600 text-[10px]">· Guardado automáticamente</span>}
            </div>
            <button onClick={clearDraft} className="text-gray-500 hover:text-red-400 text-[10px] font-semibold transition-colors">
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

        {/* Botón retomar desde dashboard */}
        {step > 1 && (
          <div className="mt-4 text-center">
            <button
              onClick={() => router.push('/dashboard/client')}
              className="text-gray-600 hover:text-gray-400 text-xs transition-colors"
            >
              Guardar y continuar después →
            </button>
          </div>
        )}

      </div>
    </div>
  )
}
