// Safety guardrails for AI chatbot responses

export interface SafetyCheck {
  isEmergency: boolean
  requiresDoctor: boolean
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  suggestedAction: string
  emergencyMessage?: string
}

// Emergency keywords that require immediate attention
const EMERGENCY_KEYWORDS = [
  'severe pain', 'heavy bleeding', 'can\'t breathe', 'chest pain', 'severe headache',
  'vision changes', 'contractions', 'water breaking', 'no movement', 'emergency',
  'urgent', 'hospital', 'ambulance', '911', 'unconscious', 'fainting',
  'severe nausea', 'vomiting blood', 'high fever', 'seizure', 'stroke'
]

// Medical advice keywords that should suggest doctor consultation
const MEDICAL_KEYWORDS = [
  'diagnosis', 'diagnose', 'condition', 'disease', 'infection', 'medication',
  'prescription', 'treatment', 'cure', 'heal', 'fix', 'problem', 'sick',
  'illness', 'disorder', 'syndrome', 'abnormal', 'unusual', 'concerning'
]

// High-risk pregnancy keywords
const HIGH_RISK_KEYWORDS = [
  'preterm labor', 'premature', 'placenta', 'preeclampsia', 'gestational diabetes',
  'high blood pressure', 'bleeding', 'spotting', 'cramping', 'contractions',
  'bed rest', 'hospitalization', 'complications'
]

// Week-specific emergency thresholds
const EMERGENCY_THRESHOLDS = {
  early_pregnancy: {
    weeks: [1, 12],
    keywords: ['severe cramping', 'heavy bleeding', 'severe nausea', 'fever']
  },
  second_trimester: {
    weeks: [13, 26],
    keywords: ['decreased movement', 'severe back pain', 'contractions', 'bleeding']
  },
  third_trimester: {
    weeks: [27, 40],
    keywords: ['decreased movement', 'contractions', 'water breaking', 'severe swelling']
  }
}

export function checkSafety(message: string, pregnancyWeek?: number): SafetyCheck {
  const lowerMessage = message.toLowerCase()
  
  // Check for emergency keywords
  const hasEmergencyKeywords = EMERGENCY_KEYWORDS.some(keyword => 
    lowerMessage.includes(keyword)
  )
  
  // Check for medical advice keywords
  const hasMedicalKeywords = MEDICAL_KEYWORDS.some(keyword => 
    lowerMessage.includes(keyword)
  )
  
  // Check for high-risk pregnancy keywords
  const hasHighRiskKeywords = HIGH_RISK_KEYWORDS.some(keyword => 
    lowerMessage.includes(keyword)
  )
  
  // Check week-specific emergency thresholds
  const hasWeekSpecificEmergency = pregnancyWeek && 
    checkWeekSpecificEmergency(lowerMessage, pregnancyWeek)
  
  // Determine risk level and actions
  if (hasEmergencyKeywords || hasWeekSpecificEmergency) {
    return {
      isEmergency: true,
      requiresDoctor: true,
      riskLevel: 'critical',
      suggestedAction: 'Call 911 or go to emergency room immediately',
      emergencyMessage: generateEmergencyMessage(pregnancyWeek)
    }
  }
  
  if (hasHighRiskKeywords || hasMedicalKeywords) {
    return {
      isEmergency: false,
      requiresDoctor: true,
      riskLevel: 'high',
      suggestedAction: 'Contact your healthcare provider immediately'
    }
  }
  
  // Check for medium-risk indicators
  const mediumRiskIndicators = [
    'pain', 'ache', 'discomfort', 'concern', 'worry', 'unusual',
    'different', 'change', 'symptom'
  ]
  
  const hasMediumRiskIndicators = mediumRiskIndicators.some(indicator => 
    lowerMessage.includes(indicator)
  )
  
  if (hasMediumRiskIndicators) {
    return {
      isEmergency: false,
      requiresDoctor: false,
      riskLevel: 'medium',
      suggestedAction: 'Monitor symptoms and consider contacting your healthcare provider if they persist or worsen'
    }
  }
  
  return {
    isEmergency: false,
    requiresDoctor: false,
    riskLevel: 'low',
    suggestedAction: 'Continue with regular prenatal care'
  }
}

function checkWeekSpecificEmergency(message: string, pregnancyWeek: number): boolean {
  if (pregnancyWeek >= 1 && pregnancyWeek <= 12) {
    return EMERGENCY_THRESHOLDS.early_pregnancy.keywords.some(keyword => 
      message.includes(keyword)
    )
  } else if (pregnancyWeek >= 13 && pregnancyWeek <= 26) {
    return EMERGENCY_THRESHOLDS.second_trimester.keywords.some(keyword => 
      message.includes(keyword)
    )
  } else if (pregnancyWeek >= 27 && pregnancyWeek <= 40) {
    return EMERGENCY_THRESHOLDS.third_trimester.keywords.some(keyword => 
      message.includes(keyword)
    )
  }
  
  return false
}

function generateEmergencyMessage(pregnancyWeek?: number): string {
  let message = `🚨 **MEDICAL EMERGENCY DETECTED**\n\n`
  
  message += `Based on your message, this may be a medical emergency. Please:\n\n`
  message += `1. **Call 911 immediately** if you're experiencing severe symptoms\n`
  message += `2. **Go to the nearest emergency room** if you have:\n`
  message += `   - Severe abdominal pain\n`
  message += `   - Heavy vaginal bleeding\n`
  message += `   - Difficulty breathing\n`
  message += `   - Severe headache with vision changes\n`
  message += `   - Chest pain\n`
  
  if (pregnancyWeek && pregnancyWeek >= 28) {
    message += `   - Decreased fetal movement\n`
  }
  
  message += `\n3. **Contact your healthcare provider** for urgent but non-emergency concerns\n\n`
  message += `For immediate assistance, you can also use our Emergency page or call your doctor's emergency line.`
  
  return message
}

// Validate AI response for safety
export function validateAIResponse(response: string): {
  isSafe: boolean
  warnings: string[]
  suggestions: string[]
} {
  const warnings: string[] = []
  const suggestions: string[] = []
  
  const lowerResponse = response.toLowerCase()
  
  // Check for inappropriate medical advice
  const medicalAdvicePatterns = [
    /you should take/,
    /you need to/,
    /you must/,
    /prescribe/,
    /diagnosis/,
    /you have/,
    /you don't have/
  ]
  
  medicalAdvicePatterns.forEach(pattern => {
    if (pattern.test(lowerResponse)) {
      warnings.push('Response may contain medical advice')
      suggestions.push('Add disclaimer about consulting healthcare provider')
    }
  })
  
  // Check for definitive statements
  const definitivePatterns = [
    /definitely/,
    /certainly/,
    /absolutely/,
    /without a doubt/,
    /guaranteed/
  ]
  
  definitivePatterns.forEach(pattern => {
    if (pattern.test(lowerResponse)) {
      warnings.push('Response contains definitive statements')
      suggestions.push('Use more cautious language')
    }
  })
  
  // Check for missing disclaimers
  if (!lowerResponse.includes('disclaimer') && !lowerResponse.includes('consult') && !lowerResponse.includes('healthcare provider')) {
    warnings.push('Missing medical disclaimer')
    suggestions.push('Add disclaimer about consulting healthcare provider')
  }
  
  return {
    isSafe: warnings.length === 0,
    warnings,
    suggestions
  }
}

// Generate safety-enhanced response
export function enhanceResponseWithSafety(response: string, safetyCheck: SafetyCheck): string {
  let enhancedResponse = response
  
  // Add emergency message if needed
  if (safetyCheck.isEmergency && safetyCheck.emergencyMessage) {
    enhancedResponse = safetyCheck.emergencyMessage + '\n\n' + enhancedResponse
  }
  
  // Add doctor consultation suggestion if needed
  if (safetyCheck.requiresDoctor && !safetyCheck.isEmergency) {
    enhancedResponse += '\n\n⚠️ **Important**: Please contact your healthcare provider for personalized medical advice.'
  }
  
  // Add general disclaimer if not present
  if (!enhancedResponse.toLowerCase().includes('disclaimer')) {
    enhancedResponse += '\n\n⚠️ **Disclaimer**: This information is for educational purposes only and is not a substitute for professional medical advice. Always consult your healthcare provider for medical concerns.'
  }
  
  return enhancedResponse
}

// Get risk level color for UI
export function getRiskLevelColor(riskLevel: string): string {
  switch (riskLevel) {
    case 'critical':
      return 'text-red-600 bg-red-50 border-red-200'
    case 'high':
      return 'text-orange-600 bg-orange-50 border-orange-200'
    case 'medium':
      return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    case 'low':
      return 'text-green-600 bg-green-50 border-green-200'
    default:
      return 'text-gray-600 bg-gray-50 border-gray-200'
  }
}

// Get risk level icon for UI
export function getRiskLevelIcon(riskLevel: string): string {
  switch (riskLevel) {
    case 'critical':
      return '🚨'
    case 'high':
      return '⚠️'
    case 'medium':
      return '⚡'
    case 'low':
      return '✅'
    default:
      return '❓'
  }
}
