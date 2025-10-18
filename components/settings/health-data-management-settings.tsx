"use client"

import { useState } from "react"
import { Download, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function HealthDataManagementSettings() {
  const [cloudBackup, setCloudBackup] = useState({
    enabled: true,
    lastBackup: "2025-01-18 14:30",
    storageUsed: 450,
    storageTotal: 2048,
  })

  const [autoSync, setAutoSync] = useState({
    enabled: true,
    frequency: "real-time",
  })

  const dataOverview = [
    { type: "Vital Signs", count: 156 },
    { type: "Appointments", count: 12 },
    { type: "Medications", count: 5 },
    { type: "Lab Results", count: 8 },
    { type: "Notes", count: 34 },
  ]

  const connectedApps = [
    { name: "Google Fit", status: "connected" },
    { name: "Apple Health", status: "disconnected" },
    { name: "Fitbit", status: "connected" },
  ]

  return (
    <div className="space-y-8">
      {/* Data Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Data Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {dataOverview.map((item) => (
              <div key={item.type} className="text-center p-3 bg-muted rounded-lg">
                <p className="text-2xl font-bold text-primary">{item.count}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.type}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Data Export */}
      <Card>
        <CardHeader>
          <CardTitle>Data Export</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium mb-3">Export All Data</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-2">Format</label>
                <Select defaultValue="json">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="json">JSON</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Date Range</label>
                <div className="flex gap-2">
                  <input type="date" className="flex-1 px-3 py-2 border border-border rounded-lg" />
                  <input type="date" className="flex-1 px-3 py-2 border border-border rounded-lg" />
                </div>
              </div>
              <Button className="w-full gap-2">
                <Download className="h-4 w-4" />
                Generate Export
              </Button>
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Scheduled exports</span>
              <input type="checkbox" className="w-4 h-4" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Import */}
      <Card>
        <CardHeader>
          <CardTitle>Data Import</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full gap-2 bg-transparent">
            <Upload className="h-4 w-4" />
            Import Health Records
          </Button>
          <Button variant="outline" className="w-full bg-transparent">
            Import from Wearable Device
          </Button>
          <Button variant="outline" className="w-full bg-transparent">
            Import from Other Health Apps
          </Button>
        </CardContent>
      </Card>

      {/* Cloud Backup */}
      <Card>
        <CardHeader>
          <CardTitle>Cloud Backup</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">Cloud Backup</span>
            <input
              type="checkbox"
              checked={cloudBackup.enabled}
              onChange={(e) => setCloudBackup((prev) => ({ ...prev, enabled: e.target.checked }))}
              className="w-4 h-4"
            />
          </div>

          {cloudBackup.enabled && (
            <>
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-sm">Last backed up: {cloudBackup.lastBackup}</p>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Storage Used</span>
                  <span className="text-sm font-medium">
                    {cloudBackup.storageUsed} MB of {cloudBackup.storageTotal} MB
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: `${(cloudBackup.storageUsed / cloudBackup.storageTotal) * 100}%` }}
                  />
                </div>
              </div>

              <Button variant="outline" className="w-full bg-transparent">
                Backup Now
              </Button>
              <Button variant="outline" className="w-full text-primary bg-transparent">
                Upgrade Storage
              </Button>
            </>
          )}

          <div className="border-t border-border pt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Auto-sync</span>
              <input
                type="checkbox"
                checked={autoSync.enabled}
                onChange={(e) => setAutoSync((prev) => ({ ...prev, enabled: e.target.checked }))}
                className="w-4 h-4"
              />
            </div>
            {autoSync.enabled && (
              <div className="mt-3">
                <label className="block text-sm font-medium mb-2">Sync Frequency</label>
                <Select
                  value={autoSync.frequency}
                  onValueChange={(value) => setAutoSync((prev) => ({ ...prev, frequency: value }))}
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
            )}
          </div>
        </CardContent>
      </Card>

      {/* Connected Apps */}
      <Card>
        <CardHeader>
          <CardTitle>Connected Apps & Services</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {connectedApps.map((app) => (
            <div key={app.name} className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div>
                <p className="font-medium text-sm">{app.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{app.status}</p>
              </div>
              <Button variant="outline" size="sm">
                {app.status === "connected" ? "Disconnect" : "Connect"}
              </Button>
            </div>
          ))}
          <Button variant="outline" className="w-full mt-4 bg-transparent">
            Connect New App
          </Button>
        </CardContent>
      </Card>

      {/* Data Deletion */}
      <Card>
        <CardHeader>
          <CardTitle>Data Deletion</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {["Vitals Data", "Appointment History", "Medication Logs", "AI Analysis History"].map((item) => (
              <AccordionItem key={item} value={item.toLowerCase()}>
                <AccordionTrigger>Delete {item}</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">This action cannot be undone.</p>
                    <Button variant="destructive" className="w-full">
                      Delete {item}
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <Button className="w-full">Save Changes</Button>
    </div>
  )
}
