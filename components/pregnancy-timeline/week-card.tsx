"use client"

import { ChevronDown, ChevronUp, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getWeekData } from "@/lib/pregnancy-data"

interface WeekCardProps {
  week: number
  isExpanded: boolean
  isCurrent: boolean
  trimester: number
  onToggle: () => void
  onViewDetails: () => void
}

export function WeekCard({ week, isExpanded, isCurrent, trimester, onToggle, onViewDetails }: WeekCardProps) {
  const weekData = getWeekData(week)

  return (
    <Card
      className={`transition-all cursor-pointer ${
        isCurrent ? "border-primary/50 bg-primary/5 shadow-md" : "border-border hover:border-primary/30 hover:shadow-sm"
      }`}
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant={isCurrent ? "default" : "secondary"}>Week {week}</Badge>
              <Badge variant="outline" className="text-xs">
                Trimester {trimester}
              </Badge>
            </div>
            <h3 className="font-bold text-foreground">{weekData.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{weekData.sizeComparison}</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onViewDetails}
              className="gap-1"
              title="View detailed information"
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onToggle} className="gap-1">
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-border space-y-3 animate-slide-up">
            {/* Baby Development */}
            <div>
              <p className="text-xs font-bold text-primary uppercase mb-2">Baby Development</p>
              <ul className="space-y-1">
                {weekData.babyDevelopment.map((item, idx) => (
                  <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Maternal Changes */}
            <div>
              <p className="text-xs font-bold text-secondary uppercase mb-2">Maternal Changes</p>
              <p className="text-sm text-foreground">{weekData.maternalChanges}</p>
            </div>

            {/* Symptoms */}
            <div>
              <p className="text-xs font-bold text-accent uppercase mb-2">Symptoms to Expect</p>
              <div className="flex flex-wrap gap-1">
                {weekData.symptoms.map((symptom, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {symptom}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div>
              <p className="text-xs font-bold text-primary uppercase mb-2">Tips & Advice</p>
              <p className="text-sm text-foreground italic">{weekData.tips}</p>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
