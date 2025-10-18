"use client"

import { useState, useMemo } from "react"
import { TrendingDown, Activity, Droplet, Weight, Heart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { HealthStatsModal } from "./health-stats-modal"
import { useVitalSigns } from "@/lib/hooks/useVitalSigns"

export function HealthStatsGrid() {
  const [selectedStat, setSelectedStat] = useState<"heart-rate" | "blood-pressure" | "weight" | "baby-activity" | null>(
    null,
  )
  
  const { vitalSigns, loading, getLatestVitalSign, getVitalSignsByType } = useVitalSigns()

  // Get latest vital signs
  const latestHeartRate = getLatestVitalSign('heart_rate')
  const latestBloodPressure = getLatestVitalSign('blood_pressure')
  const latestWeight = getLatestVitalSign('weight')
  const latestBabyActivity = getLatestVitalSign('oxygen_saturation') // Using oxygen saturation as proxy for baby activity

  // Generate chart data for heart rate (last 7 days)
  const heartRateData = useMemo(() => {
    const heartRateSigns = getVitalSignsByType('heart_rate')
    const last7Days = heartRateSigns.slice(0, 7).reverse()
    
    return last7Days.map((sign, index) => ({
      time: new Date(sign.timestamp).toLocaleDateString('en-US', { weekday: 'short' }),
      value: sign.value
    }))
  }, [getVitalSignsByType])

  // Get status color and text based on vital sign status
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'normal':
        return { color: 'text-success', text: 'Normal' }
      case 'elevated':
        return { color: 'text-warning', text: 'Elevated' }
      case 'high':
        return { color: 'text-error', text: 'High' }
      case 'low':
        return { color: 'text-warning', text: 'Low' }
      case 'critical':
        return { color: 'text-error', text: 'Critical' }
      default:
        return { color: 'text-muted-foreground', text: 'Unknown' }
    }
  }

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
          value={loading ? "..." : latestHeartRate?.value?.toString() || "N/A"}
          unit="bpm"
          icon={Heart}
          status={loading ? "Loading..." : getStatusInfo(latestHeartRate?.status || 'normal').text}
          chart={heartRateData.length > 0 ? heartRateData : undefined}
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
                <div className="text-2xl font-bold text-foreground">
                  {loading ? "..." : latestBloodPressure?.value?.toString() || "N/A"}
                </div>
                <p className="text-xs text-muted-foreground">mmHg</p>
              </div>
              <div className="flex items-center gap-2">
                <TrendingDown className="h-4 w-4 text-success" />
                <span className={`text-xs ${getStatusInfo(latestBloodPressure?.status || 'normal').color}`}>
                  {loading ? "Loading..." : getStatusInfo(latestBloodPressure?.status || 'normal').text}
                </span>
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
                <div className="text-2xl font-bold text-foreground">
                  {loading ? "..." : latestWeight?.value?.toString() || "N/A"}
                </div>
                <p className="text-xs text-muted-foreground">kg</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className={`${getStatusInfo(latestWeight?.status || 'normal').color}`}>
                    {loading ? "Loading..." : getStatusInfo(latestWeight?.status || 'normal').text}
                  </span>
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
                <div className="text-2xl font-bold text-foreground">
                  {loading ? "..." : latestBabyActivity?.value?.toString() || "N/A"}
                </div>
                <p className="text-xs text-muted-foreground">oxygen level</p>
              </div>
              <div className="space-y-2 text-xs">
                <p className={`${getStatusInfo(latestBabyActivity?.status || 'normal').color}`}>
                  {loading ? "Loading..." : getStatusInfo(latestBabyActivity?.status || 'normal').text}
                </p>
                <p className="text-muted-foreground">Target: 95%+ oxygen</p>
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
