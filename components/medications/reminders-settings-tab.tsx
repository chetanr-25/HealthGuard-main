"use client"

import { useState } from "react"
import { Bell, Volume2, Vibrate, MapPin, Moon, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function RemindersSettingsTab() {
  const [remindersEnabled, setRemindersEnabled] = useState(true)
  const [reminderTime, setReminderTime] = useState("5")
  const [repeatReminders, setRepeatReminders] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [vibrationEnabled, setVibrationEnabled] = useState(true)
  const [locationBased, setLocationBased] = useState(false)
  const [quietHours, setQuietHours] = useState(true)
  const [quietStart, setQuietStart] = useState("22:00")
  const [quietEnd, setQuietEnd] = useState("08:00")
  const [caregiverEmail, setCaregiverEmail] = useState("")

  return (
    <div className="space-y-6">
      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
          <CardDescription>Customize how you receive medication reminders</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Enable Reminders */}
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Enable Reminders</Label>
              <p className="text-sm text-muted-foreground mt-1">Get notified when it's time to take your medication</p>
            </div>
            <Switch checked={remindersEnabled} onCheckedChange={setRemindersEnabled} />
          </div>

          {remindersEnabled && (
            <>
              {/* Reminder Time */}
              <div>
                <Label className="text-base font-medium mb-3 block">Remind me before</Label>
                <Select value={reminderTime} onValueChange={setReminderTime}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">At scheduled time</SelectItem>
                    <SelectItem value="5">5 minutes before</SelectItem>
                    <SelectItem value="10">10 minutes before</SelectItem>
                    <SelectItem value="15">15 minutes before</SelectItem>
                    <SelectItem value="30">30 minutes before</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Repeat Reminders */}
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Repeat Reminders</Label>
                  <p className="text-sm text-muted-foreground mt-1">Repeat every 5 minutes until taken</p>
                </div>
                <Switch checked={repeatReminders} onCheckedChange={setRepeatReminders} />
              </div>

              {/* Sound */}
              <div>
                <Label className="text-base font-medium mb-3 block flex items-center gap-2">
                  <Volume2 className="h-4 w-4" />
                  Sound
                </Label>
                <div className="flex items-center justify-between">
                  <Select defaultValue="gentle">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="silent">Silent</SelectItem>
                      <SelectItem value="gentle">Gentle</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="loud">Loud</SelectItem>
                    </SelectContent>
                  </Select>
                  <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
                </div>
              </div>

              {/* Vibration */}
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium flex items-center gap-2">
                    <Vibrate className="h-4 w-4" />
                    Vibration
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">Vibrate when reminder is triggered</p>
                </div>
                <Switch checked={vibrationEnabled} onCheckedChange={setVibrationEnabled} />
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Smart Reminders */}
      <Card>
        <CardHeader>
          <CardTitle>Smart Reminders</CardTitle>
          <CardDescription>Intelligent reminder features</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Location-based */}
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Location-based Reminders
              </Label>
              <p className="text-sm text-muted-foreground mt-1">Remind me if I'm away from home</p>
            </div>
            <Switch checked={locationBased} onCheckedChange={setLocationBased} />
          </div>

          {/* Quiet Hours */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <Label className="text-base font-medium flex items-center gap-2">
                <Moon className="h-4 w-4" />
                Quiet Hours
              </Label>
              <Switch checked={quietHours} onCheckedChange={setQuietHours} />
            </div>
            {quietHours && (
              <div className="grid grid-cols-2 gap-4 ml-6">
                <div>
                  <Label className="text-sm">From</Label>
                  <Input type="time" value={quietStart} onChange={(e) => setQuietStart(e.target.value)} />
                </div>
                <div>
                  <Label className="text-sm">To</Label>
                  <Input type="time" value={quietEnd} onChange={(e) => setQuietEnd(e.target.value)} />
                </div>
              </div>
            )}
          </div>

          {/* Reminder Style */}
          <div>
            <Label className="text-base font-medium mb-3 block">Reminder Style</Label>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50">
                <input type="radio" name="style" id="gentle" defaultChecked className="h-4 w-4" />
                <label htmlFor="gentle" className="flex-1 cursor-pointer">
                  <p className="font-medium">Gentle Reminders</p>
                  <p className="text-sm text-muted-foreground">Soft notifications, once per scheduled time</p>
                </label>
              </div>
              <div className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50">
                <input type="radio" name="style" id="persistent" className="h-4 w-4" />
                <label htmlFor="persistent" className="flex-1 cursor-pointer">
                  <p className="font-medium">Persistent Reminders</p>
                  <p className="text-sm text-muted-foreground">Repeat every 5 minutes until taken</p>
                </label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Caregiver Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Caregiver Notifications
          </CardTitle>
          <CardDescription>Keep your caregiver informed about your medication adherence</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-base font-medium mb-2 block">Caregiver Email</Label>
            <Input
              type="email"
              placeholder="caregiver@example.com"
              value={caregiverEmail}
              onChange={(e) => setCaregiverEmail(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Notify on Missed Doses</Label>
              <p className="text-sm text-muted-foreground mt-1">Send alert if a dose is missed</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Daily Summary</Label>
              <p className="text-sm text-muted-foreground mt-1">Send daily adherence summary</p>
            </div>
            <Switch defaultChecked />
          </div>

          <Button className="w-full mt-4">Save Caregiver Settings</Button>
        </CardContent>
      </Card>
    </div>
  )
}
