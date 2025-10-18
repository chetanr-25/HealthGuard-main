"use client"

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Heart, Phone, User, X, XCircle } from 'lucide-react'
import { useUserProfile } from '@/lib/hooks/useUserProfile'

interface OnboardingModalProps {
  open: boolean
  onClose: () => void
}

interface EmergencyContact {
  id: string
  name: string
  relationship: string
  phone: string
  priority: 'high' | 'medium' | 'low'
}

export function OnboardingModal({ open, onClose }: OnboardingModalProps) {
  const { completeOnboarding, loading } = useUserProfile()
  const [currentStep, setCurrentStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    dueDate: '',
    bloodType: '',
    medicalHistory: '',
    emergencyContacts: [] as EmergencyContact[]
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitError, setSubmitError] = useState<string | null>(null)

  // Handle modal close - reset form state when closing
  const handleClose = () => {
    setCurrentStep(1)
    setSubmitting(false)
    setErrors({})
    setSubmitError(null)
    setFormData({
      dueDate: '',
      bloodType: '',
      medicalHistory: '',
      emergencyContacts: []
    })
    onClose()
  }

  const totalSteps = 4

  const bloodTypes = [
    'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'
  ]

  const relationships = [
    'Partner/Spouse', 'Parent', 'Sibling', 'Friend', 'Doctor', 'Other'
  ]

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.dueDate) {
        newErrors.dueDate = 'Due date is required'
      } else {
        const dueDate = new Date(formData.dueDate)
        const today = new Date()
        if (dueDate <= today) {
          newErrors.dueDate = 'Due date must be in the future'
        }
      }
      if (!formData.bloodType) {
        newErrors.bloodType = 'Blood type is required'
      }
    }

    if (step === 4) {
      if (formData.emergencyContacts.length === 0) {
        newErrors.emergencyContacts = 'At least one emergency contact is required'
      } else {
        // Validate each emergency contact
        for (let i = 0; i < formData.emergencyContacts.length; i++) {
          const contact = formData.emergencyContacts[i]
          if (!contact.name.trim()) {
            newErrors.emergencyContacts = `Contact ${i + 1}: Name is required`
            break
          }
          if (!contact.relationship.trim()) {
            newErrors.emergencyContacts = `Contact ${i + 1}: Relationship is required`
            break
          }
          if (!contact.phone.trim()) {
            newErrors.emergencyContacts = `Contact ${i + 1}: Phone number is required`
            break
          }
        }
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps))
    }
  }

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return

    try {
      setSubmitting(true)
      setSubmitError(null)
      await completeOnboarding({
        dueDate: formData.dueDate,
        bloodType: formData.bloodType,
        medicalHistory: formData.medicalHistory ? formData.medicalHistory.split(',').map(s => s.trim()) : [],
        emergencyContacts: formData.emergencyContacts
      })
      handleClose()
    } catch (error) {
      console.error('Error completing onboarding:', error)
      setSubmitError(error instanceof Error ? error.message : 'Failed to complete onboarding. Please try again.')
      // Don't close the modal on error, let user try again
    } finally {
      setSubmitting(false)
    }
  }

  const addEmergencyContact = () => {
    const newContact: EmergencyContact = {
      id: Date.now().toString(),
      name: '',
      relationship: '',
      phone: '',
      priority: 'medium'
    }
    setFormData(prev => ({
      ...prev,
      emergencyContacts: [...prev.emergencyContacts, newContact]
    }))
  }

  const removeEmergencyContact = (id: string) => {
    setFormData(prev => ({
      ...prev,
      emergencyContacts: prev.emergencyContacts.filter(contact => contact.id !== id)
    }))
  }

  const updateEmergencyContact = (id: string, field: keyof EmergencyContact, value: string) => {
    setFormData(prev => ({
      ...prev,
      emergencyContacts: prev.emergencyContacts.map(contact =>
        contact.id === id ? { ...contact, [field]: value } : contact
      )
    }))
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Pregnancy Information</h3>
              <p className="text-muted-foreground">Let's start with your basic pregnancy details</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="dueDate">Due Date *</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                  className={errors.dueDate ? 'border-red-500' : ''}
                />
                {errors.dueDate && <p className="text-sm text-red-500 mt-1">{errors.dueDate}</p>}
              </div>

              <div>
                <Label htmlFor="bloodType">Blood Type *</Label>
                <Select
                  value={formData.bloodType}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, bloodType: value }))}
                >
                  <SelectTrigger className={errors.bloodType ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select your blood type" />
                  </SelectTrigger>
                  <SelectContent>
                    {bloodTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.bloodType && <p className="text-sm text-red-500 mt-1">{errors.bloodType}</p>}
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Medical History</h3>
              <p className="text-muted-foreground">Help us understand your health background</p>
            </div>

            <div>
              <Label htmlFor="medicalHistory">Medical Conditions</Label>
              <Textarea
                id="medicalHistory"
                placeholder="List any pre-existing conditions, allergies, or previous pregnancy complications (comma-separated)"
                value={formData.medicalHistory}
                onChange={(e) => setFormData(prev => ({ ...prev, medicalHistory: e.target.value }))}
                rows={4}
              />
              <p className="text-sm text-muted-foreground mt-1">
                This information helps us provide more accurate health assessments
              </p>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Emergency Contacts</h3>
              <p className="text-muted-foreground">Add people we can contact in case of emergency</p>
            </div>

            <div className="space-y-4">
              {formData.emergencyContacts.map((contact, index) => (
                <Card key={contact.id} className="relative">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm">Contact {index + 1}</CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeEmergencyContact(contact.id)}
                        className="h-6 w-6 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor={`name-${contact.id}`}>Name</Label>
                        <Input
                          id={`name-${contact.id}`}
                          value={contact.name}
                          onChange={(e) => updateEmergencyContact(contact.id, 'name', e.target.value)}
                          placeholder="Full name"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`relationship-${contact.id}`}>Relationship</Label>
                        <Select
                          value={contact.relationship}
                          onValueChange={(value) => updateEmergencyContact(contact.id, 'relationship', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select relationship" />
                          </SelectTrigger>
                          <SelectContent>
                            {relationships.map(rel => (
                              <SelectItem key={rel} value={rel}>{rel}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor={`phone-${contact.id}`}>Phone</Label>
                        <Input
                          id={`phone-${contact.id}`}
                          value={contact.phone}
                          onChange={(e) => updateEmergencyContact(contact.id, 'phone', e.target.value)}
                          placeholder="Phone number"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`priority-${contact.id}`}>Priority</Label>
                        <Select
                          value={contact.priority}
                          onValueChange={(value) => updateEmergencyContact(contact.id, 'priority', value as 'high' | 'medium' | 'low')}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Button
                variant="outline"
                onClick={addEmergencyContact}
                className="w-full"
              >
                <Phone className="w-4 h-4 mr-2" />
                Add Emergency Contact
              </Button>

              {errors.emergencyContacts && (
                <p className="text-sm text-red-500">{errors.emergencyContacts}</p>
              )}
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">You're All Set!</h3>
              <p className="text-muted-foreground">Review your information and complete setup</p>
            </div>

            <div className="space-y-4">
              {submitError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <XCircle className="h-5 w-5 text-red-500 mr-2" />
                    <p className="text-sm text-red-700">{submitError}</p>
                  </div>
                </div>
              )}
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Pregnancy Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Due Date:</span>
                    <span className="text-sm font-medium">{formData.dueDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Blood Type:</span>
                    <Badge variant="secondary">{formData.bloodType}</Badge>
                  </div>
                </CardContent>
              </Card>

              {formData.medicalHistory && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Medical History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{formData.medicalHistory}</p>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Emergency Contacts</CardTitle>
                  <CardDescription>{formData.emergencyContacts.length} contact(s) added</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {formData.emergencyContacts.map((contact, index) => (
                      <div key={contact.id} className="flex justify-between items-center">
                        <div>
                          <span className="text-sm font-medium">{contact.name}</span>
                          <span className="text-sm text-muted-foreground ml-2">({contact.relationship})</span>
                        </div>
                        <Badge variant={contact.priority === 'high' ? 'destructive' : 'secondary'}>
                          {contact.priority}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Welcome to HealthGuard AI</DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-6 w-6 p-0"
            >
              <XCircle className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress indicator */}
          <div className="flex items-center justify-center space-x-2">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  i + 1 <= currentStep
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>

          {/* Step content */}
          {renderStep()}

          {/* Navigation buttons */}
          <div className="flex justify-between pt-4">
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              {currentStep === 1 && (
                <Button
                  variant="ghost"
                  onClick={handleClose}
                  className="text-muted-foreground"
                >
                  Skip for now
                </Button>
              )}
            </div>

            {currentStep < totalSteps ? (
              <Button onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={loading || submitting}>
                {loading || submitting ? 'Completing...' : 'Complete Setup'}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
