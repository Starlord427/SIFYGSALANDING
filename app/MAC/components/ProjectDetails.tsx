import { useState } from 'react'

const projectTypes = [
  { id: "instalacion",   label: "Instalación de nuevos equipos o sistemas" },
  { id: "reparacion",    label: "Reparación de equipos existentes" },
  { id: "actualizacion", label: "Actualización de sistemas" },
  { id: "mantenimiento", label: "Mantenimiento preventivo" },
  { id: "inspeccion",    label: "Inspección y certificación" },
  { id: "asesoria",      label: "Asesoría técnica" },
]

interface ProjectDetailsProps {
  onNext: () => void
  onPrev: () => void
  updateFormData: (data: { projectTypes: string[]; startDate: string; preferredTime: string }) => void
  initialData?: { projectTypes?: string[]; startDate?: string; preferredTime?: string }
}

export default function ProjectDetails({ onNext, onPrev, updateFormData, initialData }: ProjectDetailsProps) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>(initialData?.projectTypes  ?? [])
  const [startDate,     setStartDate]     = useState(initialData?.startDate     ?? '')
  const [preferredTime, setPreferredTime] = useState(initialData?.preferredTime ?? '')

  const toggleProjectType = (id: string) => {
    setSelectedTypes(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id])
  }

  const handleNext = () => {
    updateFormData({ projectTypes: selectedTypes, startDate, preferredTime })
    onNext()
  }

  return (
    <div>
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 mb-2">
          <span className="w-4 h-px bg-[#FF7420]" />
          <span className="text-[#FF7420] text-[10px] font-bold uppercase tracking-[0.3em]">Paso 3</span>
        </div>
        <h2 className="text-xl font-black text-white">Detalles del Proyecto</h2>
        <p className="text-gray-500 text-sm mt-1">Selecciona el alcance del servicio. Puedes elegir varios.</p>
      </div>

      <div className="space-y-6 mb-8">
        <div>
          <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">Alcance del proyecto</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {projectTypes.map(({ id, label }) => (
              <button
                key={id} onClick={() => toggleProjectType(id)}
                className={`p-4 rounded-xl border text-left text-sm font-medium transition-all ${
                  selectedTypes.includes(id)
                    ? 'bg-[#FF7420] border-[#FF7420] text-white'
                    : 'bg-[#1a1a1a] border-white/5 hover:border-white/20 text-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center ${selectedTypes.includes(id) ? 'border-white bg-white' : 'border-gray-600'}`}>
                    {selectedTypes.includes(id) && <div className="w-2 h-2 rounded-full bg-[#FF7420]" />}
                  </div>
                  {label}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Fecha de inicio del servicio</label>
          <input
            type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-white/10 hover:border-white/20 focus:border-[#FF7420]/50 text-white text-sm px-4 py-3 rounded-xl outline-none transition-colors [color-scheme:dark]"
          />
        </div>

        <div>
          <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Horario preferido</label>
          <select
            value={preferredTime} onChange={(e) => setPreferredTime(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-white/10 hover:border-white/20 focus:border-[#FF7420]/50 text-gray-300 text-sm px-4 py-3 rounded-xl outline-none transition-colors"
          >
            <option value="" className="bg-[#1a1a1a]">Seleccione horario preferido</option>
            <option value="morning"   className="bg-[#1a1a1a]">Mañana (8:00 a.m. - 12:00 p.m.)</option>
            <option value="afternoon" className="bg-[#1a1a1a]">Tarde (12:00 p.m. - 6:00 p.m.)</option>
            <option value="allday"    className="bg-[#1a1a1a]">Todo el día</option>
          </select>
        </div>
      </div>

      <div className="flex justify-between pt-4 border-t border-white/5">
        <button onClick={onPrev} className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Anterior
        </button>
        <button onClick={handleNext} disabled={selectedTypes.length === 0 || !startDate || !preferredTime} className="inline-flex items-center gap-2 bg-[#FF7420] hover:bg-[#e5681c] disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-colors">
          Siguiente
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  )
}