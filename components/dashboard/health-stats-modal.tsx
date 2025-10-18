"use client"

import { useState } from "react"
import { X, Download, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LineChart, Line, CartesianGrid, Tooltip, ResponsiveContainer, XAxis, YAxis } from "recharts"

interface HealthStatsModalProps {
  isOpen: boolean
  onClose: () => void
  statType: "heart-rate" | "blood-pressure" | "weight" | "baby-activity" | null
}

// Generate 30-day mock data
const generateHistoryData = (statType: string) => {
  const data = []
  for (let i = 30; i > 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const day = date.toLocaleDateString("en-US", { month: "short", day: "numeric" })

    if (statType === "heart-rate") {
      data.push({ date: day, value: Math.floor(Math.random() * 20) + 65 })
    } else if (statType === "blood-pressure") {
      data.push({
        date: day,
        systolic: Math.floor(Math.random() * 20) + 115,
        diastolic: Math.floor(Math.random() * 15) + 75,
      })
    } else if (statType === "weight") {
      data.push({ date: day, value: 68 + Math.random() * 1.5 })
    } else if (statType === "baby-activity") {
      data.push({ date: day, value: Math.floor(Math.random() * 8) + 8 })
    }
  }
  return data
}

const getStatConfig = (type: string | null) => {
  switch (type) {
    case "heart-rate":
      return { title: "Heart Rate", unit: "bpm", current: "72", normal: "60-100" }
    case "blood-pressure":
      return { title: "Blood Pressure", unit: "mmHg", current: "120/80", normal: "<140/90" }
    case "weight":
      return { title: "Weight", unit: "kg", current: "68.5", normal: "Healthy range" }
    case "baby-activity":
      return { title: "Baby Activity", unit: "kicks", current: "12", normal: "10+ per day" }
    default:
      return { title: "", unit: "", current: "", normal: "" }
  }
}

export function HealthStatsModal({ isOpen, onClose, statType }: HealthStatsModalProps) {
  const [logValue, setLogValue] = useState("")
  const [isLogging, setIsLogging] = useState(false)
  const [logSuccess, setLogSuccess] = useState(false)

  const config = getStatConfig(statType)
  const historyData = generateHistoryData(statType || "")

  const handleLogData = async () => {
    if (!logValue) return

    setIsLogging(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800))
    setIsLogging(false)
    setLogSuccess(true)
    setLogValue("")

    setTimeout(() => setLogSuccess(false), 2000)
  }

  const handleExport = () => {
    const csv = historyData.map((d) => `${d.date},${d.value || `${d.systolic}/${d.diastolic}`}`).join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${config.title}-history.csv`
    a.click()
  }

  if (!isOpen || !statType) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
          <CardTitle>{config.title} - 30 Day History</CardTitle>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </CardHeader>

        <CardContent className="space-y-6 pt-6">
          {/* Current Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
              <p className="text-sm text-muted-foreground mb-1">Current Value</p>
              <p className="text-2xl font-bold text-foreground">
                {config.current} <span className="text-sm text-muted-foreground">{config.unit}</span>
              </p>
            </div>
            <div className="p-4 bg-success/5 rounded-lg border border-success/20">
              <p className="text-sm text-muted-foreground mb-1">Normal Range</p>
              <p className="text-lg font-semibold text-success">{config.normal}</p>
            </div>
          </div>

          {/* 30-Day Chart */}
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              30-Day Trend
            </h3>
            <div className="h-64 bg-muted/30 rounded-lg p-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#4FD1C5" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Log New Data Form */}
          <div className="space-y-4 p-4 bg-accent/5 rounded-lg border border-accent/20">
            <h3 className="font-semibold">Log New Data</h3>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder={`Enter ${config.title.toLowerCase()}`}
                value={logValue}
                onChange={(e) => setLogValue(e.target.value)}
                className="flex-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button
                onClick={handleLogData}
                disabled={!logValue || isLogging}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                {isLogging ? "Logging..." : logSuccess ? "Logged!" : "Log"}
              </Button>
            </div>
          </div>

          {/* Export Button */}
          <Button onClick={handleExport} variant="outline" className="w-full gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Export Data as CSV
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
