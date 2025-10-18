"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function LanguageRegionSettings() {
  const [language, setLanguage] = useState("english")
  const [region, setRegion] = useState("india")
  const [dateFormat, setDateFormat] = useState("dd-mm-yyyy")
  const [timeFormat, setTimeFormat] = useState("12-hour")
  const [weightUnit, setWeightUnit] = useState("kg")
  const [heightUnit, setHeightUnit] = useState("cm")
  const [tempUnit, setTempUnit] = useState("celsius")
  const [volumeUnit, setVolumeUnit] = useState("ml")
  const [currency, setCurrency] = useState("inr")

  return (
    <div className="space-y-8">
      {/* Language Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Language Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">App Language</label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="hindi">Hindi</SelectItem>
                <SelectItem value="tamil">Tamil</SelectItem>
                <SelectItem value="telugu">Telugu</SelectItem>
                <SelectItem value="bengali">Bengali</SelectItem>
                <SelectItem value="marathi">Marathi</SelectItem>
                <SelectItem value="gujarati">Gujarati</SelectItem>
                <SelectItem value="kannada">Kannada</SelectItem>
                <SelectItem value="malayalam">Malayalam</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Content Language Preferences</label>
            <div className="space-y-2">
              {["English", "Hindi", "Tamil"].map((lang) => (
                <div key={lang} className="flex items-center gap-2">
                  <input type="checkbox" id={`content-${lang}`} defaultChecked className="w-4 h-4" />
                  <label htmlFor={`content-${lang}`} className="text-sm">
                    {lang}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Region Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Region Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Country</label>
            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="india">India</SelectItem>
                <SelectItem value="usa">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="canada">Canada</SelectItem>
                <SelectItem value="australia">Australia</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Time Zone</label>
            <Select defaultValue="ist">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ist">IST (UTC+5:30)</SelectItem>
                <SelectItem value="est">EST (UTC-5:00)</SelectItem>
                <SelectItem value="pst">PST (UTC-8:00)</SelectItem>
                <SelectItem value="gmt">GMT (UTC+0:00)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Date Format</label>
            <Select value={dateFormat} onValueChange={setDateFormat}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Time Format</label>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="12-hour"
                  name="time-format"
                  value="12-hour"
                  checked={timeFormat === "12-hour"}
                  onChange={(e) => setTimeFormat(e.target.value)}
                  className="w-4 h-4"
                />
                <label htmlFor="12-hour" className="text-sm">
                  12-hour (AM/PM)
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="24-hour"
                  name="time-format"
                  value="24-hour"
                  checked={timeFormat === "24-hour"}
                  onChange={(e) => setTimeFormat(e.target.value)}
                  className="w-4 h-4"
                />
                <label htmlFor="24-hour" className="text-sm">
                  24-hour
                </label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Measurement Units */}
      <Card>
        <CardHeader>
          <CardTitle>Measurement Units</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Weight</label>
            <Select value={weightUnit} onValueChange={setWeightUnit}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kg">Kilograms (kg)</SelectItem>
                <SelectItem value="lbs">Pounds (lbs)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Height</label>
            <Select value={heightUnit} onValueChange={setHeightUnit}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cm">Centimeters (cm)</SelectItem>
                <SelectItem value="ft">Feet/Inches (ft)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Temperature</label>
            <Select value={tempUnit} onValueChange={setTempUnit}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="celsius">Celsius (°C)</SelectItem>
                <SelectItem value="fahrenheit">Fahrenheit (°F)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Liquid Volume</label>
            <Select value={volumeUnit} onValueChange={setVolumeUnit}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ml">Milliliters (ml)</SelectItem>
                <SelectItem value="oz">Fluid Ounces (oz)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Currency */}
      <Card>
        <CardHeader>
          <CardTitle>Currency</CardTitle>
        </CardHeader>
        <CardContent>
          <label className="block text-sm font-medium mb-2">Preferred Currency</label>
          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="inr">Indian Rupee (INR)</SelectItem>
              <SelectItem value="usd">US Dollar (USD)</SelectItem>
              <SelectItem value="eur">Euro (EUR)</SelectItem>
              <SelectItem value="gbp">British Pound (GBP)</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Button className="w-full">Save Changes</Button>
    </div>
  )
}
