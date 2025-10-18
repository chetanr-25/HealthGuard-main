"use client"

import { useState } from "react"
import { Clock, MapPin, Pill, CheckCircle2, AlertCircle, BookOpen } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

export function TodaysTasks() {
  const [medications, setMedications] = useState([
    { name: "Prenatal Vitamin", time: "8:00 AM", taken: true },
    { name: "Iron Supplement", time: "12:00 PM", taken: false },
  ])
  const [updatingMed, setUpdatingMed] = useState<string | null>(null)

  const handleMedicationToggle = async (medName: string) => {
    setUpdatingMed(medName)

    // Optimistically update UI
    setMedications((prev) => prev.map((med) => (med.name === medName ? { ...med, taken: !med.taken } : med)))

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 600))
    setUpdatingMed(null)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
      {/* Appointments */}
      <Card className="lg:col-span-1 hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Upcoming Appointment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg space-y-3">
            <div>
              <p className="font-semibold text-foreground">Dr. Emily Johnson</p>
              <p className="text-sm text-muted-foreground">OB/GYN Specialist</p>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-foreground">
                <span className="font-medium">Date:</span> Oct 21, 2025
              </p>
              <p className="text-foreground">
                <span className="font-medium">Time:</span> 2:00 PM
              </p>
              <div className="flex items-center gap-2 text-foreground">
                <MapPin className="h-4 w-4" />
                <span>City Medical Center</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="flex-1 bg-transparent hover:bg-primary/5 transition-colors">
              Get Directions
            </Button>
            <Button size="sm" variant="outline" className="flex-1 bg-transparent hover:bg-primary/5 transition-colors">
              Reschedule
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Medications */}
      <Card className="lg:col-span-1 hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Pill className="h-5 w-5 text-secondary" />
            Medication Reminders
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {medications.map((med) => (
            <div
              key={med.name}
              onClick={() => handleMedicationToggle(med.name)}
              className="flex items-center gap-3 p-2 bg-muted rounded-lg cursor-pointer hover:bg-muted/80 transition-colors group"
            >
              <div className="relative">
                <Checkbox checked={med.taken} onChange={() => {}} className="cursor-pointer" />
                {updatingMed === med.name && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <p
                  className={`text-sm font-medium ${med.taken ? "line-through text-muted-foreground" : "text-foreground"}`}
                >
                  {med.name}
                </p>
                <p className="text-xs text-muted-foreground">{med.time}</p>
              </div>
              {med.taken ? (
                <CheckCircle2 className="h-4 w-4 text-success animate-in zoom-in duration-300" />
              ) : (
                <AlertCircle className="h-4 w-4 text-warning group-hover:text-warning/80 transition-colors" />
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Health Tips */}
      <Card className="lg:col-span-1 hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-accent" />
            Health Tip of the Day
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gradient-to-br from-accent/10 to-primary/10 p-4 rounded-lg">
            <p className="text-sm text-foreground leading-relaxed">
              <span className="font-semibold">Stay Hydrated:</span> Drink at least 8-10 glasses of water daily during
              pregnancy to support increased blood volume and amniotic fluid production.
            </p>
          </div>
          <Button variant="outline" size="sm" className="w-full bg-transparent hover:bg-primary/5 transition-colors">
            Read More Articles
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
