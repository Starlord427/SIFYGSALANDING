import { useState } from 'react'
import { MapPin, Loader2 } from 'lucide-react'

const projectTypes = [
  { id: 'instalacion',   label: 'Instalación de nuevos equipos' },
  { id: 'reparacion',    label: 'Reparación de equipos existentes' },
  { id: 'actualizacion', label: 'Actualización de sistemas' },
  { id: 'mantenimiento', label: 'Mantenimiento preventivo' },
  { id: 'inspeccion',    label: 'Inspección y certificación' },
  { id: 'asesoria',      label: 'Asesoría técnica' },
]

interface LocationAndDetailsProps {
  onNext: () => void
  onPrev: () => void
  updateFormData: (data: {
    address: string
    postalCode: string
    latitude: number | null
    longitude: number | null
    projectTypes: string[]
    startDate: string
    preferredTime: string
  }) => void
  initialData?: {
    address?: string
    postalCode?: string
    latitude?: number | null
    longitude?: number | null
    projectTypes?: string[]
    startDate?: string
    preferredTime?: string
  }
}

export default function LocationAndDetails({ onNext, onPrev, updateFormData, initialData }: LocationAndDetailsProps) {
  // Ubicación
  const [address,    setAddress]    = useState(initialData?.address    ?? '')
  const [postalCode, setPostalCode] = useState(initialData?.postalCode ?? '')
  const [latitude,   setLatitude]   = useState<number | null>(initialData?.latitude  ?? null)
  const [longitude,  setLongitude]  = useState<number | null>(initialData?.longitude ?? null)
  const [geoLoading, setGeoLoading] = useState(false)
  const [geoError,   setGeoError]   = useState('')

  // Proyecto
  const [selectedTypes,  setSelectedTypes]  = useState<string[]>(initialData?.projectTypes  ?? [])
  const [startDate,      setStartDate]      = useState(initialData?.startDate     ?? '')
  const [preferredTime,  setPreferredTime]  = useState(initialData?.preferredTime ?? '')

  const getGeolocation = () => {
    if (!navigator.geolocation) { setGeoError('Tu navegador no soporta geolocalización.'); return }
    setGeoLoading(true); setGeoError('')
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude: lat, longitude: lng } }) => {
        setLatitude(lat); setLongitude(lng)
        try {
          const res  = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)
          const data = await res.json()
          setAddress(data.display_name ?? `${lat.toFixed(5)}, ${lng.toFixed(5)}`)
          setPostalCode(data.address?.postcode ?? '')
        } catch {
          setAddress(`${lat.toFixed(6)}, ${lng.toFixed(6)}`)
        } finally { setGeoLoading(false) }
      },
      (err) => {
        setGeoLoading(false)
        setGeoError(err.code === err.PERMISSION_DENIED
          ? 'Permiso denegado. Habilita la ubicación en tu navegador.'
          : 'No se pudo obtener tu ubicación. Ingrésala manualmente.')
      }
    )
  }

  const toggleType = (id: string) =>
    setSelectedTypes(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id])

  const handleNext = () => {
    updateFormData({ address, postalCode, latitude, longitude, projectTypes: selectedTypes, startDate, preferredTime })
    onNext()
  }

  const canContinue = address.trim() !== '' && postalCode.trim() !== '' && selectedTypes.length > 0

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 mb-2">
          <span className="w-4 h-px bg-[#FF7420]" />
          <span className="text-[#FF7420] text-[10px] font-bold uppercase tracking-[0.3em]">Paso 2 de 3</span>
        </div>
        <h2 className="text-xl font-black text-white">Ubicación y detalles</h2>
        <p className="text-gray-500 text-sm mt-1">¿Dónde y qué tipo de servicio necesitas?</p>
      </div>

      {/* ── Sección: Ubicación ── */}
      <div className="mb-7">
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="w-3 h-px bg-[#FF7420]" />
          <span className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]">Ubicación del servicio</span>
        </div>

        <div className="space-y-3">
          <button
            type="button" onClick={getGeolocation} disabled={geoLoading}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#FF7420] hover:bg-[#e5681c] disabled:opacity-60 text-white text-sm font-bold px-4 py-3 rounded-xl transition-colors"
          >
            {geoLoading
              ? <><Loader2 className="h-4 w-4 animate-spin" />Obteniendo ubicación...</>
              : <><MapPin className="h-4 w-4" />Usar mi ubicación actual</>}
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
            <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">
              Dirección <span className="text-[#FF7420]">*</span>
            </label>
            <input
              type="text" value={address} placeholder="Calle, número, colonia, ciudad"
              onChange={e => setAddress(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-white/10 hover:border-white/20 focus:border-[#FF7420]/50 text-white placeholder-gray-600 text-sm px-4 py-3 rounded-xl outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">
              Código Postal <span className="text-[#FF7420]">*</span>
            </label>
            <input
              type="text" value={postalCode} placeholder="Ej. 96700" maxLength={5}
              onChange={e => setPostalCode(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-white/10 hover:border-white/20 focus:border-[#FF7420]/50 text-white placeholder-gray-600 text-sm px-4 py-3 rounded-xl outline-none transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Separador visual */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-px bg-white/5" />
        <span className="text-gray-600 text-[10px] font-bold uppercase tracking-[0.2em]">Detalles del proyecto</span>
        <div className="flex-1 h-px bg-white/5" />
      </div>

      {/* ── Sección: Proyecto ── */}
      <div className="space-y-5 mb-8">
        <div>
          <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">
            Alcance del servicio <span className="text-[#FF7420]">*</span>
            <span className="text-gray-600 font-normal normal-case ml-1">(puedes elegir varios)</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {projectTypes.map(({ id, label }) => {
              const on = selectedTypes.includes(id)
              return (
                <button
                  key={id} onClick={() => toggleType(id)}
                  className={`p-4 rounded-xl border text-left text-sm font-medium transition-all ${
                    on ? 'bg-[#FF7420] border-[#FF7420] text-white' : 'bg-[#1a1a1a] border-white/5 hover:border-white/20 text-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center ${on ? 'border-white bg-white' : 'border-gray-600'}`}>
                      {on && <div className="w-2 h-2 rounded-full bg-[#FF7420]" />}
                    </div>
                    {label}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">
              Fecha estimada de inicio
              <span className="text-gray-600 font-normal normal-case ml-1">(opcional)</span>
            </label>
            <input
              type="date" value={startDate} onChange={e => setStartDate(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-white/10 hover:border-white/20 focus:border-[#FF7420]/50 text-white text-sm px-4 py-3 rounded-xl outline-none transition-colors [color-scheme:dark]"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">
              Horario preferido
              <span className="text-gray-600 font-normal normal-case ml-1">(opcional)</span>
            </label>
            <select
              value={preferredTime} onChange={e => setPreferredTime(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-white/10 hover:border-white/20 focus:border-[#FF7420]/50 text-gray-300 text-sm px-4 py-3 rounded-xl outline-none transition-colors"
            >
              <option value="" className="bg-[#1a1a1a]">Selecciona horario</option>
              <option value="morning"   className="bg-[#1a1a1a]">Mañana (8:00 - 12:00)</option>
              <option value="afternoon" className="bg-[#1a1a1a]">Tarde (12:00 - 18:00)</option>
              <option value="allday"    className="bg-[#1a1a1a]">Todo el día</option>
            </select>
          </div>
        </div>
      </div>

      {/* Nav */}
      <div className="flex justify-between pt-4 border-t border-white/5">
        <button onClick={onPrev} className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Anterior
        </button>
        <button onClick={handleNext} disabled={!canContinue} className="inline-flex items-center gap-2 bg-[#FF7420] hover:bg-[#e5681c] disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-colors">
          Continuar
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  )
}