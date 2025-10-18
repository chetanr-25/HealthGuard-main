# HealthGuard AI - Supabase Backend Setup

This document outlines the complete Supabase backend integration for the HealthGuard AI application.

## 🚀 Quick Start

### 1. Database Setup
1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `database/schema.sql`
4. Run the SQL script to create all tables, indexes, and policies

### 2. Environment Variables
The following environment variables are already configured in `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://ugtvztyskgvbimrovpmn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 📊 Database Schema

### Tables Created:
- **users** - User profiles linked to Clerk authentication
- **vital_signs** - Health metrics and measurements
- **medications** - Medication management
- **medication_logs** - Medication intake tracking
- **appointments** - Medical appointments
- **emergency_contacts** - Emergency contact information
- **health_records** - Health documents and files

### Key Features:
- ✅ Row Level Security (RLS) enabled
- ✅ Real-time subscriptions configured
- ✅ Automatic user creation on first login
- ✅ Clerk user ID integration
- ✅ Optimized indexes for performance

## 🔧 React Hooks Available

### useUser()
```typescript
const { user, loading, updatePregnancyInfo, getCurrentPregnancyWeek } = useUser()
```

### useVitalSigns()
```typescript
const { 
  vitalSigns, 
  loading, 
  addVitalSign, 
  getLatestVitalSign,
  getVitalSignsByType 
} = useVitalSigns()
```

### useMedications()
```typescript
const { 
  medications, 
  addMedication, 
  markMedicationTaken,
  getTodaysPendingMedications 
} = useMedications()
```

### useAppointments()
```typescript
const { 
  appointments, 
  addAppointment, 
  getUpcomingAppointments,
  getNextAppointment 
} = useAppointments()
```

### useEmergencyContacts()
```typescript
const { 
  emergencyContacts, 
  addEmergencyContact,
  getHighPriorityContacts 
} = useEmergencyContacts()
```

## 🔄 Real-time Features

### Vital Signs Real-time Updates
- Automatic data refresh when new vital signs are added
- Real-time status updates across all connected clients
- Optimized subscriptions to prevent unnecessary re-renders

### Implementation
```typescript
// Real-time subscription is automatically set up in useVitalSigns hook
const { vitalSigns } = useVitalSigns() // Automatically updates in real-time
```

## 🛡️ Security Features

### Row Level Security (RLS)
- All tables protected with RLS policies
- Users can only access their own data
- Clerk user ID used for authentication
- Automatic user creation on first login

### Data Validation
- Type checking for all vital sign types
- Status validation for health metrics
- Date validation for appointments
- Phone number validation for emergency contacts

## 📱 Components Updated

### Dashboard Components
- **WelcomeHeader** - Now shows real user data and pregnancy progress
- **HealthStatsGrid** - Displays actual vital signs from database
- **LogVitalSignModal** - New component for logging vital signs

### Data Flow
1. User logs in via Clerk
2. User record created/updated in Supabase
3. Real-time data fetching begins
4. Components display live data
5. Changes sync across all devices

## 🔍 Data Types

### Vital Signs Types
- `heart_rate` - Heart rate in BPM
- `blood_pressure` - Blood pressure in mmHg
- `weight` - Weight in kg
- `temperature` - Body temperature in °C
- `blood_sugar` - Blood glucose in mg/dL
- `oxygen_saturation` - Oxygen level in %

### Status Levels
- `normal` - Within healthy range
- `elevated` - Slightly above normal
- `high` - Above normal range
- `low` - Below normal range
- `critical` - Requires immediate attention

## 🚨 Error Handling

### Loading States
- All hooks provide loading states
- Components show loading indicators
- Graceful fallbacks for missing data

### Error States
- Comprehensive error handling
- User-friendly error messages
- Automatic retry mechanisms

## 📈 Performance Optimizations

### Database Indexes
- User ID indexes for fast queries
- Timestamp indexes for date-based queries
- Composite indexes for complex queries

### React Optimizations
- Memoized calculations
- Efficient re-rendering
- Optimized real-time subscriptions

## 🔧 Development Tools

### Database Management
- Supabase Dashboard for data viewing
- SQL Editor for custom queries
- Real-time logs for debugging

### Type Safety
- Full TypeScript integration
- Generated types from database schema
- Type-safe hooks and components

## 📋 Next Steps

1. **Run the SQL schema** in your Supabase project
2. **Test the authentication flow** with Clerk
3. **Add sample data** using the log vital sign modal
4. **Verify real-time updates** work correctly
5. **Customize the UI** based on your needs

## 🆘 Troubleshooting

### Common Issues
1. **RLS Policies** - Ensure policies are created correctly
2. **Environment Variables** - Verify Supabase URL and keys
3. **Clerk Integration** - Check Clerk user ID mapping
4. **Real-time** - Verify Supabase real-time is enabled

### Debug Tips
- Check browser console for errors
- Use Supabase dashboard to verify data
- Test with sample data first
- Check network tab for API calls

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Hooks Guide](https://reactjs.org/docs/hooks-intro.html)
