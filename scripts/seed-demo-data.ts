import { createClient } from '@supabase/supabase-js'

// Demo user data for hackathon
const DEMO_USER_DATA = {
  clerk_user_id: 'demo_user_123',
  name: 'Sarah Johnson',
  email: 'sarah.johnson@demo.com',
  due_date: '2024-03-15', // 24 weeks from now
  blood_type: 'O+',
  pregnancy_week: 24,
  profile_complete: true,
  onboarding_completed: true,
  last_assessment_date: new Date().toISOString(),
}

const DEMO_MEDICATIONS = [
  {
    name: 'Prenatal Vitamins',
    dosage: '1 tablet',
    frequency: 'once_daily',
    times: ['08:00'],
    active: true,
  },
  {
    name: 'Folic Acid',
    dosage: '400mcg',
    frequency: 'once_daily',
    times: ['09:00'],
    active: true,
  },
  {
    name: 'Iron Supplement',
    dosage: '65mg',
    frequency: 'once_daily',
    times: ['14:00'],
    active: true,
  },
  {
    name: 'Calcium',
    dosage: '1000mg',
    frequency: 'twice_daily',
    times: ['10:00', '20:00'],
    active: true,
  },
  {
    name: 'DHA Omega-3',
    dosage: '200mg',
    frequency: 'once_daily',
    times: ['12:00'],
    active: true,
  },
]

const DEMO_APPOINTMENTS = [
  {
    doctor_name: 'Dr. Emily Chen',
    date: '2024-01-15',
    time: '10:00',
    location: 'Women\'s Health Clinic',
    type: 'prenatal',
    status: 'scheduled',
    notes: 'Regular checkup - 24 weeks',
  },
  {
    doctor_name: 'Dr. Michael Rodriguez',
    date: '2024-01-22',
    time: '14:30',
    location: 'Ultrasound Center',
    type: 'ultrasound',
    status: 'scheduled',
    notes: 'Anatomy scan',
  },
]

const DEMO_EMERGENCY_CONTACTS = [
  {
    name: 'John Johnson',
    relationship: 'Husband',
    phone: '+1-555-0123',
    priority: 'high',
  },
  {
    name: 'Dr. Emily Chen',
    relationship: 'OB-GYN',
    phone: '+1-555-0456',
    priority: 'high',
  },
  {
    name: 'Mary Johnson',
    relationship: 'Mother',
    phone: '+1-555-0789',
    priority: 'medium',
  },
]

// Generate 30 days of vital signs history
function generateVitalSignsHistory() {
  const vitalSigns = []
  const today = new Date()
  
  for (let i = 0; i < 30; i++) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    
    // Blood pressure (normal range for pregnancy)
    vitalSigns.push({
      type: 'blood_pressure',
      value: 115 + Math.random() * 10, // systolic
      unit: 'mmHg',
      timestamp: new Date(date.setHours(8, 0, 0, 0)).toISOString(),
      status: 'normal',
    })
    
    vitalSigns.push({
      type: 'blood_pressure',
      value: 70 + Math.random() * 8, // diastolic
      unit: 'mmHg',
      timestamp: new Date(date.setHours(8, 0, 0, 0)).toISOString(),
      status: 'normal',
    })
    
    // Heart rate
    vitalSigns.push({
      type: 'heart_rate',
      value: 75 + Math.random() * 15,
      unit: 'bpm',
      timestamp: new Date(date.setHours(9, 0, 0, 0)).toISOString(),
      status: 'normal',
    })
    
    // Weight (gradual increase during pregnancy)
    const baseWeight = 65 + (i * 0.1) // gradual weight gain
    vitalSigns.push({
      type: 'weight',
      value: baseWeight + Math.random() * 2,
      unit: 'kg',
      timestamp: new Date(date.setHours(7, 0, 0, 0)).toISOString(),
      status: 'normal',
    })
    
    // Temperature
    vitalSigns.push({
      type: 'temperature',
      value: 36.5 + Math.random() * 0.5,
      unit: '°C',
      timestamp: new Date(date.setHours(10, 0, 0, 0)).toISOString(),
      status: 'normal',
    })
  }
  
  return vitalSigns
}

const DEMO_VITAL_SIGNS = generateVitalSignsHistory()

// AI Assessment data
const DEMO_AI_ASSESSMENT = {
  risk_score: 25,
  risk_level: 'low',
  contributing_factors: [
    'Regular prenatal care',
    'Healthy weight gain',
    'Normal blood pressure',
    'Consistent medication adherence',
    'Good nutrition habits'
  ],
  recommendations: [
    'Continue taking prenatal vitamins daily',
    'Maintain regular exercise routine',
    'Stay hydrated throughout the day',
    'Get adequate sleep (7-9 hours)',
    'Attend all scheduled appointments'
  ],
  explanation: 'Your pregnancy is progressing well with low risk indicators. Continue following your healthcare provider\'s recommendations and maintain your healthy lifestyle habits.',
  timestamp: new Date().toISOString(),
}

export async function seedDemoData() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  const supabase = createClient(supabaseUrl, supabaseKey)

  try {
    console.log('🌱 Seeding demo data...')

    // 1. Create demo user
    const { data: user, error: userError } = await supabase
      .from('users')
      .upsert(DEMO_USER_DATA)
      .select()
      .single()

    if (userError) {
      console.error('Error creating user:', userError)
      return
    }

    console.log('✅ Demo user created:', user.name)

    // 2. Create medications
    const medicationsWithUserId = DEMO_MEDICATIONS.map(med => ({
      ...med,
      user_id: user.id,
    }))

    const { data: medications, error: medError } = await supabase
      .from('medications')
      .upsert(medicationsWithUserId)
      .select()

    if (medError) {
      console.error('Error creating medications:', medError)
      return
    }

    console.log('✅ Medications created:', medications.length)

    // 3. Create appointments
    const appointmentsWithUserId = DEMO_APPOINTMENTS.map(apt => ({
      ...apt,
      user_id: user.id,
    }))

    const { data: appointments, error: aptError } = await supabase
      .from('appointments')
      .upsert(appointmentsWithUserId)
      .select()

    if (aptError) {
      console.error('Error creating appointments:', aptError)
      return
    }

    console.log('✅ Appointments created:', appointments.length)

    // 4. Create emergency contacts
    const contactsWithUserId = DEMO_EMERGENCY_CONTACTS.map(contact => ({
      ...contact,
      user_id: user.id,
    }))

    const { data: contacts, error: contactError } = await supabase
      .from('emergency_contacts')
      .upsert(contactsWithUserId)
      .select()

    if (contactError) {
      console.error('Error creating emergency contacts:', contactError)
      return
    }

    console.log('✅ Emergency contacts created:', contacts.length)

    // 5. Create vital signs
    const vitalSignsWithUserId = DEMO_VITAL_SIGNS.map(vital => ({
      ...vital,
      user_id: user.id,
    }))

    const { data: vitalSigns, error: vitalError } = await supabase
      .from('vital_signs')
      .upsert(vitalSignsWithUserId)
      .select()

    if (vitalError) {
      console.error('Error creating vital signs:', vitalError)
      return
    }

    console.log('✅ Vital signs created:', vitalSigns.length)

    // 6. Create medication logs for the past 7 days
    const medicationLogs = []
    const medicationsData = medications as any[]

    for (let i = 0; i < 7; i++) {
      const date = new Date()
      date.setDate(date.getDate() - i)

      for (const medication of medicationsData) {
        const times = medication.times || []
        
        for (const time of times) {
          const [hours, minutes] = time.split(':')
          const scheduledTime = new Date(date)
          scheduledTime.setHours(parseInt(hours), parseInt(minutes), 0, 0)
          
          // Randomly mark some as taken, some as missed
          const status = Math.random() > 0.1 ? 'taken' : 'missed'
          const takenTime = status === 'taken' 
            ? new Date(scheduledTime.getTime() + (Math.random() - 0.5) * 30 * 60 * 1000) // ±15 minutes
            : null

          medicationLogs.push({
            medication_id: medication.id,
            scheduled_time: scheduledTime.toISOString(),
            taken_time: takenTime?.toISOString() || null,
            status,
          })
        }
      }
    }

    const { data: logs, error: logsError } = await supabase
      .from('medication_logs')
      .upsert(medicationLogs)
      .select()

    if (logsError) {
      console.error('Error creating medication logs:', logsError)
      return
    }

    console.log('✅ Medication logs created:', logs.length)

    // 7. Create health records
    const healthRecords = [
      {
        type: 'lab_result',
        data: {
          test_name: 'Complete Blood Count',
          results: {
            hemoglobin: '12.5 g/dL',
            hematocrit: '38%',
            white_blood_cells: '8.2 K/μL',
            platelets: '285 K/μL'
          },
          status: 'normal',
          lab: 'City Medical Lab'
        },
        uploaded_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        user_id: user.id,
      },
      {
        type: 'scan',
        data: {
          scan_type: 'Ultrasound',
          findings: 'Normal fetal development, appropriate growth for gestational age',
          images: ['ultrasound_20weeks.jpg'],
          radiologist: 'Dr. Sarah Wilson'
        },
        uploaded_date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        user_id: user.id,
      }
    ]

    const { data: records, error: recordsError } = await supabase
      .from('health_records')
      .upsert(healthRecords)
      .select()

    if (recordsError) {
      console.error('Error creating health records:', recordsError)
      return
    }

    console.log('✅ Health records created:', records.length)

    console.log('🎉 Demo data seeding completed successfully!')
    console.log(`Demo user: ${user.name} (${user.email})`)
    console.log(`Clerk User ID: ${user.clerk_user_id}`)

    return {
      user,
      medications: medications.length,
      appointments: appointments.length,
      emergencyContacts: contacts.length,
      vitalSigns: vitalSigns.length,
      medicationLogs: logs.length,
      healthRecords: records.length,
    }

  } catch (error) {
    console.error('❌ Error seeding demo data:', error)
    throw error
  }
}

// Export demo data for reference
export {
  DEMO_USER_DATA,
  DEMO_MEDICATIONS,
  DEMO_APPOINTMENTS,
  DEMO_EMERGENCY_CONTACTS,
  DEMO_VITAL_SIGNS,
  DEMO_AI_ASSESSMENT,
}
