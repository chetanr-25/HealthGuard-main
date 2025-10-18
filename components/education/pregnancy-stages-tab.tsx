"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

export function PregnancyStagesTab() {
  const [expandedTrimester, setExpandedTrimester] = useState<string | null>("first")

  const trimesters = [
    {
      id: "first",
      name: "First Trimester",
      weeks: "1-13",
      description: "Foundation and early development",
      developments: [
        "Heart begins to beat",
        "Brain and spinal cord form",
        "Limbs start to develop",
        "Facial features begin to form",
      ],
      articles: [
        "Early Pregnancy Symptoms",
        "Prenatal Vitamins and Supplements",
        "Managing Morning Sickness",
        "First Prenatal Appointment",
      ],
      color: "from-primary/20 to-primary/5",
    },
    {
      id: "second",
      name: "Second Trimester",
      weeks: "14-27",
      description: "Growth and movement",
      developments: ["Baby can hear sounds", "Fingerprints form", "Baby starts moving", "Gender can be determined"],
      articles: ["Anatomy Scan Guide", "Pregnancy Nutrition", "Managing Back Pain", "Preparing for Labor"],
      color: "from-secondary/20 to-secondary/5",
    },
    {
      id: "third",
      name: "Third Trimester",
      weeks: "28-40",
      description: "Final preparation",
      developments: ["Baby gains weight rapidly", "Lungs mature", "Baby moves into birth position", "Ready for birth"],
      articles: ["Birth Plan Creation", "Hospital Bag Checklist", "Labor Positions", "Postpartum Preparation"],
      color: "from-accent/20 to-accent/5",
    },
  ]

  return (
    <div className="space-y-4">
      {trimesters.map((trimester) => (
        <Collapsible
          key={trimester.id}
          open={expandedTrimester === trimester.id}
          onOpenChange={() => setExpandedTrimester(expandedTrimester === trimester.id ? null : trimester.id)}
        >
          <Card className={`bg-gradient-to-r ${trimester.color} border-border overflow-hidden`}>
            <CollapsibleTrigger asChild>
              <button className="w-full p-6 flex items-center justify-between hover:bg-black/5 transition-colors">
                <div className="text-left">
                  <h3 className="text-xl font-bold text-foreground">{trimester.name}</h3>
                  <p className="text-sm text-muted-foreground">Weeks {trimester.weeks}</p>
                  <p className="text-sm text-muted-foreground mt-1">{trimester.description}</p>
                </div>
                <ChevronDown
                  className={`h-5 w-5 text-muted-foreground transition-transform ${expandedTrimester === trimester.id ? "rotate-180" : ""}`}
                />
              </button>
            </CollapsibleTrigger>

            <CollapsibleContent className="px-6 pb-6 space-y-6 border-t border-border/50 pt-6">
              {/* Key Developments */}
              <div>
                <h4 className="font-semibold text-foreground mb-3">Key Developments</h4>
                <ul className="space-y-2">
                  {trimester.developments.map((dev, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-foreground">
                      <span className="text-primary font-bold">•</span>
                      {dev}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommended Reading */}
              <div>
                <h4 className="font-semibold text-foreground mb-3">Recommended Reading</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {trimester.articles.map((article, idx) => (
                    <Button key={idx} variant="outline" size="sm" className="justify-start bg-transparent">
                      {article}
                    </Button>
                  ))}
                </div>
              </div>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      ))}
    </div>
  )
}
