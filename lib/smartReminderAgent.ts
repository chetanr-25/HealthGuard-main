import { GoogleGenerativeAI } from '@google/generative-ai'
import { medicationAnalytics, AdherencePattern, SmartSuggestion } from './medicationAnalytics'
import { supabase } from './supabase'

export interface ReminderOptimization {
  medicationId: string
  currentReminderTime: string
  suggestedReminderTime: string
  reasoning: string
  expectedImprovement: number
}

export interface AdherenceInsight {
  medicationId: string
  insight: string
  recommendation: string
  priority: 'low' | 'medium' | 'high'
}

class SmartReminderAgent {
  private genAI: GoogleGenerativeAI
  private model: any

  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })
  }

  // Generate smart suggestions based on adherence patterns
  async generateSmartSuggestions(userId: string): Promise<SmartSuggestion[]> {
    try {
      const patterns = await medicationAnalytics.getAllMedicationPatterns(userId, 30)
      const suggestions: SmartSuggestion[] = []

      for (const pattern of patterns) {
        const medicationSuggestions = await this.analyzePatternAndSuggest(pattern)
        suggestions.push(...medicationSuggestions)
      }

      // Sort by priority and estimated improvement
      return suggestions.sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 }
        if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
          return priorityOrder[b.priority] - priorityOrder[a.priority]
        }
        return b.estimatedImprovement - a.estimatedImprovement
      })
    } catch (error) {
      console.error('Error generating smart suggestions:', error)
      return []
    }
  }

  // Analyze individual medication pattern and generate suggestions
  private async analyzePatternAndSuggest(pattern: AdherencePattern): Promise<SmartSuggestion[]> {
    const suggestions: SmartSuggestion[] = []

    // Rule-based suggestions (can be enhanced with AI)
    suggestions.push(...this.generateRuleBasedSuggestions(pattern))

    // AI-powered suggestions for complex patterns
    if (pattern.adherenceRate < 80) {
      const aiSuggestions = await this.generateAISuggestions(pattern)
      suggestions.push(...aiSuggestions)
    }

    return suggestions
  }

  // Generate rule-based suggestions
  private generateRuleBasedSuggestions(pattern: AdherencePattern): SmartSuggestion[] {
    const suggestions: SmartSuggestion[] = []

    // Low adherence rate
    if (pattern.adherenceRate < 60) {
      suggestions.push({
        id: `low-adherence-${pattern.medicationId}`,
        medicationId: pattern.medicationId,
        type: 'encouragement',
        title: 'Improve Adherence',
        description: `Your adherence rate for ${pattern.medicationName} is ${pattern.adherenceRate.toFixed(1)}%. Let's work on improving this!`,
        reasoning: `Current adherence rate is below 60%, which may impact treatment effectiveness.`,
        action: 'Set up additional reminders and track progress',
        priority: 'high',
        estimatedImprovement: 25,
        createdAt: new Date().toISOString(),
        status: 'pending'
      })
    }

    // Time slot optimization
    const worstTimeSlot = Object.entries(pattern.patterns.timeSlotCompliance)
      .sort(([,a], [,b]) => a - b)[0]

    if (worstTimeSlot && worstTimeSlot[1] < 70) {
      const timeSlotName = worstTimeSlot[0]
      suggestions.push({
        id: `time-optimization-${pattern.medicationId}`,
        medicationId: pattern.medicationId,
        type: 'time_optimization',
        title: `Optimize ${timeSlotName} Dosing`,
        description: `You miss ${timeSlotName} doses ${(100 - worstTimeSlot[1]).toFixed(1)}% of the time. Consider adjusting the timing.`,
        reasoning: `Poor compliance in ${timeSlotName} suggests timing may not align with your routine.`,
        action: `Move ${timeSlotName} dose to a more convenient time`,
        priority: 'medium',
        estimatedImprovement: 15,
        createdAt: new Date().toISOString(),
        status: 'pending'
      })
    }

    // Day of week optimization
    const worstDay = Object.entries(pattern.patterns.dayOfWeekCompliance)
      .sort(([,a], [,b]) => a - b)[0]

    if (worstDay && worstDay[1] < 70) {
      suggestions.push({
        id: `day-optimization-${pattern.medicationId}`,
        medicationId: pattern.medicationId,
        type: 'reminder_timing',
        title: `Improve ${worstDay[0]} Compliance`,
        description: `You're more likely to miss doses on ${worstDay[0]}s. Set an extra reminder?`,
        reasoning: `Lower compliance on ${worstDay[0]}s suggests different routine or stress levels.`,
        action: 'Set additional reminder for this day',
        priority: 'medium',
        estimatedImprovement: 10,
        createdAt: new Date().toISOString(),
        status: 'pending'
      })
    }

    // Streak encouragement
    if (pattern.streakDays >= 7) {
      suggestions.push({
        id: `streak-encouragement-${pattern.medicationId}`,
        medicationId: pattern.medicationId,
        type: 'encouragement',
        title: 'Great Streak!',
        description: `You've taken ${pattern.medicationName} for ${pattern.streakDays} days in a row! Keep it up!`,
        reasoning: `Consistent adherence is key to treatment success.`,
        action: 'Continue current routine',
        priority: 'low',
        estimatedImprovement: 0,
        createdAt: new Date().toISOString(),
        status: 'pending'
      })
    }

    // Average delay optimization
    if (pattern.averageDelayMinutes > 60) {
      suggestions.push({
        id: `timing-optimization-${pattern.medicationId}`,
        medicationId: pattern.medicationId,
        type: 'reminder_timing',
        title: 'Optimize Reminder Timing',
        description: `You're typically ${pattern.averageDelayMinutes.toFixed(0)} minutes late. Set reminder earlier?`,
        reasoning: `Consistent delays suggest reminder timing needs adjustment.`,
        action: 'Set reminder 30 minutes earlier',
        priority: 'medium',
        estimatedImprovement: 12,
        createdAt: new Date().toISOString(),
        status: 'pending'
      })
    }

    return suggestions
  }

  // Generate AI-powered suggestions for complex patterns
  private async generateAISuggestions(pattern: AdherencePattern): Promise<SmartSuggestion[]> {
    try {
      const prompt = `
Analyze this medication adherence pattern and provide personalized suggestions:

Medication: ${pattern.medicationName}
Adherence Rate: ${pattern.adherenceRate.toFixed(1)}%
Average Delay: ${pattern.averageDelayMinutes.toFixed(0)} minutes
Current Streak: ${pattern.streakDays} days

Time Slot Compliance:
- Morning: ${pattern.patterns.timeSlotCompliance.morning.toFixed(1)}%
- Afternoon: ${pattern.patterns.timeSlotCompliance.afternoon.toFixed(1)}%
- Evening: ${pattern.patterns.timeSlotCompliance.evening.toFixed(1)}%

Day of Week Compliance:
${Object.entries(pattern.patterns.dayOfWeekCompliance)
  .map(([day, rate]) => `- ${day}: ${rate.toFixed(1)}%`)
  .join('\n')}

Context Compliance:
- Weekday: ${pattern.patterns.contextCompliance.weekday.toFixed(1)}%
- Weekend: ${pattern.patterns.contextCompliance.weekend.toFixed(1)}%

Provide 2-3 specific, actionable suggestions to improve adherence. Focus on:
1. Timing optimizations
2. Reminder strategies
3. Behavioral insights

Format as JSON array with: title, description, reasoning, action, priority (low/medium/high), estimatedImprovement (percentage)
`

      const result = await this.model.generateContent(prompt)
      const content = result.response.text()

      // Parse AI response
      const jsonMatch = content.match(/\[[\s\S]*\]/)
      if (!jsonMatch) {
        console.warn('No valid JSON found in AI response')
        return []
      }

      const aiSuggestions = JSON.parse(jsonMatch[0])
      
      return aiSuggestions.map((suggestion: any, index: number) => ({
        id: `ai-suggestion-${pattern.medicationId}-${index}`,
        medicationId: pattern.medicationId,
        type: 'dose_scheduling' as const,
        title: suggestion.title,
        description: suggestion.description,
        reasoning: suggestion.reasoning,
        action: suggestion.action,
        priority: suggestion.priority || 'medium',
        estimatedImprovement: suggestion.estimatedImprovement || 10,
        createdAt: new Date().toISOString(),
        status: 'pending' as const
      }))
    } catch (error) {
      console.error('Error generating AI suggestions:', error)
      return []
    }
  }

  // Save suggestion to database
  async saveSuggestion(suggestion: SmartSuggestion): Promise<void> {
    const { error } = await supabase
      .from('smart_suggestions')
      .insert([suggestion])

    if (error) {
      console.error('Error saving suggestion:', error)
      throw error
    }
  }

  // Get pending suggestions for a user
  async getPendingSuggestions(userId: string): Promise<SmartSuggestion[]> {
    const { data: suggestions, error } = await supabase
      .from('smart_suggestions')
      .select('*')
      .eq('status', 'pending')
      .in('medication_id', 
        await this.getUserMedicationIds(userId)
      )
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching suggestions:', error)
      return []
    }

    return suggestions || []
  }

  // Update suggestion status
  async updateSuggestionStatus(suggestionId: string, status: 'accepted' | 'dismissed'): Promise<void> {
    const { error } = await supabase
      .from('smart_suggestions')
      .update({ status })
      .eq('id', suggestionId)

    if (error) {
      console.error('Error updating suggestion status:', error)
      throw error
    }
  }

  // Get user's medication IDs
  private async getUserMedicationIds(userId: string): Promise<string[]> {
    const { data: medications, error } = await supabase
      .from('medications')
      .select('id')
      .eq('user_id', userId)

    if (error) {
      console.error('Error fetching user medications:', error)
      return []
    }

    return medications?.map(med => med.id) || []
  }

  // Generate adherence insights
  async generateAdherenceInsights(userId: string): Promise<AdherenceInsight[]> {
    const patterns = await medicationAnalytics.getAllMedicationPatterns(userId, 30)
    const insights: AdherenceInsight[] = []

    // Overall adherence insight
    const overallAdherence = patterns.reduce((sum, p) => sum + p.adherenceRate, 0) / patterns.length
    
    if (overallAdherence >= 90) {
      insights.push({
        medicationId: 'overall',
        insight: 'Excellent adherence! You\'re doing great with your medication routine.',
        recommendation: 'Keep up the excellent work! Consider sharing your success with others.',
        priority: 'low'
      })
    } else if (overallAdherence >= 80) {
      insights.push({
        medicationId: 'overall',
        insight: 'Good adherence overall. There\'s room for improvement.',
        recommendation: 'Focus on the medications with lower adherence rates.',
        priority: 'medium'
      })
    } else {
      insights.push({
        medicationId: 'overall',
        insight: 'Adherence needs improvement. Let\'s work on building better habits.',
        recommendation: 'Start with one medication and build consistency before adding others.',
        priority: 'high'
      })
    }

    // Individual medication insights
    patterns.forEach(pattern => {
      if (pattern.adherenceRate < 70) {
        insights.push({
          medicationId: pattern.medicationId,
          insight: `${pattern.medicationName} has low adherence (${pattern.adherenceRate.toFixed(1)}%)`,
          recommendation: `Focus on improving consistency with ${pattern.medicationName}`,
          priority: 'high'
        })
      }
    })

    return insights
  }
}

export const smartReminderAgent = new SmartReminderAgent()
