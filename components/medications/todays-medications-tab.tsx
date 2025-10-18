"use client"

import { useState } from "react"
import { CheckCircle2, Clock, AlertCircle, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Medication {
  id: string
  name: string
  dosage: string
  scheduledTime: string
  status: "taken" | "due" | "upcoming" | "missed"
  takenAt?: string
  icon: string
  withFood?: boolean
  notes?: string
}

const todaysMedications: Medication[] = [
  {
    id: "1",
    name: "Prenatal Multivitamin",
    dosage: "1 tablet",
    scheduledTime: "9:00 AM",
    status: "taken",
    takenAt: "9:05 AM",
    icon: "💊",
    withFood: true,
    notes: "Take with breakfast",
  },
  {
    id: "2",
    name: "Folic Acid 400mcg",
    dosage: "1 tablet",
    scheduledTime: "9:00 AM",
    status: "taken",
    takenAt: "9:05 AM",
    icon: "💊",
    notes: "",
  },
  {
    id: "3",
    name: "Iron Supplement 65mg",
    dosage: "1 tablet",
    scheduledTime: "1:00 PM",
    status: "due",
    icon: "💊",
    withFood: false,
    notes: "Take on empty stomach",
  },
  {
    id: "4",
    name: "Calcium 500mg",
    dosage: "1 tablet",
    scheduledTime: "8:00 PM",
    status: "upcoming",
    icon: "💊",
    withFood: true,
    notes: "",
  },
  {
    id: "5",
    name: "Omega-3 DHA",
    dosage: "1 capsule",
    scheduledTime: "9:00 AM",
    status: "missed",
    icon: "💊",
    notes: "",
  },
]

export function TodaysMedicationsTab() {
  const [viewMode, setViewMode] = useState<"timeline" | "list">("timeline")
  const [expandedNotes, setExpandedNotes] = useState<string | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "taken":
        return "bg-success/10 text-success border-success/20"
      case "due":
        return "bg-error/10 text-error border-error/20 animate-pulse-soft"
      case "upcoming":
        return "bg-primary/10 text-primary border-primary/20"
      case "missed":
        return "bg-warning/10 text-warning border-warning/20"
      default:
        return ""
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "taken":
        return <CheckCircle2 className="h-4 w-4" />
      case "due":
        return <AlertCircle className="h-4 w-4 animate-pulse" />
      case "upcoming":
        return <Clock className="h-4 w-4" />
      case "missed":
        return <AlertCircle className="h-4 w-4" />
      default:
        return null
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "taken":
        return "Taken"
      case "due":
        return "Due Now"
      case "upcoming":
        return "Upcoming"
      case "missed":
        return "Missed"
      default:
        return ""
    }
  }

  if (viewMode === "timeline") {
    return (
      <div className="space-y-4">
        <div className="flex justify-end mb-4">
          <Button variant="outline" size="sm" onClick={() => setViewMode("list")}>
            Switch to List View
          </Button>
        </div>

        {/* Timeline View */}
        <div className="relative">
          {/* 24-hour timeline background */}
          <div className="space-y-2">
            {todaysMedications.map((med) => {
              const hour = Number.parseInt(med.scheduledTime.split(":")[0])
              const topPercent = (hour / 24) * 100

              return (
                <div key={med.id} className="relative mb-6">
                  <Card className={`${getStatusColor(med.status)} border`}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl">{med.icon}</span>
                            <div>
                              <h3 className="font-semibold text-foreground">{med.name}</h3>
                              <p className="text-sm text-muted-foreground">{med.dosage}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-sm mb-3">
                            <Clock className="h-4 w-4" />
                            <span>{med.scheduledTime}</span>
                            {med.takenAt && <span className="text-success">• Taken at {med.takenAt}</span>}
                          </div>
                          {med.withFood && <div className="text-xs text-muted-foreground mb-2">🍽️ Take with food</div>}
                        </div>
                        <Badge className={getStatusColor(med.status)} variant="outline">
                          <span className="flex items-center gap-1">
                            {getStatusIcon(med.status)}
                            {getStatusLabel(med.status)}
                          </span>
                        </Badge>
                      </div>

                      {/* Action Buttons */}
                      {med.status === "due" && (
                        <div className="flex gap-2 mt-4">
                          <Button size="sm" className="flex-1 bg-success hover:bg-success/90">
                            Mark as Taken
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                            Snooze 15 min
                          </Button>
                        </div>
                      )}

                      {med.status === "upcoming" && (
                        <div className="flex gap-2 mt-4">
                          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                            Mark as Taken
                          </Button>
                        </div>
                      )}

                      {/* Notes */}
                      {med.notes && (
                        <div className="mt-3 pt-3 border-t border-border/50">
                          <button
                            onClick={() => setExpandedNotes(expandedNotes === med.id ? null : med.id)}
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {expandedNotes === med.id ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                            Notes
                          </button>
                          {expandedNotes === med.id && (
                            <p className="text-sm text-muted-foreground mt-2">{med.notes}</p>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // List View
  return (
    <div className="space-y-4">
      <div className="flex justify-end mb-4">
        <Button variant="outline" size="sm" onClick={() => setViewMode("timeline")}>
          Switch to Timeline View
        </Button>
      </div>

      {/* Due Now Section */}
      <div>
        <h3 className="font-semibold text-error mb-3 flex items-center gap-2">
          <AlertCircle className="h-4 w-4" />
          Due Now
        </h3>
        <div className="space-y-2">
          {todaysMedications
            .filter((m) => m.status === "due")
            .map((med) => (
              <Card key={med.id} className="bg-error/5 border-error/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <input type="checkbox" className="h-5 w-5 rounded" />
                    <div className="flex-1">
                      <p className="font-semibold">{med.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {med.dosage} • {med.scheduledTime}
                      </p>
                    </div>
                    <Button size="sm" className="bg-success hover:bg-success/90">
                      Take Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>

      {/* Upcoming Section */}
      <div>
        <h3 className="font-semibold text-primary mb-3 flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Upcoming Today
        </h3>
        <div className="space-y-2">
          {todaysMedications
            .filter((m) => m.status === "upcoming")
            .map((med) => (
              <Card key={med.id} className="bg-primary/5 border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <input type="checkbox" className="h-5 w-5 rounded" />
                    <div className="flex-1">
                      <p className="font-semibold">{med.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {med.dosage} • {med.scheduledTime}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>

      {/* Completed Section */}
      <div>
        <h3 className="font-semibold text-success mb-3 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" />
          Completed
        </h3>
        <div className="space-y-2">
          {todaysMedications
            .filter((m) => m.status === "taken")
            .map((med) => (
              <Card key={med.id} className="bg-success/5 border-success/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <CheckCircle2 className="h-5 w-5 text-success" />
                    <div className="flex-1">
                      <p className="font-semibold">{med.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {med.dosage} • Taken at {med.takenAt}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>

      {/* Missed Section */}
      <div>
        <h3 className="font-semibold text-warning mb-3 flex items-center gap-2">
          <AlertCircle className="h-4 w-4" />
          Missed
        </h3>
        <div className="space-y-2">
          {todaysMedications
            .filter((m) => m.status === "missed")
            .map((med) => (
              <Card key={med.id} className="bg-warning/5 border-warning/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <AlertCircle className="h-5 w-5 text-warning" />
                    <div className="flex-1">
                      <p className="font-semibold">{med.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {med.dosage} • {med.scheduledTime}
                      </p>
                    </div>
                    <Button size="sm" variant="outline">
                      Log Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  )
}
