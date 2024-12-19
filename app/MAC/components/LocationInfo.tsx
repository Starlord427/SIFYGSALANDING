import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface LocationInfoProps {
  onNext: () => void;
  onPrev: () => void;
  updateFormData: (data: { address: string; postalCode: string; useGeolocation: boolean }) => void;
}

export default function LocationInfo({ onNext, onPrev, updateFormData }: LocationInfoProps) {
  const [address, setAddress] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [useGeolocation, setUseGeolocation] = useState(false)

  const getGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setAddress(`Lat: ${latitude}, Long: ${longitude}`);
        setUseGeolocation(true);
      }, (error) => {
        console.error("Error getting geolocation:", error);
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleNext = () => {
    updateFormData({ address, postalCode, useGeolocation })
    onNext()
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Ubicación</h2>
      <div className="space-y-4 mb-6">
        <Input
          type="text"
          placeholder="Dirección"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="text-black"
        />
        <Input
          type="text"
          placeholder="Código postal"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          className="text-black"
        />
        <label className="flex items-center space-x-2 text-black">
          <input
            type="checkbox"
            checked={useGeolocation}
            onChange={() => setUseGeolocation(!useGeolocation)}
            className="text-[#FF7420] border-gray-300 rounded"
          />
          <span>Permitir acceso a la ubicación</span>
        </label>
        <Button
          type="button"
          onClick={getGeolocation}
          className="bg-[#FF7420] text-white hover:bg-[#FF7420]/90"
        >
          Usar mi ubicación actual
        </Button>
      </div>
      <div className="flex justify-between">
        <Button onClick={onPrev} className="bg-white text-black hover:bg-gray-200">
          Anterior
        </Button>
        <Button onClick={handleNext} disabled={!address || !postalCode} className="bg-black text-white hover:bg-gray-800">
          Siguiente
        </Button>
      </div>
    </div>
  )
}

