"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bookmark, Share2, Printer, ThumbsUp, ThumbsDown } from "lucide-react"
import { useState } from "react"

interface ArticleDetailModalProps {
  article: any
  onClose: () => void
}

export function ArticleDetailModal({ article, onClose }: ArticleDetailModalProps) {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [helpful, setHelpful] = useState<"yes" | "no" | null>(null)

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{article.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Hero Image */}
          <img
            src={article.image || "/placeholder.svg"}
            alt={article.title}
            className="w-full h-64 object-cover rounded-lg"
          />

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-4 pb-4 border-b border-border">
            <Badge className="bg-secondary text-secondary-foreground">{article.category}</Badge>
            <span className="text-sm text-muted-foreground">Published {article.date}</span>
            <span className="text-sm text-muted-foreground">•</span>
            <span className="text-sm text-muted-foreground">{article.readTime} read</span>
          </div>

          {/* Article Content */}
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <p className="text-foreground leading-relaxed">{article.content}</p>
            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">Key Points</h3>
            <ul className="space-y-2 text-foreground">
              <li>• Maintain a balanced diet rich in nutrients</li>
              <li>• Stay hydrated throughout the day</li>
              <li>• Consult your healthcare provider for personalized advice</li>
              <li>• Listen to your body and rest when needed</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="space-y-4 pt-4 border-t border-border">
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={() => setIsBookmarked(!isBookmarked)}>
                <Bookmark className={`h-4 w-4 mr-2 ${isBookmarked ? "fill-current" : ""}`} />
                {isBookmarked ? "Bookmarked" : "Bookmark"}
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
            </div>

            {/* Feedback */}
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm font-semibold text-foreground mb-3">Was this article helpful?</p>
              <div className="flex gap-2">
                <Button variant={helpful === "yes" ? "default" : "outline"} size="sm" onClick={() => setHelpful("yes")}>
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  Yes
                </Button>
                <Button variant={helpful === "no" ? "default" : "outline"} size="sm" onClick={() => setHelpful("no")}>
                  <ThumbsDown className="h-4 w-4 mr-2" />
                  No
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
