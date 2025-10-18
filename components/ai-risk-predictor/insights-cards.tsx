"use client"

import { TrendingUp, AlertCircle, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RiskAssessment } from "@/lib/aiAgent"

interface InsightsCardsProps {
  assessment?: RiskAssessment | null
}

export function InsightsCards({ assessment }: InsightsCardsProps) {
  // Default insights when no assessment is available
  const defaultInsights = [
    {
      title: "Positive Trends",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-100",
      items: [
        "Blood pressure has been consistently stable",
        "Weight gain is within healthy range",
        "Baby activity patterns are normal and consistent",
      ],
    },
    {
      title: "Areas to Focus",
      icon: AlertCircle,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
      items: [
        "Increase daily water intake to 10 glasses",
        "Maintain regular exercise routine (150 min/week)",
        "Monitor sodium intake in diet",
      ],
    },
    {
      title: "Next Steps",
      icon: CheckCircle,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      items: [
        "Schedule routine prenatal checkup (due in 1 week)",
        "Complete glucose screening test",
        "Book ultrasound appointment for week 24",
      ],
    },
  ]

  // Generate insights based on AI assessment
  const generateInsights = (assessment: RiskAssessment) => {
    const insights = []
    
    // Positive trends based on risk level
    if (assessment.riskLevel === 'low') {
      insights.push({
        title: "Positive Trends",
        icon: TrendingUp,
        color: "text-green-600",
        bgColor: "bg-green-100",
        items: [
          "Your health indicators show low risk factors",
          "Current pregnancy progression appears healthy",
          "AI analysis indicates positive health patterns",
        ],
      })
    }

    // Areas to focus based on contributing factors
    insights.push({
      title: "Areas to Focus",
      icon: AlertCircle,
      color: assessment.riskLevel === 'high' ? "text-red-600" : "text-yellow-600",
      bgColor: assessment.riskLevel === 'high' ? "bg-red-100" : "bg-yellow-100",
      items: assessment.contributingFactors.slice(0, 3).map(factor => 
        `Address: ${factor}`
      ),
    })

    // Next steps based on recommendations
    insights.push({
      title: "AI Recommendations",
      icon: CheckCircle,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      items: assessment.recommendations.slice(0, 3),
    })

    return insights
  }

  const insights = assessment ? generateInsights(assessment) : defaultInsights

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
      {insights.map((insight, idx) => {
        const Icon = insight.icon
        return (
          <Card key={idx} className="border-primary/20 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className={`${insight.bgColor} p-2 rounded-lg`}>
                  <Icon className={`h-5 w-5 ${insight.color}`} />
                </div>
                <CardTitle className="text-lg">{insight.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {insight.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex gap-2 text-sm text-foreground">
                    <span className={`${insight.color} font-bold flex-shrink-0`}>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
