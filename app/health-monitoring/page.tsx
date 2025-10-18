"use client"

import { useState } from "react"
import { TopNavigation } from "@/components/layout/top-navigation"
import { Sidebar } from "@/components/layout/sidebar"
import { VitalsTab } from "@/components/health-monitoring/vitals-tab"
import { TrendsTab } from "@/components/health-monitoring/trends-tab"
import { HistoryTab } from "@/components/health-monitoring/history-tab"
import { LogReadingButton } from "@/components/health-monitoring/log-reading-button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function HealthMonitoring() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState("vitals")

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
            {/* Page Header */}
            <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h1 className="text-3xl font-bold text-foreground mb-2">Health Monitoring</h1>
              <p className="text-muted-foreground">Track and monitor your vital signs throughout your pregnancy</p>
            </div>

            {/* Tab Navigation */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-75">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="vitals">Vitals</TabsTrigger>
                  <TabsTrigger value="trends">Trends</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>

                {/* Vitals Tab */}
                <TabsContent value="vitals" className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <VitalsTab />
                </TabsContent>

                {/* Trends Tab */}
                <TabsContent value="trends" className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <TrendsTab />
                </TabsContent>

                {/* History Tab */}
                <TabsContent value="history" className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <HistoryTab />
                </TabsContent>
              </Tabs>
            </div>

            {/* Bottom Spacing */}
            <div className="h-24" />
          </div>
        </main>
      </div>

      {/* Floating Log Reading Button */}
      <LogReadingButton />
    </div>
  )
}
