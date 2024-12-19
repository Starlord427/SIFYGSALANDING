import { Button } from '@/components/ui/button'

interface SummaryProps {
  formData: any; // Puedes definir una interfaz más específica para formData si lo deseas
  onPrev: () => void;
  onSubmit: () => Promise<void>;
}

export default function Summary({ formData, onPrev, onSubmit }: SummaryProps) {
  const handleSubmit = () => {
    onSubmit();
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Resumen de la Solicitud</h2>
      <div className="space-y-4 mb-6 text-gray-600">
        <p><strong>Tipo de Servicio:</strong> {formData.serviceType}</p>
        <p><strong>Ubicación:</strong> {formData.address}, CP: {formData.postalCode}</p>
        <p><strong>Alcance del Proyecto:</strong> {formData.projectTypes?.join(', ')}</p>
        <p><strong>Fecha de Inicio:</strong> {formData.startDate}</p>
        <p><strong>Instalaciones Afectadas:</strong> {formData.installations}</p>
        <p><strong>Presupuesto Aproximado:</strong> {formData.budget}</p>
        <p><strong>Nivel de Soporte:</strong> {formData.supportLevel}</p>
        <p><strong>Nombre:</strong> {formData.name}</p>
        <p><strong>Organización:</strong> {formData.organization}</p>
        <p><strong>Correo Electrónico:</strong> {formData.email}</p>
        <p><strong>Teléfono:</strong> {formData.phone}</p>
      </div>
      <div className="flex justify-between">
        <Button onClick={onPrev} variant="outline">
          Anterior
        </Button>
        <Button onClick={handleSubmit}>
          Enviar Solicitud
        </Button>
      </div>
    </div>
  )
}

