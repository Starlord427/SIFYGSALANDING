'use client'

import React, { useState, useEffect } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'react-hot-toast'

interface Consultation {
  id:            number
  serviceType:   string
  location:      string
  status:        string
  createdAt:     string
  salespersonId: string | null
  latitude:      number | null
  longitude:     number | null
  contactName:   string
  organization:  string
  email:         string
  phone:         string
  budget:        string
  supportLevel:  string
  installations: string
  startDate:     string | null
  client?:       { fullName: string; email: string } | null
}

const statusConfig: Record<string, { label: string; classes: string }> = {
  PENDING:     { label: 'Pendiente',   classes: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' },
  IN_PROGRESS: { label: 'En progreso', classes: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  COMPLETED:   { label: 'Completado',  classes: 'bg-green-500/10 text-green-400 border-green-500/20' },
  CANCELLED:   { label: 'Cancelado',   classes: 'bg-red-500/10 text-red-400 border-red-500/20' },
}

function StatusBadge({ status }: { status: string }) {
  const cfg = statusConfig[status] ?? { label: status, classes: 'bg-white/5 text-gray-400 border-white/10' }
  return (
    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${cfg.classes}`}>
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

function formatDate(dateStr: string | null) {
  if (!dateStr) return '—'
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return '—'
  return d.toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' })
}

const calcDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R    = 6371
  const dLat = (lat2 - lat1) * (Math.PI / 180)
  const dLon = (lon2 - lon1) * (Math.PI / 180)
  const a    = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export default function SalespersonDashboard({ userId }: { userId: string }) {
  const [consultations, setConsultations] = useState<Consultation[]>([])
  const [userLocation,  setUserLocation]  = useState<{ latitude: number; longitude: number } | null>(null)
  const [filter,        setFilter]        = useState({ status: '' })
  const [loading,       setLoading]       = useState(true)
  const [expanded,      setExpanded]      = useState<number | null>(null)

  useEffect(() => {
    fetchConsultations()
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => setUserLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
        () => {}
      )
    }
  }, [])

  const fetchConsultations = async () => {
    try {
      const res = await fetch('/api/consultations')
      if (!res.ok) throw new Error()
      setConsultations(await res.json())
    } catch {
      toast.error('No se pudieron cargar las consultas.')
    } finally {
      setLoading(false)
    }
  }

  const handleAssign = async (consultationId: number) => {
    try {
      const res = await fetch(`/api/consultations/${consultationId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ salespersonId: userId, status: 'IN_PROGRESS' }),
      })
      if (!res.ok) throw new Error()
      fetchConsultations()
      toast.success('Consulta asignada')
    } catch {
      toast.error('No se pudo asignar la consulta.')
    }
  }

  const handleComplete = async (consultationId: number) => {
    try {
      const res = await fetch(`/api/consultations/${consultationId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'COMPLETED' }),
      })
      if (!res.ok) throw new Error()
      fetchConsultations()
      toast.success('Consulta completada')
    } catch {
      toast.error('No se pudo completar la consulta.')
    }
  }

  // Ordenar por proximidad si hay ubicación
  const sorted = userLocation
    ? [...consultations].sort((a, b) => {
        if (!a.latitude || !a.longitude) return 1
        if (!b.latitude || !b.longitude) return -1
        return calcDistance(userLocation.latitude, userLocation.longitude, a.latitude, a.longitude) -
               calcDistance(userLocation.latitude, userLocation.longitude, b.latitude, b.longitude)
      })
    : consultations

  const filtered  = sorted.filter(c => filter.status === '' || c.status === filter.status)
  const available = filtered.filter(c => c.status === 'PENDING')
  const assigned  = filtered.filter(c => c.status === 'IN_PROGRESS' && String(c.salespersonId) === String(userId))

  if (loading) return (
    <div className="flex items-center justify-center py-24">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#FF7420]" />
    </div>
  )

  const ConsultationCard = ({ c, showAssign = false, showComplete = false }: { c: Consultation; showAssign?: boolean; showComplete?: boolean }) => (
    <div className="bg-[#1a1a1a] rounded-2xl border border-white/5 overflow-hidden">
      <div
        className="p-5 cursor-pointer hover:bg-white/[0.02] transition-colors"
        onClick={() => setExpanded(expanded === c.id ? null : c.id)}
      >
        <div className="flex items-start justify-between gap-2 mb-2">
          <p className="text-white font-bold text-sm leading-tight flex-1 truncate">{c.serviceType}</p>
          <div className="flex items-center gap-2 shrink-0">
            <StatusBadge status={c.status} />
            <svg className={`w-4 h-4 text-gray-600 transition-transform ${expanded === c.id ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        <p className="text-gray-500 text-xs truncate">{c.location}</p>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
          <p className="text-gray-600 text-xs">{formatDate(c.createdAt)}</p>
          {showAssign && (
            <button
              onClick={e => { e.stopPropagation(); handleAssign(c.id) }}
              className="inline-flex items-center gap-1.5 bg-[#FF7420] hover:bg-[#e5681c] text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors"
            >
              Asignarme
            </button>
          )}
          {showComplete && (
            <button
              onClick={e => { e.stopPropagation(); handleComplete(c.id) }}
              className="inline-flex items-center gap-1.5 bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 text-green-400 text-xs font-bold px-4 py-2 rounded-xl transition-colors"
            >
              Marcar completada
            </button>
          )}
        </div>
      </div>

      {/* Detalle */}
      {expanded === c.id && (
        <div className="border-t border-white/5 p-5 bg-[#0f0f0f] space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {c.contactName   && <div><span className="text-gray-600 uppercase tracking-wider">Contacto</span><p className="text-gray-300 mt-0.5">{c.contactName}</p></div>}
            {c.organization  && <div><span className="text-gray-600 uppercase tracking-wider">Organización</span><p className="text-gray-300 mt-0.5">{c.organization}</p></div>}
            {c.email         && <div><span className="text-gray-600 uppercase tracking-wider">Correo</span><p className="text-gray-300 mt-0.5">{c.email}</p></div>}
            {c.phone         && <div><span className="text-gray-600 uppercase tracking-wider">Teléfono</span><p className="text-gray-300 mt-0.5">{c.phone}</p></div>}
            {c.budget        && <div><span className="text-gray-600 uppercase tracking-wider">Presupuesto</span><p className="text-gray-300 mt-0.5">{c.budget}</p></div>}
            {c.installations && <div><span className="text-gray-600 uppercase tracking-wider">Instalaciones</span><p className="text-gray-300 mt-0.5">{c.installations}</p></div>}
            {c.startDate     && <div><span className="text-gray-600 uppercase tracking-wider">Fecha inicio</span><p className="text-gray-300 mt-0.5">{formatDate(c.startDate)}</p></div>}
            {c.client        && <div><span className="text-gray-600 uppercase tracking-wider">Cliente</span><p className="text-gray-300 mt-0.5">{c.client.fullName}</p></div>}
          </div>
          {c.latitude && c.longitude && (
            <a
              href={`https://www.google.com/maps?q=${c.latitude},${c.longitude}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#FF7420] hover:text-[#e5681c] text-xs font-semibold transition-colors"
              onClick={e => e.stopPropagation()}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              Ver en Google Maps
            </a>
          )}
        </div>
      )}
    </div>
  )

  return (
    <div className="space-y-6">

      {/* Banner */}
      <div className="bg-[#FF7420] rounded-3xl p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-4 h-px bg-white/60" />
            <span className="text-white/70 text-[10px] font-bold uppercase tracking-[0.3em]">Panel</span>
          </div>
          <h2 className="text-white font-black text-xl">Panel de Vendedor</h2>
          <p className="text-white/80 text-sm mt-1">
            {userLocation ? 'Ordenadas por proximidad a tu ubicación' : 'Activa tu ubicación para ordenar por distancia'}
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <div className="bg-black/30 rounded-2xl px-4 py-3 text-center">
            <p className="text-white font-black text-xl">{available.length}</p>
            <p className="text-white/70 text-[10px] uppercase tracking-wider">Disponibles</p>
          </div>
          <div className="bg-black/30 rounded-2xl px-4 py-3 text-center">
            <p className="text-white font-black text-xl">{assigned.length}</p>
            <p className="text-white/70 text-[10px] uppercase tracking-wider">Asignadas</p>
          </div>
        </div>
      </div>

      {/* Filtro */}
      <div className="bg-[#141414] rounded-3xl border border-white/5 p-6">
        <SectionLabel text="Filtros" />
        <Select onValueChange={v => setFilter({ status: v === 'all' ? '' : v })}>
          <SelectTrigger className="bg-[#1a1a1a] border-white/10 text-gray-300 rounded-xl w-48">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1a1a] border-white/10 text-white">
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="PENDING">Pendiente</SelectItem>
            <SelectItem value="IN_PROGRESS">En Progreso</SelectItem>
            <SelectItem value="COMPLETED">Completado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Dos columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#141414] rounded-3xl border border-white/5 p-8">
          <SectionLabel text={`Disponibles (${available.length})`} />
          {available.length === 0
            ? <p className="text-gray-500 text-sm text-center py-10">No hay consultas disponibles</p>
            : <div className="space-y-3">{available.map(c => <ConsultationCard key={c.id} c={c} showAssign />)}</div>
          }
        </div>

        <div className="bg-[#141414] rounded-3xl border border-white/5 p-8">
          <SectionLabel text={`Mis asignadas (${assigned.length})`} />
          {assigned.length === 0
            ? <p className="text-gray-500 text-sm text-center py-10">No tienes consultas asignadas</p>
            : <div className="space-y-3">{assigned.map(c => <ConsultationCard key={c.id} c={c} showComplete />)}</div>
          }
        </div>
      </div>
    </div>
  )
}