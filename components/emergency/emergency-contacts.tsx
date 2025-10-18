"use client"

import { Phone, MessageSquare, Video, MapPin, Clock, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function EmergencyContacts() {
  const contacts = [
    {
      id: "doctor",
      name: "Dr. Priya Sharma",
      specialty: "OB/GYN",
      phone: "+91-98765-43210",
      status: "Available 24/7",
      lastContacted: "Today at 2:30 PM",
      actions: [
        { label: "Call Now", icon: Phone, color: "bg-green-600 hover:bg-green-700", action: "call" },
        { label: "Message", icon: MessageSquare, color: "bg-blue-600 hover:bg-blue-700", action: "message" },
        { label: "Video Call", icon: Video, color: "bg-purple-600 hover:bg-purple-700", action: "video" },
      ],
    },
    {
      id: "hospital",
      name: "Apollo Women's Hospital",
      specialty: "Nearest Hospital",
      phone: "+91-98765-54321",
      distance: "2.3 km away",
      driveTime: "8 minutes",
      status: "Open - Emergency Room",
      actions: [
        { label: "Call Hospital", icon: Phone, color: "bg-green-600 hover:bg-green-700", action: "call" },
        { label: "Get Directions", icon: MapPin, color: "bg-blue-600 hover:bg-blue-700", action: "directions" },
      ],
    },
    {
      id: "emergency",
      name: "Emergency Services",
      specialty: "Ambulance & Medical",
      phone: "102 / 108",
      status: "Always Available",
      actions: [{ label: "Call Ambulance", icon: Phone, color: "bg-red-600 hover:bg-red-700", action: "call" }],
    },
    {
      id: "partner",
      name: "Raj (Husband)",
      specialty: "Emergency Contact",
      phone: "+91-98765-12345",
      status: "Available",
      actions: [
        { label: "Call", icon: Phone, color: "bg-green-600 hover:bg-green-700", action: "call" },
        { label: "Message", icon: MessageSquare, color: "bg-blue-600 hover:bg-blue-700", action: "message" },
      ],
    },
  ]

  const handleAction = (phone: string, action: string) => {
    if (action === "call") {
      window.location.href = `tel:${phone}`
    } else if (action === "message") {
      window.location.href = `sms:${phone}`
    } else if (action === "directions") {
      window.open("https://maps.google.com", "_blank")
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <AlertCircle className="h-5 w-5 text-red-600" />
        <h2 className="text-2xl font-bold text-foreground">Emergency Contacts</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contacts.map((contact) => (
          <Card key={contact.id} className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{contact.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{contact.specialty}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Contact Info */}
              <div className="space-y-2 text-sm">
                <p className="font-semibold text-foreground">{contact.phone}</p>
                {contact.distance && (
                  <p className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {contact.distance} • {contact.driveTime}
                  </p>
                )}
                {contact.lastContacted && (
                  <p className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {contact.lastContacted}
                  </p>
                )}
                <p className={`font-semibold ${contact.status.includes("Open") ? "text-green-600" : "text-primary"}`}>
                  {contact.status}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                {contact.actions.map((btn) => {
                  const Icon = btn.icon
                  return (
                    <Button
                      key={btn.label}
                      onClick={() => handleAction(contact.phone, btn.action)}
                      className={`w-full ${btn.color} text-white font-semibold h-12`}
                    >
                      <Icon className="h-5 w-5 mr-2" />
                      {btn.label}
                    </Button>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Notify All Button */}
      <Button
        variant="outline"
        className="w-full h-12 border-2 border-primary text-primary font-semibold bg-transparent"
      >
        <AlertCircle className="h-5 w-5 mr-2" />
        Notify All Emergency Contacts
      </Button>
    </div>
  )
}
