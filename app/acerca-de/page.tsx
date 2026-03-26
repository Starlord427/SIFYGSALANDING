'use client'

import Image from 'next/image'
import Link from 'next/link'

const stats = [
  { number: "10+", label: "Años de experiencia" },
  { number: "290+", label: "Proyectos completados" },
  { number: "50+", label: "Socios estratégicos" },
]

const valores = [
  { title: "Honestidad", content: "Somos transparentes, congruentes y dignos de confianza en cada interacción con nuestros clientes y colaboradores." },
  { title: "Lealtad", content: "Defendemos los ideales de nuestra organización y los compromisos adquiridos en los buenos y en los malos momentos." },
  { title: "Respeto", content: "Tratamos a las personas como queremos ser tratados, respetamos nuestras instituciones y cuidamos nuestro entorno." },
  { title: "Responsabilidad", content: "Cumplimos con nuestros compromisos y pactos con las entidades involucradas para llegar a las metas fijadas." },
  { title: "Compromiso", content: "Alcanzamos los objetivos establecidos de manera eficaz y efectiva, sin excepciones." },
  { title: "Confianza", content: "Establecemos vínculos duraderos a través del respeto y la honestidad con cada cliente." },
  { title: "Integridad", content: "Actuamos e inspiramos valores en pensamiento y acción, siendo congruentes en todo momento." },
]

const politicas = [
  "Medimos nuestros procesos y procedimientos, siempre buscando la mejora continua del Sistema de Gestión de Calidad.",
  "La mejora continua representa una entrada de servicio al cliente para garantizar su satisfacción.",
  "Hemos optimizado la comunicación con nuestros socios comerciales.",
  "Buscamos oportunidades a través de una gestión eficiente y eficaz con los recursos disponibles.",
  "Desarrollamos competencias relevantes para la satisfacción del cliente.",
  "Estructuramos mejores relaciones de ganar-ganar con nuestros socios comerciales.",
  "Garantizamos que los productos y servicios cumplan criterios de seguridad y salud para su uso previsto.",
  "Desarrollamos una gestión normativa ambiental que minimiza el impacto y asegura la disposición adecuada de residuos.",
]

export default function AcercaDe() {
  return (
    <main className="bg-[#0a0a0a] text-white min-h-screen">

      {/* ── HERO ── */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <Image
          src="/about/hero-background.jpg"
          alt="SIFYGSA"
          fill
          className="object-cover opacity-90"
          priority
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/40 via-transparent to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/60 to-transparent" />

        <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-16 pb-16 max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-px bg-[#FF7420]" />
            <span className="text-[#FF7420] text-xs font-semibold uppercase tracking-[0.3em]">Quiénes somos</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black tracking-tight leading-none mb-6 max-w-3xl">
            Líderes en<br />
            <span className="text-[#FF7420]">Seguridad</span><br />
            Industrial
          </h1>
          <p className="text-gray-400 max-w-lg text-sm md:text-base leading-relaxed">
            10+ años definiendo soluciones hechas a la medida con compromiso con la seguridad y eficiencia de sus procesos industriales.
          </p>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-[#141414] rounded-2xl border border-white/5 px-8 py-8 flex items-center gap-6 hover:border-[#FF7420]/30 transition-colors duration-300"
            >
              <span className="text-5xl font-black text-[#FF7420]">{s.number}</span>
              <span className="text-gray-400 text-sm leading-tight max-w-[120px]">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── MISIÓN ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-10">
        <div className="bg-[#141414] rounded-3xl border border-white/5 overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Imagen */}
            <div className="relative h-64 md:h-auto min-h-[320px]">
              <Image
                src="/about/priority-image.jpg"
                alt="SIFYGSA en acción"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#141414] hidden md:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent md:hidden" />
            </div>
            {/* Texto */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-6 h-px bg-[#FF7420]" />
                <span className="text-[#FF7420] text-xs font-semibold uppercase tracking-[0.3em]">Nuestra misión</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-5 leading-tight">
                Usted es nuestra<br />prioridad
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Nuestro propósito es ayudarlo a operar en un ambiente seguro, confiable y eficiente. Nuestro personal aplica sus habilidades para asegurar que su empresa esté protegida de manera óptima.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                Sabemos que cada organización es única, por tanto sumamos esfuerzos para definir soluciones hechas a la medida en compromiso con la seguridad y eficiencia de sus procesos.
              </p>
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 bg-[#FF7420] hover:bg-[#e5681c] text-white text-sm font-bold px-6 py-3 rounded-xl transition-colors w-fit"
              >
                Contáctenos
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── VISIÓN ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-6">
        <div className="bg-[#FF7420] rounded-3xl overflow-hidden">
          <div className="grid md:grid-cols-2 items-center">
            <div className="p-8 md:p-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-6 h-px bg-white/60" />
                <span className="text-white/70 text-xs font-semibold uppercase tracking-[0.3em]">Hacia el futuro</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-5 leading-tight">
                Nuestra Visión
              </h2>
              <p className="text-white/80 text-sm leading-relaxed">
                Consolidar a SIFYGSA como empresa líder en Soluciones de Seguridad y Automatización de procesos para el mercado Industrial Nacional, y ser una gran empresa para trabajar — referente de confianza, innovación y excelencia operativa para el 2026.
              </p>
            </div>
            <div className="relative h-56 md:h-72 overflow-hidden">
              <Image
                src="/about/timeline-image.jpg"
                alt="Trayectoria SIFYGSA"
                fill
                className="object-cover opacity-90 mix-blend-luminosity"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── VALORES ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-10">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-px bg-[#FF7420]" />
            <span className="text-[#FF7420] text-xs font-semibold uppercase tracking-[0.3em]">Lo que nos define</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black">Nuestros Valores</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {valores.map((v, i) => (
            <div
              key={i}
              className="bg-[#141414] rounded-2xl border border-white/5 p-6 group hover:bg-[#1a1a1a] hover:border-[#FF7420]/30 transition-all duration-300"
            >
              <div className="w-6 h-0.5 bg-[#FF7420] mb-4" />
              <h3 className="font-black text-base mb-2 text-white">{v.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed group-hover:text-gray-400 transition-colors">{v.content}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── POLÍTICAS ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-6 pb-16">
        <div className="bg-[#141414] rounded-3xl border border-white/5 overflow-hidden">
          <div className="grid md:grid-cols-5">

            {/* Header lateral */}
            <div className="md:col-span-2 bg-[#1a1a1a] p-8 md:p-12 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/5">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-6 h-px bg-[#FF7420]" />
                <span className="text-[#FF7420] text-xs font-semibold uppercase tracking-[0.3em]">Nuestro compromiso</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black leading-tight mb-5">
                Políticas de<br />Calidad
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                SIFYGSA basa sus operaciones en principios de calidad, sostenibilidad y mejora continua para garantizar soluciones de excelencia a cada cliente.
              </p>
            </div>

            {/* Lista */}
            <div className="md:col-span-3">
              <ul>
                {politicas.map((p, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-4 px-8 py-4 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors"
                  >
                    <span className="text-[#FF7420] font-black text-xs shrink-0 mt-0.5 tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="text-gray-400 text-sm leading-relaxed">{p}</p>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="border-t border-white/5 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-white">¿Listo para trabajar<br className="hidden md:block" /> con nosotros?</h2>
            <p className="text-gray-500 text-sm mt-2">Cuéntenos sobre su proyecto y le ayudamos a encontrar la solución ideal.</p>
          </div>
          <Link
            href="/contacto"
            className="shrink-0 inline-flex items-center gap-3 bg-[#FF7420] hover:bg-[#e5681c] text-white font-black px-8 py-4 rounded-2xl text-sm transition-colors"
          >
            Iniciar consulta
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

    </main>
  )
}