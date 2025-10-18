"use client"

import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function MedicalDisclaimers() {
  return (
    <div className="space-y-4 mb-8">
      {/* Top Banner */}
      <Alert className="border-warning/50 bg-warning/5">
        <AlertCircle className="h-4 w-4 text-warning" />
        <AlertDescription className="text-sm">
          <span className="font-semibold">Important:</span> This assessment is not a medical diagnosis. Always consult
          with your healthcare provider for medical advice and treatment decisions.
        </AlertDescription>
      </Alert>

      {/* AI Badge */}
      <div className="flex items-center justify-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="text-xs font-medium text-primary">AI-Powered Insights</span>
        </div>
      </div>
    </div>
  )
}
