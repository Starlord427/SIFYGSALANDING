'use client'

import React, { useState, useEffect } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'react-hot-toast'

interface Consultation {
  id: number
  service_type: string
  location: string
  priority: string
  status: string
  created_at: string
  latitude: number
  longitude: number
  description: string
  salesperson_id: number
}

const statusConfig: Record<string, { label: string; classes: string }> = {
  pending:     { label: 'Pendiente',   classes: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' },
  in_progress: { label: 'En progreso', classes: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  completed:   { label: 'Completado',  classes: 'bg-green-500/10 text-green-400 border-green-500/20' },
  cancelled:   { label: 'Cancelado',   classes: 'bg-red-500/10 text-red-400 border-red-500/20' },
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

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371
  const dLat = (lat2 - lat1) * (Math.PI / 180)
  const dLon = (lon2 - lon1) * (Math.PI / 180)
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export default function SalespersonDashboard({ userId }: { userId: number }) {
  const [consultations, setConsultations]   = useState<Consultation[]>([])
  const [userLocation, setUserLocation]     = useState<{ latitude: number; longitude: number } | null>(null)
  const [filter, setFilter]                 = useState({ priority: '', status: '' })
  const [loading, setLoading]               = useState(true)

  useEffect(() => {
    fetchConsultations()
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => setUserLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
        () => toast.error('No se pudo obtener tu ubicación.')
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
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ salesperson_id: userId, status: 'in_progress' }),
      })
      if (!res.ok) throw new Error()
      fetchConsultations()
      toast.success('Consulta asignada exitosamente')
    } catch {
      toast.error('No se pudo asignar la consulta.')
    }
  }

  const handleComplete = async (consultationId: number) => {
    try {
      const res = await fetch(`/api/consultations/${consultationId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'completed' }),
      })
      if (!res.ok) throw new Error()
      fetchConsultations()
      toast.success('Consulta marcada como completada')
    } catch {
      toast.error('No se pudo completar la consulta.')
    }
  }

  const sorted = userLocation
    ? [...consultations].sort((a, b) =>
        calculateDistance(userLocation.latitude, userLocation.longitude, a.latitude, a.longitude) -
        calculateDistance(userLocation.latitude, userLocation.longitude, b.latitude, b.longitude)
      )
    : consultations

  const filtered = sorted.filter(c =>
    (filter.priority === '' || c.priority === filter.priority) &&
    (filter.status   === '' || c.status   === filter.status)
  )

  const available = filtered.filter(c => c.status === 'pending')
  const assigned  = filtered.filter(c => c.status === 'in_progress' && c.salesperson_id === userId)

  if (loading) return (
    <div className="flex items-center justify-center py-24">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#FF7420]" />
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
            {userLocation ? 'Consultas ordenadas por proximidad a tu ubicación' : 'Activa tu ubicación para ordenar por proximidad'}
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

      {/* Filtros */}
      <div className="bg-[#141414] rounded-3xl border border-white/5 p-6">
        <SectionLabel text="Filtros" />
        <div className="flex flex-col sm:flex-row gap-3">
          <Select onValueChange={v => setFilter({ ...filter, priority: v === 'all' ? '' : v })}>
            <SelectTrigger className="bg-[#1a1a1a] border-white/10 text-gray-300 rounded-xl">
              <SelectValue placeholder="Prioridad" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a1a] border-white/10 text-white">
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="high">Alta</SelectItem>
              <SelectItem value="medium">Media</SelectItem>
              <SelectItem value="low">Baja</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={v => setFilter({ ...filter, status: v === 'all' ? '' : v })}>
            <SelectTrigger className="bg-[#1a1a1a] border-white/10 text-gray-300 rounded-xl">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a1a] border-white/10 text-white">
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="pending">Pendiente</SelectItem>
              <SelectItem value="in_progress">En Progreso</SelectItem>
              <SelectItem value="completed">Completado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Dos columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Consultas disponibles */}
        <div className="bg-[#141414] rounded-3xl border border-white/5 p-8">
          <SectionLabel text={`Disponibles (${available.length})`} />
          {available.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-10">No hay consultas disponibles</p>
          ) : (
            <div className="space-y-3">
              {available.map(c => (
                <div key={c.id} className="bg-[#1a1a1a] rounded-2xl border border-white/5 p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <p className="text-white font-bold text-sm leading-tight">{c.service_type}</p>
                    <StatusBadge status={c.status} />
                  </div>
                  <p className="text-gray-500 text-xs mb-1">{c.location}</p>
                  {c.description && (
                    <p className="text-gray-600 text-xs leading-relaxed mb-3 line-clamp-2">{c.description}</p>
                  )}
                  <div className="flex items-center justify-between pt-3 border-t border-white/5">
                    <p className="text-gray-600 text-xs">
                      {new Date(c.created_at).toLocaleDateString('es-MX', { day: 'numeric', month: 'short' })}
                    </p>
                    <button
                      onClick={() => handleAssign(c.id)}
                      className="inline-flex items-center gap-1.5 bg-[#FF7420] hover:bg-[#e5681c] text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors"
                    >
                      Asignarme
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Mis consultas asignadas */}
        <div className="bg-[#141414] rounded-3xl border border-white/5 p-8">
          <SectionLabel text={`Mis asignadas (${assigned.length})`} />
          {assigned.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-10">No tienes consultas asignadas</p>
          ) : (
            <div className="space-y-3">
              {assigned.map(c => (
                <div key={c.id} className="bg-[#1a1a1a] rounded-2xl border border-white/5 p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <p className="text-white font-bold text-sm leading-tight">{c.service_type}</p>
                    <StatusBadge status={c.status} />
                  </div>
                  <p className="text-gray-500 text-xs mb-1">{c.location}</p>
                  {c.description && (
                    <p className="text-gray-600 text-xs leading-relaxed mb-3 line-clamp-2">{c.description}</p>
                  )}
                  <div className="flex items-center justify-between pt-3 border-t border-white/5">
                    <p className="text-gray-600 text-xs">
                      {new Date(c.created_at).toLocaleDateString('es-MX', { day: 'numeric', month: 'short' })}
                    </p>
                    <button
                      onClick={() => handleComplete(c.id)}
                      className="inline-flex items-center gap-1.5 bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 text-green-400 text-xs font-bold px-4 py-2 rounded-xl transition-colors"
                    >
                      Marcar completada
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}