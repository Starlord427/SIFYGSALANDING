// app/servicios-y-productos/intercomunicacion-voceo/page.tsx
import ServicePageTemplate from '@/components/ServicePageTemplate'

export default function IntercomunicacionVoceo() {
  return (
    <ServicePageTemplate
      title="Intercomunicación y voceo"
      subtitle="Comunicación Industrial"
      imageSrc="/servicios/servicio-intercomunicacion.jpg"
      imageAlt="Intercomunicación y voceo"
      categoryKeyword="intercom_paging"
      description="Nuestros sistemas de intercomunicación y voceo proporcionan una comunicación clara y eficiente en entornos industriales y comerciales. Diseñados para mejorar la coordinación y seguridad en las instalaciones, son fundamentales para una operación fluida y segura."
      features={[
        'Comunicación bidireccional de alta calidad',
        'Sistemas escalables para cualquier tamaño de instalación',
        'Integración con sistemas de seguridad y emergencia',
        'Zonificación para mensajes dirigidos',
        'Opciones de voceo general y selectivo',
      ]}
      services={[
        'Diseño personalizado de sistemas de intercomunicación',
        'Instalación y configuración de equipos',
        'Integración con sistemas existentes',
        'Capacitación del personal en el uso del sistema',
        'Mantenimiento preventivo y soporte técnico',
      ]}
      whyTitle="Comunicación efectiva en entornos exigentes"
      whyText={[
        'En SIFYGSA, entendemos que la comunicación efectiva es crucial para la seguridad y eficiencia operativa. Nuestros sistemas están diseñados para proporcionar claridad y confiabilidad en entornos desafiantes.',
        'Con nuestra experiencia y tecnología de vanguardia, garantizamos sistemas flexibles que se adaptan a futuras expansiones y actualizaciones para mantener su equipo conectado y seguro.',
      ]}
    />
  )
}
