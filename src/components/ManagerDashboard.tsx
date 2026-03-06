'use client'
// src/components/ManagerDashboard.tsx

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { toast } from 'react-hot-toast'
import ProductManagement from './ProductManagement'

interface Consultation {
  id: string
  serviceType: string
  location: string
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
  createdAt: string
  salespersonId: string | null
  latitude: number | null
  longitude: number | null
  client: { fullName: string; email: string }
  salesperson: { fullName: string; email: string } | null
}

interface User {
  id: string
  fullName: string
  role: string
}

const statusLabel: Record<string, string> = {
  PENDING:     'Pendiente',
  IN_PROGRESS: 'En Progreso',
  COMPLETED:   'Completado',
  CANCELLED:   'Cancelado',
}

export default function ManagerDashboard() {
  const [consultations, setConsultations]           = useState<Consultation[]>([])
  const [salespeople, setSalespeople]               = useState<User[]>([])
  const [filter, setFilter]                         = useState({ status: '', location: '', serviceType: '' })
  const [showProductManagement, setShowProductManagement] = useState(false)

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

  const handleAssign = async (consultationId: string, salespersonId: string) => {
    try {
      const res = await fetch(`/api/consultations/${consultationId}`, {
        method:  'PUT',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ salespersonId, status: 'IN_PROGRESS' }),
      })
      if (!res.ok) throw new Error()
      fetchConsultations()
      toast.success('Consulta asignada exitosamente')
    } catch {
      toast.error('No se pudo asignar la consulta.')
    }
  }

  const filtered = consultations.filter(c =>
    (filter.status      === '' || c.status === filter.status) &&
    (filter.location    === '' || c.location.toLowerCase().includes(filter.location.toLowerCase())) &&
    (filter.serviceType === '' || c.serviceType === filter.serviceType)
  )

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Panel de Gerente</h1>
        <Button onClick={() => setShowProductManagement(!showProductManagement)}>
          {showProductManagement ? 'Ver Consultas' : 'Gestionar Productos'}
        </Button>
      </div>

      {showProductManagement ? (
        <ProductManagement />
      ) : (
        <>
          <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select onValueChange={v => setFilter({ ...filter, status: v === 'ALL' ? '' : v })}>
              <SelectTrigger><SelectValue placeholder="Filtrar por Estado" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Todos los Estados</SelectItem>
                <SelectItem value="PENDING">Pendiente</SelectItem>
                <SelectItem value="IN_PROGRESS">En Progreso</SelectItem>
                <SelectItem value="COMPLETED">Completado</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Filtrar por Ubicación"
              onChange={e => setFilter({ ...filter, location: e.target.value })}
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Todas las Consultas ({filtered.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {filtered.length === 0 && <p className="text-gray-400 text-sm">Sin resultados.</p>}
              {filtered.map(c => (
                <div key={c.id} className="p-4 border rounded-lg space-y-1">
                  <p className="font-semibold">{c.serviceType}</p>
                  <p className="text-sm text-gray-600">📍 {c.location}</p>
                  <p className="text-sm">Estado: <span className="font-medium">{statusLabel[c.status]}</span></p>
                  <p className="text-sm text-gray-500">Cliente: {c.client?.fullName} ({c.client?.email})</p>
                  {c.salesperson && (
                    <p className="text-sm text-gray-500">Vendedor: {c.salesperson.fullName}</p>
                  )}
                  <p className="text-xs text-gray-400">{new Date(c.createdAt).toLocaleDateString('es-MX')}</p>
                  {c.status === 'PENDING' && (
                    <div className="pt-2">
                      <Select onValueChange={v => handleAssign(c.id, v)}>
                        <SelectTrigger className="w-60">
                          <SelectValue placeholder="Asignar a Vendedor" />
                        </SelectTrigger>
                        <SelectContent>
                          {salespeople.map(sp => (
                            <SelectItem key={sp.id} value={sp.id}>{sp.fullName}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
