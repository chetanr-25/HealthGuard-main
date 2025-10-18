"use client"

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { supabase } from '@/lib/supabase'
import { RealtimeChannel } from '@supabase/supabase-js'

export function useRealtimeVitalSigns() {
  const { user } = useUser()
  const [channel, setChannel] = useState<RealtimeChannel | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    if (!user) return

    // Create real-time channel for vital signs
    const vitalSignsChannel = supabase
      .channel('vital-signs-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'vital_signs',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          console.log('Vital signs change received:', payload)
          // You can dispatch custom events or update state here
          // This will be handled by the individual hooks that subscribe to this
        }
      )
      .subscribe((status) => {
        console.log('Vital signs channel status:', status)
        setIsConnected(status === 'SUBSCRIBED')
      })

    setChannel(vitalSignsChannel)

    return () => {
      vitalSignsChannel.unsubscribe()
      setChannel(null)
      setIsConnected(false)
    }
  }, [user])

  return {
    channel,
    isConnected
  }
}
