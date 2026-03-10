'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

const collaborators = [
  { name: 'Empresa 1', logo: '/collaborators/empresa1.png' },
  { name: 'Empresa 2', logo: '/collaborators/empresa2.png' },
  { name: 'Empresa 3', logo: '/collaborators/empresa3.png' },
  { name: 'Empresa 4', logo: '/collaborators/empresa4.png' },
  { name: 'Empresa 5', logo: '/collaborators/empresa5.png' },
]

export default function CollaboratorsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="bg-[#0a0a0a] py-16 md:py-20 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-16">

        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-px bg-[#FF7420]" />
            <span className="text-[#FF7420] text-xs font-semibold uppercase tracking-[0.3em]">Alianzas</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Nuestros Colaboradores
          </h2>
        </div>

        <Carousel
          opts={{ align: "start", loop: true }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {collaborators.map((collaborator, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                <motion.div
                  className="relative h-32 bg-[#141414] rounded-2xl border border-white/5 flex items-center justify-center overflow-hidden cursor-pointer"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                >
                  <Image
                    src={collaborator.logo}
                    alt={`Logo de ${collaborator.name}`}
                    fill
                    className="object-contain p-6 opacity-60 transition-opacity duration-300"
                    style={{ opacity: hoveredIndex === index ? 1 : 0.5 }}
                  />
                  {hoveredIndex === index && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 bg-[#FF7420]/10 border border-[#FF7420]/30 rounded-2xl flex items-end justify-start p-3"
                    >
                      <p className="text-white text-xs font-bold">{collaborator.name}</p>
                    </motion.div>
                  )}
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-5 bg-[#1a1a1a] hover:bg-[#222] border border-white/10 text-white" />
          <CarouselNext className="hidden md:flex -right-5 bg-[#1a1a1a] hover:bg-[#222] border border-white/10 text-white" />
        </Carousel>

      </div>
    </section>
  )
}