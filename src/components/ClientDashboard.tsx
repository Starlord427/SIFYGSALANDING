'use client'
// src/components/ClientDashboard.tsx
// Actualizado: id es string (cuid), status usa enum PENDING/IN_PROGRESS/COMPLETED

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from 'next/navigation'

interface Consultation {
  id: string            // ← string (cuid), ya no number
  serviceType: string   // ← camelCase desde Prisma
  location: string
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
  createdAt: string
}

const statusLabel: Record<string, string> = {
  PENDING:    '🕐 Pendiente',
  IN_PROGRESS: '⚙️ En Progreso',
  COMPLETED:  '✅ Completado',
  CANCELLED:  '❌ Cancelado',
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
      setConsultations(data)
    } catch (error) {
      console.error('Error al obtener consultas:', error)
    } finally {
      setLoading(false)
    }
  }

  const pending   = consultations.filter(c => c.status !== 'COMPLETED' && c.status !== 'CANCELLED')
  const completed = consultations.filter(c => c.status === 'COMPLETED')

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mi Panel</h1>
        <Button
          onClick={() => router.push('/MAC')}
          className="bg-[#FF7420] hover:bg-[#FF7420]/90 text-white"
        >
          Nueva Solicitud
        </Button>
      </div>

      {loading ? (
        <p className="text-gray-500">Cargando consultas...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Solicitudes Activas ({pending.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {pending.length === 0 && <p className="text-gray-400 text-sm">Sin solicitudes activas.</p>}
              {pending.map(c => (
                <div key={c.id} className="p-3 border rounded-lg">
                  <p className="font-medium">{c.serviceType}</p>
                  <p className="text-sm text-gray-500">{c.location}</p>
                  <p className="text-xs mt-1">{statusLabel[c.status]}</p>
                  <p className="text-xs text-gray-400">{new Date(c.createdAt).toLocaleDateString('es-MX')}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Solicitudes Completadas ({completed.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {completed.length === 0 && <p className="text-gray-400 text-sm">Sin solicitudes completadas.</p>}
              {completed.map(c => (
                <div key={c.id} className="p-3 border rounded-lg">
                  <p className="font-medium">{c.serviceType}</p>
                  <p className="text-sm text-gray-500">{c.location}</p>
                  <p className="text-xs text-gray-400">{new Date(c.createdAt).toLocaleDateString('es-MX')}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
