"use client"

import { useState } from "react"
import { Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function PrivacySecuritySettings() {
  const [dataVisibility, setDataVisibility] = useState("me-providers")
  const [appLock, setAppLock] = useState({
    enabled: true,
    method: "fingerprint",
    autoLockAfter: "5-min",
  })

  const [sessionSettings, setSessionSettings] = useState({
    staySignedIn: true,
    requireAuthForSensitive: true,
    autoLogout: "1-hr",
  })

  return (
    <div className="space-y-8">
      {/* Data Privacy */}
      <Card>
        <CardHeader>
          <CardTitle>Data Privacy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="usage-data" defaultChecked className="w-4 h-4" />
              <label htmlFor="usage-data" className="text-sm">
                Share anonymous usage data
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="research-data" className="w-4 h-4" />
              <label htmlFor="research-data" className="text-sm">
                Share health data for research
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="personalized" defaultChecked className="w-4 h-4" />
              <label htmlFor="personalized" className="text-sm">
                Personalized recommendations
              </label>
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <h3 className="font-medium mb-3">Who can see my data?</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="only-me"
                  name="visibility"
                  value="only-me"
                  checked={dataVisibility === "only-me"}
                  onChange={(e) => setDataVisibility(e.target.value)}
                  className="w-4 h-4"
                />
                <label htmlFor="only-me" className="text-sm">
                  Only me
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="me-providers"
                  name="visibility"
                  value="me-providers"
                  checked={dataVisibility === "me-providers"}
                  onChange={(e) => setDataVisibility(e.target.value)}
                  className="w-4 h-4"
                />
                <label htmlFor="me-providers" className="text-sm">
                  Me and my healthcare providers
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="me-all"
                  name="visibility"
                  value="me-all"
                  checked={dataVisibility === "me-all"}
                  onChange={(e) => setDataVisibility(e.target.value)}
                  className="w-4 h-4"
                />
                <label htmlFor="me-all" className="text-sm">
                  Me, healthcare providers, and emergency contacts
                </label>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Share health summary with partner</span>
              <input type="checkbox" className="w-4 h-4" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* App Lock & Security */}
      <Card>
        <CardHeader>
          <CardTitle>App Lock & Security</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">Enable App Lock</span>
            <input
              type="checkbox"
              checked={appLock.enabled}
              onChange={(e) => setAppLock((prev) => ({ ...prev, enabled: e.target.checked }))}
              className="w-4 h-4"
            />
          </div>

          {appLock.enabled && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">Lock Method</label>
                <div className="space-y-2">
                  {[
                    { value: "pin", label: "PIN (4-6 digits)" },
                    { value: "fingerprint", label: "Fingerprint" },
                    { value: "face", label: "Face ID" },
                    { value: "device", label: "Device Lock" },
                  ].map((method) => (
                    <div key={method.value} className="flex items-center gap-2">
                      <input
                        type="radio"
                        id={`lock-${method.value}`}
                        name="lock-method"
                        value={method.value}
                        checked={appLock.method === method.value}
                        onChange={(e) => setAppLock((prev) => ({ ...prev, method: e.target.value }))}
                        className="w-4 h-4"
                      />
                      <label htmlFor={`lock-${method.value}`} className="text-sm">
                        {method.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Auto-lock After</label>
                <Select
                  value={appLock.autoLockAfter}
                  onValueChange={(value) => setAppLock((prev) => ({ ...prev, autoLockAfter: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediately">Immediately</SelectItem>
                    <SelectItem value="1-min">1 minute</SelectItem>
                    <SelectItem value="5-min">5 minutes</SelectItem>
                    <SelectItem value="15-min">15 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button variant="outline" className="w-full bg-transparent">
                Set up Lock
              </Button>
            </>
          )}

          <div className="border-t border-border pt-4">
            <h3 className="font-medium mb-3">Biometric Authentication</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Use fingerprint</span>
                <input type="checkbox" defaultChecked className="w-4 h-4" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Use face recognition</span>
                <input type="checkbox" className="w-4 h-4" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Session Management */}
      <Card>
        <CardHeader>
          <CardTitle>Session Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm">Stay signed in</span>
            <input
              type="checkbox"
              checked={sessionSettings.staySignedIn}
              onChange={(e) => setSessionSettings((prev) => ({ ...prev, staySignedIn: e.target.checked }))}
              className="w-4 h-4"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Require authentication for sensitive actions</span>
            <input
              type="checkbox"
              checked={sessionSettings.requireAuthForSensitive}
              onChange={(e) => setSessionSettings((prev) => ({ ...prev, requireAuthForSensitive: e.target.checked }))}
              className="w-4 h-4"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Auto logout after inactivity</label>
            <Select
              value={sessionSettings.autoLogout}
              onValueChange={(value) => setSessionSettings((prev) => ({ ...prev, autoLogout: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30-min">30 minutes</SelectItem>
                <SelectItem value="1-hr">1 hour</SelectItem>
                <SelectItem value="4-hrs">4 hours</SelectItem>
                <SelectItem value="never">Never</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Data Encryption */}
      <Card className="border-success/20 bg-success/5">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-success" />
            <div>
              <p className="font-medium text-success">Your data is encrypted</p>
              <p className="text-xs text-muted-foreground">End-to-end encryption protects your health information</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button className="w-full">Save Changes</Button>
    </div>
  )
}
