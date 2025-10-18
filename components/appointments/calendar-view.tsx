"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { AppointmentCard } from "./appointment-card"

interface CalendarViewProps {
  onAddClick: () => void
}

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
]

export function CalendarView({ onAddClick }: CalendarViewProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date(2025, 9, 18))
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 9))

  const appointmentsForDate = mockAppointments.filter(
    (apt) =>
      apt.date.getDate() === selectedDate?.getDate() &&
      apt.date.getMonth() === selectedDate?.getMonth() &&
      apt.date.getFullYear() === selectedDate?.getFullYear(),
  )

  const datesWithAppointments = mockAppointments.map((apt) => apt.date)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Calendar */}
      <Card className="lg:col-span-1 p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">
              {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </h3>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            month={currentMonth}
            onMonthChange={setCurrentMonth}
            disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
            className="[&_[role=gridcell]]:relative"
            classNameDay={(date) => {
              const hasAppointment = datesWithAppointments.some(
                (apt) =>
                  apt.getDate() === date.getDate() &&
                  apt.getMonth() === date.getMonth() &&
                  apt.getFullYear() === date.getFullYear(),
              )
              return hasAppointment ? "bg-primary/10 font-bold" : ""
            }}
          />

          <Button onClick={onAddClick} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            Schedule Appointment
          </Button>
        </div>
      </Card>

      {/* Appointments for Selected Date */}
      <div className="lg:col-span-2 space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">
            {selectedDate?.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </h3>

          {appointmentsForDate.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground mb-4">No appointments scheduled for this date</p>
              <Button onClick={onAddClick} variant="outline">
                Schedule First Appointment
              </Button>
            </Card>
          ) : (
            <div className="space-y-4">
              {appointmentsForDate.map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
