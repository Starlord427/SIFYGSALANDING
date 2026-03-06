// app/MAC/components/Summary.tsx

import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

interface SummaryProps {
  formData: any
  onPrev: () => void
  onSubmit: () => Promise<void>
  loading?: boolean
}

export default function Summary({ formData, onPrev, onSubmit, loading = false }: SummaryProps) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Resumen de la Solicitud</h2>
      <div className="space-y-3 mb-6 text-gray-600 text-sm">
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          <h3 className="font-semibold text-gray-700 text-base">Servicios</h3>
          <p><strong>Servicios/Productos:</strong> {formData.servicesAndProducts?.join(', ') ?? formData.serviceType}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          <h3 className="font-semibold text-gray-700 text-base">Ubicación</h3>
          <p><strong>Dirección:</strong> {formData.address}</p>
          <p><strong>CP:</strong> {formData.postalCode}</p>
          {formData.latitude && formData.longitude && (
            <p className="text-xs text-green-600">
              📍 Coordenadas: {Number(formData.latitude).toFixed(5)}, {Number(formData.longitude).toFixed(5)}
            </p>
          )}
        </div>
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          <h3 className="font-semibold text-gray-700 text-base">Proyecto</h3>
          <p><strong>Alcance:</strong> {formData.projectTypes?.join(', ')}</p>
          <p><strong>Fecha de Inicio:</strong> {formData.startDate}</p>
          <p><strong>Instalaciones:</strong> {formData.installations}</p>
          <p><strong>Presupuesto:</strong> {formData.budget}</p>
          <p><strong>Nivel de Soporte:</strong> {formData.supportLevel}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          <h3 className="font-semibold text-gray-700 text-base">Contacto</h3>
          <p><strong>Nombre:</strong> {formData.name}</p>
          <p><strong>Organización:</strong> {formData.organization}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Teléfono:</strong> {formData.phone}</p>
        </div>
      </div>

      <div className="flex justify-between">
        <Button onClick={onPrev} variant="outline" disabled={loading}>
          Anterior
        </Button>
        <Button
          onClick={onSubmit}
          disabled={loading}
          className="bg-[#FF7420] hover:bg-[#FF7420]/90 text-white min-w-[160px]"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Enviando...
            </span>
          ) : (
            'Enviar Solicitud'
          )}
        </Button>
      </div>
    </div>
  )
}
