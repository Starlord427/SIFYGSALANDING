import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const nonce = Buffer.from(crypto.getRandomValues(new Uint8Array(16))).toString('base64')

  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' https://va.vercel-scripts.com https://*.vercel-insights.com https://*.vercel.app`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: blob: https://*.supabase.co",
    "font-src 'self' https://fonts.gstatic.com",
    "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://vitals.vercel-insights.com",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "form-action 'self'",
    "base-uri 'self'",
  ].join('; ')

  const requestHeaders = new Headers(req.headers)
  requestHeaders.set('x-nonce', nonce)

  const response = NextResponse.next({ request: { headers: requestHeaders } })

  response.headers.set('Content-Security-Policy', csp)
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()')

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}