import { Button } from "@/components/ui/button"

export default function HeroBanner() {
  return (
    <section className="relative h-[80vh] bg-[url('/hero-image.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative container mx-auto h-full flex flex-col justify-center items-start text-white">
        <h1 className="text-5xl font-bold mb-4">Soluciones Integrales en Fire & Gas SA de SV</h1>
        <p className="text-2xl mb-8">En SIFYGSA hacemos que las cosas sucedan.</p>
        <div className="space-x-4">
          <Button className="bg-[#FF7420] hover:bg-[#FF7420]/90">Nuestros Servicios</Button>
          <Button variant="outline">Ver Proyectos</Button>
        </div>
      </div>
    </section>
  )
}

