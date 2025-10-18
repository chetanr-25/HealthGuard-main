import { GoogleGenerativeAI } from '@google/generative-ai'
import { z } from 'zod'

// Define the risk assessment schema
const RiskAssessmentSchema = z.object({
  overallRiskScore: z.number().min(0).max(100),
  riskLevel: z.enum(['low', 'moderate', 'high']),
  contributingFactors: z.array(z.string()),
  recommendations: z.array(z.string()),
  explanation: z.string(),
  urgentAction: z.boolean().optional(),
  urgentMessage: z.string().optional()
})

export type RiskAssessment = z.infer<typeof RiskAssessmentSchema>

// Health data input schema
export interface HealthDataInput {
  vitals: {
    heartRate?: number
    bloodPressure?: { systolic: number; diastolic: number }
    weight?: number
    temperature?: number
    lastUpdated: string
  }
  medications: Array<{
    name: string
    dosage: string
    frequency: string
    active: boolean
  }>
  pregnancyInfo: {
    dueDate?: string
    currentWeek?: number
    bloodType?: string
  }
  medicalHistory: {
    conditions: string[]
    allergies: string[]
    previousPregnancies: number
    complications: string[]
  }
  recentSymptoms: string[]
}

class HealthRiskAssessmentAgent {
  private genAI: GoogleGenerativeAI
  private model: any

  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })
  }

  async assessHealthRisk(healthData: HealthDataInput): Promise<RiskAssessment> {
    try {
      const systemPrompt = this.createSystemPrompt()
      const humanPrompt = this.createHumanPrompt(healthData)

      const fullPrompt = `${systemPrompt}

${humanPrompt}

Please respond with a valid JSON object that matches this schema:
{
  "overallRiskScore": number (0-100),
  "riskLevel": "low" | "moderate" | "high",
  "contributingFactors": string[],
  "recommendations": string[],
  "explanation": string,
  "urgentAction": boolean (optional),
  "urgentMessage": string (optional)
}`

      const result = await this.model.generateContent(fullPrompt)
      const content = result.response.text()

      // Parse the JSON response
      const jsonMatch = content.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error('No valid JSON found in AI response')
      }

      const parsedResponse = JSON.parse(jsonMatch[0])
      
      // Validate the response against our schema
      const validatedResponse = RiskAssessmentSchema.parse(parsedResponse)
      
      return validatedResponse
    } catch (error) {
      console.error('Error in health risk assessment:', error)
      throw new Error('Failed to assess health risk. Please try again.')
    }
  }

  private createSystemPrompt(): string {
    return `You are an AI health assistant specialized in pregnancy risk assessment. Your role is to analyze health data and provide risk assessments for pregnant individuals.

IMPORTANT GUIDELINES:
1. This is NOT a medical diagnosis - always emphasize consulting healthcare providers
2. Be empathetic, clear, and actionable in your responses
3. If you detect high-risk indicators, recommend immediate medical consultation
4. Focus on evidence-based risk factors for pregnancy complications
5. Provide practical, actionable recommendations
6. Use simple, understandable language

RISK FACTORS TO CONSIDER:
- Blood pressure abnormalities (pre-eclampsia risk)
- Heart rate irregularities
- Weight gain patterns
- Medication interactions
- Pre-existing conditions
- Pregnancy complications history
- Current symptoms

RESPONSE FORMAT:
Return a JSON object with this exact structure:
{
  "overallRiskScore": number (0-100),
  "riskLevel": "low" | "moderate" | "high",
  "contributingFactors": [array of strings],
  "recommendations": [array of 3-5 actionable strings],
  "explanation": "clear explanation in simple language",
  "urgentAction": boolean (true if immediate medical attention needed),
  "urgentMessage": "urgent message if urgentAction is true"
}

RISK SCORING:
- 0-30: Low risk
- 31-70: Moderate risk  
- 71-100: High risk

Be thorough but concise. Prioritize safety and always recommend professional medical consultation.`
  }

  private createHumanPrompt(healthData: HealthDataInput): string {
    const {
      vitals,
      medications,
      pregnancyInfo,
      medicalHistory,
      recentSymptoms
    } = healthData

    return `Please analyze the following health data for pregnancy risk assessment:

VITAL SIGNS:
- Heart Rate: ${vitals.heartRate || 'Not provided'} bpm
- Blood Pressure: ${vitals.bloodPressure ? `${vitals.bloodPressure.systolic}/${vitals.bloodPressure.diastolic}` : 'Not provided'} mmHg
- Weight: ${vitals.weight || 'Not provided'} lbs
- Temperature: ${vitals.temperature || 'Not provided'}°F
- Last Updated: ${vitals.lastUpdated}

PREGNANCY INFORMATION:
- Due Date: ${pregnancyInfo.dueDate || 'Not provided'}
- Current Week: ${pregnancyInfo.currentWeek || 'Not provided'}
- Blood Type: ${pregnancyInfo.bloodType || 'Not provided'}

CURRENT MEDICATIONS:
${medications.map(med => `- ${med.name}: ${med.dosage} ${med.frequency} (${med.active ? 'Active' : 'Inactive'})`).join('\n')}

MEDICAL HISTORY:
- Pre-existing Conditions: ${medicalHistory.conditions.join(', ') || 'None reported'}
- Allergies: ${medicalHistory.allergies.join(', ') || 'None reported'}
- Previous Pregnancies: ${medicalHistory.previousPregnancies}
- Previous Complications: ${medicalHistory.complications.join(', ') || 'None reported'}

RECENT SYMPTOMS:
${recentSymptoms.join(', ') || 'None reported'}

Please provide a comprehensive risk assessment following the specified JSON format.`
  }
}

// Export singleton instance
export const healthRiskAgent = new HealthRiskAssessmentAgent()

// Helper function to get risk level color
export function getRiskLevelColor(riskLevel: string): string {
  switch (riskLevel) {
    case 'low':
      return 'text-green-600 bg-green-50 border-green-200'
    case 'moderate':
      return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    case 'high':
      return 'text-red-600 bg-red-50 border-red-200'
    default:
      return 'text-gray-600 bg-gray-50 border-gray-200'
  }
}

// Export singleton instance
export const healthRiskAssessmentAgent = new HealthRiskAssessmentAgent()

// Helper function to get risk level icon
export function getRiskLevelIcon(riskLevel: string): string {
  switch (riskLevel) {
    case 'low':
      return '✅'
    case 'moderate':
      return '⚠️'
    case 'high':
      return '🚨'
    default:
      return '❓'
  }
}
