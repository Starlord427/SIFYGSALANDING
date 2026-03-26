'use client'

import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle } from 'lucide-react'
import ProjectsCarousel from './components/ProjectsCarousel'
import CollaboratorsSection from './components/CollaboratorsSection'
import ServicesAndProducts from './components/ServicesAndProducts'
import ProcessTimeline from './components/ProcessTimeline'

const stats = [
  { value: "200+", label: "Proyectos Completados" },
  { value: "98%",  label: "Satisfacción del Cliente" },
  { value: "24/7", label: "Soporte Técnico" },
]

export default function Home() {
  return (
    <main className="bg-[#0a0a0a] text-white">

      {/* ── HERO ── */}
      <section className="relative min-h-screen">
        <Image
          src="/hero/hero-background.jpg"
          alt="SIFYGSA Hero Background"
          fill
          className="object-cover opacity-100"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/30 via-transparent to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 via-[#0a0a0a]/40 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 min-h-screen flex flex-col justify-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-8 h-px bg-[#FF7420]" />
              <span className="text-[#FF7420] text-xs font-semibold uppercase tracking-[0.3em]">
                Automatización, control y seguridad Industrial
              </span>
            </div>
            <h1 className="text-4xl md:text-7xl font-black tracking-tight leading-none mb-6">
              Soluciones<br />
              Integrales en<br />
              <span className="text-[#FF7420]">Fire & Gas</span>
            </h1>
            <p className="text-gray-400 text-lg mb-10 uppercase tracking-widest text-sm">
              Hacemos que las cosas sucedan
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Link
                href="/servicios-y-productos"
                className="inline-flex items-center gap-2 bg-[#FF7420] hover:bg-[#e5681c] text-white font-bold px-7 py-3.5 rounded-xl transition-colors"
              >
                Servicios y productos
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/proyectos"
                className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold px-7 py-3.5 rounded-xl transition-colors"
              >
                Ver Proyectos
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              {[
                "Personal altamente calificado",
                "Presencia en el territorio mexicano",
                "Cumplimiento a programas de ejecución"
                
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#FF7420] shrink-0" />
                  <span className="text-gray-300 text-sm">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICIOS ── */}
      <ServicesAndProducts />

      {/* ── EXPERIENCIA ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-16 md:py-24">
        <div className="bg-[#141414] rounded-3xl border border-white/5 overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="relative h-64 md:h-auto min-h-[360px]">
              <Image
                src="/about/team-image.jpg"
                alt="SIFYGSA Equipo"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#141414] hidden md:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent md:hidden" />
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-6 h-px bg-[#FF7420]" />
                <span className="text-[#FF7420] text-xs font-semibold uppercase tracking-[0.3em]">Trayectoria</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black leading-none mb-6">
                10+ <span className="text-[#FF7420]">Años</span><br />
                de experiencia
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Proveemos tecnología e ingeniería vanguardistas que resuelven las necesidades y generan la satisfacción de clientes, proveedores y accionistas, con alto sentido de ética y profesionalismo.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Con 10+ años en el mercado, aseguramos que nuestros proyectos cumplen los estándares más exigentes de seguridad y construcción, garantizando resultados que superan las expectativas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESO (timeline premium) ── */}
      <ProcessTimeline />

      {/* ── PROYECTOS CAROUSEL ── */}
      <ProjectsCarousel />

      {/* ── COLABORADORES ── */}
      <CollaboratorsSection />

      {/* ── STATS + CTA ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-16 md:py-24">
        <div className="bg-[#FF7420] rounded-3xl overflow-hidden">
          <div className="grid md:grid-cols-2 items-center">
            <div className="p-8 md:p-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-6 h-px bg-white/50" />
                <span className="text-white/70 text-xs font-semibold uppercase tracking-[0.3em]">Resultados</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4">
                Liderando la Innovación<br />en Seguridad Industrial
              </h2>
              <p className="text-white/80 text-sm leading-relaxed mb-8">
                En SIFYGSA, no solo ofrecemos soluciones — creamos un futuro más seguro y eficiente para su organización.
              </p>
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 bg-black hover:bg-gray-900 text-white font-bold px-7 py-3.5 rounded-xl transition-colors text-sm"
              >
                Iniciar consulta
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-3 divide-x divide-white/20 border-t md:border-t-0 md:border-l border-white/20">
              {stats.map((s, i) => (
                <div key={i} className="flex flex-col items-center justify-center py-10 px-4 text-center">
                  <p className="text-3xl md:text-4xl font-black text-white">{s.value}</p>
                  <p className="text-white/70 text-xs mt-1 leading-tight max-w-[80px]">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}