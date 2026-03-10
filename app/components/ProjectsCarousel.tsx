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

const categories = ["Todos", "Arquitectura", "Construcción", "Renovación", "Interior"]

const projects = [
  { id: "torre-corporativa", title: "Skystay Tower", category: "Renovación & Arquitectura", description: "Diseño y construcción de una torre de oficinas de 30 pisos con certificación LEED.", image: "/projects/torre-corporativa.jpg" },
  { id: "complejo-residencial", title: "The Fallingwater House", category: "Building & Interior", description: "Desarrollo de un complejo residencial de lujo con 200 unidades y áreas verdes.", image: "/projects/complejo-residencial.jpg" },
  { id: "renovacion-centro", title: "The Orange Apartemen", category: "Construction & Interior", description: "Restauración y modernización de edificios históricos en el centro de la ciudad.", image: "/projects/renovacion-centro.jpg" },
  { id: "edificio-sustentable", title: "GreenTech Building", category: "Arquitectura & Sustentabilidad", description: "Diseño y construcción de un edificio de oficinas con tecnologías de energía renovable.", image: "/projects/edificio-sustentable.jpg" },
]

export default function ProjectsCarousel() {
  const [activeCategory, setActiveCategory] = useState("Todos")
  const router = useRouter()

  const filtered = activeCategory === "Todos"
    ? projects
    : projects.filter(p => p.category.includes(activeCategory))

  return (
    <section className="bg-[#141414] border-y border-white/5 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-16">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-6 h-px bg-[#FF7420]" />
              <span className="text-[#FF7420] text-xs font-semibold uppercase tracking-[0.3em]">Portafolio</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              Proyectos Destacados
            </h2>
          </div>

          {/* Filtros */}
          <div className="flex overflow-x-auto gap-2 pb-1 hide-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border",
                  activeCategory === cat
                    ? "bg-[#FF7420] border-[#FF7420] text-white"
                    : "bg-transparent border-white/10 text-gray-400 hover:border-white/30 hover:text-white"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Carousel */}
        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {filtered.map((project, i) => (
              <CarouselItem key={i} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <button
                  onClick={() => router.push(`/proyectos?selected=${project.id}`)}
                  className="w-full focus:outline-none group"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/5 group-hover:border-[#FF7420]/40 transition-all duration-300 group-hover:shadow-[0_0_25px_rgba(255,116,32,0.1)]">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover opacity-70 transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 text-left">
                      <div className="w-4 h-0.5 bg-[#FF7420] mb-2" />
                      <h3 className="text-white text-base font-black leading-tight">{project.title}</h3>
                      <p className="text-gray-400 text-xs mt-1">{project.category}</p>
                    </div>
                    {/* Línea naranja inferior */}
                    <div className="absolute bottom-0 left-0 h-0.5 bg-[#FF7420] rounded-full w-0 group-hover:w-full transition-all duration-300" />
                  </div>
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-5 bg-[#1a1a1a] hover:bg-[#222] border border-white/10 text-white" />
          <CarouselNext className="hidden md:flex -right-5 bg-[#1a1a1a] hover:bg-[#222] border border-white/10 text-white" />
        </Carousel>

        <div className="mt-8 text-center">
          <Link
            href="/proyectos"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm font-semibold transition-colors"
          >
            Explorar todos los proyectos <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  )
}