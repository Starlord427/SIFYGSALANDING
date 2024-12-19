import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'react-hot-toast';

interface Consultation {
  id: number;
  service_type: string;
  location: string;
  priority: string;
  status: string;
  created_at: string;
  latitude: number;
  longitude: number;
  description: string;
  salesperson_id: number;
}

export default function SalespersonDashboard({ userId }: { userId: number }) {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [filter, setFilter] = useState({ priority: '', status: '' });

  useEffect(() => {
    fetchConsultations();
    getUserLocation();
  }, []);

  const fetchConsultations = async () => {
    try {
      const response = await fetch('/api/consultations');
      if (!response.ok) {
        throw new Error('Failed to fetch consultations');
      }
      const data = await response.json();
      setConsultations(data);
    } catch (error) {
      console.error('Error fetching consultations:', error);
      toast.error('Failed to load consultations. Please try again.');
    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting user location:', error);
          toast.error('Unable to get your location. Distance-based sorting may be inaccurate.');
        }
      );
    } else {
      toast.error('Geolocation is not supported by your browser. Distance-based sorting may be inaccurate.');
    }
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  const sortedConsultations = userLocation
    ? consultations.sort((a, b) => {
        const distanceA = calculateDistance(userLocation.latitude, userLocation.longitude, a.latitude, a.longitude);
        const distanceB = calculateDistance(userLocation.latitude, userLocation.longitude, b.latitude, b.longitude);
        return distanceA - distanceB;
      })
    : consultations;

  const filteredConsultations = sortedConsultations.filter(consultation => {
    return (
      (filter.priority === '' || consultation.priority === filter.priority) &&
      (filter.status === '' || consultation.status === filter.status)
    );
  });

  const handleAssign = async (consultationId: number) => {
    try {
      const response = await fetch(`/api/consultations/${consultationId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ salesperson_id: userId, status: 'in_progress' }),
      });
      if (!response.ok) {
        throw new Error('Failed to assign consultation');
      }
      fetchConsultations();
      toast.success('Consultation assigned successfully');
    } catch (error) {
      console.error('Error assigning consultation:', error);
      toast.error('Failed to assign consultation. Please try again.');
    }
  };

  const handleComplete = async (consultationId: number) => {
    try {
      const response = await fetch(`/api/consultations/${consultationId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'completed' }),
      });
      if (!response.ok) {
        throw new Error('Failed to complete consultation');
      }
      fetchConsultations();
      toast.success('Consultation marked as completed');
    } catch (error) {
      console.error('Error completing consultation:', error);
      toast.error('Failed to complete consultation. Please try again.');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Salesperson Dashboard</h1>
      <div className="mb-6 flex space-x-4">
        <Select onValueChange={(value) => setFilter({ ...filter, priority: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Priorities</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => setFilter({ ...filter, status: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Available Consultations</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredConsultations.filter(c => c.status === 'pending').map(consultation => (
              <div key={consultation.id} className="mb-4 p-4 border rounded">
                <p><strong>Service:</strong> {consultation.service_type}</p>
                <p><strong>Location:</strong> {consultation.location}</p>
                <p><strong>Priority:</strong> {consultation.priority}</p>
                <p><strong>Description:</strong> {consultation.description}</p>
                <p><strong>Created:</strong> {new Date(consultation.created_at).toLocaleDateString()}</p>
                <Button onClick={() => handleAssign(consultation.id)} className="mt-2">Assign to Me</Button>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>My Assigned Consultations</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredConsultations.filter(c => c.status === 'in_progress' && c.salesperson_id === userId).map(consultation => (
              <div key={consultation.id} className="mb-4 p-4 border rounded">
                <p><strong>Service:</strong> {consultation.service_type}</p>
                <p><strong>Location:</strong> {consultation.location}</p>
                <p><strong>Priority:</strong> {consultation.priority}</p>
                <p><strong>Description:</strong> {consultation.description}</p>
                <p><strong>Assigned:</strong> {new Date(consultation.created_at).toLocaleDateString()}</p>
                <Button onClick={() => handleComplete(consultation.id)} className="mt-2">Mark as Completed</Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

