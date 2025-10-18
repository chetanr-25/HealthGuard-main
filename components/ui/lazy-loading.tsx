'use client'

import React, { lazy, Suspense } from 'react'
import { ComponentErrorBoundary } from '@/components/ui/error-boundary'
import { Skeleton } from '@/components/ui/page-transition'

// Lazy load heavy components
export const LazyAIHealthInsights = lazy(() => 
  import('@/components/dashboard/ai-health-insights').then(module => ({
    default: module.AIHealthInsights
  }))
)

export const LazyHealthStatsGrid = lazy(() => 
  import('@/components/dashboard/health-stats-grid').then(module => ({
    default: module.HealthStatsGrid
  }))
)

export const LazyWelcomeHeader = lazy(() => 
  import('@/components/dashboard/welcome-header').then(module => ({
    default: module.WelcomeHeader
  }))
)

export const LazyTodaysTasks = lazy(() => 
  import('@/components/dashboard/todays-tasks').then(module => ({
    default: module.TodaysTasks
  }))
)

export const LazyPregnancyTimeline = lazy(() => 
  import('@/components/dashboard/pregnancy-timeline').then(module => ({
    default: module.PregnancyTimeline
  }))
)

export const LazyQuickActionButton = lazy(() => 
  import('@/components/dashboard/quick-action-button').then(module => ({
    default: module.QuickActionButton
  }))
)

// Lazy load page components
export const LazyHealthMonitoring = lazy(() => 
  import('@/app/health-monitoring/page')
)

export const LazyAIRiskPredictor = lazy(() => 
  import('@/app/ai-risk-predictor/page')
)

export const LazyPregnancyTimelinePage = lazy(() => 
  import('@/app/pregnancy-timeline/page')
)

export const LazyAppointments = lazy(() => 
  import('@/app/appointments/page')
)

export const LazyMedications = lazy(() => 
  import('@/app/medications/page')
)

export const LazyEducation = lazy(() => 
  import('@/app/education/page')
)

export const LazyEmergency = lazy(() => 
  import('@/app/emergency/page')
)

export const LazySettings = lazy(() => 
  import('@/app/settings/page')
)

// Loading skeletons for different components
export function AIInsightsSkeleton() {
  return (
    <div className="p-6 border rounded-lg space-y-4">
      <Skeleton height="1.5rem" width="200px" />
      <div className="space-y-2">
        <Skeleton height="1rem" width="100%" />
        <Skeleton height="1rem" width="80%" />
        <Skeleton height="1rem" width="90%" />
      </div>
    </div>
  )
}

export function HealthStatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="p-4 border rounded-lg">
          <Skeleton height="1rem" width="100px" className="mb-2" />
          <Skeleton height="2rem" width="60px" />
        </div>
      ))}
    </div>
  )
}

export function WelcomeSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton height="2rem" width="300px" />
      <Skeleton height="1rem" width="500px" />
    </div>
  )
}

export function TasksSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton height="1.5rem" width="150px" />
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex items-center space-x-3 p-3 border rounded-lg">
          <Skeleton height="1rem" width="1rem" />
          <Skeleton height="1rem" width="200px" />
        </div>
      ))}
    </div>
  )
}

export function TimelineSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton height="1.5rem" width="200px" />
      <div className="flex space-x-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex-shrink-0 w-32">
            <Skeleton height="120px" width="100%" />
          </div>
        ))}
      </div>
    </div>
  )
}

// Higher-order component for lazy loading with error boundaries
export function withLazyLoading<T extends object>(
  Component: React.ComponentType<T>,
  LoadingComponent: React.ComponentType,
  fallback?: React.ReactNode
) {
  return function LazyLoadedComponent(props: T) {
    return (
      <ComponentErrorBoundary>
        <Suspense fallback={<LoadingComponent />}>
          <Component {...props} />
        </Suspense>
      </ComponentErrorBoundary>
    )
  }
}

// Optimized image component
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  ...props
}: {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  [key: string]: any
}) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`transition-opacity duration-300 ${className}`}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      {...props}
    />
  )
}

// Intersection Observer hook for lazy loading
export function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
) {
  const [isIntersecting, setIsIntersecting] = React.useState(false)

  React.useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
      },
      {
        threshold: 0.1,
        ...options,
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [elementRef, options])

  return isIntersecting
}

// Virtual scrolling hook for large lists
export function useVirtualScroll({
  itemHeight,
  containerHeight,
  itemCount,
  overscan = 5,
}: {
  itemHeight: number
  containerHeight: number
  itemCount: number
  overscan?: number
}) {
  const [scrollTop, setScrollTop] = React.useState(0)

  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan)
  const endIndex = Math.min(
    itemCount - 1,
    Math.floor((scrollTop + containerHeight) / itemHeight) + overscan
  )

  const visibleItems = Array.from(
    { length: endIndex - startIndex + 1 },
    (_, i) => startIndex + i
  )

  const totalHeight = itemCount * itemHeight
  const offsetY = startIndex * itemHeight

  return {
    visibleItems,
    totalHeight,
    offsetY,
    setScrollTop,
  }
}
