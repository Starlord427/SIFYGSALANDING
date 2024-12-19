import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function DeteccionHumoIncendios() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="container mx-auto px-4 py-16">
        <Link href="/servicios-y-productos" className="text-[#FF7420] hover:underline mb-4 inline-block">
          &larr; Volver a Servicios
        </Link>
        
        <h1 className="text-4xl font-bold mb-8 text-[#FF7420]">Detección de humo y supresión de incendios</h1>
        
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <Image 
              src="/servicio-deteccion-humo.jpg" 
              alt="Detección de humo y supresión de incendios" 
              width={600} 
              height={400} 
              className="rounded-lg mb-4"
            />
            <p className="text-gray-300 mb-4">
              Nuestros sistemas de detección de humo y supresión de incendios ofrecen una protección integral contra incendios para todo tipo de instalaciones. Utilizamos tecnología de punta para detectar y responder rápidamente a cualquier amenaza de incendio.
            </p>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Características principales:</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Detectores de humo fotoeléctricos y iónicos</li>
              <li>Sistemas de rociadores automáticos</li>
              <li>Paneles de control de alarma contra incendios</li>
              <li>Sistemas de supresión de incendios con agentes limpios</li>
              <li>Sistemas de notificación de emergencia</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mb-4">Nuestros servicios incluyen:</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Diseño e instalación de sistemas personalizados</li>
              <li>Mantenimiento preventivo y correctivo</li>
              <li>Pruebas y certificaciones de sistemas</li>
              <li>Capacitación del personal en respuesta a emergencias</li>
              <li>Actualización de sistemas existentes</li>
            </ul>
            
            <Button className="mt-6 bg-[#FF7420] hover:bg-[#FF7420]/90">
              Solicitar una consulta
            </Button>
          </div>
        </div>
        
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">¿Por qué elegir nuestros sistemas de detección de humo y supresión de incendios?</h2>
          <p className="text-gray-300 mb-4">
            En SIFYGSA, entendemos que la protección contra incendios es crucial para la seguridad de las personas y la preservación de activos valiosos. Nuestros sistemas están diseñados para proporcionar una detección temprana y una respuesta rápida, minimizando los daños potenciales y salvando vidas.
          </p>
          <p className="text-gray-300 mb-4">
            Con años de experiencia en el sector, nuestro equipo de expertos puede diseñar e implementar soluciones que se adaptan perfectamente a las necesidades específicas de cada cliente, cumpliendo con todas las normativas y estándares de seguridad aplicables. Nos comprometemos a proporcionar sistemas confiables y eficaces que ofrezcan tranquilidad a nuestros clientes.
          </p>
        </div>
      </main>
    </div>
  )
}

