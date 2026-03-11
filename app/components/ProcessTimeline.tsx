'use client'

import { useState } from 'react'

const IconDoc = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
  </svg>
)

const IconChart = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
  </svg>
)

const IconWrench = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
  </svg>
)

const IconCheck = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const processSteps = [
  { num: "01", label: "Evaluación y Firma de Contratos",       description: "Analizamos tus necesidades y formalizamos el acuerdo con total transparencia.",                   Icon: IconDoc    },
  { num: "02", label: "Preparación del Plan de Trabajo",       description: "Diseñamos una hoja de ruta detallada con tiempos, recursos y entregables claros.",                  Icon: IconChart  },
  { num: "03", label: "Implementación de Trabajos de Control", description: "Ejecutamos cada etapa con ingeniería de precisión y supervisión constante.",                        Icon: IconWrench },
  { num: "04", label: "Entrega del Proyecto al Cliente",       description: "Presentamos resultados verificados con documentación completa y soporte post-entrega.",             Icon: IconCheck  },
]

export default function ProcessTimeline() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="bg-[#0d0d0d] border-y border-white/5 py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-16">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-6 h-px bg-[#FF7420]" />
              <span className="text-[#FF7420] text-[10px] font-bold uppercase tracking-[0.35em]">Cómo trabajamos</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
              Nuestro <span className="text-[#FF7420]">Proceso</span>
            </h2>
          </div>
          <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
            Cada proyecto sigue una metodología probada que garantiza resultados de clase mundial.
          </p>
        </div>

        {/* Timeline desktop */}
        <div className="hidden md:block">
          <div className="relative mb-2">
            <div className="absolute top-[18px] left-[calc(12.5%-1px)] right-[calc(12.5%-1px)] h-px bg-white/5 z-0" />
            {[0, 1, 2].map((i) => {
              const lit = hoveredIndex !== null && i < hoveredIndex
              return (
                <div
                  key={i}
                  className="absolute top-[18px] h-px z-0 transition-all duration-500"
                  style={{
                    left:  `calc(12.5% + ${i * 25}% + 20px)`,
                    right: `calc(12.5% + ${(2 - i) * 25}% + 20px)`,
                    background: lit ? '#FF7420' : 'rgba(255,255,255,0.05)',
                    boxShadow:  lit ? '0 0 8px rgba(255,116,32,0.6)' : 'none',
                  }}
                />
              )
            })}
          </div>

          <div className="grid grid-cols-4 gap-4 relative z-10">
            {processSteps.map(({ num, label, description, Icon }, i) => {
              const isHovered = hoveredIndex === i
              const isPast    = hoveredIndex !== null && i < hoveredIndex
              return (
                <div
                  key={i}
                  className="flex flex-col items-center text-center cursor-default"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Nodo */}
                  <div
                    className="relative w-9 h-9 rounded-full flex items-center justify-center mb-6 transition-all duration-300"
                    style={{
                      background:  isHovered || isPast ? '#FF7420' : '#1a1a1a',
                      border:      isHovered || isPast ? '2px solid #FF7420' : '2px solid rgba(255,255,255,0.1)',
                      boxShadow:   isHovered ? '0 0 20px rgba(255,116,32,0.5), 0 0 40px rgba(255,116,32,0.15)' : 'none',
                      transform:   isHovered ? 'scale(1.2)' : 'scale(1)',
                    }}
                  >
                    <span className="text-[10px] font-black text-white">{num}</span>
                    {isHovered && (
                      <div className="absolute inset-0 rounded-full animate-ping" style={{ background: 'rgba(255,116,32,0.3)' }} />
                    )}
                  </div>

                  {/* Card */}
                  <div
                    className="w-full rounded-2xl p-6"
                    style={{
                      background:  isHovered ? '#1a1a1a' : '#141414',
                      border:      isHovered ? '1px solid rgba(255,116,32,0.3)' : '1px solid rgba(255,255,255,0.04)',
                      boxShadow:   isHovered ? '0 20px 40px rgba(0,0,0,0.4), 0 0 30px rgba(255,116,32,0.08)' : '0 4px 20px rgba(0,0,0,0.2)',
                      transform:   isHovered ? 'translateY(-4px)' : 'translateY(0)',
                      transition:  'all 0.3s ease',
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-4"
                      style={{
                        background: isHovered ? 'rgba(255,116,32,0.15)' : 'rgba(255,255,255,0.04)',
                        color:      isHovered ? '#FF7420' : '#4b5563',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <Icon />
                    </div>

                    <p className="text-sm font-bold leading-snug mb-3" style={{ color: isHovered ? '#ffffff' : '#d1d5db', transition: 'color 0.3s' }}>
                      {label}
                    </p>
                    <p className="text-xs leading-relaxed" style={{ color: isHovered ? '#9ca3af' : '#374151', transition: 'color 0.3s' }}>
                      {description}
                    </p>

                    <div
                      className="mt-5 h-px rounded-full"
                      style={{
                        background: '#FF7420',
                        width:      isHovered ? '100%' : '0%',
                        transition: 'width 0.5s ease',
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Timeline mobile — vertical */}
        <div className="md:hidden flex flex-col">
          {processSteps.map(({ num, label, description, Icon }, i) => {
            const isHovered = hoveredIndex === i
            return (
              <div
                key={i}
                className="flex gap-5"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="flex flex-col items-center">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      background: isHovered ? '#FF7420' : '#1a1a1a',
                      border:     isHovered ? '2px solid #FF7420' : '2px solid rgba(255,255,255,0.1)',
                      boxShadow:  isHovered ? '0 0 20px rgba(255,116,32,0.5)' : 'none',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <span className="text-[10px] font-black text-white">{num}</span>
                  </div>
                  {i < processSteps.length - 1 && (
                    <div
                      className="w-px flex-1 my-1"
                      style={{
                        background: isHovered ? '#FF7420' : 'rgba(255,255,255,0.06)',
                        transition: 'background 0.5s ease',
                      }}
                    />
                  )}
                </div>

                <div
                  className="rounded-2xl p-5 mb-4 flex-1"
                  style={{
                    background: isHovered ? '#1a1a1a' : '#141414',
                    border:     isHovered ? '1px solid rgba(255,116,32,0.3)' : '1px solid rgba(255,255,255,0.04)',
                    boxShadow:  isHovered ? '0 10px 30px rgba(255,116,32,0.08)' : 'none',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                    style={{
                      background: isHovered ? 'rgba(255,116,32,0.15)' : 'rgba(255,255,255,0.04)',
                      color:      isHovered ? '#FF7420' : '#4b5563',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <Icon />
                  </div>
                  <p className="text-sm font-bold leading-snug mb-2" style={{ color: isHovered ? '#ffffff' : '#d1d5db', transition: 'color 0.3s' }}>
                    {label}
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: isHovered ? '#9ca3af' : '#374151', transition: 'color 0.3s' }}>
                    {description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}