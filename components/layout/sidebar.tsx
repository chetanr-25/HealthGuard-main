"use client"
import { Home, Activity, Zap, Calendar, Clock, Pill, BookOpen, AlertCircle, Settings, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface SidebarProps {
  open: boolean
  onToggle: (open: boolean) => void
}

const navItems = [
  { icon: Home, label: "Dashboard", href: "/", tourId: "dashboard" },
  { icon: Activity, label: "Health Monitor", href: "/health-monitoring", tourId: "vitals" },
  { icon: Zap, label: "AI Predictor", href: "/ai-risk-predictor", tourId: "ai-insights" },
  { icon: Calendar, label: "Timeline", href: "/pregnancy-timeline" },
  { icon: Clock, label: "Appointments", href: "/appointments", tourId: "appointments" },
  { icon: Pill, label: "Medications", href: "/medications", tourId: "medications" },
  { icon: BookOpen, label: "Education", href: "/education" },
  { icon: AlertCircle, label: "Emergency", href: "/emergency" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

export function Sidebar({ open, onToggle }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col w-64 bg-card border-r border-border transition-all duration-300",
          !open && "md:w-20",
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-border">
          {open && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                <span className="text-white font-bold text-sm">HG</span>
              </div>
              <span className="font-bold text-foreground">HealthGuard</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onToggle(!open)}
            className="h-8 w-8"
            aria-label="Toggle sidebar"
          >
            <ChevronLeft className={cn("h-4 w-4 transition-transform", !open && "rotate-180")} />
          </Button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto py-4 px-2">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href === "/" && pathname === "/")
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover-lift",
                      isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted",
                    )}
                    title={!open ? item.label : undefined}
                    data-tour={item.tourId}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    {open && <span className="text-sm font-medium">{item.label}</span>}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </aside>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border mobile-safe-area-bottom">
        <nav className="flex justify-around">
          {navItems.slice(0, 5).map((item) => {
            const isActive = pathname === item.href || (item.href === "/" && pathname === "/")
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "mobile-nav-item touch-target flex flex-col items-center justify-center w-full py-2 text-xs transition-colors hover-lift",
                  isActive ? "text-primary" : "text-muted-foreground",
                )}
                title={item.label}
                data-tour={item.tourId}
              >
                <item.icon className="h-5 w-5 mb-1" />
                <span className="text-xs">{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </>
  )
}
