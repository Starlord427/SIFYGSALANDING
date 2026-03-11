'use client'

import React, { useState, useEffect } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'react-hot-toast'
import ProductManagement from './ProductManagement'

interface Consultation {
  id: number
  service_type: string
  location: string
  priority: string
  status: string
  created_at: string
  salesperson_id: number | null
  latitude: number
  longitude: number
  description: string
}

interface User {
  id: number
  username: string
  role: string
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

export default function ManagerDashboard() {
  const [consultations, setConsultations]         = useState<Consultation[]>([])
  const [salespeople, setSalespeople]             = useState<User[]>([])
  const [filter, setFilter]                       = useState({ priority: '', location: '', status: '', salesperson: '', service_type: '' })
  const [showProductManagement, setShowPM]        = useState(false)
  const [loading, setLoading]                     = useState(true)

  useEffect(() => {
    fetchConsultations()
    fetchSalespeople()
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

  const fetchSalespeople = async () => {
    try {
      const res = await fetch('/api/users?role=salesperson')
      if (!res.ok) throw new Error()
      setSalespeople(await res.json())
    } catch {
      toast.error('No se pudieron cargar los vendedores.')
    }
  }

  const handleAssign = async (consultationId: number, salespersonId: number) => {
    try {
      const res = await fetch(`/api/consultations/${consultationId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ salesperson_id: salespersonId, status: 'in_progress' }),
      })
      if (!res.ok) throw new Error()
      fetchConsultations()
      toast.success('Consulta asignada exitosamente')
    } catch {
      toast.error('No se pudo asignar la consulta.')
    }
  }

  const filtered = consultations.filter(c =>
    (filter.priority    === '' || c.priority    === filter.priority) &&
    (filter.location    === '' || c.location.toLowerCase().includes(filter.location.toLowerCase())) &&
    (filter.status      === '' || c.status      === filter.status) &&
    (filter.salesperson === '' || c.salesperson_id === parseInt(filter.salesperson)) &&
    (filter.service_type === '' || c.service_type === filter.service_type)
  )

  if (loading) return (
    <div className="flex items-center justify-center py-24">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#FF7420]" />
    </div>
  )

  return (
    <div className="space-y-6">

      {/* Header con toggle */}
      <div className="bg-[#141414] rounded-3xl border border-white/5 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <SectionLabel text="Panel de Gerente" />
          <h2 className="text-white font-black text-xl -mt-2">
            {showProductManagement ? 'Gestión de Productos' : 'Consultas'}
          </h2>
        </div>
        <button
          onClick={() => setShowPM(!showProductManagement)}
          className="shrink-0 inline-flex items-center gap-2 bg-[#FF7420] hover:bg-[#e5681c] text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors"
        >
          {showProductManagement ? 'Ver Consultas' : 'Gestionar Productos'}
        </button>
      </div>

      {showProductManagement ? (
        <div className="bg-[#141414] rounded-3xl border border-white/5 p-8">
          <ProductManagement />
        </div>
      ) : (
        <>
          {/* Filtros */}
          <div className="bg-[#141414] rounded-3xl border border-white/5 p-6">
            <SectionLabel text="Filtros" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {/* Los selects de shadcn heredan el tema oscuro via globals.css — 
                  si no, sobreescribe SelectTrigger con className */}
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

              <Select onValueChange={v => setFilter({ ...filter, salesperson: v === 'all' ? '' : v })}>
                <SelectTrigger className="bg-[#1a1a1a] border-white/10 text-gray-300 rounded-xl">
                  <SelectValue placeholder="Vendedor" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-white/10 text-white">
                  <SelectItem value="all">Todos</SelectItem>
                  {salespeople.map(sp => (
                    <SelectItem key={sp.id} value={sp.id.toString()}>{sp.username}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select onValueChange={v => setFilter({ ...filter, service_type: v === 'all' ? '' : v })}>
                <SelectTrigger className="bg-[#1a1a1a] border-white/10 text-gray-300 rounded-xl">
                  <SelectValue placeholder="Tipo de servicio" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-white/10 text-white">
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="gas_detection">Detección de gas</SelectItem>
                  <SelectItem value="fire_detection">Detección de incendios</SelectItem>
                  <SelectItem value="fall_protection">Protección contra caídas</SelectItem>
                  <SelectItem value="automation">Automatización</SelectItem>
                  <SelectItem value="emergency_notification">Notificación de emergencias</SelectItem>
                  <SelectItem value="intercom_paging">Intercomunicación y voceo</SelectItem>
                  <SelectItem value="air_gas_treatment">Tratamiento de aire y gas</SelectItem>
                  <SelectItem value="air_compression">Compresión de aire</SelectItem>
                  <SelectItem value="switches">Interruptores</SelectItem>
                  <SelectItem value="equipment_protection">Protección de equipos</SelectItem>
                  <SelectItem value="video_surveillance">Videovigilancia</SelectItem>
                  <SelectItem value="instrument_air">Aire para instrumentos</SelectItem>
                </SelectContent>
              </Select>

              <input
                type="text"
                placeholder="Buscar por ubicación..."
                onChange={e => setFilter({ ...filter, location: e.target.value })}
                className="bg-[#1a1a1a] border border-white/10 text-gray-300 placeholder-gray-600 text-sm px-4 py-2 rounded-xl focus:outline-none focus:border-[#FF7420]/50 transition-colors"
              />
            </div>
          </div>

          {/* Lista de consultas */}
          <div className="bg-[#141414] rounded-3xl border border-white/5 p-8">
            <SectionLabel text={`Consultas (${filtered.length})`} />
            {filtered.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-10">No hay consultas con los filtros aplicados</p>
            ) : (
              <div className="space-y-3">
                {filtered.map(c => (
                  <div key={c.id} className="bg-[#1a1a1a] rounded-2xl border border-white/5 p-5">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                      <div>
                        <p className="text-white font-bold text-sm">{c.service_type}</p>
                        <p className="text-gray-500 text-xs mt-0.5">{c.location}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <StatusBadge status={c.status} />
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                          c.priority === 'high'   ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                          c.priority === 'medium' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                                                    'bg-gray-500/10 text-gray-400 border-gray-500/20'
                        }`}>
                          {c.priority === 'high' ? 'Alta' : c.priority === 'medium' ? 'Media' : 'Baja'}
                        </span>
                      </div>
                    </div>

                    {c.description && (
                      <p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2">{c.description}</p>
                    )}

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-white/5">
                      <p className="text-gray-600 text-xs">
                        {new Date(c.created_at).toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                      {c.status === 'pending' && (
                        <Select onValueChange={v => handleAssign(c.id, parseInt(v))}>
                          <SelectTrigger className="bg-[#0f0f0f] border-white/10 text-gray-300 rounded-xl text-xs h-8 w-48">
                            <SelectValue placeholder="Asignar a vendedor" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1a1a1a] border-white/10 text-white">
                            {salespeople.map(sp => (
                              <SelectItem key={sp.id} value={sp.id.toString()}>{sp.username}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}