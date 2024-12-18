import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function CompresionAire() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="container mx-auto px-4 py-16">
        <Link href="/servicios-y-productos" className="text-[#FF7420] hover:underline mb-4 inline-block">
          &larr; Volver a Servicios
        </Link>
        
        <h1 className="text-4xl font-bold mb-8 text-[#FF7420]">Compresión de aire</h1>
        
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <Image 
              src="/servicio-compresion-aire.jpg" 
              alt="Compresión de aire" 
              width={600} 
              height={400} 
              className="rounded-lg mb-4"
            />
            <p className="text-gray-300 mb-4">
              Nuestros sistemas de compresión de aire ofrecen soluciones eficientes y confiables para una amplia gama de aplicaciones industriales. Diseñados para proporcionar un suministro constante de aire comprimido de alta calidad, nuestros sistemas mejoran la productividad y reducen los costos operativos.
            </p>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Características principales:</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Compresores de aire de última generación</li>
              <li>Sistemas de filtración y secado integrados</li>
              <li>Control inteligente y monitoreo remoto</li>
              <li>Opciones de recuperación de calor</li>
              <li>Diseños de bajo consumo energético</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mb-4">Nuestros servicios incluyen:</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Análisis de demanda y diseño de sistemas</li>
              <li>Instalación y puesta en marcha</li>
              <li>Mantenimiento preventivo y predictivo</li>
              <li>Auditorías de eficiencia energética</li>
              <li>Suministro de repuestos y consumibles</li>
            </ul>
            
            <Button className="mt-6 bg-[#FF7420] hover:bg-[#FF7420]/90">
              Solicitar una consulta
            </Button>
          </div>
        </div>
        
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">¿Por qué elegir nuestros sistemas de compresión de aire?</h2>
          <p className="text-gray-300 mb-4">
            En SIFYGSA, entendemos que el aire comprimido es una utilidad crítica en muchos procesos industriales. Nuestros sistemas están diseñados para proporcionar un rendimiento óptimo, maximizando la eficiencia energética y minimizando los tiempos de inactividad.
          </p>
          <p className="text-gray-300 mb-4">
            Con décadas de experiencia en el sector, ofrecemos soluciones personalizadas que se adaptan a las necesidades específicas de cada cliente. Desde pequeñas instalaciones hasta grandes complejos industriales, SIFYGSA tiene la experiencia y la tecnología para garantizar un suministro de aire comprimido confiable y eficiente.
          </p>
        </div>
      </main>
    </div>
  )
}

