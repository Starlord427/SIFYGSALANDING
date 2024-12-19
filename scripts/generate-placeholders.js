const fs = require('fs');
const path = require('path');

const imagePlaceholders = [
  { folder: 'logos', files: ['logo-sifygsa.png'] },
  { folder: 'hero', files: ['hero-background.jpg'] },
  { folder: 'about', files: ['hero-background.jpg', 'priority-image.jpg', 'timeline-image.jpg', 'team-image.jpg'] },
  { folder: 'projects', files: ['torre-corporativa.jpg', 'complejo-residencial.jpg', 'renovacion-centro.jpg', 'edificio-sustentable.jpg'] },
  { folder: 'servicios', files: [
    'servicio-deteccion.jpg',
    'servicio-proteccion-caidas.jpg',
    'servicio-automatizacion.jpg',
    'servicio-deteccion-humo.jpg',
    'servicio-notificacion.jpg',
    'servicio-intercomunicacion.jpg',
    'servicio-tratamiento-aire.jpg',
    'servicio-compresion-aire.jpg',
    'servicio-interruptores.jpg',
    'servicio-proteccion-equipos.jpg',
    'servicio-videovigilancia.jpg',
    'servicio-aire-instrumentos.jpg'
  ]},
  { folder: 'eventos', files: [
    'seminario-seguridad.jpg',
    'taller-proteccion-caidas.jpg',
    'conferencia-automatizacion.jpg',
    'seminario-seguridad-1.jpg',
    'seminario-seguridad-2.jpg',
    'seminario-seguridad-3.jpg',
    'taller-proteccion-caidas-1.jpg',
    'taller-proteccion-caidas-2.jpg',
    'taller-proteccion-caidas-3.jpg',
    'conferencia-automatizacion-1.jpg',
    'conferencia-automatizacion-2.jpg',
    'conferencia-automatizacion-3.jpg'
  ]},
  { folder: 'collaborators', files: [
    'empresa1.png',
    'empresa2.png',
    'empresa3.png',
    'empresa4.png',
    'empresa5.png'
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

  files.forEach(file => {
    const filePath = path.join(folderPath, file);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, `This is a placeholder for ${file}`);
      console.log(`Created placeholder for ${file}`);
    } else {
      console.log(`${file} already exists`);
    }
  });
});

console.log('Placeholder generation complete');

