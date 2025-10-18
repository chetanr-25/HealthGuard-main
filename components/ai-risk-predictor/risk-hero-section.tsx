"use client"

import { useState, useEffect } from "react"
import { RefreshCw, Download } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function RiskHeroSection() {
  const [isRunning, setIsRunning] = useState(false)
  const [displayScore, setDisplayScore] = useState(0)
  const riskScore = 18
  const riskLevel = "low"

  // Animate score on mount
  useEffect(() => {
    let current = 0
    const interval = setInterval(() => {
      if (current < riskScore) {
        current += 1
        setDisplayScore(current)
      } else {
        clearInterval(interval)
      }
    }, 20)
    return () => clearInterval(interval)
  }, [])

  const getRiskColor = () => {
    if (riskScore <= 25) return "text-success"
    if (riskScore <= 50) return "text-warning"
    return "text-error"
  }

  const getRiskBgColor = () => {
    if (riskScore <= 25) return "from-success/20 to-success/5"
    if (riskScore <= 50) return "from-warning/20 to-warning/5"
    return "from-error/20 to-error/5"
  }

  const handleRunAssessment = async () => {
    setIsRunning(true)
    // Simulate assessment
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsRunning(false)
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
                  <span className={`text-5xl font-bold ${getRiskColor()}`}>{displayScore}</span>
                  <span className="text-sm text-muted-foreground">Risk Score</span>
                </div>
              </div>
              <div className="text-center">
                <p className={`text-lg font-semibold ${getRiskColor()}`}>
                  {riskScore <= 25 ? "Low Risk" : riskScore <= 50 ? "Moderate Risk" : "High Risk"}
                </p>
                <p className="text-sm text-muted-foreground mt-1">Last assessed: Today at 2:30 PM</p>
              </div>
            </div>

            {/* Right side content */}
            <div className="flex-1 space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Pregnancy Risk Assessment</h1>
                <p className="text-muted-foreground text-lg">
                  Your personalized AI-powered risk analysis based on your current health metrics and medical history.
                </p>
              </div>

              <div className="bg-white/50 dark:bg-black/20 rounded-lg p-4 border border-primary/20">
                <p className="text-sm text-foreground">
                  <span className="font-semibold">What this means:</span> Your current health indicators suggest a low
                  risk profile. Continue with regular prenatal care and monitoring.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleRunAssessment}
                  disabled={isRunning}
                  className="gap-2 bg-primary hover:bg-primary/90 text-white"
                >
                  <RefreshCw className={`h-4 w-4 ${isRunning ? "animate-spin" : ""}`} />
                  {isRunning ? "Running Assessment..." : "Run New Assessment"}
                </Button>
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
