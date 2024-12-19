import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MACForm from './MACForm';

interface Consultation {
  id: number;
  service_type: string;
  location: string;
  priority: string;
  status: string;
  created_at: string;
}

export default function ClientDashboard({ userId }: { userId: number }) {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [showMACForm, setShowMACForm] = useState(false);

  useEffect(() => {
    fetchConsultations();
  }, []);

  const fetchConsultations = async () => {
    try {
      const response = await fetch(`/api/consultations?client_id=${userId}`);
      const data = await response.json();
      setConsultations(data);
    } catch (error) {
      console.error('Error fetching consultations:', error);
    }
  };

  const handleNewConsultation = () => {
    setShowMACForm(true);
  };

  const handleMACFormSubmit = async (formData: any) => {
    try {
      const response = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, client_id: userId }),
      });
      if (response.ok) {
        setShowMACForm(false);
        fetchConsultations();
      }
    } catch (error) {
      console.error('Error creating consultation:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Client Dashboard</h1>
      <Button onClick={handleNewConsultation} className="mb-6">New Consultation</Button>
      {showMACForm && <MACForm onSubmit={handleMACFormSubmit} onCancel={() => setShowMACForm(false)} />}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pending Consultations</CardTitle>
          </CardHeader>
          <CardContent>
            {consultations.filter(c => c.status !== 'completed').map(consultation => (
              <div key={consultation.id} className="mb-4 p-4 border rounded">
                <p><strong>Service:</strong> {consultation.service_type}</p>
                <p><strong>Location:</strong> {consultation.location}</p>
                <p><strong>Status:</strong> {consultation.status}</p>
                <p><strong>Created:</strong> {new Date(consultation.created_at).toLocaleDateString()}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Completed Consultations</CardTitle>
          </CardHeader>
          <CardContent>
            {consultations.filter(c => c.status === 'completed').map(consultation => (
              <div key={consultation.id} className="mb-4 p-4 border rounded">
                <p><strong>Service:</strong> {consultation.service_type}</p>
                <p><strong>Location:</strong> {consultation.location}</p>
                <p><strong>Completed:</strong> {new Date(consultation.created_at).toLocaleDateString()}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

