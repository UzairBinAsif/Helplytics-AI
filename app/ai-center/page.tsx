"use client"

import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ContentCard } from "@/components/content-card"
import { Tag } from "@/components/tag"
import { useApp } from "@/lib/context"

export default function AICenterPage() {
  const { requests } = useApp()

  const highUrgencyCount = requests.filter((r) => r.urgency === "high").length
  const webDevCount = requests.filter((r) => r.category === "Web Development").length

  const recommendedRequests = requests.slice(0, 4)

  return (
    <div className="min-h-screen bg-background">
      <Header variant="dashboard" />

      <main className="px-6 py-8 max-w-7xl mx-auto">
        <HeroSection
          label="AI CENTER"
          title="See what the platform intelligence is noticing."
          description="AI-like insights summarize demand trends, helper readiness, urgency signals, and request recommendations."
        />

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <ContentCard>
            <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-2">
              TREND PULSE
            </p>
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Web Development
            </h3>
            <p className="text-sm text-muted-foreground">
              Most common support area based on active community requests.
            </p>
          </ContentCard>

          <ContentCard>
            <p className="text-xs font-semibold tracking-widest text-amber-600 uppercase mb-2">
              URGENCY WATCH
            </p>
            <h3 className="text-4xl font-bold text-foreground mb-2">
              {highUrgencyCount}
            </h3>
            <p className="text-sm text-muted-foreground">
              Requests currently flagged high priority by the urgency detector.
            </p>
          </ContentCard>

          <ContentCard>
            <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-2">
              MENTOR POOL
            </p>
            <h3 className="text-4xl font-bold text-foreground mb-2">
              2
            </h3>
            <p className="text-sm text-muted-foreground">
              Trusted helpers with strong response history and contribution signals.
            </p>
          </ContentCard>
        </div>

        {/* AI Recommendations */}
        <div className="mt-8">
          <ContentCard label="AI RECOMMENDATIONS" title="Requests needing attention">
            <div className="space-y-4">
              {recommendedRequests.map((request) => (
                <div
                  key={request.id}
                  className="p-4 bg-muted rounded-2xl"
                >
                  <p className="font-semibold text-foreground mb-1">
                    {request.title}
                  </p>
                  <p className="text-sm text-muted-foreground mb-3">
                    {request.category === "Web Development"
                      ? "AI summary: Web Development request with high urgency. Best suited for members with relevant expertise."
                      : request.category === "Design"
                      ? "A visual design critique request where feedback on hierarchy, spacing, and messaging would create the most value."
                      : "Career coaching request focused on confidence-building, behavioral answers, and entry-level frontend interviews."}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Tag variant="default">{request.category}</Tag>
                    <Tag
                      variant={
                        request.urgency === "high"
                          ? "danger"
                          : request.urgency === "medium"
                          ? "warning"
                          : "default"
                      }
                    >
                      {request.urgency.charAt(0).toUpperCase() + request.urgency.slice(1)}
                    </Tag>
                  </div>
                </div>
              ))}
            </div>
          </ContentCard>
        </div>

        {/* Platform Insights */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <ContentCard label="SKILL DEMAND" title="What the community needs">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Web Development</span>
                <span className="font-semibold">{webDevCount} requests</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: `${(webDevCount / requests.length) * 100}%` }}
                />
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-muted-foreground">Design</span>
                <span className="font-semibold">
                  {requests.filter((r) => r.category === "Design").length} requests
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-amber-400 h-2 rounded-full"
                  style={{
                    width: `${
                      (requests.filter((r) => r.category === "Design").length /
                        requests.length) *
                      100
                    }%`,
                  }}
                />
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-muted-foreground">Career</span>
                <span className="font-semibold">
                  {requests.filter((r) => r.category === "Career").length} requests
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{
                    width: `${
                      (requests.filter((r) => r.category === "Career").length /
                        requests.length) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>
          </ContentCard>

          <ContentCard label="MATCH QUALITY" title="Connection insights">
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-2xl">
                <p className="font-semibold text-foreground mb-1">Fast matches</p>
                <p className="text-sm text-muted-foreground">
                  Average time to first helper response is under 2 hours for high-urgency requests.
                </p>
              </div>
              <div className="p-4 bg-muted rounded-2xl">
                <p className="font-semibold text-foreground mb-1">High resolution</p>
                <p className="text-sm text-muted-foreground">
                  95% of matched requests are marked as solved within 48 hours.
                </p>
              </div>
              <div className="p-4 bg-muted rounded-2xl">
                <p className="font-semibold text-foreground mb-1">Trust alignment</p>
                <p className="text-sm text-muted-foreground">
                  Helpers with 80%+ trust scores are 3x more likely to provide quality support.
                </p>
              </div>
            </div>
          </ContentCard>
        </div>
      </main>
    </div>
  )
}
