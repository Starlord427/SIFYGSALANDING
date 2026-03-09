'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import ManagerDashboard from '@/components/ManagerDashboard'

export default function ManagerDashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/contacto')
    } else if (status === 'authenticated' && (session.user as any)?.role !== 'MANAGER') {
      router.push('/contacto')
    }
  }, [status, session, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-[#FF7420]" />
      </div>
    )
  }

  if (status !== 'authenticated' || (session.user as any)?.role !== 'MANAGER') return null

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-black text-white px-6 py-4 flex justify-between items-center">
        <span className="font-bold text-lg">SIFYGSA — Panel de Gerente</span>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">{session.user?.email}</span>
          <button
            onClick={() => signOut({ callbackUrl: '/contacto' })}
            className="bg-[#FF7420] hover:bg-[#FF5500] text-white text-sm px-3 py-1 rounded"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
      <ManagerDashboard />
    </div>
  )
}
