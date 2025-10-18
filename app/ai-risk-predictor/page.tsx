"use client"

import { useState } from "react"
import { TopNavigation } from "@/components/layout/top-navigation"
import { Sidebar } from "@/components/layout/sidebar"
import { RiskHeroSection } from "@/components/ai-risk-predictor/risk-hero-section"
import { RiskBreakdownSection } from "@/components/ai-risk-predictor/risk-breakdown-section"
import { HistoricalRiskChart } from "@/components/ai-risk-predictor/historical-risk-chart"
import { InsightsCards } from "@/components/ai-risk-predictor/insights-cards"
import { MedicalDisclaimers } from "@/components/ai-risk-predictor/medical-disclaimers"

export default function AIRiskPredictorPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 overflow-auto">
          <div className="p-4 md:p-8 max-w-7xl mx-auto">
            {/* Medical Disclaimer Banner */}
            <MedicalDisclaimers />

            {/* Hero Section */}
            <RiskHeroSection />

            {/* Risk Breakdown Section */}
            <RiskBreakdownSection />

            {/* Historical Risk Chart */}
            <HistoricalRiskChart />

            {/* Insights Cards */}
            <InsightsCards />
          </div>
        </main>
      </div>
    </div>
  )
}
