import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          clerk_user_id: string
          name: string
          email: string
          due_date: string | null
          blood_type: string | null
          pregnancy_week: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          clerk_user_id: string
          name: string
          email: string
          due_date?: string | null
          blood_type?: string | null
          pregnancy_week?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          clerk_user_id?: string
          name?: string
          email?: string
          due_date?: string | null
          blood_type?: string | null
          pregnancy_week?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      vital_signs: {
        Row: {
          id: string
          user_id: string
          type: string
          value: number
          unit: string
          timestamp: string
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: string
          value: number
          unit: string
          timestamp: string
          status: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: string
          value?: number
          unit?: string
          timestamp?: string
          status?: string
          created_at?: string
        }
      }
      medications: {
        Row: {
          id: string
          user_id: string
          name: string
          dosage: string
          frequency: string
          times: string[]
          active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          dosage: string
          frequency: string
          times: string[]
          active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          dosage?: string
          frequency?: string
          times?: string[]
          active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      medication_logs: {
        Row: {
          id: string
          medication_id: string
          scheduled_time: string
          taken_time: string | null
          status: 'pending' | 'taken' | 'missed'
          created_at: string
        }
        Insert: {
          id?: string
          medication_id: string
          scheduled_time: string
          taken_time?: string | null
          status?: 'pending' | 'taken' | 'missed'
          created_at?: string
        }
        Update: {
          id?: string
          medication_id?: string
          scheduled_time?: string
          taken_time?: string | null
          status?: 'pending' | 'taken' | 'missed'
          created_at?: string
        }
      }
      appointments: {
        Row: {
          id: string
          user_id: string
          doctor_name: string
          date: string
          time: string
          location: string
          type: string
          status: 'scheduled' | 'completed' | 'cancelled'
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          doctor_name: string
          date: string
          time: string
          location: string
          type: string
          status?: 'scheduled' | 'completed' | 'cancelled'
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          doctor_name?: string
          date?: string
          time?: string
          location?: string
          type?: string
          status?: 'scheduled' | 'completed' | 'cancelled'
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      emergency_contacts: {
        Row: {
          id: string
          user_id: string
          name: string
          relationship: string
          phone: string
          priority: 'high' | 'medium' | 'low'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          relationship: string
          phone: string
          priority?: 'high' | 'medium' | 'low'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          relationship?: string
          phone?: string
          priority?: 'high' | 'medium' | 'low'
          created_at?: string
          updated_at?: string
        }
      }
      health_records: {
        Row: {
          id: string
          user_id: string
          type: string
          data: any
          uploaded_date: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: string
          data: any
          uploaded_date: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: string
          data?: any
          uploaded_date?: string
          created_at?: string
        }
      }
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Inserts<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type Updates<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']
