"use client"

import { AlertTriangle, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EmergencyModeToggleProps {
  active: boolean
  onToggle: (active: boolean) => void
}

export function EmergencyModeToggle({ active, onToggle }: EmergencyModeToggleProps) {
  if (!active) {
    return (
      <Button
        onClick={() => onToggle(true)}
        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 text-lg flex items-center justify-center gap-2"
      >
        <AlertTriangle className="h-5 w-5" />
        Activate Emergency Mode
      </Button>
    )
  }

  return (
    <div className="bg-red-600 text-white rounded-lg p-4 flex items-center justify-between animate-pulse-ring">
      <div className="flex items-center gap-3">
        <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
        <div>
          <p className="font-bold text-lg">Emergency Mode Active</p>
          <p className="text-sm text-red-100">Screen will stay on • Location sharing enabled</p>
        </div>
      </div>
      <Button onClick={() => onToggle(false)} variant="ghost" size="icon" className="text-white hover:bg-red-700">
        <X className="h-5 w-5" />
      </Button>
    </div>
  )
}
