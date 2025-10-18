"use client"

import { useState } from "react"
import { MoreVertical, Pause, Play, Trash2, Edit, History } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface MedicationCard {
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
}

const allMedications: MedicationCard[] = [
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
  },
]

export function AllMedicationsTab() {
  const [medications, setMedications] = useState(allMedications)
  const [filterStatus, setFilterStatus] = useState("all")
  const [sortBy, setSortBy] = useState("name")

  const filteredMeds = medications.filter((med) => {
    if (filterStatus === "all") return true
    return med.status === filterStatus
  })

  const sortedMeds = [...filteredMeds].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name)
      case "frequency":
        return a.frequency.localeCompare(b.frequency)
      case "date":
        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
      default:
        return 0
    }
  })

  const toggleStatus = (id: string) => {
    setMedications(
      medications.map((med) =>
        med.id === id ? { ...med, status: med.status === "active" ? "paused" : "active" } : med,
      ),
    )
  }

  const deleteMedication = (id: string) => {
    setMedications(medications.filter((med) => med.id !== id))
  }

  return (
    <div className="space-y-4">
      {/* Filters and Sort */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <label className="text-sm font-medium text-muted-foreground mb-2 block">Filter by Status</label>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Medications</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <label className="text-sm font-medium text-muted-foreground mb-2 block">Sort by</label>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="frequency">Frequency</SelectItem>
              <SelectItem value="date">Date Added</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Medication Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedMeds.map((med) => (
          <Card key={med.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{med.icon}</span>
                  <div>
                    <h3 className="font-semibold text-foreground">{med.name}</h3>
                    <p className="text-sm text-muted-foreground">{med.dosage}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <History className="h-4 w-4 mr-2" />
                      View History
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => toggleStatus(med.id)}>
                      {med.status === "active" ? (
                        <>
                          <Pause className="h-4 w-4 mr-2" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Resume
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => deleteMedication(med.id)} className="text-destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Frequency</span>
                  <span className="text-sm font-medium">{med.frequency}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Purpose</span>
                  <span className="text-sm font-medium">{med.purpose}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Started</span>
                  <span className="text-sm font-medium">{med.startDate}</span>
                </div>

                {/* Stock Level */}
                <div className="pt-3 border-t border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Stock</span>
                    <span className="text-sm font-medium">
                      {med.stockLevel} of {med.stockMax}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary rounded-full h-2 transition-all"
                      style={{ width: `${(med.stockLevel / med.stockMax) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Status Badge */}
                <div className="pt-3">
                  <Badge
                    className={
                      med.status === "active" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
                    }
                  >
                    {med.status === "active" ? "Active" : "Paused"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {sortedMeds.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No medications found</p>
        </div>
      )}
    </div>
  )
}
