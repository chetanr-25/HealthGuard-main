"use client"

import { SignInButton, SignUpButton, useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Heart, 
  Shield, 
  Brain, 
  Calendar, 
  Pill, 
  BookOpen, 
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Star
} from 'lucide-react'
import Link from 'next/link'

export default function LandingPage() {
  const { isSignedIn } = useUser()

  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI Risk Predictor",
      description: "Advanced AI analyzes your health data to predict potential risks and provide personalized insights."
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Health Monitoring",
      description: "Track vital signs, symptoms, and health metrics with intelligent trend analysis."
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Appointment Management",
      description: "Never miss an appointment with smart reminders and calendar integration."
    },
    {
      icon: <Pill className="h-6 w-6" />,
      title: "Medication Tracker",
      description: "Manage medications with automated reminders and interaction checking."
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Educational Content",
      description: "Access personalized health education and pregnancy guidance materials."
    },
    {
      icon: <AlertTriangle className="h-6 w-6" />,
      title: "Emergency Support",
      description: "Quick access to emergency contacts and critical health information."
    }
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Expecting Mother",
      content: "HealthGuard AI has been a lifesaver during my pregnancy. The AI insights help me understand what's normal and when to seek help.",
      rating: 5
    },
    {
      name: "Dr. Michael Chen",
      role: "Obstetrician",
      content: "This app provides patients with valuable health insights and helps them stay informed about their pregnancy journey.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "New Mom",
      content: "The medication tracking and appointment reminders are incredibly helpful. I never miss anything important anymore.",
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                <span className="text-white font-bold text-lg">HG</span>
              </div>
              <span className="text-2xl font-bold text-foreground">HealthGuard AI</span>
            </div>
            
            <div className="flex items-center gap-4">
              {isSignedIn ? (
                <Link href="/dashboard">
                  <Button className="bg-primary hover:bg-primary/90">
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <div className="flex items-center gap-2">
                  <SignInButton mode="modal">
                    <Button variant="ghost">Sign In</Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button className="bg-primary hover:bg-primary/90">Get Started</Button>
                  </SignUpButton>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
            AI-Powered Health Management
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Your Personal
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Health Guardian</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Advanced AI technology meets personalized healthcare. Track, monitor, and optimize your health journey with intelligent insights and proactive care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isSignedIn ? (
              <Link href="/dashboard">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">
                  Access Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <>
                <SignUpButton mode="modal">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </SignUpButton>
                <SignInButton mode="modal">
                  <Button size="lg" variant="outline" className="text-lg px-8">
                    Sign In
                  </Button>
                </SignInButton>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Everything You Need for Better Health
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive health management tools powered by artificial intelligence
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-border hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Trusted by Health-Conscious Users
            </h2>
            <p className="text-xl text-muted-foreground">
              See what our users are saying about HealthGuard AI
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-border">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of users who trust HealthGuard AI for their health management needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isSignedIn ? (
              <Link href="/dashboard">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">
                  Access Your Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <SignUpButton mode="modal">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">
                  Start Your Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </SignUpButton>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border bg-muted/30">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
              <span className="text-white font-bold text-sm">HG</span>
            </div>
            <span className="text-xl font-bold text-foreground">HealthGuard AI</span>
          </div>
          <p className="text-muted-foreground">
            © 2024 HealthGuard AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
