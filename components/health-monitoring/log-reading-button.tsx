"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LogReadingModal } from "./log-reading-modal"

export function LogReadingButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 duration-200 animate-bounce-gentle"
        aria-label="Log reading"
      >
        <Plus className="h-6 w-6" />
      </Button>

      <LogReadingModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
