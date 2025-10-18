"use client"

import { useState } from "react"
import { ChevronRight, ChevronLeft } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

interface AddMedicationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddMedicationModal({ open, onOpenChange }: AddMedicationModalProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    purpose: "",
    dosage: "",
    unit: "",
    form: "",
    instructions: "",
    frequency: "",
    times: [],
    startDate: "",
    duration: "ongoing",
    endDate: "",
    durationDays: "",
    stockTracking: false,
    currentQuantity: "",
    refillThreshold: "",
    notes: "",
  })

  const handleNext = () => {
    if (step < 5) setStep(step + 1)
  }

  const handlePrev = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = () => {
    console.log("Medication added:", formData)
    onOpenChange(false)
    setStep(1)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Medication</DialogTitle>
          <DialogDescription>Step {step} of 5</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Step 1: Basic Information */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Medication Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Prenatal Multivitamin"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="type">Medication Type</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="prescription">Prescription</SelectItem>
                    <SelectItem value="vitamin">Vitamin</SelectItem>
                    <SelectItem value="supplement">Supplement</SelectItem>
                    <SelectItem value="as-needed">As Needed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="purpose">Purpose/Condition</Label>
                <Input
                  id="purpose"
                  placeholder="e.g., Prenatal vitamin"
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                />
              </div>
            </div>
          )}

          {/* Step 2: Dosage Details */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dosage">Dosage Amount</Label>
                  <Input
                    id="dosage"
                    type="number"
                    placeholder="e.g., 500"
                    value={formData.dosage}
                    onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="unit">Unit</Label>
                  <Select value={formData.unit} onValueChange={(value) => setFormData({ ...formData, unit: value })}>
                    <SelectTrigger id="unit">
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mg">mg</SelectItem>
                      <SelectItem value="ml">ml</SelectItem>
                      <SelectItem value="mcg">mcg</SelectItem>
                      <SelectItem value="g">g</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="form">Form</Label>
                <Select value={formData.form} onValueChange={(value) => setFormData({ ...formData, form: value })}>
                  <SelectTrigger id="form">
                    <SelectValue placeholder="Select form" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tablet">Tablet</SelectItem>
                    <SelectItem value="capsule">Capsule</SelectItem>
                    <SelectItem value="liquid">Liquid</SelectItem>
                    <SelectItem value="injection">Injection</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="instructions">Instructions</Label>
                <Textarea
                  id="instructions"
                  placeholder="e.g., Take with food, On empty stomach"
                  value={formData.instructions}
                  onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                />
              </div>
            </div>
          )}

          {/* Step 3: Schedule */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="frequency">Frequency</Label>
                <Select
                  value={formData.frequency}
                  onValueChange={(value) => setFormData({ ...formData, frequency: value })}
                >
                  <SelectTrigger id="frequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="twice">Twice daily</SelectItem>
                    <SelectItem value="thrice">Three times daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="as-needed">As needed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="duration">Duration</Label>
                <Select
                  value={formData.duration}
                  onValueChange={(value) => setFormData({ ...formData, duration: value })}
                >
                  <SelectTrigger id="duration">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ongoing">Ongoing (no end date)</SelectItem>
                    <SelectItem value="until">Until date</SelectItem>
                    <SelectItem value="for">For X days</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.duration === "until" && (
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  />
                </div>
              )}

              {formData.duration === "for" && (
                <div>
                  <Label htmlFor="durationDays">Number of Days</Label>
                  <Input
                    id="durationDays"
                    type="number"
                    placeholder="e.g., 30"
                    value={formData.durationDays}
                    onChange={(e) => setFormData({ ...formData, durationDays: e.target.value })}
                  />
                </div>
              )}
            </div>
          )}

          {/* Step 4: Additional Settings */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                <input
                  type="checkbox"
                  id="stockTracking"
                  checked={formData.stockTracking}
                  onChange={(e) => setFormData({ ...formData, stockTracking: e.target.checked })}
                  className="h-4 w-4"
                />
                <label htmlFor="stockTracking" className="flex-1 cursor-pointer">
                  <p className="font-medium">Enable Stock Tracking</p>
                  <p className="text-sm text-muted-foreground">Track medication quantity and refill reminders</p>
                </label>
              </div>

              {formData.stockTracking && (
                <div className="grid grid-cols-2 gap-4 ml-6">
                  <div>
                    <Label htmlFor="quantity">Current Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      placeholder="e.g., 30"
                      value={formData.currentQuantity}
                      onChange={(e) => setFormData({ ...formData, currentQuantity: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="threshold">Refill Threshold (days)</Label>
                    <Input
                      id="threshold"
                      type="number"
                      placeholder="e.g., 7"
                      value={formData.refillThreshold}
                      onChange={(e) => setFormData({ ...formData, refillThreshold: e.target.value })}
                    />
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Any additional information about this medication"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>
            </div>
          )}

          {/* Step 5: Review */}
          {step === 5 && (
            <div className="space-y-4">
              <Card>
                <CardContent className="pt-6 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Medication:</span>
                    <span className="font-medium">{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type:</span>
                    <span className="font-medium">{formData.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dosage:</span>
                    <span className="font-medium">
                      {formData.dosage} {formData.unit}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Frequency:</span>
                    <span className="font-medium">{formData.frequency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Start Date:</span>
                    <span className="font-medium">{formData.startDate}</span>
                  </div>
                </CardContent>
              </Card>
              <p className="text-sm text-muted-foreground">
                Please review the information above. Click "Add Medication" to confirm.
              </p>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3 justify-between pt-6 border-t border-border">
          <Button variant="outline" onClick={handlePrev} disabled={step === 1} className="gap-2 bg-transparent">
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          {step < 5 ? (
            <Button onClick={handleNext} className="gap-2">
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="bg-success hover:bg-success/90">
              Add Medication
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
