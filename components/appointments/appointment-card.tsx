"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { MapPin, Clock, Calendar, MapIcon, Video, ChevronDown, CheckCircle2, AlertCircle } from "lucide-react"

interface AppointmentCardProps {
  appointment: {
    id: string
    doctorName: string
    specialty: string
    date: Date
    time: string
    location: string
    type: string
    status: "Confirmed" | "Pending" | "Completed"
    avatar: string
  }
}

export function AppointmentCard({ appointment }: AppointmentCardProps) {
  const [expandChecklist, setExpandChecklist] = useState(false)
  const [checkedItems, setCheckedItems] = useState<string[]>([])

  const isUpcoming = appointment.date >= new Date()
  const isTelemedicine = appointment.type === "Telemedicine"

  const checklistItems = [
    { id: "questions", label: "Questions to ask doctor" },
    { id: "symptoms", label: "Symptoms to mention" },
    { id: "tests", label: "Tests to request" },
    { id: "documents", label: "Documents to bring" },
  ]

  const toggleChecklistItem = (id: string) => {
    setCheckedItems((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const statusConfig = {
    Confirmed: { color: "bg-success/10 text-success border-success/20", icon: CheckCircle2 },
    Pending: { color: "bg-warning/10 text-warning border-warning/20", icon: AlertCircle },
    Completed: { color: "bg-muted text-muted-foreground border-border", icon: CheckCircle2 },
  }

  const StatusIcon = statusConfig[appointment.status].icon

  return (
    <Card className="p-4 hover:shadow-md transition-shadow animate-slide-up">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <Avatar className="h-10 w-10 bg-primary/10">
              <AvatarFallback className="bg-primary/20 text-primary font-semibold">{appointment.avatar}</AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-foreground">{appointment.doctorName}</h4>
              <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
            </div>
          </div>

          <Badge variant="outline" className={`flex items-center gap-1 ${statusConfig[appointment.status].color}`}>
            <StatusIcon className="h-3 w-3" />
            {appointment.status}
          </Badge>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4 flex-shrink-0" />
            <span>
              {appointment.date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4 flex-shrink-0" />
            <span>{appointment.time}</span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground col-span-1 sm:col-span-2">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{appointment.location}</span>
          </div>
        </div>

        {/* Type Badge */}
        <div className="flex gap-2">
          <Badge variant="secondary" className="bg-secondary/10 text-secondary border-secondary/20">
            {appointment.type}
          </Badge>
        </div>

        {/* Pre-Appointment Checklist */}
        {isUpcoming && (
          <Collapsible open={expandChecklist} onOpenChange={setExpandChecklist}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between h-auto p-2 text-sm">
                <span>Pre-Appointment Checklist</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${expandChecklist ? "rotate-180" : ""}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 mt-2 pt-2 border-t border-border">
              {checklistItems.map((item) => (
                <label key={item.id} className="flex items-center gap-2 cursor-pointer text-sm">
                  <input
                    type="checkbox"
                    checked={checkedItems.includes(item.id)}
                    onChange={() => toggleChecklistItem(item.id)}
                    className="rounded border-border"
                  />
                  <span className={checkedItems.includes(item.id) ? "line-through text-muted-foreground" : ""}>
                    {item.label}
                  </span>
                </label>
              ))}
            </CollapsibleContent>
          </Collapsible>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
          {isTelemedicine && (
            <Button size="sm" variant="outline" className="gap-2 flex-1 sm:flex-none bg-transparent">
              <Video className="h-4 w-4" />
              <span className="hidden sm:inline">Join Call</span>
            </Button>
          )}

          <Button size="sm" variant="outline" className="gap-2 flex-1 sm:flex-none bg-transparent">
            <MapIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Directions</span>
          </Button>

          {isUpcoming && (
            <>
              <Button size="sm" variant="outline" className="flex-1 sm:flex-none bg-transparent">
                Reschedule
              </Button>
              <Button size="sm" variant="outline" className="flex-1 sm:flex-none bg-transparent">
                Cancel
              </Button>
            </>
          )}

          {!isUpcoming && (
            <Button size="sm" variant="outline" className="flex-1 sm:flex-none bg-transparent">
              Add Notes
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}
