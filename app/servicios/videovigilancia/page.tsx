import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function Videovigilancia() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="container mx-auto px-4 py-16">
        <Link href="/servicios-y-productos" className="text-[#FF7420] hover:underline mb-4 inline-block">
          &larr; Volver a Servicios
        </Link>
        
        <h1 className="text-4xl font-bold mb-8 text-[#FF7420]">Sistemas de videovigilancia</h1>
        
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <Image 
              src="/servicio-videovigilancia.jpg" 
              alt="Sistemas de videovigilancia" 
              width={600} 
              height={400} 
              className="rounded-lg mb-4"
            />
            <p className="text-gray-300 mb-4">
              Ofrecemos sistemas de videovigilancia de última generación diseñados para mejorar la seguridad en sus instalaciones. Nuestras soluciones proporcionan monitoreo en tiempo real, análisis de video avanzado y almacenamiento seguro de datos para una protección integral.
            </p>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Características principales:</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Cámaras de alta resolución para interiores y exteriores</li>
              <li>Tecnología de visión nocturna y térmica</li>
              <li>Análisis de video con inteligencia artificial</li>
              <li>Almacenamiento en la nube y local</li>
              <li>Integración con sistemas de control de acceso</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mb-4">Nuestros servicios incluyen:</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Diseño personalizado de sistemas de videovigilancia</li>
              <li>Instalación y configuración de equipos</li>
              <li>Mantenimiento preventivo y soporte técnico</li>
              <li>Capacitación en el uso del sistema</li>
              <li>Actualizaciones y mejoras del sistema</li>
            </ul>
            
            <Button className="mt-6 bg-[#FF7420] hover:bg-[#FF7420]/90">
              Solicitar una consulta
            </Button>
          </div>
        </div>
        
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">¿Por qué elegir nuestros sistemas de videovigilancia?</h2>
          <p className="text-gray-300 mb-4">
            En SIFYGSA, entendemos que la seguridad visual es crucial para proteger sus activos y personal. Nuestros sistemas de videovigilancia combinan tecnología de punta con una implementación experta para proporcionar una solución de seguridad robusta y escalable.
          </p>
          <p className="text-gray-300 mb-4">
            Con nuestra experiencia en el sector industrial, podemos diseñar e implementar sistemas que se adaptan a las necesidades específicas de su entorno, ya sea una pequeña instalación o un gran complejo industrial. Confíe en SIFYGSA para mantener sus instalaciones seguras y protegidas las 24 horas del día, los 7 días de la semana.
          </p>
        </div>
      </main>
    </div>
  )
}

