"use client"

import type React from "react"

import { useState } from "react"
import { X, Heart, Baby, MessageSquare, Phone, Check } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface LoggingModalProps {
  isOpen: boolean
  onClose: () => void
  actionType: "vitals" | "kicks" | "note" | "emergency" | null
}

const getActionConfig = (type: string | null) => {
  switch (type) {
    case "vitals":
      return {
        title: "Log Vitals",
        icon: Heart,
        color: "bg-error",
        fields: [
          { label: "Heart Rate (bpm)", placeholder: "e.g., 72", type: "number" },
          { label: "Systolic BP (mmHg)", placeholder: "e.g., 120", type: "number" },
          { label: "Diastolic BP (mmHg)", placeholder: "e.g., 80", type: "number" },
          { label: "Weight (kg)", placeholder: "e.g., 68.5", type: "number" },
        ],
      }
    case "kicks":
      return {
        title: "Log Baby Kicks",
        icon: Baby,
        color: "bg-primary",
        fields: [
          { label: "Number of Kicks", placeholder: "e.g., 12", type: "number" },
          { label: "Notes", placeholder: "Any observations?", type: "textarea" },
        ],
      }
    case "note":
      return {
        title: "Add Health Note",
        icon: MessageSquare,
        color: "bg-accent",
        fields: [{ label: "Note", placeholder: "What would you like to record?", type: "textarea" }],
      }
    case "emergency":
      return {
        title: "Emergency Contact",
        icon: Phone,
        color: "bg-secondary",
        fields: [{ label: "Reason", placeholder: "Describe the emergency", type: "textarea" }],
      }
    default:
      return { title: "", icon: Heart, color: "", fields: [] }
  }
}

export function LoggingModal({ isOpen, onClose, actionType }: LoggingModalProps) {
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const config = getActionConfig(actionType)
  const Icon = config.icon

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setIsSuccess(true)

    setTimeout(() => {
      setIsSuccess(false)
      setFormData({})
      onClose()
    }, 1500)
  }

  if (!isOpen || !actionType) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <Card className="w-full max-w-md animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
          <div className="flex items-center gap-3">
            <div className={`${config.color} p-2 rounded-lg`}>
              <Icon className="h-5 w-5 text-white" />
            </div>
            <CardTitle>{config.title}</CardTitle>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </CardHeader>

        <CardContent className="pt-6">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-8 space-y-4 animate-in fade-in duration-300">
              <div className="bg-success/10 p-4 rounded-full">
                <Check className="h-8 w-8 text-success animate-in zoom-in duration-500" />
              </div>
              <p className="text-center font-semibold text-foreground">Successfully logged!</p>
              <p className="text-center text-sm text-muted-foreground">
                Your data has been saved to your health record.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {config.fields.map((field) => (
                <div key={field.label} className="space-y-2">
                  <label className="text-sm font-medium text-foreground">{field.label}</label>
                  {field.type === "textarea" ? (
                    <textarea
                      placeholder={field.placeholder}
                      value={formData[field.label] || ""}
                      onChange={(e) => handleInputChange(field.label, e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      rows={3}
                    />
                  ) : (
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={formData[field.label] || ""}
                      onChange={(e) => handleInputChange(field.label, e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  )}
                </div>
              ))}

              <div className="flex gap-2 pt-4">
                <Button
                  type="button"
                  onClick={onClose}
                  variant="outline"
                  className="flex-1 bg-transparent"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex-1 ${config.color} text-white hover:opacity-90`}
                >
                  {isSubmitting ? "Logging..." : "Log Data"}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
