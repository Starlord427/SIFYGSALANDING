'use client'

import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ManagerDashboard from '@/components/ManagerDashboard'
import DashboardBar from '@/components/DashboardBar'

export default function ManagerDashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/contacto')
    if (status === 'authenticated') {
      const role = (session?.user as any)?.role
      if (role !== 'MANAGER') router.push('/contacto')
    }
  }, [status, session, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-[#FF7420]" />
      </div>
    )
  }

  if (!session) return null

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-20">
      <DashboardBar role="gerente" email={session.user?.email} />
      <main className="max-w-7xl mx-auto px-6 md:px-16 pb-10">
        <ManagerDashboard />
      </main>
    </div>
  )
}