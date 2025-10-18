# HealthGuard AI - Clerk Authentication Setup

This document outlines the Clerk authentication integration in the HealthGuard AI application.

## Features Implemented

### 1. Authentication Provider
- ClerkProvider wrapped around the entire application in `app/layout.tsx`
- Environment variables configured in `.env.local`

### 2. Authentication Pages
- **Sign In**: `/sign-in` - Custom styled sign-in page with HealthGuard AI branding
- **Sign Up**: `/sign-up` - Custom styled sign-up page with HealthGuard AI branding
- Both pages use Clerk's pre-built components with custom styling

### 3. Route Protection
- Middleware configured to protect all routes except:
  - `/` (redirects to landing)
  - `/landing` (public landing page)
  - `/sign-in/*` (authentication pages)
  - `/sign-up/*` (authentication pages)

### 4. User Interface Integration
- **Top Navigation**: Updated with Clerk's `UserButton` component
- **Landing Page**: Public page with sign-in/sign-up buttons
- **Dashboard**: Protected route at `/dashboard` (moved from root)

### 5. User Experience
- Seamless authentication flow
- Automatic redirects based on authentication state
- Custom styling to match HealthGuard AI design system
- User profile management through Clerk's UserButton

## Environment Variables

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_ZmFtb3VzLWdvc2hhd2stMjcuY2xlcmsuYWNjb3VudHMuZGV2JA
CLERK_SECRET_KEY=sk_test_AFokD2TBLUutTT8RJhShDISZJQmBwPQEu4NakJ4tqz
```

## File Structure

```
app/
├── layout.tsx                 # ClerkProvider setup
├── page.tsx                   # Redirects to landing
├── landing/
│   └── page.tsx              # Public landing page
├── dashboard/
│   └── page.tsx              # Protected dashboard
├── sign-in/
│   └── [[...sign-in]]/
│       └── page.tsx          # Sign-in page
└── sign-up/
    └── [[...sign-up]]/
        └── page.tsx          # Sign-up page

components/
└── layout/
    └── top-navigation.tsx    # Updated with UserButton

middleware.ts                  # Route protection
```

## Usage

1. **Public Access**: Users can visit `/landing` without authentication
2. **Sign Up**: New users can create accounts via `/sign-up`
3. **Sign In**: Existing users can sign in via `/sign-in`
4. **Dashboard**: Authenticated users access the main app at `/dashboard`
5. **Sign Out**: Users can sign out via the UserButton in the top navigation

## Clerk Hooks Available

- `useUser()` - Access current user data
- `useAuth()` - Access authentication state
- `SignIn`, `SignUp`, `UserButton` - Pre-built components

## Customization

The authentication pages and components are styled to match the HealthGuard AI design system using Tailwind CSS classes and Clerk's appearance customization options.
