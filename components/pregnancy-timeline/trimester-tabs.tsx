"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface TrimesterTabsProps {
  currentWeek: number
}

const trimesterData = {
  first: {
    weeks: "1-12",
    title: "First Trimester",
    developments: [
      "Fertilization and implantation",
      "Heart begins beating",
      "Brain and spinal cord form",
      "Limbs start developing",
    ],
    symptoms: ["Morning sickness", "Fatigue", "Breast tenderness", "Mood changes"],
    appointments: ["Initial prenatal visit", "Dating ultrasound", "Blood tests"],
    prepare: ["Start prenatal vitamins", "Healthy diet", "Avoid harmful substances"],
  },
  second: {
    weeks: "13-26",
    title: "Second Trimester",
    developments: [
      "Baby's movements felt (quickening)",
      "Gender can be determined",
      "Facial features become clearer",
      "Baby's hearing develops",
    ],
    symptoms: ["Increased appetite", "Back pain", "Leg cramps", "Skin changes"],
    appointments: ["Anatomy scan", "Glucose screening", "Regular checkups"],
    prepare: ["Maternity clothes", "Prenatal classes", "Nursery planning"],
  },
  third: {
    weeks: "27-40",
    title: "Third Trimester",
    developments: [
      "Baby gains significant weight",
      "Lungs mature",
      "Baby drops into birth position",
      "Final growth and development",
    ],
    symptoms: ["Shortness of breath", "Frequent urination", "Braxton Hicks", "Swelling"],
    appointments: ["Weekly checkups", "Fetal monitoring", "Labor preparation"],
    prepare: ["Birth plan", "Hospital bag", "Newborn essentials"],
  },
}

export function TrimesterTabs({ currentWeek }: TrimesterTabsProps) {
  const getActiveTab = () => {
    if (currentWeek <= 12) return "first"
    if (currentWeek <= 26) return "second"
    return "third"
  }

  return (
    <Tabs defaultValue={getActiveTab()} className="w-full animate-fade-in">
      <TabsList className="grid w-full grid-cols-3 mb-6">
        <TabsTrigger value="first">First Trimester</TabsTrigger>
        <TabsTrigger value="second">Second Trimester</TabsTrigger>
        <TabsTrigger value="third">Third Trimester</TabsTrigger>
      </TabsList>

      {Object.entries(trimesterData).map(([key, data]) => (
        <TabsContent key={key} value={key} className="space-y-4 animate-slide-up">
          <Card className="p-6 border-primary/20">
            <div className="space-y-6">
              {/* Major Developments */}
              <div>
                <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  Major Developments
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {data.developments.map((dev, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-foreground">
                      <span className="text-primary font-bold mt-1">•</span>
                      <span>{dev}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Common Symptoms */}
              <div>
                <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-secondary" />
                  Common Symptoms
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.symptoms.map((symptom, idx) => (
                    <Badge key={idx} variant="secondary" className="bg-secondary/20 text-secondary-foreground">
                      {symptom}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Important Appointments */}
              <div>
                <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  Important Appointments
                </h3>
                <ul className="space-y-2">
                  {data.appointments.map((apt, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      {apt}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Things to Prepare */}
              <div>
                <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  Things to Prepare
                </h3>
                <ul className="space-y-2">
                  {data.prepare.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  )
}
