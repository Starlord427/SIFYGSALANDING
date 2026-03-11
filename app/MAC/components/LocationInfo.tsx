import { useState } from 'react'
import { MapPin, Loader2 } from 'lucide-react'

interface LocationInfoProps {
  onNext: () => void
  onPrev: () => void
  updateFormData: (data: { address: string; postalCode: string; latitude: number | null; longitude: number | null }) => void
  initialData?: { address?: string; postalCode?: string; latitude?: number | null; longitude?: number | null }
}

export default function LocationInfo({ onNext, onPrev, updateFormData, initialData }: LocationInfoProps) {
  const [address,    setAddress]    = useState(initialData?.address    ?? '')
  const [postalCode, setPostalCode] = useState(initialData?.postalCode ?? '')
  const [latitude,   setLatitude]   = useState<number | null>(initialData?.latitude   ?? null)
  const [longitude,  setLongitude]  = useState<number | null>(initialData?.longitude  ?? null)
  const [geoLoading, setGeoLoading] = useState(false)
  const [geoError,   setGeoError]   = useState('')

  const getGeolocation = () => {
    if (!navigator.geolocation) { setGeoError('Tu navegador no soporta geolocalización.'); return }
    setGeoLoading(true)
    setGeoError('')
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude: lat, longitude: lng } = position.coords
        setLatitude(lat)
        setLongitude(lng)
        try {
          const res  = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)
          const data = await res.json()
          setAddress(data.display_name ?? `${lat.toFixed(5)}, ${lng.toFixed(5)}`)
          setPostalCode(data.address?.postcode ?? '')
        } catch {
          setAddress(`${lat.toFixed(6)}, ${lng.toFixed(6)}`)
        } finally {
          setGeoLoading(false)
        }
      },
      (err) => {
        setGeoLoading(false)
        setGeoError(err.code === err.PERMISSION_DENIED
          ? 'Permiso denegado. Habilita la ubicación en tu navegador.'
          : 'No se pudo obtener tu ubicación. Ingrésala manualmente.')
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
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 mb-2">
          <span className="w-4 h-px bg-[#FF7420]" />
          <span className="text-[#FF7420] text-[10px] font-bold uppercase tracking-[0.3em]">Paso 2</span>
        </div>
        <h2 className="text-xl font-black text-white">Ubicación</h2>
        <p className="text-gray-500 text-sm mt-1">¿Dónde se realizará el servicio?</p>
      </div>

      <div className="space-y-4 mb-8">
        <button
          type="button" onClick={getGeolocation} disabled={geoLoading}
          className="w-full inline-flex items-center justify-center gap-2 bg-[#FF7420] hover:bg-[#e5681c] disabled:opacity-60 text-white text-sm font-bold px-4 py-3 rounded-xl transition-colors"
        >
          {geoLoading
            ? <><Loader2 className="h-4 w-4 animate-spin" /> Obteniendo ubicación...</>
            : <><MapPin className="h-4 w-4" /> Usar mi ubicación actual</>}
        </button>

        {geoError && (
          <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2.5">{geoError}</p>
        )}
        {latitude && longitude && (
          <p className="text-green-400 text-xs bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-2.5 font-medium">
            ✓ Coordenadas capturadas: {latitude.toFixed(5)}, {longitude.toFixed(5)}
          </p>
        )}

        <div>
          <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Dirección</label>
          <input
            type="text" placeholder="Calle, número, colonia, ciudad" value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-white/10 hover:border-white/20 focus:border-[#FF7420]/50 text-white placeholder-gray-600 text-sm px-4 py-3 rounded-xl outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Código Postal</label>
          <input
            type="text" placeholder="Ej. 96700" value={postalCode} maxLength={5}
            onChange={(e) => setPostalCode(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-white/10 hover:border-white/20 focus:border-[#FF7420]/50 text-white placeholder-gray-600 text-sm px-4 py-3 rounded-xl outline-none transition-colors"
          />
        </div>
      </div>

      <div className="flex justify-between pt-4 border-t border-white/5">
        <button onClick={onPrev} className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Anterior
        </button>
        <button onClick={handleNext} disabled={!canContinue} className="inline-flex items-center gap-2 bg-[#FF7420] hover:bg-[#e5681c] disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-colors">
          Siguiente
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  )
}