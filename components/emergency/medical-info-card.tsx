"use client"

import { Share2, QrCode, Copy } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function MedicalInfoCard() {
  const medicalInfo = {
    name: "Sarah Johnson",
    age: 28,
    bloodType: "O+",
    pregnancyWeek: 24,
    dueDate: "March 15, 2025",
    complications: "None",
    medications: "Prenatal vitamins, Iron supplement",
    allergies: "Penicillin (rash)",
    doctorName: "Dr. Priya Sharma",
    doctorPhone: "+91-98765-43210",
  }

  const handleShare = (method: string) => {
    const text = `MEDICAL INFO: ${medicalInfo.name}, Age ${medicalInfo.age}, Blood Type ${medicalInfo.bloodType}, Week ${medicalInfo.pregnancyWeek}, Due ${medicalInfo.dueDate}, Allergies: ${medicalInfo.allergies}, Doctor: ${medicalInfo.doctorName} ${medicalInfo.doctorPhone}`

    if (method === "whatsapp") {
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank")
    } else if (method === "sms") {
      window.location.href = `sms:?body=${encodeURIComponent(text)}`
    } else if (method === "copy") {
      navigator.clipboard.writeText(text)
      alert("Medical info copied to clipboard!")
    }
  }

  return (
    <Card className="border-2 border-primary">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Share2 className="h-6 w-6 text-primary" />
          Emergency Medical Information
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-2">Quick access to critical medical details</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Medical Info Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-muted p-4 rounded-lg">
          <div>
            <p className="text-xs font-semibold text-muted-foreground">Name</p>
            <p className="text-sm font-bold text-foreground">{medicalInfo.name}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground">Age</p>
            <p className="text-sm font-bold text-foreground">{medicalInfo.age}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground">Blood Type</p>
            <p className="text-sm font-bold text-foreground">{medicalInfo.bloodType}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground">Pregnancy Week</p>
            <p className="text-sm font-bold text-foreground">Week {medicalInfo.pregnancyWeek}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground">Due Date</p>
            <p className="text-sm font-bold text-foreground">{medicalInfo.dueDate}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground">Allergies</p>
            <p className="text-sm font-bold text-red-600">{medicalInfo.allergies}</p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="space-y-3 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div>
            <p className="text-xs font-semibold text-blue-900">Medications</p>
            <p className="text-sm text-blue-800">{medicalInfo.medications}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-blue-900">Doctor</p>
            <p className="text-sm text-blue-800">{medicalInfo.doctorName}</p>
            <p className="text-sm text-blue-800">{medicalInfo.doctorPhone}</p>
          </div>
        </div>

        {/* Share Buttons */}
        <div className="space-y-2">
          <p className="text-sm font-semibold text-foreground">Share Medical Info</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Button variant="outline" className="border-2 bg-transparent" onClick={() => handleShare("whatsapp")}>
              WhatsApp
            </Button>
            <Button variant="outline" className="border-2 bg-transparent" onClick={() => handleShare("sms")}>
              SMS
            </Button>
            <Button variant="outline" className="border-2 bg-transparent" onClick={() => handleShare("copy")}>
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
            <Button variant="outline" className="border-2 bg-transparent">
              <QrCode className="h-4 w-4 mr-1" />
              QR Code
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
