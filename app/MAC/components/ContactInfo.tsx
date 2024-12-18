import { useState, Dispatch, SetStateAction } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface ContactInfoProps {
  onNext: () => void;
  onPrev: () => void;
  updateFormData: Dispatch<SetStateAction<any>>;
}

export default function ContactInfo({ onNext, onPrev, updateFormData }: ContactInfoProps) {
  const [name, setName] = useState('')
  const [position, setPosition] = useState('')
  const [organization, setOrganization] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const handleNext = () => {
    updateFormData({ name, position, organization, email, phone })
    onNext()
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Información de Contacto</h2>
      <div className="space-y-4 mb-6">
        <Input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="text-black"
        />
        <Input
          type="text"
          placeholder="Puesto (Opcional)"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          className="text-black"
        />
        <Input
          type="text"
          placeholder="Nombre de la Organización"
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
          required
          className="text-black"
        />
        <Input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="text-black"
        />
        <Input
          type="tel"
          placeholder="Teléfono"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="text-black"
        />
      </div>
      <div className="flex justify-between">
        <Button onClick={onPrev} className="bg-white text-black hover:bg-gray-200">
          Anterior
        </Button>
        <Button onClick={handleNext} disabled={!name || !organization || !email || !phone} className="bg-black text-white hover:bg-gray-800">
          Siguiente
        </Button>
      </div>
    </div>
  )
}

