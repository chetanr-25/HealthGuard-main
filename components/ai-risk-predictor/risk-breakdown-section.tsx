"use client"

import { useState } from "react"
import { Info, CheckCircle, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Checkbox } from "@/components/ui/checkbox"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"
import { RiskAssessment } from "@/lib/aiAgent"

interface RiskBreakdownSectionProps {
  assessment?: RiskAssessment | null
}

export function RiskBreakdownSection({ assessment }: RiskBreakdownSectionProps) {
  const [completedRecommendations, setCompletedRecommendations] = useState<number[]>([])

  const toggleRecommendation = (index: number) => {
    setCompletedRecommendations((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  // Default data when no assessment is available
  const defaultComplications = [
    { name: "Preeclampsia", risk: 8, tooltip: "High blood pressure during pregnancy" },
    { name: "Gestational Diabetes", risk: 12, tooltip: "High blood sugar during pregnancy" },
    { name: "Preterm Labor", risk: 5, tooltip: "Labor before 37 weeks of pregnancy" },
  ]

  const defaultFactors = [
    { name: "Age", impact: "low", description: "28 years old - optimal pregnancy age" },
    { name: "BMI", impact: "low", description: "22.5 - healthy weight range" },
    { name: "Blood Pressure Trends", impact: "low", description: "Stable and within normal range" },
    { name: "Medical History", impact: "medium", description: "Previous gestational diabetes" },
    { name: "Lifestyle Factors", impact: "low", description: "Regular exercise and balanced diet" },
  ]

  const defaultRecommendations = [
    {
      priority: "routine",
      action: "Schedule routine prenatal checkup",
      details: "Book your next appointment with your OB/GYN for standard monitoring.",
    },
    {
      priority: "important",
      action: "Increase water intake to 10 glasses daily",
      details: "Proper hydration supports healthy pregnancy and helps prevent complications.",
    },
    {
      priority: "routine",
      action: "Continue prenatal vitamins with folic acid",
      details: "Essential for fetal development and reducing birth defects.",
    },
  ]

  // Use AI assessment data if available, otherwise use defaults
  const complications = assessment ? 
    assessment.contributingFactors.slice(0, 3).map((factor, idx) => ({
      name: factor,
      risk: Math.min(20, (assessment.overallRiskScore / 5) + (idx * 3)), // Estimate based on overall score
      tooltip: `AI-identified risk factor: ${factor}`
    })) : defaultComplications

  const factors = assessment ?
    assessment.contributingFactors.map((factor, idx) => ({
      name: factor,
      impact: idx < 2 ? "low" : idx < 4 ? "medium" : "high",
      description: `AI-identified contributing factor: ${factor}`
    })) : defaultFactors

  const recommendations = assessment ?
    assessment.recommendations.map((rec, idx) => ({
      priority: idx === 0 ? "urgent" : idx < 3 ? "important" : "routine",
      action: rec,
      details: `AI-generated recommendation based on your health data: ${rec}`
    })) : defaultRecommendations

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "low":
        return "bg-success/10 text-success border-success/20"
      case "medium":
        return "bg-warning/10 text-warning border-warning/20"
      case "high":
        return "bg-error/10 text-error border-error/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-error/10 text-error border-error/20"
      case "important":
        return "bg-warning/10 text-warning border-warning/20"
      case "routine":
        return "bg-success/10 text-success border-success/20"
      default:
        return "bg-muted"
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
      {/* Column 1: Pregnancy Complications Risk */}
      <Card className="border-primary/20 hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-warning" />
            Complications Risk
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {complications.map((comp, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{comp.name}</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>{comp.tooltip}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <span className="text-sm font-semibold text-warning">{comp.risk}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-warning rounded-full h-2 transition-all" style={{ width: `${comp.risk}%` }} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Column 2: Contributing Factors */}
      <Card className="border-primary/20 hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-primary" />
            Contributing Factors
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {factors.map((factor, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">{factor.name}</span>
                <Badge variant="outline" className={`text-xs ${getImpactColor(factor.impact)}`}>
                  {factor.impact} impact
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{factor.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Column 3: Recommendations */}
      <Card className="border-primary/20 hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-success" />
            Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recommendations.map((rec, idx) => (
            <Collapsible key={idx} className="border border-border rounded-lg p-3">
              <div className="flex items-start gap-3">
                <Checkbox
                  checked={completedRecommendations.includes(idx)}
                  onCheckedChange={() => toggleRecommendation(idx)}
                  className="mt-1"
                />
                <div className="flex-1 min-w-0">
                  <CollapsibleTrigger className="flex items-center justify-between w-full text-left hover:opacity-70">
                    <div className="flex-1">
                      <p
                        className={`text-sm font-medium ${completedRecommendations.includes(idx) ? "line-through text-muted-foreground" : ""}`}
                      >
                        {rec.action}
                      </p>
                      <Badge variant="outline" className={`text-xs mt-1 ${getPriorityColor(rec.priority)}`}>
                        {rec.priority}
                      </Badge>
                    </div>
                    <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2 pt-2 border-t border-border">
                    <p className="text-xs text-muted-foreground">{rec.details}</p>
                  </CollapsibleContent>
                </div>
              </div>
            </Collapsible>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
