// app/servicios-y-productos/notificacion-emergencias/page.tsx
import ServicePageTemplate from '@/components/ServicePageTemplate'

export default function NotificacionEmergencias() {
  return (
    <ServicePageTemplate
      title="Notificación masiva de emergencias"
      subtitle="Alertas de Emergencia"
      imageSrc="/servicios/servicio-notificacion.jpg"
      imageAlt="Notificación masiva de emergencias"
      categoryKeyword="emergency_notification"
      description="Nuestros sistemas de notificación masiva de emergencias están diseñados para proporcionar alertas rápidas y eficaces en situaciones críticas. Utilizamos tecnología avanzada para garantizar que la información vital llegue a todas las personas afectadas de manera oportuna."
      features={[
        'Sistemas de alerta multicanal (audio, visual, móvil)',
        'Integración con sistemas de seguridad existentes',
        'Segmentación de mensajes por zona o grupo',
        'Monitoreo en tiempo real del estado del sistema',
        'Opciones de activación manual y automática',
      ]}
      services={[
        'Evaluación de necesidades y diseño de sistemas',
        'Instalación y configuración de equipos',
        'Capacitación del personal en el uso del sistema',
        'Mantenimiento preventivo y soporte técnico',
        'Actualizaciones y mejoras del sistema',
      ]}
      whyTitle="Cada segundo cuenta en una emergencia"
      whyText={[
        'En SIFYGSA, entendemos que en situaciones de emergencia, cada segundo cuenta. Nuestros sistemas de notificación masiva están diseñados para proporcionar alertas claras y efectivas que pueden marcar la diferencia en la protección de vidas.',
        'Con nuestra experiencia y compromiso con la innovación tecnológica, ofrecemos soluciones robustas y flexibles para instalaciones industriales, campus universitarios o edificios de oficinas.',
      ]}
    />
  )
}
