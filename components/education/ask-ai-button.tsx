"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { MessageCircle, Send, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function AskAIButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [question, setQuestion] = useState("")
  const [messages, setMessages] = useState<Array<{ role: "user" | "ai"; content: string }>>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleAsk = async () => {
    if (!question.trim()) return

    setMessages((prev) => [...prev, { role: "user", content: question }])
    setQuestion("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content:
            "This is a placeholder response. In production, this would be connected to your AI model via LangChain. Please consult your healthcare provider for medical advice.",
        },
      ])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full h-14 w-14 shadow-lg hover:shadow-xl transition-shadow"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Ask AI</DialogTitle>
          </DialogHeader>

          <Alert className="bg-warning/10 border-warning/20">
            <AlertCircle className="h-4 w-4 text-warning" />
            <AlertDescription className="text-sm">
              This AI assistant provides general information only. Always consult your doctor for medical advice.
            </AlertDescription>
          </Alert>

          <div className="h-64 overflow-y-auto space-y-4 mb-4 p-4 bg-muted rounded-lg">
            {messages.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                Ask any pregnancy-related questions and get helpful information.
              </p>
            ) : (
              messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs p-3 rounded-lg ${
                      msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-card border border-border"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-card border border-border p-3 rounded-lg">
                  <div className="flex gap-2">
                    <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" />
                    <div
                      className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                    <div
                      className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="Ask your question..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAsk()}
              disabled={isLoading}
            />
            <Button onClick={handleAsk} disabled={isLoading || !question.trim()} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
