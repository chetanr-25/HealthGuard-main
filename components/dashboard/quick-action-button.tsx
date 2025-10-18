"use client"

import { useState } from "react"
import { Plus, X, Heart, Baby, MessageSquare, Phone, Check } from "lucide-react"
import { LoggingModal } from "./logging-modal"

export function QuickActionButton() {
  const [expanded, setExpanded] = useState(false)
  const [loadingAction, setLoadingAction] = useState<string | null>(null)
  const [successAction, setSuccessAction] = useState<string | null>(null)
  const [selectedAction, setSelectedAction] = useState<"vitals" | "kicks" | "note" | "emergency" | null>(null)

  const actions = [
    { icon: Heart, label: "Log Vitals", color: "bg-error", type: "vitals" as const },
    { icon: Baby, label: "Log Kicks", color: "bg-primary", type: "kicks" as const },
    { icon: MessageSquare, label: "Add Note", color: "bg-accent", type: "note" as const },
    { icon: Phone, label: "Emergency", color: "bg-secondary", type: "emergency" as const },
  ]

  const handleActionClick = (type: "vitals" | "kicks" | "note" | "emergency") => {
    setSelectedAction(type)
    setExpanded(false)
  }

  return (
    <>
      <div className="fixed bottom-8 right-8 z-30 md:bottom-12 md:right-12">
        {/* Expanded Actions */}
        {expanded && (
          <div className="absolute bottom-20 right-0 space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
            {actions.map((action, idx) => {
              const isLoading = loadingAction === action.label
              const isSuccess = successAction === action.label

              return (
                <button
                  key={idx}
                  onClick={() => handleActionClick(action.type)}
                  disabled={loadingAction !== null}
                  className={`${
                    isSuccess ? "bg-success" : action.color
                  } text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center gap-3 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed`}
                  title={action.label}
                >
                  {isLoading ? (
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : isSuccess ? (
                    <Check className="h-5 w-5 animate-in zoom-in duration-300" />
                  ) : (
                    <action.icon className="h-5 w-5" />
                  )}
                  <span className="text-sm font-medium hidden sm:inline">
                    {isLoading ? "Logging..." : isSuccess ? "Logged!" : action.label}
                  </span>
                </button>
              )
            })}
          </div>
        )}

        {/* Main Button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className={`${
            expanded ? "bg-muted-foreground" : "bg-primary"
          } text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center animate-in fade-in duration-300`}
          aria-label="Quick actions"
        >
          {expanded ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
        </button>
      </div>

      <LoggingModal
        isOpen={selectedAction !== null}
        onClose={() => setSelectedAction(null)}
        actionType={selectedAction}
      />
    </>
  )
}
