"use client"

import { Download, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface ProgressIndicatorProps {
  currentWeek: number
}

export function ProgressIndicator({ currentWeek }: ProgressIndicatorProps) {
  const totalWeeks = 40
  const remainingWeeks = totalWeeks - currentWeek
  const progressPercentage = (currentWeek / totalWeeks) * 100
  const dueDate = new Date()
  dueDate.setDate(dueDate.getDate() + remainingWeeks * 7)

  const handleDownload = () => {
    // Simulate PDF download
    alert("Timeline summary downloaded as PDF")
  }

  const handleShare = () => {
    // Simulate share functionality
    alert("Share options: Email, Print, or Save as PDF")
  }

  return (
    <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20 p-6 animate-fade-in">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Your Pregnancy Journey</h2>
            <p className="text-muted-foreground mt-1">
              Week {currentWeek} of {totalWeeks}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleDownload} className="gap-2 bg-transparent">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Download</span>
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare} className="gap-2 bg-transparent">
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">Share</span>
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-foreground">{currentWeek} weeks complete</span>
            <span className="text-muted-foreground">{remainingWeeks} weeks to go</span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
        </div>

        {/* Due Date & Milestones */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="bg-card rounded-lg p-3">
            <p className="text-xs text-muted-foreground font-medium">Due Date</p>
            <p className="text-lg font-bold text-foreground">{dueDate.toLocaleDateString()}</p>
          </div>
          <div className="bg-card rounded-lg p-3">
            <p className="text-xs text-muted-foreground font-medium">Milestone</p>
            <p className="text-lg font-bold text-primary">
              {currentWeek >= 24 ? "Viability ✓" : currentWeek >= 20 ? "Halfway ✓" : "First Trimester"}
            </p>
          </div>
          <div className="bg-card rounded-lg p-3">
            <p className="text-xs text-muted-foreground font-medium">Achievement</p>
            <p className="text-lg font-bold text-secondary">
              {currentWeek >= 28
                ? "🎉 Third Trimester"
                : currentWeek >= 13
                  ? "🌟 Second Trimester"
                  : "🌱 First Trimester"}
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}
