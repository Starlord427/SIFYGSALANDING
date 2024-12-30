'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

const servicios = [
  {
    id: "deteccion-gas-flama",
    titulo: "Detección fija de gas y flama",
    descripcion: "Sistemas avanzados para la detección temprana de gases peligrosos y fuego en instalaciones industriales.",
    imagen: "/servicios/servicio-deteccion.jpg"
  },
  {
    id: "proteccion-caidas",
    titulo: "Sistemas de protección contra caídas",
    descripcion: "Equipos y soluciones para garantizar la seguridad del personal en trabajos en altura.",
    imagen: "/servicios/servicio-proteccion-caidas.jpg"
  },
  {
    id: "control-automatizacion",
    titulo: "Control y automatización",
    descripcion: "Implementación de sistemas de control y automatización para optimizar procesos industriales.",
    imagen: "/servicios/servicio-automatizacion.jpg"
  },
  {
    id: "deteccion-humo-incendios",
    titulo: "Detección de humo y supresión de incendios",
    descripcion: "Sistemas integrales para la detección temprana de humo y la supresión efectiva de incendios.",
    imagen: "/servicios/servicio-deteccion-humo.jpg"
  },
  {
    id: "notificacion-emergencias",
    titulo: "Notificación masiva de emergencias",
    descripcion: "Soluciones de comunicación rápida y eficiente para situaciones de emergencia.",
    imagen: "/servicios/servicio-notificacion.jpg"
  },
  {
    id: "intercomunicacion-voceo",
    titulo: "Intercomunicación y voceo",
    descripcion: "Sistemas de comunicación interna para mejorar la coordinación y seguridad en las instalaciones.",
    imagen: "/servicios/servicio-intercomunicacion.jpg"
  },
  {
    id: "tratamiento-aire-gas",
    titulo: "Tratamiento de aire y gas",
    descripcion: "Tecnologías avanzadas para el tratamiento y purificación de aire y gases industriales.",
    imagen: "/servicios/servicio-tratamiento-aire.jpg"
  },
  {
    id: "compresion-aire",
    titulo: "Compresión de aire",
    descripcion: "Equipos y sistemas de compresión de aire para aplicaciones industriales diversas.",
    imagen: "/servicios/servicio-compresion-aire.jpg"
  },
  {
    id: "interruptores",
    titulo: "Interruptores",
    descripcion: "Soluciones en interruptores de alta calidad para sistemas eléctricos industriales.",
    imagen: "/servicios/servicio-interruptores.jpg"
  },
  {
    id: "proteccion-equipos",
    titulo: "Protección de equipos e instalaciones",
    descripcion: "Sistemas integrales para la protección de equipos críticos e instalaciones industriales.",
    imagen: "/servicios/servicio-proteccion-equipos.jpg"
  },
  {
    id: "videovigilancia",
    titulo: "Sistemas de videovigilancia",
    descripcion: "Tecnología de punta en sistemas de videovigilancia para mejorar la seguridad en sus instalaciones.",
    imagen: "/servicios/servicio-videovigilancia.jpg"
  },
  {
    id: "aire-instrumentos",
    titulo: "Sistemas de aire para instrumentos",
    descripcion: "Soluciones especializadas de aire comprimido para instrumentos y controles industriales.",
    imagen: "/servicio-aire-instrumentos.jpg"
  }
]

const productos = [
  {
    tipo: "Detección de gas y flama",
    descripcion: "Ofrecemos una amplia gama de soluciones para la detección temprana de gases peligrosos y llamas, garantizando la seguridad en entornos industriales.",
    imagen: "/productos/deteccion-gas-flama.jpg",
    items: [
      {
        nombre: "Detectores fijos de gas y flama",
        descripcion: "Dispositivos de alta precisión para la detección continua de gases combustibles y tóxicos, así como de llamas en áreas críticas.",
        imagen: "/productos/detector-fijo-gas-flama.jpg"
      },
      {
        nombre: "Kits y accesorios de calibración",
        descripcion: "Herramientas esenciales para mantener la precisión y fiabilidad de los detectores de gas y flama.",
        imagen: "/productos/kit-calibracion.jpg"
      },
      {
        nombre: "Controladores dedicados y CEP",
        descripcion: "Sistemas de control avanzados para la gestión y monitoreo de los detectores de gas y flama.",
        imagen: "/productos/controladores-cep.jpg"
      },
      {
        nombre: "Detectores de gas combustible",
        descripcion: "Detectores específicos para la detección de gases combustibles en diferentes entornos industriales.",
        imagen: "/productos/detectores-gas-combustible.jpg"
      },
      {
        nombre: "Detectores de gas tóxicos",
        descripcion: "Detectores diseñados para la detección de gases tóxicos, protegiendo la salud de los trabajadores.",
        imagen: "/productos/detectores-gas-toxico.jpg"
      },
      {
        nombre: "Detectores de deficiencia de O2",
        descripcion: "Monitores de oxígeno para la detección de niveles bajos de oxígeno en espacios confinados.",
        imagen: "/productos/detectores-o2.jpg"
      },
      {
        nombre: "Leak Detectors",
        descripcion: "Equipos para la detección de fugas de gas en sistemas de tuberías y equipos.",
        imagen: "/productos/leak-detectors.jpg"
      },
      {
        nombre: "Sistemas de gas y fuego",
        descripcion: "Sistemas integrales de detección y supresión de incendios para la protección de instalaciones industriales.",
        imagen: "/productos/sistemas-gas-fuego.jpg"
      },
      {
        nombre: "Detectores open-path Senscient ELDS",
        descripcion: "Detectores de última generación para la detección remota de gases en áreas extensas.",
        imagen: "/productos/detectores-open-path.jpg"
      }
    ]
  },
  {
    tipo: "Protección contra caídas",
    descripcion: "Sistemas y equipos diseñados para prevenir accidentes y proteger a los trabajadores en alturas.",
    imagen: "/productos/proteccion-caidas.jpg",
    items: [
      {
        nombre: "Líneas de vida",
        descripcion: "Sistemas de anclaje flexibles que permiten a los trabajadores moverse con seguridad en alturas.",
        imagen: "/productos/lineas-vida.jpg"
      },
      {
        nombre: "Puntos de anclaje",
        descripcion: "Puntos de fijación seguros y resistentes para sistemas de protección contra caídas.",
        imagen: "/productos/puntos-anclaje.jpg"
      },
      {
        nombre: "Equipos para espacios confinados",
        descripcion: "Equipos de protección personal y sistemas de seguridad para trabajos en espacios confinados.",
        imagen: "/productos/equipos-espacios-confinados.jpg"
      },
      {
        nombre: "Protecciones colectivas",
        descripcion: "Sistemas de protección que abarcan áreas de trabajo completas para prevenir caídas.",
        imagen: "/productos/protecciones-colectivas.jpg"
      }
    ]
  },
  {
    tipo: "Control y automatización",
    descripcion: "Soluciones de automatización industrial para optimizar procesos y mejorar la eficiencia.",
    imagen: "/productos/control-automatizacion.jpg",
    items: [
      {
        nombre: "Controladores electrónicos programables CEP",
        descripcion: "Controladores flexibles y escalables para la automatización de procesos industriales.",
        imagen: "/productos/cep.jpg"
      },
      {
        nombre: "PlantPAx. Sistemas de control distribuido (DCS)",
        descripcion: "Sistemas de control distribuido para la gestión integral de procesos industriales complejos.",
        imagen: "/productos/plantpax.jpg"
      },
      {
        nombre: "Centros de control de motores (CCMs)",
        descripcion: "Centros de control de motores para la gestión eficiente y segura de motores eléctricos.",
        imagen: "/productos/ccms.jpg"
      },
      {
        nombre: "Sistemas instrumentados de seguridad (SIS)",
        descripcion: "Sistemas de seguridad instrumentados para la prevención de accidentes y la protección de personal.",
        imagen: "/productos/sis.jpg"
      },
      {
        nombre: "Sistemas de control de movimiento (accionadores, servovariadores y servomotores)",
        descripcion: "Sistemas de control de movimiento precisos y eficientes para aplicaciones industriales.",
        imagen: "/productos/control-movimiento.jpg"
      }
    ]
  },
  {
    tipo: "Detección de humo y supresión de incendios",
    descripcion: "Sistemas de detección y supresión de incendios para la protección de vidas y propiedades.",
    imagen: "/productos/deteccion-humo-supresion.jpg",
    items: [
      {
        nombre: "Paneles de control Onyx NFS",
        descripcion: "Paneles de control avanzados para la gestión de sistemas de detección y supresión de incendios.",
        imagen: "/productos/panel-onyx.jpg"
      },
      {
        nombre: "Detectores de humo",
        descripcion: "Detectores de humo de alta sensibilidad para la detección temprana de incendios.",
        imagen: "/productos/detectores-humo.jpg"
      },
      {
        nombre: "Detectores de calor",
        descripcion: "Detectores de calor para la detección de incendios basados en el aumento de temperatura.",
        imagen: "/productos/detectores-calor.jpg"
      },
      {
        nombre: "Estaciones manuales de alarma",
        descripcion: "Estaciones manuales para la activación rápida de sistemas de alarma en caso de incendio.",
        imagen: "/productos/estaciones-manuales.jpg"
      },
      {
        nombre: "Alarma audio/visual",
        descripcion: "Sistemas de alarma audio/visual para alertar a los ocupantes de un incendio.",
        imagen: "/productos/alarma-audio-visual.jpg"
      },
      {
        nombre: "Agente limpio Novec 1230",
        descripcion: "Agente limpio de supresión de incendios que no daña el equipo ni el medio ambiente.",
        imagen: "/productos/novec-1230.jpg"
      }
    ]
  },
  {
    tipo: "Notificación masiva de emergencias",
    descripcion: "Sistemas de notificación para alertar a grandes grupos de personas en situaciones de emergencia.",
    imagen: "/productos/notificacion-masiva.jpg",
    items: [
      {
        nombre: "Sistemas de sirenas electrónicas",
        descripcion: "Sirenas electrónicas para la notificación de emergencias con diferentes tonos y patrones.",
        imagen: "/productos/sirenas-electronicas.jpg"
      },
      {
        nombre: "Sistemas de sirenas electromecánicas",
        descripcion: "Sirenas electromecánicas robustas y fiables para la notificación de emergencias.",
        imagen: "/productos/sirenas-electromecanicas.jpg"
      },
      {
        nombre: "Notificación masiva para interiores",
        descripcion: "Sistemas de notificación para interiores con alta cobertura y claridad de audio.",
        imagen: "/productos/notificacion-interiores.jpg"
      },
      {
        nombre: "Control",
        descripcion: "Sistemas de control para la gestión y monitoreo de sistemas de notificación masiva.",
        imagen: "/productos/control-notificacion.jpg"
      },
      {
        nombre: "Solución CommanderOne",
        descripcion: "Solución integral de notificación masiva para la gestión de emergencias.",
        imagen: "/productos/commanderone.jpg"
      }
    ]
  },
  {
    tipo: "Intercomunicación y voceo",
    descripcion: "Sistemas de comunicación para mejorar la coordinación y la seguridad en instalaciones.",
    imagen: "/productos/intercomunicacion-voceo.jpg",
    items: [
      {
        nombre: "Estaciones de comunicación inteligentes IP",
        descripcion: "Estaciones de comunicación IP para una comunicación clara y eficiente.",
        imagen: "/productos/estaciones-ip.jpg"
      },
      {
        nombre: "Paneles de control de acceso digital",
        descripcion: "Paneles de control de acceso digital para la gestión de accesos y la seguridad.",
        imagen: "/productos/panel-acceso.jpg"
      },
      {
        nombre: "Generador de tonos",
        descripcion: "Generador de tonos para la creación de señales de audio personalizadas.",
        imagen: "/productos/generador-tonos.jpg"
      },
      {
        nombre: "Amplificadores",
        descripcion: "Amplificadores para mejorar la calidad y la cobertura del audio.",
        imagen: "/productos/amplificadores.jpg"
      }
    ]
  },
  {
    tipo: "Tratamiento de aire y gas",
    descripcion: "Soluciones para el tratamiento y purificación de aire y gases industriales.",
    imagen: "/productos/tratamiento-aire-gas.jpg",
    items: [
      {
        nombre: "Ventiladores axiales, centrífugos y refrigeración para aplicaciones industriales",
        descripcion: "Ventiladores para la circulación y refrigeración del aire en entornos industriales.",
        imagen: "/productos/ventiladores.jpg"
      },
      {
        nombre: "Compresores de diafragma, tornillo y centrífugos",
        descripcion: "Compresores para la compresión de aire y gases en diferentes aplicaciones.",
        imagen: "/productos/compresores.jpg"
      },
      {
        nombre: "Sopladores rotativos y centrífugos",
        descripcion: "Sopladores para la circulación de aire y gases en procesos industriales.",
        imagen: "/productos/sopladores.jpg"
      },
      {
        nombre: "Turbinas de vapor",
        descripcion: "Turbinas de vapor para la generación de energía y la propulsión de equipos.",
        imagen: "/productos/turbinas.jpg"
      }
    ]
  },
  {
    tipo: "Compresión de aire",
    descripcion: "Equipos y sistemas de compresión de aire para diversas aplicaciones industriales.",
    imagen: "/productos/compresion-aire.jpg",
    items: [
      {
        nombre: "Tornillo rotativo lubricados",
        descripcion: "Compresores de tornillo rotativo lubricados para aplicaciones industriales.",
        imagen: "/productos/compresor-lubricado.jpg"
      },
      {
        nombre: "Tornillo rotativo libre de aceite",
        descripcion: "Compresores de tornillo rotativo libre de aceite para aplicaciones sensibles.",
        imagen: "/productos/compresor-libre-aceite.jpg"
      },
      {
        nombre: "Centrífugo",
        descripcion: "Compresores centrífugos para aplicaciones de alta presión y caudal.",
        imagen: "/productos/compresor-centrifugo.jpg"
      },
      {
        nombre: "Soluciones de aire comprimido para PET",
        descripcion: "Soluciones de aire comprimido específicas para la industria del PET.",
        imagen: "/productos/aire-comprimido-pet.jpg"
      },
      {
        nombre: "Secadores y filtros de aire comprimido",
        descripcion: "Secadores y filtros para la purificación del aire comprimido.",
        imagen: "/productos/secadores-filtros.jpg"
      }
    ]
  },
  {
    tipo: "Interruptores",
    descripcion: "Amplia gama de interruptores de alta calidad para sistemas eléctricos industriales.",
    imagen: "/productos/interruptores.jpg",
    items: [
      {
        nombre: "Interruptores de presión",
        descripcion: "Interruptores de presión para la detección de cambios en la presión.",
        imagen: "/productos/interruptor-presion.jpg"
      },
      {
        nombre: "Interruptores de temperatura",
        descripcion: "Interruptores de temperatura para la detección de cambios en la temperatura.",
        imagen: "/productos/interruptor-temperatura.jpg"
      },
      {
        nombre: "Interruptores de nivel",
        descripcion: "Interruptores de nivel para la detección de cambios en el nivel de líquidos.",
        imagen: "/productos/interruptor-nivel.jpg"
      },
      {
        nombre: "Interruptores de flujo",
        descripcion: "Interruptores de flujo para la detección de cambios en el flujo de fluidos.",
        imagen: "/productos/interruptor-flujo.jpg"
      },
      {
        nombre: "Válvulas de control",
        descripcion: "Válvulas de control para la regulación del flujo de fluidos.",
        imagen: "/productos/valvulas-control.jpg"
      }
    ]
  },
  {
    tipo: "Protección de equipos e instalaciones",
    descripcion: "Sistemas integrales para la protección de equipos críticos e instalaciones industriales.",
    imagen: "/productos/proteccion-equipos-instalaciones.jpg",
    items: [
      {
        nombre: "UPS monofásico, UPS trifásico industrial",
        descripcion: "Sistemas de alimentación ininterrumpida (UPS) para la protección de equipos críticos.",
        imagen: "/productos/ups.jpg"
      },
      {
        nombre: "Cargadores de batería, Inversor monofásico, Inversor trifásico",
        descripcion: "Cargadores de batería e inversores para la gestión de energía.",
        imagen: "/productos/cargadores-inversores.jpg"
      },
      {
        nombre: "Sistemas de proximidad digital, sensores, transmisores, acondicionadores de señal",
        descripcion: "Sensores y sistemas de control para la monitorización de procesos industriales.",
        imagen: "/productos/sensores.jpg"
      },
      {
        nombre: "Interruptores de vibración, monitor/grabador DataCatchIX",
        descripcion: "Interruptores de vibración y sistemas de monitorización para la detección de vibraciones anormales.",
        imagen: "/productos/interruptores-vibracion.jpg"
      },
      {
        nombre: "Lubricantes, aceites, grasas, pastas, ceras, recubrimientos, protectores anticorrosivos",
        descripcion: "Lubricantes y protectores para la conservación y el mantenimiento de equipos.",
        imagen: "/productos/lubricantes.jpg"
      },
      {
        nombre: "Sistemas de detección de intrusiones perimetrales, vibrasector, vibratek plus",
        descripcion: "Sistemas de detección de intrusiones para la seguridad perimetral de instalaciones.",
        imagen: "/productos/deteccion-intrusiones.jpg"
      }
    ]
  }
]

export default function ServiciosYProductos() {
  const [activeTab, setActiveTab] = useState('servicios')
  const [selectedProduct, setSelectedProduct] = useState(null)

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center">Servicios y Productos</h1>
        
        {/* Small Navbar */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <Button
              onClick={() => setActiveTab('servicios')}
              variant="ghost"
              className={cn(
                "rounded-l-md",
                activeTab === 'servicios'
                  ? "bg-[#FF7420] text-white hover:bg-[#FF7420]/90"
                  : "text-white hover:bg-gray-800"
              )}
            >
              Servicios
            </Button>
            <Button
              onClick={() => setActiveTab('productos')}
              variant="ghost"
              className={cn(
                "rounded-r-md",
                activeTab === 'productos'
                  ? "bg-[#FF7420] text-white hover:bg-[#FF7420]/90"
                  : "text-white hover:bg-gray-800"
              )}
            >
              Productos
            </Button>
          </div>
        </div>
        
        {/* Servicios Section */}
        {activeTab === 'servicios' && (
          <section>
            <h2 className="text-3xl font-bold mb-8 text-center text-[#FF7420]">Nuestros Servicios</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {servicios.map((servicio, index) => (
                <Link href={`/servicios/${servicio.id}`} key={index}>
                  <Card className="bg-gray-800 border-gray-700 overflow-hidden cursor-pointer hover:bg-gray-700 transition-colors h-full flex flex-col">
                    <div className="relative h-48">
                      <Image 
                        src={servicio.imagen} 
                        alt={servicio.titulo} 
                        layout="fill" 
                        objectFit="cover"
                        className="transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl text-white mb-2">{servicio.titulo}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <CardDescription className="text-gray-300">{servicio.descripcion}</CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}
        
        {/* Productos Section */}
        {activeTab === 'productos' && (
          <section>
            <h2 className="text-3xl font-bold mb-8 text-center text-[#FF7420]">Nuestros Productos</h2>
            <div className="space-y-12">
              {productos.map((categoria, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-6">
                  <div className="flex flex-col md:flex-row items-center mb-6">
                    <div className="md:w-1/3 mb-4 md:mb-0">
                      <Image
                        src={categoria.imagen}
                        alt={categoria.tipo}
                        width={300}
                        height={200}
                        layout="responsive"
                        objectFit="cover"
                        quality={75}
                        placeholder="blur"
                        blurDataURL="/placeholder.svg?height=200&width=300"
                        className="rounded-lg object-cover"
                      />
                    </div>
                    <div className="md:w-2/3 md:pl-6">
                      <h3 className="text-2xl font-semibold mb-2 text-[#FF7420]">{categoria.tipo}</h3>
                      <p className="text-gray-300">{categoria.descripcion}</p>
                    </div>
                  </div>
                  <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categoria.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              className="w-full text-left hover:bg-gray-700 justify-start"
                            >
                              <span className="text-[#FF7420] mr-2">•</span>
                              <span className="text-gray-300">{item.nombre}</span>
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-gray-800 text-white">
                            <DialogHeader>
                              <DialogTitle className="text-[#FF7420]">{item.nombre}</DialogTitle>
                            </DialogHeader>
                            <div className="mt-4">
                              <Image
                                src={item.imagen}
                                alt={item.nombre}
                                width={400}
                                height={300}
                                layout="responsive"
                                objectFit="cover"
                                quality={75}
                                placeholder="blur"
                                blurDataURL="/placeholder.svg?height=300&width=400"
                                className="rounded-lg object-cover mb-4"
                              />
                              <p className="text-gray-300">{item.descripcion}</p>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

