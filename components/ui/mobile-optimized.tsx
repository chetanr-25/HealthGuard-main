'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface MobileOptimizedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  mobileSize?: 'sm' | 'md' | 'lg'
  className?: string
}

export function MobileOptimizedButton({
  children,
  variant = 'default',
  size = 'default',
  mobileSize = 'md',
  className,
  ...props
}: MobileOptimizedButtonProps) {
  const mobileSizeClasses = {
    sm: 'mobile-button text-sm px-4 py-2',
    md: 'mobile-button text-base px-6 py-3',
    lg: 'mobile-button text-lg px-8 py-4'
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={cn(
        'touch-target mobile-focus mobile-optimize',
        mobileSizeClasses[mobileSize],
        className
      )}
      {...props}
    >
      {children}
    </Button>
  )
}

// Mobile-optimized card component
interface MobileCardProps {
  children: React.ReactNode
  className?: string
  padding?: 'sm' | 'md' | 'lg'
}

export function MobileCard({ 
  children, 
  className, 
  padding = 'md' 
}: MobileCardProps) {
  const paddingClasses = {
    sm: 'p-3',
    md: 'mobile-card p-4',
    lg: 'p-6'
  }

  return (
    <div className={cn(
      'rounded-lg border bg-card hover-lift',
      paddingClasses[padding],
      className
    )}>
      {children}
    </div>
  )
}

// Mobile-optimized input component
interface MobileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function MobileInput({ 
  label, 
  error, 
  className, 
  ...props 
}: MobileInputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <input
        className={cn(
          'mobile-input mobile-focus w-full',
          error && 'border-destructive focus:ring-destructive',
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  )
}

// Mobile-optimized modal component
interface MobileModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
}

export function MobileModal({ 
  isOpen, 
  onClose, 
  children, 
  title 
}: MobileModalProps) {
  if (!isOpen) return null

  return (
    <div className="mobile-modal mobile-safe-area">
      <div className="mobile-modal-content">
        {title && (
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">{title}</h2>
            <button
              onClick={onClose}
              className="touch-target p-2 text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  )
}

// Mobile-optimized drawer component
interface MobileDrawerProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
}

export function MobileDrawer({ 
  isOpen, 
  onClose, 
  children, 
  title 
}: MobileDrawerProps) {
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="mobile-drawer mobile-safe-area-bottom z-50">
        <div className="p-4">
          {title && (
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{title}</h3>
              <button
                onClick={onClose}
                className="touch-target p-2 text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>
          )}
          {children}
        </div>
      </div>
    </>
  )
}

// Mobile-optimized grid component
interface MobileGridProps {
  children: React.ReactNode
  cols?: 1 | 2 | 3 | 4
  gap?: 'sm' | 'md' | 'lg'
  className?: string
}

export function MobileGrid({ 
  children, 
  cols = 2, 
  gap = 'md',
  className 
}: MobileGridProps) {
  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6'
  }

  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4'
  }

  return (
    <div className={cn(
      'grid',
      gridClasses[cols],
      gapClasses[gap],
      className
    )}>
      {children}
    </div>
  )
}

// Mobile-optimized text component
interface MobileTextProps {
  children: React.ReactNode
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl'
  weight?: 'normal' | 'medium' | 'semibold' | 'bold'
  color?: 'default' | 'muted' | 'primary' | 'destructive'
  className?: string
}

export function MobileText({ 
  children, 
  size = 'base',
  weight = 'normal',
  color = 'default',
  className 
}: MobileTextProps) {
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  }

  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  }

  const colorClasses = {
    default: 'text-foreground',
    muted: 'text-muted-foreground',
    primary: 'text-primary',
    destructive: 'text-destructive'
  }

  return (
    <span className={cn(
      sizeClasses[size],
      weightClasses[weight],
      colorClasses[color],
      className
    )}>
      {children}
    </span>
  )
}
