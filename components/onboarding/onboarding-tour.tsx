'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowRight, 
  ArrowLeft, 
  X, 
  Home, 
  Heart, 
  Pill, 
  Calendar, 
  Brain,
  Shield,
  SkipForward
} from 'lucide-react'

interface TourStep {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  target?: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  action?: string
}

const TOUR_STEPS: TourStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to HealthGuard AI!',
    description: 'Your personal health guardian for pregnancy and wellness tracking. Let\'s take a quick tour to show you around.',
    icon: <Shield className="w-6 h-6" />,
    action: 'Get Started'
  },
  {
    id: 'dashboard',
    title: 'Your Health Dashboard',
    description: 'This is your main hub where you can see all your health data at a glance. Track your pregnancy progress, vital signs, and AI insights.',
    icon: <Home className="w-6 h-6" />,
    target: '[data-tour="dashboard"]',
    position: 'bottom'
  },
  {
    id: 'ai-insights',
    title: 'AI Health Insights',
    description: 'Our AI analyzes your health data to provide personalized insights and recommendations. It learns from your patterns to give you better advice.',
    icon: <Brain className="w-6 h-6" />,
    target: '[data-tour="ai-insights"]',
    position: 'top'
  },
  {
    id: 'medications',
    title: 'Smart Medication Tracking',
    description: 'Track your medications with AI-powered reminders. Our system learns your patterns and suggests optimal times for better adherence.',
    icon: <Pill className="w-6 h-6" />,
    target: '[data-tour="medications"]',
    position: 'left'
  },
  {
    id: 'appointments',
    title: 'Appointment Management',
    description: 'Keep track of all your medical appointments, get reminders, and never miss an important checkup.',
    icon: <Calendar className="w-6 h-6" />,
    target: '[data-tour="appointments"]',
    position: 'right'
  },
  {
    id: 'vitals',
    title: 'Health Monitoring',
    description: 'Log and track your vital signs, weight, and other health metrics. Our AI helps identify patterns and trends.',
    icon: <Heart className="w-6 h-6" />,
    target: '[data-tour="vitals"]',
    position: 'top'
  },
  {
    id: 'complete',
    title: 'You\'re All Set!',
    description: 'You\'re ready to start your health journey with HealthGuard AI. Remember, this is AI-powered guidance - always consult your healthcare provider for medical decisions.',
    icon: <Shield className="w-6 h-6" />,
    action: 'Start Using HealthGuard AI'
  }
]

interface OnboardingTourProps {
  onComplete: () => void
  onSkip: () => void
}

export function OnboardingTour({ onComplete, onSkip }: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [highlightedElement, setHighlightedElement] = useState<HTMLElement | null>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(true)
    highlightCurrentTarget()
  }, [currentStep])

  const highlightCurrentTarget = () => {
    const step = TOUR_STEPS[currentStep]
    if (step.target) {
      const element = document.querySelector(step.target) as HTMLElement
      if (element) {
        setHighlightedElement(element)
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    } else {
      setHighlightedElement(null)
    }
  }

  const nextStep = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const skipTour = () => {
    onSkip()
  }

  const currentStepData = TOUR_STEPS[currentStep]
  const isLastStep = currentStep === TOUR_STEPS.length - 1
  const isFirstStep = currentStep === 0

  return (
    <>
      {/* Overlay */}
      <div 
        ref={overlayRef}
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={skipTour}
      >
        {/* Highlighted element */}
        {highlightedElement && (
          <div
            className="absolute border-4 border-primary rounded-lg animate-pulse-ring"
            style={{
              top: highlightedElement.offsetTop - 8,
              left: highlightedElement.offsetLeft - 8,
              width: highlightedElement.offsetWidth + 16,
              height: highlightedElement.offsetHeight + 16,
            }}
          />
        )}
      </div>

      {/* Tour Card */}
      <div className={`fixed z-50 transition-all duration-300 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
      style={{
        top: highlightedElement 
          ? `${highlightedElement.offsetTop + highlightedElement.offsetHeight + 20}px`
          : '50%',
        left: highlightedElement 
          ? `${highlightedElement.offsetLeft}px`
          : '50%',
        transform: highlightedElement 
          ? 'none'
          : 'translate(-50%, -50%)',
        maxWidth: '400px',
        width: '90vw',
      }}
      >
        <Card className="shadow-2xl border-primary/20">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  {currentStepData.icon}
                </div>
                <div>
                  <CardTitle className="text-lg">{currentStepData.title}</CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    Step {currentStep + 1} of {TOUR_STEPS.length}
                  </Badge>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={skipTour}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              {currentStepData.description}
            </p>

            {/* Progress bar */}
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / TOUR_STEPS.length) * 100}%` }}
              />
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {!isFirstStep && (
                  <Button variant="outline" onClick={prevStep}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>
                )}
                <Button variant="ghost" onClick={skipTour}>
                  <SkipForward className="w-4 h-4 mr-2" />
                  Skip Tour
                </Button>
              </div>
              
              <Button onClick={nextStep} className="btn-micro">
                {isLastStep ? (
                  <>
                    {currentStepData.action}
                    <Shield className="w-4 h-4 ml-2" />
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

// Hook to manage tour state
export function useOnboardingTour() {
  const [showTour, setShowTour] = useState(false)
  const [hasCompletedTour, setHasCompletedTour] = useState(false)

  useEffect(() => {
    // Check if user has completed tour before
    const completed = localStorage.getItem('healthguard-tour-completed')
    if (completed === 'true') {
      setHasCompletedTour(true)
    }
  }, [])

  const startTour = () => {
    setShowTour(true)
  }

  const completeTour = () => {
    setShowTour(false)
    setHasCompletedTour(true)
    localStorage.setItem('healthguard-tour-completed', 'true')
  }

  const skipTour = () => {
    setShowTour(false)
    setHasCompletedTour(true)
    localStorage.setItem('healthguard-tour-completed', 'true')
  }

  const resetTour = () => {
    setHasCompletedTour(false)
    localStorage.removeItem('healthguard-tour-completed')
  }

  return {
    showTour,
    hasCompletedTour,
    startTour,
    completeTour,
    skipTour,
    resetTour,
  }
}
