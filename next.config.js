/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Los headers de seguridad ahora los maneja middleware.ts
  // para poder usar nonces dinámicos por request
}

module.exports = nextConfig