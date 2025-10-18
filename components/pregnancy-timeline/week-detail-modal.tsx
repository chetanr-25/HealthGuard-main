"use client"

import { X, Download, Share2, Upload } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getWeekData } from "@/lib/pregnancy-data"

interface WeekDetailModalProps {
  week: number
  onClose: () => void
}

export function WeekDetailModal({ week, onClose }: WeekDetailModalProps) {
  const weekData = getWeekData(week)
  const trimester = week <= 12 ? 1 : week <= 26 ? 2 : 3

  const handlePhotoUpload = () => {
    alert("Photo upload feature: Add your belly photo for week " + week)
  }

  const handleDownload = () => {
    alert("Downloading week " + week + " information as PDF")
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Week {week}</p>
              <p className="text-2xl font-bold">{weekData.title}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Size Comparison */}
          <Card className="p-4 bg-primary/5 border-primary/20">
            <p className="text-sm font-bold text-primary mb-2">Size Comparison</p>
            <p className="text-lg font-bold text-foreground">{weekData.sizeComparison}</p>
            <p className="text-sm text-muted-foreground mt-2">
              Your baby is approximately the size of a {weekData.sizeComparison.split(" ")[0].toLowerCase()}
            </p>
          </Card>

          {/* Baby Development */}
          <div>
            <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Baby Development
            </h3>
            <ul className="space-y-2">
              {weekData.babyDevelopment.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-foreground">
                  <span className="text-primary font-bold mt-1">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Maternal Changes */}
          <div>
            <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary" />
              Maternal Changes
            </h3>
            <Card className="p-4 bg-secondary/5 border-secondary/20">
              <p className="text-sm text-foreground">{weekData.maternalChanges}</p>
            </Card>
          </div>

          {/* Symptoms */}
          <div>
            <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              Symptoms to Expect
            </h3>
            <div className="flex flex-wrap gap-2">
              {weekData.symptoms.map((symptom, idx) => (
                <Badge key={idx} variant="secondary" className="bg-accent/20">
                  {symptom}
                </Badge>
              ))}
            </div>
          </div>

          {/* Tips & Advice */}
          <div>
            <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Tips & Advice
            </h3>
            <Card className="p-4 bg-primary/5 border-primary/20">
              <p className="text-sm text-foreground italic">{weekData.tips}</p>
            </Card>
          </div>

          {/* Photo Upload */}
          <Card className="p-4 border-dashed border-2 border-primary/30 bg-primary/5">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-foreground">Add Belly Photo</p>
                <p className="text-sm text-muted-foreground">Track your pregnancy progress with photos</p>
              </div>
              <Button variant="outline" size="sm" onClick={handlePhotoUpload} className="gap-2 bg-transparent">
                <Upload className="h-4 w-4" />
                Upload
              </Button>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={handleDownload} className="gap-2 flex-1 bg-transparent">
              <Download className="h-4 w-4" />
              Download
            </Button>
            <Button variant="outline" className="gap-2 flex-1 bg-transparent">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
