import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function IntercomunicacionVoceo() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="container mx-auto px-4 py-16">
        <Link href="/servicios-y-productos" className="text-[#FF7420] hover:underline mb-4 inline-block">
          &larr; Volver a Servicios
        </Link>
        
        <h1 className="text-4xl font-bold mb-8 text-[#FF7420]">Intercomunicación y voceo</h1>
        
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <Image 
              src="/servicios/servicio-intercomunicacion.jpg" 
              alt="Intercomunicación y voceo" 
              width={600} 
              height={400} 
              className="rounded-lg mb-4"
            />
            <p className="text-gray-300 mb-4">
              Nuestros sistemas de intercomunicación y voceo proporcionan una comunicación clara y eficiente en entornos industriales y comerciales. Diseñados para mejorar la coordinación y seguridad en las instalaciones, estos sistemas son fundamentales para una operación fluida y segura.
            </p>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Características principales:</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Comunicación bidireccional de alta calidad</li>
              <li>Sistemas escalables para adaptarse a cualquier tamaño de instalación</li>
              <li>Integración con sistemas de seguridad y emergencia</li>
              <li>Zonificación para mensajes dirigidos</li>
              <li>Opciones de voceo general y selectivo</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mb-4">Nuestros servicios incluyen:</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Diseño personalizado de sistemas de intercomunicación</li>
              <li>Instalación y configuración de equipos</li>
              <li>Integración con sistemas existentes</li>
              <li>Capacitación del personal en el uso del sistema</li>
              <li>Mantenimiento preventivo y soporte técnico</li>
            </ul>
            
            <Button className="mt-6 bg-[#FF7420] hover:bg-[#FF7420]/90">
              Solicitar una consulta
            </Button>
          </div>
        </div>
        
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">¿Por qué elegir nuestros sistemas de intercomunicación y voceo?</h2>
          <p className="text-gray-300 mb-4">
            En SIFYGSA, entendemos que la comunicación efectiva es crucial para la seguridad y eficiencia operativa. Nuestros sistemas de intercomunicación y voceo están diseñados para proporcionar claridad y confiabilidad en entornos desafiantes, desde plantas industriales hasta grandes complejos comerciales.
          </p>
          <p className="text-gray-300 mb-4">
            Con nuestra experiencia y tecnología de vanguardia, garantizamos sistemas que no solo cumplen con las necesidades actuales de comunicación, sino que también son lo suficientemente flexibles para adaptarse a futuras expansiones y actualizaciones. Confíe en SIFYGSA para mantener su equipo conectado y seguro.
          </p>
        </div>
      </main>
    </div>
  )
}

