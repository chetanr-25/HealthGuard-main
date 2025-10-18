"use client"

import { useState } from "react"
import { Heart, Droplet, Weight, Thermometer, Activity, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LineChart, Line, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const vitalData = {
  "heart-rate": {
    current: 72,
    unit: "bpm",
    icon: Heart,
    color: "text-error",
    status: "Normal",
    range: "60-100 bpm",
    chart: [
      { time: "Mon", value: 68 },
      { time: "Tue", value: 72 },
      { time: "Wed", value: 70 },
      { time: "Thu", value: 75 },
      { time: "Fri", value: 72 },
      { time: "Sat", value: 70 },
      { time: "Sun", value: 72 },
    ],
  },
  "blood-pressure": {
    current: "120/80",
    unit: "mmHg",
    icon: Droplet,
    color: "text-secondary",
    status: "Normal",
    range: "< 120/80 mmHg",
    chart: [
      { time: "Mon", value: 118 },
      { time: "Tue", value: 120 },
      { time: "Wed", value: 119 },
      { time: "Thu", value: 121 },
      { time: "Fri", value: 120 },
      { time: "Sat", value: 119 },
      { time: "Sun", value: 120 },
    ],
  },
  weight: {
    current: 68.5,
    unit: "kg",
    icon: Weight,
    color: "text-accent",
    status: "On Track",
    range: "Expected: 65-70 kg",
    chart: [
      { time: "Mon", value: 67.8 },
      { time: "Tue", value: 68.0 },
      { time: "Wed", value: 68.1 },
      { time: "Thu", value: 68.3 },
      { time: "Fri", value: 68.4 },
      { time: "Sat", value: 68.5 },
      { time: "Sun", value: 68.5 },
    ],
  },
  "blood-glucose": {
    current: 95,
    unit: "mg/dL",
    icon: Zap,
    color: "text-warning",
    status: "Normal",
    range: "70-100 mg/dL (fasting)",
    chart: [
      { time: "Mon", value: 92 },
      { time: "Tue", value: 94 },
      { time: "Wed", value: 93 },
      { time: "Thu", value: 96 },
      { time: "Fri", value: 95 },
      { time: "Sat", value: 94 },
      { time: "Sun", value: 95 },
    ],
  },
  temperature: {
    current: 36.8,
    unit: "°C",
    icon: Thermometer,
    color: "text-primary",
    status: "Normal",
    range: "36.5-37.5 °C",
    chart: [
      { time: "Mon", value: 36.7 },
      { time: "Tue", value: 36.8 },
      { time: "Wed", value: 36.7 },
      { time: "Thu", value: 36.9 },
      { time: "Fri", value: 36.8 },
      { time: "Sat", value: 36.7 },
      { time: "Sun", value: 36.8 },
    ],
  },
  "baby-kicks": {
    current: 12,
    unit: "kicks today",
    icon: Activity,
    color: "text-primary",
    status: "Healthy",
    range: "10+ kicks per day",
    chart: [
      { time: "Mon", value: 11 },
      { time: "Tue", value: 13 },
      { time: "Wed", value: 12 },
      { time: "Thu", value: 14 },
      { time: "Fri", value: 12 },
      { time: "Sat", value: 11 },
      { time: "Sun", value: 12 },
    ],
  },
}

export function VitalsTab() {
  const [selectedVital, setSelectedVital] = useState<string | null>(null)

  const VitalCard = ({ vitalKey, data }: any) => {
    const Icon = data.icon
    return (
      <Card
        className="hover:shadow-lg transition-all cursor-pointer hover:border-primary/50 hover:scale-105 duration-200"
        onClick={() => setSelectedVital(vitalKey)}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">{vitalKey.replace("-", " ").toUpperCase()}</CardTitle>
            <Icon className={`h-5 w-5 ${data.color}`} />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="text-3xl font-bold text-foreground">{data.current}</div>
            <p className="text-xs text-muted-foreground">{data.unit}</p>
          </div>

          {/* Mini Chart */}
          <div className="h-16">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.chart}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" dot={false} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Status and Actions */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-success">{data.status}</span>
              <span className="text-xs text-muted-foreground">{data.range}</span>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                Log New
              </Button>
              <Button size="sm" variant="ghost" className="flex-1">
                History
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Vitals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(vitalData).map(([key, data]) => (
          <VitalCard key={key} vitalKey={key} data={data} />
        ))}
      </div>

      {/* Selected Vital Details */}
      {selectedVital && (
        <Card className="animate-in fade-in slide-in-from-bottom-4 duration-300">
          <CardHeader>
            <CardTitle>{selectedVital.replace("-", " ").toUpperCase()} - Detailed View</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={vitalData[selectedVital as keyof typeof vitalData].chart}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    dot={{ fill: "hsl(var(--primary))", r: 4 }}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
