// app/MAC/components/LocationInfo.tsx
// Versión mejorada: guarda lat/lng por separado y desbloquea "Siguiente" al usar geolocalización

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input }  from '@/components/ui/input'
import { MapPin, Loader2 } from 'lucide-react'

interface LocationInfoProps {
  onNext: () => void
  onPrev: () => void
  updateFormData: (data: {
    address:    string
    postalCode: string
    latitude:   number | null
    longitude:  number | null
  }) => void
}

export default function LocationInfo({ onNext, onPrev, updateFormData }: LocationInfoProps) {
  const [address,    setAddress]    = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [latitude,   setLatitude]   = useState<number | null>(null)
  const [longitude,  setLongitude]  = useState<number | null>(null)
  const [geoLoading, setGeoLoading] = useState(false)
  const [geoError,   setGeoError]   = useState('')

  const getGeolocation = () => {
    if (!navigator.geolocation) {
      setGeoError('Tu navegador no soporta geolocalización.')
      return
    }

    setGeoLoading(true)
    setGeoError('')

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude: lat, longitude: lng } = position.coords
        setLatitude(lat)
        setLongitude(lng)

        // Geocodificación inversa con API gratuita de OpenStreetMap
        try {
          const res  = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
          )
          const data = await res.json()

          const readable = data.display_name ?? `${lat.toFixed(5)}, ${lng.toFixed(5)}`
          const cp       = data.address?.postcode ?? ''

          setAddress(readable)
          setPostalCode(cp)
        } catch {
          // Si falla la geocodificación, al menos muestra coordenadas
          setAddress(`${lat.toFixed(6)}, ${lng.toFixed(6)}`)
        } finally {
          setGeoLoading(false)
        }
      },
      (err) => {
        setGeoLoading(false)
        if (err.code === err.PERMISSION_DENIED) {
          setGeoError('Permiso denegado. Habilita la ubicación en tu navegador.')
        } else {
          setGeoError('No se pudo obtener tu ubicación. Ingrésala manualmente.')
        }
      }
    )
  }

  const handleNext = () => {
    updateFormData({ address, postalCode, latitude, longitude })
    onNext()
  }

  const canContinue = address.trim() !== '' && postalCode.trim() !== ''

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-1">Ubicación</h2>
      <p className="text-sm text-gray-500 mb-6">
        Ingresa la dirección del sitio donde se requiere el servicio.
      </p>

      <div className="space-y-4 mb-6">
        <Button
          type="button"
          onClick={getGeolocation}
          disabled={geoLoading}
          className="w-full bg-[#FF7420] text-white hover:bg-[#FF7420]/90 flex items-center gap-2"
        >
          {geoLoading
            ? <><Loader2 className="h-4 w-4 animate-spin" /> Obteniendo ubicación...</>
            : <><MapPin className="h-4 w-4" /> Usar mi ubicación actual</>
          }
        </Button>

        {geoError && (
          <p className="text-red-500 text-sm">{geoError}</p>
        )}

        {latitude && longitude && (
          <p className="text-xs text-green-600 font-medium">
            ✓ Coordenadas capturadas: {latitude.toFixed(5)}, {longitude.toFixed(5)}
          </p>
        )}

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Dirección</label>
          <Input
            type="text"
            placeholder="Calle, número, colonia, ciudad"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="text-black"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Código Postal</label>
          <Input
            type="text"
            placeholder="Ej. 96700"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            className="text-black"
            maxLength={5}
          />
        </div>
      </div>

      <div className="flex justify-between">
        <Button onClick={onPrev} className="bg-white text-black hover:bg-gray-200 border border-gray-300">
          Anterior
        </Button>
        <Button
          onClick={handleNext}
          disabled={!canContinue}
          className="bg-black text-white hover:bg-gray-800"
        >
          Siguiente
        </Button>
      </div>
    </div>
  )
}
