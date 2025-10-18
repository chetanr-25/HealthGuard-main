"use client"

import { useState, useEffect } from "react"
import { RefreshCw, Download } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RiskAssessment } from "@/lib/aiAgent"

interface RiskHeroSectionProps {
  assessment?: RiskAssessment | null
}

export function RiskHeroSection({ assessment }: RiskHeroSectionProps) {
  const [displayScore, setDisplayScore] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const riskScore = assessment?.overallRiskScore || 0
  const riskLevel = assessment?.riskLevel || 'low'
  const lastAssessed = assessment ? 'Recently' : 'Not assessed'

  // Animate score when assessment changes
  useEffect(() => {
    if (assessment) {
      setIsAnimating(true)
      let current = 0
      const target = riskScore
      const increment = target / 50 // 50 steps
      
      const interval = setInterval(() => {
        current += increment
        if (current >= target) {
          current = target
          clearInterval(interval)
          setIsAnimating(false)
        }
        setDisplayScore(Math.round(current))
      }, 20)
      
      return () => clearInterval(interval)
    }
  }, [assessment, riskScore])

  const getRiskColor = () => {
    if (riskLevel === 'low') return "text-green-600"
    if (riskLevel === 'moderate') return "text-yellow-600"
    return "text-red-600"
  }

  const getRiskBgColor = () => {
    if (riskLevel === 'low') return "from-green-100 to-green-50"
    if (riskLevel === 'moderate') return "from-yellow-100 to-yellow-50"
    return "from-red-100 to-red-50"
  }

  const getRiskLevelText = () => {
    if (riskLevel === 'low') return "Low Risk"
    if (riskLevel === 'moderate') return "Moderate Risk"
    return "High Risk"
  }

  const getRiskDescription = () => {
    if (!assessment) {
      return "Run your first AI-powered risk assessment to get personalized insights about your pregnancy health."
    }
    return assessment.explanation || "Your personalized AI-powered risk analysis based on your current health metrics and medical history."
  }

  const handleExportPDF = () => {
    // Simulate PDF export
    console.log("Exporting PDF...")
  }

  return (
    <Card className="mb-8 border-2 border-primary/20 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <CardContent className="p-0">
        <div className={`bg-gradient-to-br ${getRiskBgColor()} p-8 md:p-12`}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Circular Risk Score */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-48 h-48">
                {/* Background circle */}
                <svg className="w-full h-full" viewBox="0 0 200 200">
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-muted-foreground/20"
                  />
                  {/* Animated progress circle */}
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeDasharray={`${(displayScore / 100) * 565.48} 565.48`}
                    strokeLinecap="round"
                    className={`${getRiskColor()} transition-all duration-300 transform -rotate-90 origin-center`}
                    style={{ transformOrigin: "100px 100px" }}
                  />
                </svg>
                {/* Center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-5xl font-bold ${getRiskColor()}`}>
                    {isAnimating ? displayScore : riskScore}
                  </span>
                  <span className="text-sm text-muted-foreground">Risk Score</span>
                </div>
              </div>
              <div className="text-center">
                <p className={`text-lg font-semibold ${getRiskColor()}`}>
                  {getRiskLevelText()}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {assessment ? `Last assessed: ${lastAssessed}` : 'Not assessed yet'}
                </p>
              </div>
            </div>

            {/* Right side content */}
            <div className="flex-1 space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Pregnancy Risk Assessment</h1>
                <p className="text-muted-foreground text-lg">
                  {getRiskDescription()}
                </p>
              </div>

              {assessment && (
                <div className="bg-white/50 dark:bg-black/20 rounded-lg p-4 border border-primary/20">
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">What this means:</span> {assessment.explanation}
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={handleExportPDF} variant="outline" className="gap-2 bg-transparent">
                  <Download className="h-4 w-4" />
                  Share with Doctor
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
