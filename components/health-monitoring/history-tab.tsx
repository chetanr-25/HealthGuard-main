"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2, Edit2, Download, Search } from "lucide-react"

const historyData = [
  {
    date: "2024-10-18",
    entries: [
      { time: "09:30", type: "Heart Rate", value: "72 bpm", notes: "After breakfast" },
      { time: "14:15", type: "Blood Pressure", value: "120/80 mmHg", notes: "Afternoon check" },
      { time: "19:45", type: "Weight", value: "68.5 kg", notes: "Evening measurement" },
    ],
  },
  {
    date: "2024-10-17",
    entries: [
      { time: "08:00", type: "Heart Rate", value: "70 bpm", notes: "Morning reading" },
      { time: "12:30", type: "Baby Kicks", value: "12 kicks", notes: "Counted during lunch" },
    ],
  },
  {
    date: "2024-10-16",
    entries: [
      { time: "07:45", type: "Temperature", value: "36.8 °C", notes: "Normal" },
      { time: "15:20", type: "Blood Glucose", value: "95 mg/dL", notes: "Fasting" },
    ],
  },
]

export function HistoryTab() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")

  const filteredData = historyData.map((day) => ({
    ...day,
    entries: day.entries.filter((entry) => {
      const matchesSearch =
        entry.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.value.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.notes.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilter = filterType === "all" || entry.type === filterType
      return matchesSearch && matchesFilter
    }),
  }))

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search health data..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Heart Rate">Heart Rate</SelectItem>
            <SelectItem value="Blood Pressure">Blood Pressure</SelectItem>
            <SelectItem value="Weight">Weight</SelectItem>
            <SelectItem value="Temperature">Temperature</SelectItem>
            <SelectItem value="Blood Glucose">Blood Glucose</SelectItem>
            <SelectItem value="Baby Kicks">Baby Kicks</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* History List */}
      <div className="space-y-4">
        {filteredData.map((day) =>
          day.entries.length > 0 ? (
            <div key={day.date} className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <h3 className="text-sm font-semibold text-foreground mb-3 px-4">
                {new Date(day.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h3>
              <div className="space-y-2">
                {day.entries.map((entry, idx) => (
                  <Card key={idx} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <div className="text-sm font-medium text-foreground">{entry.type}</div>
                            <div className="text-lg font-bold text-primary">{entry.value}</div>
                          </div>
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <span>{entry.time}</span>
                            <span>{entry.notes}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="icon" variant="ghost" className="h-8 w-8">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : null,
        )}
      </div>

      {filteredData.every((day) => day.entries.length === 0) && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">No health data found matching your search.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
