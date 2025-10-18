"use client"

import { useState } from "react"
import { TopNavigation } from "@/components/layout/top-navigation"
import { Sidebar } from "@/components/layout/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { ForYouTab } from "@/components/education/for-you-tab"
import { PregnancyStagesTab } from "@/components/education/pregnancy-stages-tab"
import { HealthWellnessTab } from "@/components/education/health-wellness-tab"
import { NutritionTab } from "@/components/education/nutrition-tab"
import { BabyCareTab } from "@/components/education/baby-care-tab"
import { LaborDeliveryTab } from "@/components/education/labor-delivery-tab"
import { PostpartumTab } from "@/components/education/postpartum-tab"
import { LanguageSelector } from "@/components/education/language-selector"
import { AskAIButton } from "@/components/education/ask-ai-button"

export default function EducationPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [language, setLanguage] = useState("en")

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavigation onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 overflow-y-auto">
          {/* Page Header */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-border">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Education & Resources</h1>
                  <p className="text-muted-foreground">Learn everything about your pregnancy journey</p>
                </div>
                <LanguageSelector language={language} onLanguageChange={setLanguage} />
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="sticky top-0 z-30 bg-card border-b border-border">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search articles, videos, tips..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-muted border-border"
                />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
            <Tabs defaultValue="for-you" className="w-full">
              <TabsList className="grid w-full grid-cols-4 md:grid-cols-7 mb-8 bg-muted p-1 rounded-lg">
                <TabsTrigger value="for-you" className="text-xs md:text-sm">
                  For You
                </TabsTrigger>
                <TabsTrigger value="stages" className="text-xs md:text-sm">
                  Stages
                </TabsTrigger>
                <TabsTrigger value="wellness" className="text-xs md:text-sm">
                  Wellness
                </TabsTrigger>
                <TabsTrigger value="nutrition" className="text-xs md:text-sm">
                  Nutrition
                </TabsTrigger>
                <TabsTrigger value="baby" className="hidden md:block text-xs md:text-sm">
                  Baby Care
                </TabsTrigger>
                <TabsTrigger value="labor" className="hidden md:block text-xs md:text-sm">
                  Labor
                </TabsTrigger>
                <TabsTrigger value="postpartum" className="hidden md:block text-xs md:text-sm">
                  Postpartum
                </TabsTrigger>
              </TabsList>

              <TabsContent value="for-you" className="space-y-8 animate-fade-in">
                <ForYouTab searchQuery={searchQuery} />
              </TabsContent>

              <TabsContent value="stages" className="space-y-8 animate-fade-in">
                <PregnancyStagesTab />
              </TabsContent>

              <TabsContent value="wellness" className="space-y-8 animate-fade-in">
                <HealthWellnessTab />
              </TabsContent>

              <TabsContent value="nutrition" className="space-y-8 animate-fade-in">
                <NutritionTab />
              </TabsContent>

              <TabsContent value="baby" className="space-y-8 animate-fade-in">
                <BabyCareTab />
              </TabsContent>

              <TabsContent value="labor" className="space-y-8 animate-fade-in">
                <LaborDeliveryTab />
              </TabsContent>

              <TabsContent value="postpartum" className="space-y-8 animate-fade-in">
                <PostpartumTab />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>

      {/* Ask AI Button */}
      <AskAIButton />
    </div>
  )
}
