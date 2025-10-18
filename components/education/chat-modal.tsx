"use client"

import { useState, useRef, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Send, 
  X, 
  Bot, 
  User, 
  ThumbsUp, 
  ThumbsDown, 
  Share2, 
  Copy, 
  AlertTriangle,
  Phone,
  Heart,
  Trash2
} from 'lucide-react'
import { detectEmergency } from '@/lib/chatAgent'
import { useChat } from '@/lib/hooks/useChat'
import { submitChatFeedback, getChatFeedback } from '@/lib/feedback'
import { useUserProfile } from '@/lib/hooks/useUserProfile'

interface ChatModalProps {
  open: boolean
  onClose: () => void
}

export function ChatModal({ open, onClose }: ChatModalProps) {
  const {
    messages,
    isLoading,
    suggestedQuestions,
    isEmergency,
    sendMessage,
    clearChat,
    initializeChat
  } = useChat()
  
  const [inputValue, setInputValue] = useState('')
  const [showEmergencyAlert, setShowEmergencyAlert] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Initialize chat when modal opens
  useEffect(() => {
    if (open && messages.length === 0) {
      initializeChat()
    }
  }, [open, messages.length, initializeChat])

  // Show emergency alert when emergency is detected
  useEffect(() => {
    if (isEmergency) {
      setShowEmergencyAlert(true)
    }
  }, [isEmergency])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  // Focus input when modal opens
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus()
    }
  }, [open])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const message = inputValue.trim()
    setInputValue('')

    // Check for emergency
    if (detectEmergency(message)) {
      setShowEmergencyAlert(true)
    }

    // Send message using the chat hook
    await sendMessage(message)
  }

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question)
    inputRef.current?.focus()
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleFeedback = (messageId: string, helpful: boolean) => {
    submitChatFeedback(messageId, helpful, profile?.clerk_user_id)
    // TODO: Show toast notification
    console.log(`Message ${messageId} feedback: ${helpful ? 'helpful' : 'not helpful'}`)
  }

  const handleShare = (messageId: string) => {
    const message = messages.find(m => m.id === messageId)
    if (message) {
      navigator.clipboard.writeText(message.content)
      // TODO: Show toast notification
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-lg">AI Pregnancy Assistant</DialogTitle>
                <p className="text-sm text-muted-foreground">
                  Ask me anything about pregnancy, nutrition, and wellness
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearChat}
                className="text-muted-foreground hover:text-foreground"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        {/* Emergency Alert */}
        {showEmergencyAlert && (
          <Alert className="m-6 mb-0 border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <strong>Emergency Detected:</strong> Please call 911 or go to the emergency room immediately.
              <Button 
                variant="outline" 
                size="sm" 
                className="ml-2 border-red-300 text-red-700 hover:bg-red-100"
                onClick={() => window.location.href = '/emergency'}
              >
                <Phone className="w-4 h-4 mr-1" />
                Emergency Page
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Chat Messages */}
        <div 
          ref={scrollAreaRef} 
          className="flex-1 p-6 overflow-y-auto space-y-4"
        >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-3 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.role === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {message.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  
                  <Card className={`${
                    message.role === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : message.isEmergency 
                        ? 'border-red-200 bg-red-50' 
                        : message.requiresDoctor
                          ? 'border-yellow-200 bg-yellow-50'
                          : 'bg-muted'
                  }`}>
                    <CardContent className="p-4">
                      <div className="whitespace-pre-wrap text-sm">
                        {message.content}
                      </div>
                      
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-border/50">
                        <span className="text-xs opacity-70">
                          {formatTime(message.timestamp)}
                        </span>
                        
                        {message.role === 'assistant' && (
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() => handleShare(message.id)}
                            >
                              <Share2 className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() => handleFeedback(message.id, true)}
                            >
                              <ThumbsUp className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() => handleFeedback(message.id, false)}
                            >
                              <ThumbsDown className="w-3 h-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <Card className="bg-muted">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        </div>
                        <span className="text-sm text-muted-foreground">AI is thinking...</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
        </div>

        {/* Suggested Questions */}
        {suggestedQuestions.length > 0 && !isLoading && (
          <div className="p-6 pt-0">
            <p className="text-sm text-muted-foreground mb-3">Suggested questions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => handleSuggestedQuestion(question)}
                >
                  {question}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-6 pt-0 border-t">
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about pregnancy..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={!inputValue.trim() || isLoading}
              size="icon"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
            <span>Press Enter to send</span>
            <span>AI responses are for educational purposes only</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
