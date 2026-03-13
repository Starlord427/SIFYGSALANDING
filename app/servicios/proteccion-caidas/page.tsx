// app/servicios-y-productos/proteccion-caidas/page.tsx
import ServicePageTemplate from '@/components/ServicePageTemplate'

export default function ProteccionCaidas() {
  return (
    <ServicePageTemplate
      title="Sistemas de protección contra caídas"
      subtitle="Seguridad en Alturas"
      imageSrc="/servicios/servicio-proteccion-caidas.jpg"
      imageAlt="Sistemas de protección contra caídas"
      category="fall_protection"
      description="Nuestros sistemas de protección contra caídas están diseñados para garantizar la seguridad del personal que trabaja en alturas. Ofrecemos soluciones integrales que cumplen con las normativas más estrictas de seguridad laboral."
      features={[
        'Equipos de protección personal de alta calidad',
        'Sistemas de anclaje fijos y portátiles',
        'Líneas de vida horizontales y verticales',
        'Arneses de cuerpo completo ergonómicos',
        'Dispositivos de detención de caídas',
      ]}
      services={[
        'Evaluación de riesgos en el lugar de trabajo',
        'Diseño e instalación de sistemas personalizados',
        'Capacitación en el uso correcto de equipos',
        'Inspección y mantenimiento periódico',
        'Asesoría en cumplimiento normativo',
      ]}
      whyTitle="La seguridad de su personal es nuestra prioridad"
      whyText={[
        'En SIFYGSA, entendemos que la seguridad de los trabajadores es primordial. Nuestros sistemas de protección contra caídas no solo cumplen con los estándares internacionales, sino que también se adaptan a las necesidades específicas de cada entorno.',
        'Con años de experiencia en el sector, nuestro equipo puede proporcionar soluciones integrales que van desde la evaluación inicial de riesgos hasta la implementación y mantenimiento continuo de los sistemas.',
      ]}
    />
  )
}
