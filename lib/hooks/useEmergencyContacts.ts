"use client"

import { useState, useEffect } from 'react'
import { useUser } from '@/lib/hooks/useUser'
import { supabase, Tables, Inserts, Updates } from '@/lib/supabase'

type EmergencyContact = Tables<'emergency_contacts'>
type EmergencyContactInsert = Inserts<'emergency_contacts'>
type EmergencyContactUpdate = Updates<'emergency_contacts'>

export function useEmergencyContacts() {
  const { user } = useUser()
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)


  // Fetch emergency contacts
  const fetchEmergencyContacts = async () => {
    if (!user) return

    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from('emergency_contacts')
        .select('*')
        .eq('user_id', user.id)
        .order('priority', { ascending: true })
        .order('name', { ascending: true })

      if (error) throw error
      setEmergencyContacts(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch emergency contacts')
    } finally {
      setLoading(false)
    }
  }

  // Add emergency contact
  const addEmergencyContact = async (contact: Omit<EmergencyContactInsert, 'user_id'>) => {
    if (!user) return

    try {
      setError(null)

      const { data, error } = await supabase
        .from('emergency_contacts')
        .insert([{ ...contact, user_id: user.id }])
        .select()
        .single()

      if (error) throw error

      setEmergencyContacts(prev => [...prev, data].sort((a, b) => {
        const priorityOrder = { high: 0, medium: 1, low: 2 }
        return priorityOrder[a.priority] - priorityOrder[b.priority]
      }))
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add emergency contact')
      throw err
    }
  }

  // Update emergency contact
  const updateEmergencyContact = async (id: string, updates: EmergencyContactUpdate) => {
    try {
      setError(null)

      const { data, error } = await supabase
        .from('emergency_contacts')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      setEmergencyContacts(prev => 
        prev.map(contact => contact.id === id ? data : contact)
          .sort((a, b) => {
            const priorityOrder = { high: 0, medium: 1, low: 2 }
            return priorityOrder[a.priority] - priorityOrder[b.priority]
          })
      )
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update emergency contact')
      throw err
    }
  }

  // Delete emergency contact
  const deleteEmergencyContact = async (id: string) => {
    try {
      setError(null)

      const { error } = await supabase
        .from('emergency_contacts')
        .delete()
        .eq('id', id)

      if (error) throw error

      setEmergencyContacts(prev => prev.filter(contact => contact.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete emergency contact')
      throw err
    }
  }

  // Get high priority contacts
  const getHighPriorityContacts = () => {
    return emergencyContacts.filter(contact => contact.priority === 'high')
  }

  // Get contacts by priority
  const getContactsByPriority = (priority: 'high' | 'medium' | 'low') => {
    return emergencyContacts.filter(contact => contact.priority === priority)
  }

  // Get contacts by relationship
  const getContactsByRelationship = (relationship: string) => {
    return emergencyContacts.filter(contact => 
      contact.relationship.toLowerCase().includes(relationship.toLowerCase())
    )
  }

  // Get primary emergency contact (first high priority contact)
  const getPrimaryEmergencyContact = () => {
    const highPriority = getHighPriorityContacts()
    return highPriority.length > 0 ? highPriority[0] : null
  }

  // Search contacts
  const searchContacts = (query: string) => {
    const lowercaseQuery = query.toLowerCase()
    return emergencyContacts.filter(contact => 
      contact.name.toLowerCase().includes(lowercaseQuery) ||
      contact.relationship.toLowerCase().includes(lowercaseQuery) ||
      contact.phone.includes(query)
    )
  }

  useEffect(() => {
    if (user) {
      fetchEmergencyContacts()
    }
  }, [user])

  return {
    emergencyContacts,
    loading,
    error,
    addEmergencyContact,
    updateEmergencyContact,
    deleteEmergencyContact,
    getHighPriorityContacts,
    getContactsByPriority,
    getContactsByRelationship,
    getPrimaryEmergencyContact,
    searchContacts,
    refetch: fetchEmergencyContacts
  }
}
