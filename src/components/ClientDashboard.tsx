'use client'

import React, { useState, useEffect } from 'react'

interface Consultation {
  id:            string
  serviceType:   string
  location:      string
  postalCode:    string
  status:        string
  createdAt:     string
  startDate:     string | null
  projectTypes:  string[]
  installations: string | null
  budget:        string | null
  supportLevel:  string | null
  contactName:   string
  organization:  string | null
  email:         string
  phone:         string | null
  latitude:      number | null
  longitude:     number | null
  salesperson?: { fullName: string; email: string } | null
}

const statusConfig: Record<string, { label: string; classes: string }> = {
  PENDING:     { label: 'Pendiente',   classes: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' },
  IN_PROGRESS: { label: 'En progreso', classes: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  COMPLETED:   { label: 'Completado',  classes: 'bg-green-500/10 text-green-400 border-green-500/20' },
  CANCELLED:   { label: 'Cancelado',   classes: 'bg-red-500/10 text-red-400 border-red-500/20' },
}

const budgetLabel: Record<string, string> = {
  less100k:  'Menos de $100,000 MXN',
  '100k-1m': '$100,000 – $1,000,000 MXN',
  more1m:    'Más de $1,000,000 MXN',
  undefined: 'No definido',
}

const supportLabel: Record<string, string> = {
  remote: 'Soporte remoto',
  onsite: 'Visita técnica en sitio',
  both:   'Remoto y presencial',
}

function formatDate(d: string | null) {
  if (!d) return '—'
  const date = new Date(d)
  if (isNaN(date.getTime())) return '—'
  return date.toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' })
}

function StatusBadge({ status }: { status: string }) {
  const cfg = statusConfig[status] ?? { label: status, classes: 'bg-white/5 text-gray-400 border-white/10' }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${cfg.classes}`}>
      {cfg.label}
    </span>
  )
}

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-2 mb-5">
      <span className="w-4 h-px bg-[#FF7420]" />
      <span className="text-[#FF7420] text-[10px] font-bold uppercase tracking-[0.3em]">{text}</span>
    </div>
  )
}

function DetailRow({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null
  return (
    <div>
      <p className="text-gray-600 text-[10px] font-semibold uppercase tracking-wider mb-0.5">{label}</p>
      <p className="text-gray-300 text-xs">{value}</p>
    </div>
  )
}

function ConsultationCard({ consultation: c, muted = false }: { consultation: Consultation; muted?: boolean }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className={`rounded-2xl border overflow-hidden transition-all duration-200 ${
      muted ? 'bg-[#0f0f0f] border-white/5' : 'bg-[#1a1a1a] border-white/5 hover:border-white/10'
    }`}>
      {/* Fila principal — clickeable */}
      <div
        className="p-5 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between gap-3 mb-3">
          <p className={`font-bold text-sm leading-tight flex-1 ${muted ? 'text-gray-400' : 'text-white'}`}>
            {c.serviceType}
          </p>
          <div className="flex items-center gap-2 shrink-0">
            <StatusBadge status={c.status} />
            <svg
              className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <p className="text-gray-500 text-xs flex items-center gap-1.5 mb-1">
          <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="truncate">{c.location}</span>
        </p>
        <p className="text-gray-600 text-xs">{formatDate(c.createdAt)}</p>
      </div>

      {/* Detalle expandible */}
      {expanded && (
        <div className="border-t border-white/5 bg-[#0f0f0f] p-5 space-y-5">

          {/* Servicios */}
          {c.serviceType && (
            <div>
              <p className="text-gray-600 text-[10px] font-semibold uppercase tracking-wider mb-2">Servicios solicitados</p>
              <div className="flex flex-wrap gap-1.5">
                {c.serviceType.split(', ').map((s, i) => (
                  <span key={i} className="bg-[#FF7420]/10 border border-[#FF7420]/20 text-[#FF7420] text-[10px] font-semibold px-2.5 py-1 rounded-full">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Detalles del proyecto */}
          <div className="grid grid-cols-2 gap-3">
            <DetailRow label="Código postal"   value={c.postalCode} />
            <DetailRow label="Fecha de inicio" value={formatDate(c.startDate)} />
            <DetailRow label="Instalaciones"   value={c.installations} />
            <DetailRow label="Presupuesto"     value={c.budget ? (budgetLabel[c.budget] ?? c.budget) : null} />
            <DetailRow label="Soporte"         value={c.supportLevel ? (supportLabel[c.supportLevel] ?? c.supportLevel) : null} />
            {c.projectTypes?.length > 0 && (
              <div className="col-span-2">
                <p className="text-gray-600 text-[10px] font-semibold uppercase tracking-wider mb-0.5">Alcance</p>
                <p className="text-gray-300 text-xs">{c.projectTypes.join(', ')}</p>
              </div>
            )}
          </div>

          {/* Vendedor asignado */}
          {c.salesperson ? (
            <div className="pt-3 border-t border-white/5">
              <p className="text-gray-600 text-[10px] font-semibold uppercase tracking-wider mb-2">Vendedor asignado</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FF7420]/20 flex items-center justify-center text-[#FF7420] text-xs font-black">
                  {c.salesperson.fullName.charAt(0)}
                </div>
                <div>
                  <p className="text-white text-xs font-semibold">{c.salesperson.fullName}</p>
                  <p className="text-gray-500 text-[10px]">{c.salesperson.email}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="pt-3 border-t border-white/5">
              <p className="text-gray-600 text-[10px] font-semibold uppercase tracking-wider mb-1">Vendedor asignado</p>
              <p className="text-gray-600 text-xs italic">Pendiente de asignación</p>
            </div>
          )}

          {/* Link mapa si hay coords */}
          {c.latitude && c.longitude && (
            <a
              href={`https://www.google.com/maps?q=${c.latitude},${c.longitude}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#FF7420] hover:text-[#e5681c] text-xs font-semibold transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Ver ubicación en Google Maps
            </a>
          )}
        </div>
      )}
    </div>
  )
}

export default function ClientDashboard() {
  const [consultations, setConsultations] = useState<Consultation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/consultations')
      .then(r => r.json())
      .then(setConsultations)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const active   = consultations.filter(c => !['COMPLETED', 'CANCELLED'].includes(c.status))
  const historic = consultations.filter(c =>  ['COMPLETED', 'CANCELLED'].includes(c.status))

  if (loading) return (
    <div className="flex items-center justify-center py-24">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#FF7420]" />
    </div>
  )

  return (
    <div className="space-y-6">

      {/* Banner */}
      <div className="bg-[#FF7420] rounded-3xl p-8">
        <div className="inline-flex items-center gap-2 mb-2">
          <span className="w-4 h-px bg-white/60" />
          <span className="text-white/70 text-[10px] font-bold uppercase tracking-[0.3em]">Bienvenido</span>
        </div>
        <h2 className="text-white font-black text-xl">Tu Panel de Consultas</h2>
        <p className="text-white/80 text-sm mt-1">Gestiona y da seguimiento a tus solicitudes</p>
      </div>

      {/* Activas */}
      <div className="bg-[#141414] rounded-3xl border border-white/5 p-8">
        <SectionLabel text="Consultas activas" />
        {active.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-sm mb-5">No tienes consultas activas aún</p>
            <a
              href="/MAC"
              className="inline-flex items-center gap-2 bg-[#FF7420] hover:bg-[#e5681c] text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors"
            >
              Crear primera consulta
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            {active.map(c => <ConsultationCard key={c.id} consultation={c} />)}
          </div>
        )}
      </div>

      {/* Historial */}
      {historic.length > 0 && (
        <div className="bg-[#141414] rounded-3xl border border-white/5 p-8">
          <SectionLabel text="Historial" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            {historic.map(c => <ConsultationCard key={c.id} consultation={c} muted />)}
          </div>
        </div>
      )}

    </div>
  )
}