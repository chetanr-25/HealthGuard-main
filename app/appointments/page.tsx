"use client"

import { useState } from "react"
import { TopNavigation } from "@/components/layout/top-navigation"
import { Sidebar } from "@/components/layout/sidebar"
import { CalendarView } from "@/components/appointments/calendar-view"
import { ListView } from "@/components/appointments/list-view"
import { AddAppointmentModal } from "@/components/appointments/add-appointment-modal"
import { RemindersPanel } from "@/components/appointments/reminders-panel"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, List, Plus, Bell } from "lucide-react"

export default function AppointmentsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar")
  const [showAddModal, setShowAddModal] = useState(false)
  const [showReminders, setShowReminders] = useState(false)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar open={sidebarOpen} onToggle={setSidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavigation onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 overflow-auto pb-20 md:pb-0">
          <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Appointments</h1>
                <p className="text-muted-foreground mt-1">Manage your healthcare appointments</p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowReminders(!showReminders)}
                  className="relative"
                  aria-label="Reminders"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full" />
                </Button>

                <Button
                  onClick={() => setShowAddModal(true)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                >
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">New Appointment</span>
                </Button>
              </div>
            </div>

            {/* View Toggle */}
            <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "calendar" | "list")} className="w-full">
              <TabsList className="grid w-full max-w-xs">
                <TabsTrigger value="calendar" className="gap-2">
                  <Calendar className="h-4 w-4" />
                  <span className="hidden sm:inline">Calendar</span>
                </TabsTrigger>
                <TabsTrigger value="list" className="gap-2">
                  <List className="h-4 w-4" />
                  <span className="hidden sm:inline">List</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="calendar" className="mt-6">
                <CalendarView onAddClick={() => setShowAddModal(true)} />
              </TabsContent>

              <TabsContent value="list" className="mt-6">
                <ListView onAddClick={() => setShowAddModal(true)} />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>

      {/* Reminders Panel */}
      {showReminders && <RemindersPanel onClose={() => setShowReminders(false)} />}

      {/* Add Appointment Modal */}
      <AddAppointmentModal open={showAddModal} onOpenChange={setShowAddModal} />
    </div>
  )
}
