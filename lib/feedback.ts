// Feedback system for AI chatbot responses

export interface ChatFeedback {
  messageId: string
  helpful: boolean
  timestamp: Date
  userId?: string
  feedback?: string
  response?: string
}

export interface FeedbackStats {
  totalResponses: number
  helpfulCount: number
  notHelpfulCount: number
  helpfulPercentage: number
}

class FeedbackManager {
  private feedbacks: ChatFeedback[] = []
  private storageKey = 'healthguard_chat_feedback'

  constructor() {
    this.loadFeedbacks()
  }

  // Load feedbacks from localStorage
  private loadFeedbacks() {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(this.storageKey)
        if (stored) {
          this.feedbacks = JSON.parse(stored).map((f: any) => ({
            ...f,
            timestamp: new Date(f.timestamp)
          }))
        }
      } catch (error) {
        console.error('Error loading feedbacks:', error)
        this.feedbacks = []
      }
    }
  }

  // Save feedbacks to localStorage
  private saveFeedbacks() {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(this.storageKey, JSON.stringify(this.feedbacks))
      } catch (error) {
        console.error('Error saving feedbacks:', error)
      }
    }
  }

  // Submit feedback for a message
  submitFeedback(
    messageId: string, 
    helpful: boolean, 
    userId?: string, 
    feedback?: string,
    response?: string
  ): void {
    const feedbackData: ChatFeedback = {
      messageId,
      helpful,
      timestamp: new Date(),
      userId,
      feedback,
      response
    }

    // Remove existing feedback for this message
    this.feedbacks = this.feedbacks.filter(f => f.messageId !== messageId)
    
    // Add new feedback
    this.feedbacks.push(feedbackData)
    
    // Save to localStorage
    this.saveFeedbacks()

    // TODO: Send to analytics/backend
    this.sendToAnalytics(feedbackData)
  }

  // Get feedback for a specific message
  getFeedback(messageId: string): ChatFeedback | null {
    return this.feedbacks.find(f => f.messageId === messageId) || null
  }

  // Get feedback statistics
  getFeedbackStats(): FeedbackStats {
    const totalResponses = this.feedbacks.length
    const helpfulCount = this.feedbacks.filter(f => f.helpful).length
    const notHelpfulCount = totalResponses - helpfulCount
    const helpfulPercentage = totalResponses > 0 ? (helpfulCount / totalResponses) * 100 : 0

    return {
      totalResponses,
      helpfulCount,
      notHelpfulCount,
      helpfulPercentage
    }
  }

  // Get all feedbacks
  getAllFeedbacks(): ChatFeedback[] {
    return [...this.feedbacks]
  }

  // Clear all feedbacks
  clearFeedbacks(): void {
    this.feedbacks = []
    this.saveFeedbacks()
  }

  // Send feedback to analytics (placeholder)
  private sendToAnalytics(feedback: ChatFeedback): void {
    // TODO: Implement analytics tracking
    console.log('Feedback submitted:', feedback)
    
    // Example: Send to analytics service
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'chat_feedback', {
        event_category: 'AI_Chat',
        event_label: feedback.helpful ? 'helpful' : 'not_helpful',
        value: feedback.helpful ? 1 : 0
      })
    }
  }

  // Export feedbacks for analysis
  exportFeedbacks(): string {
    return JSON.stringify(this.feedbacks, null, 2)
  }

  // Import feedbacks from backup
  importFeedbacks(data: string): boolean {
    try {
      const imported = JSON.parse(data)
      if (Array.isArray(imported)) {
        this.feedbacks = imported.map((f: any) => ({
          ...f,
          timestamp: new Date(f.timestamp)
        }))
        this.saveFeedbacks()
        return true
      }
      return false
    } catch (error) {
      console.error('Error importing feedbacks:', error)
      return false
    }
  }
}

// Export singleton instance
export const feedbackManager = new FeedbackManager()

// Helper functions
export function submitChatFeedback(
  messageId: string, 
  helpful: boolean, 
  userId?: string, 
  feedback?: string,
  response?: string
): void {
  feedbackManager.submitFeedback(messageId, helpful, userId, feedback, response)
}

export function getChatFeedback(messageId: string): ChatFeedback | null {
  return feedbackManager.getFeedback(messageId)
}

export function getChatFeedbackStats(): FeedbackStats {
  return feedbackManager.getFeedbackStats()
}
