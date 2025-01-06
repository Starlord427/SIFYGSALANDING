import './globals.css'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import Header from './components/Header'
import { Analytics } from "@vercel/analytics/react"
import Footer from './components/Footer'
import ScrollToTopButton from '@/components/ScrollToTopButton'

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
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
        <ScrollToTopButton />
      </body>
    </html>
  )
}

