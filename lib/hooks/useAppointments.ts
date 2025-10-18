"use client"

import { useState, useEffect } from 'react'
import { useUser } from '@/lib/hooks/useUser'
import { supabase, Tables, Inserts, Updates } from '@/lib/supabase'

type Appointment = Tables<'appointments'>
type AppointmentInsert = Inserts<'appointments'>
type AppointmentUpdate = Updates<'appointments'>

export function useAppointments() {
  const { user } = useUser()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)


  // Fetch appointments
  const fetchAppointments = async () => {
    if (!user) return

    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: true })
        .order('time', { ascending: true })

      if (error) throw error
      setAppointments(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch appointments')
    } finally {
      setLoading(false)
    }
  }

  // Add appointment
  const addAppointment = async (appointment: Omit<AppointmentInsert, 'user_id'>) => {
    if (!user) return

    try {
      setError(null)

      const { data, error } = await supabase
        .from('appointments')
        .insert([{ ...appointment, user_id: user.id }])
        .select()
        .single()

      if (error) throw error

      setAppointments(prev => [...prev, data].sort((a, b) => 
        new Date(a.date).getTime() - new Date(b.date).getTime()
      ))
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add appointment')
      throw err
    }
  }

  // Update appointment
  const updateAppointment = async (id: string, updates: AppointmentUpdate) => {
    try {
      setError(null)

      const { data, error } = await supabase
        .from('appointments')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      setAppointments(prev => 
        prev.map(apt => apt.id === id ? data : apt)
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      )
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update appointment')
      throw err
    }
  }

  // Delete appointment
  const deleteAppointment = async (id: string) => {
    try {
      setError(null)

      const { error } = await supabase
        .from('appointments')
        .delete()
        .eq('id', id)

      if (error) throw error

      setAppointments(prev => prev.filter(apt => apt.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete appointment')
      throw err
    }
  }

  // Mark appointment as completed
  const markAppointmentCompleted = async (id: string) => {
    return updateAppointment(id, { status: 'completed' })
  }

  // Cancel appointment
  const cancelAppointment = async (id: string) => {
    return updateAppointment(id, { status: 'cancelled' })
  }

  // Get upcoming appointments
  const getUpcomingAppointments = () => {
    const today = new Date().toISOString().split('T')[0]
    return appointments.filter(apt => 
      apt.date >= today && apt.status === 'scheduled'
    )
  }

  // Get appointments for specific date
  const getAppointmentsForDate = (date: string) => {
    return appointments.filter(apt => apt.date === date)
  }

  // Get appointments for date range
  const getAppointmentsForDateRange = (startDate: string, endDate: string) => {
    return appointments.filter(apt => 
      apt.date >= startDate && apt.date <= endDate
    )
  }

  // Get appointments by type
  const getAppointmentsByType = (type: string) => {
    return appointments.filter(apt => apt.type === type)
  }

  // Get next appointment
  const getNextAppointment = () => {
    const upcoming = getUpcomingAppointments()
    return upcoming.length > 0 ? upcoming[0] : null
  }

  // Get appointments for current week
  const getCurrentWeekAppointments = () => {
    const today = new Date()
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()))
    const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6))
    
    return getAppointmentsForDateRange(
      startOfWeek.toISOString().split('T')[0],
      endOfWeek.toISOString().split('T')[0]
    )
  }

  useEffect(() => {
    if (user) {
      fetchAppointments()
    }
  }, [user])

  return {
    appointments,
    loading,
    error,
    addAppointment,
    updateAppointment,
    deleteAppointment,
    markAppointmentCompleted,
    cancelAppointment,
    getUpcomingAppointments,
    getAppointmentsForDate,
    getAppointmentsForDateRange,
    getAppointmentsByType,
    getNextAppointment,
    getCurrentWeekAppointments,
    refetch: fetchAppointments
  }
}
