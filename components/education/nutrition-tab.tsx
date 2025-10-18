"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"

export function NutritionTab() {
  const [supplements, setSupplements] = useState({
    prenatal: false,
    iron: false,
    calcium: false,
    omega3: false,
  })

  const foodsToEat = [
    { name: "Leafy Greens", benefits: "Folate, iron, calcium" },
    { name: "Lean Proteins", benefits: "Amino acids, iron" },
    { name: "Whole Grains", benefits: "Fiber, B vitamins" },
    { name: "Dairy Products", benefits: "Calcium, protein" },
    { name: "Fruits & Berries", benefits: "Vitamins, antioxidants" },
    { name: "Nuts & Seeds", benefits: "Healthy fats, minerals" },
  ]

  const foodsToAvoid = [
    { name: "Raw Fish", reason: "Risk of bacteria and parasites" },
    { name: "Unpasteurized Dairy", reason: "Listeria risk" },
    { name: "High Mercury Fish", reason: "Can harm baby development" },
    { name: "Alcohol", reason: "Fetal alcohol spectrum disorder" },
    { name: "Caffeine (excess)", reason: "May increase miscarriage risk" },
    { name: "Processed Meats", reason: "High sodium and preservatives" },
  ]

  return (
    <div className="space-y-8">
      {/* Hero Card */}
      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20 p-6">
        <h3 className="text-2xl font-bold text-foreground mb-2">Nutrition Guide for Week 24</h3>
        <p className="text-muted-foreground mb-4">
          Proper nutrition is crucial for your baby's development. Focus on nutrient-dense foods and stay hydrated.
        </p>
        <Button className="bg-primary hover:bg-primary-dark text-primary-foreground">View Meal Plans</Button>
      </Card>

      {/* Foods to Eat */}
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-6">Foods to Eat</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {foodsToEat.map((food, idx) => (
            <Card key={idx} className="p-4 bg-success/5 border-success/20 hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-foreground mb-2">{food.name}</h4>
              <p className="text-sm text-muted-foreground">{food.benefits}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Foods to Avoid */}
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-6">Foods to Avoid</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {foodsToAvoid.map((food, idx) => (
            <Card key={idx} className="p-4 bg-error/5 border-error/20 hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-foreground mb-2">{food.name}</h4>
              <p className="text-sm text-muted-foreground">{food.reason}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Supplements */}
      <Card className="p-6 border-border">
        <h3 className="text-2xl font-bold text-foreground mb-6">Recommended Supplements</h3>
        <div className="space-y-3">
          {[
            { id: "prenatal", name: "Prenatal Vitamins", info: "Essential for fetal development" },
            { id: "iron", name: "Iron Supplement", info: "Prevents anemia during pregnancy" },
            { id: "calcium", name: "Calcium Supplement", info: "Supports bone development" },
            { id: "omega3", name: "Omega-3 (DHA)", info: "Supports brain development" },
          ].map((supplement) => (
            <div key={supplement.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
              <Checkbox
                checked={supplements[supplement.id as keyof typeof supplements]}
                onCheckedChange={() =>
                  setSupplements((prev) => ({
                    ...prev,
                    [supplement.id]: !prev[supplement.id as keyof typeof supplements],
                  }))
                }
              />
              <div className="flex-1">
                <p className="font-semibold text-foreground">{supplement.name}</p>
                <p className="text-sm text-muted-foreground">{supplement.info}</p>
              </div>
              <Button variant="link" size="sm" className="text-primary">
                Learn More
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
