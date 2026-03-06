'use client'
// src/components/SalespersonDashboard.tsx

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'react-hot-toast'
import { useSession } from 'next-auth/react'

interface Consultation {
  id: string
  serviceType: string
  location: string
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
  createdAt: string
  salespersonId: string | null
  latitude: number | null
  longitude: number | null
  client: { fullName: string; email: string; phone: string }
}

// Fórmula Haversine para calcular distancia en km entre dos coordenadas
function calcDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371
  const dLat = (lat2 - lat1) * (Math.PI / 180)
  const dLon = (lon2 - lon1) * (Math.PI / 180)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export default function SalespersonDashboard() {
  const { data: session } = useSession()
  const userId = (session?.user as any)?.id

  const [consultations, setConsultations]         = useState<Consultation[]>([])
  const [userLocation, setUserLocation]           = useState<{ lat: number; lng: number } | null>(null)
  const [filter, setFilter]                       = useState({ status: '' })

  useEffect(() => {
    fetchConsultations()
    navigator.geolocation?.getCurrentPosition(
      p  => setUserLocation({ lat: p.coords.latitude, lng: p.coords.longitude }),
      () => toast.error('No se pudo obtener tu ubicación. El orden por distancia no estará disponible.')
    )
  }, [])

  const fetchConsultations = async () => {
    try {
      const res = await fetch('/api/consultations')
      if (!res.ok) throw new Error()
      setConsultations(await res.json())
    } catch {
      toast.error('Error al cargar consultas.')
    }
  }

  const handleUpdate = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/consultations/${id}`, {
        method:  'PUT',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ salespersonId: userId, status }),
      })
      if (!res.ok) throw new Error()
      fetchConsultations()
      toast.success(status === 'IN_PROGRESS' ? 'Consulta asignada' : 'Consulta completada')
    } catch {
      toast.error('No se pudo actualizar la consulta.')
    }
  }

  // Ordenar por distancia si tenemos ubicación del vendedor
  const sorted = userLocation
    ? [...consultations].sort((a, b) => {
        if (!a.latitude || !b.latitude) return 0
        const dA = calcDistance(userLocation.lat, userLocation.lng, a.latitude, a.longitude!)
        const dB = calcDistance(userLocation.lat, userLocation.lng, b.latitude, b.longitude!)
        return dA - dB
      })
    : consultations

  const filtered = sorted.filter(c =>
    filter.status === '' || c.status === filter.status
  )

  const available = filtered.filter(c => c.status === 'PENDING')
  const myActive  = filtered.filter(c => c.status === 'IN_PROGRESS' && c.salespersonId === userId)

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Panel de Vendedor</h1>
      {userLocation && (
        <p className="text-xs text-green-600 mb-4">
          📍 Ubicación activa — mostrando consultas ordenadas por cercanía
        </p>
      )}

      <div className="mb-6">
        <Select onValueChange={v => setFilter({ status: v === 'ALL' ? '' : v })}>
          <SelectTrigger className="w-56">
            <SelectValue placeholder="Filtrar por Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Todos</SelectItem>
            <SelectItem value="PENDING">Pendientes</SelectItem>
            <SelectItem value="IN_PROGRESS">En Progreso</SelectItem>
            <SelectItem value="COMPLETED">Completados</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Disponibles ({available.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {available.length === 0 && <p className="text-gray-400 text-sm">Sin consultas disponibles.</p>}
            {available.map(c => {
              const dist = userLocation && c.latitude
                ? calcDistance(userLocation.lat, userLocation.lng, c.latitude, c.longitude!).toFixed(1)
                : null
              return (
                <div key={c.id} className="p-3 border rounded-lg space-y-1">
                  <p className="font-semibold">{c.serviceType}</p>
                  <p className="text-sm text-gray-500">📍 {c.location}</p>
                  {dist && <p className="text-xs text-blue-600">🚗 {dist} km de ti</p>}
                  <p className="text-xs text-gray-400">Cliente: {c.client?.fullName}</p>
                  <Button
                    size="sm"
                    onClick={() => handleUpdate(c.id, 'IN_PROGRESS')}
                    className="mt-2 bg-[#FF7420] hover:bg-[#FF7420]/90 text-white"
                  >
                    Tomar consulta
                  </Button>
                </div>
              )
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mis Asignadas ({myActive.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {myActive.length === 0 && <p className="text-gray-400 text-sm">Sin consultas asignadas.</p>}
            {myActive.map(c => (
              <div key={c.id} className="p-3 border rounded-lg space-y-1">
                <p className="font-semibold">{c.serviceType}</p>
                <p className="text-sm text-gray-500">📍 {c.location}</p>
                <p className="text-xs text-gray-400">
                  Cliente: {c.client?.fullName} — {c.client?.phone}
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleUpdate(c.id, 'COMPLETED')}
                  className="mt-2"
                >
                  Marcar como Completada
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
