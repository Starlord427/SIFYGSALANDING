import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'

interface ServiceInfoProps {
  onNext: () => void;
  updateFormData: (data: any) => void;
}

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
      "Interruptores de presión, temperatura, nivel, flujo, valvulas de control"
    ]
  },
  "Sistemas de Energía y Protección Eléctrica": {
    "Sistemas de Energía Ininterrumpida": [
      "UPS, inversores, cargadores"
    ],
    "Monitoreo y Protección": [
      "Monitoreo por vibración, sensores, transmisores"
    ]
  },
  "Sistemas de Aire y Gas": {
    "Tratamiento de Aire y Gas": [
      "Ventiladores, compresores, sopladores"
    ],
    "Compresión de Aire": [
      "Soluciones de aire comprimido"
    ]
  },
  "Sistemas de Comunicación de Emergencia": {
    "Notificación Masiva": [
      "Sistemas de alarma y sirenas"
    ],
    "Intercomunicación": [
      "Sistemas de voceo IP, paneles de control"
    ]
  },
  "Servicios y Soluciones Adicionales": {
    "Servicios Técnicos": [
      "Selección de equipos, mantenimientos, soporte técnico"
    ],
    "Protección de Equipos": [
      "Sistemas integrales para la protección de equipos críticos e instalaciones industriales."
    ],
    "Sistemas de Videovigilancia": [
      "Tecnología de punta en sistemas de videovigilancia para mejorar la seguridad en sus instalaciones."
    ],
    "Sistemas de Aire para Instrumentos": [
      "Soluciones especializadas de aire comprimido para instrumentos y controles industriales."
    ]
  }
}

export default function ServiceInfo({ onNext, updateFormData }: ServiceInfoProps) {
  const [selectedServices, setSelectedServices] = useState<string[]>([])

  const handleServiceToggle = (service: string) => {
    setSelectedServices(prev =>
      prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service]
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
    <div className="text-gray-800">
      <h2 className="text-2xl font-semibold mb-6">Información de Servicios y Productos</h2>
      <p className="mb-4">¿Cuáles son los servicios o productos que requiere? (Puede seleccionar varios)</p>
      <Accordion type="single" collapsible className="w-full mb-6">
        {Object.entries(servicesAndProducts).map(([category, subcategories]) => (
          <AccordionItem value={category} key={category}>
            <AccordionTrigger>{category}</AccordionTrigger>
            <AccordionContent>
              {Object.entries(subcategories).map(([subcategory, serviceList]) => (
                <div key={subcategory} className="mb-4">
                  <h3 className="font-semibold mb-2">{subcategory}</h3>
                  <ul className="space-y-2">
                    {serviceList.map((service) => (
                      <li key={service}>
                        <button
                          onClick={() => handleServiceToggle(service)}
                          className={`flex items-center w-full p-2 rounded-md transition-colors ${
                            selectedServices.includes(service)
                              ? 'bg-[#FF7420] text-white'
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                          }`}
                        >
                          <CheckCircle className={`mr-2 h-5 w-5 ${selectedServices.includes(service) ? 'text-white' : 'text-gray-400'}`} />
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
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">
          {selectedServices.length} {selectedServices.length === 1 ? 'servicio seleccionado' : 'servicios seleccionados'}
        </p>
        <Button 
          onClick={handleNext} 
          disabled={selectedServices.length === 0}
          className="bg-[#FF7420] text-white hover:bg-[#FF7420]/90"
        >
          Confirmar y Continuar
        </Button>
      </div>
    </div>
  )
}



