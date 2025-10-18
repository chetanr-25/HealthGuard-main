"use client"

import { useState, useEffect } from "react"
import { TopNavigation } from "@/components/layout/top-navigation"
import { Sidebar } from "@/components/layout/sidebar"
import { RiskHeroSection } from "@/components/ai-risk-predictor/risk-hero-section"
import { RiskBreakdownSection } from "@/components/ai-risk-predictor/risk-breakdown-section"
import { HistoricalRiskChart } from "@/components/ai-risk-predictor/historical-risk-chart"
import { InsightsCards } from "@/components/ai-risk-predictor/insights-cards"
import { MedicalDisclaimers } from "@/components/ai-risk-predictor/medical-disclaimers"
import { OnboardingModal } from "@/components/onboarding/onboarding-modal"
import { useUserProfile } from "@/lib/hooks/useUserProfile"
import { useHealthRiskAssessment } from "@/lib/hooks/useHealthRiskAssessment"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RefreshCw, AlertTriangle, CheckCircle, Clock } from "lucide-react"

export default function AIRiskPredictorPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [onboardingOpen, setOnboardingOpen] = useState(false)
  const { profile, needsOnboarding } = useUserProfile()
  const { 
    assessment, 
    loading, 
    error, 
    lastAssessmentDate, 
    runAssessment, 
    getAssessmentStatus,
    getRiskStyling,
    canRunAssessment 
  } = useHealthRiskAssessment()

  const handleRunAssessment = () => {
    runAssessment(true) // Force refresh
  }

  const handleOnboardingClose = () => {
    setOnboardingOpen(false)
  }

  // Show onboarding modal if needed
  const shouldShowOnboarding = needsOnboarding() && onboardingOpen

  // Auto-show onboarding modal when needed
  useEffect(() => {
    if (needsOnboarding()) {
      setOnboardingOpen(true)
    }
  }, [needsOnboarding])

  const getStatusIcon = () => {
    const status = getAssessmentStatus()
    switch (status) {
      case 'loading':
        return <RefreshCw className="w-4 h-4 animate-spin" />
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      case 'current':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'stale':
        return <Clock className="w-4 h-4 text-yellow-500" />
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusMessage = () => {
    const status = getAssessmentStatus()
    switch (status) {
      case 'loading':
        return 'Running AI assessment...'
      case 'error':
        return 'Assessment failed. Please try again.'
      case 'current':
        return `Last updated: ${lastAssessmentDate?.toLocaleString()}`
      case 'stale':
        return 'Assessment is outdated. Consider running a new one.'
      case 'no-data':
        return 'No assessment available. Run your first assessment.'
      default:
        return 'Assessment status unknown.'
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 overflow-auto">
          <div className="p-4 md:p-8 max-w-7xl mx-auto">
            {/* Medical Disclaimer Banner */}
            <MedicalDisclaimers />

            {/* Assessment Status and Controls */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  {getStatusIcon()}
                  <span className="text-sm text-muted-foreground">
                    {getStatusMessage()}
                  </span>
                </div>
                <Button
                  onClick={handleRunAssessment}
                  disabled={!canRunAssessment || loading}
                  className="flex items-center space-x-2"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  <span>{loading ? 'Running...' : 'Run New Assessment'}</span>
                </Button>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {assessment?.urgentAction && (
                <Alert variant="destructive" className="border-red-500 bg-red-50">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription className="font-semibold">
                    {assessment.urgentMessage || 'High risk detected. Please consult your healthcare provider immediately.'}
                  </AlertDescription>
                </Alert>
              )}
            </div>

            {/* Hero Section */}
            <RiskHeroSection assessment={assessment} />

            {/* Risk Breakdown Section */}
            <RiskBreakdownSection assessment={assessment} />

            {/* Historical Risk Chart */}
            <HistoricalRiskChart assessment={assessment} />

            {/* Insights Cards */}
            <InsightsCards assessment={assessment} />
          </div>
        </main>
      </div>

      {/* Onboarding Modal */}
      {shouldShowOnboarding && (
        <OnboardingModal 
          open={shouldShowOnboarding} 
          onClose={handleOnboardingClose} 
        />
      )}
    </div>
  )
}
