"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

const checklistItems = [
  "Government ID / Passport",
  "Insurance cards",
  "Pregnancy medical records",
  "Birth plan (if prepared)",
  "Comfortable clothes",
  "Phone charger",
  "Medications list",
  "Emergency contacts list",
  "Maternity pads",
  "Comfortable shoes",
  "Entertainment (books, music)",
  "Camera for photos",
]

export function HospitalGoChecklist() {
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set())

  const toggleItem = (idx: number) => {
    const newChecked = new Set(checkedItems)
    if (newChecked.has(idx)) {
      newChecked.delete(idx)
    } else {
      newChecked.add(idx)
    }
    setCheckedItems(newChecked)
  }

  const markAllPacked = () => {
    setCheckedItems(new Set(checklistItems.map((_, idx) => idx)))
  }

  const allPacked = checkedItems.size === checklistItems.length

  return (
    <Card className="border-2 border-primary">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Check className="h-6 w-6 text-primary" />
          Hospital Go-Bag Checklist
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-2">Quick reference for when rushing to hospital</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Checklist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {checklistItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
              <Checkbox checked={checkedItems.has(idx)} onCheckedChange={() => toggleItem(idx)} className="h-5 w-5" />
              <label
                className={`text-sm cursor-pointer flex-1 ${checkedItems.has(idx) ? "line-through text-muted-foreground" : "text-foreground"}`}
              >
                {item}
              </label>
            </div>
          ))}
        </div>

        {/* Progress */}
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-foreground">Progress</p>
            <p className="text-sm font-bold text-primary">
              {checkedItems.size}/{checklistItems.length}
            </p>
          </div>
          <div className="w-full bg-border rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all"
              style={{ width: `${(checkedItems.size / checklistItems.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={markAllPacked}
            variant="outline"
            className="flex-1 border-2 border-primary text-primary bg-transparent"
          >
            Mark All as Packed
          </Button>
          {allPacked && (
            <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold">I'm Ready!</Button>
          )}
        </div>

        {/* Print Option */}
        <Button variant="outline" className="w-full border-2 bg-transparent" onClick={() => window.print()}>
          Print Checklist
        </Button>
      </CardContent>
    </Card>
  )
}
