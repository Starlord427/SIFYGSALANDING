'use client'

import { useState, useEffect, Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const categories = ["Todos", "Arquitectura", "Construcción", "Renovación", "Interior"]

const projects = [
  {
    id: 1,
    title: "Torre Corporativa Skyline",
    category: "Arquitectura",
    description: "Diseño y construcción de una torre de oficinas de 30 pisos con certificación LEED. Este proyecto innovador incorpora tecnologías de ahorro energético y espacios de trabajo flexibles para satisfacer las demandas del mundo corporativo moderno.",
    image: "/projects/torre-corporativa.jpg",
    details: ["30 pisos de oficinas de alta gama", "Certificación LEED Gold", "Sistema de gestión energética inteligente", "Terrazas verdes y espacios comunes", "Estacionamiento subterráneo para 500 vehículos"]
  },
  {
    id: 2,
    title: "Complejo Residencial Riverside",
    category: "Construcción",
    description: "Desarrollo de un complejo residencial de lujo con 200 unidades y áreas verdes. Ubicado a orillas del río, este proyecto combina comodidad moderna con un diseño que aprovecha al máximo las vistas panorámicas y el entorno natural.",
    image: "/projects/complejo-residencial.jpg",
    details: ["200 unidades residenciales de lujo", "Piscina infinita con vista al río", "Gimnasio y spa de última generación", "Parque privado de 2 hectáreas", "Sistema de seguridad 24/7"]
  },
  {
    id: 3,
    title: "Renovación Centro Histórico",
    category: "Renovación",
    description: "Restauración y modernización de edificios históricos en el centro de la ciudad. Este proyecto desafiante implicó la preservación de fachadas históricas mientras se actualizaban completamente los interiores para usos modernos.",
    image: "/projects/renovacion-centro.jpg",
    details: ["Restauración de 10 edificios históricos", "Modernización de sistemas eléctricos y de plomería", "Creación de espacios comerciales en planta baja", "Instalación de ascensores respetando la estructura original", "Iluminación arquitectónica para resaltar detalles históricos"]
  },
  {
    id: 4,
    title: "Edificio Sustentable GreenTech",
    category: "Arquitectura",
    description: "Diseño y construcción de un edificio de oficinas con tecnologías de energía renovable. Este proyecto pionero demuestra cómo la arquitectura moderna puede integrarse perfectamente con soluciones sostenibles.",
    image: "/projects/edificio-sustentable.jpg",
    details: ["Paneles solares que cubren el 80% del consumo energético", "Sistema de recolección y reutilización de agua de lluvia", "Fachada con jardines verticales", "Uso de materiales reciclados y de bajo impacto ambiental", "Estaciones de carga para vehículos eléctricos"]
  }
]

// Componente separado para poder envolver useSearchParams en Suspense
function ProyectosContent() {
  const [activeCategory, setActiveCategory] = useState("Todos")
  const [activeProject, setActiveProject] = useState<number | null>(null)
  const searchParams = useSearchParams()
  const selectedProjectId = searchParams?.get('selected')

  useEffect(() => {
    if (selectedProjectId) {
      const el = document.getElementById(selectedProjectId)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [selectedProjectId])

  const filtered = activeCategory === "Todos"
    ? projects
    : projects.filter(p => p.category === activeCategory)

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">

      {/* ── HERO ── */}
      <section className="relative h-64 md:h-96 overflow-hidden">
        <Image
          src={filtered[0]?.image || '/projects/torre-corporativa.jpg'}
          alt="Proyectos SIFYGSA"
          fill
          className="object-cover opacity-30 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/40 via-transparent to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/70 to-transparent" />
        <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-16 pb-12 max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-px bg-[#FF7420]" />
            <span className="text-[#FF7420] text-xs font-semibold uppercase tracking-[0.3em]">Portafolio</span>
          </div>
          <h1 className="text-3xl md:text-6xl font-black tracking-tight leading-none">
            Nuestros<br />
            <span className="text-[#FF7420]">Proyectos</span>
          </h1>
        </div>
      </section>

      {/* ── FILTROS STICKY ── */}
      <div className="sticky top-0 z-20 bg-[#0a0a0a] border-b border-white/5 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-6 md:px-16 flex min-w-max">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setActiveProject(null) }}
              className={`px-6 py-5 text-sm font-bold uppercase tracking-widest transition-all border-b-2 whitespace-nowrap ${
                activeCategory === cat
                  ? 'border-[#FF7420] text-[#FF7420]'
                  : 'border-transparent text-gray-500 hover:text-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 md:px-16 py-12">
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-gray-500">
            <p className="text-lg font-medium">No hay proyectos en esta categoría.</p>
          </div>
        ) : (
          <div className="bg-[#141414] rounded-3xl border border-white/5 overflow-hidden flex flex-col lg:flex-row">

            {/* Panel izquierdo */}
            <div className="lg:w-80 xl:w-96 shrink-0 border-b lg:border-b-0 lg:border-r border-white/5 overflow-y-auto max-h-[500px] lg:max-h-[680px]">
              {filtered.map((project, i) => (
                <button
                  key={project.id}
                  id={project.id.toString()}
                  onClick={() => setActiveProject(i)}
                  className={`w-full flex items-center gap-4 px-5 py-4 text-left border-b border-white/5 transition-all last:border-0 ${
                    activeProject === i ? 'bg-[#FF7420]' : 'hover:bg-white/5'
                  }`}
                >
                  <div className="relative w-16 h-12 shrink-0 overflow-hidden rounded-xl">
                    <Image src={project.image} alt={project.title} fill className="object-cover" />
                    {activeProject !== i && <div className="absolute inset-0 bg-black/40" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold leading-tight ${activeProject === i ? 'text-white' : 'text-gray-200'}`}>
                      {project.title}
                    </p>
                    <p className={`text-xs mt-0.5 ${activeProject === i ? 'text-white/80' : 'text-gray-500'}`}>
                      {project.category}
                    </p>
                  </div>
                  <svg className={`w-4 h-4 shrink-0 ${activeProject === i ? 'text-white' : 'text-gray-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>

            {/* Panel derecho */}
            <div className="flex-1 bg-[#0f0f0f]">
              {activeProject === null ? (
                <div className="relative h-full min-h-80">
                  <Image src={filtered[0].image} alt={filtered[0].title} fill className="object-cover opacity-60" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="inline-flex items-center gap-2 mb-2">
                      <span className="w-4 h-px bg-[#FF7420]" />
                      <span className="text-[#FF7420] text-xs font-semibold uppercase tracking-widest">{filtered[0].category}</span>
                    </div>
                    <h2 className="text-white text-2xl md:text-3xl font-black mb-2">{filtered[0].title}</h2>
                    <p className="text-gray-400 text-sm max-w-lg">{filtered[0].description}</p>
                    <button
                      onClick={() => setActiveProject(0)}
                      className="mt-5 inline-flex items-center gap-2 bg-[#FF7420] hover:bg-[#e5681c] text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors"
                    >
                      Ver detalles
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col h-full">
                  <div className="relative h-56 md:h-80 overflow-hidden">
                    <Image src={filtered[activeProject].image} alt={filtered[activeProject].title} fill className="object-cover opacity-70" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="inline-flex items-center gap-2 mb-2">
                        <span className="w-4 h-px bg-[#FF7420]" />
                        <span className="text-[#FF7420] text-xs font-semibold uppercase tracking-widest">{filtered[activeProject].category}</span>
                      </div>
                      <h2 className="text-white text-2xl font-black">{filtered[activeProject].title}</h2>
                    </div>
                  </div>
                  <div className="p-6 flex-1">
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                      {filtered[activeProject].description}
                    </p>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#FF7420] mb-4">
                      Detalles del proyecto
                    </p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                      {filtered[activeProject].details.map((detail, j) => (
                        <li key={j} className="flex items-start gap-3 py-2.5 border-b border-white/5 last:border-0">
                          <span className="w-1 h-1 rounded-full bg-[#FF7420] mt-2 shrink-0" />
                          <span className="text-gray-300 text-sm">{detail}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 pt-5 border-t border-white/5">
                      <Link
                        href="/contacto"
                        className="inline-flex items-center gap-2 bg-[#FF7420] hover:bg-[#e5681c] text-white text-sm font-bold px-6 py-3 rounded-xl transition-colors"
                      >
                        Contactar sobre este proyecto
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

// Suspense obligatorio en Next.js 14+ cuando useSearchParams está en un page
export default function Proyectos() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-[#0a0a0a]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#FF7420]" />
      </div>
    }>
      <ProyectosContent />
    </Suspense>
  )
}