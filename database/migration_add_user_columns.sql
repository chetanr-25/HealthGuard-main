-- Migration: Add missing columns to users table
-- Run this SQL in your Supabase SQL editor if the users table already exists

-- Add missing columns to users table
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS profile_complete BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS last_assessment_date TIMESTAMP WITH TIME ZONE;

-- Update existing users to have default values
UPDATE users 
SET 
  profile_complete = false,
  onboarding_completed = false
WHERE profile_complete IS NULL OR onboarding_completed IS NULL;
