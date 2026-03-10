'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { CalendarDays, MapPin, ChevronLeft, ChevronRight } from 'lucide-react'

const eventos = [
  {
    id: 1,
    titulo: "Seminario de Seguridad Industrial",
    fecha: "15 de Julio, 2023",
    descripcion: "Únase a nosotros para un día completo de presentaciones y talleres sobre las últimas tendencias en seguridad industrial. Este seminario está diseñado para profesionales de la seguridad, gerentes de planta y todos aquellos interesados en mejorar la seguridad en sus lugares de trabajo. Durante el evento, expertos en la industria compartirán sus conocimientos sobre una variedad de temas, incluyendo:\n\n- Últimas regulaciones en seguridad industrial\n- Tecnologías emergentes para la prevención de accidentes\n- Estrategias para crear una cultura de seguridad en el trabajo\n- Estudios de casos de implementaciones exitosas de programas de seguridad\n\nAdemás de las presentaciones, habrá sesiones interactivas y oportunidades de networking con otros profesionales del sector.",
    lugar: "Hotel Sheraton, San Salvador",
    imagen: "/eventos/seminario-seguridad.jpg",
    galeria: ["/eventos/seminario-seguridad-1.jpg", "/eventos/seminario-seguridad-2.jpg", "/eventos/seminario-seguridad-3.jpg"]
  },
  {
    id: 2,
    titulo: "Taller de Protección Contra Caídas",
    fecha: "5 de Agosto, 2023",
    descripcion: "Aprenda las mejores prácticas y técnicas para la protección contra caídas en entornos industriales. Este taller práctico está diseñado para proporcionar a los participantes los conocimientos y habilidades necesarios para implementar sistemas efectivos de protección contra caídas. Los temas que se cubrirán incluyen:\n\n- Identificación de peligros de caídas en el lugar de trabajo\n- Selección y uso adecuado de equipos de protección personal\n- Diseño e implementación de sistemas de protección contra caídas\n- Inspección y mantenimiento de equipos de seguridad\n- Procedimientos de rescate en caso de caídas\n\nEl taller incluirá demostraciones prácticas y ejercicios hands-on para asegurar que los participantes puedan aplicar lo aprendido en sus propios entornos de trabajo.",
    lugar: "Centro de Capacitación SIFYGSA",
    imagen: "/eventos/taller-proteccion-caidas.jpg",
    galeria: ["/eventos/taller-proteccion-caidas-1.jpg", "/eventos/taller-proteccion-caidas-2.jpg", "/eventos/taller-proteccion-caidas-3.jpg"]
  },
  {
    id: 3,
    titulo: "Conferencia de Automatización Industrial",
    fecha: "20 de Septiembre, 2023",
    descripcion: "Descubra cómo la automatización está transformando la industria y mejorando la seguridad en el trabajo. Esta conferencia reúne a líderes de la industria, expertos en automatización y profesionales de la seguridad para explorar las últimas tendencias y tecnologías en automatización industrial. Los temas de la conferencia incluirán:\n\n- Industria 4.0 y su impacto en la seguridad laboral\n- Integración de sistemas de seguridad con tecnologías de automatización\n- Uso de la inteligencia artificial y el aprendizaje automático en la prevención de accidentes\n- Casos de estudio de implementaciones exitosas de automatización en diferentes sectores industriales\n- Desafíos y oportunidades en la transición hacia procesos más automatizados\n\nLa conferencia también contará con una zona de exposición donde los asistentes podrán ver demostraciones de las últimas tecnologías de automatización y seguridad.",
    lugar: "Centro de Convenciones, San Salvador",
    imagen: "/eventos/conferencia-automatizacion.jpg",
    galeria: ["/eventos/conferencia-automatizacion-1.jpg", "/eventos/conferencia-automatizacion-2.jpg", "/eventos/conferencia-automatizacion-3.jpg"]
  }
]

export default function EventoDetalle() {
  const params = useParams<{ id: string }>()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!params?.id) return null

  const evento = eventos.find(e => e.id === Number(params.id))
  if (!evento) return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <p className="text-gray-400">Evento no encontrado</p>
    </div>
  )

  const nextImage = () => setCurrentImageIndex(i => i === evento.galeria.length - 1 ? 0 : i + 1)
  const prevImage = () => setCurrentImageIndex(i => i === 0 ? evento.galeria.length - 1 : i - 1)

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">

      {/* ── Hero con imagen principal ── */}
      <section className="relative h-64 md:h-96 overflow-hidden">
        <Image
          src={evento.imagen}
          alt={evento.titulo}
          fill
          className="object-cover opacity-35"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/30 via-transparent to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/70 to-transparent" />
        <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-16 pb-12 max-w-7xl mx-auto">
          <Link
            href="/eventos"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm font-medium transition-colors mb-4 group w-fit"
          >
            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver a Eventos
          </Link>
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-px bg-[#FF7420]" />
            <span className="text-[#FF7420] text-xs font-semibold uppercase tracking-[0.3em]">Evento</span>
          </div>
          <h1 className="text-2xl md:text-5xl font-black tracking-tight leading-tight max-w-2xl">
            {evento.titulo}
          </h1>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 md:px-16 py-10">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Columna principal */}
          <div className="lg:col-span-2 space-y-6">

            {/* Galería */}
            <div className="bg-[#141414] rounded-3xl border border-white/5 overflow-hidden">
              <div className="relative aspect-video">
                <Image
                  src={evento.galeria[currentImageIndex]}
                  alt={`Imagen ${currentImageIndex + 1}`}
                  fill
                  className="object-cover"
                />
                {/* Controles */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-black/60 hover:bg-black/80 border border-white/10 flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 text-white" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-black/60 hover:bg-black/80 border border-white/10 flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-4 h-4 text-white" />
                </button>
                {/* Indicador */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {evento.galeria.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImageIndex(i)}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        i === currentImageIndex ? 'bg-[#FF7420] w-4' : 'bg-white/40'
                      }`}
                    />
                  ))}
                </div>
              </div>
              {/* Thumbnails */}
              <div className="flex gap-3 p-4">
                {evento.galeria.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImageIndex(i)}
                    className={`relative w-20 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                      i === currentImageIndex ? 'border-[#FF7420]' : 'border-white/5 hover:border-white/20'
                    }`}
                  >
                    <Image src={img} alt={`thumb ${i + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Descripción */}
            <div className="bg-[#141414] rounded-3xl border border-white/5 p-8">
              <div className="inline-flex items-center gap-2 mb-5">
                <span className="w-4 h-px bg-[#FF7420]" />
                <span className="text-[#FF7420] text-xs font-bold uppercase tracking-[0.3em]">Descripción</span>
              </div>
              <div className="space-y-4">
                {evento.descripcion.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="text-gray-400 text-sm leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="space-y-4">

            {/* Info del evento */}
            <div className="bg-[#141414] rounded-3xl border border-white/5 p-7">
              <div className="inline-flex items-center gap-2 mb-5">
                <span className="w-4 h-px bg-[#FF7420]" />
                <span className="text-[#FF7420] text-xs font-bold uppercase tracking-[0.3em]">Detalles</span>
              </div>
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#FF7420]/10 border border-[#FF7420]/20 flex items-center justify-center shrink-0">
                    <CalendarDays className="w-4 h-4 text-[#FF7420]" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-0.5">Fecha</p>
                    <p className="text-white text-sm font-semibold">{evento.fecha}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#FF7420]/10 border border-[#FF7420]/20 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-[#FF7420]" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-0.5">Lugar</p>
                    <p className="text-white text-sm font-semibold">{evento.lugar}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-[#FF7420] rounded-3xl p-7">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-4 h-px bg-white/60" />
                <span className="text-white/70 text-[10px] font-bold uppercase tracking-[0.3em]">¿Te interesa?</span>
              </div>
              <h3 className="text-white font-black text-lg mb-2 leading-tight">
                Participa en este evento
              </h3>
              <p className="text-white/80 text-xs mb-5 leading-relaxed">
                Contáctanos para registrarte o solicitar más información sobre este evento.
              </p>
              <Link
                href="/contacto"
                className="flex items-center justify-between bg-black hover:bg-gray-900 text-white font-bold px-5 py-3 rounded-xl text-sm transition-colors"
              >
                Contactar
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Otros eventos */}
            <div className="bg-[#141414] rounded-3xl border border-white/5 p-7">
              <div className="inline-flex items-center gap-2 mb-5">
                <span className="w-4 h-px bg-[#FF7420]" />
                <span className="text-[#FF7420] text-xs font-bold uppercase tracking-[0.3em]">Más eventos</span>
              </div>
              <div className="space-y-3">
                {eventos.filter(e => e.id !== evento.id).map(e => (
                  <Link
                    key={e.id}
                    href={`/eventos/${e.id}`}
                    className="flex items-center gap-3 group"
                  >
                    <div className="relative w-14 h-12 rounded-xl overflow-hidden shrink-0 border border-white/5">
                      <Image src={e.imagen} alt={e.titulo} fill className="object-cover opacity-70" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-300 group-hover:text-white text-xs font-semibold leading-tight line-clamp-2 transition-colors">
                        {e.titulo}
                      </p>
                      <p className="text-gray-600 text-[10px] mt-0.5">{e.fecha}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>

    </div>
  )
}