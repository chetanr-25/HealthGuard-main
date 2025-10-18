"use client"

import { useState, useEffect, useCallback } from 'react'
import { useUserProfile } from './useUserProfile'
import { useVitalSigns } from './useVitalSigns'
import { useMedications } from './useMedications'
import { useEmergencyContacts } from './useEmergencyContacts'
import { healthRiskAgent, RiskAssessment, HealthDataInput } from '@/lib/aiAgent'

interface AssessmentCache {
  assessment: RiskAssessment
  timestamp: number
  userId: string
}

const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

export function useHealthRiskAssessment() {
  const { profile, updateLastAssessment } = useUserProfile()
  const { vitalSigns, getLatestVitalSign } = useVitalSigns()
  const { medications } = useMedications()
  const { emergencyContacts } = useEmergencyContacts()
  
  const [assessment, setAssessment] = useState<RiskAssessment | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastAssessmentDate, setLastAssessmentDate] = useState<Date | null>(null)

  // Check if assessment is cached and still valid
  const getCachedAssessment = useCallback((): RiskAssessment | null => {
    if (!profile) return null

    try {
      const cached = localStorage.getItem(`health_assessment_${profile.id}`)
      if (!cached) return null

      const cacheData: AssessmentCache = JSON.parse(cached)
      const now = Date.now()
      
      // Check if cache is still valid and for the same user
      if (now - cacheData.timestamp < CACHE_DURATION && cacheData.userId === profile.id) {
        return cacheData.assessment
      } else {
        // Remove expired cache
        localStorage.removeItem(`health_assessment_${profile.id}`)
        return null
      }
    } catch (error) {
      console.error('Error reading cached assessment:', error)
      return null
    }
  }, [profile])

  // Cache assessment result
  const cacheAssessment = useCallback((assessment: RiskAssessment) => {
    if (!profile) return

    try {
      const cacheData: AssessmentCache = {
        assessment,
        timestamp: Date.now(),
        userId: profile.id
      }
      localStorage.setItem(`health_assessment_${profile.id}`, JSON.stringify(cacheData))
    } catch (error) {
      console.error('Error caching assessment:', error)
    }
  }, [profile])

  // Prepare health data for AI analysis
  const prepareHealthData = useCallback((): HealthDataInput => {
    const latestHeartRate = getLatestVitalSign('heart_rate')
    const latestBloodPressure = getLatestVitalSign('blood_pressure')
    const latestWeight = getLatestVitalSign('weight')
    const latestTemperature = getLatestVitalSign('temperature')

    return {
      vitals: {
        heartRate: latestHeartRate?.value,
        bloodPressure: latestBloodPressure?.value ? {
          systolic: latestBloodPressure.value,
          diastolic: latestBloodPressure.value * 0.7 // Estimate diastolic
        } : undefined,
        weight: latestWeight?.value,
        temperature: latestTemperature?.value,
        lastUpdated: latestHeartRate?.timestamp || new Date().toISOString()
      },
      medications: medications.map(med => ({
        name: med.name,
        dosage: med.dosage,
        frequency: med.frequency,
        active: med.active
      })),
      pregnancyInfo: {
        dueDate: profile?.dueDate || undefined,
        currentWeek: profile?.pregnancyWeek || undefined,
        bloodType: profile?.bloodType || undefined
      },
      medicalHistory: {
        conditions: [], // TODO: Add medical history from profile
        allergies: [], // TODO: Add allergies from profile
        previousPregnancies: 0, // TODO: Add from profile
        complications: [] // TODO: Add from profile
      },
      recentSymptoms: [] // TODO: Add symptoms tracking
    }
  }, [profile, getLatestVitalSign, medications])

  // Run health risk assessment
  const runAssessment = useCallback(async (forceRefresh = false) => {
    if (!profile) {
      setError('User profile not available')
      return
    }

    // Check cache first unless force refresh
    if (!forceRefresh) {
      const cached = getCachedAssessment()
      if (cached) {
        setAssessment(cached)
        setLastAssessmentDate(new Date())
        return
      }
    }

    try {
      setLoading(true)
      setError(null)

      const healthData = prepareHealthData()
      const assessmentResult = await healthRiskAgent.assessHealthRisk(healthData)
      
      setAssessment(assessmentResult)
      setLastAssessmentDate(new Date())
      
      // Cache the result
      cacheAssessment(assessmentResult)
      
      // Update last assessment date in profile
      await updateLastAssessment()
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to run health assessment')
      console.error('Error running health assessment:', err)
    } finally {
      setLoading(false)
    }
  }, [profile, getCachedAssessment, prepareHealthData, cacheAssessment, updateLastAssessment])

  // Load cached assessment on mount
  useEffect(() => {
    if (profile) {
      const cached = getCachedAssessment()
      if (cached) {
        setAssessment(cached)
        setLastAssessmentDate(new Date())
      }
    }
  }, [profile, getCachedAssessment])

  // Auto-run assessment when profile is complete and no cached assessment exists
  useEffect(() => {
    if (profile?.profileComplete && !assessment && !loading) {
      runAssessment()
    }
  }, [profile?.profileComplete, assessment, loading, runAssessment])

  // Check if assessment is due for refresh
  const isAssessmentStale = useCallback(() => {
    if (!lastAssessmentDate) return true
    const now = Date.now()
    const assessmentTime = lastAssessmentDate.getTime()
    return now - assessmentTime > CACHE_DURATION
  }, [lastAssessmentDate])

  // Get assessment status
  const getAssessmentStatus = () => {
    if (loading) return 'loading'
    if (error) return 'error'
    if (!assessment) return 'no-data'
    if (isAssessmentStale()) return 'stale'
    return 'current'
  }

  // Get risk level styling
  const getRiskStyling = () => {
    if (!assessment) return {}
    
    return {
      score: assessment.overallRiskScore,
      level: assessment.riskLevel,
      color: assessment.riskLevel === 'high' ? 'text-red-600' : 
             assessment.riskLevel === 'moderate' ? 'text-yellow-600' : 'text-green-600',
      bgColor: assessment.riskLevel === 'high' ? 'bg-red-50' : 
               assessment.riskLevel === 'moderate' ? 'bg-yellow-50' : 'bg-green-50',
      borderColor: assessment.riskLevel === 'high' ? 'border-red-200' : 
                   assessment.riskLevel === 'moderate' ? 'border-yellow-200' : 'border-green-200'
    }
  }

  // Clear assessment cache
  const clearCache = useCallback(() => {
    if (profile) {
      localStorage.removeItem(`health_assessment_${profile.id}`)
      setAssessment(null)
      setLastAssessmentDate(null)
    }
  }, [profile])

  return {
    assessment,
    loading,
    error,
    lastAssessmentDate,
    runAssessment,
    clearCache,
    isAssessmentStale: isAssessmentStale(),
    getAssessmentStatus,
    getRiskStyling,
    canRunAssessment: !!profile?.profileComplete
  }
}
