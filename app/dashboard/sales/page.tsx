'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import SalespersonDashboard from '@/components/SalespersonDashboard'

export default function SalesDashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/contacto')
    } else if (status === 'authenticated' && (session.user as any)?.role !== 'SALESPERSON') {
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

  if (status !== 'authenticated' || (session.user as any)?.role !== 'SALESPERSON') return null

  return (
<div className="flex items-center gap-4">
  <span className="text-sm text-gray-400">{session.user?.email}</span>
  <button
    onClick={() => signOut({ callbackUrl: '/contacto' })}
    className="bg-[#FF7420] hover:bg-[#FF5500] text-white text-sm px-3 py-1 rounded"
  >
    Cerrar sesión
  </button>
</div>
  )
}
