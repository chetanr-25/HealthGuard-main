

import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">HG</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to your HealthGuard AI account</p>
        </div>
        <div className="bg-card rounded-2xl shadow-lg border border-border p-8">
          <SignIn 
            redirectUrl="/dashboard"
            afterSignInUrl="/dashboard"
            appearance={{
              elements: {
                formButtonPrimary: 'bg-primary hover:bg-primary/90 text-primary-foreground',
                card: 'shadow-none',
                headerTitle: 'hidden',
                headerSubtitle: 'hidden',
                socialButtonsBlockButton: 'border-border hover:bg-muted',
                formFieldInput: 'border-border focus:border-primary',
                footerActionLink: 'text-primary hover:text-primary/80',
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}
