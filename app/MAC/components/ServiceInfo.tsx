import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast';

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
    "Soluciones de Lubricación y Protección": []
  }
}

export default function ServiceInfo({ 
  onNext, 
  updateFormData 
}: { 
  onNext: () => void;
  updateFormData: (data: { servicesAndProducts: string[] }) => void;
}) {
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
      toast.error('Por favor, seleccione al menos un servicio o producto');
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-black">Información de Servicios y Productos</h2> {/* Changed text color to black */}
      <p className="mb-4 text-black">¿Cuáles son los servicios o productos que requiere? (Puede seleccionar varios)</p> {/* Changed text color to black */}
      <Accordion type="single" collapsible className="w-full mb-6">
        {Object.entries(servicesAndProducts).map(([category, subcategories]) => (
          <AccordionItem value={category} key={category} className="text-black"> {/* Added text-black here */}
            <AccordionTrigger className="text-black py-2">{category}</AccordionTrigger> {/* Changed text color to black and added padding */}
            <AccordionContent className="text-black"> {/* Changed text color to black */}
              {Object.entries(subcategories).map(([subcategory, serviceList]) => (
                <div key={subcategory} className="mb-4">
                  <h3 className="font-semibold mb-2 text-black">{subcategory}</h3> {/* Changed text color to black */}
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

