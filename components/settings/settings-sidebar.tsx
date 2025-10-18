"use client"

import { User, Heart, Bell, Lock, Database, Globe, Eye, Sliders, Watch, HelpCircle, Info } from "lucide-react"
import { cn } from "@/lib/utils"

interface SettingsSidebarProps {
  activeCategory: string
  onCategoryChange: (category: string) => void
}

const categories = [
  { id: "profile", label: "Profile & Account", icon: User },
  { id: "pregnancy", label: "Pregnancy Information", icon: Heart },
  { id: "notifications", label: "Notifications & Reminders", icon: Bell },
  { id: "privacy", label: "Privacy & Security", icon: Lock },
  { id: "health-data", label: "Health Data Management", icon: Database },
  { id: "language", label: "Language & Region", icon: Globe },
  { id: "accessibility", label: "Accessibility", icon: Eye },
  { id: "app-preferences", label: "App Preferences", icon: Sliders },
  { id: "devices", label: "Connected Devices", icon: Watch },
  { id: "help", label: "Help & Support", icon: HelpCircle },
  { id: "about", label: "About", icon: Info },
]

export function SettingsSidebar({ activeCategory, onCategoryChange }: SettingsSidebarProps) {
  return (
    <div className="h-full overflow-y-auto p-4 space-y-2">
      {categories.map((category) => {
        const Icon = category.icon
        return (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
              activeCategory === category.id ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted",
            )}
          >
            <Icon className="h-4 w-4" />
            <span>{category.label}</span>
          </button>
        )
      })}
    </div>
  )
}
