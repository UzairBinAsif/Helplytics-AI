"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ContentCard } from "@/components/content-card"
import { Tag } from "@/components/tag"
import { Button } from "@/components/ui/button"
import { useApp } from "@/lib/context"
import { mockUsers } from "@/lib/mock-data"

const urgencyVariant = {
  low: "default" as const,
  medium: "warning" as const,
  high: "danger" as const,
}

const statusVariant = {
  open: "primary" as const,
  "in-progress": "warning" as const,
  solved: "success" as const,
}

export default function RequestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const { requests, setRequests, currentUser } = useApp()

  const request = requests.find((r) => r.id === id)

  if (!request) {
    return (
      <div className="min-h-screen bg-background">
        <Header variant="dashboard" />
        <main className="px-6 py-8 max-w-7xl mx-auto">
          <ContentCard>
            <p className="text-center text-muted-foreground py-8">
              Request not found.
            </p>
          </ContentCard>
        </main>
      </div>
    )
  }

  const author = mockUsers.find((u) => u.id === request.authorId)
  const helpers = mockUsers.filter((u) => u.id !== request.authorId).slice(0, 2)

  const handleMarkSolved = () => {
    const updatedRequests = requests.map((r) =>
      r.id === id ? { ...r, status: "solved" as const } : r
    )
    setRequests(updatedRequests)
  }

  const handleOfferHelp = () => {
    const updatedRequests = requests.map((r) =>
      r.id === id ? { ...r, helpersInterested: r.helpersInterested + 1 } : r
    )
    setRequests(updatedRequests)
    router.push("/messages")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header variant="dashboard" />

      <main className="px-6 py-8 max-w-7xl mx-auto">
        {/* Hero with Tags */}
        <div className="bg-secondary rounded-3xl p-8 md:p-12 mb-8">
          <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-4">
            REQUEST DETAIL
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            <Tag variant="primary">{request.category}</Tag>
            <Tag variant={urgencyVariant[request.urgency]}>
              {request.urgency.charAt(0).toUpperCase() + request.urgency.slice(1)}
            </Tag>
            <Tag variant={statusVariant[request.status]}>
              {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
            </Tag>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            {request.title}
          </h1>
          <p className="text-gray-400 text-sm md:text-base max-w-3xl">
            {request.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* AI Summary */}
          <ContentCard label="AI SUMMARY">
            <p className="text-muted-foreground text-sm mb-4">
              Career coaching request focused on confidence-building, behavioral answers, and entry-level frontend interviews.
            </p>
            <div className="flex flex-wrap gap-2">
              {request.tags.map((tag) => (
                <Tag key={tag} variant="default">
                  {tag}
                </Tag>
              ))}
            </div>
          </ContentCard>

          {/* Requester Info */}
          <ContentCard label="REQUESTER">
            {author && (
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
                  {author.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="font-semibold">{author.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {author.role.charAt(0).toUpperCase() + author.role.slice(1)} • {author.location}
                  </p>
                </div>
              </div>
            )}
          </ContentCard>

          {/* Actions */}
          <ContentCard label="ACTIONS">
            <div className="flex gap-4">
              <Button
                onClick={handleOfferHelp}
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-6"
              >
                I can help
              </Button>
              <Button
                variant="outline"
                onClick={handleMarkSolved}
                className="rounded-full px-6"
                disabled={request.status === "solved"}
              >
                Mark as solved
              </Button>
            </div>
          </ContentCard>

          {/* Helpers */}
          <ContentCard label="HELPERS" title="People ready to support">
            <div className="space-y-4">
              {helpers.map((helper) => (
                <div
                  key={helper.id}
                  className="flex items-center justify-between p-4 bg-muted rounded-2xl"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm ${
                        helper.trustScore >= 90
                          ? "bg-primary"
                          : helper.trustScore >= 75
                          ? "bg-red-400"
                          : "bg-amber-400"
                      }`}
                    >
                      {helper.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{helper.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {helper.skills.slice(0, 3).join(", ")}
                      </p>
                    </div>
                  </div>
                  <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                    Trust {helper.trustScore}%
                  </div>
                </div>
              ))}
            </div>
          </ContentCard>
        </div>
      </main>
    </div>
  )
}
