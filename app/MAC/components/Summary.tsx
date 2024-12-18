import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface SummaryProps {
  formData: Record<string, any>;
  onPrev: () => void;
}

export default function Summary({ formData, onPrev }: SummaryProps) {
  const [showRawData, setShowRawData] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)
      // Aquí puedes agregar la lógica para enviar a un servidor
      console.log('Formulario enviado:', formData)
      alert('¡Formulario enviado con éxito! Nos pondremos en contacto contigo pronto.')
    } catch (error) {
      console.error('Error al enviar:', error)
      alert('Error al enviar el formulario. Por favor, intenta de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatValue = (value: any) => {
    if (Array.isArray(value)) return value.join(', ')
    return value
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Resumen de la Solicitud</h2>
      <div className="space-y-4 mb-6 text-gray-600">
        <p><strong>Tipo de Servicio:</strong> {formData.serviceType}</p>
        <p><strong>Ubicación:</strong> {formData.address}, CP: {formData.postalCode}</p>
        <p><strong>Alcance del Proyecto:</strong> {formatValue(formData.projectTypes)}</p>
        <p><strong>Fecha de Inicio:</strong> {formData.startDate}</p>
        <p><strong>Horario Preferido:</strong> {formData.preferredTime}</p>
        <p><strong>Instalaciones Afectadas:</strong> {formData.installations}</p>
        <p><strong>Presupuesto Aproximado:</strong> {formData.budget}</p>
        <p><strong>Nivel de Soporte:</strong> {formData.supportLevel}</p>
        <p><strong>Nombre:</strong> {formData.name}</p>
        <p><strong>Organización:</strong> {formData.organization}</p>
        <p><strong>Correo Electrónico:</strong> {formData.email}</p>
        <p><strong>Teléfono:</strong> {formData.phone}</p>
      </div>

      <div className="space-y-4 mb-6">
        <Button 
          onClick={() => setShowRawData(!showRawData)}
          variant="outline"
          className="w-full"
        >
          {showRawData ? 'Ocultar Datos Crudos' : 'Ver Datos Crudos'}
        </Button>

        {showRawData && (
          <pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-60 text-sm">
            {JSON.stringify(formData, null, 2)}
          </pre>
        )}
      </div>

      <div className="flex justify-between">
        <Button 
          onClick={onPrev} 
          variant="outline"
        >
          Anterior
        </Button>
        <Button 
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="bg-[#FF7420] text-white hover:bg-[#FF7420]/90"
        >
          {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
        </Button>
      </div>
    </div>
  )
}

