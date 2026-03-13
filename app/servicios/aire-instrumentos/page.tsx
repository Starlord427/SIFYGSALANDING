// app/servicios-y-productos/aire-instrumentos/page.tsx
import ServicePageTemplate from '@/components/ServicePageTemplate'

export default function AireInstrumentos() {
  return (
    <ServicePageTemplate
      title="Sistemas de aire para instrumentos"
      subtitle="Aire Industrial"
      imageSrc="/servicios/servicio-aire-instrumentos.jpg"
      imageAlt="Sistemas de aire para instrumentos"
      category="instrument_air"
      description="Nuestros sistemas de aire para instrumentos proporcionan soluciones especializadas de aire comprimido limpio, seco y estable para aplicaciones críticas en instrumentación y control industrial. Diseñados para garantizar la máxima fiabilidad y precisión en entornos industriales exigentes."
      features={[
        'Sistemas de filtración de alta eficiencia',
        'Secadores de aire de punto de rocío bajo',
        'Reguladores de presión de precisión',
        'Monitoreo continuo de calidad del aire',
        'Diseño redundante para operación ininterrumpida',
      ]}
      services={[
        'Evaluación de necesidades y diseño de sistemas',
        'Instalación y puesta en marcha',
        'Mantenimiento preventivo y calibración',
        'Auditorías de calidad de aire para instrumentos',
        'Modernización de sistemas existentes',
      ]}
      whyTitle="Calidad y precisión garantizada para sus instrumentos"
      whyText={[
        'En SIFYGSA, entendemos que el aire de instrumentos es crucial para el funcionamiento preciso y confiable de sistemas de control y medición en entornos industriales. Nuestras soluciones están diseñadas para cumplir con los estándares más estrictos de calidad y pureza del aire.',
        'Con años de experiencia en el sector, ofrecemos sistemas personalizados que se adaptan a las necesidades específicas de cada cliente, desde pequeñas instalaciones hasta grandes complejos industriales.',
      ]}
    />
  )
}
