"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function HealthWellnessTab() {
  const categories = [
    {
      id: "1",
      title: "Prenatal Exercises",
      description: "Safe exercises to maintain fitness during pregnancy",
      image: "/prenatal-exercises.jpg",
      articles: 12,
    },
    {
      id: "2",
      title: "Mental Health Support",
      description: "Managing stress, anxiety, and emotional wellbeing",
      image: "/mental-health-pregnancy.jpg",
      articles: 8,
    },
    {
      id: "3",
      title: "Managing Symptoms",
      description: "Tips for common pregnancy discomforts",
      image: "/pregnancy-symptoms-relief.jpg",
      articles: 15,
    },
    {
      id: "4",
      title: "Sleep Tips",
      description: "Improving sleep quality during pregnancy",
      image: "/pregnancy-sleep.jpg",
      articles: 6,
    },
    {
      id: "5",
      title: "Stress Management",
      description: "Relaxation techniques and mindfulness",
      image: "/stress-relief-pregnancy.jpg",
      articles: 10,
    },
    {
      id: "6",
      title: "Common Issues",
      description: "Understanding and addressing health concerns",
      image: "/pregnancy-health-issues.jpg",
      articles: 14,
    },
  ]

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card key={category.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
            <div className="relative overflow-hidden h-40">
              <img
                src={category.image || "/placeholder.svg"}
                alt={category.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-foreground mb-2">{category.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
              <div className="flex items-center justify-between">
                <Badge variant="secondary">{category.articles} articles</Badge>
                <Button variant="ghost" size="sm">
                  Explore
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
