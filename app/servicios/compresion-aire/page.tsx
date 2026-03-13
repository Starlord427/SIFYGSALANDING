// app/servicios-y-productos/compresion-aire/page.tsx
import ServicePageTemplate from '@/components/ServicePageTemplate'

export default function CompresionAire() {
  return (
    <ServicePageTemplate
      title="Compresión de aire"
      subtitle="Sistemas de Compresión"
      imageSrc="/servicios/servicio-compresion-aire.jpg"
      imageAlt="Compresión de aire"
      categoryKeyword="air_compression"
      description="Nuestros sistemas de compresión de aire ofrecen soluciones eficientes y confiables para una amplia gama de aplicaciones industriales. Diseñados para proporcionar un suministro constante de aire comprimido de alta calidad, mejorando la productividad y reduciendo los costos operativos."
      features={[
        'Compresores de aire de última generación',
        'Sistemas de filtración y secado integrados',
        'Control inteligente y monitoreo remoto',
        'Opciones de recuperación de calor',
        'Diseños de bajo consumo energético',
      ]}
      services={[
        'Análisis de demanda y diseño de sistemas',
        'Instalación y puesta en marcha',
        'Mantenimiento preventivo y predictivo',
        'Auditorías de eficiencia energética',
        'Suministro de repuestos y consumibles',
      ]}
      whyTitle="Eficiencia energética y confiabilidad superior"
      whyText={[
        'En SIFYGSA, entendemos que el aire comprimido es una utilidad crítica en muchos procesos industriales. Nuestros sistemas están diseñados para proporcionar un rendimiento óptimo, maximizando la eficiencia energética y minimizando los tiempos de inactividad.',
        'Con décadas de experiencia en el sector, ofrecemos soluciones personalizadas que se adaptan a las necesidades específicas de cada cliente, garantizando un suministro de aire comprimido confiable y eficiente.',
      ]}
    />
  )
}
