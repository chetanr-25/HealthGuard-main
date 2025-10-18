"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function NotificationsRemindersSettings() {
  const [masterEnabled, setMasterEnabled] = useState(true)
  const [quietHours, setQuietHours] = useState({
    enabled: true,
    startTime: "22:00",
    endTime: "07:00",
    weekendOnly: false,
  })

  const [notifications, setNotifications] = useState({
    medicationReminders: true,
    appointmentReminders: true,
    healthAlerts: true,
    educationalContent: true,
    aiInsights: true,
    appUpdates: true,
  })

  const [channels, setChannels] = useState({
    push: true,
    email: true,
    sms: false,
    whatsapp: false,
  })

  const handleToggle = (key: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }))
  }

  const handleChannelToggle = (channel: string, value: boolean) => {
    setChannels((prev) => ({ ...prev, [channel]: value }))
  }

  return (
    <div className="space-y-8">
      {/* Master Control */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Control</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">Enable All Notifications</span>
            <input
              type="checkbox"
              checked={masterEnabled}
              onChange={(e) => setMasterEnabled(e.target.checked)}
              className="w-4 h-4"
            />
          </div>

          {/* Quiet Hours */}
          <div className="border-t border-border pt-4">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium">Quiet Hours</span>
              <input
                type="checkbox"
                checked={quietHours.enabled}
                onChange={(e) => setQuietHours((prev) => ({ ...prev, enabled: e.target.checked }))}
                className="w-4 h-4"
              />
            </div>
            {quietHours.enabled && (
              <div className="space-y-3 ml-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2">Start Time</label>
                    <input
                      type="time"
                      value={quietHours.startTime}
                      onChange={(e) => setQuietHours((prev) => ({ ...prev, startTime: e.target.value }))}
                      className="w-full px-3 py-2 border border-border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">End Time</label>
                    <input
                      type="time"
                      value={quietHours.endTime}
                      onChange={(e) => setQuietHours((prev) => ({ ...prev, endTime: e.target.value }))}
                      className="w-full px-3 py-2 border border-border rounded-lg"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="weekend-quiet"
                    checked={quietHours.weekendOnly}
                    onChange={(e) => setQuietHours((prev) => ({ ...prev, weekendOnly: e.target.checked }))}
                    className="w-4 h-4"
                  />
                  <label htmlFor="weekend-quiet" className="text-sm">
                    Do Not Disturb on weekends
                  </label>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Notification Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {/* Medication Reminders */}
            <AccordionItem value="medication">
              <AccordionTrigger>Medication Reminders</AccordionTrigger>
              <AccordionContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Enable medication reminders</span>
                  <input
                    type="checkbox"
                    checked={notifications.medicationReminders}
                    onChange={(e) => handleToggle("medicationReminders", e.target.checked)}
                    className="w-4 h-4"
                  />
                </div>
                {notifications.medicationReminders && (
                  <>
                    <div>
                      <label className="block text-sm mb-2">Reminder Timing</label>
                      <Select defaultValue="at-time">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="at-time">At time</SelectItem>
                          <SelectItem value="5-min">5 minutes before</SelectItem>
                          <SelectItem value="15-min">15 minutes before</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="persistent" defaultChecked className="w-4 h-4" />
                      <label htmlFor="persistent" className="text-sm">
                        Persistent reminders (repeat every 5 min)
                      </label>
                    </div>
                  </>
                )}
              </AccordionContent>
            </AccordionItem>

            {/* Appointment Reminders */}
            <AccordionItem value="appointment">
              <AccordionTrigger>Appointment Reminders</AccordionTrigger>
              <AccordionContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Enable appointment reminders</span>
                  <input
                    type="checkbox"
                    checked={notifications.appointmentReminders}
                    onChange={(e) => handleToggle("appointmentReminders", e.target.checked)}
                    className="w-4 h-4"
                  />
                </div>
                {notifications.appointmentReminders && (
                  <div className="space-y-2">
                    {["1 week before", "3 days before", "1 day before", "2 hours before", "30 minutes before"].map(
                      (time) => (
                        <div key={time} className="flex items-center gap-2">
                          <input type="checkbox" id={time} defaultChecked className="w-4 h-4" />
                          <label htmlFor={time} className="text-sm">
                            {time}
                          </label>
                        </div>
                      ),
                    )}
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>

            {/* Health Monitoring Alerts */}
            <AccordionItem value="health">
              <AccordionTrigger>Health Monitoring Alerts</AccordionTrigger>
              <AccordionContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Daily health check-in reminder</span>
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Abnormal readings alerts</span>
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Baby kick counter reminders</span>
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Educational Content */}
            <AccordionItem value="education">
              <AccordionTrigger>Educational Content</AccordionTrigger>
              <AccordionContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Weekly pregnancy updates</span>
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Daily tips</span>
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">New articles notification</span>
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* AI Insights */}
            <AccordionItem value="ai">
              <AccordionTrigger>AI Insights</AccordionTrigger>
              <AccordionContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Health risk alerts</span>
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Predictive recommendations</span>
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Trend analysis summaries</span>
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      {/* Notification Channels */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Channels</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Push notifications</span>
            <input
              type="checkbox"
              checked={channels.push}
              onChange={(e) => handleChannelToggle("push", e.target.checked)}
              className="w-4 h-4"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Email notifications</span>
            <input
              type="checkbox"
              checked={channels.email}
              onChange={(e) => handleChannelToggle("email", e.target.checked)}
              className="w-4 h-4"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">SMS notifications</span>
            <input
              type="checkbox"
              checked={channels.sms}
              onChange={(e) => handleChannelToggle("sms", e.target.checked)}
              className="w-4 h-4"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">
              WhatsApp notifications{" "}
              <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">Coming soon</span>
            </span>
            <input type="checkbox" checked={channels.whatsapp} disabled className="w-4 h-4" />
          </div>
          <Button variant="outline" className="w-full mt-4 bg-transparent">
            Send Test Notification
          </Button>
        </CardContent>
      </Card>

      <Button className="w-full">Save Changes</Button>
    </div>
  )
}
