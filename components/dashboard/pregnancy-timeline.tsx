"use client"

import { useState } from "react"
import { ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const timelineData = [
  { week: 20, size: "Banana", milestone: "Anatomy scan", summary: "Detailed ultrasound to check baby's development" },
  { week: 22, size: "Papaya", milestone: "Hearing develops", summary: "Baby can now hear sounds from outside" },
  {
    week: 24,
    size: "Corn",
    milestone: "Current week",
    current: true,
    summary: "Viability milestone - baby can survive outside with medical support",
  },
  { week: 26, size: "Eggplant", milestone: "Eyes open", summary: "Baby's eyes begin to open and respond to light" },
  {
    week: 28,
    size: "Lettuce",
    milestone: "Brain development",
    summary: "Rapid brain growth and neural connections forming",
  },
]

interface WeekDetailProps {
  week: number
  milestone: string
  summary: string
}

function WeekDetailModal({ week, milestone, summary }: WeekDetailProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <Card className="w-full max-w-md animate-in zoom-in-95 duration-200">
        <CardHeader>
          <CardTitle>Week {week}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Milestone</p>
            <p className="text-lg font-semibold text-foreground">{milestone}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">What's happening</p>
            <p className="text-foreground leading-relaxed">{summary}</p>
          </div>
          <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
            <p className="text-sm text-foreground">
              You are currently at <span className="font-semibold">Week {week}</span> of your pregnancy journey.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function PregnancyTimeline() {
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null)
  const [hoveredWeek, setHoveredWeek] = useState<number | null>(null)

  return (
    <>
      <Card className="mb-8 hover:shadow-lg transition-shadow animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Pregnancy Timeline</span>
            <span className="text-sm font-normal text-muted-foreground">Week 24 of 40</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto pb-4 scroll-smooth">
            <div className="flex gap-4 min-w-max snap-x snap-mandatory">
              {timelineData.map((item) => (
                <div
                  key={item.week}
                  className="snap-center flex-shrink-0"
                  onMouseEnter={() => setHoveredWeek(item.week)}
                  onMouseLeave={() => setHoveredWeek(null)}
                >
                  <div
                    onClick={() => setSelectedWeek(item.week)}
                    className={`w-32 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                      item.current ? "border-primary bg-primary/5 shadow-lg" : "border-border hover:border-primary/50"
                    } ${hoveredWeek === item.week ? "scale-110 shadow-lg" : ""}`}
                  >
                    <div className="text-center space-y-2">
                      <div className="text-2xl">
                        {item.size === "Banana" && "🍌"}
                        {item.size === "Papaya" && "🧡"}
                        {item.size === "Corn" && "🌽"}
                        {item.size === "Eggplant" && "🍆"}
                        {item.size === "Lettuce" && "🥬"}
                      </div>
                      <p className="font-semibold text-foreground">Week {item.week}</p>
                      <p className="text-xs text-muted-foreground">Size of {item.size}</p>
                      <p className="text-xs font-medium text-primary">{item.milestone}</p>

                      {hoveredWeek === item.week && (
                        <div className="absolute mt-2 p-2 bg-foreground text-background text-xs rounded shadow-lg whitespace-nowrap animate-in fade-in duration-200 z-10">
                          {item.summary}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 p-4 bg-accent/5 rounded-lg border border-accent/20">
            <p className="text-sm text-muted-foreground mb-2">
              Click any week to see detailed information about that stage of development.
            </p>
            <div className="flex gap-2 text-xs text-muted-foreground">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span>Interactive timeline - hover and click for details</span>
            </div>
          </div>

          <Button variant="outline" className="w-full mt-4 gap-2 bg-transparent">
            View Full Timeline
            <ChevronRight className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      {selectedWeek !== null && (
        <WeekDetailModal
          week={selectedWeek}
          milestone={timelineData.find((d) => d.week === selectedWeek)?.milestone || ""}
          summary={timelineData.find((d) => d.week === selectedWeek)?.summary || ""}
        />
      )}
    </>
  )
}
