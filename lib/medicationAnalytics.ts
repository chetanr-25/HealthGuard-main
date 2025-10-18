import { supabase } from './supabase'

export interface MedicationLog {
  id: string
  medication_id: string
  taken_at: string
  scheduled_time: string
  taken: boolean
  notes?: string
  created_at: string
}

export interface AdherencePattern {
  medicationId: string
  medicationName: string
  totalDoses: number
  takenDoses: number
  adherenceRate: number
  averageDelayMinutes: number
  mostMissedTimeSlot: string
  mostMissedDayOfWeek: string
  streakDays: number
  lastTakenDate: string
  patterns: {
    timeSlotCompliance: Record<string, number> // "morning", "afternoon", "evening"
    dayOfWeekCompliance: Record<string, number> // "monday", "tuesday", etc.
    contextCompliance: Record<string, number> // "home", "away", "weekend", "weekday"
  }
}

export interface SmartSuggestion {
  id: string
  medicationId: string
  type: 'time_optimization' | 'reminder_timing' | 'dose_scheduling' | 'encouragement'
  title: string
  description: string
  reasoning: string
  action: string
  priority: 'low' | 'medium' | 'high'
  estimatedImprovement: number // percentage
  createdAt: string
  status: 'pending' | 'accepted' | 'dismissed'
}

class MedicationAnalytics {
  // Analyze adherence patterns for a specific medication
  async analyzeMedicationPatterns(medicationId: string, days: number = 30): Promise<AdherencePattern> {
    const { data: logs, error } = await supabase
      .from('medication_logs')
      .select('*')
      .eq('medication_id', medicationId)
      .gte('created_at', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString())
      .order('created_at', { ascending: true })

    if (error) {
      console.error('Error fetching medication logs:', error)
      throw error
    }

    if (!logs || logs.length === 0) {
      throw new Error('No medication logs found')
    }

    // Get medication name
    const { data: medication } = await supabase
      .from('medications')
      .select('name')
      .eq('id', medicationId)
      .single()

    const totalDoses = logs.length
    const takenDoses = logs.filter(log => log.taken).length
    const adherenceRate = (takenDoses / totalDoses) * 100

    // Calculate average delay
    const delays = logs
      .filter(log => log.taken && log.taken_at && log.scheduled_time)
      .map(log => {
        const scheduled = new Date(log.scheduled_time)
        const taken = new Date(log.taken_at)
        return Math.abs(taken.getTime() - scheduled.getTime()) / (1000 * 60) // minutes
      })
    const averageDelayMinutes = delays.length > 0 ? delays.reduce((a, b) => a + b, 0) / delays.length : 0

    // Analyze time slot compliance
    const timeSlotCompliance = this.analyzeTimeSlotCompliance(logs)
    const dayOfWeekCompliance = this.analyzeDayOfWeekCompliance(logs)
    const contextCompliance = this.analyzeContextCompliance(logs)

    // Find most missed time slot
    const mostMissedTimeSlot = Object.entries(timeSlotCompliance)
      .sort(([,a], [,b]) => a - b)[0]?.[0] || 'unknown'

    // Find most missed day of week
    const mostMissedDayOfWeek = Object.entries(dayOfWeekCompliance)
      .sort(([,a], [,b]) => a - b)[0]?.[0] || 'unknown'

    // Calculate streak
    const streakDays = this.calculateStreakDays(logs)

    // Get last taken date
    const lastTakenLog = logs
      .filter(log => log.taken)
      .sort((a, b) => new Date(b.taken_at).getTime() - new Date(a.taken_at).getTime())[0]
    const lastTakenDate = lastTakenLog?.taken_at || ''

    return {
      medicationId,
      medicationName: medication?.name || 'Unknown',
      totalDoses,
      takenDoses,
      adherenceRate,
      averageDelayMinutes,
      mostMissedTimeSlot,
      mostMissedDayOfWeek,
      streakDays,
      lastTakenDate,
      patterns: {
        timeSlotCompliance,
        dayOfWeekCompliance,
        contextCompliance
      }
    }
  }

  // Analyze time slot compliance (morning, afternoon, evening)
  private analyzeTimeSlotCompliance(logs: MedicationLog[]): Record<string, number> {
    const timeSlots = {
      morning: 0,    // 6 AM - 12 PM
      afternoon: 0,  // 12 PM - 6 PM
      evening: 0     // 6 PM - 12 AM
    }

    const timeSlotCounts = { morning: 0, afternoon: 0, evening: 0 }

    logs.forEach(log => {
      const hour = new Date(log.scheduled_time).getHours()
      let timeSlot: keyof typeof timeSlots

      if (hour >= 6 && hour < 12) {
        timeSlot = 'morning'
      } else if (hour >= 12 && hour < 18) {
        timeSlot = 'afternoon'
      } else {
        timeSlot = 'evening'
      }

      timeSlotCounts[timeSlot]++
      if (log.taken) {
        timeSlots[timeSlot]++
      }
    })

    // Calculate compliance rates
    return {
      morning: timeSlotCounts.morning > 0 ? (timeSlots.morning / timeSlotCounts.morning) * 100 : 0,
      afternoon: timeSlotCounts.afternoon > 0 ? (timeSlots.afternoon / timeSlotCounts.afternoon) * 100 : 0,
      evening: timeSlotCounts.evening > 0 ? (timeSlots.evening / timeSlotCounts.evening) * 100 : 0
    }
  }

  // Analyze day of week compliance
  private analyzeDayOfWeekCompliance(logs: MedicationLog[]): Record<string, number> {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    const dayCompliance: Record<string, number> = {}
    const dayCounts: Record<string, number> = {}

    days.forEach(day => {
      dayCompliance[day] = 0
      dayCounts[day] = 0
    })

    logs.forEach(log => {
      const dayOfWeek = days[new Date(log.scheduled_time).getDay()]
      dayCounts[dayOfWeek]++
      if (log.taken) {
        dayCompliance[dayOfWeek]++
      }
    })

    // Calculate compliance rates
    days.forEach(day => {
      dayCompliance[day] = dayCounts[day] > 0 ? (dayCompliance[day] / dayCounts[day]) * 100 : 0
    })

    return dayCompliance
  }

  // Analyze context compliance (weekday vs weekend, home vs away)
  private analyzeContextCompliance(logs: MedicationLog[]): Record<string, number> {
    const contexts = {
      weekday: 0,
      weekend: 0,
      home: 0,    // Assuming home if no location data
      away: 0
    }

    const contextCounts = { weekday: 0, weekend: 0, home: 0, away: 0 }

    logs.forEach(log => {
      const dayOfWeek = new Date(log.scheduled_time).getDay()
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6 // Sunday or Saturday

      if (isWeekend) {
        contextCounts.weekend++
        if (log.taken) contexts.weekend++
      } else {
        contextCounts.weekday++
        if (log.taken) contexts.weekday++
      }

      // For now, assume all are at home (could be enhanced with location data)
      contextCounts.home++
      if (log.taken) contexts.home++
    })

    return {
      weekday: contextCounts.weekday > 0 ? (contexts.weekday / contextCounts.weekday) * 100 : 0,
      weekend: contextCounts.weekend > 0 ? (contexts.weekend / contextCounts.weekend) * 100 : 0,
      home: contextCounts.home > 0 ? (contexts.home / contextCounts.home) * 100 : 0,
      away: 0 // No away data for now
    }
  }

  // Calculate current streak of consecutive days with at least one dose taken
  private calculateStreakDays(logs: MedicationLog[]): number {
    if (logs.length === 0) return 0

    // Group logs by date
    const logsByDate = new Map<string, MedicationLog[]>()
    logs.forEach(log => {
      const date = new Date(log.scheduled_time).toDateString()
      if (!logsByDate.has(date)) {
        logsByDate.set(date, [])
      }
      logsByDate.get(date)!.push(log)
    })

    // Sort dates in descending order
    const sortedDates = Array.from(logsByDate.keys()).sort((a, b) => 
      new Date(b).getTime() - new Date(a).getTime()
    )

    let streak = 0
    const today = new Date().toDateString()

    for (const date of sortedDates) {
      const dayLogs = logsByDate.get(date)!
      const hasTakenDose = dayLogs.some(log => log.taken)

      if (hasTakenDose) {
        streak++
      } else {
        // If we hit a day with no taken doses, break the streak
        // But only if it's not today (give user chance to take today's dose)
        if (date !== today) {
          break
        }
      }
    }

    return streak
  }

  // Get all medication patterns for a user
  async getAllMedicationPatterns(userId: string, days: number = 30): Promise<AdherencePattern[]> {
    const { data: medications, error } = await supabase
      .from('medications')
      .select('id')
      .eq('user_id', userId)

    if (error) {
      console.error('Error fetching medications:', error)
      throw error
    }

    if (!medications || medications.length === 0) {
      return []
    }

    const patterns = await Promise.all(
      medications.map(med => this.analyzeMedicationPatterns(med.id, days))
    )

    return patterns
  }
}

export const medicationAnalytics = new MedicationAnalytics()
