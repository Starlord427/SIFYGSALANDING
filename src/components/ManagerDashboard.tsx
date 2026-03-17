'use client'

import React, { useState, useEffect } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'react-hot-toast'
import ProductManagement from './ProductManagement'
import ProductCategoriesManager from './manager/ProductCategoriesManager'

interface Consultation {
  id:             number
  serviceType:    string
  location:       string
  priority:       string
  status:         string
  createdAt:      string
  salespersonId:  number | null
  latitude:       number
  longitude:      number
  contactName:    string
  organization:   string
  email:          string
  phone:          string
  budget:         string
  supportLevel:   string
  installations:  string
  salesperson?: { fullName: string; email: string } | null
  client?:      { fullName: string; email: string } | null
}

interface User {
  id:       number
  fullName: string
  email:    string
  role:     string
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

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return '—'
  return d.toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function ManagerDashboard() {
  const [consultations, setConsultations] = useState<Consultation[]>([])
  const [salespeople,   setSalespeople]   = useState<User[]>([])
  const [filter,        setFilter]        = useState({ status: '', salesperson: '', location: '' })
  const [view,          setView]          = useState<'consultations' | 'products' | 'categories'>('consultations')
  const [loading,       setLoading]       = useState(true)
  const [expanded,      setExpanded]      = useState<number | null>(null)

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
      const res = await fetch('/api/users?role=SALESPERSON')
      if (!res.ok) throw new Error()
      setSalespeople(await res.json())
    } catch {
      toast.error('No se pudieron cargar los vendedores.')
    }
  }

  const handleAssign = async (consultationId: number, salespersonId: number) => {
    try {
      const res = await fetch(`/api/consultations/${consultationId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ salespersonId, status: 'IN_PROGRESS' }),
      })
      if (!res.ok) throw new Error()
      fetchConsultations()
      toast.success('Consulta asignada exitosamente')
    } catch {
      toast.error('No se pudo asignar la consulta.')
    }
  }

  const filtered = consultations.filter(c =>
    (filter.status      === '' || c.status         === filter.status) &&
    (filter.salesperson === '' || String(c.salespersonId) === filter.salesperson) &&
    (filter.location    === '' || c.location.toLowerCase().includes(filter.location.toLowerCase()))
  )

  if (loading) return (
    <div className="flex items-center justify-center py-24">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#FF7420]" />
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#141414] rounded-3xl border border-white/5 p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <SectionLabel text="Panel de Gerente" />
          <h2 className="text-white font-black text-xl -mt-2">
            {view === 'consultations' && 'Consultas MAC'}
            {/* view === 'products' && 'Gestión de Productos' — oculto temporalmente */}
            {view === 'categories'    && 'Catálogo de Categorías'}
          </h2>
        </div>

        {/* Navegación del Panel */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setView('consultations')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${view === 'consultations' ? 'bg-[#FF7420] text-white' : 'bg-white/5 text-gray-500 hover:text-gray-300'}`}
          >
            Ver Consultas
          </button>
          {/* Botón Productos oculto temporalmente
          <button
            onClick={() => setView('products')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${view === 'products' ? 'bg-[#FF7420] text-white' : 'bg-white/5 text-gray-500 hover:text-gray-300'}`}
          >
            Productos
          </button>
          */}
          <button
            onClick={() => setView('categories')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${view === 'categories' ? 'bg-[#FF7420] text-white' : 'bg-white/5 text-gray-500 hover:text-gray-300'}`}
          >
            Categorías
          </button>
        </div>
      </div>

      <main className="animate-in fade-in duration-500">
        {view === 'consultations' && (
          <div className="space-y-6">
            {/* Filtros */}
            <div className="bg-[#141414] rounded-3xl border border-white/5 p-6">
              <SectionLabel text="Filtros" />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Select onValueChange={v => setFilter(f => ({ ...f, status: v === 'all' ? '' : v }))}>
                  <SelectTrigger className="bg-[#1a1a1a] border-white/10 text-gray-300 rounded-xl">
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-white/10 text-white">
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="PENDING">Pendiente</SelectItem>
                    <SelectItem value="IN_PROGRESS">En Progreso</SelectItem>
                    <SelectItem value="COMPLETED">Completado</SelectItem>
                  </SelectContent>
                </Select>

                <Select onValueChange={v => setFilter(f => ({ ...f, salesperson: v === 'all' ? '' : v }))}>
                  <SelectTrigger className="bg-[#1a1a1a] border-white/10 text-gray-300 rounded-xl">
                    <SelectValue placeholder="Vendedor" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-white/10 text-white">
                    <SelectItem value="all">Todos</SelectItem>
                    {salespeople.map(sp => (
                      <SelectItem key={sp.id} value={String(sp.id)}>{sp.fullName}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <input
                  type="text"
                  placeholder="Buscar por ubicación..."
                  onChange={e => setFilter(f => ({ ...f, location: e.target.value }))}
                  className="bg-[#1a1a1a] border border-white/10 text-gray-300 placeholder-gray-600 text-sm px-4 py-2 rounded-xl focus:outline-none focus:border-[#FF7420]/50 transition-colors"
                />
              </div>
            </div>

            {/* Lista de Consultas */}
            <div className="bg-[#141414] rounded-3xl border border-white/5 p-8">
              <SectionLabel text={`Consultas (${filtered.length})`} />
              {filtered.length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-10">No hay consultas con los filtros aplicados</p>
              ) : (
                <div className="space-y-3">
                  {filtered.map(c => (
                    <div key={c.id} className="bg-[#1a1a1a] rounded-2xl border border-white/5 overflow-hidden">
                      <div
                        className="p-5 cursor-pointer hover:bg-white/[0.02] transition-colors"
                        onClick={() => setExpanded(expanded === c.id ? null : c.id)}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-bold text-sm truncate">{c.serviceType}</p>
                            <p className="text-gray-500 text-xs mt-0.5 truncate">{c.location}</p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <StatusBadge status={c.status} />
                            <svg className={`w-4 h-4 text-gray-600 transition-transform ${expanded === c.id ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                          <p className="text-gray-600 text-xs">{formatDate(c.createdAt)}</p>
                          <p className="text-gray-600 text-xs">
                            {c.salesperson ? `Asignado a ${c.salesperson.fullName}` : 'Sin asignar'}
                          </p>
                        </div>
                      </div>

                      {expanded === c.id && (
                        <div className="border-t border-white/5 p-5 space-y-4 bg-[#0f0f0f]">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                            {c.contactName   && <div><span className="text-gray-600 uppercase tracking-wider">Contacto</span><p className="text-gray-300 mt-0.5">{c.contactName}</p></div>}
                            {c.organization  && <div><span className="text-gray-600 uppercase tracking-wider">Organización</span><p className="text-gray-300 mt-0.5">{c.organization}</p></div>}
                            {c.email         && <div><span className="text-gray-600 uppercase tracking-wider">Correo</span><p className="text-gray-300 mt-0.5">{c.email}</p></div>}
                            {c.phone         && <div><span className="text-gray-600 uppercase tracking-wider">Teléfono</span><p className="text-gray-300 mt-0.5">{c.phone}</p></div>}
                            {c.budget        && <div><span className="text-gray-600 uppercase tracking-wider">Presupuesto</span><p className="text-gray-300 mt-0.5">{c.budget}</p></div>}
                            {c.installations && <div><span className="text-gray-600 uppercase tracking-wider">Instalaciones</span><p className="text-gray-300 mt-0.5">{c.installations}</p></div>}
                          </div>

                          {c.status === 'PENDING' && (
                            <div className="pt-3 border-t border-white/5">
                              <p className="text-gray-500 text-xs mb-2">Asignar a vendedor</p>
                              <Select onValueChange={v => handleAssign(c.id, parseInt(v))}>
                                <SelectTrigger className="bg-[#141414] border-white/10 text-gray-300 rounded-xl text-xs h-9 w-56">
                                  <SelectValue placeholder="Seleccionar vendedor" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#1a1a1a] border-white/10 text-white">
                                  {salespeople.map(sp => (
                                    <SelectItem key={sp.id} value={String(sp.id)}>{sp.fullName}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Panel Productos oculto temporalmente
        {view === 'products' && (
          <div className="bg-[#141414] rounded-3xl border border-white/5 p-8">
            <ProductManagement />
          </div>
        )}
        */}

        {view === 'categories' && (
          <div className="bg-[#141414] rounded-3xl border border-white/5 p-8">
            <ProductCategoriesManager />
          </div>
        )}
      </main>
    </div>
  )
}