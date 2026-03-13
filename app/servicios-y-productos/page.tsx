// app/servicios-y-productos/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface ProductCategory {
  id: string
  tipo: string
  descripcion: string | null
  imagen: string | null
  items: string[]
  order: number
}

const servicios = [
  { id: "deteccion-gas-flama",          titulo: "Detección fija de gas y flama",               descripcion: "Sistemas avanzados para la detección temprana de gases peligrosos y fuego en instalaciones industriales.",         imagen: "/servicios/servicio-deteccion.jpg" },
  { id: "proteccion-caidas",            titulo: "Sistemas de protección contra caídas",          descripcion: "Equipos y soluciones para garantizar la seguridad del personal en trabajos en altura.",                            imagen: "/servicios/servicio-proteccion-caidas.jpg" },
  { id: "control-automatizacion",       titulo: "Control y automatización",                      descripcion: "Implementación de sistemas de control y automatización para optimizar procesos industriales.",                     imagen: "/servicios/servicio-automatizacion.jpg" },
  { id: "deteccion-humo-incendios",     titulo: "Detección de humo y supresión de incendios",   descripcion: "Sistemas integrales para la detección temprana de humo y la supresión efectiva de incendios.",                    imagen: "/servicios/servicio-deteccion-humo.jpg" },
  { id: "notificacion-emergencias",     titulo: "Notificación masiva de emergencias",            descripcion: "Soluciones de comunicación rápida y eficiente para situaciones de emergencia.",                                   imagen: "/servicios/servicio-notificacion.jpg" },
  { id: "intercomunicacion-voceo",      titulo: "Intercomunicación y voceo",                     descripcion: "Sistemas de comunicación interna para mejorar la coordinación y seguridad en las instalaciones.",                  imagen: "/servicios/servicio-intercomunicacion.jpg" },
  { id: "tratamiento-aire-gas",         titulo: "Tratamiento de aire y gas",                     descripcion: "Tecnologías avanzadas para el tratamiento y purificación de aire y gases industriales.",                          imagen: "/servicios/servicio-tratamiento-aire.jpg" },
  { id: "compresion-aire",              titulo: "Compresión de aire",                            descripcion: "Equipos y sistemas de compresión de aire para aplicaciones industriales diversas.",                               imagen: "/servicios/servicio-compresion-aire.jpg" },
  { id: "interruptores",                titulo: "Interruptores",                                  descripcion: "Soluciones en interruptores de alta calidad para sistemas eléctricos industriales.",                              imagen: "/servicios/servicio-interruptores.jpg" },
  { id: "proteccion-equipos",           titulo: "Protección de equipos e instalaciones",         descripcion: "Sistemas integrales para la protección de equipos críticos e instalaciones industriales.",                       imagen: "/servicios/servicio-proteccion-equipos.jpg" },
  { id: "videovigilancia",              titulo: "Sistemas de videovigilancia",                   descripcion: "Tecnología de punta en sistemas de videovigilancia para mejorar la seguridad en sus instalaciones.",             imagen: "/servicios/servicio-videovigilancia.jpg" },
  { id: "aire-instrumentos",            titulo: "Sistemas de aire para instrumentos",            descripcion: "Soluciones especializadas de aire comprimido para instrumentos y controles industriales.",                       imagen: "/servicios/servicio-aire-instrumentos.jpg" },
]

export default function ServiciosYProductos() {
  const [activeTab,     setActiveTab]     = useState<'servicios' | 'productos'>('servicios')
  const [activeProduct, setActiveProduct] = useState(0)
  const [productos,     setProductos]     = useState<ProductCategory[]>([])
  const [loading,       setLoading]       = useState(true)

  useEffect(() => {
    fetch('/api/product-categories')
      .then(r => r.json())
      .then((data: ProductCategory[]) => setProductos(data))
      .catch(() => setProductos([]))
      .finally(() => setLoading(false))
  }, [])

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
                    <Image src={s.imagen} alt={s.titulo} fill className="object-cover opacity-60 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-80" />
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

          {loading ? (
            <div className="flex items-center justify-center py-32">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#FF7420]" />
            </div>
          ) : productos.length === 0 ? (
            <div className="text-center py-32 text-gray-600">
              <p className="text-lg font-bold mb-2">Sin productos aún</p>
              <p className="text-sm">El manager puede agregar categorías desde el panel de administración.</p>
            </div>
          ) : (
            <div className="bg-[#141414] rounded-3xl border border-white/5 overflow-hidden flex flex-col lg:flex-row">

              {/* Panel izquierdo */}
              <div className="lg:w-80 xl:w-96 shrink-0 border-b lg:border-b-0 lg:border-r border-white/5 overflow-y-auto max-h-[600px] lg:max-h-[720px]">
                {productos.map((cat, i) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveProduct(i)}
                    className={`w-full flex items-center gap-4 px-5 py-4 text-left border-b border-white/5 transition-all last:border-0 ${
                      activeProduct === i ? 'bg-[#FF7420]' : 'hover:bg-white/5'
                    }`}
                  >
                    <div className="relative w-14 h-14 shrink-0 overflow-hidden rounded-xl">
                      {cat.imagen ? (
                        <Image src={cat.imagen} alt={cat.tipo} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center">
                          <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        </div>
                      )}
                      {activeProduct !== i && <div className="absolute inset-0 bg-black/40" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-semibold leading-tight ${activeProduct === i ? 'text-white' : 'text-gray-200'}`}>
                        {cat.tipo}
                      </p>
                      <p className={`text-xs mt-0.5 ${activeProduct === i ? 'text-white/80' : 'text-gray-500'}`}>
                        {(cat.items as string[]).length} productos
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
                  if (!cat) return null
                  const items = cat.items as string[]
                  return (
                    <div className="flex flex-col h-full">
                      <div className="relative h-56 md:h-72 overflow-hidden">
                        {cat.imagen ? (
                          <Image src={cat.imagen} alt={cat.tipo} fill className="object-cover opacity-70" />
                        ) : (
                          <div className="w-full h-full bg-[#1a1a1a]" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-black/40 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <div className="inline-flex items-center gap-2 mb-2">
                            <span className="w-4 h-px bg-[#FF7420]" />
                            <span className="text-[#FF7420] text-xs font-semibold uppercase tracking-widest">Categoría</span>
                          </div>
                          <h2 className="text-white text-2xl font-black">{cat.tipo}</h2>
                          {cat.descripcion && (
                            <p className="text-gray-400 text-sm mt-1 max-w-lg">{cat.descripcion}</p>
                          )}
                        </div>
                      </div>
                      <div className="p-6 flex-1">
                        <p className="text-xs font-bold uppercase tracking-widest text-[#FF7420] mb-4">Línea de productos</p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                          {items.map((item, j) => (
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
          )}
        </section>
      )}

    </div>
  )
}
