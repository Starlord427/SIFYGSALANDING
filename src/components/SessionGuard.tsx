// src/components/SessionGuard.tsx
// Detecta inactividad real del usuario y cierra sesión a los 15 min
'use client'

import { useEffect, useRef, useCallback } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const TIMEOUT_MS   = 15 * 60 * 1000  // 15 minutos
const WARNING_MS   = 14 * 60 * 1000  // Aviso al minuto 14
const EVENTS       = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart', 'click']

export default function SessionGuard() {
  const { data: session } = useSession()
  const router             = useRouter()
  const warnTimer          = useRef<ReturnType<typeof setTimeout>>()
  const logoutTimer        = useRef<ReturnType<typeof setTimeout>>()
  const warnToast          = useRef<HTMLDivElement | null>(null)

  const clearTimers = () => {
    clearTimeout(warnTimer.current)
    clearTimeout(logoutTimer.current)
  }

  const removeWarning = () => {
    warnToast.current?.remove()
    warnToast.current = null
  }

  const showWarning = useCallback(() => {
    removeWarning()
    const div = document.createElement('div')
    div.id = 'session-warning'
    div.innerHTML = `
      <div style="
        position:fixed; bottom:24px; right:24px; z-index:9999;
        background:#141414; border:1px solid rgba(255,116,32,0.4);
        border-radius:16px; padding:16px 20px; max-width:300px;
        box-shadow:0 20px 40px rgba(0,0,0,0.5), 0 0 30px rgba(255,116,32,0.1);
        animation: slideIn 0.3s ease;
      ">
        <p style="color:#FF7420;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.2em;margin-bottom:4px;">Sesión por expirar</p>
        <p style="color:#9ca3af;font-size:13px;line-height:1.5;">Tu sesión expirará en <strong style="color:white">1 minuto</strong> por inactividad.</p>
        <p style="color:#6b7280;font-size:11px;margin-top:8px;">Mueve el mouse o presiona cualquier tecla para continuar.</p>
      </div>
      <style>@keyframes slideIn{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}</style>
    `
    document.body.appendChild(div)
    warnToast.current = div
  }, [])

  const logout = useCallback(async () => {
    removeWarning()
    await signOut({ redirect: false })
    router.push('/auth?reason=inactivity')
  }, [router])

  const resetTimers = useCallback(() => {
    clearTimers()
    removeWarning()
    warnTimer.current   = setTimeout(showWarning, WARNING_MS)
    logoutTimer.current = setTimeout(logout,      TIMEOUT_MS)
  }, [showWarning, logout])

  useEffect(() => {
    if (!session) return

    resetTimers()
    EVENTS.forEach(e => window.addEventListener(e, resetTimers, { passive: true }))

    return () => {
      clearTimers()
      EVENTS.forEach(e => window.removeEventListener(e, resetTimers))
    }
  }, [session, resetTimers])

  return null
}
