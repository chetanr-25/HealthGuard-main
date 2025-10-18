"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const adherenceData = [
  { day: "Mon", adherence: 100 },
  { day: "Tue", adherence: 100 },
  { day: "Wed", adherence: 75 },
  { day: "Thu", adherence: 100 },
  { day: "Fri", adherence: 50 },
  { day: "Sat", adherence: 100 },
  { day: "Sun", adherence: 100 },
]

const historyLog = [
  {
    id: "1",
    date: "Today",
    time: "9:05 AM",
    medication: "Prenatal Multivitamin",
    dose: "1 tablet",
    status: "taken",
    delay: 5,
  },
  {
    id: "2",
    date: "Today",
    time: "9:05 AM",
    medication: "Folic Acid 400mcg",
    dose: "1 tablet",
    status: "taken",
    delay: 5,
  },
  {
    id: "3",
    date: "Today",
    time: "Missed",
    medication: "Iron Supplement 65mg",
    dose: "1 tablet",
    status: "missed",
    delay: 0,
  },
  {
    id: "4",
    date: "Yesterday",
    time: "9:00 AM",
    medication: "Prenatal Multivitamin",
    dose: "1 tablet",
    status: "taken",
    delay: 0,
  },
  {
    id: "5",
    date: "Yesterday",
    time: "1:15 PM",
    medication: "Iron Supplement 65mg",
    dose: "1 tablet",
    status: "taken",
    delay: 15,
  },
  {
    id: "6",
    date: "2 days ago",
    time: "8:45 PM",
    medication: "Calcium 500mg",
    dose: "1 tablet",
    status: "taken",
    delay: -15,
  },
]

export function HistoryTab() {
  const [dateRange, setDateRange] = useState("7days")
  const [filterMed, setFilterMed] = useState("all")

  const adherenceRate = 85
  const mostConsistent = "Prenatal Multivitamin"
  const frequentlyMissed = "Iron Supplement"

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="text-sm font-medium text-muted-foreground mb-2 block">Date Range</label>
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <label className="text-sm font-medium text-muted-foreground mb-2 block">Filter by Medication</label>
          <Select value={filterMed} onValueChange={setFilterMed}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Medications</SelectItem>
              <SelectItem value="prenatal">Prenatal Multivitamin</SelectItem>
              <SelectItem value="iron">Iron Supplement</SelectItem>
              <SelectItem value="calcium">Calcium</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Adherence Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16">
                <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-muted"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeDasharray={`${adherenceRate * 2.83} 283`}
                    className="text-success"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-success">{adherenceRate}%</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Great job staying consistent!</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Most Consistent</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-semibold text-foreground">{mostConsistent}</p>
            <p className="text-sm text-success">100% adherence</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Frequently Missed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-semibold text-foreground">{frequentlyMissed}</p>
            <p className="text-sm text-warning">75% adherence</p>
          </CardContent>
        </Card>
      </div>

      {/* Adherence Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Adherence</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={adherenceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="day" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                }}
              />
              <Line
                type="monotone"
                dataKey="adherence"
                stroke="var(--primary)"
                strokeWidth={2}
                dot={{ fill: "var(--primary)", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* History Log */}
      <Card>
        <CardHeader>
          <CardTitle>Medication History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {historyLog.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <p className="font-medium text-foreground">{entry.medication}</p>
                  <p className="text-sm text-muted-foreground">
                    {entry.date} • {entry.time}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    className={entry.status === "taken" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}
                  >
                    {entry.status === "taken" ? "Taken" : "Missed"}
                  </Badge>
                  {entry.delay !== 0 && (
                    <span className="text-sm text-muted-foreground">
                      {entry.delay > 0 ? "+" : ""}
                      {entry.delay} min
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
