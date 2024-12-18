import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function AireInstrumentos() {
return (
  <div className="min-h-screen bg-black text-white">
    <main className="container mx-auto px-4 py-16">
      <Link href="/servicios-y-productos" className="text-[#FF7420] hover:underline mb-4 inline-block">
        &larr; Volver a Servicios
      </Link>
      
      <h1 className="text-4xl font-bold mb-8 text-[#FF7420]">Sistemas de aire para instrumentos</h1>
      
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div>
          <Image 
            src="/servicio-aire-instrumentos.jpg" 
            alt="Sistemas de aire para instrumentos" 
            width={600} 
            height={400} 
            className="rounded-lg mb-4"
          />
          <p className="text-gray-300 mb-4">
            Nuestros sistemas de aire para instrumentos proporcionan soluciones especializadas de aire comprimido limpio, seco y estable para aplicaciones críticas en instrumentación y control industrial. Diseñados para garantizar la máxima fiabilidad y precisión en entornos industriales exigentes.
          </p>
        </div>
        
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold mb-4">Características principales:</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Sistemas de filtración de alta eficiencia</li>
            <li>Secadores de aire de punto de rocío bajo</li>
            <li>Reguladores de presión de precisión</li>
            <li>Monitoreo continuo de calidad del aire</li>
            <li>Diseño redundante para operación ininterrumpida</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mb-4">Nuestros servicios incluyen:</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Evaluación de necesidades y diseño de sistemas</li>
            <li>Instalación y puesta en marcha</li>
            <li>Mantenimiento preventivo y calibración</li>
            <li>Auditorías de calidad de aire para instrumentos</li>
            <li>Modernización de sistemas existentes</li>
          </ul>
          
          <Button className="mt-6 bg-[#FF7420] hover:bg-[#FF7420]/90">
            Solicitar una consulta
          </Button>
        </div>
      </div>
      
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">¿Por qué elegir nuestros sistemas de aire para instrumentos?</h2>
        <p className="text-gray-300 mb-4">
          En SIFYGSA, entendemos que el aire de instrumentos es crucial para el funcionamiento preciso y confiable de sistemas de control y medición en entornos industriales. Nuestras soluciones están diseñadas para cumplir con los estándares más estrictos de calidad y pureza del aire, garantizando el rendimiento óptimo de sus instrumentos y sistemas de control.
        </p>
        <p className="text-gray-300 mb-4">
          Con años de experiencia en el sector, ofrecemos sistemas personalizados que se adaptan a las necesidades específicas de cada cliente, desde pequeñas instalaciones hasta grandes complejos industriales. Confíe en SIFYGSA para mantener sus instrumentos y sistemas de control funcionando con la máxima precisión y confiabilidad.
        </p>
      </div>
    </main>
  </div>
)
}

