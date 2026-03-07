'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import ClientDashboard from '@/components/ClientDashboard'
import { Button } from '@/components/ui/button'

export default function ClientDashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/contacto')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-[#FF7420]" />
      </div>
    )
  }

  if (status !== 'authenticated') return null

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-black text-white px-6 py-4 flex justify-between items-center">
        <span className="font-bold text-lg">SIFYGSA — Mi Panel</span>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">{session.user?.email}</span>
          <Button
            onClick={() => signOut({ callbackUrl: '/contacto' })}
            className="bg-[#FF7420] hover:bg-[#FF7420]/90 text-white text-sm px-3 py-1 h-auto"
          >
            Cerrar sesión
          </Button>
        </div>
      </div>
      <ClientDashboard />
    </div>
  )
}
