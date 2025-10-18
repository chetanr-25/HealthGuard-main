"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Check } from "lucide-react"

export function LogReadingModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState("heart-rate")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    value: "",
    notes: "",
    timestamp: new Date().toISOString().slice(0, 16),
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsLoading(false)
    setIsSuccess(true)

    // Reset after success
    setTimeout(() => {
      setIsSuccess(false)
      setFormData({ value: "", notes: "", timestamp: new Date().toISOString().slice(0, 16) })
      onClose()
    }, 1500)
  }

  const vitalTypes = [
    { id: "heart-rate", label: "Heart Rate", unit: "bpm", placeholder: "e.g., 72" },
    { id: "blood-pressure", label: "Blood Pressure", unit: "mmHg", placeholder: "e.g., 120/80" },
    { id: "weight", label: "Weight", unit: "kg", placeholder: "e.g., 68.5" },
    { id: "blood-glucose", label: "Blood Glucose", unit: "mg/dL", placeholder: "e.g., 95" },
    { id: "temperature", label: "Temperature", unit: "°C", placeholder: "e.g., 36.8" },
    { id: "baby-kicks", label: "Baby Kicks", unit: "kicks", placeholder: "e.g., 12" },
  ]

  const currentVital = vitalTypes.find((v) => v.id === activeTab)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Log Health Reading</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            {vitalTypes.slice(0, 3).map((vital) => (
              <TabsTrigger key={vital.id} value={vital.id} className="text-xs">
                {vital.label.split(" ")[0]}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsList className="grid w-full grid-cols-3 mb-4">
            {vitalTypes.slice(3).map((vital) => (
              <TabsTrigger key={vital.id} value={vital.id} className="text-xs">
                {vital.label.split(" ")[0]}
              </TabsTrigger>
            ))}
          </TabsList>

          {vitalTypes.map((vital) => (
            <TabsContent key={vital.id} value={vital.id}>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="value" className="text-sm font-medium">
                    {vital.label}
                  </Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      id="value"
                      placeholder={vital.placeholder}
                      value={formData.value}
                      onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                      disabled={isLoading || isSuccess}
                      required
                    />
                    <span className="flex items-center px-3 bg-muted rounded-md text-sm font-medium text-muted-foreground">
                      {vital.unit}
                    </span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="timestamp" className="text-sm font-medium">
                    Timestamp
                  </Label>
                  <Input
                    id="timestamp"
                    type="datetime-local"
                    value={formData.timestamp}
                    onChange={(e) => setFormData({ ...formData, timestamp: e.target.value })}
                    disabled={isLoading || isSuccess}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="notes" className="text-sm font-medium">
                    Notes (Optional)
                  </Label>
                  <Textarea
                    id="notes"
                    placeholder="Add any notes about this reading..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    disabled={isLoading || isSuccess}
                    className="mt-2 resize-none"
                    rows={3}
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    disabled={isLoading || isSuccess}
                    className="flex-1 bg-transparent"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading || isSuccess || !formData.value} className="flex-1 gap-2">
                    {isSuccess ? (
                      <>
                        <Check className="h-4 w-4" />
                        Logged
                      </>
                    ) : isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Logging...
                      </>
                    ) : (
                      "Log Reading"
                    )}
                  </Button>
                </div>
              </form>
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
