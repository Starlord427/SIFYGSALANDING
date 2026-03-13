// app/servicios-y-productos/deteccion-humo-incendios/page.tsx
import ServicePageTemplate from '@/components/ServicePageTemplate'

export default function DeteccionHumoIncendios() {
  return (
    <ServicePageTemplate
      title="Detección de humo y supresión de incendios"
      subtitle="Protección contra Incendios"
      imageSrc="/servicios/servicio-deteccion-humo.jpg"
      imageAlt="Detección de humo y supresión de incendios"
      category="fire_detection"
      description="Nuestros sistemas de detección de humo y supresión de incendios ofrecen una protección integral contra incendios para todo tipo de instalaciones. Utilizamos tecnología de punta para detectar y responder rápidamente a cualquier amenaza de incendio."
      features={[
        'Detectores de humo fotoeléctricos y iónicos',
        'Sistemas de rociadores automáticos',
        'Paneles de control de alarma contra incendios',
        'Sistemas de supresión con agentes limpios',
        'Sistemas de notificación de emergencia',
      ]}
      services={[
        'Diseño e instalación de sistemas personalizados',
        'Mantenimiento preventivo y correctivo',
        'Pruebas y certificaciones de sistemas',
        'Capacitación del personal en respuesta a emergencias',
        'Actualización de sistemas existentes',
      ]}
      whyTitle="Detección temprana y respuesta inmediata"
      whyText={[
        'En SIFYGSA, entendemos que la protección contra incendios es crucial para la seguridad de las personas y la preservación de activos valiosos. Nuestros sistemas están diseñados para una detección temprana y respuesta rápida.',
        'Con años de experiencia en el sector, nuestro equipo puede diseñar e implementar soluciones que cumplen con todas las normativas y estándares de seguridad aplicables.',
      ]}
    />
  )
}
