"use client"

import type React from "react"

import { useState } from "react"
import { Upload, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ProfileAccountSettings() {
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    fullName: "Sarah Johnson",
    dateOfBirth: "1990-05-15",
    bloodType: "O+",
    height: "165",
    heightUnit: "cm",
    prePregnancyWeight: "65",
    weightUnit: "kg",
    phoneNumber: "+91 98765 43210",
    email: "sarah.johnson@email.com",
  })
  const [hasChanges, setHasChanges] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setHasChanges(true)
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setProfilePhoto(event.target?.result as string)
        setHasChanges(true)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-8">
      {/* Personal Information Section */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Photo */}
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border-2 border-primary/20">
                {profilePhoto ? (
                  <img src={profilePhoto || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-4xl font-bold text-primary">SJ</div>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="photo-upload" className="block">
                <Button variant="outline" className="gap-2 bg-transparent" asChild>
                  <span>
                    <Upload className="h-4 w-4" />
                    Upload Photo
                  </span>
                </Button>
              </label>
              <input id="photo-upload" type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
              {profilePhoto && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setProfilePhoto(null)
                    setHasChanges(true)
                  }}
                  className="gap-2 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                  Remove Photo
                </Button>
              )}
              <p className="text-xs text-muted-foreground">JPG, PNG up to 5MB</p>
            </div>
          </div>

          {/* Basic Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <Input value={formData.fullName} onChange={(e) => handleInputChange("fullName", e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Date of Birth</label>
              <Input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Blood Type</label>
              <Select value={formData.bloodType} onValueChange={(value) => handleInputChange("bloodType", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Height</label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={formData.height}
                  onChange={(e) => handleInputChange("height", e.target.value)}
                  className="flex-1"
                />
                <Select value={formData.heightUnit} onValueChange={(value) => handleInputChange("heightUnit", value)}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cm">cm</SelectItem>
                    <SelectItem value="ft">ft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Pre-pregnancy Weight</label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={formData.prePregnancyWeight}
                  onChange={(e) => handleInputChange("prePregnancyWeight", e.target.value)}
                  className="flex-1"
                />
                <Select value={formData.weightUnit} onValueChange={(value) => handleInputChange("weightUnit", value)}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">kg</SelectItem>
                    <SelectItem value="lbs">lbs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Phone Number</label>
              <Input value={formData.phoneNumber} onChange={(e) => handleInputChange("phoneNumber", e.target.value)} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email Address</label>
            <Input type="email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} />
          </div>

          {hasChanges && <Button className="w-full">Save Changes</Button>}
        </CardContent>
      </Card>

      {/* Account Settings Section */}
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Email Preferences */}
          <div className="pb-4 border-b border-border">
            <h3 className="font-medium mb-3">Email Preferences</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Primary Email</p>
                <p className="text-sm text-muted-foreground">{formData.email}</p>
              </div>
              <Button variant="outline" size="sm">
                Change Email
              </Button>
            </div>
          </div>

          {/* Password & Security */}
          <div className="pb-4 border-b border-border">
            <h3 className="font-medium mb-3">Password & Security</h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                Change Password
              </Button>
              <div className="flex items-center justify-between">
                <span className="text-sm">Two-factor authentication</span>
                <input type="checkbox" className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Account Management */}
          <div>
            <h3 className="font-medium mb-3">Account Management</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start text-warning hover:text-warning bg-transparent">
                Deactivate Account
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-destructive hover:text-destructive bg-transparent"
              >
                Delete Account
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
