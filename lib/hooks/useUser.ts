"use client"

import { useState, useEffect } from 'react'
import { useUser as useClerkUser } from '@clerk/nextjs'
import { supabase, Tables, Inserts, Updates } from '@/lib/supabase'

type User = Tables<'users'>
type UserInsert = Inserts<'users'>
type UserUpdate = Updates<'users'>

export function useUser() {
  const { user: clerkUser, isLoaded } = useClerkUser()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch or create user
  const fetchOrCreateUser = async () => {
    if (!clerkUser || !isLoaded) return

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
        setUser(existingUser)
        return existingUser
      }

      // If user doesn't exist, create new user
      const newUser: UserInsert = {
        clerk_user_id: clerkUser.id,
        name: clerkUser.fullName || clerkUser.firstName || 'User',
        email: clerkUser.primaryEmailAddress?.emailAddress || '',
        due_date: null,
        blood_type: null,
        pregnancy_week: null
      }

      const { data: createdUser, error: createError } = await supabase
        .from('users')
        .insert([newUser])
        .select()
        .single()

      if (createError) throw createError

      setUser(createdUser)
      return createdUser
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch/create user')
      console.error('Error in fetchOrCreateUser:', err)
    } finally {
      setLoading(false)
    }
  }

  // Update user
  const updateUser = async (updates: UserUpdate) => {
    if (!user) return

    try {
      setError(null)

      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single()

      if (error) throw error

      setUser(data)
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update user')
      throw err
    }
  }

  // Update pregnancy information
  const updatePregnancyInfo = async (dueDate: string, pregnancyWeek: number) => {
    return updateUser({
      due_date: dueDate,
      pregnancy_week: pregnancyWeek
    })
  }

  // Update blood type
  const updateBloodType = async (bloodType: string) => {
    return updateUser({
      blood_type: bloodType
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
    if (!user?.due_date) return null
    return calculatePregnancyWeek(user.due_date)
  }

  // Get pregnancy progress percentage
  const getPregnancyProgress = () => {
    if (!user?.due_date) return 0
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
    if (!user?.due_date) return null
    const due = new Date(user.due_date)
    const today = new Date()
    const diffTime = due.getTime() - today.getTime()
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  useEffect(() => {
    if (clerkUser && isLoaded) {
      fetchOrCreateUser()
    }
  }, [clerkUser, isLoaded])

  return {
    user,
    loading,
    error,
    updateUser,
    updatePregnancyInfo,
    updateBloodType,
    getCurrentPregnancyWeek,
    getPregnancyProgress,
    getTrimester,
    getDaysUntilDue,
    refetch: fetchOrCreateUser
  }
}
