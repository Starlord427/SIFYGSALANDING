import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function NotificacionEmergencias() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="container mx-auto px-4 py-16">
        <Link href="/servicios-y-productos" className="text-[#FF7420] hover:underline mb-4 inline-block">
          &larr; Volver a Servicios
        </Link>
        
        <h1 className="text-4xl font-bold mb-8 text-[#FF7420]">Notificación masiva de emergencias</h1>
        
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <Image 
              src="/servicio-notificacion.jpg" 
              alt="Notificación masiva de emergencias" 
              width={600} 
              height={400} 
              className="rounded-lg mb-4"
            />
            <p className="text-gray-300 mb-4">
              Nuestros sistemas de notificación masiva de emergencias están diseñados para proporcionar alertas rápidas y eficaces en situaciones críticas. Utilizamos tecnología avanzada para garantizar que la información vital llegue a todas las personas afectadas de manera oportuna.
            </p>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Características principales:</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Sistemas de alerta multicanal (audio, visual, móvil)</li>
              <li>Integración con sistemas de seguridad existentes</li>
              <li>Capacidad de segmentación de mensajes por zona o grupo</li>
              <li>Monitoreo en tiempo real del estado del sistema</li>
              <li>Opciones de activación manual y automática</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mb-4">Nuestros servicios incluyen:</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Evaluación de necesidades y diseño de sistemas</li>
              <li>Instalación y configuración de equipos</li>
              <li>Capacitación del personal en el uso del sistema</li>
              <li>Mantenimiento preventivo y soporte técnico</li>
              <li>Actualizaciones y mejoras del sistema</li>
            </ul>
            
            <Button className="mt-6 bg-[#FF7420] hover:bg-[#FF7420]/90">
              Solicitar una consulta
            </Button>
          </div>
        </div>
        
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">¿Por qué elegir nuestros sistemas de notificación masiva de emergencias?</h2>
          <p className="text-gray-300 mb-4">
            En SIFYGSA, entendemos que en situaciones de emergencia, cada segundo cuenta. Nuestros sistemas de notificación masiva están diseñados para proporcionar alertas claras y efectivas que pueden marcar la diferencia en la protección de vidas y propiedades.
          </p>
          <p className="text-gray-300 mb-4">
            Con nuestra experiencia en el sector y nuestro compromiso con la innovación tecnológica, ofrecemos soluciones robustas y flexibles que se adaptan a las necesidades específicas de cada cliente. Ya sea para una instalación industrial, un campus universitario o un edificio de oficinas, nuestros sistemas garantizan una comunicación eficaz en momentos críticos.
          </p>
        </div>
      </main>
    </div>
  )
}

