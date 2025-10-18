"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Calendar,
  Clock,
  Award,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'
import { AdherencePattern } from '@/lib/medicationAnalytics'

interface AdherenceInsightsProps {
  patterns: AdherencePattern[]
  loading?: boolean
}

export function AdherenceInsights({ patterns, loading = false }: AdherenceInsightsProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-6 bg-muted rounded w-1/3 animate-pulse" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-muted rounded w-3/4" />
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-muted rounded w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (patterns.length === 0) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-center">
            <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Adherence Data</h3>
            <p className="text-muted-foreground">
              Start logging your medications to see adherence insights
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Calculate overall statistics
  const overallAdherence = patterns.reduce((sum, p) => sum + p.adherenceRate, 0) / patterns.length
  const averageStreak = patterns.reduce((sum, p) => sum + p.streakDays, 0) / patterns.length
  const needsAttention = patterns.filter(p => p.adherenceRate < 80).length
  const excellentAdherence = patterns.filter(p => p.adherenceRate >= 90).length

  // Get best and worst performing medications
  const bestMedication = patterns.reduce((best, current) => 
    current.adherenceRate > best.adherenceRate ? current : best
  )
  const worstMedication = patterns.reduce((worst, current) => 
    current.adherenceRate < worst.adherenceRate ? current : worst
  )

  // Calculate time slot performance
  const timeSlotPerformance = {
    morning: patterns.reduce((sum, p) => sum + p.patterns.timeSlotCompliance.morning, 0) / patterns.length,
    afternoon: patterns.reduce((sum, p) => sum + p.patterns.timeSlotCompliance.afternoon, 0) / patterns.length,
    evening: patterns.reduce((sum, p) => sum + p.patterns.timeSlotCompliance.evening, 0) / patterns.length
  }

  const bestTimeSlot = Object.entries(timeSlotPerformance)
    .sort(([,a], [,b]) => b - a)[0]

  const getAdherenceColor = (rate: number) => {
    if (rate >= 90) return 'text-green-600'
    if (rate >= 80) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getAdherenceIcon = (rate: number) => {
    if (rate >= 90) return <CheckCircle className="h-4 w-4 text-green-600" />
    if (rate >= 80) return <Target className="h-4 w-4 text-yellow-600" />
    return <AlertTriangle className="h-4 w-4 text-red-600" />
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Adherence Insights</h3>
        <p className="text-sm text-muted-foreground">
          Analysis of your medication-taking patterns over the last 30 days
        </p>
      </div>

      {/* Overall Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Adherence</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallAdherence.toFixed(1)}%</div>
            <div className="flex items-center space-x-1 mt-2">
              {getAdherenceIcon(overallAdherence)}
              <span className={`text-xs ${getAdherenceColor(overallAdherence)}`}>
                {overallAdherence >= 90 ? 'Excellent' : 
                 overallAdherence >= 80 ? 'Good' : 'Needs Improvement'}
              </span>
            </div>
            <Progress value={overallAdherence} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Streak</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageStreak.toFixed(0)} days</div>
            <p className="text-xs text-muted-foreground mt-2">
              Consecutive days with at least one dose
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Needs Attention</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{needsAttention}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Medications below 80% adherence
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Excellent Performance</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{excellentAdherence}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Medications above 90% adherence
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Best and Worst Performers */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span>Best Performer</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">{bestMedication.medicationName}</span>
                <Badge variant="outline" className="text-green-600">
                  {bestMedication.adherenceRate.toFixed(1)}%
                </Badge>
              </div>
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <span>{bestMedication.streakDays} day streak</span>
                <span>{bestMedication.averageDelayMinutes.toFixed(0)}min avg delay</span>
              </div>
              <Progress value={bestMedication.adherenceRate} className="mt-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center space-x-2">
              <TrendingDown className="h-4 w-4 text-red-600" />
              <span>Needs Improvement</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">{worstMedication.medicationName}</span>
                <Badge variant="outline" className="text-red-600">
                  {worstMedication.adherenceRate.toFixed(1)}%
                </Badge>
              </div>
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <span>{worstMedication.streakDays} day streak</span>
                <span>{worstMedication.averageDelayMinutes.toFixed(0)}min avg delay</span>
              </div>
              <Progress value={worstMedication.adherenceRate} className="mt-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Time Slot Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span>Time Slot Performance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(timeSlotPerformance).map(([timeSlot, rate]) => (
              <div key={timeSlot} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="capitalize font-medium">{timeSlot}</span>
                  <Badge variant="outline" className={getAdherenceColor(rate)}>
                    {rate.toFixed(1)}%
                  </Badge>
                </div>
                <Progress value={rate} className="h-2" />
              </div>
            ))}
            <div className="mt-4 p-3 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground">
                <strong>Best time:</strong> {bestTimeSlot[0]} ({bestTimeSlot[1].toFixed(1)}% compliance)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Individual Medication Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Medication Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {patterns.map((pattern) => (
              <div key={pattern.medicationId} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">{pattern.medicationName}</h4>
                  <div className="flex items-center space-x-2">
                    {getAdherenceIcon(pattern.adherenceRate)}
                    <span className={`font-semibold ${getAdherenceColor(pattern.adherenceRate)}`}>
                      {pattern.adherenceRate.toFixed(1)}%
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Doses Taken</p>
                    <p className="font-medium">{pattern.takenDoses}/{pattern.totalDoses}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Current Streak</p>
                    <p className="font-medium">{pattern.streakDays} days</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Avg Delay</p>
                    <p className="font-medium">{pattern.averageDelayMinutes.toFixed(0)} min</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Most Missed</p>
                    <p className="font-medium capitalize">{pattern.mostMissedTimeSlot}</p>
                  </div>
                </div>
                
                <Progress value={pattern.adherenceRate} className="mt-3" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
