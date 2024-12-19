import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { toast } from 'react-hot-toast';
import ProductManagement from './ProductManagement';

interface Consultation {
  id: number;
  service_type: string;
  location: string;
  priority: string;
  status: string;
  created_at: string;
  salesperson_id: number | null;
  latitude: number;
  longitude: number;
  description: string;
}

interface User {
  id: number;
  username: string;
  role: string;
}

export default function ManagerDashboard() {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [salespeople, setSalespeople] = useState<User[]>([]);
  const [filter, setFilter] = useState({ priority: '', location: '', status: '', salesperson: '', service_type: '' });
  const [showProductManagement, setShowProductManagement] = useState(false);

  useEffect(() => {
    fetchConsultations();
    fetchSalespeople();
  }, []);

  const fetchConsultations = async () => {
    try {
      const response = await fetch('/api/consultations');
      if (!response.ok) {
        throw new Error('Error al obtener las consultas');
      }
      const data = await response.json();
      setConsultations(data);
    } catch (error) {
      console.error('Error al obtener las consultas:', error);
      toast.error('No se pudieron cargar las consultas. Por favor, intente nuevamente.');
    }
  };

  const fetchSalespeople = async () => {
    try {
      const response = await fetch('/api/users?role=salesperson');
      if (!response.ok) {
        throw new Error('Error al obtener los vendedores');
      }
      const data = await response.json();
      setSalespeople(data);
    } catch (error) {
      console.error('Error al obtener los vendedores:', error);
      toast.error('No se pudieron cargar los vendedores. Por favor, intente nuevamente.');
    }
  };

  const handleAssign = async (consultationId: number, salespersonId: number) => {
    try {
      const response = await fetch(`/api/consultations/${consultationId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ salesperson_id: salespersonId, status: 'in_progress' }),
      });
      if (!response.ok) {
        throw new Error('Error al asignar la consulta');
      }
      fetchConsultations();
      toast.success('Consulta asignada exitosamente');
    } catch (error) {
      console.error('Error al asignar la consulta:', error);
      toast.error('No se pudo asignar la consulta. Por favor, intente nuevamente.');
    }
  };

  const filteredConsultations = consultations.filter(consultation => {
    return (
      (filter.priority === '' || consultation.priority === filter.priority) &&
      (filter.location === '' || consultation.location.toLowerCase().includes(filter.location.toLowerCase())) &&
      (filter.status === '' || consultation.status === filter.status) &&
      (filter.salesperson === '' || consultation.salesperson_id === parseInt(filter.salesperson)) &&
      (filter.service_type === '' || consultation.service_type === filter.service_type)
    );
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Panel de Gerente</h1>
      <Button onClick={() => setShowProductManagement(!showProductManagement)} className="mb-4">
        {showProductManagement ? 'Ver Consultas' : 'Gestionar Productos'}
      </Button>
      {showProductManagement ? (
        <ProductManagement />
      ) : (
        <>
          <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select onValueChange={(value) => setFilter({ ...filter, priority: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por Prioridad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todas las Prioridades</SelectItem>
                <SelectItem value="high">Alta</SelectItem>
                <SelectItem value="medium">Media</SelectItem>
                <SelectItem value="low">Baja</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => setFilter({ ...filter, status: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos los Estados</SelectItem>
                <SelectItem value="pending">Pendiente</SelectItem>
                <SelectItem value="in_progress">En Progreso</SelectItem>
                <SelectItem value="completed">Completado</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => setFilter({ ...filter, salesperson: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por Vendedor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos los Vendedores</SelectItem>
                {salespeople.map(sp => (
                  <SelectItem key={sp.id} value={sp.id.toString()}>{sp.username}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => setFilter({ ...filter, service_type: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por Tipo de Servicio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos los Tipos de Servicio</SelectItem>
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
            <Input
              type="text"
              placeholder="Filtrar por Ubicación"
              onChange={(e) => setFilter({ ...filter, location: e.target.value })}
            />
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Todas las Consultas</CardTitle>
            </CardHeader>
            <CardContent>
              {filteredConsultations.map(consultation => (
                <div key={consultation.id} className="mb-4 p-4 border rounded">
                  <p><strong>Tipo de Servicio:</strong> {consultation.service_type}</p>
                  <p><strong>Ubicación:</strong> {consultation.location}</p>
                  <p><strong>Prioridad:</strong> {consultation.priority}</p>
                  <p><strong>Estado:</strong> {consultation.status}</p>
                  <p><strong>Descripción:</strong> {consultation.description}</p>
                  <p><strong>Creado:</strong> {new Date(consultation.created_at).toLocaleDateString()}</p>
                  {consultation.status === 'pending' && (
                    <Select onValueChange={(value) => handleAssign(consultation.id, parseInt(value))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Asignar a Vendedor" />
                      </SelectTrigger>
                      <SelectContent>
                        {salespeople.map(sp => (
                          <SelectItem key={sp.id} value={sp.id.toString()}>{sp.username}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

