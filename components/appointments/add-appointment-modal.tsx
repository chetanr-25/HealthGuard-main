"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, Clock, MapPin, FileText } from "lucide-react"

interface AddAppointmentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const doctors = [
  { id: "1", name: "Dr. Sarah Johnson", specialty: "OB/GYN" },
  { id: "2", name: "Dr. Michael Chen", specialty: "Ultrasound" },
  { id: "3", name: "Dr. Emily Rodriguez", specialty: "Lab Work" },
]

const locations = ["Medical Center, Suite 201", "Imaging Center", "Lab Services", "Telemedicine"]

const appointmentTypes = ["Checkup", "Ultrasound", "Test", "Follow-up", "Telemedicine"]

const timeSlots = [
  "9:00 AM",
  "9:15 AM",
  "9:30 AM",
  "9:45 AM",
  "10:00 AM",
  "10:15 AM",
  "10:30 AM",
  "10:45 AM",
  "2:00 PM",
  "2:15 PM",
  "2:30 PM",
  "2:45 PM",
  "3:00 PM",
  "3:15 PM",
  "3:30 PM",
  "3:45 PM",
]

export function AddAppointmentModal({ open, onOpenChange }: AddAppointmentModalProps) {
  const [selectedDoctor, setSelectedDoctor] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [notes, setNotes] = useState("")
  const [reminders, setReminders] = useState(["day-before"])
  const [addToCalendar, setAddToCalendar] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    onOpenChange(false)
    // Reset form
    setSelectedDoctor("")
    setSelectedDate("")
    setSelectedTime("")
    setSelectedLocation("")
    setSelectedType("")
    setNotes("")
    setReminders(["day-before"])
    setAddToCalendar(true)
  }

  const isFormValid = selectedDoctor && selectedDate && selectedTime && selectedLocation && selectedType

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Schedule New Appointment</DialogTitle>
          <DialogDescription>Fill in the details to book your appointment</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Doctor Selection */}
          <div className="space-y-2">
            <Label htmlFor="doctor">Select Doctor</Label>
            <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
              <SelectTrigger id="doctor">
                <SelectValue placeholder="Choose a doctor..." />
              </SelectTrigger>
              <SelectContent>
                {doctors.map((doctor) => (
                  <SelectItem key={doctor.id} value={doctor.id}>
                    {doctor.name} - {doctor.specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Date
              </Label>
              <Input id="date" type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Time
              </Label>
              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger id="time">
                  <SelectValue placeholder="Select time..." />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Location & Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Location
              </Label>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger id="location">
                  <SelectValue placeholder="Select location..." />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Appointment Type</Label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type..." />
                </SelectTrigger>
                <SelectContent>
                  {appointmentTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Notes (Optional)
            </Label>
            <Textarea
              id="notes"
              placeholder="Add any notes or questions for your appointment..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-24"
            />
          </div>

          {/* Reminders */}
          <div className="space-y-3">
            <Label>Reminder Preferences</Label>
            <div className="space-y-2">
              {[
                { id: "day-before", label: "Day before appointment" },
                { id: "hour-before", label: "1 hour before appointment" },
                { id: "email", label: "Email reminder" },
                { id: "sms", label: "SMS reminder" },
              ].map((reminder) => (
                <label key={reminder.id} className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={reminders.includes(reminder.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setReminders([...reminders, reminder.id])
                      } else {
                        setReminders(reminders.filter((r) => r !== reminder.id))
                      }
                    }}
                  />
                  <span className="text-sm">{reminder.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Add to Calendar */}
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox checked={addToCalendar} onCheckedChange={setAddToCalendar} />
            <span className="text-sm">Add to my calendar (.ics file)</span>
          </label>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-border">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!isFormValid || isSubmitting}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isSubmitting ? "Scheduling..." : "Schedule Appointment"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
