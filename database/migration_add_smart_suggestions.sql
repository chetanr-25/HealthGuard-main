-- Migration: Add smart_suggestions table
-- Run this SQL in your Supabase SQL editor

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

-- Enable RLS
ALTER TABLE smart_suggestions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view own smart suggestions" ON smart_suggestions FOR SELECT USING (medication_id IN (SELECT id FROM medications WHERE user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub')));
CREATE POLICY "Users can insert own smart suggestions" ON smart_suggestions FOR INSERT WITH CHECK (medication_id IN (SELECT id FROM medications WHERE user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub')));
CREATE POLICY "Users can update own smart suggestions" ON smart_suggestions FOR UPDATE USING (medication_id IN (SELECT id FROM medications WHERE user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub')));
CREATE POLICY "Users can delete own smart suggestions" ON smart_suggestions FOR DELETE USING (medication_id IN (SELECT id FROM medications WHERE user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub')));

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_smart_suggestions_medication_id ON smart_suggestions(medication_id);
CREATE INDEX IF NOT EXISTS idx_smart_suggestions_status ON smart_suggestions(status);
CREATE INDEX IF NOT EXISTS idx_smart_suggestions_created_at ON smart_suggestions(created_at);
