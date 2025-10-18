"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Bookmark, Play, Clock, Eye, ChevronRight } from "lucide-react"
import { ArticleDetailModal } from "./article-detail-modal"
import { VideoPlayerModal } from "./video-player-modal"

interface ForYouTabProps {
  searchQuery: string
}

export function ForYouTab({ searchQuery }: ForYouTabProps) {
  const [selectedArticle, setSelectedArticle] = useState<any>(null)
  const [selectedVideo, setSelectedVideo] = useState<any>(null)
  const [bookmarkedArticles, setBookmarkedArticles] = useState<string[]>([])
  const [checklist, setChecklist] = useState({
    first: [
      { id: "1", title: "Schedule first prenatal appointment", completed: true, week: 8 },
      { id: "2", title: "Take prenatal vitamins", completed: true, week: 8 },
      { id: "3", title: "Avoid harmful substances", completed: true, week: 8 },
    ],
    second: [
      { id: "4", title: "Attend anatomy scan", completed: false, week: 20 },
      { id: "5", title: "Start prenatal classes", completed: false, week: 20 },
      { id: "6", title: "Prepare nursery", completed: false, week: 24 },
    ],
    third: [
      { id: "7", title: "Create birth plan", completed: false, week: 32 },
      { id: "8", title: "Pack hospital bag", completed: false, week: 36 },
      { id: "9", title: "Final prenatal checkup", completed: false, week: 40 },
    ],
  })

  const articles = [
    {
      id: "1",
      title: "What to Eat in Week 24 of Pregnancy",
      description:
        "Discover the best foods to support your baby's development and maintain your health during the second trimester.",
      category: "Nutrition",
      image: "/healthy-pregnancy-food.png",
      readTime: "5 min",
      date: "2 days ago",
      content: "Full article content about nutrition in week 24...",
    },
    {
      id: "2",
      title: "Managing Back Pain During Second Trimester",
      description: "Learn effective techniques and exercises to relieve back pain as your baby grows.",
      category: "Health",
      image: "/pregnancy-back-pain-relief.jpg",
      readTime: "7 min",
      date: "1 week ago",
      content: "Full article content about managing back pain...",
    },
    {
      id: "3",
      title: "Preparing Your Home for Baby's Arrival",
      description: "A comprehensive guide to setting up your home safely and comfortably for your newborn.",
      category: "Preparation",
      image: "/nursery-setup-baby-room.jpg",
      readTime: "8 min",
      date: "1 week ago",
      content: "Full article content about home preparation...",
    },
    {
      id: "4",
      title: "Understanding Braxton Hicks Contractions",
      description: "Learn what Braxton Hicks contractions are and how to distinguish them from real labor.",
      category: "Health",
      image: "/pregnancy-contractions.jpg",
      readTime: "6 min",
      date: "2 weeks ago",
      content: "Full article content about Braxton Hicks...",
    },
    {
      id: "5",
      title: "Baby Movement: What's Normal?",
      description: "Understand your baby's movement patterns and when to contact your healthcare provider.",
      category: "Baby Development",
      image: "/baby-movement-pregnancy.jpg",
      readTime: "5 min",
      date: "2 weeks ago",
      content: "Full article content about baby movement...",
    },
    {
      id: "6",
      title: "Sleep Positions During Pregnancy",
      description: "Discover the best sleeping positions for comfort and safety throughout your pregnancy.",
      category: "Wellness",
      image: "/pregnancy-sleep-positions.jpg",
      readTime: "4 min",
      date: "3 weeks ago",
      content: "Full article content about sleep positions...",
    },
  ]

  const videos = [
    {
      id: "v1",
      title: "Prenatal Yoga Routine (15 min)",
      thumbnail: "/prenatal-yoga.png",
      duration: "15:32",
      views: "12.5K",
      date: "1 month ago",
    },
    {
      id: "v2",
      title: "Breathing Techniques for Labor",
      thumbnail: "/breathing-techniques-labor.jpg",
      duration: "8:45",
      views: "8.3K",
      date: "2 months ago",
    },
    {
      id: "v3",
      title: "How to Swaddle Your Baby",
      thumbnail: "/baby-swaddling.jpg",
      duration: "5:20",
      views: "15.2K",
      date: "2 months ago",
    },
    {
      id: "v4",
      title: "Breastfeeding 101",
      thumbnail: "/breastfeeding.png",
      duration: "12:15",
      views: "22.1K",
      date: "3 months ago",
    },
  ]

  const tips = [
    {
      id: "t1",
      icon: "💧",
      title: "Stay Hydrated",
      description: "Drink 8-10 glasses of water daily to support your baby's development and prevent dehydration.",
    },
    {
      id: "t2",
      icon: "😴",
      title: "Sleep on Left Side",
      description: "Sleeping on your left side improves blood flow to your baby and reduces swelling.",
    },
    {
      id: "t3",
      icon: "🚶",
      title: "Take Short Walks",
      description: "Regular walking reduces swelling, improves mood, and prepares your body for labor.",
    },
    {
      id: "t4",
      icon: "🧘",
      title: "Practice Relaxation",
      description: "Daily relaxation techniques help reduce stress and anxiety during pregnancy.",
    },
  ]

  const toggleBookmark = (articleId: string) => {
    setBookmarkedArticles((prev) =>
      prev.includes(articleId) ? prev.filter((id) => id !== articleId) : [...prev, articleId],
    )
  }

  const toggleChecklistItem = (section: "first" | "second" | "third", itemId: string) => {
    setChecklist((prev) => ({
      ...prev,
      [section]: prev[section].map((item) => (item.id === itemId ? { ...item, completed: !item.completed } : item)),
    }))
  }

  const allItems = [...checklist.first, ...checklist.second, ...checklist.third]
  const completedItems = allItems.filter((item) => item.completed).length
  const completionPercentage = (completedItems / allItems.length) * 100

  return (
    <div className="space-y-12">
      {/* Personalized Learning Path */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6 md:p-8 border border-primary/20">
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src="/week-24-pregnancy-development.jpg"
            alt="Week 24 learning"
            className="w-full md:w-48 h-40 md:h-48 rounded-lg object-cover"
          />
          <div className="flex-1">
            <Badge className="mb-3 bg-primary text-primary-foreground">Week 24</Badge>
            <h2 className="text-2xl font-bold text-foreground mb-2">Your Learning This Week</h2>
            <p className="text-muted-foreground mb-4">
              Discover what\'s happening with your baby this week and learn important tips for your health and wellness.
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progress: 15 of 40 weeks completed</span>
                <span className="font-semibold text-primary">37.5%</span>
              </div>
              <Progress value={37.5} className="h-2" />
            </div>
            <div className="flex gap-3">
              <Button className="bg-primary hover:bg-primary-dark text-primary-foreground">Start Learning</Button>
              <Button variant="outline">5 min read</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Articles */}
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-6">Recommended Articles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="relative overflow-hidden h-40">
                <img
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground">
                  {article.category}
                </Badge>
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-foreground line-clamp-2 mb-2">{article.title}</h4>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{article.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {article.readTime}
                    </span>
                    <span>{article.date}</span>
                  </div>
                  <button
                    onClick={() => toggleBookmark(article.id)}
                    className="p-1 hover:bg-muted rounded transition-colors"
                  >
                    <Bookmark
                      className={`h-4 w-4 ${
                        bookmarkedArticles.includes(article.id) ? "fill-primary text-primary" : "text-muted-foreground"
                      }`}
                    />
                  </button>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-transparent"
                  onClick={() => setSelectedArticle(article)}
                >
                  Read More
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Video Tutorials */}
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-6">Video Tutorials</h3>
        <div className="overflow-x-auto pb-4 -mx-4 md:mx-0 px-4 md:px-0">
          <div className="flex gap-4 min-w-min md:min-w-full md:grid md:grid-cols-4">
            {videos.map((video) => (
              <Card
                key={video.id}
                className="flex-shrink-0 w-72 md:w-full overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => setSelectedVideo(video)}
              >
                <div className="relative overflow-hidden h-40">
                  <img
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                    <Play className="h-12 w-12 text-white fill-white" />
                  </div>
                  <Badge className="absolute top-2 right-2 bg-black/70 text-white">{video.duration}</Badge>
                </div>
                <div className="p-3">
                  <h4 className="font-semibold text-foreground line-clamp-2 mb-2 text-sm">{video.title}</h4>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {video.views}
                    </span>
                    <span>{video.date}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Tips */}
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-6">Quick Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {tips.map((tip) => (
            <Card
              key={tip.id}
              className="p-6 bg-gradient-to-br from-accent/10 to-primary/10 border-accent/20 hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-3">{tip.icon}</div>
              <h4 className="font-semibold text-foreground mb-2">{tip.title}</h4>
              <p className="text-sm text-muted-foreground mb-4">{tip.description}</p>
              <Button variant="link" size="sm" className="p-0 h-auto text-primary">
                Learn More <ChevronRight className="h-3 w-3 ml-1" />
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Pregnancy Preparation Checklist */}
      <div className="bg-card border border-border rounded-xl p-6 md:p-8">
        <h3 className="text-2xl font-bold text-foreground mb-2">Pregnancy Preparation Checklist</h3>
        <p className="text-muted-foreground mb-6">Track your progress through each trimester</p>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-foreground">Overall Progress</span>
            <span className="text-sm font-semibold text-primary">{Math.round(completionPercentage)}%</span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
        </div>

        <div className="space-y-6">
          {["first", "second", "third"].map((trimester, idx) => (
            <div key={trimester}>
              <h4 className="font-semibold text-foreground mb-3">
                {["First", "Second", "Third"][idx]} Trimester Tasks
              </h4>
              <div className="space-y-2">
                {checklist[trimester as "first" | "second" | "third"].map((item) => (
                  <div key={item.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                    <Checkbox
                      checked={item.completed}
                      onCheckedChange={() => toggleChecklistItem(trimester as "first" | "second" | "third", item.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <p
                        className={`text-sm ${item.completed ? "line-through text-muted-foreground" : "text-foreground"}`}
                      >
                        {item.title}
                      </p>
                      <p className="text-xs text-muted-foreground">Due by week {item.week}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      {selectedArticle && <ArticleDetailModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />}
      {selectedVideo && <VideoPlayerModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />}
    </div>
  )
}
