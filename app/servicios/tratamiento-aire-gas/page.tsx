// app/servicios-y-productos/tratamiento-aire-gas/page.tsx
import ServicePageTemplate from '@/components/ServicePageTemplate'

export default function TratamientoAireGas() {
  return (
    <ServicePageTemplate
      title="Tratamiento de aire y gas"
      subtitle="Calidad del Aire"
      imageSrc="/servicios/servicio-tratamiento-aire.jpg"
      imageAlt="Tratamiento de aire y gas"
      categoryKeyword="air_gas_treatment"
      description="Nuestras soluciones de tratamiento de aire y gas ofrecen tecnologías avanzadas para la purificación y procesamiento de aire y gases industriales. Diseñadas para mejorar la calidad del aire, aumentar la eficiencia y cumplir con las normativas ambientales más estrictas."
      features={[
        'Sistemas de filtración de alta eficiencia',
        'Tecnologías de adsorción y absorción',
        'Procesos de separación de gases',
        'Sistemas de recuperación de calor',
        'Monitoreo y control automatizado',
      ]}
      services={[
        'Evaluación y diseño de sistemas personalizados',
        'Instalación y puesta en marcha de equipos',
        'Optimización de procesos existentes',
        'Mantenimiento preventivo y correctivo',
        'Capacitación en operación y mantenimiento',
      ]}
      whyTitle="Calidad del aire al más alto nivel"
      whyText={[
        'En SIFYGSA, nos comprometemos a proporcionar soluciones de tratamiento de aire y gas que no solo cumplen con los estándares actuales, sino que también anticipan las necesidades futuras.',
        'Con un equipo de expertos altamente capacitados y tecnología de vanguardia, garantizamos soluciones eficientes y duraderas adaptadas a las necesidades específicas de cada cliente.',
      ]}
    />
  )
}
