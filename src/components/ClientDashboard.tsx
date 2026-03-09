'use client'
// src/components/ClientDashboard.tsx

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from 'next/navigation'

interface Consultation {
  id: string
  serviceType: string
  location: string
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
  createdAt: string
}

const statusLabel: Record<string, string> = {
  PENDING:     '🕐 Pendiente',
  IN_PROGRESS: '⚙️ En Progreso',
  COMPLETED:   '✅ Completado',
  CANCELLED:   '❌ Cancelado',
}

const statusColor: Record<string, string> = {
  PENDING:     'bg-yellow-100 text-yellow-800',
  IN_PROGRESS: 'bg-blue-100 text-blue-800',
  COMPLETED:   'bg-green-100 text-green-800',
  CANCELLED:   'bg-red-100 text-red-800',
}

export default function ClientDashboard() {
  const router = useRouter()
  const [consultations, setConsultations] = useState<Consultation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchConsultations()
  }, [])

  const fetchConsultations = async () => {
    try {
      const response = await fetch('/api/consultations')
      const data = await response.json()
      setConsultations(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error al obtener consultas:', error)
    } finally {
      setLoading(false)
    }
  }

  const pending   = consultations.filter(c => c.status !== 'COMPLETED' && c.status !== 'CANCELLED')
  const completed = consultations.filter(c => c.status === 'COMPLETED' || c.status === 'CANCELLED')

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto">

      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Mis Solicitudes</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {consultations.length} solicitud{consultations.length !== 1 ? 'es' : ''} en total
          </p>
        </div>
        <Button
          onClick={() => router.push('/MAC')}
          className="bg-[#FF7420] hover:bg-[#FF7420]/90 text-white w-full sm:w-auto"
        >
          + Nueva Solicitud
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#FF7420]" />
        </div>
      ) : consultations.length === 0 ? (
        /* Estado vacío */
        <div className="text-center py-20">
          <p className="text-4xl mb-4">📋</p>
          <p className="text-gray-600 font-medium mb-2">Aún no tienes solicitudes</p>
          <p className="text-gray-400 text-sm mb-6">Crea tu primera solicitud de consulta</p>
          <Button
            onClick={() => router.push('/MAC')}
            className="bg-[#FF7420] hover:bg-[#FF7420]/90 text-white"
          >
            Crear Solicitud
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">

          {/* Solicitudes Activas */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-base md:text-lg flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-yellow-400 inline-block" />
                Activas ({pending.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-3 space-y-3">
              {pending.length === 0 && (
                <p className="text-gray-400 text-sm text-center py-4">Sin solicitudes activas.</p>
              )}
              {pending.map(c => (
                <div key={c.id} className="p-3 border rounded-lg hover:border-[#FF7420] transition-colors">
                  <div className="flex justify-between items-start gap-2">
                    <p className="font-medium text-sm md:text-base text-gray-800 leading-tight">{c.serviceType}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${statusColor[c.status]}`}>
                      {statusLabel[c.status]}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-500 mt-1 truncate">{c.location}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(c.createdAt).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Solicitudes Completadas */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-base md:text-lg flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
                Historial ({completed.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-3 space-y-3">
              {completed.length === 0 && (
                <p className="text-gray-400 text-sm text-center py-4">Sin solicitudes completadas.</p>
              )}
              {completed.map(c => (
                <div key={c.id} className="p-3 border rounded-lg bg-gray-50">
                  <div className="flex justify-between items-start gap-2">
                    <p className="font-medium text-sm md:text-base text-gray-700 leading-tight">{c.serviceType}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${statusColor[c.status]}`}>
                      {statusLabel[c.status]}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-500 mt-1 truncate">{c.location}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(c.createdAt).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

        </div>
      )}
    </div>
  )
}
