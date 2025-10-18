'use client'

import React from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ error, errorInfo })
    
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo)
    }

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo)
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback
        return <FallbackComponent error={this.state.error!} resetError={this.resetError} />
      }

      return <DefaultErrorFallback error={this.state.error!} resetError={this.resetError} />
    }

    return this.props.children
  }
}

// Default error fallback component
function DefaultErrorFallback({ error, resetError }: { error: Error; resetError: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6 text-destructive" />
          </div>
          <CardTitle className="text-xl">Something went wrong</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-center">
            We're sorry, but something unexpected happened. Don't worry, your data is safe.
          </p>
          
          {process.env.NODE_ENV === 'development' && (
            <details className="bg-muted p-3 rounded-md">
              <summary className="cursor-pointer text-sm font-medium">Error Details</summary>
              <pre className="mt-2 text-xs text-muted-foreground overflow-auto">
                {error.message}
                {error.stack && `\n\n${error.stack}`}
              </pre>
            </details>
          )}

          <div className="flex gap-2">
            <Button onClick={resetError} className="flex-1">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/'}
              className="flex-1"
            >
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Page-level error boundary
export function PageErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary
      fallback={({ error, resetError }) => (
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                <CardTitle>Page Error</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                This page encountered an error. You can try refreshing or go back to the dashboard.
              </p>
              
              {process.env.NODE_ENV === 'development' && (
                <details className="bg-muted p-3 rounded-md">
                  <summary className="cursor-pointer text-sm font-medium">Error Details</summary>
                  <pre className="mt-2 text-xs text-muted-foreground overflow-auto">
                    {error.message}
                  </pre>
                </details>
              )}

              <div className="flex gap-2">
                <Button onClick={resetError}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Retry
                </Button>
                <Button variant="outline" onClick={() => window.history.back()}>
                  Go Back
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    >
      {children}
    </ErrorBoundary>
  )
}

// Component-level error boundary
export function ComponentErrorBoundary({ 
  children, 
  fallback 
}: { 
  children: React.ReactNode
  fallback?: React.ReactNode 
}) {
  return (
    <ErrorBoundary
      fallback={({ error, resetError }) => (
        <div className="p-4 border border-destructive/20 rounded-lg bg-destructive/5">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <span className="text-sm font-medium text-destructive">Component Error</span>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            This component failed to load properly.
          </p>
          <Button size="sm" onClick={resetError}>
            <RefreshCw className="w-3 h-3 mr-1" />
            Retry
          </Button>
        </div>
      )}
    >
      {children}
    </ErrorBoundary>
  )
}

// Hook for error handling
export function useErrorHandler() {
  const [error, setError] = React.useState<Error | null>(null)

  const resetError = React.useCallback(() => {
    setError(null)
  }, [])

  const handleError = React.useCallback((error: Error) => {
    setError(error)
    
    // Log error in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by useErrorHandler:', error)
    }
  }, [])

  return { error, resetError, handleError }
}
