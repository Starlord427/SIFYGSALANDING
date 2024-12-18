import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function TratamientoAireGas() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="container mx-auto px-4 py-16">
        <Link href="/servicios-y-productos" className="text-[#FF7420] hover:underline mb-4 inline-block">
          &larr; Volver a Servicios
        </Link>
        
        <h1 className="text-4xl font-bold mb-8 text-[#FF7420]">Tratamiento de aire y gas</h1>
        
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <Image 
              src="/servicio-tratamiento-aire.jpg" 
              alt="Tratamiento de aire y gas" 
              width={600} 
              height={400} 
              className="rounded-lg mb-4"
            />
            <p className="text-gray-300 mb-4">
              Nuestras soluciones de tratamiento de aire y gas ofrecen tecnologías avanzadas para la purificación y procesamiento de aire y gases industriales. Diseñadas para mejorar la calidad del aire, aumentar la eficiencia de los procesos y cumplir con las normativas ambientales más estrictas.
            </p>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Características principales:</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Sistemas de filtración de alta eficiencia</li>
              <li>Tecnologías de adsorción y absorción</li>
              <li>Procesos de separación de gases</li>
              <li>Sistemas de recuperación de calor</li>
              <li>Monitoreo y control automatizado</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mb-4">Nuestros servicios incluyen:</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Evaluación y diseño de sistemas personalizados</li>
              <li>Instalación y puesta en marcha de equipos</li>
              <li>Optimización de procesos existentes</li>
              <li>Mantenimiento preventivo y correctivo</li>
              <li>Capacitación en operación y mantenimiento</li>
            </ul>
            
            <Button className="mt-6 bg-[#FF7420] hover:bg-[#FF7420]/90">
              Solicitar una consulta
            </Button>
          </div>
        </div>
        
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">¿Por qué elegir nuestras soluciones de tratamiento de aire y gas?</h2>
          <p className="text-gray-300 mb-4">
            En SIFYGSA, nos comprometemos a proporcionar soluciones de tratamiento de aire y gas que no solo cumplen con los estándares actuales, sino que también anticipan las necesidades futuras. Nuestros sistemas están diseñados para optimizar los procesos industriales, reducir los costos operativos y minimizar el impacto ambiental.
          </p>
          <p className="text-gray-300 mb-4">
            Con un equipo de expertos altamente capacitados y tecnología de vanguardia, garantizamos soluciones eficientes y duraderas que se adaptan a las necesidades específicas de cada cliente. Confíe en SIFYGSA para mantener la calidad del aire y la eficiencia de sus procesos en los más altos niveles.
          </p>
        </div>
      </main>
    </div>
  )
}

