"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Heart, Droplet, Weight, Thermometer, Activity } from "lucide-react"
import { useVitalSigns } from "@/lib/hooks/useVitalSigns"

const vitalSignTypes = [
  { value: 'heart_rate', label: 'Heart Rate', icon: Heart, unit: 'bpm' },
  { value: 'blood_pressure', label: 'Blood Pressure', icon: Droplet, unit: 'mmHg' },
  { value: 'weight', label: 'Weight', icon: Weight, unit: 'kg' },
  { value: 'temperature', label: 'Temperature', icon: Thermometer, unit: '°C' },
  { value: 'blood_sugar', label: 'Blood Sugar', icon: Activity, unit: 'mg/dL' },
  { value: 'oxygen_saturation', label: 'Oxygen Saturation', icon: Activity, unit: '%' }
]

const statusOptions = [
  { value: 'normal', label: 'Normal' },
  { value: 'elevated', label: 'Elevated' },
  { value: 'high', label: 'High' },
  { value: 'low', label: 'Low' },
  { value: 'critical', label: 'Critical' }
]

export function LogVitalSignModal() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    type: '',
    value: '',
    unit: '',
    status: 'normal',
    notes: ''
  })

  const { addVitalSign } = useVitalSigns()

  const selectedType = vitalSignTypes.find(type => type.value === formData.type)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.type || !formData.value) return

    try {
      setLoading(true)
      await addVitalSign({
        type: formData.type,
        value: parseFloat(formData.value),
        unit: selectedType?.unit || formData.unit,
        timestamp: new Date().toISOString(),
        status: formData.status as any
      })
      
      setFormData({
        type: '',
        value: '',
        unit: '',
        status: 'normal',
        notes: ''
      })
      setOpen(false)
    } catch (error) {
      console.error('Error adding vital sign:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleTypeChange = (type: string) => {
    const selected = vitalSignTypes.find(t => t.value === type)
    setFormData(prev => ({
      ...prev,
      type,
      unit: selected?.unit || ''
    }))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Log Vital Sign
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Log New Vital Sign</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Vital Sign Type</Label>
            <Select value={formData.type} onValueChange={handleTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select vital sign type" />
              </SelectTrigger>
              <SelectContent>
                {vitalSignTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div className="flex items-center gap-2">
                      <type.icon className="h-4 w-4" />
                      {type.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="value">Value</Label>
              <Input
                id="value"
                type="number"
                step="0.1"
                value={formData.value}
                onChange={(e) => setFormData(prev => ({ ...prev, value: e.target.value }))}
                placeholder="Enter value"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unit">Unit</Label>
              <Input
                id="unit"
                value={formData.unit}
                onChange={(e) => setFormData(prev => ({ ...prev, unit: e.target.value }))}
                placeholder="Unit"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Add any additional notes..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading || !formData.type || !formData.value}>
              {loading ? 'Logging...' : 'Log Vital Sign'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
