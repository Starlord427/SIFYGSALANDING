import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle } from 'lucide-react'
import ProjectsCarousel from './components/ProjectsCarousel'
import CollaboratorsSection from './components/CollaboratorsSection'

export default function Home() {
  const processSteps = [
    "Evaluación y Firma de Contratos",
    "Preparación del Plan de Trabajo",
    "Implementación de Trabajos de Control",
    "Entrega del Proyecto al Cliente"
  ]

  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gray-900">
        <Image
          src="/hero/hero-background.jpg"
          alt="SIFYGSA Hero Background"
          layout="fill"
          objectFit="cover"
          quality={75}
          priority
          placeholder="blur"
          blurDataURL="/placeholder.svg?height=1080&width=1920"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60" />
        <div className="relative z-10 container mx-auto px-4 py-32 min-h-screen flex flex-col justify-center">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              Soluciones Integrales en Fire & Gas SA de SV
            </h1>
            <p className="text-xl text-white">
              EN SIFYGSA HACEMOS QUE LAS COSAS SUCEDAN
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/servicios-y-productos"
                className="bg-[#FF7420] hover:bg-[#FF5500] text-white px-6 py-3 rounded-md transition-colors duration-200"
              >
                Nuestros servicios
              </Link>
              <Link
                href="/proyectos"
                className="bg-white text-black hover:bg-gray-100 px-6 py-3 rounded-md transition-colors duration-200"
              >
                Ver Proyectos
              </Link>
            </div>
            
            <div className="space-y-4 pt-8">
              <div className="flex items-center gap-3 text-white">
                <CheckCircle className="w-6 h-6 text-[#FF7420]" />
                <span>Presencia en el País</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <CheckCircle className="w-6 h-6 text-[#FF7420]" />
                <span>Personal Altamente Profesional, Procesos de Pruebas Precisos</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <CheckCircle className="w-6 h-6 text-[#FF7420]" />
                <span>Mano de obra inigualable, Profesional y Calificada</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/about/team-image.jpg"
                alt="SIFYGSA Experience"
                layout="fill"
                objectFit="cover"
                quality={75}
                placeholder="blur"
                blurDataURL="/placeholder.svg?height=400&width=600"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-5xl font-bold text-white">
                8+ <span className="text-[#FF7420]">Años</span>
                <br />de experiencia
              </h2>
              <p className="text-gray-300">
                Proveemos tecnología e ingeniería vanguardistas que resuelven las necesidades y generan la satisfacción de clientes, proveedores y accionistas, con alto sentido de ética y profesionalismo, a través del desarrollo y habilidades de nuestros colaboradores y contribuyendo al mejoramiento de nuestro entorno.
              </p>
              <p className="text-gray-300">
                Con 8+ años de experiencia, en SIFYGSA contamos con un profundo conocimiento del mercado y sus necesidades de la industria, asegurando que nuestros proyectos cumplen con los estándares más exigentes de seguridad y construcción, garantizando que el resultado final cumpla o supere las expectativas de nuestros clientes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-between max-w-4xl mx-auto">
            {processSteps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-8 h-8 rounded-full bg-[#FF7420] text-white flex items-center justify-center mb-4">
                  {index + 1}
                </div>
                <p className="text-white text-sm max-w-[120px]">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <ProjectsCarousel />

      {/* Collaborators Section */}
      <CollaboratorsSection />

      {/* Contact Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              Liderando la Innovación en Seguridad Industrial
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="bg-gray-800 p-6 rounded-lg">
                <p className="text-4xl font-bold text-[#FF7420] mb-2">200+</p>
                <p className="text-white">Proyectos Completados</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <p className="text-4xl font-bold text-[#FF7420] mb-2">98%</p>
                <p className="text-white">Satisfacción del Cliente</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <p className="text-4xl font-bold text-[#FF7420] mb-2">24/7</p>
                <p className="text-white">Soporte Técnico</p>
              </div>
            </div>
            <p className="text-xl text-white mb-8">
              En SIFYGSA, no solo ofrecemos soluciones, creamos un futuro más seguro y eficiente para su organización.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

