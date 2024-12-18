'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function AcercaDe() {
  const stats = [
    { number: "8+", label: "Años de experiencia" },
    { number: "200+", label: "Proyectos completados" },
    { number: "50+", label: "Socios estratégicos y Fabricantes" }
  ]

  const compromisosData = {
    vision: {
      title: "Visión",
      content: "Consolidar a SIFYGSA en el 2026 como empresa Líder en Soluciones de Seguridad y Automatización de procesos para el mercado Industrial Nacional y ser una Gran empresa para trabajar."
    },
    valores: {
      title: "Valores",
      content: "Nos basamos en ideales de nuestra organización, los compartimos altamente y los ponemos como prioridad en nuestras actividades diarias, siendo estos: honestidad, lealtad, respeto, responsabilidad, compromiso, confianza e integridad."
    },
    habilidades: {
      title: "Habilidades",
      content: "Somos profesionales competentes y dignos de confianza."
    },
    responsabilidad: {
      title: "Responsabilidad",
      content: "Cumplimos con nuestros compromisos y pactos con las entidades involucradas para llegar a las metas fijadas."
    },
    compromiso: {
      title: "Compromiso",
      content: "Alcanzamos los objetivos establecidos de manera eficaz y efectiva."
    },
    confianza: {
      title: "Confianza",
      content: "Establecemos vínculos duraderos a través del respeto y la honestidad."
    },
    integridad: {
      title: "Integridad",
      content: "Actuar e inspiramos valores en pensamiento y acción."
    }
  }

  const politicas = [
    "En SIFYGSA medimos nuestros procesos y procedimientos, siempre buscando la mejora continua del Sistema de Gestión de Calidad.",
    "La mejora continua representa una entrada de servicio al cliente para garantizar su satisfacción.",
    "Hemos optimizado la comunicación con nuestros socios comerciales.",
    "Buscamos oportunidades a través de nueva eficiente y eficaz con los recursos disponibles.",
    "Desarrollamos competencias relevantes para la satisfacción del cliente.",
    "Se estructuran mejores relaciones de ganar-ganar con nuestros socios comerciales.",
    "La mejora responsabilidad social y comercial los recursos y bienes de la empresa.",
    "Garantizamos que los productos y servicios que bajan a criterios de seguridad y salud, garantizando que sean seguros y saludables para su uso previsto, optimizando el uso de los recursos naturales y asegurando que la disposición final de los residuos sea respetuosa con el medio.",
    "Desarrollamos una separación lógica y normativa aplicable a criterios ambientales, de manera que se pueda controlar que los residuos que se generen durante la prestación del servicio sean dispuestos adecuadamente y minimizando el uso de los recursos de manera sostenible y el manejo integral de los mismos."
  ]

  return (
    <main className="bg-black text-white">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] bg-gray-900">
        <Image
          src="/about/hero-background.jpg"
          alt="SIFYGSA Hero Background"
          layout="fill"
          objectFit="cover"
          quality={75}
          priority
          placeholder="blur"
          blurDataURL="/placeholder.svg?height=1080&width=1920"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60" />
        <div className="container mx-auto px-4 py-20 relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Bienvenido a SIFYGSA
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mb-8">
            Donde 8+ años de experiencia en la industria se traducen en soluciones innovadoras y confiables para tu organización
          </p>
          <p className="text-lg text-gray-300 max-w-3xl">
            Sabemos que cada organización es única, por tanto sumamos esfuerzos para definir soluciones hechas a la medida en compromiso con la seguridad y eficiencia de sus procesos.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <div className="bg-[#FF7420] py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4">
            <p className="text-white text-lg max-w-md">
              Nuestra misión es simple: hacer su entorno más seguro y su operación más eficiente, con tecnología de vanguardia y compromiso total.
            </p>
            <div className="flex flex-wrap justify-center md:justify-end gap-8 md:gap-12">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-2xl md:text-3xl font-bold">{stat.number}</span>
                  <span className="text-sm max-w-[100px] leading-tight">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Priority Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4">
              En SIFYGSA
              <br />
              USTED ES NUESTRA PRIORIDAD
            </h2>
            <p className="text-gray-300">
              Nuestro propósito es ayudarlo a operar en un ambiente seguro, confiable y eficiente
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-gray-300">
                Nuestro personal se encarga de aplicar sus habilidades para asegurar que su empresa esté protegida de manera óptima.
              </p>
              <p className="text-gray-300">
                La seguridad y eficiencia de su empresa son nuestro norte de ser. Permitimos desarrollarnos de mejor este con soluciones industriales de calidad y seguridad.
              </p>
              <Button asChild>
                <Link href="/contacto" className="inline-flex items-center">
                  Contáctenos para más información <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/about/priority-image.jpg"
                alt="SIFYGSA Priority"
                layout="fill"
                objectFit="cover"
                quality={75}
                placeholder="blur"
                blurDataURL="/placeholder.svg?height=400&width=600"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Nuestra Trayectoria
          </h2>
          <div className="relative h-[300px] rounded-lg overflow-hidden">
            <Image
              src="/about/timeline-image.jpg"
              alt="SIFYGSA Timeline"
              layout="fill"
              objectFit="cover"
              quality={75}
              placeholder="blur"
              blurDataURL="/placeholder.svg?height=300&width=1200"
            />
          </div>
        </div>
      </section>

      {/* Compromiso con la Innovación y Seguridad Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-white">
            Compromiso con la Innovación y Seguridad
          </h2>
          <p className="text-center text-gray-300 mb-12 max-w-3xl mx-auto">
            SIFYGSA ofrece soluciones integrales de seguridad y automatización industrial para optimizar la protección y eficiencia de sus operaciones.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - Políticas */}
            <div className="bg-gray-900 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-[#FF7420]">Políticas</h3>
              <ul className="space-y-4">
                {politicas.map((politica, index) => (
                  <li key={index} className="text-gray-300 text-sm">
                    • {politica}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column - Accordion */}
            <div className="bg-gray-900 p-6 rounded-lg">
              <Accordion type="single" collapsible className="w-full">
                {Object.entries(compromisosData).map(([key, { title, content }]) => (
                  <AccordionItem key={key} value={key}>
                    <AccordionTrigger className="text-[#FF7420] hover:text-[#FF7420]/90">
                      {title}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300">
                      {content}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

