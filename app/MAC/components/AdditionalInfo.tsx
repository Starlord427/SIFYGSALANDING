import { useState, Dispatch, SetStateAction } from 'react'

interface AdditionalInfoProps {
  onNext: () => void
  onPrev: () => void
  updateFormData: Dispatch<SetStateAction<any>>
  initialData?: { installations?: string; budget?: string; supportLevel?: string }
}

const DarkSelect = ({ label, value, onChange, placeholder, options }: {
  label: string; value: string; onChange: (v: string) => void
  placeholder: string; options: { value: string; label: string }[]
}) => (
  <div>
    <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">{label}</label>
    <select
      value={value} onChange={(e) => onChange(e.target.value)}
      className="w-full bg-[#1a1a1a] border border-white/10 hover:border-white/20 focus:border-[#FF7420]/50 text-gray-300 text-sm px-4 py-3 rounded-xl outline-none transition-colors"
    >
      <option value="" className="bg-[#1a1a1a]">{placeholder}</option>
      {options.map(o => <option key={o.value} value={o.value} className="bg-[#1a1a1a]">{o.label}</option>)}
    </select>
  </div>
)

export default function AdditionalInfo({ onNext, onPrev, updateFormData, initialData }: AdditionalInfoProps) {
  const [installations, setInstallations] = useState(initialData?.installations ?? '')
  const [budget,        setBudget]        = useState(initialData?.budget        ?? '')
  const [supportLevel,  setSupportLevel]  = useState(initialData?.supportLevel  ?? '')

  const handleNext = () => {
    updateFormData({ installations, budget, supportLevel })
    onNext()
  }

  return (
    <div>
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 mb-2">
          <span className="w-4 h-px bg-[#FF7420]" />
          <span className="text-[#FF7420] text-[10px] font-bold uppercase tracking-[0.3em]">Paso 4</span>
        </div>
        <h2 className="text-xl font-black text-white">Información Adicional</h2>
        <p className="text-gray-500 text-sm mt-1">Ayúdanos a entender mejor el alcance y las expectativas del proyecto.</p>
      </div>

      <div className="space-y-5 mb-8">
        <DarkSelect label="¿Cuántas instalaciones se verán afectadas?" value={installations} onChange={setInstallations}
          placeholder="Seleccione el número de instalaciones"
          options={[{ value: '1', label: '1 instalación' }, { value: '2-5', label: '2-5 instalaciones' }, { value: 'more', label: 'Más de 5 instalaciones' }]}
        />
        <DarkSelect label="Presupuesto aproximado" value={budget} onChange={setBudget}
          placeholder="Seleccione un rango de presupuesto"
          options={[{ value: 'less100k', label: 'Menos de $100,000 MXN' }, { value: '100k-1m', label: 'Entre $100,000 y $1,000,000 MXN' }, { value: 'more1m', label: 'Más de $1,000,000 MXN' }, { value: 'undefined', label: 'No definido' }]}
        />
        <DarkSelect label="Nivel de soporte técnico esperado" value={supportLevel} onChange={setSupportLevel}
          placeholder="Seleccione el nivel de soporte"
          options={[{ value: 'remote', label: 'Soporte remoto (asesoría en línea)' }, { value: 'onsite', label: 'Visita técnica en sitio' }, { value: 'both', label: 'Ambas opciones (remoto y presencial)' }]}
        />
      </div>

      <div className="flex justify-between pt-4 border-t border-white/5">
        <button onClick={onPrev} className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Anterior
        </button>
        <button onClick={handleNext} disabled={!installations || !budget || !supportLevel} className="inline-flex items-center gap-2 bg-[#FF7420] hover:bg-[#e5681c] disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-colors">
          Siguiente
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  )
}