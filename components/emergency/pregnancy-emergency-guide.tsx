"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const emergencyGuides = [
  {
    title: "Bleeding During Pregnancy",
    content: {
      normal: "Light spotting or bleeding in first trimester is common",
      concerning: "Heavy bleeding, clots, or bleeding with pain",
      steps: [
        "Note the amount and color of bleeding",
        "Avoid intercourse and strenuous activity",
        "Do not insert anything into the vagina",
        "Call your doctor immediately",
        "Go to hospital if bleeding is heavy",
      ],
      info: "Tell doctor: when it started, amount, any pain or cramping",
    },
  },
  {
    title: "Signs of Preterm Labor",
    content: {
      normal: "Braxton Hicks contractions (irregular, painless)",
      concerning: "Regular contractions, vaginal discharge, pelvic pressure",
      steps: [
        "Time your contractions (note frequency and duration)",
        "Drink water and rest",
        "Call doctor if contractions continue",
        "Go to hospital if contractions are 5 minutes apart",
        "Bring hospital bag if going to hospital",
      ],
      info: "Tell doctor: when contractions started, frequency, any bleeding or discharge",
    },
  },
  {
    title: "Severe Headaches & Vision Changes",
    content: {
      normal: "Occasional mild headaches",
      concerning: "Severe headache with vision changes, swelling, high BP",
      steps: [
        "Check blood pressure if possible",
        "Rest in a dark, quiet room",
        "Do not take unprescribed medication",
        "Call doctor immediately",
        "Go to hospital if symptoms worsen",
      ],
      info: "Tell doctor: headache severity, vision changes, swelling, blood pressure reading",
    },
  },
  {
    title: "Baby Movement Changes",
    content: {
      normal: "Baby movements vary throughout the day",
      concerning: "No movement for 12+ hours after week 28",
      steps: [
        "Eat a snack and drink cold juice",
        "Lie on your left side",
        "Count baby kicks for 2 hours",
        "If no movement, call doctor immediately",
        "Go to hospital for monitoring if needed",
      ],
      info: "Tell doctor: last time you felt movement, any recent trauma or falls",
    },
  },
  {
    title: "Water Breaking",
    content: {
      normal: "Fluid leakage is different from water breaking",
      concerning: "Sudden gush of clear fluid or continuous leaking",
      steps: [
        "Note the time water broke",
        "Do not insert anything into vagina",
        "Do not take a bath",
        "Go to hospital immediately",
        "Bring hospital bag and medical records",
      ],
      info: "Tell hospital: time water broke, color, amount, any contractions",
    },
  },
  {
    title: "Severe Pelvic Pain",
    content: {
      normal: "Mild discomfort or pressure",
      concerning: "Sharp, severe pain that doesn't improve with rest",
      steps: [
        "Change position to find comfort",
        "Apply warm compress if safe",
        "Rest and avoid strenuous activity",
        "Call doctor if pain persists",
        "Go to hospital if pain is severe",
      ],
      info: "Tell doctor: pain location, severity, when it started, any other symptoms",
    },
  },
]

export function PregnancyEmergencyGuide() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null)

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-foreground mb-4">Pregnancy Emergency Guide</h2>

      <div className="space-y-3">
        {emergencyGuides.map((guide, idx) => (
          <Card key={idx} className="border-2 hover:shadow-lg transition-shadow">
            <button onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)} className="w-full text-left">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{guide.title}</CardTitle>
                  <ChevronDown className={`h-5 w-5 transition-transform ${expandedIdx === idx ? "rotate-180" : ""}`} />
                </div>
              </CardHeader>
            </button>

            {expandedIdx === idx && (
              <CardContent className="space-y-4 border-t-2 border-border pt-4">
                {/* Normal vs Concerning */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-xs font-bold text-green-900 mb-1">NORMAL</p>
                    <p className="text-sm text-green-800">{guide.content.normal}</p>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-xs font-bold text-red-900 mb-1">CONCERNING</p>
                    <p className="text-sm text-red-800">{guide.content.concerning}</p>
                  </div>
                </div>

                {/* Steps */}
                <div>
                  <h4 className="font-bold text-foreground mb-2">What to Do:</h4>
                  <ol className="space-y-2">
                    {guide.content.steps.map((step, stepIdx) => (
                      <li key={stepIdx} className="flex gap-3 text-sm">
                        <span className="font-bold text-primary flex-shrink-0">{stepIdx + 1}.</span>
                        <span className="text-foreground">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Info to Share */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-xs font-bold text-blue-900 mb-1">TELL YOUR DOCTOR</p>
                  <p className="text-sm text-blue-800">{guide.content.info}</p>
                </div>

                <Button
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold h-12"
                  onClick={() => (window.location.href = "tel:102")}
                >
                  Call Emergency Services
                </Button>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
