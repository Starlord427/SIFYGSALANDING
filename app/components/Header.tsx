'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const navItems = [
  { href: '/',                      label: 'Inicio' },
  { href: '/acerca-de',             label: 'Acerca de' },
  { href: '/servicios-y-productos', label: 'Servicios y Productos' },
  { href: '/proyectos',             label: 'Proyectos' },
  { href: '/eventos',               label: 'Eventos' },
]

export default function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled,   setScrolled]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setIsMenuOpen(false) }, [pathname])

  return (
    <>
      {/* ── Gradiente hero independiente ──
          h-44 (176px) > h-20 del header, así el "to-transparent"
          termina mucho más abajo y no coincide con el borde del header. 
          Se desvanece suavemente cuando hay scroll. */}
      <div
        className={`fixed top-0 left-0 right-0 h-44 pointer-events-none z-40 transition-opacity duration-500 ${
          scrolled ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, transparent 100%)' }}
      />

      {/* ── Header bar — bg transparent cuando no hay scroll ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0a0a0a]/95 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
            : 'bg-transparent'
        }`}
      >
        {/* Borde inferior que aparece en opacidad — nunca parpadea */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-px bg-white/5 transition-opacity duration-500 ${
            scrolled ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <Link href="/" className="relative z-10 shrink-0">
              <Image
                src="/logos/logo-sifygsa.png"
                alt="SIFYGSA Fire & Gas"
                width={140}
                height={56}
                className="h-10 w-auto"
                priority
              />
            </Link>

            {/* Nav desktop */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const active = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg group ${
                      active ? 'text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#FF7420] transition-all duration-300 ${
                        active ? 'opacity-100 scale-100' : 'opacity-0 scale-0 group-hover:opacity-50 group-hover:scale-100'
                      }`}
                    />
                  </Link>
                )
              })}
            </nav>

            {/* CTA desktop */}
            <Link
              href="/contacto"
              className={`hidden md:inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl transition-all ${
                pathname === '/contacto'
                  ? 'bg-[#e5681c] text-white'
                  : 'bg-[#FF7420] hover:bg-[#e5681c] text-white'
              }`}
            >
              Contáctanos
            </Link>

            {/* Burger móvil */}
            <button
              className="md:hidden relative z-10 w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`absolute transition-all duration-200 ${isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'}`}>
                <X size={18} />
              </span>
              <span className={`absolute transition-all duration-200 ${isMenuOpen ? 'opacity-0 -rotate-90' : 'opacity-100 rotate-0'}`}>
                <Menu size={18} />
              </span>
            </button>

          </div>
        </div>
      </header>

      {/* ── Overlay menú móvil ── */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* ── Panel deslizante ── */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 bg-[#0a0a0a] border-b border-white/5 transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="h-20" />
        <nav className="px-6 pb-6 flex flex-col gap-1">
          {navItems.map((item, i) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                style={{ transitionDelay: isMenuOpen ? `${i * 40}ms` : '0ms' }}
                className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                } ${
                  active ? 'bg-white/5 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.label}
                {active && <span className="w-1.5 h-1.5 rounded-full bg-[#FF7420]" />}
              </Link>
            )
          })}
          <Link
            href="/contacto"
            onClick={() => setIsMenuOpen(false)}
            className="mt-3 flex items-center justify-center gap-2 bg-[#FF7420] hover:bg-[#e5681c] text-white font-bold px-5 py-3 rounded-xl text-sm transition-colors"
          >
            Contáctanos
          </Link>
        </nav>
      </div>
    </>
  )
}