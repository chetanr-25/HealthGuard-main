"use client"

import { AlertCircle, Shield, Phone } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function MedicalDisclaimers() {
  return (
    <div className="space-y-4 mb-8">
      {/* Critical Safety Banner */}
      <Alert className="border-red-200 bg-red-50 dark:bg-red-950/20">
        <AlertCircle className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-sm">
          <span className="font-semibold text-red-800">Medical Disclaimer:</span> This AI-powered assessment is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding your pregnancy or medical condition.
        </AlertDescription>
      </Alert>

      {/* Emergency Information */}
      <Card className="border-orange-200 bg-orange-50 dark:bg-orange-950/20">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Phone className="h-5 w-5 text-orange-600 mt-0.5" />
            <div className="space-y-2">
              <h4 className="font-semibold text-orange-800">Emergency Situations</h4>
              <p className="text-sm text-orange-700">
                If you experience severe symptoms like severe headache, vision changes, severe abdominal pain, 
                vaginal bleeding, or decreased fetal movement, contact your healthcare provider immediately or call emergency services.
              </p>
              <Button variant="outline" size="sm" className="border-orange-300 text-orange-700 hover:bg-orange-100">
                <Phone className="h-4 w-4 mr-2" />
                Call Emergency: 911
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Technology Notice */}
      <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/20">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="space-y-2">
              <h4 className="font-semibold text-blue-800">AI Technology Notice</h4>
              <p className="text-sm text-blue-700">
                This assessment uses artificial intelligence to analyze your health data. While AI can provide valuable insights, 
                it may not capture all individual health nuances. Results should be interpreted in consultation with your healthcare team.
              </p>
              <div className="flex items-center gap-2 text-xs text-blue-600">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <span>Powered by OpenAI GPT-4 with LangChain</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Privacy Notice */}
      <Alert className="border-gray-200 bg-gray-50 dark:bg-gray-950/20">
        <Shield className="h-4 w-4 text-gray-600" />
        <AlertDescription className="text-sm text-gray-700">
          <span className="font-semibold">Data Privacy:</span> Your health data is encrypted and stored securely. 
          AI assessments are processed using industry-standard security measures. We do not share your personal health information with third parties.
        </AlertDescription>
      </Alert>
    </div>
  )
}
