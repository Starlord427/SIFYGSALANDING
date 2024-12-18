const fs = require('fs');
const path = require('path');

const imagePlaceholders = [
  { folder: 'logos', files: [
    { name: 'logo-sifygsa.png', content: 'Logo de SIFYGSA' }
  ]},
  { folder: 'hero', files: [
    { name: 'hero-background.jpg', content: 'Imagen de fondo para la sección hero mostrando un entorno industrial' }
  ]},
  { folder: 'about', files: [
    { name: 'hero-background.jpg', content: 'Imagen de fondo para la sección "Acerca de" mostrando el equipo de SIFYGSA' },
    { name: 'priority-image.jpg', content: 'Imagen mostrando la prioridad de SIFYGSA: la seguridad del cliente' },
    { name: 'timeline-image.jpg', content: 'Imagen de la línea de tiempo de SIFYGSA' },
    { name: 'team-image.jpg', content: 'Imagen del equipo de SIFYGSA trabajando en un proyecto' }
  ]},
  { folder: 'projects', files: [
    { name: 'torre-corporativa.jpg', content: 'Imagen de la Torre Corporativa Skyline' },
    { name: 'complejo-residencial.jpg', content: 'Imagen del Complejo Residencial Riverside' },
    { name: 'renovacion-centro.jpg', content: 'Imagen de la Renovación del Centro Histórico' },
    { name: 'edificio-sustentable.jpg', content: 'Imagen del Edificio Sustentable GreenTech' }
  ]},
  { folder: 'servicios', files: [
    { name: 'servicio-deteccion.jpg', content: 'Detección fija de gas y flama: Sistemas avanzados para la detección temprana de gases peligrosos y fuego en instalaciones industriales.' },
    { name: 'servicio-proteccion-caidas.jpg', content: 'Sistemas de protección contra caídas: Equipos y soluciones para garantizar la seguridad del personal en trabajos en altura.' },
    { name: 'servicio-automatizacion.jpg', content: 'Control y automatización: Implementación de sistemas de control y automatización para optimizar procesos industriales.' },
    { name: 'servicio-deteccion-humo.jpg', content: 'Detección de humo y supresión de incendios: Sistemas integrales para la detección temprana de humo y la supresión efectiva de incendios.' },
    { name: 'servicio-notificacion.jpg', content: 'Notificación masiva de emergencias: Soluciones de comunicación rápida y eficiente para situaciones de emergencia.' },
    { name: 'servicio-intercomunicacion.jpg', content: 'Intercomunicación y voceo: Sistemas de comunicación interna para mejorar la coordinación y seguridad en las instalaciones.' },
    { name: 'servicio-tratamiento-aire.jpg', content: 'Tratamiento de aire y gas: Tecnologías avanzadas para el tratamiento y purificación de aire y gases industriales.' },
    { name: 'servicio-compresion-aire.jpg', content: 'Compresión de aire: Equipos y sistemas de compresión de aire para aplicaciones industriales diversas.' },
    { name: 'servicio-interruptores.jpg', content: 'Interruptores: Soluciones en interruptores de alta calidad para sistemas eléctricos industriales.' },
    { name: 'servicio-proteccion-equipos.jpg', content: 'Protección de equipos e instalaciones: Sistemas integrales para la protección de equipos críticos e instalaciones industriales.' },
    { name: 'servicio-videovigilancia.jpg', content: 'Sistemas de videovigilancia: Tecnología de punta en sistemas de videovigilancia para mejorar la seguridad en sus instalaciones.' },
    { name: 'servicio-aire-instrumentos.jpg', content: 'Sistemas de aire para instrumentos: Soluciones especializadas de aire comprimido para instrumentos y controles industriales.' },
  ]},
  { folder: 'productos', files: [
    { name: 'deteccion-gas-flama.jpg', content: 'Detección Fija de gas y flama: Soluciones para la detección temprana de gases peligrosos y llamas.' },
    { name: 'detector-fijo-gas-flama.jpg', content: 'Detectores fijos de gas y flama: Dispositivos de alta precisión para la detección continua de gases y llamas.' },
    { name: 'kit-calibracion.jpg', content: 'Kits y accesorios de calibración: Herramientas para mantener la precisión de los detectores.' },
    { name: 'controladores-cep.jpg', content: 'Controladores dedicados y CEP: Sistemas de control avanzados para detectores de gas y flama.' },
    { name: 'detectores-gas-combustible.jpg', content: 'Detectores de gas combustible: Detectores específicos para gases combustibles.' },
    { name: 'detectores-gas-toxico.jpg', content: 'Detectores de gas tóxicos: Detectores para gases tóxicos en entornos industriales.' },
    { name: 'detectores-o2.jpg', content: 'Detectores de deficiencia de O2: Monitores de oxígeno para espacios confinados.' },
    { name: 'leak-detectors.jpg', content: 'Leak Detectors: Equipos para la detección de fugas de gas.' },
    { name: 'sistemas-gas-fuego.jpg', content: 'Sistemas de gas y fuego: Sistemas integrales de detección y supresión de incendios.' },
    { name: 'detectores-open-path.jpg', content: 'Detectores open-path Senscient ELDS: Detectores de última generación para áreas extensas.' },
    { name: 'proteccion-caidas.jpg', content: 'Protección contra caídas: Sistemas y equipos para prevenir accidentes en alturas.' },
    { name: 'lineas-vida.jpg', content: 'Líneas de vida: Sistemas de anclaje flexibles para trabajos en altura.' },
    { name: 'puntos-anclaje.jpg', content: 'Puntos de anclaje: Puntos de fijación seguros para sistemas de protección contra caídas.' },
    { name: 'equipos-espacios-confinados.jpg', content: 'Equipos para espacios confinados: Equipos de protección para trabajos en espacios confinados.' },
    { name: 'protecciones-colectivas.jpg', content: 'Protecciones colectivas: Sistemas de protección para áreas de trabajo completas.' },
    { name: 'control-automatizacion.jpg', content: 'Control y automatización: Soluciones de automatización industrial.' },
    { name: 'cep.jpg', content: 'Controladores electrónicos programables CEP: Controladores para automatización de procesos.' },
    { name: 'plantpax.jpg', content: 'PlantPAx. Sistemas de control distribuido (DCS): Sistemas para gestión integral de procesos.' },
    { name: 'ccms.jpg', content: 'Centros de control de motores (CCMs): Centros para gestión de motores eléctricos.' },
    { name: 'sis.jpg', content: 'Sistemas instrumentados de seguridad (SIS): Sistemas para prevención de accidentes.' },
    { name: 'control-movimiento.jpg', content: 'Sistemas de control de movimiento: Sistemas precisos para aplicaciones industriales.' },
    { name: 'deteccion-humo-supresion.jpg', content: 'Detección de humo y supresión de incendios: Sistemas para protección contra incendios.' },
    { name: 'panel-onyx.jpg', content: 'Paneles de control Onyx NFS: Paneles avanzados para gestión de sistemas contra incendios.' },
    { name: 'detectores-humo.jpg', content: 'Detectores de humo: Detectores de alta sensibilidad para detección temprana.' },
    { name: 'detectores-calor.jpg', content: 'Detectores de calor: Detectores basados en aumento de temperatura.' },
    { name: 'estaciones-manuales.jpg', content: 'Estaciones manuales de alarma: Estaciones para activación rápida de alarmas.' },
    { name: 'alarma-audio-visual.jpg', content: 'Alarma audio/visual: Sistemas de alerta para ocupantes.' },
    { name: 'novec-1230.jpg', content: 'Agente limpio Novec 1230: Agente de supresión de incendios ecológico.' },
    { name: 'notificacion-masiva.jpg', content: 'Notificación masiva de emergencias: Sistemas de alerta para grandes grupos.' },
    { name: 'sirenas-electronicas.jpg', content: 'Sistemas de sirenas electrónicas: Sirenas con diferentes tonos y patrones.' },
    { name: 'sirenas-electromecanicas.jpg', content: 'Sistemas de sirenas electromecánicas: Sirenas robustas y fiables.' },
    { name: 'notificacion-interiores.jpg', content: 'Notificación masiva para interiores: Sistemas con alta cobertura y claridad.' },
    { name: 'control-notificacion.jpg', content: 'Control: Sistemas para gestión de notificación masiva.' },
    { name: 'commanderone.jpg', content: 'Solución CommanderOne: Solución integral para gestión de emergencias.' },
    { name: 'intercomunicacion-voceo.jpg', content: 'Intercomunicación y voceo: Sistemas para mejorar coordinación y seguridad.' },
    { name: 'estaciones-ip.jpg', content: 'Estaciones de comunicación inteligentes IP: Estaciones para comunicación clara.' },
    { name: 'panel-acceso.jpg', content: 'Paneles de control de acceso digital: Paneles para gestión de accesos.' },
    { name: 'generador-tonos.jpg', content: 'Generador de tonos: Generador para señales de audio personalizadas.' },
    { name: 'amplificadores.jpg', content: 'Amplificadores: Amplificadores para mejorar calidad y cobertura de audio.' },
    { name: 'tratamiento-aire-gas.jpg', content: 'Tratamiento de aire y gas: Soluciones para purificación de aire y gases.' },
    { name: 'ventiladores.jpg', content: 'Ventiladores axiales, centrífugos y refrigeración: Ventiladores para entornos industriales.' },
    { name: 'compresores.jpg', content: 'Compresores de diafragma, tornillo y centrífugos: Compresores para diversas aplicaciones.' },
    { name: 'sopladores.jpg', content: 'Sopladores rotativos y centrífugos: Sopladores para procesos industriales.' },
    { name: 'turbinas.jpg', content: 'Turbinas de vapor: Turbinas para generación de energía.' },
    { name: 'compresion-aire.jpg', content: 'Compresión de aire: Equipos y sistemas de compresión de aire.' },
    { name: 'compresor-lubricado.jpg', content: 'Tornillo rotativo lubricados: Compresores para aplicaciones industriales.' },
    { name: 'compresor-libre-aceite.jpg', content: 'Tornillo rotativo libre de aceite: Compresores para aplicaciones sensibles.' },
    { name: 'compresor-centrifugo.jpg', content: 'Centrífugo: Compresores para alta presión y caudal.' },
    { name: 'aire-comprimido-pet.jpg', content: 'Soluciones de aire comprimido para PET: Soluciones específicas para industria PET.' },
    { name: 'secadores-filtros.jpg', content: 'Secadores y filtros de aire comprimido: Equipos para purificación de aire.' },
    { name: 'interruptores.jpg', content: 'Interruptores: Gama de interruptores para sistemas eléctricos industriales.' },
    { name: 'interruptor-presion.jpg', content: 'Interruptores de presión: Interruptores para detección de cambios de presión.' },
    { name: 'interruptor-temperatura.jpg', content: 'Interruptores de temperatura: Interruptores para cambios de temperatura.' },
    { name: 'interruptor-nivel.jpg', content: 'Interruptores de nivel: Interruptores para niveles de líquidos.' },
    { name: 'interruptor-flujo.jpg', content: 'Interruptores de flujo: Interruptores para cambios en flujo de fluidos.' },
    { name: 'valvulas-control.jpg', content: 'Válvulas de control: Válvulas para regulación de flujo.' },
    { name: 'proteccion-equipos-instalaciones.jpg', content: 'Protección de equipos e instalaciones: Sistemas para protección de equipos críticos.' },
    { name: 'ups.jpg', content: 'UPS monofásico, UPS trifásico industrial: Sistemas de alimentación ininterrumpida.' },
    { name: 'cargadores-inversores.jpg', content: 'Cargadores de batería, Inversores: Equipos para gestión de energía.' },
    { name: 'sensores.jpg', content: 'Sistemas de proximidad, sensores, transmisores: Equipos para monitorización industrial.' },
    { name: 'interruptores-vibracion.jpg', content: 'Interruptores de vibración, monitor DataCatchIX: Sistemas para detección de vibraciones.' },
    { name: 'lubricantes.jpg', content: 'Lubricantes, aceites, grasas, protectores: Productos para mantenimiento de equipos.' },
    { name: 'deteccion-intrusiones.jpg', content: 'Sistemas de detección de intrusiones: Sistemas para seguridad perimetral.' },
  ]},
  { folder: 'eventos', files: [
    { name: 'seminario-seguridad.jpg', content: 'Seminario de Seguridad Industrial de SIFYGSA' },
    { name: 'taller-proteccion-caidas.jpg', content: 'Taller de Protección Contra Caídas' },
    { name: 'conferencia-automatizacion.jpg', content: 'Conferencia de Automatización Industrial' },
    { name: 'seminario-seguridad-1.jpg', content: 'Participantes en el Seminario de Seguridad' },
    { name: 'seminario-seguridad-2.jpg', content: 'Presentación en el Seminario de Seguridad' },
    { name: 'seminario-seguridad-3.jpg', content: 'Demostración de equipos en el Seminario de Seguridad' },
    { name: 'taller-proteccion-caidas-1.jpg', content: 'Práctica de uso de arnés en el Taller de Protección Contra Caídas' },
    { name: 'taller-proteccion-caidas-2.jpg', content: 'Instructor explicando técnicas en el Taller de Protección Contra Caídas' },
    { name: 'taller-proteccion-caidas-3.jpg', content: 'Participantes realizando ejercicios en el Taller de Protección Contra Caídas' },
    { name: 'conferencia-automatizacion-1.jpg', content: 'Expositor principal en la Conferencia de Automatización' },
    { name: 'conferencia-automatizacion-2.jpg', content: 'Demostración de tecnología en la Conferencia de Automatización' },
    { name: 'conferencia-automatizacion-3.jpg', content: 'Networking entre participantes en la Conferencia de Automatización' }
  ]},
  { folder: 'collaborators', files: [
    { name: 'empresa1.png', content: 'Logo de empresa colaboradora 1' },
    { name: 'empresa2.png', content: 'Logo de empresa colaboradora 2' },
    { name: 'empresa3.png', content: 'Logo de empresa colaboradora 3' },
    { name: 'empresa4.png', content: 'Logo de empresa colaboradora 4' },
    { name: 'empresa5.png', content: 'Logo de empresa colaboradora 5' }
  ]},
];

const publicDir = path.join(__dirname, '..', 'public');

// Create the public directory if it doesn't exist
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
  console.log('Created public directory');
}

imagePlaceholders.forEach(({ folder, files }) => {
  const folderPath = path.join(publicDir, folder);

  // Create the subfolder if it doesn't exist
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
    console.log(`Created ${folder} directory`);
  }

  files.forEach(({ name, content }) => {
    const filePath = path.join(folderPath, name);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, `Placeholder for ${name}: ${content}`);
      console.log(`Created placeholder for ${name}`);
    } else {
      console.log(`${name} already exists`);
    }
  });
});

console.log('Placeholder generation complete');



