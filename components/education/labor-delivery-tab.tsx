"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"

export function LaborDeliveryTab() {
  const [hospitalBag, setHospitalBag] = useState({
    mom: { robe: false, slippers: false, toiletries: false },
    baby: { onesies: false, blankets: false, mittens: false },
    partner: { camera: false, snacks: false, pillow: false },
  })

  return (
    <div className="space-y-8">
      {/* Birth Plan Builder */}
      <Card className="p-6 border-border">
        <h3 className="text-2xl font-bold text-foreground mb-4">Birth Plan Builder</h3>
        <p className="text-muted-foreground mb-6">
          Create a personalized birth plan to share with your healthcare team
        </p>
        <Button className="bg-primary hover:bg-primary-dark text-primary-foreground">Create Birth Plan</Button>
      </Card>

      {/* Labor Stages */}
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-6">Labor Stages Explained</h3>
        <div className="space-y-4">
          {[
            {
              stage: "Stage 1",
              title: "Early Labor",
              duration: "8-12 hours",
              desc: "Contractions begin and cervix dilates",
            },
            {
              stage: "Stage 2",
              title: "Active Labor",
              duration: "3-5 hours",
              desc: "Cervix fully dilates and pushing begins",
            },
            { stage: "Stage 3", title: "Transition", duration: "30 min - 2 hours", desc: "Baby is delivered" },
            { stage: "Stage 4", title: "Afterbirth", duration: "5-30 minutes", desc: "Placenta is delivered" },
          ].map((stage, idx) => (
            <Card key={idx} className="p-4 border-border hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-bold text-primary">{idx + 1}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{stage.title}</h4>
                  <p className="text-sm text-muted-foreground">{stage.desc}</p>
                  <p className="text-xs text-muted-foreground mt-2">Duration: {stage.duration}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Hospital Bag Checklist */}
      <Card className="p-6 border-border">
        <h3 className="text-2xl font-bold text-foreground mb-6">Hospital Bag Checklist</h3>

        <div className="space-y-6">
          {/* For Mom */}
          <div>
            <h4 className="font-semibold text-foreground mb-3">For Mom</h4>
            <div className="space-y-2">
              {[
                { id: "robe", label: "Front-opening robe" },
                { id: "slippers", label: "Non-slip slippers" },
                { id: "toiletries", label: "Toiletries and medications" },
              ].map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <Checkbox
                    checked={hospitalBag.mom[item.id as keyof typeof hospitalBag.mom]}
                    onCheckedChange={() =>
                      setHospitalBag((prev) => ({
                        ...prev,
                        mom: { ...prev.mom, [item.id]: !prev.mom[item.id as keyof typeof prev.mom] },
                      }))
                    }
                  />
                  <span className="text-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* For Baby */}
          <div>
            <h4 className="font-semibold text-foreground mb-3">For Baby</h4>
            <div className="space-y-2">
              {[
                { id: "onesies", label: "Newborn and 0-3 month onesies" },
                { id: "blankets", label: "Blankets and swaddles" },
                { id: "mittens", label: "Mittens and socks" },
              ].map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <Checkbox
                    checked={hospitalBag.baby[item.id as keyof typeof hospitalBag.baby]}
                    onCheckedChange={() =>
                      setHospitalBag((prev) => ({
                        ...prev,
                        baby: { ...prev.baby, [item.id]: !prev.baby[item.id as keyof typeof prev.baby] },
                      }))
                    }
                  />
                  <span className="text-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* For Partner */}
          <div>
            <h4 className="font-semibold text-foreground mb-3">For Partner</h4>
            <div className="space-y-2">
              {[
                { id: "camera", label: "Camera for photos" },
                { id: "snacks", label: "Snacks and drinks" },
                { id: "pillow", label: "Pillow and change of clothes" },
              ].map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <Checkbox
                    checked={hospitalBag.partner[item.id as keyof typeof hospitalBag.partner]}
                    onCheckedChange={() =>
                      setHospitalBag((prev) => ({
                        ...prev,
                        partner: { ...prev.partner, [item.id]: !prev.partner[item.id as keyof typeof prev.partner] },
                      }))
                    }
                  />
                  <span className="text-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Button variant="outline" className="w-full mt-6 bg-transparent">
          Print Checklist
        </Button>
      </Card>
    </div>
  )
}
