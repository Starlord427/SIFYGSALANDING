import { useState, Dispatch, SetStateAction } from 'react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface AdditionalInfoProps {
  onNext: () => void;
  onPrev: () => void;
  updateFormData: Dispatch<SetStateAction<any>>;
}

export default function AdditionalInfo({ onNext, onPrev, updateFormData }: AdditionalInfoProps) {
  const [installations, setInstallations] = useState('')
  const [budget, setBudget] = useState('')
  const [supportLevel, setSupportLevel] = useState('')

  const handleNext = () => {
    updateFormData({ installations, budget, supportLevel })
    onNext()
  }

  return (
    <div className="py-4">
      <h2 className="text-2xl font-semibold mb-6">Información Adicional</h2>
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">
            ¿Cuántas instalaciones o áreas se verán afectadas o cubiertas por este servicio?
          </label>
          <Select value={installations} onValueChange={setInstallations}>
            <SelectTrigger className="bg-white text-black">
              <SelectValue placeholder="Seleccione el número de instalaciones" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 instalación</SelectItem>
              <SelectItem value="2-5">2-5 instalaciones</SelectItem>
              <SelectItem value="more">Más de 5 instalaciones</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">
            ¿Cuál es su presupuesto aproximado para este proyecto?
          </label>
          <Select value={budget} onValueChange={setBudget}>
            <SelectTrigger className="bg-white text-black">
              <SelectValue placeholder="Seleccione un rango de presupuesto" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="less100k">Menos de $100,000 MXN</SelectItem>
              <SelectItem value="100k-1m">Entre $100,000 y $1,000,000 MXN</SelectItem>
              <SelectItem value="more1m">Más de $1,000,000 MXN</SelectItem>
              <SelectItem value="undefined">No definido</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">
            ¿Qué nivel de soporte técnico espera?
          </label>
          <Select value={supportLevel} onValueChange={setSupportLevel}>
            <SelectTrigger className="bg-white text-black">
              <SelectValue placeholder="Seleccione el nivel de soporte" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="remote">Soporte remoto (asesoría en línea)</SelectItem>
              <SelectItem value="onsite">Visita técnica en sitio</SelectItem>
              <SelectItem value="both">Ambas opciones (remoto y presencial)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <Button 
          onClick={onPrev} 
          className="bg-gray-800 text-white hover:bg-gray-700"
        >
          Anterior
        </Button>
        <Button 
          onClick={handleNext} 
          disabled={!installations || !budget || !supportLevel}
          className="bg-[#FF7420] text-white hover:bg-[#FF7420]/90"
        >
          Siguiente
        </Button>
      </div>
    </div>
  )
}





