'use client'

import React, { useState, useEffect } from 'react'

interface Consultation {
  id: number
  service_type: string
  location: string
  priority: string
  status: string
  created_at: string
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

function ConsultationCard({ consultation: c, muted = false }: { consultation: Consultation; muted?: boolean }) {
  return (
    <div className={`rounded-2xl border p-5 ${muted ? 'bg-[#0f0f0f] border-white/5' : 'bg-[#1a1a1a] border-white/5 hover:border-white/10 transition-colors'}`}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <p className={`font-bold text-sm leading-tight ${muted ? 'text-gray-400' : 'text-white'}`}>
          {c.service_type}
        </p>
        <StatusBadge status={c.status} />
      </div>
      <p className="text-gray-500 text-xs flex items-center gap-1.5 mb-1">
        <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        {c.location}
      </p>
      <p className="text-gray-600 text-xs">
        {new Date(c.created_at).toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' })}
      </p>
    </div>
  )
}

export default function ClientDashboard({ userId }: { userId: number }) {
  const [consultations, setConsultations] = useState<Consultation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchConsultations() }, [])

  const fetchConsultations = async () => {
    try {
      const res = await fetch(`/api/consultations?client_id=${userId}`)
      const data = await res.json()
      setConsultations(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const active   = consultations.filter(c => !['completed', 'cancelled'].includes(c.status))
  const historic = consultations.filter(c =>  ['completed', 'cancelled'].includes(c.status))

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#FF7420]" />
      </div>
    )
  }

  return (
    <div className="space-y-6">

      {/* Banner bienvenida */}
      <div className="bg-[#FF7420] rounded-3xl p-8">
        <div className="inline-flex items-center gap-2 mb-2">
          <span className="w-4 h-px bg-white/60" />
          <span className="text-white/70 text-[10px] font-bold uppercase tracking-[0.3em]">Bienvenido</span>
        </div>
        <h2 className="text-white font-black text-xl">Tu Panel de Consultas</h2>
        <p className="text-white/80 text-sm mt-1">Gestiona y da seguimiento a tus solicitudes</p>
      </div>

      {/* Consultas activas */}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {active.map(c => <ConsultationCard key={c.id} consultation={c} />)}
          </div>
        )}
      </div>

      {/* Historial */}
      {historic.length > 0 && (
        <div className="bg-[#141414] rounded-3xl border border-white/5 p-8">
          <SectionLabel text="Historial" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {historic.map(c => <ConsultationCard key={c.id} consultation={c} muted />)}
          </div>
        </div>
      )}

    </div>
  )
}