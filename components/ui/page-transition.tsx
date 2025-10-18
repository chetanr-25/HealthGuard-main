'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

interface PageTransitionProps {
  children: React.ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Reset visibility on route change
    setIsVisible(false)
    
    // Small delay to ensure smooth transition
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 50)

    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <div 
      className={`transition-all duration-300 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-4'
      }`}
    >
      {children}
    </div>
  )
}

// Staggered animation wrapper for lists
interface StaggeredListProps {
  children: React.ReactNode[]
  delay?: number
}

export function StaggeredList({ children, delay = 100 }: StaggeredListProps) {
  const [visibleItems, setVisibleItems] = useState<number[]>([])

  useEffect(() => {
    const timers: NodeJS.Timeout[] = []
    
    children.forEach((_, index) => {
      const timer = setTimeout(() => {
        setVisibleItems(prev => [...prev, index])
      }, index * delay)
      timers.push(timer)
    })

    return () => {
      timers.forEach(timer => clearTimeout(timer))
    }
  }, [children, delay])

  return (
    <>
      {children.map((child, index) => (
        <div
          key={index}
          className={`transition-all duration-500 ease-out ${
            visibleItems.includes(index)
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
        >
          {child}
        </div>
      ))}
    </>
  )
}

// Loading skeleton component
interface SkeletonProps {
  className?: string
  width?: string | number
  height?: string | number
}

export function Skeleton({ className = '', width, height }: SkeletonProps) {
  return (
    <div
      className={`skeleton rounded ${className}`}
      style={{
        width: width || '100%',
        height: height || '1rem',
      }}
    />
  )
}

// Loading spinner component
export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  return (
    <div className={`${sizeClasses[size]} animate-spin`}>
      <div className="w-full h-full border-2 border-primary/20 border-t-primary rounded-full" />
    </div>
  )
}
