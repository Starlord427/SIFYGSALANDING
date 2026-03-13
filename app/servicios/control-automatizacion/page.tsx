// app/servicios-y-productos/control-automatizacion/page.tsx
import ServicePageTemplate from '@/components/ServicePageTemplate'

export default function ControlAutomatizacion() {
  return (
    <ServicePageTemplate
      title="Control y automatización"
      subtitle="Automatización Industrial"
      imageSrc="/servicios/servicio-automatizacion.jpg"
      imageAlt="Control y automatización"
      category="automation"
      description="Nuestros servicios de control y automatización están diseñados para optimizar los procesos industriales, aumentar la eficiencia y reducir los costos operativos. Implementamos soluciones de vanguardia adaptadas a las necesidades específicas de cada cliente."
      features={[
        'Sistemas de control distribuido (DCS)',
        'Controladores lógicos programables (PLC)',
        'Interfaces hombre-máquina (HMI)',
        'Sistemas SCADA',
        'Redes industriales y comunicación de datos',
      ]}
      services={[
        'Diseño e implementación de sistemas de control',
        'Programación de PLC y HMI',
        'Integración de sistemas existentes',
        'Optimización de procesos industriales',
        'Mantenimiento preventivo y correctivo',
      ]}
      whyTitle="Tecnología de vanguardia para sus procesos"
      whyText={[
        'En SIFYGSA, nos especializamos en proporcionar soluciones de control y automatización de última generación que impulsan la eficiencia y productividad de las operaciones industriales.',
        'Nos enfocamos en entender las necesidades específicas de cada cliente para diseñar soluciones personalizadas que no solo resuelven los desafíos actuales, sino que también preparan a las empresas para el futuro.',
      ]}
    />
  )
}
