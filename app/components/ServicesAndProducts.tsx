import React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const servicesAndProducts = [
  {
    title: "Detección de gas y flama",
    description: "Sistemas avanzados para la detección temprana de gases peligrosos y fuego en instalaciones industriales.",
    link: "/servicios/deteccion-gas-flama"
  },
  {
    title: "Protección contra caídas",
    description: "Equipos y soluciones para garantizar la seguridad del personal en trabajos en altura.",
    link: "/servicios/proteccion-caidas"
  },
  {
    title: "Control y automatización",
    description: "Implementación de sistemas de control y automatización para optimizar procesos industriales.",
    link: "/servicios/control-automatizacion"
  },
  {
    title: "Detección de humo y supresión de incendios",
    description: "Sistemas integrales para la detección temprana de humo y la supresión efectiva de incendios.",
    link: "/servicios/deteccion-humo-incendios"
  },
  {
    title: "Notificación masiva de emergencias",
    description: "Soluciones de comunicación rápida y eficiente para situaciones de emergencia.",
    link: "/servicios/notificacion-emergencias"
  },
  {
    title: "Intercomunicación y voceo",
    description: "Sistemas de comunicación interna para mejorar la coordinación y seguridad en las instalaciones.",
    link: "/servicios/intercomunicacion-voceo"
  }
]

export default function ServicesAndProducts() {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Nuestros Servicios y Productos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesAndProducts.map((item, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{item.description}</CardDescription>
                <Link href={item.link} className="mt-4 inline-block text-[#FF7420] hover:underline">
                  Leer más
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/servicios-y-productos" className="bg-[#FF7420] hover:bg-[#FF5500] text-white px-6 py-3 rounded-md transition-colors duration-200">
            Ver todos los servicios y productos
          </Link>
        </div>
      </div>
    </section>
  )
}

