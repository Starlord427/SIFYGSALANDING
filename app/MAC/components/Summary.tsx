'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, CheckCircle2 } from 'lucide-react'

interface SummaryProps {
  formData: any
  onPrev: () => void
  onSubmit: () => Promise<void>
}

function SummaryRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 py-3 border-b border-white/5 last:border-0">
      <span className="text-gray-600 text-xs font-semibold uppercase tracking-wider sm:w-44 shrink-0">{label}</span>
      <span className="text-gray-300 text-sm">{value}</span>
    </div>
  )
}

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-2 mb-4">
      <span className="w-4 h-px bg-[#FF7420]" />
      <span className="text-[#FF7420] text-[10px] font-bold uppercase tracking-[0.3em]">{text}</span>
    </div>
  )
}

export default function Summary({ formData, onPrev, onSubmit }: SummaryProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error,   setError]   = useState('')

  const handleSubmit = async () => {
    if (loading || success) return
    setLoading(true)
    setError('')
    try {
      await onSubmit()
      setSuccess(true)
      // Redirige al dashboard después de 2 segundos para que el usuario vea la confirmación
      setTimeout(() => router.push('/dashboard/client'), 2000)
    } catch {
      setError('Hubo un error al enviar la solicitud. Intenta de nuevo.')
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 mb-2">
          <span className="w-4 h-px bg-[#FF7420]" />
          <span className="text-[#FF7420] text-[10px] font-bold uppercase tracking-[0.3em]">Paso 6</span>
        </div>
        <h2 className="text-xl font-black text-white">Resumen de la Solicitud</h2>
        <p className="text-gray-500 text-sm mt-1">Revisa que toda la información sea correcta antes de enviar.</p>
      </div>

      {/* Éxito */}
      {success && (
        <div className="mb-6 flex items-center gap-3 bg-green-500/10 border border-green-500/20 rounded-2xl px-5 py-4">
          <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
          <div>
            <p className="text-green-400 text-sm font-bold">¡Solicitud enviada correctamente!</p>
            <p className="text-green-500/70 text-xs mt-0.5">Redirigiendo a tu dashboard...</p>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mb-6 bg-red-500/10 border border-red-500/20 rounded-2xl px-5 py-3">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <div className="space-y-4 mb-8">

        {formData.servicesAndProducts?.length > 0 && (
          <div className="bg-[#1a1a1a] rounded-2xl border border-white/5 p-5">
            <SectionLabel text="Servicios seleccionados" />
            <div className="flex flex-wrap gap-2">
              {formData.servicesAndProducts.map((s: string) => (
                <span key={s} className="bg-[#FF7420]/10 border border-[#FF7420]/20 text-[#FF7420] text-xs font-semibold px-3 py-1 rounded-full">
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="bg-[#1a1a1a] rounded-2xl border border-white/5 p-5">
          <SectionLabel text="Ubicación" />
          <SummaryRow label="Dirección"     value={formData.address} />
          <SummaryRow label="Código Postal" value={formData.postalCode} />
        </div>

        <div className="bg-[#1a1a1a] rounded-2xl border border-white/5 p-5">
          <SectionLabel text="Detalles del proyecto" />
          <SummaryRow label="Alcance"           value={formData.projectTypes?.join(', ')} />
          <SummaryRow label="Fecha de inicio"   value={formData.startDate} />
          <SummaryRow label="Horario preferido" value={
            formData.preferredTime === 'morning'   ? 'Mañana (8:00 a.m. - 12:00 p.m.)' :
            formData.preferredTime === 'afternoon' ? 'Tarde (12:00 p.m. - 6:00 p.m.)' :
            formData.preferredTime === 'allday'    ? 'Todo el día' : formData.preferredTime
          } />
        </div>

        <div className="bg-[#1a1a1a] rounded-2xl border border-white/5 p-5">
          <SectionLabel text="Información adicional" />
          <SummaryRow label="Instalaciones" value={formData.installations} />
          <SummaryRow label="Presupuesto"   value={
            formData.budget === 'less100k'  ? 'Menos de $100,000 MXN' :
            formData.budget === '100k-1m'   ? '$100,000 – $1,000,000 MXN' :
            formData.budget === 'more1m'    ? 'Más de $1,000,000 MXN' :
            formData.budget === 'undefined' ? 'No definido' : formData.budget
          } />
          <SummaryRow label="Soporte" value={
            formData.supportLevel === 'remote' ? 'Soporte remoto' :
            formData.supportLevel === 'onsite' ? 'Visita técnica en sitio' :
            formData.supportLevel === 'both'   ? 'Remoto y presencial' : formData.supportLevel
          } />
        </div>

        <div className="bg-[#1a1a1a] rounded-2xl border border-white/5 p-5">
          <SectionLabel text="Contacto" />
          <SummaryRow label="Nombre"       value={formData.name} />
          <SummaryRow label="Puesto"       value={formData.position} />
          <SummaryRow label="Organización" value={formData.organization} />
          <SummaryRow label="Correo"       value={formData.email} />
          <SummaryRow label="Teléfono"     value={formData.phone} />
        </div>

      </div>

      <div className="flex justify-between pt-4 border-t border-white/5">
        <button
          onClick={onPrev}
          disabled={loading || success}
          className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Anterior
        </button>

        <button
          onClick={handleSubmit}
          disabled={loading || success}
          className="inline-flex items-center gap-2 text-white text-sm font-bold px-8 py-2.5 rounded-xl transition-all disabled:cursor-not-allowed"
          style={{
            background: success ? '#22c55e' : loading ? '#cc5e18' : '#FF7420',
          }}
        >
          {loading ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Enviando...</>
          ) : success ? (
            <><CheckCircle2 className="w-4 h-4" /> ¡Enviado!</>
          ) : (
            <>
              Enviar Solicitud
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  )
}