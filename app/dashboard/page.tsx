"use client"

import { useState } from "react"
import { TopNavigation } from "@/components/layout/top-navigation"
import { Sidebar } from "@/components/layout/sidebar"
import { WelcomeHeader } from "@/components/dashboard/welcome-header"
import { HealthStatsGrid } from "@/components/dashboard/health-stats-grid"
import { AIHealthInsights } from "@/components/dashboard/ai-health-insights"
import { TodaysTasks } from "@/components/dashboard/todays-tasks"
import { PregnancyTimeline } from "@/components/dashboard/pregnancy-timeline"
import { QuickActionButton } from "@/components/dashboard/quick-action-button"

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onToggle={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <TopNavigation onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        {/* Scrollable Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
            <div className="space-y-8">
              {/* Welcome Section */}
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <WelcomeHeader />
              </div>

              {/* Health Stats Grid */}
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-75">
                <HealthStatsGrid />
              </div>

              {/* AI Health Insights */}
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
                <AIHealthInsights />
              </div>

              {/* Today's Tasks */}
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
                <TodaysTasks />
              </div>

              {/* Pregnancy Timeline */}
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
                <PregnancyTimeline />
              </div>
            </div>

            {/* Bottom Spacing */}
            <div className="h-24" />
          </div>
        </main>
      </div>

      {/* Quick Action Button */}
      <QuickActionButton />
    </div>
  )
}
