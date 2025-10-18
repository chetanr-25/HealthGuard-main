"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceDot } from "recharts"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"

export function HistoricalRiskChart() {
  const [dateRange, setDateRange] = useState("30d")

  const data = [
    { date: "Oct 1", risk: 22, event: "Initial Assessment" },
    { date: "Oct 8", risk: 20 },
    { date: "Oct 15", risk: 19, event: "Prenatal Checkup" },
    { date: "Oct 22", risk: 18 },
    { date: "Oct 29", risk: 18, event: "Lab Results" },
    { date: "Nov 5", risk: 17 },
    { date: "Nov 12", risk: 18 },
    { date: "Nov 19", risk: 18 },
  ]

  const eventData = data.filter((d) => d.event)

  return (
    <Card className="mb-8 border-primary/20 hover:shadow-lg transition-shadow animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Risk Score Trend</CardTitle>
          <div className="flex gap-2">
            {["7d", "30d", "all"].map((range) => (
              <Button
                key={range}
                variant={dateRange === range ? "default" : "outline"}
                size="sm"
                onClick={() => setDateRange(range)}
                className="text-xs"
              >
                {range === "7d" ? "7 Days" : range === "30d" ? "30 Days" : "All Time"}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            risk: {
              label: "Risk Score",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="date" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" domain={[0, 100]} />
              <ChartTooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload
                    return (
                      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
                        <p className="text-sm font-medium">{data.date}</p>
                        <p className="text-sm text-primary">Risk Score: {data.risk}</p>
                        {data.event && <p className="text-xs text-muted-foreground mt-1">{data.event}</p>}
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Line
                type="monotone"
                dataKey="risk"
                stroke="var(--color-primary)"
                strokeWidth={2}
                dot={false}
                isAnimationActive={true}
              />
              {/* Event markers */}
              {eventData.map((event, idx) => (
                <ReferenceDot
                  key={idx}
                  x={event.date}
                  y={event.risk}
                  r={5}
                  fill="var(--color-warning)"
                  stroke="var(--color-card)"
                  strokeWidth={2}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="mt-4 p-3 bg-accent/5 rounded-lg border border-accent/20">
          <p className="text-xs text-muted-foreground">
            <span className="font-semibold">Markers:</span> Yellow dots indicate significant events like appointments or
            lab results.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
