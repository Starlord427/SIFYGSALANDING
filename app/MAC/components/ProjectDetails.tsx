import { useState } from 'react';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const projectTypes = [
  { id: "instalacion", label: "Instalación de nuevos equipos o sistemas" },
  { id: "reparacion", label: "Reparación de equipos existentes" },
  { id: "actualizacion", label: "Actualización de sistemas" },
  { id: "mantenimiento", label: "Mantenimiento preventivo" },
  { id: "inspeccion", label: "Inspección y certificación" },
  { id: "asesoria", label: "Asesoría técnica" }
];

interface ProjectDetailsProps {
  onNext: () => void;
  onPrev: () => void;
  updateFormData: (data: {
    projectTypes: string[];
    startDate: string;
    preferredTime: string;
  }) => void;
}

export default function ProjectDetails({ onNext, onPrev, updateFormData }: ProjectDetailsProps) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [startDate, setStartDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");

  const toggleProjectType = (id: string) => {
    setSelectedTypes(prev => 
      prev.includes(id) 
        ? prev.filter(type => type !== id)
        : [...prev, id]
    );
  };

  const handleNext = () => {
    updateFormData({ projectTypes: selectedTypes, startDate, preferredTime });
    onNext();
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Detalles del Proyecto</h2>
      
      <div className="space-y-6 mb-8">
        <div>
          <p className="mb-4">Alcance del proyecto o servicio solicitado</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projectTypes.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => toggleProjectType(id)}
                className={`p-4 rounded-lg border text-left transition-colors ${
                  selectedTypes.includes(id)
                    ? 'bg-[#FF7420] text-white border-[#FF7420]'
                    : 'bg-white text-black hover:bg-gray-100 hover:border-[#FF7420] border-gray-300'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="startDate" className="block mb-2 text-sm font-medium text-gray-300">
            Fecha de inicio del servicio
          </label>
          <Input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="bg-white text-black"
          />
        </div>

        <div>
          <label htmlFor="preferredTime" className="block mb-2 text-sm font-medium text-gray-300">
            Horario preferido
          </label>
          <select
            id="preferredTime"
            value={preferredTime}
            onChange={(e) => setPreferredTime(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:border-[#FF7420] outline-none text-black bg-white"
          >
            <option value="">Seleccione horario preferido</option>
            <option value="morning">Mañana (8:00 a.m. - 12:00 p.m.)</option>
            <option value="afternoon">Tarde (12:00 p.m. - 6:00 p.m.)</option>
            <option value="allday">Todo el día</option>
          </select>
        </div>
      </div>

      <div className="flex justify-between">
        <Button 
          onClick={onPrev}
          className="bg-white text-black hover:bg-gray-200"
        >
          Anterior
        </Button>
        <Button 
          onClick={handleNext}
          disabled={selectedTypes.length === 0 || !startDate || !preferredTime}
          className="bg-black text-white hover:bg-gray-800"
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}

