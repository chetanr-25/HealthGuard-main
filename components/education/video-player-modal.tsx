"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Play } from "lucide-react"

interface VideoPlayerModalProps {
  video: any
  onClose: () => void
}

export function VideoPlayerModal({ video, onClose }: VideoPlayerModalProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <div className="relative w-full bg-black rounded-lg overflow-hidden" style={{ paddingBottom: "56.25%" }}>
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <img src={video.thumbnail || "/placeholder.svg"} alt={video.title} className="w-full h-full object-cover" />
            <Play className="absolute h-20 w-20 text-white fill-white opacity-80" />
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-foreground">{video.title}</h3>
          <p className="text-sm text-muted-foreground mt-2">
            {video.views} views • {video.date}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
