import Link from 'next/link'
import Image from 'next/image'
import { Linkedin, Instagram, Facebook } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#1E1E1E] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y About Us */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <Image 
                src="/logos/logo-sifygsa.png" 
                alt="SIFYGSA Fire & Gas" 
                width={200} 
                height={80} 
                placeholder="blur"
                blurDataURL="/placeholder.svg?height=80&width=200"
              />
            </div>
            <h3 className="text-lg font-semibold mb-4">Acerca de</h3>
            <p className="text-sm text-gray-300">
              En Sifygsa, tenemos la confianza de ofrecerle el mejor servicio, respaldado por un equipo de profesionales certificados y altamente capacitados. Gracias a los materiales de alta calidad que utilizamos y a nuestras técnicas de trabajo estructuradas, garantizamos la finalización oportuna de todos nuestros proyectos.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="https://mx.linkedin.com/company/sifygsa" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#FF7420]">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/sifygsa_in/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#FF7420]">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://es-es.facebook.com/sifygsa/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#FF7420]">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Oficina */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Oficinas</h3>
            <p className="text-sm text-gray-300 mb-4">
              Blvd. Leandro Rovirosa No. 508,<br />
              86357 Comalcalco, Tabasco.
            </p>
            <p className="text-sm text-gray-300 mb-4">
              Mariano Matamoros No. 11,<br />
              Centro, 96700 Minatitlán,<br />
              Veracruz.<br />
            </p>
            <p className="text-sm text-gray-300">
            Carretera Antigua Mina No. S/N, <br />
            Ubicado frente a la planta de<br />
            BONAFONT, 96904 Mapachapa,<br />
            Veracruz.<br />
            </p>
          </div>

          {/* Contacto */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contactos Directos</h3>
            <p className="text-sm text-gray-300 mb-2">
              Email: <a href="mailto:contacto@sifygsa.com.mx" className="hover:text-[#FF7420]">contacto@sifygsa.com.mx</a>
            </p>
            <p className="text-sm text-gray-300 mb-2">
              <a href="mailto:sifygsa@sifygsa.com.mx" className="hover:text-[#FF7420]">sifygsa@sifygsa.com.mx</a>
            </p>
            <p className="text-sm text-gray-300">
              Llama al: (+52) 922 225 1470/ 933 334 1128
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Pages</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-[#FF7420]">Inicio</Link></li>
              <li><Link href="/acerca-de" className="hover:text-[#FF7420]">Acerca de</Link></li>
              <li><Link href="/servicios-y-productos" className="hover:text-[#FF7420]">Servicios y Productos</Link></li>
              <li><Link href="/proyectos" className="hover:text-[#FF7420]">Proyectos</Link></li>
              <li><Link href="/eventos" className="hover:text-[#FF7420]">Eventos</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>Copyright © 2024 SIFYGSA. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}



