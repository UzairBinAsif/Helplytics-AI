"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ContentCard } from "@/components/content-card"
import { Button } from "@/components/ui/button"
import { useApp } from "@/lib/context"
import { db } from "@/lib/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"

export default function CreateRequestPage() {
  const router = useRouter()
  const { currentUser, requests, setRequests } = useApp()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState("")
  const [category, setCategory] = useState("Web Development")
  const [urgency, setUrgency] = useState<"low" | "medium" | "high">("high")

  // AI Suggestions (simulated)
  const [aiSuggestions, setAiSuggestions] = useState({
    category: "Community",
    urgency: "Low",
    tags: "Add more detail for smarter tags",
    rewrite: "Start describing the challenge to generate a stronger version.",
  })

  const handleApplyAI = () => {
    if (description.length > 20) {
      setAiSuggestions({
        category: "Web Development",
        urgency: "High",
        tags: "JavaScript, Debugging, Review",
        rewrite: "I need guidance on optimizing my JavaScript quiz app for submission. Looking for code review and debugging assistance.",
      })
    }
  }

  const handlePublish = async () => {
    if (!currentUser || !title) return

    try {
      await addDoc(collection(db, "requests"), {
        title,
        description,
        category,
        urgency,
        status: "open",
        tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
        authorId: currentUser.id,
        authorName: currentUser.name,
        authorLocation: currentUser.location || "Unknown",
        helpersInterested: 0,
        createdAt: serverTimestamp(),
      })
      router.push("/dashboard")
    } catch (error) {
      console.error("Error adding document: ", error)
      alert("Failed to publish request.")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header variant="dashboard" />

      <main className="px-6 py-8 max-w-7xl mx-auto">
        <HeroSection
          label="CREATE REQUEST"
          title="Turn a rough problem into a clear help request."
          description="Use built-in AI suggestions for category, urgency, tags, and a stronger description rewrite."
        />

        <div className="grid md:grid-cols-5 gap-6 mt-8">
          {/* Form Card */}
          <div className="md:col-span-3">
            <ContentCard>
              <div className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Need review on my JavaScript quiz app before submission"
                    className="w-full px-4 py-3 bg-muted rounded-xl border-0 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Explain the challenge, your current progress, deadline, and what kind of help would be useful."
                    rows={5}
                    className="w-full px-4 py-3 bg-muted rounded-xl border-0 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary outline-none resize-none"
                  />
                </div>

                {/* Tags and Category Row */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Tags
                    </label>
                    <input
                      type="text"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      placeholder="JavaScript, Debugging, Review"
                      className="w-full px-4 py-3 bg-muted rounded-xl border-0 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-3 bg-muted rounded-xl border-0 text-foreground focus:ring-2 focus:ring-primary outline-none"
                    >
                      <option>Web Development</option>
                      <option>Design</option>
                      <option>Career</option>
                      <option>Data Science</option>
                      <option>Mobile Development</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                {/* Urgency */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Urgency
                  </label>
                  <select
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value as typeof urgency)}
                    className="w-full md:w-1/2 px-4 py-3 bg-muted rounded-xl border-0 text-foreground focus:ring-2 focus:ring-primary outline-none"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button
                    variant="outline"
                    onClick={handleApplyAI}
                    className="rounded-full px-6"
                  >
                    Apply AI suggestions
                  </Button>
                  <Button
                    onClick={handlePublish}
                    className="bg-primary hover:bg-primary/90 text-white rounded-full px-6"
                  >
                    Publish request
                  </Button>
                </div>
              </div>
            </ContentCard>
          </div>

          {/* AI Assistant Card */}
          <div className="md:col-span-2">
            <ContentCard label="AI ASSISTANT" title="Smart request guidance">
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-muted-foreground">Suggested category</span>
                  <span className="font-medium">{aiSuggestions.category}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-muted-foreground">Detected urgency</span>
                  <span className="font-medium">{aiSuggestions.urgency}</span>
                </div>
                <div className="flex justify-between items-start py-3 border-b border-border">
                  <span className="text-muted-foreground">Suggested tags</span>
                  <span className="font-medium text-right max-w-[60%]">
                    {aiSuggestions.tags}
                  </span>
                </div>
                <div className="py-3">
                  <span className="text-muted-foreground block mb-2">Rewrite suggestion</span>
                  <span className="font-medium text-sm">
                    {aiSuggestions.rewrite}
                  </span>
                </div>
              </div>
            </ContentCard>
          </div>
        </div>
      </main>
    </div>
  )
}
