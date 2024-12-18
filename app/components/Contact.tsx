import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function Contact() {
  return (
    <section className="py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Contáctanos</h2>
        <div className="max-w-md mx-auto">
          <form className="space-y-4">
            <Input type="text" placeholder="Nombre" />
            <Input type="email" placeholder="Correo electrónico" />
            <Input type="tel" placeholder="Teléfono" />
            <Textarea placeholder="Mensaje" />
            <Button className="w-full bg-[#FF7420] hover:bg-[#FF7420]/90">Enviar mensaje</Button>
          </form>
        </div>
      </div>
    </section>
  )
}

