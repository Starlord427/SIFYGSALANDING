import { useState } from 'react'

interface ContactInfoProps {
  onNext: () => void
  onPrev: () => void
  updateFormData: (data: { name: string; position: string; organization: string; email: string; phone: string }) => void
  initialData?: { name?: string; position?: string; organization?: string; email?: string; phone?: string }
}

const DarkInput = ({ type = 'text', placeholder, value, onChange, required = false }: {
  type?: string; placeholder: string; value: string
  onChange: (v: string) => void; required?: boolean
}) => (
  <input
    type={type} placeholder={placeholder} value={value}
    onChange={(e) => onChange(e.target.value)} required={required}
    className="w-full bg-[#1a1a1a] border border-white/10 hover:border-white/20 focus:border-[#FF7420]/50 text-white placeholder-gray-600 text-sm px-4 py-3 rounded-xl outline-none transition-colors"
  />
)

export default function ContactInfo({ onNext, onPrev, updateFormData, initialData }: ContactInfoProps) {
  const [name,         setName]  = useState(initialData?.name         ?? '')
  const [position,     setPos]   = useState(initialData?.position     ?? '')
  const [organization, setOrg]   = useState(initialData?.organization ?? '')
  const [email,        setEmail] = useState(initialData?.email        ?? '')
  const [phone,        setPhone] = useState(initialData?.phone        ?? '')

  const handleNext = () => {
    updateFormData({ name, position, organization, email, phone })
    onNext()
  }

  return (
    <div>
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 mb-2">
          <span className="w-4 h-px bg-[#FF7420]" />
          <span className="text-[#FF7420] text-[10px] font-bold uppercase tracking-[0.3em]">Paso 5</span>
        </div>
        <h2 className="text-xl font-black text-white">Información de Contacto</h2>
        <p className="text-gray-500 text-sm mt-1">¿Con quién nos ponemos en contacto?</p>
      </div>

      <div className="space-y-3 mb-8">
        <div>
          <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Nombre *</label>
          <DarkInput placeholder="Nombre completo" value={name} onChange={setName} required />
        </div>
        <div>
          <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Puesto <span className="text-gray-600 normal-case font-normal">(opcional)</span></label>
          <DarkInput placeholder="Ej. Gerente de Mantenimiento" value={position} onChange={setPos} />
        </div>
        <div>
          <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Organización *</label>
          <DarkInput placeholder="Nombre de la empresa" value={organization} onChange={setOrg} required />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Correo electrónico *</label>
            <DarkInput type="email" placeholder="correo@empresa.com" value={email} onChange={setEmail} required />
          </div>
          <div>
            <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Teléfono *</label>
            <DarkInput type="tel" placeholder="+52 921 000 0000" value={phone} onChange={setPhone} required />
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4 border-t border-white/5">
        <button onClick={onPrev} className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Anterior
        </button>
        <button onClick={handleNext} disabled={!name || !organization || !email || !phone} className="inline-flex items-center gap-2 bg-[#FF7420] hover:bg-[#e5681c] disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-colors">
          Ver Resumen
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  )
}