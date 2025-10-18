"use client"

import { useState, useCallback } from 'react'
import { pregnancyChatAgent, ChatMessage, ChatContext } from '@/lib/chatAgent'

// Extended ChatMessage interface for the hook
interface ExtendedChatMessage extends ChatMessage {
  id: string
  isEmergency?: boolean
  requiresDoctor?: boolean
}
import { useUserProfile } from './useUserProfile'

export function useChat() {
  const { profile } = useUserProfile()
  const [messages, setMessages] = useState<ExtendedChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([])
  const [isEmergency, setIsEmergency] = useState(false)

  // Initialize chat with welcome message
  const initializeChat = useCallback(() => {
    const welcomeMessage: ExtendedChatMessage = {
      id: 'welcome',
      role: 'assistant',
      content: `Hello! I'm your AI pregnancy assistant. I'm here to help answer your questions about pregnancy, nutrition, exercise, and general wellness. 

I can provide information about:
• Week-by-week pregnancy development
• Safe exercises and activities
• Nutrition and dietary recommendations
• Common symptoms and concerns
• Preparation for labor and delivery

Remember, I'm here for educational purposes only. Always consult your healthcare provider for medical concerns.`,
      timestamp: new Date()
    }
    
    setMessages([welcomeMessage])
    setSuggestedQuestions([
      "What should I eat in week 24?",
      "Is it normal to have back pain?",
      "What exercises are safe?",
      "When should I go to the hospital?"
    ])
    setIsEmergency(false)
  }, [])

  // Send message (using sync method)
  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return

    const userMessage: ExtendedChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    try {
      const context: ChatContext = {
        pregnancyWeek: profile?.pregnancy_week || undefined,
        language: 'English',
        conversationHistory: messages
      }

      const response = await pregnancyChatAgent.processMessage(content.trim(), context)
      
      const assistantMessage: ExtendedChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.response,
        timestamp: new Date(),
        isEmergency: response.isEmergency,
        requiresDoctor: response.requiresDoctor
      }

      setMessages(prev => [...prev, assistantMessage])
      setSuggestedQuestions(response.suggestedQuestions)
      setIsEmergency(response.isEmergency)

    } catch (error) {
      console.error('Error processing message:', error)
      const errorMessage: ExtendedChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I apologize, but I encountered an error processing your message. Please try again or contact your healthcare provider for immediate assistance.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }, [messages, isLoading, profile?.pregnancy_week])


  // Clear chat history
  const clearChat = useCallback(() => {
    setMessages([])
    setSuggestedQuestions([])
    setIsEmergency(false)
    setIsLoading(false)
  }, [])

  // Add message manually (for testing)
  const addMessage = useCallback((message: ExtendedChatMessage) => {
    setMessages(prev => [...prev, message])
  }, [])

  return {
    messages,
    isLoading,
    suggestedQuestions,
    isEmergency,
    sendMessage,
    clearChat,
    addMessage,
    initializeChat
  }
}
