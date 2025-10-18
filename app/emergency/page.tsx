"use client"

import { useState } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { TopNavigation } from "@/components/layout/top-navigation"
import { EmergencyHeroSection } from "@/components/emergency/emergency-hero-section"
import { EmergencyStatusSelector } from "@/components/emergency/emergency-status-selector"
import { EmergencyContacts } from "@/components/emergency/emergency-contacts"
import { WarningSignsSection } from "@/components/emergency/warning-signs-section"
import { PregnancyEmergencyGuide } from "@/components/emergency/pregnancy-emergency-guide"
import { HospitalGoChecklist } from "@/components/emergency/hospital-go-checklist"
import { MedicalInfoCard } from "@/components/emergency/medical-info-card"
import { EmergencyModeToggle } from "@/components/emergency/emergency-mode-toggle"

export default function EmergencyPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [emergencyMode, setEmergencyMode] = useState(false)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar open={sidebarOpen} onToggle={setSidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavigation onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 overflow-auto">
          <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
            {/* Emergency Mode Toggle */}
            <div className="mb-6">
              <EmergencyModeToggle active={emergencyMode} onToggle={setEmergencyMode} />
            </div>

            {/* Hero Section - Emergency Call Button */}
            <div className="mb-8">
              <EmergencyHeroSection />
            </div>

            {/* Quick Status Selector */}
            <div className="mb-8">
              <EmergencyStatusSelector />
            </div>

            {/* Emergency Contacts */}
            <div className="mb-8">
              <EmergencyContacts />
            </div>

            {/* Warning Signs */}
            <div className="mb-8">
              <WarningSignsSection />
            </div>

            {/* Pregnancy Emergency Guide */}
            <div className="mb-8">
              <PregnancyEmergencyGuide />
            </div>

            {/* Hospital Go Bag Checklist */}
            <div className="mb-8">
              <HospitalGoChecklist />
            </div>

            {/* Medical Info Card */}
            <div className="mb-8">
              <MedicalInfoCard />
            </div>

            <div className="h-24" />
          </div>
        </main>
      </div>
    </div>
  )
}
