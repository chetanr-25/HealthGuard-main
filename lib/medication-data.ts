export interface Medication {
  id: string
  name: string
  dosage: string
  frequency: string
  purpose: string
  status: "active" | "paused"
  startDate: string
  stockLevel: number
  stockMax: number
  icon: string
  scheduledTimes: string[]
  withFood?: boolean
  notes?: string
}

export const dummyMedications: Medication[] = [
  {
    id: "1",
    name: "Prenatal Multivitamin",
    dosage: "1 tablet",
    frequency: "Once daily",
    purpose: "Prenatal vitamin",
    status: "active",
    startDate: "Jan 15, 2024",
    stockLevel: 28,
    stockMax: 30,
    icon: "💊",
    scheduledTimes: ["9:00 AM"],
    withFood: true,
    notes: "Take with breakfast",
  },
  {
    id: "2",
    name: "Folic Acid 400mcg",
    dosage: "1 tablet",
    frequency: "Once daily",
    purpose: "Prenatal vitamin",
    status: "active",
    startDate: "Jan 15, 2024",
    stockLevel: 25,
    stockMax: 30,
    icon: "💊",
    scheduledTimes: ["9:00 AM"],
  },
  {
    id: "3",
    name: "Iron Supplement 65mg",
    dosage: "1 tablet",
    frequency: "Twice daily",
    purpose: "Iron supplement",
    status: "active",
    startDate: "Feb 1, 2024",
    stockLevel: 45,
    stockMax: 60,
    icon: "💊",
    scheduledTimes: ["9:00 AM", "9:00 PM"],
    withFood: false,
    notes: "Take on empty stomach",
  },
  {
    id: "4",
    name: "Calcium 500mg",
    dosage: "1 tablet",
    frequency: "Once daily",
    purpose: "Calcium supplement",
    status: "active",
    startDate: "Jan 20, 2024",
    stockLevel: 15,
    stockMax: 30,
    icon: "💊",
    scheduledTimes: ["8:00 PM"],
    withFood: true,
  },
  {
    id: "5",
    name: "Omega-3 DHA",
    dosage: "1 capsule",
    frequency: "Once daily",
    purpose: "Omega-3 supplement",
    status: "active",
    startDate: "Jan 15, 2024",
    stockLevel: 20,
    stockMax: 30,
    icon: "💊",
    scheduledTimes: ["9:00 AM"],
  },
]
