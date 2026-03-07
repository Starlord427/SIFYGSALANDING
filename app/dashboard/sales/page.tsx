'use client'

import { useSession } from 'next-auth/react'
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
    <div className="min-h-screen bg-gray-50">
      <div className="bg-black text-white px-6 py-4 flex justify-between items-center">
        <span className="font-bold text-lg">SIFYGSA — Panel de Vendedor</span>
        <span className="text-sm text-gray-400">{session.user?.email}</span>
      </div>
      <SalespersonDashboard />
    </div>
  )
}
