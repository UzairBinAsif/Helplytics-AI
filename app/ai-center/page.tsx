"use client"

import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ContentCard } from "@/components/content-card"
import { Tag } from "@/components/tag"
import { useApp } from "@/lib/context"
import { Chatbot } from "@/components/chatbot"

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

        <div className="grid lg:grid-cols-[1fr_400px] gap-8 mt-8 items-start">
          <div className="space-y-8">
            {/* AI Recommendations */}
            <ContentCard label="AI RECOMMENDATIONS" title="Requests needing attention">
              <div className="space-y-4 pt-4">
                {recommendedRequests.map((request) => (
                  <div
                    key={request.id}
                    className="p-6 bg-[#FDFCF8] rounded-2xl border border-gray-100"
                  >
                    <p className="font-semibold text-[#1a2f24] mb-2">
                      {request.title}
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      {request.category === "Web Development"
                        ? "AI summary: Web Development request with high urgency. Best suited for members with relevant expertise."
                        : request.category === "Design"
                        ? "A visual design critique request where feedback on hierarchy, spacing, and messaging would create the most value."
                        : "Career coaching request focused on confidence-building, behavioral answers, and entry-level frontend interviews."}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Tag variant="primary">{request.category}</Tag>
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

            {/* Platform Insights */}
            <div className="grid md:grid-cols-2 gap-6">
              <ContentCard label="SKILL DEMAND" title="What the community needs">
                <div className="space-y-4 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">Web Development</span>
                    <span className="font-semibold text-[#1a2f24] text-sm">{webDevCount} requests</span>
                  </div>
                  <div className="w-full bg-[#f3f4f6] rounded-full h-2">
                    <div
                      className="bg-[#10B981] h-2 rounded-full"
                      style={{ width: `${(webDevCount / requests.length) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center mt-6">
                    <span className="text-gray-500 text-sm">Design</span>
                    <span className="font-semibold text-[#1a2f24] text-sm">
                      {requests.filter((r) => r.category === "Design").length} requests
                    </span>
                  </div>
                  <div className="w-full bg-[#f3f4f6] rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{
                        width: `${
                          (requests.filter((r) => r.category === "Design").length /
                            requests.length) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </ContentCard>

              <ContentCard label="MATCH QUALITY" title="Connection insights">
                <div className="space-y-4 pt-4">
                  <div className="p-4 bg-[#FDFCF8] rounded-xl border border-gray-100">
                    <p className="font-semibold text-[#1a2f24] mb-1 text-sm">Fast matches</p>
                    <p className="text-xs text-gray-500">
                      Average time to first helper response is under 2 hours for high-urgency requests.
                    </p>
                  </div>
                  <div className="p-4 bg-[#FDFCF8] rounded-xl border border-gray-100">
                    <p className="font-semibold text-[#1a2f24] mb-1 text-sm">High resolution</p>
                    <p className="text-xs text-gray-500">
                      95% of matched requests are marked as solved within 48 hours.
                    </p>
                  </div>
                </div>
              </ContentCard>
            </div>
          </div>

          {/* Interactive Chatbot */}
          <div className="sticky top-6">
            <Chatbot />
          </div>
        </div>
      </main>
    </div>
  )
}
