'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

const categories = [
  "Todos",
  "Arquitectura",
  "Construcción",
  "Renovación",
  "Interior"
]

const projects = [
  {
    id: 1,
    title: "Torre Corporativa Skyline",
    category: "Arquitectura",
    description: "Diseño y construcción de una torre de oficinas de 30 pisos con certificación LEED. Este proyecto innovador incorpora tecnologías de ahorro energético y espacios de trabajo flexibles para satisfacer las demandas del mundo corporativo moderno.",
    image: "/projects/torre-corporativa.jpg",
    details: [
      "30 pisos de oficinas de alta gama",
      "Certificación LEED Gold",
      "Sistema de gestión energética inteligente",
      "Terrazas verdes y espacios comunes",
      "Estacionamiento subterráneo para 500 vehículos"
    ]
  },
  {
    id: 2,
    title: "Complejo Residencial Riverside",
    category: "Construcción",
    description: "Desarrollo de un complejo residencial de lujo con 200 unidades y áreas verdes. Ubicado a orillas del río, este proyecto combina comodidad moderna con un diseño que aprovecha al máximo las vistas panorámicas y el entorno natural.",
    image: "/projects/complejo-residencial.jpg",
    details: [
      "200 unidades residenciales de lujo",
      "Piscina infinita con vista al río",
      "Gimnasio y spa de última generación",
      "Parque privado de 2 hectáreas",
      "Sistema de seguridad 24/7"
    ]
  },
  {
    id: 3,
    title: "Renovación Centro Histórico",
    category: "Renovación",
    description: "Restauración y modernización de edificios históricos en el centro de la ciudad. Este proyecto desafiante implicó la preservación de fachadas históricas mientras se actualizaban completamente los interiores para usos modernos.",
    image: "/projects/renovacion-centro.jpg",
    details: [
      "Restauración de 10 edificios históricos",
      "Modernización de sistemas eléctricos y de plomería",
      "Creación de espacios comerciales en planta baja",
      "Instalación de ascensores respetando la estructura original",
      "Iluminación arquitectónica para resaltar detalles históricos"
    ]
  },
  {
    id: 4,
    title: "Edificio Sustentable GreenTech",
    category: "Arquitectura",
    description: "Diseño y construcción de un edificio de oficinas con tecnologías de energía renovable. Este proyecto pionero demuestra cómo la arquitectura moderna puede integrarse perfectamente con soluciones sostenibles.",
    image: "/projects/edificio-sustentable.jpg",
    details: [
      "Paneles solares que cubren el 80% del consumo energético",
      "Sistema de recolección y reutilización de agua de lluvia",
      "Fachada con jardines verticales",
      "Uso de materiales reciclados y de bajo impacto ambiental",
      "Estaciones de carga para vehículos eléctricos"
    ]
  }
]

export default function Proyectos() {
  const [activeCategory, setActiveCategory] = useState("Todos")
  const searchParams = useSearchParams()
  const selectedProjectId = searchParams.get('selected')

  useEffect(() => {
    if (selectedProjectId) {
      const projectElement = document.getElementById(selectedProjectId)
      if (projectElement) {
        projectElement.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [selectedProjectId])

  const filteredProjects = activeCategory === "Todos"
    ? projects
    : projects.filter(project => project.category === activeCategory)

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center">Nuestros Proyectos</h1>
        
        {/* Categories Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setActiveCategory(category)}
                variant="ghost"
                className={cn(
                  "text-white",
                  activeCategory === category
                    ? "bg-[#FF7420] hover:bg-[#FF7420]/90"
                    : "hover:bg-gray-800"
                )}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <Card key={index} id={project.id.toString()} className="bg-gray-900 border-gray-800">
              <div className="relative aspect-video overflow-hidden rounded-t-lg">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={75}
                  placeholder="blur"
                  blurDataURL="/placeholder.svg?height=400&width=600"
                  className="object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl text-[#FF7420]">{project.title}</CardTitle>
                <CardDescription className="text-gray-400">{project.category}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <h4 className="font-semibold text-white mb-2">Detalles del proyecto:</h4>
                <ul className="list-disc list-inside text-gray-300">
                  {project.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}

