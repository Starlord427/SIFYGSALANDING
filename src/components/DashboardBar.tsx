'use client'

import { signOut } from 'next-auth/react'

interface DashboardBarProps {
  role: string
  email?: string | null
  showNewRequest?: boolean
}

const roleLabels: Record<string, string> = {
  cliente:   'Panel Cliente',
  gerente:   'Panel Gerente',
  vendedor:  'Panel Vendedor',
}

export default function DashboardBar({ role, email, showNewRequest = false }: DashboardBarProps) {
  return (
    <div className="bg-[#141414] border-b border-white/5 mb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-16 h-12 flex items-center justify-between">

        {/* Rol */}
        <div className="flex items-center gap-2">
          <span className="w-3 h-px bg-[#FF7420]" />
          <span className="text-[#FF7420] text-[10px] font-bold uppercase tracking-[0.3em]">
            {roleLabels[role] ?? role}
          </span>
        </div>

        {/* Email + acciones */}
        <div className="flex items-center gap-3">
          {email && (
            <span className="hidden sm:block text-gray-300 text-xs truncate max-w-[180px]">
              {email}
            </span>
          )}
          {showNewRequest && (
            <a
              href="/MAC"
              className="inline-flex items-center gap-1.5 bg-[#FF7420] hover:bg-[#e5681c] text-white text-[10px] font-bold px-3 py-1.5 rounded-lg transition-colors"
            >
              Nueva solicitud
            </a>
          )}
          <button
            onClick={() => signOut({ callbackUrl: '/contacto' })}
            className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/15 border border-white/20 text-white text-[10px] font-semibold px-3 py-1.5 rounded-lg transition-colors"
          >
            Cerrar sesión
          </button>
        </div>

      </div>
    </div>
  )
}