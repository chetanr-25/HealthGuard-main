"use client"

import { Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

export function EmergencyHeroSection() {
  const handleEmergencyCall = () => {
    window.location.href = "tel:102"
  }

  return (
    <div className="space-y-4">
      {/* Main Emergency Call Button */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-6 md:p-8 shadow-lg">
        <button
          onClick={handleEmergencyCall}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-6 md:py-8 px-4 rounded-lg flex items-center justify-center gap-3 text-xl md:text-2xl transition-all duration-200 animate-pulse-ring shadow-lg"
          aria-label="Call emergency services"
        >
          <Phone className="h-8 w-8 md:h-10 md:w-10" />
          <span>CALL EMERGENCY SERVICES</span>
        </button>
        <div className="mt-4 text-white text-center space-y-2">
          <p className="text-lg md:text-xl font-bold">102 / 108</p>
          <p className="text-sm md:text-base flex items-center justify-center gap-2">
            <MapPin className="h-4 w-4" />
            Location will be shared
          </p>
        </div>
      </div>

      {/* Call Doctor Button */}
      <Button
        variant="outline"
        className="w-full h-16 text-lg font-semibold border-2 border-primary text-primary hover:bg-primary/10 bg-transparent"
        onClick={() => (window.location.href = "tel:+91-98765-43210")}
      >
        <Phone className="h-5 w-5 mr-2" />
        Call My Doctor
      </Button>

      {/* Critical Disclaimer */}
      <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 text-center">
        <p className="text-sm font-semibold text-red-900">⚠️ This app does not replace emergency medical services</p>
        <p className="text-xs text-red-800 mt-1">
          When in doubt, always call emergency services. Trust your instincts.
        </p>
      </div>
    </div>
  )
}
