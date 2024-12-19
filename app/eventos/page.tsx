import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarDays, MapPin } from 'lucide-react'

const eventos = [
  {
    id: 1,
    titulo: "Seminario de Seguridad Industrial",
    fecha: "15 de Julio, 2023",
    descripcion: "Únase a nosotros para un día completo de presentaciones y talleres sobre las últimas tendencias en seguridad industrial.",
    lugar: "Hotel Sheraton, San Salvador",
    imagen: "/eventos/seminario-seguridad.jpg",
  },
  {
    id: 2,
    titulo: "Taller de Protección Contra Caídas",
    fecha: "5 de Agosto, 2023",
    descripcion: "Aprenda las mejores prácticas y técnicas para la protección contra caídas en entornos industriales.",
    lugar: "Centro de Capacitación SIFYGSA",
    imagen: "/eventos/taller-proteccion-caidas.jpg",
  },
  {
    id: 3,
    titulo: "Conferencia de Automatización Industrial",
    fecha: "20 de Septiembre, 2023",
    descripcion: "Descubra cómo la automatización está transformando la industria y mejorando la seguridad en el trabajo.",
    lugar: "Centro de Convenciones, San Salvador",
    imagen: "/eventos/conferencia-automatizacion.jpg",
  }
]

export default function Eventos() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Eventos SIFYGSA</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventos.map((evento) => (
            <Card key={evento.id} className="bg-gray-800 border-gray-700">
              <CardHeader className="p-0">
                <div className="relative h-48 w-full">
                  <Image
                    src={evento.imagen}
                    alt={evento.titulo}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                    quality={75}
                    placeholder="blur"
                    blurDataURL="/placeholder.svg?height=400&width=600"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-xl text-[#FF7420] mb-2">{evento.titulo}</CardTitle>
                <div className="flex items-center text-sm text-gray-400 mb-2">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  <span>{evento.fecha}</span>
                </div>
                <div className="flex items-center text-sm text-gray-400 mb-4">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>{evento.lugar}</span>
                </div>
                <p className="text-gray-300 mb-4">{evento.descripcion}</p>
                <Link href={`/eventos/${evento.id}`} passHref>
                  <Button className="w-full bg-[#FF7420] hover:bg-[#FF7420]/80">
                    Más información
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

