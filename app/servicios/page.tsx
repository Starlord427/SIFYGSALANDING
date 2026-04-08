// app/servicios/page.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'

const servicios = [
  { id: "deteccion-gas-flama",          titulo: "Detección fija de gas y fuego",               descripcion: "Sistemas avanzados para la detección temprana de gases peligrosos y fuego en instalaciones industriales.",         imagen: "/servicios/servicio-deteccion.jpg" },
  { id: "proteccion-caidas",            titulo: "Sistemas de protección contra caídas",          descripcion: "Equipos y soluciones para garantizar la seguridad del personal en trabajos en altura.",                            imagen: "/servicios/servicio-proteccion-caidas.jpg" },
  { id: "control-automatizacion",       titulo: "Monitoreo, control y automatización",                      descripcion: "Implementación de sistemas de control y automatización para optimizar procesos industriales.",                     imagen: "/servicios/servicio-automatizacion.jpg" },
  { id: "deteccion-humo-incendios",     titulo: "Detección y alarmas\nSupresión de incendios",   descripcion: "Sistemas integrales para la detección temprana de humo y la supresión efectiva de incendios.",                    imagen: "/servicios/servicio-deteccion-humo.jpg" },
  { id: "notificacion-emergencias",     titulo: "Notificación masiva de emergencias",            descripcion: "Soluciones de comunicación rápida y eficiente para situaciones de emergencia.",                                   imagen: "/servicios/servicio-notificacion.jpg" },
  { id: "intercomunicacion-voceo",      titulo: "Intercomunicación y voceo",                     descripcion: "Sistemas de comunicación interna para mejorar la coordinación y seguridad en las instalaciones.",                  imagen: "/servicios/servicio-intercomunicacion.jpg" },
  { id: "tratamiento-aire-gas",         titulo: "Tratamiento de aire y gas",                     descripcion: "Tecnologías avanzadas para el tratamiento y purificación de aire y gases industriales.",                          imagen: "/servicios/servicio-tratamiento-aire.jpg" },
  { id: "compresion-aire",              titulo: "Compresión de aire",                            descripcion: "Equipos y sistemas de compresión de aire para aplicaciones industriales diversas.",                               imagen: "/servicios/servicio-compresion-aire.jpg" },
  { id: "interruptores",                titulo: "Interruptores",                                  descripcion: "Soluciones en interruptores de alta calidad para sistemas eléctricos industriales.",                              imagen: "/servicios/servicio-interruptores.jpg" },
  { id: "proteccion-equipos",           titulo: "Protección de equipos e instalaciones",         descripcion: "Sistemas integrales para la protección de equipos críticos e instalaciones industriales.",                       imagen: "/servicios/servicio-proteccion-equipos.jpg" },
  { id: "videovigilancia",              titulo: "Sistemas de videovigilancia",                   descripcion: "Tecnología de punta en sistemas de videovigilancia para mejorar la seguridad en sus instalaciones.",             imagen: "/servicios/servicio-videovigilancia.jpg" },
  { id: "aire-instrumentos",            titulo: "Sistemas de aire para instrumentos",            descripcion: "Soluciones especializadas de aire comprimido para instrumentos y controles industriales.",                       imagen: "/servicios/servicio-aire-instrumentos.jpg" },
]

export default function ServiciosPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">

      {/* ── HERO ── */}
      <section className="relative h-64 md:h-96 overflow-hidden">
        <Image src="/servicios/servicio-deteccion.jpg" alt="hero servicios" fill className="object-cover opacity-30" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/40 via-transparent to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/70 to-transparent" />
        <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-16 pb-12 max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-px bg-[#FF7420]" />
            <span className="text-[#FF7420] text-xs font-semibold uppercase tracking-[0.3em]">Soluciones Integrales</span>
          </div>
          <h1 className="text-3xl md:text-6xl font-black tracking-tight leading-none">
            Nuestros<br />
            <span className="text-[#FF7420]">Servicios</span>
          </h1>
        </div>
      </section>

      {/* ── SERVICIOS ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-16">
        <p className="text-gray-500 text-base mb-12 max-w-2xl leading-relaxed">
          Ofrecemos soluciones integrales en seguridad industrial, automatización y protección para la industria global. Explore nuestros servicios para encontrar la solución que mejor se adapte a las necesidades de su empresa.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {servicios.map((s) => (
            <Link href={`/servicios/${s.id}`} key={s.id}>
              <div className="group relative bg-[#141414] rounded-2xl overflow-hidden cursor-pointer h-72 border border-white/5 hover:border-[#FF7420]/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,116,32,0.1)]">
                <div className="relative h-full overflow-hidden rounded-2xl">
                  <Image src={s.imagen} alt={s.titulo} fill className="object-cover opacity-60 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-white font-bold text-sm leading-tight mb-1 whitespace-pre-line">{s.titulo}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed max-h-0 overflow-hidden group-hover:max-h-20 transition-all duration-300">
                    {s.descripcion}
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-[#FF7420] text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Ver servicio
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 h-0.5 bg-[#FF7420] rounded-full w-0 group-hover:w-full transition-all duration-300" />
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  )
}
