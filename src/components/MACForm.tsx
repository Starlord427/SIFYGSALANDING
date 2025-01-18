'use client'

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'react-hot-toast';

interface MACFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

interface FormData {
  service_type: string;
  location: string;
  priority: 'high' | 'medium' | 'low';
  description: string;
}

const serviceTypes = [
  { value: 'gas_detection', label: 'Detección de gas' },
  { value: 'fire_detection', label: 'Detección de incendios' },
  { value: 'fall_protection', label: 'Protección contra caídas' },
  { value: 'automation', label: 'Automatización' },
  { value: 'emergency_notification', label: 'Notificación de emergencias' },
  { value: 'intercom_paging', label: 'Intercomunicación y voceo' },
  { value: 'air_gas_treatment', label: 'Tratamiento de aire y gas' },
  { value: 'air_compression', label: 'Compresión de aire' },
  { value: 'switches', label: 'Interruptores' },
  { value: 'equipment_protection', label: 'Protección de equipos' },
  { value: 'video_surveillance', label: 'Videovigilancia' },
  { value: 'instrument_air', label: 'Aire para instrumentos' }
];

export default function MACForm({ onSubmit, onCancel }: MACFormProps) {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>();
  const [isLoading, setIsLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error al obtener la ubicación del usuario:', error);
          toast.error('No se pudo obtener su ubicación. Por favor, ingrésela manualmente.');
        }
      );
    } else {
      toast.error('La geolocalización no es compatible con su navegador. Por favor, ingrese su ubicación manualmente.');
    }
  }, []);

  const onSubmitForm = async (data: FormData) => {
    setIsLoading(true);
    try {
      const formData = {
        ...data,
        latitude: userLocation?.latitude,
        longitude: userLocation?.longitude,
      };
      await onSubmit(formData);
      toast.success('¡Solicitud de consulta enviada con éxito!');
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      toast.error('Ocurrió un error al enviar su solicitud. Por favor, intente nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
      <div>
        <label htmlFor="service_type" className="block text-sm font-medium text-gray-700">Tipo de Servicio</label>
        <Select onValueChange={(value) => setValue('service_type', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Seleccione un tipo de servicio" />
          </SelectTrigger>
          <SelectContent>
            {serviceTypes.map((service) => (
              <SelectItem key={service.value} value={service.value}>{service.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.service_type && <p className="text-red-500 text-xs mt-1">Este campo es obligatorio</p>}
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">Ubicación</label>
        <Input
          type="text"
          id="location"
          {...register('location', { required: true })}
          placeholder="Ingrese su ubicación"
        />
        {errors.location && <p className="text-red-500 text-xs mt-1">Este campo es obligatorio</p>}
      </div>

      <div>
        <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Prioridad</label>
        <Select onValueChange={(value) => setValue('priority', value as 'high' | 'medium' | 'low')}>
          <SelectTrigger>
            <SelectValue placeholder="Seleccione la prioridad" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="high">Alta</SelectItem>
            <SelectItem value="medium">Media</SelectItem>
            <SelectItem value="low">Baja</SelectItem>
          </SelectContent>
        </Select>
        {errors.priority && <p className="text-red-500 text-xs mt-1">Este campo es obligatorio</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
        <Textarea
          id="description"
          {...register('description', { required: true })}
          placeholder="Describa su solicitud"
          rows={4}
        />
        {errors.description && <p className="text-red-500 text-xs mt-1">Este campo es obligatorio</p>}
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" onClick={onCancel} variant="outline">
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Enviando...' : 'Enviar Solicitud'}
        </Button>
      </div>
    </form>
  );
}

