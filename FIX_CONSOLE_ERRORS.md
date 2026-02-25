# 🔧 Fix Console Errors - HealthGuard AI

## Issues Identified

### 1. **Console Error: `Error in fetchOrCreateProfile: {}`**
- **Location**: `lib/hooks/useUserProfile.ts:93`
- **Cause**: Error object not properly serialized in console.log
- **Status**: ✅ **FIXED** - Improved error handling

### 2. **Database Schema Issues**
- **Cause**: Missing columns in Supabase `users` table
- **Required**: Run database migration

### 3. **Clerk Authentication Issues**
- **Cause**: Infinite redirect loop 
- **Status**: ⚠️ **NEEDS ATTENTION**

## 🚀 **Immediate Fixes Required**

### **Step 1: Run Database Migration**

Execute this SQL in your **Supabase SQL Editor**:

```sql
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

-- Enable RLS for smart_suggestions
ALTER TABLE smart_suggestions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for smart_suggestions
CREATE POLICY "Users can view own smart suggestions" ON smart_suggestions FOR SELECT USING (medication_id IN (SELECT id FROM medications WHERE user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub')));
CREATE POLICY "Users can insert own smart suggestions" ON smart_suggestions FOR INSERT WITH CHECK (medication_id IN (SELECT id FROM medications WHERE user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub')));
CREATE POLICY "Users can update own smart suggestions" ON smart_suggestions FOR UPDATE USING (medication_id IN (SELECT id FROM medications WHERE user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub')));
CREATE POLICY "Users can delete own smart suggestions" ON smart_suggestions FOR DELETE USING (medication_id IN (SELECT id FROM medications WHERE user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub')));

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_smart_suggestions_medication_id ON smart_suggestions(medication_id);
CREATE INDEX IF NOT EXISTS idx_smart_suggestions_status ON smart_suggestions(status);
CREATE INDEX IF NOT EXISTS idx_smart_suggestions_created_at ON smart_suggestions(created_at);
```

### **Step 2: Verify Environment Variables**

Check your `.env.local` file has:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# AI Integration
GEMINI_API_KEY=AIzaSyCAGvYjK_mJ5vmPZPPLCItpvRc2X_juP94
```

### **Step 3: Clear Next.js Cache**

```bash
rm -rf .next
npm run dev
```

## 🎯 **Expected Results After Fixes**

1. ✅ **Console Error Fixed**: Better error logging with structured error objects
2. ✅ **Database Schema Updated**: All required columns and tables created
3. ✅ **AI Smart Reminders**: Full functionality available in Medications page
4. ✅ **Onboarding Modal**: Should work without console errors

## 🔍 **Testing Checklist**

After running the fixes:

- [ ] Navigate to `/medications` page
- [ ] Click on "AI Insights" tab
- [ ] Check browser console for errors
- [ ] Test onboarding modal functionality
- [ ] Verify AI suggestions generation

## 📋 **If Issues Persist**

1. **Check Supabase Connection**: Verify your Supabase URL and anon key
2. **Check Clerk Keys**: Ensure Clerk publishable and secret keys match
3. **Clear Browser Cache**: Hard refresh (Ctrl+Shift+R)
4. **Check Network Tab**: Look for failed API requests

## 🚨 **Emergency Fallback**

If the smart reminders system causes issues, you can temporarily disable it by commenting out the AI Insights tab in `/app/medications/page.tsx`:

```tsx
// Temporarily comment out this line:
// <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
```

The core medication tracking functionality will continue to work without the AI features.
