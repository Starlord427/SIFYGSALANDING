import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function Services() {
  const services = [
    { title: "Detección fija de gas y flama", description: "Sistemas avanzados de detección para mayor seguridad." },
    { title: "Sistemas de protección contra caídas", description: "Soluciones integrales para prevenir accidentes laborales." },
    { title: "Control y automatización", description: "Tecnología de punta para optimizar procesos industriales." },
  ]

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Nuestros Servicios y Productos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

