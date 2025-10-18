"use client"

import { useState } from "react"
import { Plus, Trash2, RotateCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ConnectedDevicesSettings() {
  const [devices, setDevices] = useState([
    { id: 1, name: "Fitbit Charge 5", status: "connected", battery: 85, lastSync: "2 hours ago" },
    { id: 2, name: "Apple Watch Series 8", status: "connected", battery: 60, lastSync: "30 minutes ago" },
  ])

  const [dataSync, setDataSync] = useState({
    heartRate: true,
    steps: true,
    sleep: true,
    activity: true,
    frequency: "real-time",
  })

  return (
    <div className="space-y-8">
      {/* Wearable Devices */}
      <Card>
        <CardHeader>
          <CardTitle>Wearable Devices</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {devices.map((device) => (
            <div key={device.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div className="flex-1">
                <p className="font-medium text-sm">{device.name}</p>
                <div className="flex gap-4 mt-1 text-xs text-muted-foreground">
                  <span className="capitalize">{device.status}</span>
                  <span>Battery: {device.battery}%</span>
                  <span>Last synced: {device.lastSync}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="gap-1">
                  <RotateCw className="h-4 w-4" />
                  Sync
                </Button>
                <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}

          <Button variant="outline" className="w-full gap-2 bg-transparent">
            <Plus className="h-4 w-4" />
            Add New Device
          </Button>
        </CardContent>
      </Card>

      {/* Data from Devices */}
      <Card>
        <CardHeader>
          <CardTitle>Data from Devices</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <h3 className="font-medium text-sm">Configure what data to import:</h3>
          <div className="space-y-2">
            {[
              { key: "heartRate", label: "Heart Rate" },
              { key: "steps", label: "Steps" },
              { key: "sleep", label: "Sleep Data" },
              { key: "activity", label: "Activity/Exercise" },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between">
                <span className="text-sm">{item.label}</span>
                <input
                  type="checkbox"
                  checked={dataSync[item.key as keyof typeof dataSync] as boolean}
                  onChange={(e) => setDataSync((prev) => ({ ...prev, [item.key]: e.target.checked }))}
                  className="w-4 h-4"
                />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Sync Frequency</label>
            <Select
              value={dataSync.frequency}
              onValueChange={(value) => setDataSync((prev) => ({ ...prev, frequency: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="real-time">Real-time</SelectItem>
                <SelectItem value="hourly">Hourly</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="manual">Manual</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Medical Devices */}
      <Card>
        <CardHeader>
          <CardTitle>Medical Devices</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full bg-transparent">
            Connect Blood Pressure Monitor
          </Button>
          <Button variant="outline" className="w-full bg-transparent">
            Connect Glucose Meter
          </Button>
          <Button variant="outline" className="w-full bg-transparent">
            Connect Smart Thermometer
          </Button>
          <Button variant="outline" className="w-full text-muted-foreground bg-transparent" disabled>
            Connect Fetal Doppler (Coming Soon)
          </Button>
        </CardContent>
      </Card>

      <Button className="w-full">Save Changes</Button>
    </div>
  )
}
