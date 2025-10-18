"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Droplet, Zap, Wind, Eye, Heart, Waves, Brain } from "lucide-react"

const emergencyStatuses = [
  { id: "bleeding", label: "Severe Bleeding", icon: Droplet, color: "text-red-600" },
  { id: "pain", label: "Severe Pain", icon: Zap, color: "text-orange-600" },
  { id: "breathing", label: "Difficulty Breathing", icon: Wind, color: "text-blue-600" },
  { id: "fainting", label: "Fainting/Dizziness", icon: Eye, color: "text-purple-600" },
  { id: "movement", label: "No Baby Movement", icon: Heart, color: "text-pink-600" },
  { id: "water", label: "Water Broke", icon: Waves, color: "text-cyan-600" },
  { id: "seizure", label: "Seizure", icon: Brain, color: "text-indigo-600" },
  { id: "other", label: "Other Emergency", icon: AlertCircle, color: "text-gray-600" },
]

export function EmergencyStatusSelector() {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)

  const getActionSteps = (statusId: string) => {
    const steps: Record<string, { actions: string[]; warnings: string[]; info: string[] }> = {
      bleeding: {
        actions: [
          "Call emergency services immediately (102/108)",
          "Lie down and elevate your legs",
          "Do not panic - stay calm",
          "Note the amount and color of bleeding",
        ],
        warnings: [
          "Do not insert anything into the vagina",
          "Do not take a bath - use shower only",
          "Avoid strenuous activity",
        ],
        info: [
          "Tell paramedics: amount of bleeding, duration, any pain",
          "Bring your medical records if possible",
          "Have your doctor's contact ready",
        ],
      },
      pain: {
        actions: [
          "Call your doctor or emergency services",
          "Change position to find comfort",
          "Apply warm compress if safe",
          "Note the location and intensity of pain",
        ],
        warnings: [
          "Do not take unprescribed pain medication",
          "Do not ignore severe pain",
          "Do not delay seeking help",
        ],
        info: [
          "Describe pain: sharp, dull, cramping, constant, or intermittent",
          "Note any other symptoms (bleeding, fever, nausea)",
          "Mention when pain started",
        ],
      },
      breathing: {
        actions: [
          "Call emergency services immediately",
          "Sit upright to help breathing",
          "Try slow, deep breaths",
          "Loosen tight clothing",
        ],
        warnings: ["Do not lie flat", "Do not panic - this can worsen breathing", "Do not delay emergency call"],
        info: [
          "Tell paramedics: when it started, any chest pain, dizziness",
          "Mention any recent illness or allergies",
          "Have your pregnancy records ready",
        ],
      },
      fainting: {
        actions: [
          "Call emergency services",
          "Lie down immediately",
          "Elevate legs above heart level",
          "Do not move until help arrives",
        ],
        warnings: ["Do not stand up suddenly", "Do not drive yourself", "Do not ignore repeated episodes"],
        info: [
          "Tell paramedics: how long you were unconscious",
          "Mention any head injury or fall",
          "Note any recent stress or lack of food",
        ],
      },
      movement: {
        actions: [
          "Eat a snack and drink cold juice",
          "Lie on your left side",
          "Count baby kicks for 2 hours",
          "If no movement, call doctor immediately",
        ],
        warnings: [
          "Do not wait - reduced movement is serious",
          "Do not assume baby is sleeping",
          "Do not delay if concerned",
        ],
        info: [
          "Tell doctor: last time you felt movement",
          "Mention any recent trauma or fall",
          "Note any other symptoms",
        ],
      },
      water: {
        actions: [
          "Call hospital immediately",
          "Note the time water broke",
          "Do not insert anything into vagina",
          "Go to hospital right away",
        ],
        warnings: ["Do not take a bath", "Do not have intercourse", "Do not delay going to hospital"],
        info: [
          "Tell hospital: time water broke, color, amount",
          "Mention any contractions or pain",
          "Bring hospital bag and documents",
        ],
      },
      seizure: {
        actions: [
          "Call emergency services immediately",
          "Move away from dangerous objects",
          "Do not restrain movements",
          "Place on side after seizure stops",
        ],
        warnings: ["Do not put anything in mouth", "Do not leave alone", "Do not ignore - seek immediate help"],
        info: [
          "Tell paramedics: duration of seizure",
          "Mention any previous seizures",
          "Note any head injury or trauma",
        ],
      },
      other: {
        actions: [
          "Call emergency services or your doctor",
          "Describe your symptoms clearly",
          "Stay calm and provide details",
          "Follow medical professional's guidance",
        ],
        warnings: ["Do not delay if symptoms are severe", "Do not self-diagnose", "Do not ignore your instincts"],
        info: ["Be ready to describe all symptoms", "Have your medical history ready", "Know your current medications"],
      },
    }
    return steps[statusId] || steps.other
  }

  const selectedData = selectedStatus ? getActionSteps(selectedStatus) : null

  return (
    <Card className="border-2 border-red-200 bg-red-50">
      <CardHeader>
        <CardTitle className="text-red-900">What's Happening?</CardTitle>
        <p className="text-sm text-red-800 mt-2">Select your emergency to get immediate guidance</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Status Buttons Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {emergencyStatuses.map((status) => {
            const Icon = status.icon
            return (
              <button
                key={status.id}
                onClick={() => setSelectedStatus(selectedStatus === status.id ? null : status.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedStatus === status.id
                    ? "border-red-600 bg-red-100 shadow-lg"
                    : "border-red-200 bg-white hover:border-red-400"
                }`}
              >
                <Icon className={`h-6 w-6 mx-auto mb-2 ${status.color}`} />
                <p className="text-xs font-semibold text-center text-foreground">{status.label}</p>
              </button>
            )
          })}
        </div>

        {/* Action Steps */}
        {selectedData && (
          <div className="space-y-4 mt-6 pt-6 border-t-2 border-red-200 animate-slide-up">
            {/* Immediate Actions */}
            <div>
              <h4 className="font-bold text-red-900 mb-2 flex items-center gap-2">
                <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                  1
                </span>
                Immediate Actions
              </h4>
              <ol className="space-y-2 ml-8">
                {selectedData.actions.map((action, idx) => (
                  <li key={idx} className="text-sm text-foreground flex gap-2">
                    <span className="font-bold text-red-600">{idx + 1}.</span>
                    <span>{action}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Warnings */}
            <div>
              <h4 className="font-bold text-orange-900 mb-2 flex items-center gap-2">
                <span className="bg-orange-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                  ⚠
                </span>
                What NOT to Do
              </h4>
              <ul className="space-y-2 ml-8">
                {selectedData.warnings.map((warning, idx) => (
                  <li key={idx} className="text-sm text-foreground flex gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span>{warning}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Info to Share */}
            <div>
              <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                  ℹ
                </span>
                Tell Emergency Services
              </h4>
              <ul className="space-y-2 ml-8">
                {selectedData.info.map((info, idx) => (
                  <li key={idx} className="text-sm text-foreground flex gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>{info}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
