"use client"

import { Card, CardContent } from "@/components/ui/card"

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const medicationsByDay = {
  0: [
    { name: "Prenatal Multivitamin", time: "9:00 AM", color: "bg-primary/10 text-primary" },
    { name: "Folic Acid", time: "9:00 AM", color: "bg-primary/10 text-primary" },
    { name: "Iron Supplement", time: "1:00 PM", color: "bg-secondary/10 text-secondary" },
    { name: "Calcium", time: "8:00 PM", color: "bg-accent/10 text-accent" },
  ],
  1: [
    { name: "Prenatal Multivitamin", time: "9:00 AM", color: "bg-primary/10 text-primary" },
    { name: "Folic Acid", time: "9:00 AM", color: "bg-primary/10 text-primary" },
    { name: "Iron Supplement", time: "1:00 PM", color: "bg-secondary/10 text-secondary" },
    { name: "Calcium", time: "8:00 PM", color: "bg-accent/10 text-accent" },
  ],
  2: [
    { name: "Prenatal Multivitamin", time: "9:00 AM", color: "bg-primary/10 text-primary" },
    { name: "Folic Acid", time: "9:00 AM", color: "bg-primary/10 text-primary" },
    { name: "Iron Supplement", time: "1:00 PM", color: "bg-secondary/10 text-secondary" },
    { name: "Calcium", time: "8:00 PM", color: "bg-accent/10 text-accent" },
  ],
  3: [
    { name: "Prenatal Multivitamin", time: "9:00 AM", color: "bg-primary/10 text-primary" },
    { name: "Folic Acid", time: "9:00 AM", color: "bg-primary/10 text-primary" },
    { name: "Iron Supplement", time: "1:00 PM", color: "bg-secondary/10 text-secondary" },
    { name: "Calcium", time: "8:00 PM", color: "bg-accent/10 text-accent" },
  ],
  4: [
    { name: "Prenatal Multivitamin", time: "9:00 AM", color: "bg-primary/10 text-primary" },
    { name: "Folic Acid", time: "9:00 AM", color: "bg-primary/10 text-primary" },
    { name: "Iron Supplement", time: "1:00 PM", color: "bg-secondary/10 text-secondary" },
    { name: "Calcium", time: "8:00 PM", color: "bg-accent/10 text-accent" },
  ],
  5: [
    { name: "Prenatal Multivitamin", time: "9:00 AM", color: "bg-primary/10 text-primary" },
    { name: "Folic Acid", time: "9:00 AM", color: "bg-primary/10 text-primary" },
    { name: "Iron Supplement", time: "1:00 PM", color: "bg-secondary/10 text-secondary" },
    { name: "Calcium", time: "8:00 PM", color: "bg-accent/10 text-accent" },
  ],
  6: [
    { name: "Prenatal Multivitamin", time: "9:00 AM", color: "bg-primary/10 text-primary" },
    { name: "Folic Acid", time: "9:00 AM", color: "bg-primary/10 text-primary" },
    { name: "Iron Supplement", time: "1:00 PM", color: "bg-secondary/10 text-secondary" },
    { name: "Calcium", time: "8:00 PM", color: "bg-accent/10 text-accent" },
  ],
}

export function ScheduleTab() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3">
        {weekDays.map((day, index) => (
          <Card key={day} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <h3 className="font-semibold text-foreground mb-3">{day}</h3>
              <div className="space-y-2">
                {medicationsByDay[index as keyof typeof medicationsByDay].map((med, idx) => (
                  <div key={idx} className={`p-2 rounded-md text-sm ${med.color}`}>
                    <p className="font-medium text-xs">{med.name}</p>
                    <p className="text-xs opacity-75">{med.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
