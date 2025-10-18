"use client"

import { useState } from "react"
import { TopNavigation } from "@/components/layout/top-navigation"
import { Sidebar } from "@/components/layout/sidebar"
import { ProgressIndicator } from "@/components/pregnancy-timeline/progress-indicator"
import { TrimesterTabs } from "@/components/pregnancy-timeline/trimester-tabs"
import { TimelineView } from "@/components/pregnancy-timeline/timeline-view"
import { FloatingActionButton } from "@/components/pregnancy-timeline/floating-action-button"

export default function PregnancyTimelinePage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [currentWeek, setCurrentWeek] = useState(24)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar open={sidebarOpen} onToggle={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavigation onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-6">
            {/* Progress Indicator */}
            <ProgressIndicator currentWeek={currentWeek} />

            {/* Trimester Overview Tabs */}
            <TrimesterTabs currentWeek={currentWeek} />

            {/* Main Timeline View */}
            <TimelineView currentWeek={currentWeek} onWeekChange={setCurrentWeek} />
          </div>
        </main>

        {/* Floating Action Button */}
        <FloatingActionButton currentWeek={currentWeek} />
      </div>
    </div>
  )
}
