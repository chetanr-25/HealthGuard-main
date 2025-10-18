import { GoogleGenerativeAI } from '@google/generative-ai'
import { checkSafety, validateAIResponse, enhanceResponseWithSafety } from './safetyGuardrails'

// Pregnancy knowledge base for RAG
const PREGNANCY_KNOWLEDGE_BASE = {
  "nutrition": {
    "week_1_12": "Focus on folic acid (400-800mcg daily), iron-rich foods, and avoiding raw fish, unpasteurized dairy, and high-mercury fish. Eat small, frequent meals to manage nausea.",
    "week_13_27": "Increase calorie intake by about 300-350 calories per day. Continue with iron, add calcium and Vitamin D. Focus on whole grains, lean proteins, fruits, and vegetables.",
    "week_28_40": "Increase calorie intake by about 450-500 calories per day. Ensure adequate fiber to prevent constipation. Continue all essential nutrients. Stay hydrated.",
    "general": "A balanced diet rich in fruits, vegetables, lean proteins, and whole grains is crucial throughout pregnancy. Stay hydrated. Consult your doctor for personalized dietary advice."
  },
  "back_pain": {
    "causes": "Back pain in pregnancy is common due to hormonal changes (relaxin), weight gain, shift in center of gravity, and postural changes.",
    "relief": "Gentle exercises (prenatal yoga, swimming), good posture, supportive shoes, heat/cold packs, massage, and a supportive mattress can help. Avoid heavy lifting. Consult a doctor if severe.",
    "emergency": "Severe, sudden back pain, especially with fever, vaginal bleeding, or contractions, could indicate a serious issue. Seek immediate medical attention."
  },
  "hospital_timing": {
    "contractions": "Go to the hospital when contractions are regular, strong, and about 5 minutes apart, lasting for 60 seconds, for at least an hour (5-1-1 rule).",
    "water_break": "Go to the hospital immediately if your water breaks, even without contractions, to check for infection risk.",
    "bleeding": "Any significant vaginal bleeding should prompt an immediate hospital visit.",
    "other_concerns": "Reduced fetal movement, severe headache, vision changes, sudden swelling, or any other concerning symptoms warrant a call to your doctor or hospital."
  },
  "safe_exercises": {
    "general": "Most moderate exercises are safe during pregnancy if you were active before. Walking, swimming, prenatal yoga, cycling (stationary), and light strength training are good options.",
    "avoid": "Avoid activities with a high risk of falling, contact sports, exercises involving lying flat on your back after the first trimester, and scuba diving. Listen to your body and avoid overheating.",
    "benefits": "Exercise can reduce back pain, improve sleep, boost mood, and prepare your body for labor."
  },
  "general_advice": "Always consult your healthcare provider for personalized medical advice. This AI provides general information and should not replace professional medical consultation."
}

// Emergency keywords for safety detection
const EMERGENCY_KEYWORDS = [
  "severe bleeding", "heavy bleeding", "gushing blood", "sudden gush of blood",
  "severe pain", "excruciating pain", "unbearable pain", "sharp pain", "intense pain",
  "can't feel baby", "baby not moving", "no fetal movement", "decreased fetal movement",
  "water broke", "waters broke", "gush of fluid", "fluid leaking",
  "fever", "high fever", "chills",
  "vision changes", "blurred vision", "seeing spots", "double vision",
  "headache", "severe headache", "pounding headache",
  "swelling", "sudden swelling", "swelling in face", "swelling in hands",
  "chest pain", "shortness of breath", "difficulty breathing",
  "dizzy", "faint", "passing out",
  "emergency", "urgent", "help me", "call an ambulance", "911"
]

// Doctor consultation keywords
const DOCTOR_KEYWORDS = [
  "doctor", "physician", "obstetrician", "ob-gyn", "midwife",
  "appointment", "checkup", "examination", "consultation",
  "medication", "prescription", "treatment", "therapy",
  "test results", "lab results", "ultrasound", "blood test",
  "complications", "concerns", "worried", "anxious"
]

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp?: Date
}

export interface ChatContext {
  pregnancyWeek?: number
  language?: string
  conversationHistory: ChatMessage[]
}

class PregnancyChatAgent {
  private genAI: GoogleGenerativeAI
  private model: any
  private knowledgeBase: typeof PREGNANCY_KNOWLEDGE_BASE

  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })
    this.knowledgeBase = PREGNANCY_KNOWLEDGE_BASE
  }

  // Check if message contains emergency keywords
  private checkForEmergency(message: string): boolean {
    const lowerMessage = message.toLowerCase()
    return EMERGENCY_KEYWORDS.some(keyword => lowerMessage.includes(keyword))
  }

  // Check if message requires doctor consultation
  private checkRequiresDoctor(message: string): boolean {
    const lowerMessage = message.toLowerCase()
    return DOCTOR_KEYWORDS.some(keyword => lowerMessage.includes(keyword))
  }

  // Retrieve relevant knowledge based on query
  private retrieveKnowledge(query: string, pregnancyWeek?: number): string {
    let relevantInfo: string[] = []
    const lowerQuery = query.toLowerCase()

    // Prioritize week-specific nutrition advice
    if (lowerQuery.includes("eat") || lowerQuery.includes("nutrition") || lowerQuery.includes("diet")) {
      if (pregnancyWeek !== undefined) {
        if (pregnancyWeek >= 1 && pregnancyWeek <= 12) {
          relevantInfo.push(this.knowledgeBase.nutrition.week_1_12)
        } else if (pregnancyWeek >= 13 && pregnancyWeek <= 27) {
          relevantInfo.push(this.knowledgeBase.nutrition.week_13_27)
        } else if (pregnancyWeek >= 28 && pregnancyWeek <= 40) {
          relevantInfo.push(this.knowledgeBase.nutrition.week_28_40)
        }
      }
      relevantInfo.push(this.knowledgeBase.nutrition.general)
    }

    if (lowerQuery.includes("back pain")) {
      relevantInfo.push(this.knowledgeBase.back_pain.causes)
      relevantInfo.push(this.knowledgeBase.back_pain.relief)
      relevantInfo.push(this.knowledgeBase.back_pain.emergency)
    }

    if (lowerQuery.includes("hospital") || lowerQuery.includes("labor") || lowerQuery.includes("contractions") || lowerQuery.includes("water break")) {
      relevantInfo.push(this.knowledgeBase.hospital_timing.contractions)
      relevantInfo.push(this.knowledgeBase.hospital_timing.water_break)
      relevantInfo.push(this.knowledgeBase.hospital_timing.bleeding)
      relevantInfo.push(this.knowledgeBase.hospital_timing.other_concerns)
    }

    if (lowerQuery.includes("exercise") || lowerQuery.includes("workout")) {
      relevantInfo.push(this.knowledgeBase.safe_exercises.general)
      relevantInfo.push(this.knowledgeBase.safe_exercises.avoid)
      relevantInfo.push(this.knowledgeBase.safe_exercises.benefits)
    }

    // Add general advice always
    relevantInfo.push(this.knowledgeBase.general_advice)

    return relevantInfo.join("\n\n")
  }

  // Generate system prompt
  private generateSystemPrompt(context: ChatContext): string {
    const weekText = context.pregnancyWeek ? `Week ${context.pregnancyWeek}` : "not specified"
    const languageText = context.language || "English"
    
    return `You are an empathetic and highly knowledgeable AI pregnancy assistant named HealthGuard AI.
Your purpose is to provide educational information and support to pregnant users.
Always respond in a helpful, reassuring, and informative manner.
Use the provided context to answer questions. If the context does not contain the answer, state that you don't have enough information.
NEVER provide medical diagnoses or replace professional medical advice. Always advise consulting a healthcare provider for any medical concerns.
Maintain conversation context.
The user's current pregnancy week is ${weekText}. Use this to provide week-specific advice where relevant.
Respond in ${languageText}.
Always include appropriate medical disclaimers.`
  }

  // Generate suggested questions
  private generateSuggestedQuestions(message: string, pregnancyWeek?: number): string[] {
    const suggestions = [
      "What should I eat this week?",
      "Is it normal to have back pain?",
      "What exercises are safe for me?",
      "When should I go to the hospital?",
      "What are the warning signs I should watch for?"
    ]

    // Add week-specific suggestions
    if (pregnancyWeek !== undefined) {
      if (pregnancyWeek <= 12) {
        suggestions.push("What should I expect in the first trimester?")
      } else if (pregnancyWeek <= 26) {
        suggestions.push("What changes happen in the second trimester?")
      } else {
        suggestions.push("How do I prepare for labor and delivery?")
      }
    }

    return suggestions.slice(0, 5)
  }

  // Main method to process messages
  async processMessage(message: string, context: ChatContext): Promise<{
    response: string
    isEmergency: boolean
    requiresDoctor: boolean
    suggestedQuestions: string[]
  }> {
    try {
      // Check for emergency
      const isEmergency = this.checkForEmergency(message)
      const requiresDoctor = this.checkRequiresDoctor(message)

      // Retrieve relevant knowledge
      const knowledge = this.retrieveKnowledge(message, context.pregnancyWeek)

      // Generate system prompt
      const systemPrompt = this.generateSystemPrompt(context)

      // Create conversation history
      const conversationHistory = context.conversationHistory
        .slice(-6) // Keep last 6 messages for context
        .map(msg => `${msg.role}: ${msg.content}`)
        .join('\n')

      // Create the full prompt
      const fullPrompt = `${systemPrompt}

RELEVANT KNOWLEDGE:
${knowledge}

CONVERSATION HISTORY:
${conversationHistory || 'No previous conversation.'}

USER MESSAGE: ${message}

Please provide a helpful, supportive response. If this requires medical attention, suggest consulting their healthcare provider. Always include appropriate disclaimers.`

      // Generate response using Gemini
      const result = await this.model.generateContent(fullPrompt)
      const response = result.response.text()

      // Validate and enhance response with safety
      const safetyCheck = checkSafety(message)
      const validation = validateAIResponse(response)
      const enhancedResponse = enhanceResponseWithSafety(response, safetyCheck)

      // Generate suggested questions
      const suggestedQuestions = this.generateSuggestedQuestions(message, context.pregnancyWeek)

      return {
        response: enhancedResponse,
        isEmergency,
        requiresDoctor,
        suggestedQuestions
      }
    } catch (error) {
      console.error('Error processing chat message:', error)
      throw new Error('Failed to process message. Please try again.')
    }
  }
}

// Export singleton instance
export const pregnancyChatAgent = new PregnancyChatAgent()

// Export utility functions
export function detectEmergency(message: string): boolean {
  const lowerMessage = message.toLowerCase()
  return EMERGENCY_KEYWORDS.some(keyword => lowerMessage.includes(keyword))
}