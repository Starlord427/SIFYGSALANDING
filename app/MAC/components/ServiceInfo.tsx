import { useState } from 'react'
import toast from 'react-hot-toast'

// ── Catálogo de servicios ──────────────────────────────────────────────────
const CATALOG: { id: string; label: string; icon: string; services: { sub: string; items: string[] }[] }[] = [
  {
    id: 'seguridad-personal',
    label: 'Seguridad Personal',
    icon: '🛡️',
    services: [
      { sub: 'Protección', items: ['Sistemas de protección contra caídas', 'Sistemas de detección de gas y fuego (F&GS)', 'Sistemas de detección y alarmas de incendio', 'Sistemas de supresión de incendios (agua y especiales)'] }
    ]
  },
  {
    id: 'seguridad-instalaciones',
    label: 'Seguridad de Instalaciones',
    icon: '📷',
    services: [
      { sub: 'Vigilancia y acceso', items: ['Sistemas de alarma y voceo (SAV)', 'Sistemas de videovigilancia (SCCTV)', 'Sistemas de control de acceso'] }
    ]
  },
  {
    id: 'control-automatizacion',
    label: 'Control y Automatización',
    icon: '⚙️',
    services: [
      { sub: 'Control de procesos', items: ['Automatización de procesos', 'Control de procesos', 'Instrumentación'] },
      { sub: 'Interruptores', items: ['Interruptores de presión, temperatura, nivel, flujo'] }
    ]
  },
  {
    id: 'energia-electrica',
    label: 'Energía y Protección Eléctrica',
    icon: '⚡',
    services: [
      { sub: 'Energía ininterrumpida', items: ['UPS, inversores, cargadores'] },
      { sub: 'Monitoreo', items: ['Monitoreo por vibración, sensores, transmisores'] }
    ]
  },
  {
    id: 'aire-gas',
    label: 'Aire y Gas',
    icon: '💨',
    services: [
      { sub: 'Tratamiento', items: ['Ventiladores, compresores, sopladores'] },
      { sub: 'Compresión', items: ['Soluciones de aire comprimido'] }
    ]
  },
  {
    id: 'comunicacion',
    label: 'Comunicación de Emergencia',
    icon: '📢',
    services: [
      { sub: 'Notificación masiva', items: ['Sistemas de alarma y sirenas'] },
      { sub: 'Intercomunicación', items: ['Sistemas de voceo IP, paneles de control'] }
    ]
  },
]

interface ServiceInfoProps {
  onNext: () => void
  updateFormData: (data: { servicesAndProducts: string[] }) => void
  initialData?: { servicesAndProducts?: string[] }
}

export default function ServiceInfo({ onNext, updateFormData, initialData }: ServiceInfoProps) {
  const [selected,        setSelected]        = useState<string[]>(initialData?.servicesAndProducts ?? [])
  const [activeCategory,  setActiveCategory]  = useState<string | null>(null)

  const toggle = (item: string) =>
    setSelected(prev => prev.includes(item) ? prev.filter(s => s !== item) : [...prev, item])

  const handleNext = () => {
    if (selected.length === 0) { toast.error('Selecciona al menos un servicio'); return }
    updateFormData({ servicesAndProducts: selected })
    onNext()
  }

  const activeCat = CATALOG.find(c => c.id === activeCategory)

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 mb-2">
          <span className="w-4 h-px bg-[#FF7420]" />
          <span className="text-[#FF7420] text-[10px] font-bold uppercase tracking-[0.3em]">Paso 1 de 3</span>
        </div>
        <h2 className="text-xl font-black text-white">¿Qué servicio necesitas?</h2>
        <p className="text-gray-500 text-sm mt-1">Selecciona una categoría para ver los servicios disponibles.</p>
      </div>

      {/* ── Vista: grid de cajones ── */}
      {!activeCategory && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          {CATALOG.map(cat => {
            // Cuenta cuántos items de esta categoría están seleccionados
            const allItems = cat.services.flatMap(s => s.items)
            const count    = allItems.filter(i => selected.includes(i)).length
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative flex flex-col items-start gap-2 p-5 rounded-2xl border text-left transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                  count > 0
                    ? 'bg-[#FF7420]/10 border-[#FF7420]/40'
                    : 'bg-[#1a1a1a] border-white/5 hover:border-white/20'
                }`}
              >
                <span className="text-2xl">{cat.icon}</span>
                <span className={`text-sm font-bold leading-tight ${count > 0 ? 'text-[#FF7420]' : 'text-white'}`}>
                  {cat.label}
                </span>
                {count > 0 && (
                  <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#FF7420] text-white text-[10px] font-black flex items-center justify-center">
                    {count}
                  </span>
                )}
                <svg className="w-4 h-4 text-gray-600 mt-auto self-end" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )
          })}
        </div>
      )}

      {/* ── Vista: servicios de la categoría activa ── */}
      {activeCategory && activeCat && (
        <div className="mb-6">
          {/* Breadcrumb */}
          <button
            onClick={() => setActiveCategory(null)}
            className="inline-flex items-center gap-2 text-gray-500 hover:text-[#FF7420] text-xs font-semibold mb-5 transition-colors group"
          >
            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {activeCat.icon} {activeCat.label}
          </button>

          <div className="space-y-5">
            {activeCat.services.map(({ sub, items }) => (
              <div key={sub}>
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">{sub}</p>
                <div className="space-y-2">
                  {items.map(item => {
                    const on = selected.includes(item)
                    return (
                      <button
                        key={item}
                        onClick={() => toggle(item)}
                        className={`w-full flex items-center gap-3 p-4 rounded-xl border text-left text-sm font-medium transition-all ${
                          on
                            ? 'bg-[#FF7420] border-[#FF7420] text-white'
                            : 'bg-[#1a1a1a] border-white/5 hover:border-white/20 text-gray-300'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${
                          on ? 'border-white bg-white' : 'border-gray-600'
                        }`}>
                          {on && <div className="w-2.5 h-2.5 rounded-full bg-[#FF7420]" />}
                        </div>
                        {item}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Botón para ver más categorías */}
          <button
            onClick={() => setActiveCategory(null)}
            className="mt-5 w-full py-3 rounded-xl border border-white/10 text-gray-500 hover:text-gray-300 hover:border-white/20 text-xs font-semibold transition-colors"
          >
            Ver otras categorías
          </button>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <p className="text-gray-600 text-xs">
          <span className="text-[#FF7420] font-bold">{selected.length}</span>{' '}
          {selected.length === 1 ? 'servicio seleccionado' : 'servicios seleccionados'}
        </p>
        <button
          onClick={handleNext}
          disabled={selected.length === 0}
          className="inline-flex items-center gap-2 bg-[#FF7420] hover:bg-[#e5681c] disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-colors"
        >
          Continuar
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}