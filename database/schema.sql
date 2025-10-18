-- HealthGuard AI Database Schema
-- Run this SQL in your Supabase SQL editor

-- Enable Row Level Security

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    clerk_user_id TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    due_date DATE,
    blood_type TEXT,
    pregnancy_week INTEGER CHECK (pregnancy_week >= 0 AND pregnancy_week <= 42),
    profile_complete BOOLEAN DEFAULT false,
    onboarding_completed BOOLEAN DEFAULT false,
    last_assessment_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create vital_signs table
CREATE TABLE IF NOT EXISTS vital_signs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('blood_pressure', 'heart_rate', 'weight', 'temperature', 'blood_sugar', 'oxygen_saturation')),
    value DECIMAL(10,2) NOT NULL,
    unit TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('normal', 'elevated', 'high', 'low', 'critical')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create medications table
CREATE TABLE IF NOT EXISTS medications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    dosage TEXT NOT NULL,
    frequency TEXT NOT NULL CHECK (frequency IN ('once_daily', 'twice_daily', 'three_times_daily', 'four_times_daily', 'as_needed', 'weekly', 'monthly')),
    times TEXT[] NOT NULL DEFAULT '{}',
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create medication_logs table
CREATE TABLE IF NOT EXISTS medication_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    medication_id UUID NOT NULL REFERENCES medications(id) ON DELETE CASCADE,
    scheduled_time TIMESTAMP WITH TIME ZONE NOT NULL,
    taken_time TIMESTAMP WITH TIME ZONE,
    status TEXT NOT NULL CHECK (status IN ('pending', 'taken', 'missed')) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    doctor_name TEXT NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    location TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('prenatal', 'ultrasound', 'blood_test', 'consultation', 'emergency', 'follow_up')),
    status TEXT NOT NULL CHECK (status IN ('scheduled', 'completed', 'cancelled')) DEFAULT 'scheduled',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create emergency_contacts table
CREATE TABLE IF NOT EXISTS emergency_contacts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    relationship TEXT NOT NULL,
    phone TEXT NOT NULL,
    priority TEXT NOT NULL CHECK (priority IN ('high', 'medium', 'low')) DEFAULT 'medium',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create health_records table
CREATE TABLE IF NOT EXISTS health_records (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('lab_result', 'scan', 'prescription', 'note', 'image', 'document')),
    data JSONB NOT NULL,
    uploaded_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create smart_suggestions table
CREATE TABLE IF NOT EXISTS smart_suggestions (
    id TEXT PRIMARY KEY,
    medication_id UUID NOT NULL REFERENCES medications(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('time_optimization', 'reminder_timing', 'dose_scheduling', 'encouragement')),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    reasoning TEXT NOT NULL,
    action TEXT NOT NULL,
    priority TEXT NOT NULL CHECK (priority IN ('low', 'medium', 'high')),
    estimated_improvement INTEGER NOT NULL, -- percentage
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'dismissed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_vital_signs_user_id ON vital_signs(user_id);
CREATE INDEX IF NOT EXISTS idx_vital_signs_timestamp ON vital_signs(timestamp);
CREATE INDEX IF NOT EXISTS idx_medications_user_id ON medications(user_id);
CREATE INDEX IF NOT EXISTS idx_medication_logs_medication_id ON medication_logs(medication_id);
CREATE INDEX IF NOT EXISTS idx_appointments_user_id ON appointments(user_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(date);
CREATE INDEX IF NOT EXISTS idx_emergency_contacts_user_id ON emergency_contacts(user_id);
CREATE INDEX IF NOT EXISTS idx_health_records_user_id ON health_records(user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_medications_updated_at BEFORE UPDATE ON medications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON appointments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_emergency_contacts_updated_at BEFORE UPDATE ON emergency_contacts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE vital_signs ENABLE ROW LEVEL SECURITY;
ALTER TABLE medications ENABLE ROW LEVEL SECURITY;
ALTER TABLE medication_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE emergency_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_records ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Users can only access their own data
CREATE POLICY "Users can view own data" ON users FOR SELECT USING (clerk_user_id = auth.jwt() ->> 'sub');
CREATE POLICY "Users can insert own data" ON users FOR INSERT WITH CHECK (clerk_user_id = auth.jwt() ->> 'sub');
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (clerk_user_id = auth.jwt() ->> 'sub');

CREATE POLICY "Users can view own vital signs" ON vital_signs FOR SELECT USING (user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub'));
CREATE POLICY "Users can insert own vital signs" ON vital_signs FOR INSERT WITH CHECK (user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub'));
CREATE POLICY "Users can update own vital signs" ON vital_signs FOR UPDATE USING (user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub'));
CREATE POLICY "Users can delete own vital signs" ON vital_signs FOR DELETE USING (user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub'));

CREATE POLICY "Users can view own medications" ON medications FOR SELECT USING (user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub'));
CREATE POLICY "Users can insert own medications" ON medications FOR INSERT WITH CHECK (user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub'));
CREATE POLICY "Users can update own medications" ON medications FOR UPDATE USING (user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub'));
CREATE POLICY "Users can delete own medications" ON medications FOR DELETE USING (user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub'));

CREATE POLICY "Users can view own medication logs" ON medication_logs FOR SELECT USING (medication_id IN (SELECT id FROM medications WHERE user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub')));
CREATE POLICY "Users can insert own medication logs" ON medication_logs FOR INSERT WITH CHECK (medication_id IN (SELECT id FROM medications WHERE user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub')));
CREATE POLICY "Users can update own medication logs" ON medication_logs FOR UPDATE USING (medication_id IN (SELECT id FROM medications WHERE user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub')));
CREATE POLICY "Users can delete own medication logs" ON medication_logs FOR DELETE USING (medication_id IN (SELECT id FROM medications WHERE user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub')));

CREATE POLICY "Users can view own appointments" ON appointments FOR SELECT USING (user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub'));
CREATE POLICY "Users can insert own appointments" ON appointments FOR INSERT WITH CHECK (user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub'));
CREATE POLICY "Users can update own appointments" ON appointments FOR UPDATE USING (user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub'));
CREATE POLICY "Users can delete own appointments" ON appointments FOR DELETE USING (user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub'));

CREATE POLICY "Users can view own emergency contacts" ON emergency_contacts FOR SELECT USING (user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub'));
CREATE POLICY "Users can insert own emergency contacts" ON emergency_contacts FOR INSERT WITH CHECK (user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub'));
CREATE POLICY "Users can update own emergency contacts" ON emergency_contacts FOR UPDATE USING (user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub'));
CREATE POLICY "Users can delete own emergency contacts" ON emergency_contacts FOR DELETE USING (user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub'));

CREATE POLICY "Users can view own health records" ON health_records FOR SELECT USING (user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub'));
CREATE POLICY "Users can insert own health records" ON health_records FOR INSERT WITH CHECK (user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub'));
CREATE POLICY "Users can update own health records" ON health_records FOR UPDATE USING (user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub'));
CREATE POLICY "Users can delete own health records" ON health_records FOR DELETE USING (user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub'));

CREATE POLICY "Users can view own smart suggestions" ON smart_suggestions FOR SELECT USING (medication_id IN (SELECT id FROM medications WHERE user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub')));
CREATE POLICY "Users can insert own smart suggestions" ON smart_suggestions FOR INSERT WITH CHECK (medication_id IN (SELECT id FROM medications WHERE user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub')));
CREATE POLICY "Users can update own smart suggestions" ON smart_suggestions FOR UPDATE USING (medication_id IN (SELECT id FROM medications WHERE user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub')));
CREATE POLICY "Users can delete own smart suggestions" ON smart_suggestions FOR DELETE USING (medication_id IN (SELECT id FROM medications WHERE user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub')));

-- Enable real-time subscriptions
ALTER PUBLICATION supabase_realtime ADD TABLE vital_signs;
ALTER PUBLICATION supabase_realtime ADD TABLE medications;
ALTER PUBLICATION supabase_realtime ADD TABLE medication_logs;
ALTER PUBLICATION supabase_realtime ADD TABLE appointments;
