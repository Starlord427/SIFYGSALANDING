import { useState } from 'react'

interface ContactInfoProps {
  onNext: () => void
  onPrev: () => void
  updateFormData: (data: {
    contactName: string
    email: string
    phone: string
    position: string
    organization: string
  }) => void
  initialData?: {
    contactName?: string
    email?: string
    phone?: string
    position?: string
    organization?: string
  }
}

function Field({ label, optional, children }: { label: string; optional?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">
        {label}
        {optional
          ? <span className="text-gray-600 font-normal normal-case ml-1">(opcional)</span>
          : <span className="text-[#FF7420] ml-0.5">*</span>}
      </label>
      {children}
    </div>
  )
}

function Input({ type = 'text', placeholder, value, onChange }: {
  type?: string; placeholder: string; value: string; onChange: (v: string) => void
}) {
  return (
    <input
      type={type} placeholder={placeholder} value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full bg-[#1a1a1a] border border-white/10 hover:border-white/20 focus:border-[#FF7420]/50 text-white placeholder-gray-600 text-sm px-4 py-3 rounded-xl outline-none transition-colors"
    />
  )
}

export default function ContactInfo({ onNext, onPrev, updateFormData, initialData }: ContactInfoProps) {
  const [contactName,  setContactName]  = useState(initialData?.contactName  ?? '')
  const [email,        setEmail]        = useState(initialData?.email        ?? '')
  const [phone,        setPhone]        = useState(initialData?.phone        ?? '')
  const [position,     setPosition]     = useState(initialData?.position     ?? '')
  const [organization, setOrganization] = useState(initialData?.organization ?? '')

  const handleNext = () => {
    updateFormData({ contactName, email, phone, position, organization })
    onNext()
  }

  const canContinue = contactName.trim() !== '' && email.trim() !== ''

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 mb-2">
          <span className="w-4 h-px bg-[#FF7420]" />
          <span className="text-[#FF7420] text-[10px] font-bold uppercase tracking-[0.3em]">Paso 3 de 3</span>
        </div>
        <h2 className="text-xl font-black text-white">¿Con quién nos contactamos?</h2>
        <p className="text-gray-500 text-sm mt-1">Solo necesitamos tu nombre y correo para continuar.</p>
      </div>

      <div className="space-y-4 mb-8">
        {/* Obligatorios */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Field label="Nombre completo">
            <Input placeholder="Tu nombre" value={contactName} onChange={setContactName} />
          </Field>
          <Field label="Correo electrónico">
            <Input type="email" placeholder="correo@empresa.com" value={email} onChange={setEmail} />
          </Field>
        </div>

        {/* Separador */}
        <div className="flex items-center gap-3 py-1">
          <div className="flex-1 h-px bg-white/5" />
          <span className="text-gray-700 text-[10px] font-semibold uppercase tracking-widest">Opcional</span>
          <div className="flex-1 h-px bg-white/5" />
        </div>

        {/* Opcionales */}
        <Field label="Teléfono" optional>
          <Input type="tel" placeholder="+52 921 000 0000" value={phone} onChange={setPhone} />
        </Field>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Field label="Puesto" optional>
            <Input placeholder="Ej. Gerente de Mantenimiento" value={position} onChange={setPosition} />
          </Field>
          <Field label="Empresa / Organización" optional>
            <Input placeholder="Nombre de la empresa" value={organization} onChange={setOrganization} />
          </Field>
        </div>
      </div>

      {/* Nav */}
      <div className="flex justify-between pt-4 border-t border-white/5">
        <button onClick={onPrev} className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Anterior
        </button>
        <button onClick={handleNext} disabled={!canContinue} className="inline-flex items-center gap-2 bg-[#FF7420] hover:bg-[#e5681c] disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-colors">
          Ver resumen
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  )
}