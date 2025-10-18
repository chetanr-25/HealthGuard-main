"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { TopNavigation } from "@/components/layout/top-navigation"
import { Sidebar } from "@/components/layout/sidebar"
import { Input } from "@/components/ui/input"
import { SettingsSidebar } from "@/components/settings/settings-sidebar"
import { ProfileAccountSettings } from "@/components/settings/profile-account-settings"
import { PregnancyInformationSettings } from "@/components/settings/pregnancy-information-settings"
import { NotificationsRemindersSettings } from "@/components/settings/notifications-reminders-settings"
import { PrivacySecuritySettings } from "@/components/settings/privacy-security-settings"
import { HealthDataManagementSettings } from "@/components/settings/health-data-management-settings"
import { LanguageRegionSettings } from "@/components/settings/language-region-settings"
import { AccessibilitySettings } from "@/components/settings/accessibility-settings"
import { AppPreferencesSettings } from "@/components/settings/app-preferences-settings"
import { ConnectedDevicesSettings } from "@/components/settings/connected-devices-settings"
import { HelpSupportSettings } from "@/components/settings/help-support-settings"
import { AboutSettings } from "@/components/settings/about-settings"

export default function SettingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeCategory, setActiveCategory] = useState("profile")
  const [searchQuery, setSearchQuery] = useState("")

  const renderSettingsContent = () => {
    switch (activeCategory) {
      case "profile":
        return <ProfileAccountSettings />
      case "pregnancy":
        return <PregnancyInformationSettings />
      case "notifications":
        return <NotificationsRemindersSettings />
      case "privacy":
        return <PrivacySecuritySettings />
      case "health-data":
        return <HealthDataManagementSettings />
      case "language":
        return <LanguageRegionSettings />
      case "accessibility":
        return <AccessibilitySettings />
      case "app-preferences":
        return <AppPreferencesSettings />
      case "devices":
        return <ConnectedDevicesSettings />
      case "help":
        return <HelpSupportSettings />
      case "about":
        return <AboutSettings />
      default:
        return <ProfileAccountSettings />
    }
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Main Sidebar */}
      <Sidebar open={sidebarOpen} onToggle={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <TopNavigation onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        {/* Scrollable Content */}
        <main className="flex-1 overflow-auto">
          <div className="flex h-full">
            {/* Settings Sidebar - Desktop Only */}
            <div className="hidden lg:block w-64 border-r border-border bg-card">
              <SettingsSidebar activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
            </div>

            {/* Main Settings Content */}
            <div className="flex-1 p-4 md:p-6 lg:p-8 max-w-5xl mx-auto w-full">
              {/* Page Header */}
              <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h1 className="text-3xl font-bold text-foreground">Settings</h1>
                <p className="text-muted-foreground mt-1">Customize your experience</p>
              </div>

              {/* Search Bar */}
              <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-75">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search settings..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Mobile Category Selector */}
              <div className="lg:hidden mb-6">
                <select
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground"
                >
                  <option value="profile">Profile & Account</option>
                  <option value="pregnancy">Pregnancy Information</option>
                  <option value="notifications">Notifications & Reminders</option>
                  <option value="privacy">Privacy & Security</option>
                  <option value="health-data">Health Data Management</option>
                  <option value="language">Language & Region</option>
                  <option value="accessibility">Accessibility</option>
                  <option value="app-preferences">App Preferences</option>
                  <option value="devices">Connected Devices</option>
                  <option value="help">Help & Support</option>
                  <option value="about">About</option>
                </select>
              </div>

              {/* Settings Content */}
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
                {renderSettingsContent()}
              </div>

              {/* Bottom Spacing */}
              <div className="h-24" />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
