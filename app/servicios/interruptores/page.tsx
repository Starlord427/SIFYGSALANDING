// app/servicios-y-productos/interruptores/page.tsx
import ServicePageTemplate from '@/components/ServicePageTemplate'

export default function Interruptores() {
  return (
    <ServicePageTemplate
      title="Interruptores"
      subtitle="Protección Eléctrica"
      imageSrc="/servicios/servicio-interruptores.jpg"
      imageAlt="Interruptores industriales"
      category="switches"
      description="Ofrecemos una amplia gama de interruptores de alta calidad diseñados para sistemas eléctricos industriales. Nuestros interruptores garantizan la seguridad, confiabilidad y eficiencia en la distribución y control de energía eléctrica en entornos industriales exigentes."
      features={[
        'Interruptores de baja, media y alta tensión',
        'Diseños robustos para entornos industriales',
        'Opciones de interruptores automáticos y manuales',
        'Tecnología de corte en vacío y SF6',
        'Sistemas de monitoreo y diagnóstico integrados',
      ]}
      services={[
        'Asesoramiento en la selección de interruptores',
        'Instalación y puesta en marcha',
        'Mantenimiento preventivo y correctivo',
        'Modernización de sistemas existentes',
        'Capacitación en operación y seguridad',
      ]}
      whyTitle="Protección y confiabilidad en sistemas eléctricos"
      whyText={[
        'En SIFYGSA, entendemos que los interruptores son componentes críticos en cualquier sistema eléctrico industrial. Nuestros productos están diseñados para ofrecer la máxima protección, confiabilidad y eficiencia.',
        'Con nuestra amplia experiencia y conocimiento técnico, proporcionamos soluciones personalizadas que minimizan los tiempos de inactividad y maximizan la productividad.',
      ]}
    />
  )
}
