"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Bell, AlertCircle } from "lucide-react"

interface RemindersPanelProps {
  onClose: () => void
}

const reminders = [
  {
    id: "1",
    title: "Upcoming Appointment",
    message: "Dr. Sarah Johnson - OB/GYN Checkup tomorrow at 10:00 AM",
    time: "Tomorrow",
    type: "appointment",
  },
  {
    id: "2",
    title: "Medication Reminder",
    message: "Take prenatal vitamins",
    time: "Today at 8:00 AM",
    type: "medication",
  },
  {
    id: "3",
    title: "Test Results Available",
    message: "Your lab results are ready for review",
    time: "2 hours ago",
    type: "alert",
  },
]

export function RemindersPanel({ onClose }: RemindersPanelProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 md:static md:bg-transparent md:z-auto">
      <Card className="absolute right-0 top-16 bottom-0 md:static w-full md:w-80 rounded-none md:rounded-lg shadow-lg md:shadow-md max-h-[calc(100vh-4rem)] md:max-h-none overflow-y-auto">
        <div className="p-4 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Reminders
            </h3>
            <Button variant="ghost" size="icon" onClick={onClose} className="md:hidden">
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Reminders List */}
          <div className="space-y-3">
            {reminders.map((reminder) => (
              <div key={reminder.id} className="p-3 bg-muted rounded-lg space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2 flex-1">
                    {reminder.type === "alert" ? (
                      <AlertCircle className="h-4 w-4 text-error flex-shrink-0 mt-0.5" />
                    ) : (
                      <Bell className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-foreground">{reminder.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{reminder.message}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs flex-shrink-0">
                    {reminder.time}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          {/* Settings */}
          <div className="pt-4 border-t border-border space-y-2">
            <Button variant="outline" className="w-full text-sm bg-transparent">
              Notification Settings
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
