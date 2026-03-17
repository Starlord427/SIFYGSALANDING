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

// Gradientes por índice — se asignan en orden cíclico
// Cada uno es un gradiente oscuro que combina con el tema naranja del sitio
const PLACEHOLDER_GRADIENTS = [
  'from-[#1a0d00] to-[#2d1800]',   // naranja muy oscuro
  'from-[#00141a] to-[#001f2d]',   // azul petróleo oscuro
  'from-[#0d1a00] to-[#162900]',   // verde oscuro
  'from-[#1a0014] to-[#2d0022]',   // morado oscuro
  'from-[#001a14] to-[#00291f]',   // esmeralda oscuro
  'from-[#1a1400] to-[#2d2200]',   // dorado oscuro
  'from-[#00001a] to-[#00002d]',   // azul marino oscuro
  'from-[#1a0a00] to-[#2d1500]',   // ámbar oscuro
]

// Íconos SVG simples por tipo de categoría (fallback genérico si no hay coincidencia)
function CategoryIcon({ tipo, className }: { tipo: string; className?: string }) {
  const t = tipo.toLowerCase()
  if (t.includes('gas') || t.includes('flama'))
    return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"/></svg>
  if (t.includes('caída') || t.includes('caidas') || t.includes('protec'))
    return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
  if (t.includes('control') || t.includes('automat'))
    return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>
  if (t.includes('humo') || t.includes('incendio'))
    return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
  if (t.includes('video') || t.includes('vigilancia') || t.includes('cámara'))
    return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
  if (t.includes('aire') || t.includes('compres'))
    return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2"/></svg>
  // Genérico
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
}

// Componente de imagen con fallback elegante
function CatImage({
  src, alt, tipo, index, fill, className, sizes,
}: {
  src: string | null; alt: string; tipo: string; index: number;
  fill?: boolean; className?: string; sizes?: string;
}) {
  const [errored, setErrored] = useState(false)
  const gradient = PLACEHOLDER_GRADIENTS[index % PLACEHOLDER_GRADIENTS.length]

  if (!src || errored) {
    return (
      <div className={`w-full h-full bg-gradient-to-br ${gradient} flex flex-col items-center justify-center gap-3 ${fill ? 'absolute inset-0' : ''}`}>
        <CategoryIcon tipo={tipo} className="w-10 h-10 text-[#FF7420]/60" />
        <span className="text-[10px] font-semibold uppercase tracking-widest text-[#FF7420]/40 px-4 text-center leading-tight">
          {tipo}
        </span>
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      className={className}
      sizes={sizes}
      onError={() => setErrored(true)}
    />
  )
}

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
                    {/* Thumbnail con fallback */}
                    <div className="relative w-14 h-14 shrink-0 overflow-hidden rounded-xl">
                      <CatImage
                        src={cat.imagen}
                        alt={cat.tipo}
                        tipo={cat.tipo}
                        index={i}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                      {activeProduct !== i && <div className="absolute inset-0 bg-black/30" />}
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
                      {/* Imagen grande con fallback */}
                      <div className="relative h-56 md:h-72 overflow-hidden">
                        <CatImage
                          src={cat.imagen}
                          alt={cat.tipo}
                          tipo={cat.tipo}
                          index={activeProduct}
                          fill
                          className="object-cover opacity-70"
                          sizes="(max-width: 1024px) 100vw, 70vw"
                        />
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