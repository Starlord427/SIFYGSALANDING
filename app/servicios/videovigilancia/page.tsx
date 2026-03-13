// app/servicios-y-productos/videovigilancia/page.tsx
import ServicePageTemplate from '@/components/ServicePageTemplate'

export default function Videovigilancia() {
  return (
    <ServicePageTemplate
      title="Sistemas de videovigilancia"
      subtitle="Videovigilancia"
      imageSrc="/servicios/servicio-videovigilancia.jpg"
      imageAlt="Sistemas de videovigilancia"
      categoryKeyword="video_surveillance"
      description="Ofrecemos sistemas de videovigilancia de última generación diseñados para mejorar la seguridad en sus instalaciones. Nuestras soluciones proporcionan monitoreo en tiempo real, análisis de video avanzado y almacenamiento seguro de datos para una protección integral."
      features={[
        'Cámaras de alta resolución para interiores y exteriores',
        'Tecnología de visión nocturna y térmica',
        'Análisis de video con inteligencia artificial',
        'Almacenamiento en la nube y local',
        'Integración con sistemas de control de acceso',
      ]}
      services={[
        'Diseño personalizado de sistemas de videovigilancia',
        'Instalación y configuración de equipos',
        'Mantenimiento preventivo y soporte técnico',
        'Capacitación en el uso del sistema',
        'Actualizaciones y mejoras del sistema',
      ]}
      whyTitle="Seguridad visual 24/7 para sus instalaciones"
      whyText={[
        'En SIFYGSA, entendemos que la seguridad visual es crucial para proteger sus activos y personal. Nuestros sistemas combinan tecnología de punta con implementación experta para una solución robusta y escalable.',
        'Con nuestra experiencia en el sector industrial, diseñamos e implementamos sistemas que se adaptan a cualquier entorno, desde pequeñas instalaciones hasta grandes complejos industriales.',
      ]}
    />
  )
}
