"use client"

import { useState, useEffect } from 'react'
import { useUser as useClerkUser } from '@clerk/nextjs'
import { supabase, Tables, Inserts, Updates } from '@/lib/supabase'

type SupabaseUser = Tables<'users'>
type UserInsert = Inserts<'users'>
type UserUpdate = Updates<'users'>

// Combined user profile type
export interface UserProfile {
  // Clerk data
  clerkId: string
  email: string
  firstName: string
  lastName: string
  fullName: string
  imageUrl: string
  createdAt: Date
  lastSignInAt: Date | null
  
  // Supabase health data
  id: string
  dueDate: string | null
  bloodType: string | null
  pregnancyWeek: number | null
  profileComplete: boolean
  onboardingCompleted: boolean
  lastAssessmentDate: string | null
  createdAtSupabase: string
  updatedAt: string
}

export function useUserProfile() {
  const { user: clerkUser, isLoaded: clerkLoaded } = useClerkUser()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch or create user profile
  const fetchOrCreateProfile = async () => {
    if (!clerkUser || !clerkLoaded) return

    try {
      setLoading(true)
      setError(null)

      // First, try to fetch existing user
      const { data: existingUser, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('clerk_user_id', clerkUser.id)
        .single()

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError
      }

      if (existingUser) {
        const combinedProfile = combineUserData(clerkUser, existingUser)
        setProfile(combinedProfile)
        return combinedProfile
      }

      // If user doesn't exist, create new user
      const newUser: UserInsert = {
        clerk_user_id: clerkUser.id,
        name: clerkUser.fullName || clerkUser.firstName || 'User',
        email: clerkUser.primaryEmailAddress?.emailAddress || '',
        due_date: null,
        blood_type: null,
        pregnancy_week: null,
        profile_complete: false,
        onboarding_completed: false,
        last_assessment_date: null
      }

      const { data: createdUser, error: createError } = await supabase
        .from('users')
        .insert([newUser])
        .select()
        .single()

      if (createError) throw createError

      const combinedProfile = combineUserData(clerkUser, createdUser)
      setProfile(combinedProfile)
      return combinedProfile
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch/create user profile'
      setError(errorMessage)
      console.error('Error in fetchOrCreateProfile:', {
        message: errorMessage,
        error: err instanceof Error ? err.message : String(err),
        stack: err instanceof Error ? err.stack : undefined
      })
      return null
    } finally {
      setLoading(false)
    }
  }

  // Update user profile
  const updateProfile = async (updates: Partial<UserUpdate>) => {
    if (!profile) return

    try {
      setError(null)

      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', profile.id)
        .select()
        .single()

      if (error) throw error

      if (clerkUser) {
        const updatedProfile = combineUserData(clerkUser, data)
        setProfile(updatedProfile)
        return updatedProfile
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile')
      throw err
    }
  }

  // Update pregnancy information
  const updatePregnancyInfo = async (dueDate: string, pregnancyWeek: number) => {
    return updateProfile({
      due_date: dueDate,
      pregnancy_week: pregnancyWeek,
      profile_complete: true
    })
  }

  // Update blood type
  const updateBloodType = async (bloodType: string) => {
    return updateProfile({
      blood_type: bloodType
    })
  }

  // Complete onboarding
  const completeOnboarding = async (onboardingData: {
    dueDate: string
    bloodType: string
    medicalHistory?: string[]
    emergencyContacts?: Array<{
      name: string
      relationship: string
      phone: string
      priority: 'high' | 'medium' | 'low'
    }>
  }) => {
    const pregnancyWeek = calculatePregnancyWeek(onboardingData.dueDate)
    
    // Update user profile
    const updatedProfile = await updateProfile({
      due_date: onboardingData.dueDate,
      blood_type: onboardingData.bloodType,
      pregnancy_week: pregnancyWeek,
      profile_complete: true,
      onboarding_completed: true
    })

    // Save emergency contacts if provided
    if (onboardingData.emergencyContacts && onboardingData.emergencyContacts.length > 0 && profile) {
      try {
        const emergencyContactsData = onboardingData.emergencyContacts.map(contact => ({
          user_id: profile.id,
          name: contact.name,
          relationship: contact.relationship,
          phone: contact.phone,
          priority: contact.priority
        }))

        const { error } = await supabase
          .from('emergency_contacts')
          .insert(emergencyContactsData)

        if (error) {
          console.error('Error saving emergency contacts:', error)
          // Don't throw error here, as the main profile update was successful
        }
      } catch (err) {
        console.error('Error saving emergency contacts:', err)
        // Don't throw error here, as the main profile update was successful
      }
    }

    return updatedProfile
  }

  // Update last assessment date
  const updateLastAssessment = async () => {
    return updateProfile({
      last_assessment_date: new Date().toISOString()
    })
  }

  // Calculate current pregnancy week based on due date
  const calculatePregnancyWeek = (dueDate: string) => {
    const due = new Date(dueDate)
    const today = new Date()
    const diffTime = due.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    const weeks = Math.floor((280 - diffDays) / 7)
    return Math.max(0, Math.min(42, weeks))
  }

  // Get current pregnancy week
  const getCurrentPregnancyWeek = () => {
    if (!profile?.dueDate) return null
    return calculatePregnancyWeek(profile.dueDate)
  }

  // Get pregnancy progress percentage
  const getPregnancyProgress = () => {
    if (!profile?.dueDate) return 0
    const currentWeek = getCurrentPregnancyWeek()
    if (currentWeek === null) return 0
    return Math.min(100, (currentWeek / 40) * 100)
  }

  // Get trimester
  const getTrimester = () => {
    const currentWeek = getCurrentPregnancyWeek()
    if (currentWeek === null) return null

    if (currentWeek <= 12) return 1
    if (currentWeek <= 26) return 2
    return 3
  }

  // Get days until due date
  const getDaysUntilDue = () => {
    if (!profile?.dueDate) return null
    const due = new Date(profile.dueDate)
    const today = new Date()
    const diffTime = due.getTime() - today.getTime()
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  // Check if profile needs onboarding
  const needsOnboarding = () => {
    return !profile?.onboardingCompleted || !profile?.profileComplete
  }

  // Check if profile is complete
  const isProfileComplete = () => {
    return profile?.profileComplete && profile?.onboardingCompleted
  }

  // Combine Clerk and Supabase user data
  const combineUserData = (clerkUser: any, supabaseUser: SupabaseUser): UserProfile => {
    return {
      // Clerk data
      clerkId: clerkUser.id,
      email: clerkUser.primaryEmailAddress?.emailAddress || '',
      firstName: clerkUser.firstName || '',
      lastName: clerkUser.lastName || '',
      fullName: clerkUser.fullName || '',
      imageUrl: clerkUser.imageUrl || '',
      createdAt: new Date(clerkUser.createdAt),
      lastSignInAt: clerkUser.lastSignInAt ? new Date(clerkUser.lastSignInAt) : null,
      
      // Supabase data
      id: supabaseUser.id,
      dueDate: supabaseUser.due_date,
      bloodType: supabaseUser.blood_type,
      pregnancyWeek: supabaseUser.pregnancy_week,
      profileComplete: supabaseUser.profile_complete,
      onboardingCompleted: supabaseUser.onboarding_completed,
      lastAssessmentDate: supabaseUser.last_assessment_date,
      createdAtSupabase: supabaseUser.created_at,
      updatedAt: supabaseUser.updated_at
    }
  }

  useEffect(() => {
    if (clerkUser && clerkLoaded) {
      fetchOrCreateProfile()
    }
  }, [clerkUser, clerkLoaded])

  return {
    profile,
    loading,
    error,
    updateProfile,
    updatePregnancyInfo,
    updateBloodType,
    completeOnboarding,
    updateLastAssessment,
    getCurrentPregnancyWeek,
    getPregnancyProgress,
    getTrimester,
    getDaysUntilDue,
    needsOnboarding,
    isProfileComplete,
    refetch: fetchOrCreateProfile
  }
}
