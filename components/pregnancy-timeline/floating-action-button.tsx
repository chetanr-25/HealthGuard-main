"use client"

import { useState } from "react"
import { Camera, Music, Maximize2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface FloatingActionButtonProps {
  currentWeek: number
}

export function FloatingActionButton({ currentWeek }: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const actions = [
    { icon: Camera, label: "Add Photo", action: () => alert("Photo upload for week " + currentWeek) },
    { icon: Music, label: "Heartbeat", action: () => setIsPlaying(!isPlaying) },
    { icon: Maximize2, label: "Size Compare", action: () => alert("Size comparison overlay") },
  ]

  return (
    <>
      {/* Floating Menu */}
      {isOpen && (
        <div className="fixed bottom-24 md:bottom-8 right-8 space-y-2 animate-slide-up z-30">
          {actions.map((action, idx) => (
            <Button
              key={idx}
              variant="outline"
              size="sm"
              onClick={() => {
                action.action()
                setIsOpen(false)
              }}
              className="gap-2 w-full justify-start bg-card shadow-lg hover:shadow-xl"
            >
              <action.icon className="h-4 w-4" />
              {action.label}
            </Button>
          ))}
        </div>
      )}

      {/* Main Button */}
      <div className="fixed bottom-8 md:bottom-8 right-8 z-40">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full w-14 h-14 shadow-lg hover:shadow-xl gap-2 bg-primary hover:bg-primary/90"
          size="icon"
        >
          {isOpen ? <X className="h-6 w-6" /> : <span className="text-xl">+</span>}
        </Button>
      </div>

      {/* Heartbeat Audio Indicator */}
      {isPlaying && (
        <Card className="fixed bottom-24 md:bottom-24 right-8 p-4 shadow-lg z-30 animate-pulse-soft">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-error animate-pulse" />
            <p className="text-sm font-medium text-foreground">Heartbeat playing...</p>
          </div>
        </Card>
      )}
    </>
  )
}
