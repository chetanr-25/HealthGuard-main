"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AccessibilitySettings() {
  const [darkMode, setDarkMode] = useState("auto")
  const [fontSize, setFontSize] = useState("medium")
  const [highContrast, setHighContrast] = useState(false)
  const [textToSpeech, setTextToSpeech] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  return (
    <div className="space-y-8">
      {/* Visual Accessibility */}
      <Card>
        <CardHeader>
          <CardTitle>Visual Accessibility</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Dark Mode</label>
            <Select value={darkMode} onValueChange={setDarkMode}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="auto">Auto (based on device)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">Font Size</label>
            <div className="space-y-2">
              <input
                type="range"
                min="1"
                max="4"
                value={["small", "medium", "large", "extra-large"].indexOf(fontSize) + 1}
                onChange={(e) => {
                  const sizes = ["small", "medium", "large", "extra-large"]
                  setFontSize(sizes[Number.parseInt(e.target.value) - 1])
                }}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Small</span>
                <span>Medium</span>
                <span>Large</span>
                <span>Extra Large</span>
              </div>
              <p className="text-sm mt-2">Preview: The quick brown fox jumps over the lazy dog</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">High Contrast Mode</span>
            <input
              type="checkbox"
              checked={highContrast}
              onChange={(e) => setHighContrast(e.target.checked)}
              className="w-4 h-4"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Reduce Transparency</span>
            <input type="checkbox" className="w-4 h-4" />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Color Blind Mode</span>
            <Select defaultValue="none">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="protanopia">Protanopia</SelectItem>
                <SelectItem value="deuteranopia">Deuteranopia</SelectItem>
                <SelectItem value="tritanopia">Tritanopia</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Audio Accessibility */}
      <Card>
        <CardHeader>
          <CardTitle>Audio Accessibility</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm">Text-to-Speech</span>
            <input
              type="checkbox"
              checked={textToSpeech}
              onChange={(e) => setTextToSpeech(e.target.checked)}
              className="w-4 h-4"
            />
          </div>

          {textToSpeech && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">Speech Rate</label>
                <input type="range" min="0.5" max="2" step="0.1" defaultValue="1" className="w-full" />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Slow</span>
                  <span>Normal</span>
                  <span>Fast</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Voice</label>
                <Select defaultValue="female-en">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="female-en">Female (English)</SelectItem>
                    <SelectItem value="male-en">Male (English)</SelectItem>
                    <SelectItem value="female-hi">Female (Hindi)</SelectItem>
                    <SelectItem value="male-hi">Male (Hindi)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button variant="outline" className="w-full bg-transparent">
                Test Voice
              </Button>
            </>
          )}

          <div className="border-t border-border pt-4">
            <h3 className="font-medium mb-3">Hearing Assistance</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Visual notifications (flash screen)</span>
                <input type="checkbox" className="w-4 h-4" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Vibration feedback</span>
                <input type="checkbox" defaultChecked className="w-4 h-4" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Motor Accessibility */}
      <Card>
        <CardHeader>
          <CardTitle>Motor Accessibility</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm">Reduce Motion</span>
            <input
              type="checkbox"
              checked={reduceMotion}
              onChange={(e) => setReduceMotion(e.target.checked)}
              className="w-4 h-4"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Tap Assistance</span>
            <input type="checkbox" className="w-4 h-4" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Touch Tolerance</label>
            <input type="range" min="1" max="10" defaultValue="5" className="w-full" />
          </div>
        </CardContent>
      </Card>

      {/* Cognitive Accessibility */}
      <Card>
        <CardHeader>
          <CardTitle>Cognitive Accessibility</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm">Simplified Interface Mode</span>
            <input type="checkbox" className="w-4 h-4" />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Step-by-step Guidance</span>
            <input type="checkbox" defaultChecked className="w-4 h-4" />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Reading Mode</span>
            <input type="checkbox" className="w-4 h-4" />
          </div>
        </CardContent>
      </Card>

      {/* Screen Reader */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <p className="text-sm font-medium text-primary mb-3">Screen Reader Optimized</p>
          <Button variant="outline" className="w-full mb-2 bg-transparent">
            Test with Screen Reader
          </Button>
          <Button variant="outline" className="w-full bg-transparent">
            Report Accessibility Issue
          </Button>
        </CardContent>
      </Card>

      <Button className="w-full">Save Changes</Button>
    </div>
  )
}
