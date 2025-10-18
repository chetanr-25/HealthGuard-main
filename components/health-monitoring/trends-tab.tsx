"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Download } from "lucide-react"

const weightData = [
  { week: "Week 16", value: 65.2 },
  { week: "Week 18", value: 65.8 },
  { week: "Week 20", value: 66.5 },
  { week: "Week 22", value: 67.2 },
  { week: "Week 24", value: 68.5 },
]

const bpData = [
  { week: "Week 16", systolic: 118, diastolic: 78 },
  { week: "Week 18", systolic: 119, diastolic: 79 },
  { week: "Week 20", systolic: 120, diastolic: 80 },
  { week: "Week 22", systolic: 121, diastolic: 81 },
  { week: "Week 24", systolic: 120, diastolic: 80 },
]

const hrData = [
  { week: "Week 16", value: 68 },
  { week: "Week 18", value: 70 },
  { week: "Week 20", value: 72 },
  { week: "Week 22", value: 74 },
  { week: "Week 24", value: 72 },
]

export function TrendsTab() {
  const [dateRange, setDateRange] = useState("30")
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(["weight"])

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex gap-2">
          <Button variant={dateRange === "7" ? "default" : "outline"} onClick={() => setDateRange("7")} size="sm">
            7 Days
          </Button>
          <Button variant={dateRange === "30" ? "default" : "outline"} onClick={() => setDateRange("30")} size="sm">
            30 Days
          </Button>
          <Button variant={dateRange === "all" ? "default" : "outline"} onClick={() => setDateRange("all")} size="sm">
            All Time
          </Button>
        </div>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Download className="h-4 w-4" />
          Export Chart
        </Button>
      </div>

      {/* Weight Progression */}
      <Card className="animate-in fade-in slide-in-from-bottom-4 duration-300">
        <CardHeader>
          <CardTitle>Weight Progression</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weightData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--accent))"
                  dot={{ fill: "hsl(var(--accent))", r: 5 }}
                  strokeWidth={2}
                  name="Weight (kg)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Blood Pressure Trends */}
      <Card className="animate-in fade-in slide-in-from-bottom-4 duration-300 delay-75">
        <CardHeader>
          <CardTitle>Blood Pressure Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={bpData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="systolic"
                  stroke="hsl(var(--secondary))"
                  dot={{ fill: "hsl(var(--secondary))", r: 4 }}
                  strokeWidth={2}
                  name="Systolic"
                />
                <Line
                  type="monotone"
                  dataKey="diastolic"
                  stroke="hsl(var(--primary))"
                  dot={{ fill: "hsl(var(--primary))", r: 4 }}
                  strokeWidth={2}
                  name="Diastolic"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Heart Rate Variability */}
      <Card className="animate-in fade-in slide-in-from-bottom-4 duration-300 delay-150">
        <CardHeader>
          <CardTitle>Heart Rate Variability</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hrData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="hsl(var(--primary))" name="Heart Rate (bpm)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Comparative View */}
      <Card className="animate-in fade-in slide-in-from-bottom-4 duration-300 delay-200">
        <CardHeader>
          <CardTitle>Comparative View</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Select Metric 1</label>
              <Select defaultValue="weight">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weight">Weight</SelectItem>
                  <SelectItem value="blood-pressure">Blood Pressure</SelectItem>
                  <SelectItem value="heart-rate">Heart Rate</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Select Metric 2</label>
              <Select defaultValue="heart-rate">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weight">Weight</SelectItem>
                  <SelectItem value="blood-pressure">Blood Pressure</SelectItem>
                  <SelectItem value="heart-rate">Heart Rate</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weightData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  dot={false}
                  strokeWidth={2}
                  name="Metric 1"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
