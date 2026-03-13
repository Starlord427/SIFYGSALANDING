// app/servicios-y-productos/deteccion-gas-flama/page.tsx
import ServicePageTemplate from '@/components/ServicePageTemplate'

export default function DeteccionGasFlama() {
  return (
    <ServicePageTemplate
      title="Detección fija de gas y flama"
      subtitle="Seguridad Industrial"
      imageSrc="/servicios/servicio-deteccion.jpg"
      imageAlt="Detección fija de gas y flama"
      category="gas_detection"
      description="Nuestros sistemas de detección fija de gas y flama ofrecen una solución completa para la seguridad industrial. Utilizamos tecnología de punta para detectar una amplia gama de gases tóxicos y combustibles, así como llamas, en tiempo real."
      features={[
        'Detección temprana de gases peligrosos y fuego',
        'Monitoreo continuo 24/7',
        'Alertas en tiempo real',
        'Integración con sistemas de seguridad existentes',
        'Cumplimiento con normativas de seguridad industrial',
      ]}
      services={[
        'Evaluación de riesgos y diseño de sistemas personalizados',
        'Instalación profesional de detectores y unidades de control',
        'Calibración y mantenimiento periódico',
        'Capacitación para el personal en el uso del sistema',
        'Soporte técnico y servicio de emergencia 24/7',
      ]}
      whyTitle="Protección máxima para personas y activos"
      whyText={[
        'Nuestros sistemas están diseñados para proporcionar la máxima seguridad en entornos industriales desafiantes. Con años de experiencia en el sector, ofrecemos soluciones robustas y confiables que ayudan a prevenir accidentes y proteger vidas.',
        'Trabajamos con las mejores marcas y tecnologías del mercado, asegurando que nuestros clientes reciban sistemas de última generación que cumplen con los más altos estándares de seguridad.',
      ]}
    />
  )
}
