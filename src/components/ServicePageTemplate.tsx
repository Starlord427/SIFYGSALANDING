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
  categoryKeyword?: string
  backHref?: string
}

// ── Placeholders ──────────────────────────────────────────────────────────────

const GRADIENTS = [
  'from-[#1a0d00] to-[#2d1800]',
  'from-[#00141a] to-[#001f2d]',
  'from-[#0d1a00] to-[#162900]',
  'from-[#1a0014] to-[#2d0022]',
  'from-[#001a14] to-[#00291f]',
  'from-[#1a1400] to-[#2d2200]',
  'from-[#00001a] to-[#00002d]',
  'from-[#1a0a00] to-[#2d1500]',
]

function CategoryIcon({ tipo, className }: { tipo: string; className?: string }) {
  const t = tipo.toLowerCase()
  if (t.includes('gas') || t.includes('flama'))
    return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" /></svg>
  if (t.includes('caída') || t.includes('caidas') || t.includes('protec'))
    return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
  if (t.includes('control') || t.includes('automat'))
    return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
  if (t.includes('humo') || t.includes('incendio'))
    return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
  if (t.includes('video') || t.includes('vigilancia'))
    return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
  if (t.includes('aire') || t.includes('compres'))
    return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" /></svg>
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
}

function CatImage({ src, alt, tipo, index, className }: {
  src: string | null
  alt: string
  tipo: string
  index: number
  className?: string
}) {
  const [errored, setErrored] = useState(false)
  const gradient = GRADIENTS[index % GRADIENTS.length]

  const Placeholder = () => (
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} flex flex-col items-center justify-center gap-2`}>
      <CategoryIcon tipo={tipo} className="w-8 h-8 text-[#FF7420]/50" />
      <span className="text-[9px] font-semibold uppercase tracking-widest text-[#FF7420]/30 px-3 text-center leading-tight">
        {tipo}
      </span>
    </div>
  )

  if (!src || errored) return <Placeholder />

  return (
    <img
      src={src}
      alt={alt}
      className={`absolute inset-0 w-full h-full ${className ?? 'object-cover'}`}
      onError={() => setErrored(true)}
    />
  )
}

// ── Carrusel ──────────────────────────────────────────────────────────────────

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
        {categories.map((cat, index) => (
          <div key={cat.id} className="snap-start shrink-0 w-72 bg-[#141414] border border-white/5 hover:border-[#FF7420]/20 rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-[0_0_20px_rgba(255,116,32,0.05)] flex flex-col">
            <div className="relative h-36 bg-[#1a1a1a]">
              <CatImage
                src={cat.imagen}
                alt={cat.tipo}
                tipo={cat.tipo}
                index={index}
                className="object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent" />
            </div>

            <div className="p-5 flex flex-col flex-1">
              <p className="text-white font-bold text-sm leading-tight mb-2">{cat.tipo}</p>
              {cat.descripcion && (
                <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-3">{cat.descripcion}</p>
              )}

              <ul className="space-y-1 mb-4 flex-1">
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

// ── Template principal ────────────────────────────────────────────────────────

export default function ServicePageTemplate({
  title, subtitle, imageSrc, imageAlt, description,
  features, services, whyTitle, whyText, categoryKeyword,
  backHref = '/servicios'
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