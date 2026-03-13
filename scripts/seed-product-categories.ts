// scripts/seed-product-categories.ts
// Correr con: npx ts-node scripts/seed-product-categories.ts
// O pegar directo en Supabase SQL Editor el bloque de abajo

import { prisma } from '../src/lib/prisma'

const data = [
  {
    tipo: "Detección de gas y flama",
    descripcion: "Ofrecemos una amplia gama de soluciones para la detección temprana de gases peligrosos y llamas, garantizando la seguridad en entornos industriales.",
    imagen: "/productos/deteccion-gas-flama.jpg",
    order: 1,
    items: ["Detectores fijos de gas y flama","Kits y accesorios de calibración","Controladores dedicados y CEP","Detectores de gas combustible","Detectores de gas tóxicos","Detectores de deficiencia de O2","Leak Detectors","Sistemas de gas y fuego","Detectores open-path Senscient ELDS"],
  },
  {
    tipo: "Protección contra caídas",
    descripcion: "Sistemas y equipos diseñados para prevenir accidentes y proteger a los trabajadores en alturas.",
    imagen: "/productos/proteccion-caidas.jpg",
    order: 2,
    items: ["Líneas de vida","Puntos de anclaje","Equipos para espacios confinados","Protecciones colectivas"],
  },
  {
    tipo: "Control y automatización",
    descripcion: "Soluciones de automatización industrial para optimizar procesos y mejorar la eficiencia.",
    imagen: "/productos/control-automatizacion.jpg",
    order: 3,
    items: ["Controladores electrónicos programables CEP","PlantPAx — Sistemas DCS","Centros de control de motores (CCMs)","Sistemas instrumentados de seguridad (SIS)","Sistemas de control de movimiento"],
  },
  {
    tipo: "Detección de humo y supresión de incendios",
    descripcion: "Sistemas de detección y supresión de incendios para la protección de vidas y propiedades.",
    imagen: "/productos/deteccion-humo-supresion.jpg",
    order: 4,
    items: ["Paneles de control Onyx NFS","Detectores de humo","Detectores de calor","Estaciones manuales de alarma","Alarma audio/visual","Agente limpio Novec 1230"],
  },
  {
    tipo: "Notificación masiva de emergencias",
    descripcion: "Sistemas de notificación para alertar a grandes grupos de personas en situaciones de emergencia.",
    imagen: "/productos/notificacion-masiva.jpg",
    order: 5,
    items: ["Sistemas de sirenas electrónicas","Sistemas de sirenas electromecánicas","Notificación masiva para interiores","Control","Solución CommanderOne"],
  },
  {
    tipo: "Intercomunicación y voceo",
    descripcion: "Sistemas de comunicación para mejorar la coordinación y la seguridad en instalaciones.",
    imagen: "/productos/intercomunicacion-voceo.jpg",
    order: 6,
    items: ["Estaciones de comunicación inteligentes IP","Paneles de control de acceso digital","Generador de tonos","Amplificadores"],
  },
  {
    tipo: "Tratamiento de aire y gas",
    descripcion: "Soluciones para el tratamiento y purificación de aire y gases industriales.",
    imagen: "/productos/tratamiento-aire-gas.jpg",
    order: 7,
    items: ["Ventiladores axiales, centrífugos y de refrigeración","Compresores de diafragma, tornillo y centrífugos","Sopladores rotativos y centrífugos","Turbinas de vapor"],
  },
  {
    tipo: "Compresión de aire",
    descripcion: "Equipos y sistemas de compresión de aire para diversas aplicaciones industriales.",
    imagen: "/productos/compresion-aire.jpg",
    order: 8,
    items: ["Tornillo rotativo lubricados","Tornillo rotativo libre de aceite","Centrífugo","Soluciones de aire comprimido para PET","Secadores y filtros de aire comprimido"],
  },
  {
    tipo: "Interruptores",
    descripcion: "Amplia gama de interruptores de alta calidad para sistemas eléctricos industriales.",
    imagen: "/productos/interruptores.jpg",
    order: 9,
    items: ["Interruptores de presión","Interruptores de temperatura","Interruptores de nivel","Interruptores de flujo","Válvulas de control"],
  },
  {
    tipo: "Protección de equipos e instalaciones",
    descripcion: "Sistemas integrales para la protección de equipos críticos e instalaciones industriales.",
    imagen: "/productos/proteccion-equipos-instalaciones.jpg",
    order: 10,
    items: ["UPS monofásico y trifásico industrial","Cargadores de batería e inversores","Sistemas de proximidad digital y sensores","Interruptores de vibración y monitores","Lubricantes y protectores anticorrosivos","Sistemas de detección de intrusiones perimetrales"],
  },
]

async function main() {
  console.log('Seeding product categories...')
  for (const cat of data) {
    await prisma.productCategory.upsert({
      where: { id: cat.tipo }, // fallback, usará create
      update: cat,
      create: cat,
    })
  }
  console.log('Done!')
}

main().catch(console.error).finally(() => prisma.$disconnect())
