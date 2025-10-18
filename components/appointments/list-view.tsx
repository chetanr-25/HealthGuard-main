"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Search, ChevronDown } from "lucide-react"
import { AppointmentCard } from "./appointment-card"

// Mock appointment data
const mockAppointments = [
  {
    id: "1",
    doctorName: "Dr. Sarah Johnson",
    specialty: "OB/GYN",
    date: new Date(2025, 9, 22),
    time: "10:00 AM",
    location: "Medical Center, Suite 201",
    type: "Checkup",
    status: "Confirmed",
    avatar: "SJ",
  },
  {
    id: "2",
    doctorName: "Dr. Michael Chen",
    specialty: "Ultrasound",
    date: new Date(2025, 9, 25),
    time: "2:30 PM",
    location: "Imaging Center",
    type: "Ultrasound",
    status: "Confirmed",
    avatar: "MC",
  },
  {
    id: "3",
    doctorName: "Dr. Emily Rodriguez",
    specialty: "Lab Work",
    date: new Date(2025, 10, 5),
    time: "9:00 AM",
    location: "Lab Services",
    type: "Test",
    status: "Pending",
    avatar: "ER",
  },
  {
    id: "4",
    doctorName: "Dr. James Wilson",
    specialty: "OB/GYN",
    date: new Date(2025, 8, 15),
    time: "3:00 PM",
    location: "Medical Center, Suite 201",
    type: "Checkup",
    status: "Completed",
    avatar: "JW",
  },
]

interface ListViewProps {
  onAddClick: () => void
}

export function ListView({ onAddClick }: ListViewProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [expandPast, setExpandPast] = useState(false)

  const now = new Date()
  const upcomingAppointments = mockAppointments.filter((apt) => apt.date >= now)
  const pastAppointments = mockAppointments.filter((apt) => apt.date < now)

  const filteredUpcoming = upcomingAppointments.filter(
    (apt) =>
      apt.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by doctor, specialty, or type..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Upcoming Appointments */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Upcoming Appointments</h3>
          <Badge variant="secondary">{filteredUpcoming.length}</Badge>
        </div>

        {filteredUpcoming.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground mb-4">No upcoming appointments</p>
            <Button onClick={onAddClick} variant="outline">
              Schedule Your First Appointment
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredUpcoming.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
          </div>
        )}
      </div>

      {/* Past Appointments */}
      {pastAppointments.length > 0 && (
        <Collapsible open={expandPast} onOpenChange={setExpandPast}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full justify-between bg-transparent">
              <span className="flex items-center gap-2">
                Past Appointments
                <Badge variant="secondary">{pastAppointments.length}</Badge>
              </span>
              <ChevronDown className={`h-4 w-4 transition-transform ${expandPast ? "rotate-180" : ""}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 mt-4">
            {pastAppointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  )
}
