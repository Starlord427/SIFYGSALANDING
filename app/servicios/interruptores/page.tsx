import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function Interruptores() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="container mx-auto px-4 py-16">
        <Link href="/servicios-y-productos" className="text-[#FF7420] hover:underline mb-4 inline-block">
          &larr; Volver a Servicios
        </Link>
        
        <h1 className="text-4xl font-bold mb-8 text-[#FF7420]">Interruptores</h1>
        
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <Image 
              src="/servicios/servicio-interruptores.jpg" 
              alt="Interruptores" 
              width={600} 
              height={400} 
              className="rounded-lg mb-4"
            />
            <p className="text-gray-300 mb-4">
              Ofrecemos una amplia gama de interruptores de alta calidad diseñados para sistemas eléctricos industriales. Nuestros interruptores garantizan la seguridad, confiabilidad y eficiencia en la distribución y control de energía eléctrica en entornos industriales exigentes.
            </p>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Características principales:</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Interruptores de baja, media y alta tensión</li>
              <li>Diseños robustos para entornos industriales</li>
              <li>Opciones de interruptores automáticos y manuales</li>
              <li>Tecnología de corte en vacío y SF6</li>
              <li>Sistemas de monitoreo y diagnóstico integrados</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mb-4">Nuestros servicios incluyen:</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Asesoramiento en la selección de interruptores</li>
              <li>Instalación y puesta en marcha</li>
              <li>Mantenimiento preventivo y correctivo</li>
              <li>Modernización de sistemas existentes</li>
              <li>Capacitación en operación y seguridad</li>
            </ul>
            
            <Button className="mt-6 bg-[#FF7420] hover:bg-[#FF7420]/90">
              Solicitar una consulta
            </Button>
          </div>
        </div>
        
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">¿Por qué elegir nuestros interruptores?</h2>
          <p className="text-gray-300 mb-4">
            En SIFYGSA, entendemos que los interruptores son componentes críticos en cualquier sistema eléctrico industrial. Nuestros productos están diseñados para ofrecer la máxima protección, confiabilidad y eficiencia, cumpliendo con los estándares más exigentes de la industria.
          </p>
          <p className="text-gray-300 mb-4">
            Con nuestra amplia experiencia y conocimiento técnico, podemos proporcionar soluciones personalizadas que se adaptan a las necesidades específicas de cada cliente. Confíe en SIFYGSA para mantener sus sistemas eléctricos seguros y eficientes, minimizando los tiempos de inactividad y maximizando la productividad.
          </p>
        </div>
      </main>
    </div>
  )
}

