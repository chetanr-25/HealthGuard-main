"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, Mail, Phone, AlertCircle } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function HelpSupportSettings() {
  const faqs = [
    {
      question: "How do I track my pregnancy progress?",
      answer:
        "You can track your pregnancy progress using the Pregnancy Timeline feature. It shows your current week, baby development, and upcoming milestones.",
    },
    {
      question: "How often should I log my health data?",
      answer:
        "We recommend logging your vital signs daily for better health insights. You can set reminders in the Notifications settings.",
    },
    {
      question: "Is my health data secure?",
      answer:
        "Yes, all your health data is encrypted end-to-end and stored securely. We follow HIPAA compliance standards.",
    },
    {
      question: "Can I share my data with my doctor?",
      answer:
        "Yes, you can share your health summary with your healthcare provider through the Privacy & Security settings.",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Help Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Help Resources</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start bg-transparent">
            Quick Start Guide
          </Button>
          <Button variant="outline" className="w-full justify-start bg-transparent">
            Video Tutorials
          </Button>
          <Button variant="outline" className="w-full justify-start bg-transparent">
            User Manual (PDF)
          </Button>
          <Button variant="outline" className="w-full justify-start bg-transparent">
            Community Forum
          </Button>
        </CardContent>
      </Card>

      {/* FAQs */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Contact Support */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Support</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button className="w-full gap-2 justify-start">
            <MessageCircle className="h-4 w-4" />
            Chat with Support
          </Button>
          <Button variant="outline" className="w-full gap-2 justify-start bg-transparent">
            <Mail className="h-4 w-4" />
            Email Support
          </Button>
          <Button variant="outline" className="w-full gap-2 justify-start bg-transparent">
            <Phone className="h-4 w-4" />
            Call Support: +91 1800-123-4567
          </Button>
          <p className="text-xs text-muted-foreground">Support hours: 9 AM - 6 PM IST, Mon-Fri</p>
        </CardContent>
      </Card>

      {/* Feedback */}
      <Card>
        <CardHeader>
          <CardTitle>Feedback</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full bg-transparent">
            Rate this App
          </Button>
          <Button variant="outline" className="w-full bg-transparent">
            Send Feedback
          </Button>
          <Button
            variant="outline"
            className="w-full gap-2 justify-start text-destructive hover:text-destructive bg-transparent"
          >
            <AlertCircle className="h-4 w-4" />
            Report a Bug
          </Button>
        </CardContent>
      </Card>

      {/* App Information */}
      <Card>
        <CardHeader>
          <CardTitle>App Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">App Version</span>
            <span className="font-medium">v1.0.0</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Build Number</span>
            <span className="font-medium">2025.01.18</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Last Updated</span>
            <span className="font-medium">January 18, 2025</span>
          </div>
          <Button variant="outline" className="w-full bg-transparent">
            Check for Updates
          </Button>
          <Button variant="outline" className="w-full bg-transparent">
            What's New
          </Button>
        </CardContent>
      </Card>

      {/* Legal */}
      <Card>
        <CardHeader>
          <CardTitle>Legal</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start text-sm bg-transparent">
            Privacy Policy
          </Button>
          <Button variant="outline" className="w-full justify-start text-sm bg-transparent">
            Terms of Service
          </Button>
          <Button variant="outline" className="w-full justify-start text-sm bg-transparent">
            Open Source Licenses
          </Button>
          <Button variant="outline" className="w-full justify-start text-sm bg-transparent">
            Medical Disclaimer
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
