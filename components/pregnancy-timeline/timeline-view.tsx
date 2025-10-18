"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { WeekCard } from "./week-card"
import { WeekDetailModal } from "./week-detail-modal"

interface TimelineViewProps {
  currentWeek: number
  onWeekChange: (week: number) => void
}

export function TimelineView({ currentWeek, onWeekChange }: TimelineViewProps) {
  const [expandedWeek, setExpandedWeek] = useState<number | null>(currentWeek)
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  const scrollToCurrentWeek = () => {
    const currentElement = document.getElementById(`week-${currentWeek}`)
    if (currentElement) {
      currentElement.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }

  useEffect(() => {
    scrollToCurrentWeek()
  }, [])

  const handleWeekSelect = (week: number) => {
    onWeekChange(week)
    setExpandedWeek(week)
    scrollToCurrentWeek()
  }

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex gap-2">
          <Select value={currentWeek.toString()} onValueChange={(val) => handleWeekSelect(Number.parseInt(val))}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Jump to week..." />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 40 }, (_, i) => i + 1).map((week) => (
                <SelectItem key={week} value={week.toString()}>
                  Week {week}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={scrollToCurrentWeek} className="gap-2 bg-transparent">
            <span className="hidden sm:inline">Go to Current Week</span>
            <span className="sm:hidden">Current</span>
          </Button>
        </div>
      </div>

      {/* Timeline */}
      <div ref={timelineRef} className="space-y-3 max-h-[calc(100vh-400px)] overflow-y-auto pr-2">
        {Array.from({ length: 40 }, (_, i) => i + 1).map((week) => {
          const isCurrent = week === currentWeek
          const isExpanded = expandedWeek === week
          const trimester = week <= 12 ? 1 : week <= 26 ? 2 : 3
          const isMilestone = [12, 20, 24, 28, 36, 40].includes(week)

          return (
            <div key={week} id={`week-${week}`} className="relative">
              {/* Milestone Marker */}
              {isMilestone && (
                <div className="mb-2 px-4 py-2 bg-accent/10 rounded-lg border border-accent/20">
                  <p className="text-xs font-bold text-accent uppercase">
                    {week === 12 && "End of First Trimester"}
                    {week === 20 && "Halfway Point"}
                    {week === 24 && "Viability Milestone"}
                    {week === 28 && "Start of Third Trimester"}
                    {week === 36 && "Full Term"}
                    {week === 40 && "Due Date"}
                  </p>
                </div>
              )}

              {/* Timeline Item */}
              <div className="flex gap-4">
                {/* Timeline Line */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-4 h-4 rounded-full border-2 transition-all ${
                      isCurrent
                        ? "bg-primary border-primary shadow-lg animate-pulse-ring"
                        : "bg-card border-primary/30 hover:border-primary"
                    }`}
                  />
                  {week < 40 && <div className="w-0.5 h-12 bg-border mt-1" />}
                </div>

                {/* Week Card */}
                <div className="flex-1 pb-4">
                  <WeekCard
                    week={week}
                    isExpanded={isExpanded}
                    isCurrent={isCurrent}
                    trimester={trimester}
                    onToggle={() => setExpandedWeek(isExpanded ? null : week)}
                    onViewDetails={() => setSelectedWeek(week)}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Week Detail Modal */}
      {selectedWeek && <WeekDetailModal week={selectedWeek} onClose={() => setSelectedWeek(null)} />}
    </div>
  )
}
