"use client"

import { useState, useEffect, useCallback } from 'react'
import { useUser } from '@clerk/nextjs'
import { smartReminderAgent, SmartSuggestion } from '../smartReminderAgent'
import { medicationAnalytics, AdherencePattern } from '../medicationAnalytics'

export interface SmartReminderState {
  suggestions: SmartSuggestion[]
  patterns: AdherencePattern[]
  insights: any[]
  loading: boolean
  error: string | null
  lastUpdated: Date | null
}

export function useSmartReminders() {
  const { user } = useUser()
  const [state, setState] = useState<SmartReminderState>({
    suggestions: [],
    patterns: [],
    insights: [],
    loading: false,
    error: null,
    lastUpdated: null
  })

  // Generate new suggestions
  const generateSuggestions = useCallback(async () => {
    if (!user?.id) return

    setState(prev => ({ ...prev, loading: true, error: null }))

    try {
      const [suggestions, patterns, insights] = await Promise.all([
        smartReminderAgent.generateSmartSuggestions(user.id),
        medicationAnalytics.getAllMedicationPatterns(user.id, 30),
        smartReminderAgent.generateAdherenceInsights(user.id)
      ])

      // Save new suggestions to database
      await Promise.all(
        suggestions.map(suggestion => smartReminderAgent.saveSuggestion(suggestion))
      )

      setState(prev => ({
        ...prev,
        suggestions,
        patterns,
        insights,
        loading: false,
        lastUpdated: new Date()
      }))
    } catch (error) {
      console.error('Error generating suggestions:', error)
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to generate suggestions'
      }))
    }
  }, [user?.id])

  // Load existing suggestions
  const loadSuggestions = useCallback(async () => {
    if (!user?.id) return

    setState(prev => ({ ...prev, loading: true, error: null }))

    try {
      const [suggestions, patterns, insights] = await Promise.all([
        smartReminderAgent.getPendingSuggestions(user.id),
        medicationAnalytics.getAllMedicationPatterns(user.id, 30),
        smartReminderAgent.generateAdherenceInsights(user.id)
      ])

      setState(prev => ({
        ...prev,
        suggestions,
        patterns,
        insights,
        loading: false,
        lastUpdated: new Date()
      }))
    } catch (error) {
      console.error('Error loading suggestions:', error)
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to load suggestions'
      }))
    }
  }, [user?.id])

  // Accept a suggestion
  const acceptSuggestion = useCallback(async (suggestionId: string) => {
    try {
      await smartReminderAgent.updateSuggestionStatus(suggestionId, 'accepted')
      
      setState(prev => ({
        ...prev,
        suggestions: prev.suggestions.filter(s => s.id !== suggestionId)
      }))

      // Regenerate suggestions after accepting one
      setTimeout(() => {
        generateSuggestions()
      }, 1000)
    } catch (error) {
      console.error('Error accepting suggestion:', error)
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to accept suggestion'
      }))
    }
  }, [generateSuggestions])

  // Dismiss a suggestion
  const dismissSuggestion = useCallback(async (suggestionId: string) => {
    try {
      await smartReminderAgent.updateSuggestionStatus(suggestionId, 'dismissed')
      
      setState(prev => ({
        ...prev,
        suggestions: prev.suggestions.filter(s => s.id !== suggestionId)
      }))
    } catch (error) {
      console.error('Error dismissing suggestion:', error)
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to dismiss suggestion'
      }))
    }
  }, [])

  // Get adherence summary
  const getAdherenceSummary = useCallback(() => {
    if (state.patterns.length === 0) {
      return {
        overallAdherence: 0,
        totalMedications: 0,
        averageStreak: 0,
        needsAttention: 0
      }
    }

    const overallAdherence = state.patterns.reduce((sum, p) => sum + p.adherenceRate, 0) / state.patterns.length
    const averageStreak = state.patterns.reduce((sum, p) => sum + p.streakDays, 0) / state.patterns.length
    const needsAttention = state.patterns.filter(p => p.adherenceRate < 80).length

    return {
      overallAdherence,
      totalMedications: state.patterns.length,
      averageStreak,
      needsAttention
    }
  }, [state.patterns])

  // Get suggestions by priority
  const getSuggestionsByPriority = useCallback((priority: 'high' | 'medium' | 'low') => {
    return state.suggestions.filter(s => s.priority === priority)
  }, [state.suggestions])

  // Get suggestions by type
  const getSuggestionsByType = useCallback((type: SmartSuggestion['type']) => {
    return state.suggestions.filter(s => s.type === type)
  }, [state.suggestions])

  // Check if suggestions are stale (older than 7 days)
  const areSuggestionsStale = useCallback(() => {
    if (!state.lastUpdated) return true
    const daysSinceUpdate = (Date.now() - state.lastUpdated.getTime()) / (1000 * 60 * 60 * 24)
    return daysSinceUpdate > 7
  }, [state.lastUpdated])

  // Auto-refresh suggestions if stale
  useEffect(() => {
    if (user?.id && (state.suggestions.length === 0 || areSuggestionsStale())) {
      loadSuggestions()
    }
  }, [user?.id, state.suggestions.length, areSuggestionsStale, loadSuggestions])

  return {
    ...state,
    generateSuggestions,
    loadSuggestions,
    acceptSuggestion,
    dismissSuggestion,
    getAdherenceSummary,
    getSuggestionsByPriority,
    getSuggestionsByType,
    areSuggestionsStale
  }
}
