"use client"

import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ContentCard } from "@/components/content-card"
import { mockLeaderboard } from "@/lib/mock-data"

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header variant="dashboard" />

      <main className="px-6 py-8 max-w-7xl mx-auto">
        <HeroSection
          label="LEADERBOARD"
          title="Recognize the people who keep the community moving."
          description="Trust score, contribution count, and badges create visible momentum for reliable helpers."
        />

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {/* Rankings */}
          <ContentCard label="TOP HELPERS" title="Rankings">
            <div className="space-y-4">
              {mockLeaderboard.slice(1).map((entry) => (
                <div
                  key={entry.userId}
                  className="flex items-center justify-between p-4 bg-muted rounded-2xl"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm ${
                        entry.trustScore >= 85
                          ? "bg-gray-500"
                          : "bg-amber-400"
                      }`}
                    >
                      {entry.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="font-semibold">#{entry.rank} {entry.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {entry.skills.slice(0, 3).join(", ")}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{entry.trustScore}%</p>
                    <p className="text-xs text-muted-foreground">
                      {entry.contributions} contributions
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ContentCard>

          {/* Badge System */}
          <ContentCard label="BADGE SYSTEM" title="Trust and achievement">
            <div className="space-y-6">
              {mockLeaderboard.map((entry) => (
                <div key={entry.userId} className="p-4 bg-muted rounded-2xl">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold">{entry.name}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    {entry.badges.join(" • ")}
                  </p>
                  <div className="w-full bg-background rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        entry.trustScore >= 90
                          ? "bg-amber-400"
                          : "bg-gradient-to-r from-[#0d9488] to-[#10B981]"
                      }`}
                      style={{ width: `${entry.trustScore}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </ContentCard>
        </div>

        {/* Top Helper Spotlight */}
        <div className="mt-8">
          <ContentCard>
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#0d9488] to-[#10B981] flex items-center justify-center text-white font-bold text-xl">
                {mockLeaderboard[0].name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-1">
                  #1 TOP HELPER
                </p>
                <h3 className="text-2xl font-bold text-foreground">
                  {mockLeaderboard[0].name}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {mockLeaderboard[0].trustScore}% trust score • {mockLeaderboard[0].contributions} contributions
                </p>
              </div>
              <div className="flex flex-wrap gap-2 max-w-xs">
                {mockLeaderboard[0].badges.map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </ContentCard>
        </div>
      </main>
    </div>
  )
}
