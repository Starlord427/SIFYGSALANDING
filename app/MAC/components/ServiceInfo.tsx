import { useState } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'

const servicesAndProducts = {
  "Sistemas de Seguridad y Protección": {
    "Seguridad Personal": [
      "Sistemas de protección contra caídas",
      "Sistemas de detección de gas y fuego (F&GS)",
      "Sistemas de detección y alarmas de incendio",
      "Sistemas de supresión de incendios (agua y especiales)"
    ],
    "Seguridad de Instalaciones": [
      "Sistemas de alarma y voceo (SAV)",
      "Sistemas de videovigilancia (SCCTV)",
      "Sistemas de control de acceso"
    ]
  },
  "Sistemas de Control y Automatización": {
    "Control de Procesos": [
      "Automatización de procesos",
      "Control de procesos",
      "Instrumentación"
    ],
    "Interruptores": [
      "Interruptores de presión, temperatura, nivel, flujo"
    ]
  },
  "Sistemas de Energía y Protección Eléctrica": {
    "Sistemas de Energía Ininterrumpida": ["UPS, inversores, cargadores"],
    "Monitoreo y Protección": ["Monitoreo por vibración, sensores, transmisores"]
  },
  "Sistemas de Aire y Gas": {
    "Tratamiento de Aire y Gas": ["Ventiladores, compresores, sopladores"],
    "Compresión de Aire": ["Soluciones de aire comprimido"]
  },
  "Sistemas de Comunicación de Emergencia": {
    "Notificación Masiva": ["Sistemas de alarma y sirenas"],
    "Intercomunicación": ["Sistemas de voceo IP, paneles de control"]
  },
  "Servicios y Soluciones Adicionales": {
    "Servicios Técnicos": ["Selección de equipos, mantenimientos, soporte técnico"],
    "Soluciones de Lubricación y Protección": []
  }
}

interface ServiceInfoProps {
  onNext: () => void
  updateFormData: (data: { servicesAndProducts: string[] }) => void
  initialData?: { servicesAndProducts?: string[] }
}

export default function ServiceInfo({ onNext, updateFormData, initialData }: ServiceInfoProps) {
  const [selectedServices, setSelectedServices] = useState<string[]>(
    initialData?.servicesAndProducts ?? []
  )

  const handleServiceToggle = (service: string) => {
    setSelectedServices(prev =>
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    )
  }

  const handleNext = () => {
    if (selectedServices.length > 0) {
      updateFormData({ servicesAndProducts: selectedServices })
      onNext()
    } else {
      toast.error('Por favor, seleccione al menos un servicio o producto')
    }
  }

  return (
    <div>
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 mb-2">
          <span className="w-4 h-px bg-[#FF7420]" />
          <span className="text-[#FF7420] text-[10px] font-bold uppercase tracking-[0.3em]">Paso 1</span>
        </div>
        <h2 className="text-xl font-black text-white">Servicios y Productos</h2>
        <p className="text-gray-500 text-sm mt-1">¿Cuáles son los servicios o productos que requiere? Puede seleccionar varios.</p>
      </div>

      <Accordion type="single" collapsible className="w-full mb-6 space-y-2">
        {Object.entries(servicesAndProducts).map(([category, subcategories]) => (
          <AccordionItem
            value={category} key={category}
            className="bg-[#1a1a1a] border border-white/5 rounded-2xl px-4 overflow-hidden data-[state=open]:border-[#FF7420]/20"
          >
            <AccordionTrigger className="text-white font-semibold text-sm py-4 hover:no-underline hover:text-[#FF7420] transition-colors">
              {category}
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              {Object.entries(subcategories).map(([subcategory, serviceList]) => (
                <div key={subcategory} className="mb-4">
                  <h3 className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">{subcategory}</h3>
                  <ul className="space-y-1.5">
                    {serviceList.map((service) => (
                      <li key={service}>
                        <button
                          onClick={() => handleServiceToggle(service)}
                          className={`flex items-center w-full p-3 rounded-xl text-sm transition-all ${
                            selectedServices.includes(service)
                              ? 'bg-[#FF7420] text-white'
                              : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/5 hover:border-white/10'
                          }`}
                        >
                          <CheckCircle className={`mr-2 h-4 w-4 shrink-0 ${selectedServices.includes(service) ? 'text-white' : 'text-gray-600'}`} />
                          {service}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <p className="text-gray-600 text-xs">
          <span className="text-[#FF7420] font-bold">{selectedServices.length}</span>{' '}
          {selectedServices.length === 1 ? 'servicio seleccionado' : 'servicios seleccionados'}
        </p>
        <button
          onClick={handleNext}
          disabled={selectedServices.length === 0}
          className="inline-flex items-center gap-2 bg-[#FF7420] hover:bg-[#e5681c] disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-colors"
        >
          Confirmar y Continuar
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}