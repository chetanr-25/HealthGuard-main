"use client"

import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import { useUserProfile } from "@/lib/hooks/useUserProfile"

export function WelcomeHeader() {
  const { profile, loading, getCurrentPregnancyWeek, getPregnancyProgress, getTrimester, getDaysUntilDue } = useUserProfile()
  
  const pregnancyWeek = getCurrentPregnancyWeek() || 0
  const totalWeeks = 40
  const daysUntilDue = getDaysUntilDue() || 0
  const progressPercent = getPregnancyProgress()
  const trimester = getTrimester()
  const trimesterText = trimester ? `${trimester}${trimester === 1 ? 'st' : trimester === 2 ? 'nd' : 'rd'} Trimester` : 'Not Set'

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Greeting */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 text-balance">
            {loading ? 'Loading...' : `Good Morning, ${profile?.firstName || 'User'}`}
          </h1>
          <p className="text-muted-foreground">Welcome back to your maternal health dashboard</p>
        </div>

        {/* Pregnancy Info */}
        <div className="flex items-center gap-6">
          {/* Week Badge */}
          <div className="bg-gradient-to-br from-primary to-primary-dark text-white rounded-lg p-4 min-w-fit hover:shadow-lg transition-shadow duration-300">
            <div className="text-sm font-medium opacity-90">Pregnancy Progress</div>
            <div className="text-2xl font-bold">
              {loading ? '...' : `Week ${pregnancyWeek}`}
            </div>
            <div className="text-xs opacity-75">{trimesterText}</div>
          </div>

          {/* Due Date Countdown */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 hover:scale-105 transition-transform duration-300">
              <CircularProgressbar
                value={progressPercent}
                text={`${daysUntilDue}d`}
                styles={buildStyles({
                  rotation: 0.25,
                  strokeLinecap: "round",
                  textSize: "16px",
                  pathTransitionDuration: 0.5,
                  pathColor: "#4FD1C5",
                  textColor: "#2D3748",
                  trailColor: "#E2E8F0",
                  backgroundColor: "#ffffff",
                })}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">Days until due date</p>
          </div>
        </div>
      </div>
    </div>
  )
}
