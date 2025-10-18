"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function PregnancyInformationSettings() {
  const [pregnancyData, setPregnancyData] = useState({
    dueDate: "2025-03-15",
    currentlyPregnant: true,
    pregnancyNumber: "2nd",
    livingChildren: "1",
    pregnancyType: "single",
    highRisk: false,
    obgynName: "Dr. Priya Sharma",
    hospitalName: "Apollo Hospital",
    doctorPhone: "+91 98765 43210",
    nextAppointment: "2025-01-25",
  })

  const [preExistingConditions, setPreExistingConditions] = useState({
    diabetes: false,
    hypertension: false,
    thyroid: false,
    pcos: false,
    anemia: false,
    asthma: false,
    other: "",
  })

  const [pregnancyComplications, setPregnancyComplications] = useState({
    gestationalDiabetes: false,
    preeclampsia: false,
    miscarriage: false,
    csection: false,
    pretermBirth: false,
    other: "",
  })

  const [allergies, setAllergies] = useState("Penicillin, Shellfish")

  const handlePregnancyDataChange = (field: string, value: string | boolean) => {
    setPregnancyData((prev) => ({ ...prev, [field]: value }))
  }

  const handleConditionChange = (condition: string, value: boolean | string) => {
    setPreExistingConditions((prev) => ({ ...prev, [condition]: value }))
  }

  const handleComplicationChange = (complication: string, value: boolean | string) => {
    setPregnancyComplications((prev) => ({ ...prev, [complication]: value }))
  }

  return (
    <div className="space-y-8">
      {/* Pregnancy Details */}
      <Card>
        <CardHeader>
          <CardTitle>Pregnancy Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Due Date</label>
              <Input
                type="date"
                value={pregnancyData.dueDate}
                onChange={(e) => handlePregnancyDataChange("dueDate", e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">28 weeks, 3 days pregnant</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Pregnancy Number</label>
              <Select
                value={pregnancyData.pregnancyNumber}
                onValueChange={(value) => handlePregnancyDataChange("pregnancyNumber", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1st">1st Pregnancy</SelectItem>
                  <SelectItem value="2nd">2nd Pregnancy</SelectItem>
                  <SelectItem value="3rd">3rd Pregnancy</SelectItem>
                  <SelectItem value="4th+">4th+ Pregnancy</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Living Children</label>
              <Input
                type="number"
                value={pregnancyData.livingChildren}
                onChange={(e) => handlePregnancyDataChange("livingChildren", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Pregnancy Type</label>
              <Select
                value={pregnancyData.pregnancyType}
                onValueChange={(value) => handlePregnancyDataChange("pregnancyType", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single Baby</SelectItem>
                  <SelectItem value="twins">Twins</SelectItem>
                  <SelectItem value="triplets">Triplets+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="high-risk"
              checked={pregnancyData.highRisk}
              onChange={(e) => handlePregnancyDataChange("highRisk", e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="high-risk" className="text-sm font-medium">
              High-risk pregnancy
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Healthcare Provider Information */}
      <Card>
        <CardHeader>
          <CardTitle>Healthcare Provider Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Primary OB/GYN Name</label>
              <Input
                value={pregnancyData.obgynName}
                onChange={(e) => handlePregnancyDataChange("obgynName", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Hospital/Clinic Name</label>
              <Input
                value={pregnancyData.hospitalName}
                onChange={(e) => handlePregnancyDataChange("hospitalName", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Doctor's Phone Number</label>
              <Input
                value={pregnancyData.doctorPhone}
                onChange={(e) => handlePregnancyDataChange("doctorPhone", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Next Appointment Date</label>
              <Input
                type="date"
                value={pregnancyData.nextAppointment}
                onChange={(e) => handlePregnancyDataChange("nextAppointment", e.target.value)}
              />
            </div>
          </div>
          <Button variant="outline" className="w-full gap-2 bg-transparent">
            <Plus className="h-4 w-4" />
            Add Additional Provider
          </Button>
        </CardContent>
      </Card>

      {/* Medical History */}
      <Card>
        <CardHeader>
          <CardTitle>Medical History</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {/* Pre-existing Conditions */}
            <AccordionItem value="conditions">
              <AccordionTrigger>Pre-existing Conditions</AccordionTrigger>
              <AccordionContent className="space-y-3">
                {Object.entries(preExistingConditions).map(([key, value]) => {
                  if (key === "other") {
                    return (
                      <div key={key}>
                        <label className="block text-sm font-medium mb-2">Other Conditions</label>
                        <Input
                          value={value as string}
                          onChange={(e) => handleConditionChange(key, e.target.value)}
                          placeholder="Specify other conditions"
                        />
                      </div>
                    )
                  }
                  return (
                    <div key={key} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`condition-${key}`}
                        checked={value as boolean}
                        onChange={(e) => handleConditionChange(key, e.target.checked)}
                        className="w-4 h-4"
                      />
                      <label htmlFor={`condition-${key}`} className="text-sm capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </label>
                    </div>
                  )
                })}
              </AccordionContent>
            </AccordionItem>

            {/* Pregnancy Complications */}
            <AccordionItem value="complications">
              <AccordionTrigger>Pregnancy Complications (Current or Past)</AccordionTrigger>
              <AccordionContent className="space-y-3">
                {Object.entries(pregnancyComplications).map(([key, value]) => {
                  if (key === "other") {
                    return (
                      <div key={key}>
                        <label className="block text-sm font-medium mb-2">Other Complications</label>
                        <Input
                          value={value as string}
                          onChange={(e) => handleComplicationChange(key, e.target.value)}
                          placeholder="Specify other complications"
                        />
                      </div>
                    )
                  }
                  return (
                    <div key={key} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`complication-${key}`}
                        checked={value as boolean}
                        onChange={(e) => handleComplicationChange(key, e.target.checked)}
                        className="w-4 h-4"
                      />
                      <label htmlFor={`complication-${key}`} className="text-sm capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </label>
                    </div>
                  )
                })}
              </AccordionContent>
            </AccordionItem>

            {/* Allergies */}
            <AccordionItem value="allergies">
              <AccordionTrigger>Allergies</AccordionTrigger>
              <AccordionContent>
                <div>
                  <label className="block text-sm font-medium mb-2">List Allergies (comma-separated)</label>
                  <textarea
                    value={allergies}
                    onChange={(e) => setAllergies(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                    rows={3}
                    placeholder="e.g., Penicillin, Shellfish, Peanuts"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <Button className="w-full">Save Changes</Button>
    </div>
  )
}
