import Image from 'next/image'
import Link from 'next/link'
import { CalendarDays, MapPin } from 'lucide-react'

const eventos = [
  {
    id: 1,
    titulo: "Seminario de Seguridad Industrial",
    fecha: "15 de Julio, 2023",
    descripcion: "Únase a nosotros para un día completo de presentaciones y talleres sobre las últimas tendencias en seguridad industrial.",
    lugar: "Hotel Sheraton, San Salvador",
    imagen: "/eventos/seminario-seguridad.jpg",
  },
  {
    id: 2,
    titulo: "Taller de Protección Contra Caídas",
    fecha: "5 de Agosto, 2023",
    descripcion: "Aprenda las mejores prácticas y técnicas para la protección contra caídas en entornos industriales.",
    lugar: "Centro de Capacitación SIFYGSA",
    imagen: "/eventos/taller-proteccion-caidas.jpg",
  },
  {
    id: 3,
    titulo: "Conferencia de Automatización Industrial",
    fecha: "20 de Septiembre, 2023",
    descripcion: "Descubra cómo la automatización está transformando la industria y mejorando la seguridad en el trabajo.",
    lugar: "Centro de Convenciones, San Salvador",
    imagen: "/eventos/conferencia-automatizacion.jpg",
  }
]

export default function Eventos() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">

      {/* ── Hero ── */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        <Image
          src={eventos[0].imagen}
          alt="Eventos SIFYGSA"
          fill
          className="object-cover opacity-25"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/40 via-transparent to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/70 to-transparent" />
        <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-16 pb-12 max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-px bg-[#FF7420]" />
            <span className="text-[#FF7420] text-xs font-semibold uppercase tracking-[0.3em]">Agenda</span>
          </div>
          <h1 className="text-3xl md:text-6xl font-black tracking-tight leading-none">
            Eventos<br />
            <span className="text-[#FF7420]">SIFYGSA</span>
          </h1>
        </div>
      </section>

      {/* ── Grid de tarjetas ── */}
      <main className="max-w-7xl mx-auto px-6 md:px-16 py-12">
        <p className="text-gray-500 text-sm mb-8 max-w-xl">
          Talleres, seminarios y conferencias sobre seguridad industrial y automatización.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {eventos.map((evento) => (
            <div
              key={evento.id}
              className="group bg-[#141414] rounded-2xl border border-white/5 overflow-hidden hover:border-[#FF7420]/30 hover:shadow-[0_0_30px_rgba(255,116,32,0.08)] transition-all duration-300 flex flex-col"
            >
              {/* Imagen */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={evento.imagen}
                  alt={evento.titulo}
                  fill
                  className="object-cover opacity-70 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
              </div>

              {/* Contenido */}
              <div className="p-6 flex flex-col flex-1">
                <div className="w-5 h-0.5 bg-[#FF7420] mb-3" />
                <h2 className="text-white font-black text-base leading-tight mb-4">
                  {evento.titulo}
                </h2>

                <div className="flex flex-col gap-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-500 text-xs">
                    <CalendarDays className="w-3.5 h-3.5 text-[#FF7420] shrink-0" />
                    <span>{evento.fecha}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-xs">
                    <MapPin className="w-3.5 h-3.5 text-[#FF7420] shrink-0" />
                    <span>{evento.lugar}</span>
                  </div>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed flex-1">
                  {evento.descripcion}
                </p>

                <Link
                  href={`/eventos/${evento.id}`}
                  className="mt-6 inline-flex items-center gap-2 bg-[#FF7420] hover:bg-[#e5681c] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-colors w-fit"
                >
                  Más información
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

    </div>
  )
}