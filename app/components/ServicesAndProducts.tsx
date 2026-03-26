import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const servicesAndProducts = [
  { title: "Detección de gas y fuego", description: "Sistemas avanzados para la detección temprana de gases peligrosos y fuego en instalaciones industriales.", link: "/servicios/deteccion-gas-flama", image: "/servicios/servicio-deteccion.jpg" },
  { title: "Protección contra caídas", description: "Equipos y soluciones para garantizar la seguridad del personal en trabajos en altura.", link: "/servicios/proteccion-caidas", image: "/servicios/servicio-proteccion-caidas.jpg" },
  { title: "Monitoreo, control y automatización", description: "Implementación de sistemas de control y automatización para optimizar procesos industriales.", link: "/servicios/servicio-automatizacion", image: "/servicios/servicio-automatizacion.jpg" },
  { title: "Detección y alarmas\nSupresión de incendios", description: "Sistemas integrales para la detección temprana de humo y la supresión efectiva de incendios.", link: "/servicios/deteccion-humo-incendios", image: "/servicios/servicio-deteccion-humo.jpg" },
  { title: "Notificación masiva de emergencias", description: "Soluciones de comunicación rápida y eficiente para situaciones de emergencia.", link: "/servicios/notificacion-emergencias", image: "/servicios/servicio-notificacion.jpg" },
  { title: "Intercomunicación y voceo", description: "Sistemas de comunicación interna para mejorar la coordinación y seguridad en las instalaciones.", link: "/servicios/intercomunicacion-voceo", image: "/servicios/servicio-intercomunicacion.jpg" },
]

export default function ServicesAndProducts() {
  return (
    <section className="bg-[#0a0a0a] py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-16">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-6 h-px bg-[#FF7420]" />
              <span className="text-[#FF7420] text-xs font-semibold uppercase tracking-[0.3em]">Lo que hacemos</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white">
              Nuestros Servicios<br />y Productos
            </h2>
          </div>
          <Link
            href="/servicios-y-productos"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm font-semibold transition-colors shrink-0"
          >
            Ver catálogo completo
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {servicesAndProducts.map((item, index) => (
            <Link href={item.link} key={index}>
              <div className="group bg-[#141414] rounded-2xl border border-white/5 overflow-hidden hover:border-[#FF7420]/40 hover:shadow-[0_0_25px_rgba(255,116,32,0.08)] transition-all duration-300 cursor-pointer h-72 relative">
                {/* Imagen */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover opacity-50 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                {/* Contenido */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="w-5 h-0.5 bg-[#FF7420] mb-3" />
                  <h3 className="text-white font-bold text-sm leading-tight mb-1 whitespace-pre-line">{item.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed max-h-0 overflow-hidden group-hover:max-h-16 transition-all duration-300">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-[#FF7420] text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Ver servicio
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Línea naranja inferior */}
                <div className="absolute bottom-0 left-0 h-0.5 bg-[#FF7420] rounded-full w-0 group-hover:w-full transition-all duration-300" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}