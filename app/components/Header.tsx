'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import Head from 'next/head'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/acerca-de', label: 'Acerca de' },
  { href: '/servicios-y-productos', label: 'Servicios y Productos' },
  { href: '/proyectos', label: 'Proyectos' },
  { href: '/eventos', label: 'Eventos' },
]

export default function Header() {
  const [currentPath, setCurrentPath] = useState('/')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setCurrentPath(pathname)
  }, [pathname])

  return (
    <>
      <Head>
        <link rel="icon" href="/public/favicon.ico" />
        <title>Tu Título de Página</title>
      </Head>
      <header className="bg-black w-full h-24">
        <div className="container mx-auto px-4 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/logos/logo-sifygsa.png"
                alt="SIFYGSA Fire & Gas"
                width={150}
                height={75}
                className="h-auto w-auto object-contain"
                priority
              />
            </Link>

            {/* Navigation for desktop */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link 
                  key={item.href}
                  href={item.href} 
                  className={`text-white hover:text-[#FF7420] transition-colors ${
                    currentPath === item.href ? 'text-[#FF7420] border-b-2 border-[#FF7420]' : ''
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Contact Button */}
            <Link
              href="/contacto"
              className={`hidden md:inline-block bg-[#FF7420] text-white px-6 py-2 rounded-md hover:bg-[#FF5500] transition-colors ${
                currentPath === '/contacto' ? 'bg-[#FF5500]' : ''
              }`}
            >
              Contáctanos
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden">
              <nav className="flex flex-col space-y-4 py-4">
                {navItems.map((item) => (
                  <Link 
                    key={item.href}
                    href={item.href} 
                    className={`text-white hover:text-[#FF7420] transition-colors ${
                      currentPath === item.href ? 'text-[#FF7420]' : ''
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/contacto"
                  className="bg-[#FF7420] text-white px-4 py-2 rounded-md hover:bg-[#FF5500] transition-colors text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contáctanos
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  )
}

