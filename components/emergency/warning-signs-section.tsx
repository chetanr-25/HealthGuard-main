"use client"

import { AlertTriangle, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const warningCategories = [
  {
    title: "IMMEDIATE - Call Now",
    color: "border-red-500 bg-red-50",
    icon: AlertTriangle,
    iconColor: "text-red-600",
    buttonColor: "bg-red-600 hover:bg-red-700",
    signs: [
      "Heavy vaginal bleeding (soaking pad in < 1 hour)",
      "Severe abdominal pain",
      "Severe headache with vision changes",
      "Sudden swelling of face/hands",
      "No fetal movement for 12+ hours (after week 28)",
      "Water breaking before 37 weeks",
      "Signs of seizure",
      "Thoughts of self-harm",
    ],
  },
  {
    title: "URGENT - Call Doctor Soon",
    color: "border-amber-500 bg-amber-50",
    icon: AlertCircle,
    iconColor: "text-amber-600",
    buttonColor: "bg-amber-600 hover:bg-amber-700",
    signs: [
      "Moderate bleeding",
      "Persistent vomiting",
      "High fever (>100.4°F)",
      "Painful urination",
      "Decreased fetal movement",
      "Severe pelvic pain",
      "Signs of preterm labor",
    ],
  },
]

export function WarningSignsSection() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-foreground mb-4">When to Seek Emergency Care</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {warningCategories.map((category, idx) => {
          const Icon = category.icon
          return (
            <Card key={idx} className={`border-2 ${category.color}`}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Icon className={`h-6 w-6 ${category.iconColor}`} />
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {category.signs.map((sign, signIdx) => (
                    <li key={signIdx} className="flex gap-3 text-sm">
                      <span className={`${category.iconColor} font-bold flex-shrink-0`}>•</span>
                      <span className="text-foreground">{sign}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${category.buttonColor} text-white font-semibold h-12`}
                  onClick={() => (window.location.href = "tel:102")}
                >
                  {category.title.includes("IMMEDIATE") ? "Call Emergency Now" : "Call Doctor"}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
