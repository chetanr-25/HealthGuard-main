"use client"

import { useState } from "react"
import { Plus, CheckCircle2, AlertCircle, Pill } from "lucide-react"
import { TopNavigation } from "@/components/layout/top-navigation"
import { Sidebar } from "@/components/layout/sidebar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TodaysMedicationsTab } from "@/components/medications/todays-medications-tab"
import { AllMedicationsTab } from "@/components/medications/all-medications-tab"
import { ScheduleTab } from "@/components/medications/schedule-tab"
import { HistoryTab } from "@/components/medications/history-tab"
import { RemindersSettingsTab } from "@/components/medications/reminders-settings-tab"
import { AddMedicationModal } from "@/components/medications/add-medication-modal"
import { MedicationFloatingMenu } from "@/components/medications/medication-floating-menu"
import { AISuggestionCards } from "@/components/medications/ai-suggestion-cards"
import { AdherenceInsights } from "@/components/medications/adherence-insights"
import { useSmartReminders } from "@/lib/hooks/useSmartReminders"

export default function MedicationsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [addMedicationOpen, setAddMedicationOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("today")
  
  // Smart reminders hook
  const {
    suggestions,
    patterns,
    insights,
    loading: smartRemindersLoading,
    error: smartRemindersError,
    generateSuggestions,
    acceptSuggestion,
    dismissSuggestion,
    getAdherenceSummary
  } = useSmartReminders()

  // Get adherence summary for real data
  const adherenceSummary = getAdherenceSummary()
  
  // Dummy data (will be replaced with real data from smart reminders)
  const summaryStats = {
    totalActive: adherenceSummary.totalMedications || 5,
    takenToday: 3, // This would come from medication logs
    missedThisWeek: adherenceSummary.needsAttention || 1,
    nextDue: { medication: "Iron Supplement", time: "9:00 PM", minutesUntil: 45 },
  }

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
            <div className="flex items-center justify-between mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Medication Tracker</h1>
                <p className="text-muted-foreground mt-1">Manage your medications and track adherence</p>
              </div>
              <Button onClick={() => setAddMedicationOpen(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Add Medication
              </Button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-75">
              {/* Total Active */}
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Active</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold text-primary">{summaryStats.totalActive}</div>
                    <Pill className="h-8 w-8 text-primary/30" />
                  </div>
                </CardContent>
              </Card>

              {/* Taken Today */}
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Taken Today</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold text-success">
                      {summaryStats.takenToday} of {summaryStats.totalActive}
                    </div>
                    <CheckCircle2 className="h-8 w-8 text-success/30" />
                  </div>
                </CardContent>
              </Card>

              {/* Missed This Week */}
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Missed This Week</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold text-warning">{summaryStats.missedThisWeek}</div>
                    <AlertCircle className="h-8 w-8 text-warning/30" />
                  </div>
                </CardContent>
              </Card>

              {/* Next Due */}
              <Card className="hover:shadow-md transition-shadow border-primary/20 bg-primary/5">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Next Due</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground text-sm">{summaryStats.nextDue.medication}</p>
                    <p className="text-primary font-bold">{summaryStats.nextDue.time}</p>
                    <p className="text-xs text-muted-foreground">in {summaryStats.nextDue.minutesUntil} min</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tabs */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-6 mb-6">
                  <TabsTrigger value="today">Today</TabsTrigger>
                  <TabsTrigger value="all">All Medications</TabsTrigger>
                  <TabsTrigger value="schedule">Schedule</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                  <TabsTrigger value="reminders">Reminders</TabsTrigger>
                  <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
                </TabsList>

                <TabsContent value="today" className="space-y-4">
                  <TodaysMedicationsTab />
                </TabsContent>

                <TabsContent value="all" className="space-y-4">
                  <AllMedicationsTab />
                </TabsContent>

                <TabsContent value="schedule" className="space-y-4">
                  <ScheduleTab />
                </TabsContent>

                <TabsContent value="history" className="space-y-4">
                  <HistoryTab />
                </TabsContent>

                <TabsContent value="reminders" className="space-y-4">
                  <RemindersSettingsTab />
                </TabsContent>

                <TabsContent value="ai-insights" className="space-y-6">
                  <div className="space-y-6">
                    {/* Adherence Insights */}
                    <AdherenceInsights 
                      patterns={patterns} 
                      loading={smartRemindersLoading} 
                    />
                    
                    {/* AI Suggestions */}
                    <AISuggestionCards
                      suggestions={suggestions}
                      onAccept={acceptSuggestion}
                      onDismiss={dismissSuggestion}
                      loading={smartRemindersLoading}
                    />
                    
                    {/* Generate New Suggestions Button */}
                    <div className="flex justify-center">
                      <Button 
                        onClick={generateSuggestions}
                        disabled={smartRemindersLoading}
                        variant="outline"
                        className="gap-2"
                      >
                        {smartRemindersLoading ? (
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                        ) : (
                          <span>Generate New AI Suggestions</span>
                        )}
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Bottom Spacing */}
            <div className="h-24" />
          </div>
        </main>
      </div>

      {/* Add Medication Modal */}
      <AddMedicationModal open={addMedicationOpen} onOpenChange={setAddMedicationOpen} />

      {/* Floating Action Menu */}
      <MedicationFloatingMenu onAddClick={() => setAddMedicationOpen(true)} />
    </div>
  )
}
