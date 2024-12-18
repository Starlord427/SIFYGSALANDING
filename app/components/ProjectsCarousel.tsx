'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { cn } from "@/lib/utils"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const categories = [
  "Todos",
  "Arquitectura",
  "Construcción",
  "Renovación",
  "Interior"
]

const projects = [
  {
    id: "torre-corporativa",
    title: "Skystay Tower",
    category: "Renovación & Arquitectura",
    description: "Diseño y construcción de una torre de oficinas de 30 pisos con certificación LEED.",
    image: "/projects/torre-corporativa.jpg"
  },
  {
    id: "complejo-residencial",
    title: "The Fallingwater House",
    category: "Building & Interior",
    description: "Desarrollo de un complejo residencial de lujo con 200 unidades y áreas verdes.",
    image: "/projects/complejo-residencial.jpg"
  },
  {
    id: "renovacion-centro",
    title: "The Orange Apartemen",
    category: "Construction & Interior",
    description: "Restauración y modernización de edificios históricos en el centro de la ciudad.",
    image: "/projects/renovacion-centro.jpg"
  },
  {
    id: "edificio-sustentable",
    title: "GreenTech Building",
    category: "Arquitectura & Sustentabilidad",
    description: "Diseño y construcción de un edificio de oficinas con tecnologías de energía renovable.",
    image: "/projects/edificio-sustentable.jpg"
  }
]

export default function ProjectsCarousel() {
  const [activeCategory, setActiveCategory] = useState("Todos")
  const router = useRouter()

  const filteredProjects = activeCategory === "Todos"
    ? projects
    : projects.filter(project => project.category.includes(activeCategory))

  const handleProjectClick = (projectId: string) => {
    router.push(`/proyectos?selected=${projectId}`)
  }

  return (
    <section className="py-20 bg-[#FF7420]">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-6xl font-bold text-white mb-8">
            Proyectos Destacados
          </h2>
          
          {/* Categories Navigation */}
          <div className="flex overflow-x-auto pb-4 hide-scrollbar">
            <div className="flex gap-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "text-white whitespace-nowrap transition-all",
                    activeCategory === category
                      ? "border-b-2 border-white font-semibold"
                      : "opacity-70 hover:opacity-100"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {filteredProjects.map((project, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <button
                  onClick={() => handleProjectClick(project.id)}
                  className="w-full focus:outline-none"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      quality={75}
                      placeholder="blur"
                      blurDataURL="/placeholder.svg?height=300&width=400"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <p className="text-sm text-gray-200">{project.category}</p>
                    </div>
                  </div>
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-12 bg-white/10 hover:bg-white/20 border-none text-white" />
          <CarouselNext className="hidden md:flex -right-12 bg-white/10 hover:bg-white/20 border-none text-white" />
        </Carousel>

        <div className="text-center mt-8">
          <Link
            href="/proyectos"
            className="inline-flex items-center text-white hover:underline"
          >
            Explorar Todos los Proyectos <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  )
}

