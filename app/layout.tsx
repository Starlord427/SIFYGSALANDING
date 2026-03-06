import './globals.css'
import { Inter } from 'next/font/google'
import Header from './components/Header'
import { Analytics } from '@vercel/analytics/next'
import Footer from './components/Footer'
import ScrollToTopButton from '@/components/ScrollToTopButton'
import Providers from './components/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SIFYGSA - Soluciones Integrales en Fire & Gas',
  description: 'SIFYGSA ofrece soluciones integrales en sistemas de detección y protección contra incendios y gases para la industria Global.',
  openGraph: {
    title: 'SIFYGSA - Soluciones Integrales en Fire & Gas',
    description: 'Soluciones integrales en sistemas de detección y protección contra incendios y gases para la industria Global.',
    type: 'website',
    url: 'https://www.sifygsa.com.mx',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="font-sans">
      <body className={inter.className}>
        <Providers>
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

