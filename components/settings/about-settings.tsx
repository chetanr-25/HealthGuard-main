"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Zap, Shield } from "lucide-react"

export function AboutSettings() {
  return (
    <div className="space-y-8">
      {/* About HealthGuard AI */}
      <Card>
        <CardContent className="pt-8 text-center">
          <div className="w-24 h-24 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
            <Heart className="h-12 w-12 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-2">HealthGuard AI</h2>
          <p className="text-lg text-primary font-semibold mb-4">Saving Two Lives Before the Crisis Begins</p>
          <p className="text-sm text-muted-foreground mb-4">
            HealthGuard AI is an intelligent pregnancy health companion that uses advanced AI to monitor maternal and
            fetal health, predict risks, and provide personalized guidance throughout your pregnancy journey.
          </p>
          <p className="text-sm text-muted-foreground">
            Our mission is to empower expectant mothers with real-time health insights, emergency preparedness, and
            continuous support to ensure the safest possible pregnancy outcomes.
          </p>
        </CardContent>
      </Card>

      {/* Mission & Vision */}
      <Card>
        <CardHeader>
          <CardTitle>Our Mission</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            To revolutionize pregnancy care by combining cutting-edge AI technology with compassionate healthcare
            support, making advanced maternal health monitoring accessible to every expectant mother.
          </p>
          <Button variant="outline" className="w-full bg-transparent">
            Learn More About Us
          </Button>
        </CardContent>
      </Card>

      {/* Technology */}
      <Card>
        <CardHeader>
          <CardTitle>Technology</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <Zap className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <p className="font-medium text-sm">Advanced Machine Learning</p>
              <p className="text-xs text-muted-foreground">Predictive analytics for early risk detection</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <p className="font-medium text-sm">Secure Cloud Infrastructure</p>
              <p className="text-xs text-muted-foreground">HIPAA-compliant data storage and encryption</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Heart className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <p className="font-medium text-sm">Real-time Monitoring</p>
              <p className="text-xs text-muted-foreground">Continuous health tracking and alerts</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Acknowledgments */}
      <Card>
        <CardHeader>
          <CardTitle>Acknowledgments</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium text-sm mb-2">Medical Advisors</h3>
            <p className="text-xs text-muted-foreground">
              Developed in consultation with leading obstetricians and maternal health specialists
            </p>
          </div>
          <div>
            <h3 className="font-medium text-sm mb-2">Partner Organizations</h3>
            <p className="text-xs text-muted-foreground">
              Collaborating with healthcare institutions and pregnancy support organizations
            </p>
          </div>
          <div>
            <h3 className="font-medium text-sm mb-2">Open Source</h3>
            <p className="text-xs text-muted-foreground">Built with open source technologies and libraries</p>
          </div>
        </CardContent>
      </Card>

      {/* Social Media */}
      <Card>
        <CardHeader>
          <CardTitle>Follow Us</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" className="w-full bg-transparent">
            Visit Our Website
          </Button>
          <Button variant="outline" className="w-full bg-transparent">
            Instagram
          </Button>
          <Button variant="outline" className="w-full bg-transparent">
            Facebook
          </Button>
          <Button variant="outline" className="w-full bg-transparent">
            Twitter
          </Button>
          <Button variant="outline" className="w-full bg-transparent">
            YouTube
          </Button>
          <Button variant="outline" className="w-full bg-transparent">
            LinkedIn
          </Button>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="text-sm font-medium">Email</p>
            <p className="text-sm text-muted-foreground">support@healthguardai.com</p>
          </div>
          <Button variant="outline" className="w-full bg-transparent">
            Visit Our Website
          </Button>
        </CardContent>
      </Card>

      {/* Version Info */}
      <Card className="text-center">
        <CardContent className="pt-6">
          <p className="text-xs text-muted-foreground">HealthGuard AI v1.0.0</p>
          <p className="text-xs text-muted-foreground">Build 2025.01.18</p>
        </CardContent>
      </Card>
    </div>
  )
}
