import Image from 'next/image'

export default function About() {
  return (
    <section className="py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Acerca de SIFYGSA</h2>
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <p className="text-lg mb-4">
              Somos un equipo formado por profesionales altamente capacitados que satisfacen las necesidades de nuestros clientes. Con años de experiencia en el sector, SIFYGSA se ha convertido en un referente en soluciones integrales de Fire & Gas.
            </p>
            <ul className="list-disc list-inside">
              <li>Presencia en el País</li>
              <li>Personal Altamente Profesional</li>
              <li>Mano de Obra Calificada</li>
            </ul>
          </div>
          <div className="md:w-1/2">
            <Image src="/about-image.jpg" alt="SIFYGSA Team" width={500} height={300} className="rounded-lg" />
          </div>
        </div>
      </div>
    </section>
  )
}

