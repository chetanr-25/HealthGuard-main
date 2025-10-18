"use client"

import { useState } from "react"
import { AlertCircle, CheckCircle, Zap, ChevronDown, Phone } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function AIHealthInsights() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isContactingDoctor, setIsContactingDoctor] = useState(false)
  const [doctorContacted, setDoctorContacted] = useState(false)

  const riskLevel = "low"

  const getRiskConfig = () => {
    switch (riskLevel) {
      case "low":
        return {
          icon: CheckCircle,
          color: "text-success",
          bgColor: "bg-success/10",
          label: "Low Risk",
          message: "Your health metrics are within normal ranges. Continue with regular monitoring and prenatal care.",
          recommendations: [
            "Continue daily prenatal vitamins with folic acid",
            "Maintain regular exercise: 150 minutes of moderate activity per week",
            "Stay hydrated: drink at least 8-10 glasses of water daily",
          ],
        }
      case "moderate":
        return {
          icon: AlertCircle,
          color: "text-warning",
          bgColor: "bg-warning/10",
          label: "Moderate Risk",
          message: "Some metrics require attention. Schedule a consultation with your healthcare provider.",
          recommendations: [
            "Schedule an appointment with your OB/GYN within 1 week",
            "Monitor blood pressure daily and keep a log",
            "Reduce sodium intake and increase potassium-rich foods",
          ],
        }
      case "high":
        return {
          icon: AlertCircle,
          color: "text-error",
          bgColor: "bg-error/10",
          label: "High Risk",
          message: "Immediate medical attention recommended. Contact your healthcare provider.",
          recommendations: [
            "Contact your healthcare provider immediately",
            "Go to the nearest hospital if experiencing severe symptoms",
            "Keep emergency contacts readily available",
          ],
        }
    }
  }

  const config = getRiskConfig()
  const Icon = config.icon

  const handleContactDoctor = async () => {
    setIsContactingDoctor(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsContactingDoctor(false)
    setDoctorContacted(true)
    setTimeout(() => setDoctorContacted(false), 3000)
  }

  return (
    <Card className="mb-8 border-2 border-primary/20 hover:shadow-lg transition-shadow animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`${config.bgColor} p-2 rounded-lg`}>
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <CardTitle>AI Health Insights</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Icon className={`h-5 w-5 ${config.color}`} />
            <span className={`text-sm font-semibold ${config.color}`}>{config.label}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-foreground leading-relaxed">{config.message}</p>

          <div className="border-t border-border pt-4">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors w-full"
            >
              <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
              Why this assessment?
            </button>

            {isExpanded && (
              <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                <p className="text-sm text-foreground">
                  This assessment is based on your recent health metrics including heart rate, blood pressure, weight
                  gain, and baby activity patterns. Our AI model analyzes these indicators against pregnancy health
                  guidelines.
                </p>
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground">Factors considered:</p>
                  <ul className="text-xs text-muted-foreground space-y-1 ml-4 list-disc">
                    <li>Vital signs within normal pregnancy ranges</li>
                    <li>Consistent baby movement patterns</li>
                    <li>Healthy weight gain trajectory</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-3 p-4 bg-accent/5 rounded-lg border border-accent/20">
            <p className="text-sm font-semibold text-foreground">Recommended Actions:</p>
            <ul className="space-y-2">
              {config.recommendations.map((rec, idx) => (
                <li key={idx} className="flex gap-2 text-sm text-foreground">
                  <span className="text-primary font-bold">{idx + 1}.</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border gap-2">
            <span className="text-xs text-muted-foreground">Last assessed: 2 hours ago</span>
            <Button
              onClick={handleContactDoctor}
              disabled={isContactingDoctor}
              className="gap-2 bg-primary hover:bg-primary/90 text-white"
            >
              <Phone className="h-4 w-4" />
              {isContactingDoctor ? "Contacting..." : doctorContacted ? "Request Sent!" : "Talk to Doctor"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
