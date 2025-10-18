"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AppPreferencesSettings() {
  const [homePage, setHomePage] = useState("dashboard")
  const [chartType, setChartType] = useState("line")
  const [offlineMode, setOfflineMode] = useState(true)
  const [imageQuality, setImageQuality] = useState("medium")
  const [betaFeatures, setBetaFeatures] = useState(false)

  return (
    <div className="space-y-8">
      {/* Interface Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Interface Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Home Page</label>
            <Select value={homePage} onValueChange={setHomePage}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dashboard">Dashboard</SelectItem>
                <SelectItem value="health-monitoring">Health Monitoring</SelectItem>
                <SelectItem value="timeline">Timeline</SelectItem>
                <SelectItem value="education">Education</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Navigation Style</label>
            <div className="space-y-2">
              {[
                { value: "sidebar", label: "Sidebar (Desktop)" },
                { value: "top-menu", label: "Top Menu" },
                { value: "bottom-tabs", label: "Bottom Tabs (Mobile)" },
              ].map((style) => (
                <div key={style.value} className="flex items-center gap-2">
                  <input
                    type="radio"
                    id={`nav-${style.value}`}
                    name="nav-style"
                    value={style.value}
                    defaultChecked={style.value === "sidebar"}
                    className="w-4 h-4"
                  />
                  <label htmlFor={`nav-${style.value}`} className="text-sm">
                    {style.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chart & Graph Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Chart & Graph Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Default Chart Type</label>
            <Select value={chartType} onValueChange={setChartType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="line">Line Chart</SelectItem>
                <SelectItem value="bar">Bar Chart</SelectItem>
                <SelectItem value="area">Area Chart</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Chart Animation</span>
            <input type="checkbox" defaultChecked className="w-4 h-4" />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Show Data Labels</span>
            <input type="checkbox" defaultChecked className="w-4 h-4" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Date Range Default</label>
            <Select defaultValue="30-days">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7-days">7 Days</SelectItem>
                <SelectItem value="30-days">30 Days</SelectItem>
                <SelectItem value="all-time">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Offline Mode */}
      <Card>
        <CardHeader>
          <CardTitle>Offline Mode</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm">Enable Offline Mode</span>
            <input
              type="checkbox"
              checked={offlineMode}
              onChange={(e) => setOfflineMode(e.target.checked)}
              className="w-4 h-4"
            />
          </div>

          {offlineMode && (
            <>
              <div className="flex items-center justify-between">
                <span className="text-sm">Download Content for Offline Use</span>
                <input type="checkbox" defaultChecked className="w-4 h-4" />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Auto-download New Content</span>
                <input type="checkbox" className="w-4 h-4" />
              </div>

              <Button variant="outline" className="w-full bg-transparent">
                Download Now
              </Button>

              <div className="bg-muted p-3 rounded-lg">
                <p className="text-sm">Offline storage used: 245 MB</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Performance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Image Quality</label>
            <Select value={imageQuality} onValueChange={setImageQuality}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High (slower loading)</SelectItem>
                <SelectItem value="medium">Medium (balanced)</SelectItem>
                <SelectItem value="low">Low (faster loading)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Reduce Animations</span>
            <input type="checkbox" className="w-4 h-4" />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Background App Refresh</span>
            <input type="checkbox" defaultChecked className="w-4 h-4" />
          </div>
        </CardContent>
      </Card>

      {/* Beta Features */}
      <Card>
        <CardHeader>
          <CardTitle>Beta Features</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm">Participate in Beta Testing</span>
            <input
              type="checkbox"
              checked={betaFeatures}
              onChange={(e) => setBetaFeatures(e.target.checked)}
              className="w-4 h-4"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Early Access to New Features</span>
            <input type="checkbox" className="w-4 h-4" />
          </div>

          {betaFeatures && (
            <Button variant="outline" className="w-full bg-transparent">
              View Beta Features
            </Button>
          )}
        </CardContent>
      </Card>

      <Button className="w-full">Save Changes</Button>
    </div>
  )
}
