'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

const collaborators = [
  { name: 'Allen-Bradley', logo: '/collaborators/empresa1.png' },
  { name: 'AMETEK', logo: '/collaborators/empresa2.png' },
  { name: 'FEDERAL-SIGNAL', logo: '/collaborators/empresa3.png' },
  { name: 'METRIX', logo: '/collaborators/empresa4.png' },
  { name: 'MSA', logo: '/collaborators/empresa5.png' },
  { name: 'NOTIFIER', logo: '/collaborators/empresa6.png' },
  // Add more collaborators here in the future
]

export default function CollaboratorsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">
          Nuestros Colaboradores
        </h2>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {collaborators.map((collaborator, index) => (
              <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
                <motion.div
                  className="relative h-40 bg-white rounded-lg p-4 flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                >
                  <Image
                    src={collaborator.logo}
                    alt={`Logo de ${collaborator.name}`}
                    layout="fill"
                    objectFit="contain"
                    className="p-4"
                    quality={75}
                    placeholder="blur"
                    blurDataURL="/placeholder.svg?height=100&width=100"
                    loading="lazy"
                  />
                  {hoveredIndex === index && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center rounded-lg"
                    >
                      <p className="text-white text-center font-semibold">{collaborator.name}</p>
                    </motion.div>
                  )}
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  )
}

