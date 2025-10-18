"use client"

import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { PageErrorBoundary } from '@/components/ui/error-boundary'
import { LoadingSpinner } from '@/components/ui/page-transition'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isLoaded, userId } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && !userId) {
      router.push('/sign-in')
    }
  }, [isLoaded, userId, router])

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center space-y-4">
          <LoadingSpinner size="lg" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!userId) {
    return null
  }

  return (
    <PageErrorBoundary>
      {children}
    </PageErrorBoundary>
  )
}

