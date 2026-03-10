import Link from 'next/link'
import Image from 'next/image'
import { Linkedin, Instagram, Facebook } from 'lucide-react'

const navLinks = [
  { href: '/',                      label: 'Inicio' },
  { href: '/acerca-de',             label: 'Acerca de' },
  { href: '/servicios-y-productos', label: 'Servicios y Productos' },
  { href: '/proyectos',             label: 'Proyectos' },
  { href: '/eventos',               label: 'Eventos' },
]

const offices = [
  { city: 'Comalcalco, Tab.', address: 'Blvd. Leandro Rovirosa No. 508, 86357 Comalcalco, Tabasco.' },
  { city: 'Minatitlán, Ver.', address: 'Mariano Matamoros No. 11, Centro, 96700 Minatitlán, Veracruz.' },
  { city: 'Mapachapa, Ver.',  address: 'Carretera Antigua Mina S/N, frente a planta BONAFONT, 96904 Mapachapa, Veracruz.' },
]

const socials = [
  { href: 'https://mx.linkedin.com/company/sifygsa',  icon: Linkedin,  label: 'LinkedIn' },
  { href: 'https://www.instagram.com/sifygsa_in/',    icon: Instagram, label: 'Instagram' },
  { href: 'https://es-es.facebook.com/sifygsa/',      icon: Facebook,  label: 'Facebook' },
]

function FooterLabel({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-2 mb-5">
      <span className="w-4 h-px bg-[#FF7420]" />
      <span className="text-[#FF7420] text-[10px] font-bold uppercase tracking-[0.25em]">{text}</span>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5">

      {/* ── Cuerpo principal ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Columna 1 — Logo + descripción + redes */}
        <div className="sm:col-span-2 lg:col-span-1">
          <Link href="/" className="inline-block mb-5">
            <Image
              src="/logos/logo-sifygsa.png"
              alt="SIFYGSA Fire & Gas"
              width={140}
              height={56}
              className="h-10 w-auto"
            />
          </Link>
          <p className="text-gray-500 text-xs leading-relaxed mb-6">
            Proveemos tecnología e ingeniería vanguardistas respaldadas por profesionales certificados, garantizando la finalización oportuna y de calidad en todos nuestros proyectos.
          </p>
          <div className="flex gap-3">
            {socials.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 hover:bg-[#FF7420] hover:border-[#FF7420] hover:text-white transition-all duration-300"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Columna 2 — Páginas */}
        <div>
          <FooterLabel text="Páginas" />
          <ul className="space-y-2">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-gray-400 hover:text-white text-sm transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span className="w-0 h-px bg-[#FF7420] group-hover:w-3 transition-all duration-200" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Columna 3 — Oficinas */}
        <div>
          <FooterLabel text="Oficinas" />
          <ul className="space-y-4">
            {offices.map(({ city, address }) => (
              <li key={city}>
                <p className="text-white text-xs font-semibold mb-0.5">{city}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{address}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Columna 4 — Contacto */}
        <div>
          <FooterLabel text="Contacto" />
          <ul className="space-y-3">
            <li>
              <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-0.5">Email</p>
              <a href="mailto:contacto@sifygsa.com.mx" className="text-gray-300 hover:text-[#FF7420] text-xs transition-colors">
                contacto@sifygsa.com.mx
              </a>
            </li>
            <li>
              <a href="mailto:sifygsa@sifygsa.com.mx" className="text-gray-300 hover:text-[#FF7420] text-xs transition-colors">
                sifygsa@sifygsa.com.mx
              </a>
            </li>
            <li>
              <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-0.5">Teléfono</p>
              <a href="tel:+529222251470" className="text-gray-300 hover:text-[#FF7420] text-xs transition-colors block">
                (+52) 922 225 1470
              </a>
              <a href="tel:+529333341128" className="text-gray-300 hover:text-[#FF7420] text-xs transition-colors block">
                (+52) 933 334 1128
              </a>
            </li>
            <li className="pt-2">
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 bg-[#FF7420] hover:bg-[#e5681c] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors"
              >
                Consultar
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </li>
          </ul>
        </div>

      </div>

      {/* ── Copyright ── */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} SIFYGSA. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF7420]" />
            <span className="text-gray-600 text-xs">Soluciones Integrales en Fire & Gas</span>
          </div>
        </div>
      </div>

    </footer>
  )
}