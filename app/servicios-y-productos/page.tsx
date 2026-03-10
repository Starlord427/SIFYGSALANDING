'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const servicios = [
  { id: "deteccion-gas-flama", titulo: "Detección fija de gas y flama", descripcion: "Sistemas avanzados para la detección temprana de gases peligrosos y fuego en instalaciones industriales.", imagen: "/servicios/servicio-deteccion.jpg" },
  { id: "proteccion-caidas", titulo: "Sistemas de protección contra caídas", descripcion: "Equipos y soluciones para garantizar la seguridad del personal en trabajos en altura.", imagen: "/servicios/servicio-proteccion-caidas.jpg" },
  { id: "control-automatizacion", titulo: "Control y automatización", descripcion: "Implementación de sistemas de control y automatización para optimizar procesos industriales.", imagen: "/servicios/servicio-automatizacion.jpg" },
  { id: "deteccion-humo-incendios", titulo: "Detección de humo y supresión de incendios", descripcion: "Sistemas integrales para la detección temprana de humo y la supresión efectiva de incendios.", imagen: "/servicios/servicio-deteccion-humo.jpg" },
  { id: "notificacion-emergencias", titulo: "Notificación masiva de emergencias", descripcion: "Soluciones de comunicación rápida y eficiente para situaciones de emergencia.", imagen: "/servicios/servicio-notificacion.jpg" },
  { id: "intercomunicacion-voceo", titulo: "Intercomunicación y voceo", descripcion: "Sistemas de comunicación interna para mejorar la coordinación y seguridad en las instalaciones.", imagen: "/servicios/servicio-intercomunicacion.jpg" },
  { id: "tratamiento-aire-gas", titulo: "Tratamiento de aire y gas", descripcion: "Tecnologías avanzadas para el tratamiento y purificación de aire y gases industriales.", imagen: "/servicios/servicio-tratamiento-aire.jpg" },
  { id: "compresion-aire", titulo: "Compresión de aire", descripcion: "Equipos y sistemas de compresión de aire para aplicaciones industriales diversas.", imagen: "/servicios/servicio-compresion-aire.jpg" },
  { id: "interruptores", titulo: "Interruptores", descripcion: "Soluciones en interruptores de alta calidad para sistemas eléctricos industriales.", imagen: "/servicios/servicio-interruptores.jpg" },
  { id: "proteccion-equipos", titulo: "Protección de equipos e instalaciones", descripcion: "Sistemas integrales para la protección de equipos críticos e instalaciones industriales.", imagen: "/servicios/servicio-proteccion-equipos.jpg" },
  { id: "videovigilancia", titulo: "Sistemas de videovigilancia", descripcion: "Tecnología de punta en sistemas de videovigilancia para mejorar la seguridad en sus instalaciones.", imagen: "/servicios/servicio-videovigilancia.jpg" },
  { id: "aire-instrumentos", titulo: "Sistemas de aire para instrumentos", descripcion: "Soluciones especializadas de aire comprimido para instrumentos y controles industriales.", imagen: "/servicios/servicio-aire-instrumentos.jpg" },
]

const productos = [
  { tipo: "Detección de gas y flama", descripcion: "Ofrecemos una amplia gama de soluciones para la detección temprana de gases peligrosos y llamas, garantizando la seguridad en entornos industriales.", imagen: "/productos/deteccion-gas-flama.jpg", items: ["Detectores fijos de gas y flama", "Kits y accesorios de calibración", "Controladores dedicados y CEP", "Detectores de gas combustible", "Detectores de gas tóxicos", "Detectores de deficiencia de O2", "Leak Detectors", "Sistemas de gas y fuego", "Detectores open-path Senscient ELDS"] },
  { tipo: "Protección contra caídas", descripcion: "Sistemas y equipos diseñados para prevenir accidentes y proteger a los trabajadores en alturas.", imagen: "/productos/proteccion-caidas.jpg", items: ["Líneas de vida", "Puntos de anclaje", "Equipos para espacios confinados", "Protecciones colectivas"] },
  { tipo: "Control y automatización", descripcion: "Soluciones de automatización industrial para optimizar procesos y mejorar la eficiencia.", imagen: "/productos/control-automatizacion.jpg", items: ["Controladores electrónicos programables CEP", "PlantPAx — Sistemas DCS", "Centros de control de motores (CCMs)", "Sistemas instrumentados de seguridad (SIS)", "Sistemas de control de movimiento"] },
  { tipo: "Detección de humo y supresión de incendios", descripcion: "Sistemas de detección y supresión de incendios para la protección de vidas y propiedades.", imagen: "/productos/deteccion-humo-supresion.jpg", items: ["Paneles de control Onyx NFS", "Detectores de humo", "Detectores de calor", "Estaciones manuales de alarma", "Alarma audio/visual", "Agente limpio Novec 1230"] },
  { tipo: "Notificación masiva de emergencias", descripcion: "Sistemas de notificación para alertar a grandes grupos de personas en situaciones de emergencia.", imagen: "/productos/notificacion-masiva.jpg", items: ["Sistemas de sirenas electrónicas", "Sistemas de sirenas electromecánicas", "Notificación masiva para interiores", "Control", "Solución CommanderOne"] },
  { tipo: "Intercomunicación y voceo", descripcion: "Sistemas de comunicación para mejorar la coordinación y la seguridad en instalaciones.", imagen: "/productos/intercomunicacion-voceo.jpg", items: ["Estaciones de comunicación inteligentes IP", "Paneles de control de acceso digital", "Generador de tonos", "Amplificadores"] },
  { tipo: "Tratamiento de aire y gas", descripcion: "Soluciones para el tratamiento y purificación de aire y gases industriales.", imagen: "/productos/tratamiento-aire-gas.jpg", items: ["Ventiladores axiales, centrífugos y de refrigeración", "Compresores de diafragma, tornillo y centrífugos", "Sopladores rotativos y centrífugos", "Turbinas de vapor"] },
  { tipo: "Compresión de aire", descripcion: "Equipos y sistemas de compresión de aire para diversas aplicaciones industriales.", imagen: "/productos/compresion-aire.jpg", items: ["Tornillo rotativo lubricados", "Tornillo rotativo libre de aceite", "Centrífugo", "Soluciones de aire comprimido para PET", "Secadores y filtros de aire comprimido"] },
  { tipo: "Interruptores", descripcion: "Amplia gama de interruptores de alta calidad para sistemas eléctricos industriales.", imagen: "/productos/interruptores.jpg", items: ["Interruptores de presión", "Interruptores de temperatura", "Interruptores de nivel", "Interruptores de flujo", "Válvulas de control"] },
  { tipo: "Protección de equipos e instalaciones", descripcion: "Sistemas integrales para la protección de equipos críticos e instalaciones industriales.", imagen: "/productos/proteccion-equipos-instalaciones.jpg", items: ["UPS monofásico y trifásico industrial", "Cargadores de batería e inversores", "Sistemas de proximidad digital y sensores", "Interruptores de vibración y monitores", "Lubricantes y protectores anticorrosivos", "Sistemas de detección de intrusiones perimetrales"] },
]

export default function ServiciosYProductos() {
  const [activeTab, setActiveTab] = useState<'servicios' | 'productos'>('servicios')
  const [activeProduct, setActiveProduct] = useState(0)

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">

      {/* ── HERO ── */}
      <section className="relative h-64 md:h-96 overflow-hidden">
        <Image src="/servicios/servicio-deteccion.jpg" alt="hero" fill className="object-cover opacity-30" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/40 via-transparent to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/70 to-transparent" />
        <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-16 pb-12 max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-px bg-[#FF7420]" />
            <span className="text-[#FF7420] text-xs font-semibold uppercase tracking-[0.3em]">Catálogo Completo</span>
          </div>
          <h1 className="text-3xl md:text-6xl font-black tracking-tight leading-none">
            Servicios &<br />
            <span className="text-[#FF7420]">Productos</span>
          </h1>
        </div>
      </section>

      {/* ── TABS STICKY ── */}
      <div className="sticky top-0 z-20 bg-[#0a0a0a] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-16 flex">
          {(['servicios', 'productos'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-5 text-sm font-bold uppercase tracking-widest transition-all border-b-2 ${
                activeTab === tab
                  ? 'border-[#FF7420] text-[#FF7420]'
                  : 'border-transparent text-gray-500 hover:text-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ── SERVICIOS ── */}
      {activeTab === 'servicios' && (
        <section className="max-w-7xl mx-auto px-6 md:px-16 py-12">
          <p className="text-gray-500 text-sm mb-8 max-w-2xl">
            Soluciones integrales en seguridad industrial, automatización y protección para la industria global.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {servicios.map((s) => (
              <Link href={`/servicios/${s.id}`} key={s.id}>
                <div className="group relative bg-[#141414] rounded-2xl overflow-hidden cursor-pointer h-72 border border-white/5 hover:border-[#FF7420]/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,116,32,0.1)]">
                  <div className="relative h-full overflow-hidden rounded-2xl">
                    <Image
                      src={s.imagen}
                      alt={s.titulo}
                      fill
                      className="object-cover opacity-60 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-white font-bold text-sm leading-tight mb-1">{s.titulo}</h3>
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
      )}

      {/* ── PRODUCTOS ── */}
      {activeTab === 'productos' && (
        <section className="max-w-7xl mx-auto px-6 md:px-16 py-12">
          <p className="text-gray-500 text-sm mb-8 max-w-2xl">
            Equipos y tecnología de clase mundial para la protección y operación de instalaciones industriales.
          </p>

          <div className="bg-[#141414] rounded-3xl border border-white/5 overflow-hidden flex flex-col lg:flex-row">

            {/* Panel izquierdo */}
            <div className="lg:w-80 xl:w-96 shrink-0 border-b lg:border-b-0 lg:border-r border-white/5 overflow-y-auto max-h-[600px] lg:max-h-[720px]">
              {productos.map((cat, i) => (
                <button
                  key={i}
                  onClick={() => setActiveProduct(i)}
                  className={`w-full flex items-center gap-4 px-5 py-4 text-left border-b border-white/5 transition-all last:border-0 ${
                    activeProduct === i ? 'bg-[#FF7420]' : 'hover:bg-white/5'
                  }`}
                >
                  <div className="relative w-14 h-14 shrink-0 overflow-hidden rounded-xl">
                    <Image src={cat.imagen} alt={cat.tipo} fill className="object-cover" />
                    {activeProduct !== i && <div className="absolute inset-0 bg-black/40" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold leading-tight ${activeProduct === i ? 'text-white' : 'text-gray-200'}`}>
                      {cat.tipo}
                    </p>
                    <p className={`text-xs mt-0.5 ${activeProduct === i ? 'text-white/80' : 'text-gray-500'}`}>
                      {cat.items.length} productos
                    </p>
                  </div>
                  <svg className={`w-4 h-4 shrink-0 ${activeProduct === i ? 'text-white' : 'text-gray-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>

            {/* Panel derecho */}
            <div className="flex-1 bg-[#0f0f0f]">
              {(() => {
                const cat = productos[activeProduct]
                return (
                  <div className="flex flex-col h-full">
                    <div className="relative h-56 md:h-72 overflow-hidden">
                      <Image src={cat.imagen} alt={cat.tipo} fill className="object-cover opacity-70" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-black/40 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="inline-flex items-center gap-2 mb-2">
                          <span className="w-4 h-px bg-[#FF7420]" />
                          <span className="text-[#FF7420] text-xs font-semibold uppercase tracking-widest">Categoría</span>
                        </div>
                        <h2 className="text-white text-2xl font-black">{cat.tipo}</h2>
                        <p className="text-gray-400 text-sm mt-1 max-w-lg">{cat.descripcion}</p>
                      </div>
                    </div>
                    <div className="p-6 flex-1">
                      <p className="text-xs font-bold uppercase tracking-widest text-[#FF7420] mb-4">Línea de productos</p>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                        {cat.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-3 py-2.5 border-b border-white/5 last:border-0">
                            <span className="w-1 h-1 rounded-full bg-[#FF7420] mt-2 shrink-0" />
                            <span className="text-gray-300 text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6 pt-5 border-t border-white/5">
                        <Link
                          href="/contacto"
                          className="inline-flex items-center gap-2 bg-[#FF7420] hover:bg-[#e5681c] text-white text-sm font-bold px-6 py-3 rounded-xl transition-colors"
                        >
                          Solicitar información
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })()}
            </div>

          </div>
        </section>
      )}

    </div>
  )
}