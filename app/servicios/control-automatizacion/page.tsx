import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function ControlAutomatizacion() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="container mx-auto px-4 py-16">
        <Link href="/servicios-y-productos" className="text-[#FF7420] hover:underline mb-4 inline-block">
          &larr; Volver a Servicios
        </Link>
        
        <h1 className="text-4xl font-bold mb-8 text-[#FF7420]">Control y automatización</h1>
        
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <Image 
              src="/servicios/servicio-automatizacion.jpg" 
              alt="Control y automatización" 
              width={600} 
              height={400} 
              className="rounded-lg mb-4"
            />
            <p className="text-gray-300 mb-4">
              Nuestros servicios de control y automatización están diseñados para optimizar los procesos industriales, aumentar la eficiencia y reducir los costos operativos. Implementamos soluciones de vanguardia adaptadas a las necesidades específicas de cada cliente.
            </p>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Características principales:</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Sistemas de control distribuido (DCS)</li>
              <li>Controladores lógicos programables (PLC)</li>
              <li>Interfaces hombre-máquina (HMI)</li>
              <li>Sistemas SCADA</li>
              <li>Redes industriales y comunicación de datos</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mb-4">Nuestros servicios incluyen:</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Diseño e implementación de sistemas de control</li>
              <li>Programación de PLC y HMI</li>
              <li>Integración de sistemas existentes</li>
              <li>Optimización de procesos industriales</li>
              <li>Mantenimiento preventivo y correctivo</li>
            </ul>
            
            <Button className="mt-6 bg-[#FF7420] hover:bg-[#FF7420]/90">
              Solicitar una consulta
            </Button>
          </div>
        </div>
        
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">¿Por qué elegir nuestros servicios de control y automatización?</h2>
          <p className="text-gray-300 mb-4">
            En SIFYGSA, nos especializamos en proporcionar soluciones de control y automatización de última generación que impulsan la eficiencia y productividad de las operaciones industriales. Nuestro equipo de ingenieros altamente calificados tiene una amplia experiencia en la implementación de sistemas complejos en diversos sectores industriales.
          </p>
          <p className="text-gray-300 mb-4">
            Nos enfocamos en entender las necesidades específicas de cada cliente para diseñar soluciones personalizadas que no solo resuelven los desafíos actuales, sino que también preparan a las empresas para el futuro. Con nuestros servicios, los clientes pueden esperar una mejora significativa en la eficiencia operativa, reducción de tiempos de inactividad y un mejor control sobre sus procesos de producción.
          </p>
        </div>
      </main>
    </div>
  )
}

