import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function DeteccionGasFlama() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="container mx-auto px-4 py-16">
        <Link href="/servicios-y-productos" className="text-[#FF7420] hover:underline mb-4 inline-block">
          &larr; Volver a Servicios
        </Link>
        
        <h1 className="text-4xl font-bold mb-8 text-[#FF7420]">Detección fija de gas y flama</h1>
        
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <Image 
              src="/servicios/servicio-deteccion.jpg" 
              alt="Detección fija de gas y flama" 
              width={600} 
              height={400} 
              className="rounded-lg mb-4"
            />
            <p className="text-gray-300 mb-4">
              Nuestros sistemas de detección fija de gas y flama ofrecen una solución completa para la seguridad industrial. Utilizamos tecnología de punta para detectar una amplia gama de gases tóxicos y combustibles, así como llamas, en tiempo real.
            </p>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Características principales:</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Detección temprana de gases peligrosos y fuego</li>
              <li>Monitoreo continuo 24/7</li>
              <li>Alertas en tiempo real</li>
              <li>Integración con sistemas de seguridad existentes</li>
              <li>Cumplimiento con normativas de seguridad industrial</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mb-4">Nuestros servicios incluyen:</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Evaluación de riesgos y diseño de sistemas personalizados</li>
              <li>Instalación profesional de detectores y unidades de control</li>
              <li>Calibración y mantenimiento periódico</li>
              <li>Capacitación para el personal en el uso del sistema</li>
              <li>Soporte técnico y servicio de emergencia 24/7</li>
            </ul>
            
            <Button className="mt-6 bg-[#FF7420] hover:bg-[#FF7420]/90">
              Solicitar una consulta
            </Button>
          </div>
        </div>
        
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">¿Por qué elegir nuestro sistema de detección de gas y flama?</h2>
          <p className="text-gray-300 mb-4">
            Nuestros sistemas de detección fija de gas y flama están diseñados para proporcionar la máxima seguridad en entornos industriales desafiantes. Con años de experiencia en el sector, ofrecemos soluciones robustas y confiables que ayudan a prevenir accidentes, proteger vidas y salvaguardar activos valiosos.
          </p>
          <p className="text-gray-300 mb-4">
            Trabajamos con las mejores marcas y tecnologías del mercado, asegurando que nuestros clientes reciban sistemas de última generación que cumplen con los más altos estándares de seguridad. Nuestro equipo de expertos está comprometido con la excelencia en el servicio, desde la evaluación inicial hasta el soporte continuo.
          </p>
        </div>
      </main>
    </div>
  )
}

