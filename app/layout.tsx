import './globals.css'
import { Inter } from 'next/font/google'
import Header from './components/Header'
import { Analytics } from '@vercel/analytics/next'
import Footer from './components/Footer'
import ScrollToTopButton from '@/components/ScrollToTopButton'
import Providers from './components/Providers'
import SessionGuard from '@/components/SessionGuard'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SIFYGSA - Soluciones Integrales en Fire & Gas',
  description: 'SIFYGSA ofrece soluciones integrales en sistemas de detección y protección contra incendios y gases para la industria Global.',
  keywords: 'SIFYGSA, fire, gas, seguridad industrial, detección de incendios, protección contra incendios',
  author: 'SIFYGSA',
  openGraph: {
    title: 'SIFYGSA - Soluciones Integrales en Fire & Gas',
    description: 'Soluciones integrales en sistemas de detección y protección contra incendios y gases para la industria Global.',
    type: 'website',
    url: 'https://www.sifygsa.com.mx',
    image: 'https://www.sifygsa.com/og-image.jpg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${inter.className} bg-[#0a0a0a]`}>
        <Providers>
          <SessionGuard />
          <Header />
          {children}
          <Footer />
          <ScrollToTopButton />
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}