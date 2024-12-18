import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function ProteccionEquipos() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="container mx-auto px-4 py-16">
        <Link href="/servicios-y-productos" className="text-[#FF7420] hover:underline mb-4 inline-block">
          &larr; Volver a Servicios
        </Link>
        
        <h1 className="text-4xl font-bold mb-8 text-[#FF7420]">Protección de equipos e instalaciones</h1>
        
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <Image 
              src="/servicio-proteccion-equipos.jpg" 
              alt="Protección de equipos e instalaciones" 
              width={600} 
              height={400} 
              className="rounded-lg mb-4"
            />
            <p className="text-gray-300 mb-4">
              Ofrecemos sistemas integrales de protección para equipos críticos e instalaciones industriales. Nuestras soluciones están diseñadas para salvaguardar sus activos contra una variedad de riesgos, incluyendo sobretensiones, cortocircuitos, incendios y más.
            </p>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Características principales:</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Sistemas de protección contra sobretensiones</li>
              <li>Dispositivos de protección contra cortocircuitos</li>
              <li>Sistemas de monitoreo de condiciones</li>
              <li>Protección contra incendios para equipos</li>
              <li>Soluciones de seguridad física para instalaciones</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mb-4">Nuestros servicios incluyen:</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Evaluación de riesgos y vulnerabilidades</li>
              <li>Diseño e implementación de sistemas de protección</li>
              <li>Instalación de equipos de seguridad</li>
              <li>Mantenimiento preventivo y correctivo</li>
              <li>Capacitación en seguridad y respuesta a emergencias</li>
            </ul>
            
            <Button className="mt-6 bg-[#FF7420] hover:bg-[#FF7420]/90">
              Solicitar una consulta
            </Button>
          </div>
        </div>
        
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">¿Por qué elegir nuestros sistemas de protección?</h2>
          <p className="text-gray-300 mb-4">
            En SIFYGSA, comprendemos que la protección de sus equipos e instalaciones es fundamental para la continuidad y éxito de su negocio. Nuestras soluciones integrales están diseñadas para abordar múltiples aspectos de la seguridad, desde la protección eléctrica hasta la seguridad física.
          </p>
          <p className="text-gray-300 mb-4">
            Con años de experiencia en la industria, nuestro equipo de expertos puede desarrollar estrategias de protección personalizadas que se adaptan a las necesidades específicas de su operación. Confíe en SIFYGSA para mantener sus activos seguros, reducir los tiempos de inactividad y optimizar la eficiencia operativa.
          </p>
        </div>
      </main>
    </div>
  )
}

