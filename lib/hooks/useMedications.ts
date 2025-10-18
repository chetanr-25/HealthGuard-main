"use client"

import { useState, useEffect } from 'react'
import { useUser } from '@/lib/hooks/useUser'
import { supabase, Tables, Inserts, Updates } from '@/lib/supabase'

type Medication = Tables<'medications'>
type MedicationInsert = Inserts<'medications'>
type MedicationUpdate = Updates<'medications'>
type MedicationLog = Tables<'medication_logs'>
type MedicationLogInsert = Inserts<'medication_logs'>
type MedicationLogUpdate = Updates<'medication_logs'>

export function useMedications() {
  const { user } = useUser()
  const [medications, setMedications] = useState<Medication[]>([])
  const [medicationLogs, setMedicationLogs] = useState<MedicationLog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)


  // Fetch medications
  const fetchMedications = async () => {
    if (!user) return

    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from('medications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setMedications(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch medications')
    } finally {
      setLoading(false)
    }
  }

  // Fetch medication logs
  const fetchMedicationLogs = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('medication_logs')
        .select(`
          *,
          medications!inner(user_id)
        `)
        .eq('medications.user_id', user.id)
        .order('scheduled_time', { ascending: false })

      if (error) throw error
      setMedicationLogs(data || [])
    } catch (err) {
      console.error('Error fetching medication logs:', err)
    }
  }

  // Add medication
  const addMedication = async (medication: Omit<MedicationInsert, 'user_id'>) => {
    if (!user) return

    try {
      setError(null)

      const { data, error } = await supabase
        .from('medications')
        .insert([{ ...medication, user_id: user.id }])
        .select()
        .single()

      if (error) throw error

      setMedications(prev => [data, ...prev])
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add medication')
      throw err
    }
  }

  // Update medication
  const updateMedication = async (id: string, updates: MedicationUpdate) => {
    try {
      setError(null)

      const { data, error } = await supabase
        .from('medications')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      setMedications(prev => 
        prev.map(med => med.id === id ? data : med)
      )
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update medication')
      throw err
    }
  }

  // Delete medication
  const deleteMedication = async (id: string) => {
    try {
      setError(null)

      const { error } = await supabase
        .from('medications')
        .delete()
        .eq('id', id)

      if (error) throw error

      setMedications(prev => prev.filter(med => med.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete medication')
      throw err
    }
  }

  // Add medication log
  const addMedicationLog = async (log: MedicationLogInsert) => {
    try {
      setError(null)

      const { data, error } = await supabase
        .from('medication_logs')
        .insert([log])
        .select()
        .single()

      if (error) throw error

      setMedicationLogs(prev => [data, ...prev])
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add medication log')
      throw err
    }
  }

  // Update medication log
  const updateMedicationLog = async (id: string, updates: MedicationLogUpdate) => {
    try {
      setError(null)

      const { data, error } = await supabase
        .from('medication_logs')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      setMedicationLogs(prev => 
        prev.map(log => log.id === id ? data : log)
      )
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update medication log')
      throw err
    }
  }

  // Mark medication as taken
  const markMedicationTaken = async (logId: string) => {
    return updateMedicationLog(logId, {
      taken_time: new Date().toISOString(),
      status: 'taken'
    })
  }

  // Mark medication as missed
  const markMedicationMissed = async (logId: string) => {
    return updateMedicationLog(logId, {
      status: 'missed'
    })
  }

  // Get active medications
  const getActiveMedications = () => {
    return medications.filter(med => med.active)
  }

  // Get today's medication logs
  const getTodaysMedicationLogs = () => {
    const today = new Date().toISOString().split('T')[0]
    return medicationLogs.filter(log => 
      log.scheduled_time.startsWith(today)
    )
  }

  // Get pending medications for today
  const getTodaysPendingMedications = () => {
    return getTodaysMedicationLogs().filter(log => log.status === 'pending')
  }

  useEffect(() => {
    if (user) {
      fetchMedications()
      fetchMedicationLogs()
    }
  }, [user])

  return {
    medications,
    medicationLogs,
    loading,
    error,
    addMedication,
    updateMedication,
    deleteMedication,
    addMedicationLog,
    updateMedicationLog,
    markMedicationTaken,
    markMedicationMissed,
    getActiveMedications,
    getTodaysMedicationLogs,
    getTodaysPendingMedications,
    refetch: () => {
      fetchMedications()
      fetchMedicationLogs()
    }
  }
}
