"use client"

import { useState } from "react"
import { TrendingDown, Activity, Droplet, Weight, Heart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { HealthStatsModal } from "./health-stats-modal"

const heartRateData = [
  { time: "Mon", value: 68 },
  { time: "Tue", value: 72 },
  { time: "Wed", value: 70 },
  { time: "Thu", value: 75 },
  { time: "Fri", value: 72 },
  { time: "Sat", value: 70 },
  { time: "Sun", value: 72 },
]

export function HealthStatsGrid() {
  const [selectedStat, setSelectedStat] = useState<"heart-rate" | "blood-pressure" | "weight" | "baby-activity" | null>(
    null,
  )

  const StatCard = ({ title, value, unit, icon: Icon, status, chart, onClick }: any) => (
    <Card
      onClick={onClick}
      className="hover:shadow-lg transition-all cursor-pointer hover:border-primary/50 hover:scale-105 duration-200"
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <Icon className="h-4 w-4 text-error" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="text-2xl font-bold text-foreground">{value}</div>
            <p className="text-xs text-muted-foreground">{unit}</p>
          </div>
          {chart && (
            <div className="h-12">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chart}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#4FD1C5" dot={false} strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-success">{status}</span>
            <span className="text-xs text-muted-foreground">Click to view details</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Heart Rate Card */}
        <StatCard
          title="Heart Rate"
          value="72"
          unit="bpm"
          icon={Heart}
          status="Normal"
          chart={heartRateData}
          onClick={() => setSelectedStat("heart-rate")}
        />

        {/* Blood Pressure Card */}
        <Card
          onClick={() => setSelectedStat("blood-pressure")}
          className="hover:shadow-lg transition-all cursor-pointer hover:border-primary/50 hover:scale-105 duration-200"
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Blood Pressure</CardTitle>
              <Droplet className="h-4 w-4 text-secondary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-2xl font-bold text-foreground">120/80</div>
                <p className="text-xs text-muted-foreground">mmHg</p>
              </div>
              <div className="flex items-center gap-2">
                <TrendingDown className="h-4 w-4 text-success" />
                <span className="text-xs text-success">Stable</span>
              </div>
              <p className="text-xs text-muted-foreground">Click to view details</p>
            </div>
          </CardContent>
        </Card>

        {/* Weight Card */}
        <Card
          onClick={() => setSelectedStat("weight")}
          className="hover:shadow-lg transition-all cursor-pointer hover:border-primary/50 hover:scale-105 duration-200"
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Weight</CardTitle>
              <Weight className="h-4 w-4 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-2xl font-bold text-foreground">68.5</div>
                <p className="text-xs text-muted-foreground">kg</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">+2.1 kg this week</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "65%" }} />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Click to view details</p>
            </div>
          </CardContent>
        </Card>

        {/* Baby Activity Card */}
        <Card
          onClick={() => setSelectedStat("baby-activity")}
          className="hover:shadow-lg transition-all cursor-pointer hover:border-primary/50 hover:scale-105 duration-200"
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Baby Activity</CardTitle>
              <Activity className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-2xl font-bold text-foreground">12</div>
                <p className="text-xs text-muted-foreground">kicks today</p>
              </div>
              <div className="space-y-2 text-xs">
                <p className="text-muted-foreground">Last kick: 5 min ago</p>
                <p className="text-muted-foreground">Target: 10+ kicks</p>
              </div>
              <p className="text-xs text-muted-foreground">Click to view details</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <HealthStatsModal isOpen={selectedStat !== null} onClose={() => setSelectedStat(null)} statType={selectedStat} />
    </>
  )
}
