// Data seeding script for HealthGuard AI
// Run this in your Supabase SQL editor or as a Node.js script

// Sample vital signs data
const sampleVitalSigns = [
  {
    type: 'heart_rate',
    value: 72,
    unit: 'bpm',
    status: 'normal',
    timestamp: new Date().toISOString()
  },
  {
    type: 'blood_pressure',
    value: 120,
    unit: 'mmHg',
    status: 'normal',
    timestamp: new Date().toISOString()
  },
  {
    type: 'weight',
    value: 68.5,
    unit: 'kg',
    status: 'normal',
    timestamp: new Date().toISOString()
  },
  {
    type: 'oxygen_saturation',
    value: 98,
    unit: '%',
    status: 'normal',
    timestamp: new Date().toISOString()
  }
]

// Sample medications data
const sampleMedications = [
  {
    name: 'Prenatal Vitamins',
    dosage: '1 tablet',
    frequency: 'once_daily',
    times: ['08:00'],
    active: true
  },
  {
    name: 'Folic Acid',
    dosage: '400mcg',
    frequency: 'once_daily',
    times: ['09:00'],
    active: true
  }
]

// Sample appointments data
const sampleAppointments = [
  {
    doctor_name: 'Dr. Sarah Johnson',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Next week
    time: '10:00',
    location: 'Women\'s Health Clinic',
    type: 'prenatal',
    status: 'scheduled',
    notes: 'Regular checkup'
  },
  {
    doctor_name: 'Dr. Michael Chen',
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // In 2 weeks
    time: '14:30',
    location: 'Ultrasound Center',
    type: 'ultrasound',
    status: 'scheduled',
    notes: '20-week anatomy scan'
  }
]

// Sample emergency contacts data
const sampleEmergencyContacts = [
  {
    name: 'John Smith',
    relationship: 'Husband',
    phone: '+1-555-0123',
    priority: 'high'
  },
  {
    name: 'Dr. Sarah Johnson',
    relationship: 'Obstetrician',
    phone: '+1-555-0456',
    priority: 'high'
  },
  {
    name: 'Mary Smith',
    relationship: 'Mother',
    phone: '+1-555-0789',
    priority: 'medium'
  }
]

// SQL INSERT statements (replace USER_ID with actual user ID)
const generateInsertStatements = (userId: string) => {
  const vitalSignsSQL = sampleVitalSigns.map(vs => 
    `INSERT INTO vital_signs (user_id, type, value, unit, timestamp, status) VALUES ('${userId}', '${vs.type}', ${vs.value}, '${vs.unit}', '${vs.timestamp}', '${vs.status}');`
  ).join('\n')

  const medicationsSQL = sampleMedications.map(med => 
    `INSERT INTO medications (user_id, name, dosage, frequency, times, active) VALUES ('${userId}', '${med.name}', '${med.dosage}', '${med.frequency}', ARRAY[${med.times.map(t => `'${t}'`).join(',')}], ${med.active});`
  ).join('\n')

  const appointmentsSQL = sampleAppointments.map(apt => 
    `INSERT INTO appointments (user_id, doctor_name, date, time, location, type, status, notes) VALUES ('${userId}', '${apt.doctor_name}', '${apt.date}', '${apt.time}', '${apt.location}', '${apt.type}', '${apt.status}', '${apt.notes}');`
  ).join('\n')

  const contactsSQL = sampleEmergencyContacts.map(contact => 
    `INSERT INTO emergency_contacts (user_id, name, relationship, phone, priority) VALUES ('${userId}', '${contact.name}', '${contact.relationship}', '${contact.phone}', '${contact.priority}');`
  ).join('\n')

  return `
-- Sample data for user: ${userId}
-- Run these statements in your Supabase SQL editor

${vitalSignsSQL}

${medicationsSQL}

${appointmentsSQL}

${contactsSQL}
`
}

// Export for use in other scripts
export { sampleVitalSigns, sampleMedications, sampleAppointments, sampleEmergencyContacts, generateInsertStatements }

// Instructions for manual seeding
console.log(`
To seed your database with sample data:

1. First, get your user ID from the users table:
   SELECT id FROM users WHERE clerk_user_id = 'your-clerk-user-id';

2. Replace USER_ID in the generated SQL below with your actual user ID

3. Run the SQL statements in your Supabase SQL editor

${generateInsertStatements('USER_ID')}
`)
