"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  TrendingUp, 
  Lightbulb, 
  Target,
  AlertTriangle,
  Info
} from 'lucide-react'
import { SmartSuggestion } from '@/lib/smartReminderAgent'

interface AISuggestionCardsProps {
  suggestions: SmartSuggestion[]
  onAccept: (suggestionId: string) => void
  onDismiss: (suggestionId: string) => void
  loading?: boolean
}

export function AISuggestionCards({ 
  suggestions, 
  onAccept, 
  onDismiss, 
  loading = false 
}: AISuggestionCardsProps) {
  const [processingId, setProcessingId] = useState<string | null>(null)

  const handleAccept = async (suggestionId: string) => {
    setProcessingId(suggestionId)
    try {
      await onAccept(suggestionId)
    } finally {
      setProcessingId(null)
    }
  }

  const handleDismiss = async (suggestionId: string) => {
    setProcessingId(suggestionId)
    try {
      await onDismiss(suggestionId)
    } finally {
      setProcessingId(null)
    }
  }

  const getSuggestionIcon = (type: SmartSuggestion['type']) => {
    switch (type) {
      case 'time_optimization':
        return <Clock className="h-5 w-5" />
      case 'reminder_timing':
        return <Target className="h-5 w-5" />
      case 'dose_scheduling':
        return <TrendingUp className="h-5 w-5" />
      case 'encouragement':
        return <Lightbulb className="h-5 w-5" />
      default:
        return <Info className="h-5 w-5" />
    }
  }

  const getPriorityColor = (priority: SmartSuggestion['priority']) => {
    switch (priority) {
      case 'high':
        return 'destructive'
      case 'medium':
        return 'default'
      case 'low':
        return 'secondary'
      default:
        return 'secondary'
    }
  }

  const getPriorityIcon = (priority: SmartSuggestion['priority']) => {
    switch (priority) {
      case 'high':
        return <AlertTriangle className="h-4 w-4" />
      case 'medium':
        return <Info className="h-4 w-4" />
      case 'low':
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <h3 className="text-lg font-semibold">Generating AI Suggestions...</h3>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-1/2" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-muted rounded" />
                  <div className="h-3 bg-muted rounded w-5/6" />
                  <div className="h-3 bg-muted rounded w-4/6" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (suggestions.length === 0) {
    return (
      <Alert>
        <CheckCircle className="h-4 w-4" />
        <AlertDescription>
          No AI suggestions available at the moment. Keep taking your medications consistently to receive personalized recommendations!
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">AI-Powered Suggestions</h3>
          <p className="text-sm text-muted-foreground">
            Personalized recommendations to improve your medication adherence
          </p>
        </div>
        <Badge variant="outline" className="text-xs">
          {suggestions.length} suggestions
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {suggestions.map((suggestion) => (
          <Card key={suggestion.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  {getSuggestionIcon(suggestion.type)}
                  <CardTitle className="text-base">{suggestion.title}</CardTitle>
                </div>
                <Badge 
                  variant={getPriorityColor(suggestion.priority)}
                  className="text-xs"
                >
                  <div className="flex items-center space-x-1">
                    {getPriorityIcon(suggestion.priority)}
                    <span>{suggestion.priority}</span>
                  </div>
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {suggestion.description}
              </p>

              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-xs font-medium text-muted-foreground mb-1">
                  AI Reasoning:
                </p>
                <p className="text-xs">{suggestion.reasoning}</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">
                    +{suggestion.estimatedImprovement}% improvement
                  </span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {suggestion.type.replace('_', ' ')}
                </Badge>
              </div>

              <div className="flex space-x-2 pt-2">
                <Button
                  size="sm"
                  onClick={() => handleAccept(suggestion.id)}
                  disabled={processingId === suggestion.id}
                  className="flex-1"
                >
                  {processingId === suggestion.id ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Accept
                    </>
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDismiss(suggestion.id)}
                  disabled={processingId === suggestion.id}
                >
                  <XCircle className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          AI suggestions are based on your medication-taking patterns over the last 30 days. 
          Accepting suggestions will help improve your adherence rates.
        </AlertDescription>
      </Alert>
    </div>
  )
}
