// app/servicios-y-productos/proteccion-equipos/page.tsx
import ServicePageTemplate from '@/components/ServicePageTemplate'

export default function ProteccionEquipos() {
  return (
    <ServicePageTemplate
      title="Protección de equipos e instalaciones"
      subtitle="Protección Industrial"
      imageSrc="/servicios/servicio-proteccion-equipos.jpg"
      imageAlt="Protección de equipos e instalaciones"
      categoryKeyword="equipment_protection"
      description="Ofrecemos sistemas integrales de protección para equipos críticos e instalaciones industriales. Nuestras soluciones están diseñadas para salvaguardar sus activos contra una variedad de riesgos, incluyendo sobretensiones, cortocircuitos, incendios y más."
      features={[
        'Sistemas de protección contra sobretensiones',
        'Dispositivos de protección contra cortocircuitos',
        'Sistemas de monitoreo de condiciones',
        'Protección contra incendios para equipos',
        'Soluciones de seguridad física para instalaciones',
      ]}
      services={[
        'Evaluación de riesgos y vulnerabilidades',
        'Diseño e implementación de sistemas de protección',
        'Instalación de equipos de seguridad',
        'Mantenimiento preventivo y correctivo',
        'Capacitación en seguridad y respuesta a emergencias',
      ]}
      whyTitle="Proteja sus activos y garantice la continuidad"
      whyText={[
        'En SIFYGSA, comprendemos que la protección de sus equipos e instalaciones es fundamental para la continuidad y éxito de su negocio. Nuestras soluciones integrales abordan múltiples aspectos de la seguridad.',
        'Con años de experiencia en la industria, nuestro equipo puede desarrollar estrategias de protección personalizadas que reducen tiempos de inactividad y optimizan la eficiencia operativa.',
      ]}
    />
  )
}
