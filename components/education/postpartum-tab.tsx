"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export function PostpartumTab() {
  return (
    <div className="space-y-8">
      {/* Recovery Guide */}
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-6">Physical Recovery Timeline</h3>
        <div className="space-y-4">
          {[
            { week: "Week 1", title: "First Days", desc: "Rest and bonding with baby" },
            { week: "Week 2-4", title: "Early Recovery", desc: "Gradual increase in activity" },
            { week: "Week 4-6", title: "Continued Healing", desc: "Most bleeding stops" },
            { week: "Week 6+", title: "Full Recovery", desc: "Return to normal activities" },
          ].map((period, idx) => (
            <Card key={idx} className="p-4 border-border">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="font-bold text-primary text-sm text-center">{period.week}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{period.title}</h4>
                  <p className="text-sm text-muted-foreground">{period.desc}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Warning Signs */}
      <Alert className="bg-error/10 border-error/20">
        <AlertCircle className="h-4 w-4 text-error" />
        <AlertDescription>
          <strong>Seek immediate medical attention if you experience:</strong> Heavy bleeding, severe pain, fever, chest
          pain, or thoughts of harming yourself.
        </AlertDescription>
      </Alert>

      {/* Mental Health */}
      <Card className="p-6 border-border">
        <h3 className="text-2xl font-bold text-foreground mb-4">Mental Health Support</h3>
        <p className="text-muted-foreground mb-6">
          Postpartum depression and anxiety are common. You are not alone, and help is available.
        </p>
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start bg-transparent">
            Find Support Groups
          </Button>
          <Button variant="outline" className="w-full justify-start bg-transparent">
            Mental Health Resources
          </Button>
          <Button variant="outline" className="w-full justify-start bg-transparent">
            Talk to Your Doctor
          </Button>
        </div>
      </Card>

      {/* Newborn Care */}
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-6">Newborn Care Basics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: "Feeding Schedule", desc: "Every 2-3 hours for newborns" },
            { title: "Sleep Patterns", desc: "16-17 hours of sleep per day" },
            { title: "Diaper Changes", desc: "8-12 times per day" },
            { title: "Bathing", desc: "Every 1-2 days with warm water" },
          ].map((care, idx) => (
            <Card key={idx} className="p-4 border-border">
              <h4 className="font-semibold text-foreground mb-2">{care.title}</h4>
              <p className="text-sm text-muted-foreground">{care.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
