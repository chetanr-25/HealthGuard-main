"use client"

import { TrendingUp, AlertCircle, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function InsightsCards() {
  const insights = [
    {
      title: "Positive Trends",
      icon: TrendingUp,
      color: "text-success",
      bgColor: "bg-success/10",
      items: [
        "Blood pressure has been consistently stable",
        "Weight gain is within healthy range",
        "Baby activity patterns are normal and consistent",
      ],
    },
    {
      title: "Areas to Focus",
      icon: AlertCircle,
      color: "text-warning",
      bgColor: "bg-warning/10",
      items: [
        "Increase daily water intake to 10 glasses",
        "Maintain regular exercise routine (150 min/week)",
        "Monitor sodium intake in diet",
      ],
    },
    {
      title: "Next Steps",
      icon: CheckCircle,
      color: "text-primary",
      bgColor: "bg-primary/10",
      items: [
        "Schedule routine prenatal checkup (due in 1 week)",
        "Complete glucose screening test",
        "Book ultrasound appointment for week 24",
      ],
    },
  ]

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
