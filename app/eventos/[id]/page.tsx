'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { CalendarDays, MapPin, ChevronLeft, ChevronRight } from 'lucide-react'

const eventos = [
  {
    id: 1,
    titulo: "Seminario de Seguridad Industrial",
    fecha: "15 de Julio, 2023",
    descripcion: "Únase a nosotros para un día completo de presentaciones y talleres sobre las últimas tendencias en seguridad industrial. Este seminario está diseñado para profesionales de la seguridad, gerentes de planta y todos aquellos interesados en mejorar la seguridad en sus lugares de trabajo. Durante el evento, expertos en la industria compartirán sus conocimientos sobre una variedad de temas, incluyendo:\n\n- Últimas regulaciones en seguridad industrial\n- Tecnologías emergentes para la prevención de accidentes\n- Estrategias para crear una cultura de seguridad en el trabajo\n- Estudios de casos de implementaciones exitosas de programas de seguridad\n\nAdemás de las presentaciones, habrá sesiones interactivas y oportunidades de networking con otros profesionales del sector.",
    lugar: "Hotel Sheraton, San Salvador",
    imagen: "/eventos/seminario-seguridad.jpg",
    galeria: [
      "/eventos/seminario-seguridad-1.jpg",
      "/eventos/seminario-seguridad-2.jpg",
      "/eventos/seminario-seguridad-3.jpg",
    ]
  },
  {
    id: 2,
    titulo: "Taller de Protección Contra Caídas",
    fecha: "5 de Agosto, 2023",
    descripcion: "Aprenda las mejores prácticas y técnicas para la protección contra caídas en entornos industriales. Este taller práctico está diseñado para proporcionar a los participantes los conocimientos y habilidades necesarios para implementar sistemas efectivos de protección contra caídas. Los temas que se cubrirán incluyen:\n\n- Identificación de peligros de caídas en el lugar de trabajo\n- Selección y uso adecuado de equipos de protección personal\n- Diseño e implementación de sistemas de protección contra caídas\n- Inspección y mantenimiento de equipos de seguridad\n- Procedimientos de rescate en caso de caídas\n\nEl taller incluirá demostraciones prácticas y ejercicios hands-on para asegurar que los participantes puedan aplicar lo aprendido en sus propios entornos de trabajo.",
    lugar: "Centro de Capacitación SIFYGSA",
    imagen: "/eventos/taller-proteccion-caidas.jpg",
    galeria: [
      "/eventos/taller-proteccion-caidas-1.jpg",
      "/eventos/taller-proteccion-caidas-2.jpg",
      "/eventos/taller-proteccion-caidas-3.jpg",
    ]
  },
  {
    id: 3,
    titulo: "Conferencia de Automatización Industrial",
    fecha: "20 de Septiembre, 2023",
    descripcion: "Descubra cómo la automatización está transformando la industria y mejorando la seguridad en el trabajo. Esta conferencia reúne a líderes de la industria, expertos en automatización y profesionales de la seguridad para explorar las últimas tendencias y tecnologías en automatización industrial. Los temas de la conferencia incluirán:\n\n- Industria 4.0 y su impacto en la seguridad laboral\n- Integración de sistemas de seguridad con tecnologías de automatización\n- Uso de la inteligencia artificial y el aprendizaje automático en la prevención de accidentes\n- Casos de estudio de implementaciones exitosas de automatización en diferentes sectores industriales\n- Desafíos y oportunidades en la transición hacia procesos más automatizados\n\nLa conferencia también contará con una zona de exposición donde los asistentes podrán ver demostraciones de las últimas tecnologías de automatización y seguridad.",
    lugar: "Centro de Convenciones, San Salvador",
    imagen: "/eventos/conferencia-automatizacion.jpg",
    galeria: [
      "/eventos/conferencia-automatizacion-1.jpg",
      "/eventos/conferencia-automatizacion-2.jpg",
      "/eventos/conferencia-automatizacion-3.jpg",
    ]
  }
]

export default function EventoDetalle() {
  const params = useParams<{ id: string }>()
  if (!params?.id) return <div>Evento no encontrado</div>
  
  const evento = eventos.find(e => e.id === Number(params.id))
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!evento) {
    return <div>Evento no encontrado</div>
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === evento.galeria.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? evento.galeria.length - 1 : prevIndex - 1
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="container mx-auto px-4 py-8">
        <Link href="/eventos" className="text-[#FF7420] hover:underline mb-4 inline-block">
          &larr; Volver a Eventos
        </Link>
        <h1 className="text-4xl font-bold mb-4 text-[#FF7420]">{evento.titulo}</h1>
        <div className="flex items-center text-gray-400 mb-2">
          <CalendarDays className="mr-2 h-4 w-4" />
          <span>{evento.fecha}</span>
        </div>
        <div className="flex items-center text-gray-400 mb-4">
          <MapPin className="mr-2 h-4 w-4" />
          <span>{evento.lugar}</span>
        </div>
        
        {/* Galería de imágenes */}
        <div className="relative mb-8">
          <div className="aspect-w-16 aspect-h-9 mb-4">
            <Image
              src={evento.galeria[currentImageIndex]}
              alt={`Imagen ${currentImageIndex + 1} de ${evento.titulo}`}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
              quality={75}
              placeholder="blur"
              blurDataURL="/placeholder.svg?height=400&width=600"
            />
          </div>
          <Button
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/75"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/75"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
        
        {/* Descripción detallada */}
        <div className="prose prose-invert max-w-none">
          {evento.descripcion.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4">{paragraph}</p>
          ))}
        </div>
      </main>
    </div>
  )
}

