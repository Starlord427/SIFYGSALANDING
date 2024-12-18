import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function ProteccionCaidas() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="container mx-auto px-4 py-16">
        <Link href="/servicios-y-productos" className="text-[#FF7420] hover:underline mb-4 inline-block">
          &larr; Volver a Servicios
        </Link>
        
        <h1 className="text-4xl font-bold mb-8 text-[#FF7420]">Sistemas de protección contra caídas</h1>
        
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <div className="relative w-full aspect-video mb-4">
              <Image 
                src="/servicio-proteccion-caidas.jpg" 
                alt="Sistemas de protección contra caídas" 
                width={600} 
                height={400} 
                className="rounded-lg mb-4 w-full h-auto object-cover aspect-video"
                priority
              />
            </div>
            <p className="text-gray-300 mb-4">
              Nuestros sistemas de protección contra caídas están diseñados para garantizar la seguridad del personal que trabaja en alturas. Ofrecemos soluciones integrales que cumplen con las normativas más estrictas de seguridad laboral.
            </p>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Características principales:</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Equipos de protección personal de alta calidad</li>
              <li>Sistemas de anclaje fijos y portátiles</li>
              <li>Líneas de vida horizontales y verticales</li>
              <li>Arneses de cuerpo completo ergonómicos</li>
              <li>Dispositivos de detención de caídas</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mb-4">Nuestros servicios incluyen:</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Evaluación de riesgos en el lugar de trabajo</li>
              <li>Diseño e instalación de sistemas personalizados</li>
              <li>Capacitación en el uso correcto de equipos</li>
              <li>Inspección y mantenimiento periódico</li>
              <li>Asesoría en cumplimiento normativo</li>
            </ul>
            
            <Button className="mt-6 bg-[#FF7420] hover:bg-[#FF7420]/90">
              Solicitar una consulta
            </Button>
          </div>
        </div>
        
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">¿Por qué elegir nuestros sistemas de protección contra caídas?</h2>
          <p className="text-gray-300 mb-4">
            En SIFYGSA, entendemos que la seguridad de los trabajadores es primordial. Nuestros sistemas de protección contra caídas no solo cumplen con los estándares internacionales, sino que también se adaptan a las necesidades específicas de cada cliente y entorno de trabajo.
          </p>
          <p className="text-gray-300 mb-4">
            Con años de experiencia en el sector, nuestro equipo de expertos puede proporcionar soluciones integrales que van desde la evaluación inicial de riesgos hasta la implementación y mantenimiento continuo de los sistemas. Nos comprometemos a proporcionar la máxima seguridad y tranquilidad a nuestros clientes.
          </p>
        </div>
      </main>
    </div>
  )
}

