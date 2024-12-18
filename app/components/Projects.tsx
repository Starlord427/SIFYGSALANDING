import Image from 'next/image'
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function Projects() {
  const projects = [
    { title: "Proyecto 1", description: "Descripción breve del proyecto 1", image: "/project1.jpg" },
    { title: "Proyecto 2", description: "Descripción breve del proyecto 2", image: "/project2.jpg" },
    { title: "Proyecto 3", description: "Descripción breve del proyecto 3", image: "/project3.jpg" },
  ]

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Nuestros Proyectos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="bg-gray-800">
              <Image 
                src={project.image} 
                alt={project.title} 
                width={400} 
                height={300} 
                className="w-full h-48 object-cover"
                placeholder="blur"
                blurDataURL="/placeholder.svg?height=300&width=400"
                loading="lazy"
              />
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

