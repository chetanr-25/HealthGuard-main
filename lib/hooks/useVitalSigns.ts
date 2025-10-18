"use client"

import { useState, useEffect } from 'react'
import { useUser } from '@/lib/hooks/useUser'
import { supabase, Tables, Inserts, Updates } from '@/lib/supabase'

type VitalSign = Tables<'vital_signs'>
type VitalSignInsert = Inserts<'vital_signs'>
type VitalSignUpdate = Updates<'vital_signs'>

export function useVitalSigns() {
  const { user } = useUser()
  const [vitalSigns, setVitalSigns] = useState<VitalSign[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch vital signs
  const fetchVitalSigns = async () => {
    if (!user) return

    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from('vital_signs')
        .select('*')
        .eq('user_id', user.id)
        .order('timestamp', { ascending: false })

      if (error) throw error
      setVitalSigns(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch vital signs')
    } finally {
      setLoading(false)
    }
  }

  // Add vital sign
  const addVitalSign = async (vitalSign: Omit<VitalSignInsert, 'user_id'>) => {
    if (!user) return

    try {
      setError(null)

      const { data, error } = await supabase
        .from('vital_signs')
        .insert([{ ...vitalSign, user_id: user.id }])
        .select()
        .single()

      if (error) throw error

      setVitalSigns(prev => [data, ...prev])
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add vital sign')
      throw err
    }
  }

  // Update vital sign
  const updateVitalSign = async (id: string, updates: VitalSignUpdate) => {
    try {
      setError(null)

      const { data, error } = await supabase
        .from('vital_signs')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      setVitalSigns(prev => 
        prev.map(vs => vs.id === id ? data : vs)
      )
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update vital sign')
      throw err
    }
  }

  // Delete vital sign
  const deleteVitalSign = async (id: string) => {
    try {
      setError(null)

      const { error } = await supabase
        .from('vital_signs')
        .delete()
        .eq('id', id)

      if (error) throw error

      setVitalSigns(prev => prev.filter(vs => vs.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete vital sign')
      throw err
    }
  }

  // Get vital signs by type
  const getVitalSignsByType = (type: string) => {
    return vitalSigns.filter(vs => vs.type === type)
  }

  // Get latest vital sign by type
  const getLatestVitalSign = (type: string) => {
    return vitalSigns.find(vs => vs.type === type)
  }

  // Get vital signs for date range
  const getVitalSignsByDateRange = (startDate: string, endDate: string) => {
    return vitalSigns.filter(vs => 
      vs.timestamp >= startDate && vs.timestamp <= endDate
    )
  }

  useEffect(() => {
    if (user) {
      fetchVitalSigns()
    }
  }, [user])

  // Set up real-time subscription
  useEffect(() => {
    if (!user) return

    const channel = supabase
      .channel('vital-signs-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'vital_signs',
          filter: `user_id=eq.${user.id}`
        },
        () => {
          // Refetch data when changes occur
          fetchVitalSigns()
        }
      )
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }, [user])

  return {
    vitalSigns,
    loading,
    error,
    addVitalSign,
    updateVitalSign,
    deleteVitalSign,
    getVitalSignsByType,
    getLatestVitalSign,
    getVitalSignsByDateRange,
    refetch: fetchVitalSigns
  }
}
