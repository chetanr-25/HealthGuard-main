"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"

export function BabyCareTab() {
  const [babyName, setBabyName] = useState("")
  const [nurseryChecklist, setNurseryChecklist] = useState({
    crib: false,
    mattress: false,
    bedding: false,
    dresser: false,
    closet: false,
    lighting: false,
  })

  return (
    <div className="space-y-8">
      {/* Nursery Setup */}
      <Card className="p-6 border-border">
        <h3 className="text-2xl font-bold text-foreground mb-6">Nursery Setup Checklist</h3>
        <div className="space-y-3">
          {[
            { id: "crib", label: "Crib and mattress" },
            { id: "mattress", label: "Fitted sheets and waterproof mattress cover" },
            { id: "bedding", label: "Blankets and sleep sacks" },
            { id: "dresser", label: "Dresser for clothes" },
            { id: "closet", label: "Organized closet space" },
            { id: "lighting", label: "Soft lighting and nightlight" },
          ].map((item) => (
            <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
              <Checkbox
                checked={nurseryChecklist[item.id as keyof typeof nurseryChecklist]}
                onCheckedChange={() =>
                  setNurseryChecklist((prev) => ({
                    ...prev,
                    [item.id]: !prev[item.id as keyof typeof nurseryChecklist],
                  }))
                }
              />
              <span className="text-foreground">{item.label}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Baby Name Finder */}
      <Card className="p-6 border-border">
        <h3 className="text-2xl font-bold text-foreground mb-4">Baby Name Finder</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Search baby names..."
            value={babyName}
            onChange={(e) => setBabyName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-border bg-muted text-foreground placeholder-muted-foreground"
          />
          {babyName && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4 bg-primary/5 border-primary/20">
                <p className="font-semibold text-foreground">{babyName}</p>
                <p className="text-sm text-muted-foreground">Origin: Sanskrit</p>
                <p className="text-sm text-muted-foreground mt-2">Meaning: Beautiful and meaningful</p>
              </Card>
            </div>
          )}
        </div>
      </Card>

      {/* Newborn Care Articles */}
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-6">Newborn Care Guides</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: "Breastfeeding Guide", desc: "Tips for successful breastfeeding" },
            { title: "Diaper Changing", desc: "Step-by-step diaper changing guide" },
            { title: "Sleep Training", desc: "Establishing healthy sleep patterns" },
            { title: "Baby Bathing", desc: "Safe bathing techniques for newborns" },
          ].map((guide, idx) => (
            <Card key={idx} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
              <h4 className="font-semibold text-foreground mb-2">{guide.title}</h4>
              <p className="text-sm text-muted-foreground mb-4">{guide.desc}</p>
              <Button variant="outline" size="sm">
                Read Guide
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
