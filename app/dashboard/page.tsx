"use client"

import { useState, Suspense } from "react"
import { TopNavigation } from "@/components/layout/top-navigation"
import { Sidebar } from "@/components/layout/sidebar"
import { ComponentErrorBoundary } from "@/components/ui/error-boundary"
import { StaggeredList, Skeleton } from "@/components/ui/page-transition"
import { OnboardingTour, useOnboardingTour } from "@/components/onboarding/onboarding-tour"
import { Button } from "@/components/ui/button"
import { HelpCircle } from "lucide-react"
import {
  LazyWelcomeHeader,
  LazyHealthStatsGrid,
  LazyAIHealthInsights,
  LazyTodaysTasks,
  LazyPregnancyTimeline,
  LazyQuickActionButton,
  WelcomeSkeleton,
  HealthStatsSkeleton,
  AIInsightsSkeleton,
  TasksSkeleton,
  TimelineSkeleton,
} from "@/components/ui/lazy-loading"

// Loading skeleton for dashboard sections
function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      {/* Welcome Section Skeleton */}
      <div className="space-y-4">
        <Skeleton height="2rem" width="300px" />
        <Skeleton height="1rem" width="500px" />
      </div>

      {/* Health Stats Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="p-4 border rounded-lg">
            <Skeleton height="1rem" width="100px" className="mb-2" />
            <Skeleton height="2rem" width="60px" />
          </div>
        ))}
      </div>

      {/* AI Insights Skeleton */}
      <div className="p-6 border rounded-lg">
        <Skeleton height="1.5rem" width="200px" className="mb-4" />
        <Skeleton height="4rem" />
      </div>

      {/* Tasks Skeleton */}
      <div className="space-y-4">
        <Skeleton height="1.5rem" width="150px" />
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-3 p-3 border rounded-lg">
            <Skeleton height="1rem" width="1rem" />
            <Skeleton height="1rem" width="200px" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { showTour, hasCompletedTour, startTour, completeTour, skipTour } = useOnboardingTour()

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onToggle={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <TopNavigation onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        {/* Scrollable Content */}
        <main className="flex-1 overflow-auto custom-scrollbar">
          <div className="mobile-padding md:p-6 lg:p-8 max-w-7xl mx-auto mobile-safe-area">
            <Suspense fallback={<DashboardSkeleton />}>
              <StaggeredList delay={100}>
                {/* Welcome Section */}
                <ComponentErrorBoundary>
                  <div className="hover-lift" data-tour="dashboard">
                    <Suspense fallback={<WelcomeSkeleton />}>
                      <LazyWelcomeHeader />
                    </Suspense>
                  </div>
                </ComponentErrorBoundary>

                {/* Health Stats Grid */}
                <ComponentErrorBoundary>
                  <div className="hover-lift">
                    <Suspense fallback={<HealthStatsSkeleton />}>
                      <LazyHealthStatsGrid />
                    </Suspense>
                  </div>
                </ComponentErrorBoundary>

                {/* AI Health Insights */}
                <ComponentErrorBoundary>
                  <div className="hover-lift" data-tour="ai-insights">
                    <Suspense fallback={<AIInsightsSkeleton />}>
                      <LazyAIHealthInsights />
                    </Suspense>
                  </div>
                </ComponentErrorBoundary>

                {/* Today's Tasks */}
                <ComponentErrorBoundary>
                  <div className="hover-lift">
                    <Suspense fallback={<TasksSkeleton />}>
                      <LazyTodaysTasks />
                    </Suspense>
                  </div>
                </ComponentErrorBoundary>

                {/* Pregnancy Timeline */}
                <ComponentErrorBoundary>
                  <div className="hover-lift">
                    <Suspense fallback={<TimelineSkeleton />}>
                      <LazyPregnancyTimeline />
                    </Suspense>
                  </div>
                </ComponentErrorBoundary>
              </StaggeredList>
            </Suspense>

            {/* Tour Help Button */}
            {!hasCompletedTour && (
              <div className="fixed bottom-20 right-4 md:right-6 z-30">
                <Button
                  onClick={startTour}
                  className="btn-micro hover-glow shadow-lg mobile-button touch-target"
                  size="lg"
                >
                  <HelpCircle className="w-5 h-5 mr-2" />
                  <span className="hidden sm:inline">Take a Tour</span>
                  <span className="sm:hidden">Tour</span>
                </Button>
              </div>
            )}

            {/* Bottom Spacing */}
            <div className="h-24 md:h-24" />
          </div>
        </main>
      </div>

      {/* Quick Action Button */}
      <ComponentErrorBoundary>
        <Suspense fallback={<div className="fixed bottom-6 right-6 w-14 h-14" />}>
          <LazyQuickActionButton />
        </Suspense>
      </ComponentErrorBoundary>

      {/* Onboarding Tour */}
      {showTour && (
        <OnboardingTour
          onComplete={completeTour}
          onSkip={skipTour}
        />
      )}
    </div>
  )
}
