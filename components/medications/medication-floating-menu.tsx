"use client"

import { useState } from "react"
import { Plus, Pill, Clock, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MedicationFloatingMenuProps {
  onAddClick: () => void
}

export function MedicationFloatingMenu({ onAddClick }: MedicationFloatingMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-24 md:bottom-8 right-8 z-30">
      {/* Menu Items */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Button
            size="lg"
            className="rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow bg-transparent"
            variant="outline"
            title="Quick Log"
          >
            <Pill className="h-5 w-5" />
          </Button>
          <Button
            size="lg"
            className="rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow bg-transparent"
            variant="outline"
            title="Today's Schedule"
          >
            <Clock className="h-5 w-5" />
          </Button>
          <Button
            size="lg"
            className="rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow bg-transparent"
            variant="outline"
            title="Reminders"
          >
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      )}

      {/* Main Button */}
      <Button
        size="lg"
        className="rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow bg-primary hover:bg-primary/90"
        onClick={() => {
          if (isOpen) {
            onAddClick()
          } else {
            setIsOpen(!isOpen)
          }
        }}
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  )
}
