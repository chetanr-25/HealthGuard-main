"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MessageCircle, Sparkles } from 'lucide-react'
import { ChatModal } from './chat-modal'

export function AskAIButton() {
  const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          <Button
            onClick={() => setIsChatOpen(true)}
            size="lg"
            className="rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90 text-primary-foreground h-14 w-14 p-0"
          >
            <MessageCircle className="w-6 h-6" />
          </Button>
          
          {/* AI Badge */}
          <Badge 
            variant="secondary" 
            className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 animate-pulse"
          >
            <Sparkles className="w-3 h-3 mr-1" />
            AI
          </Badge>
        </div>
      </div>

      {/* Chat Modal */}
      <ChatModal 
        open={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />
    </>
  )
}