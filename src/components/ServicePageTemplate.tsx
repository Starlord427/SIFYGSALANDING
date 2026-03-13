// src/components/ServicePageTemplate.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

interface ProductCategory {
  id: string
  tipo: string
  descripcion: string | null
  imagen: string | null
  items: string[]
  order: number
}

export interface ServicePageProps {
  title: string
  subtitle: string
  imageSrc: string
  imageAlt: string
  description: string
  features: string[]
  services: string[]
  whyTitle: string
  whyText: string[]
  /** Palabra clave para filtrar categorías relacionadas, ej: "gas", "incendio", "automatización" */
  categoryKeyword?: string
  backHref?: string
}

function ProductsCarousel({ keyword }: { keyword?: string }) {
  const [categories, setCategories] = useState<ProductCategory[]>([])
  const [loading,    setLoading]    = useState(true)
  const scrollRef                    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch('/api/product-categories')
      .then(r => r.json())
      .then((all: ProductCategory[]) => {
        if (!keyword) { setCategories(all.slice(0, 5)); return }
        const kw = keyword.toLowerCase()
        const related = all.filter(c =>
          c.tipo.toLowerCase().includes(kw) ||
          (c.descripcion || '').toLowerCase().includes(kw)
        )
        setCategories(related.length >= 1 ? related : all.slice(0, 5))
      })
      .catch(() => setCategories([]))
      .finally(() => setLoading(false))
  }, [keyword])

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'right' ? 300 : -300, behavior: 'smooth' })
  }

  if (loading) return (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-[#FF7420]" />
    </div>
  )

  if (categories.length === 0) return null

  return (
    <section className="mt-10">
      <div className="flex items-end justify-between mb-6">
        <div>
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-6 h-px bg-[#FF7420]" />
            <span className="text-[#FF7420] text-[10px] font-bold uppercase tracking-[0.3em]">Catálogo</span>
          </div>
          <h2 className="text-white font-black text-2xl">Productos relacionados</h2>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <button onClick={() => scroll('left')} className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button onClick={() => scroll('right')} className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map(cat => (
          <div key={cat.id} className="snap-start shrink-0 w-72 bg-[#141414] border border-white/5 hover:border-[#FF7420]/20 rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-[0_0_20px_rgba(255,116,32,0.05)]">
            {/* Imagen */}
            <div className="relative h-36 bg-[#1a1a1a]">
              {cat.imagen ? (
                <Image src={cat.imagen} alt={cat.tipo} fill className="object-cover opacity-80" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent" />
            </div>

            <div className="p-5">
              <p className="text-white font-bold text-sm leading-tight mb-2">{cat.tipo}</p>
              {cat.descripcion && (
                <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-3">{cat.descripcion}</p>
              )}

              {/* Primeros 3 items */}
              <ul className="space-y-1 mb-4">
                {(cat.items as string[]).slice(0, 3).map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-400 text-xs">
                    <span className="w-1 h-1 rounded-full bg-[#FF7420] shrink-0" />
                    {item}
                  </li>
                ))}
                {(cat.items as string[]).length > 3 && (
                  <li className="text-gray-600 text-xs pl-3">+{(cat.items as string[]).length - 3} más</li>
                )}
              </ul>

              <Link
                href="/contacto"
                className="inline-flex w-full items-center justify-center gap-1.5 bg-[#FF7420] hover:bg-[#e5681c] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors"
              >
                Solicitar información
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </div>
        ))}

        {/* CTA card */}
        <div className="snap-start shrink-0 w-64 bg-[#FF7420] rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <p className="text-white font-black text-sm leading-tight mb-2">¿No encuentras lo que buscas?</p>
            <p className="text-white/80 text-xs leading-relaxed">Contáctanos y te asesoramos con la solución ideal para tu industria.</p>
          </div>
          <Link href="/contacto" className="mt-4 inline-flex items-center justify-center bg-white text-[#FF7420] text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-white/90 transition-all">
            Hablar con un experto
          </Link>
        </div>
      </div>
    </section>
  )
}

export default function ServicePageTemplate({
  title, subtitle, imageSrc, imageAlt, description,
  features, services, whyTitle, whyText, categoryKeyword,
  backHref = '/servicios-y-productos'
}: ServicePageProps) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-20">

      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FF7420]/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-16">

          <Link href={backHref} className="inline-flex items-center gap-2 text-gray-600 hover:text-[#FF7420] text-xs font-semibold transition-colors mb-10 group">
            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Volver a Servicios
          </Link>

          <div className="mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-px bg-[#FF7420]" />
              <span className="text-[#FF7420] text-[10px] font-bold uppercase tracking-[0.3em]">{subtitle}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black leading-tight text-white max-w-3xl">{title}</h1>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="relative rounded-3xl overflow-hidden border border-white/5 aspect-[4/3]">
              <Image src={imageSrc} alt={imageAlt} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            <div className="bg-[#141414] rounded-3xl border border-white/5 p-8 flex flex-col justify-between min-h-[300px]">
              <div>
                <div className="inline-flex items-center gap-2 mb-4">
                  <span className="w-4 h-px bg-[#FF7420]" />
                  <span className="text-[#FF7420] text-[10px] font-bold uppercase tracking-[0.3em]">Descripción</span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
              </div>
              <Link href="/contacto" className="mt-8 inline-flex items-center justify-center gap-2 bg-[#FF7420] hover:bg-[#e5681c] text-white font-bold py-3.5 px-6 rounded-xl transition-colors text-sm">
                Solicitar una consulta
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-16 pb-20">

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#141414] rounded-3xl border border-white/5 p-8">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-4 h-px bg-[#FF7420]" />
              <span className="text-[#FF7420] text-[10px] font-bold uppercase tracking-[0.3em]">Características</span>
            </div>
            <ul className="space-y-3">
              {features.map((f, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#FF7420]/10 border border-[#FF7420]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-2.5 h-2.5 text-[#FF7420]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span className="text-gray-300 text-sm leading-relaxed">{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#141414] rounded-3xl border border-white/5 p-8">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-4 h-px bg-[#FF7420]" />
              <span className="text-[#FF7420] text-[10px] font-bold uppercase tracking-[0.3em]">Servicios incluidos</span>
            </div>
            <ul className="space-y-3">
              {services.map((s, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-2.5 h-2.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </div>
                  <span className="text-gray-300 text-sm leading-relaxed">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 bg-[#141414] rounded-3xl border border-white/5 p-8 md:p-10">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-4 h-px bg-[#FF7420]" />
            <span className="text-[#FF7420] text-[10px] font-bold uppercase tracking-[0.3em]">¿Por qué elegirnos?</span>
          </div>
          <h2 className="text-white font-black text-xl mb-6">{whyTitle}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {whyText.map((t, i) => (
              <p key={i} className="text-gray-400 text-sm leading-relaxed">{t}</p>
            ))}
          </div>
        </div>

        {/* Carrusel de productos relacionados */}
        <ProductsCarousel keyword={categoryKeyword} />

        <div className="mt-10 bg-[#FF7420] rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-white font-black text-xl mb-1">¿Listo para comenzar?</p>
            <p className="text-white/80 text-sm">Nuestro equipo está listo para asesorarte con la solución ideal.</p>
          </div>
          <Link href="/contacto" className="shrink-0 inline-flex items-center gap-2 bg-white text-[#FF7420] font-bold py-3 px-7 rounded-xl hover:bg-white/90 transition-all text-sm">
            Contactar ahora
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>

      </div>
    </div>
  )
}
