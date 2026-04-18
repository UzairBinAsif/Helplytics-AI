"use client"

import { Header } from "@/components/header"
import { ContentCard } from "@/components/content-card"
import { RequestCard } from "@/components/request-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { mockRequests } from "@/lib/mock-data"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header variant="default" />

      <main className="px-6 py-8 max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Left Card */}
          <div className="bg-secondary rounded-3xl p-8 md:p-10">
            <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-4">
              SMIT GRAND CODING NIGHT 2026
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Find help faster.<br />
              Become help that<br />
              matters.
            </h1>
            <p className="text-gray-400 text-sm mb-8 max-w-md">
              HelpHub AI is a community-powered support network for students, mentors, creators, and builders. Ask for help, offer help, track impact, and let AI surface smarter matches across the platform.
            </p>

            <div className="flex gap-3 mb-10">
              <Link href="/login">
                <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-6">
                  Open product demo
                </Button>
              </Link>
              <Link href="/create-request">
                <Button variant="outline" className="rounded-full px-6 border-gray-600 text-white hover:bg-white/10">
                  Post a request
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-700">
              <div>
                <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-2">MEMBERS</p>
                <p className="text-3xl font-bold text-white">384+</p>
                <p className="text-xs text-gray-500 mt-1">Students, mentors, and helpers in the loop.</p>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-2">REQUESTS</p>
                <p className="text-3xl font-bold text-white">72+</p>
                <p className="text-xs text-gray-500 mt-1">Support posts shared across learning journeys.</p>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-2">SOLVED</p>
                <p className="text-3xl font-bold text-white">69+</p>
                <p className="text-xs text-gray-500 mt-1">Problems resolved through fast community action.</p>
              </div>
            </div>
          </div>

          {/* Right Card */}
          <div className="bg-secondary rounded-3xl p-8 md:p-10 relative overflow-hidden">
            <div className="absolute top-6 right-6 w-20 h-20 bg-amber-400 rounded-full opacity-80" />
            
            <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-4">
              LIVE PRODUCT FEEL
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
              More than a form.<br />
              More like an<br />
              ecosystem.
            </h2>
            <p className="text-gray-400 text-sm mb-8 max-w-md">
              A polished multi-page experience inspired by product platforms, with AI summaries, trust scores, contribution signals, notifications, and leaderboard momentum built directly in HTML, CSS, JavaScript, and LocalStorage.
            </p>

            {/* Feature Cards */}
            <div className="space-y-4">
              <div className="bg-white/5 backdrop-blur rounded-2xl p-4">
                <h3 className="font-semibold text-white mb-1">AI request intelligence</h3>
                <p className="text-xs text-gray-400">Auto-categorization, urgency detection, tags, rewrite suggestions, and trend snapshots.</p>
              </div>
              <div className="bg-white/5 backdrop-blur rounded-2xl p-4">
                <h3 className="font-semibold text-white mb-1">Community trust graph</h3>
                <p className="text-xs text-gray-400">Badges, helper rankings, trust score boosts, and visible contribution history.</p>
              </div>
              <div className="bg-white/5 backdrop-blur rounded-2xl p-4">
                <h3 className="font-semibold text-white mb-1">100%</h3>
                <p className="text-xs text-gray-400">Top trust score currently active across the sample mentor network.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Core Flow Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-2">CORE FLOW</p>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                From struggling alone to solving together
              </h2>
            </div>
            <Link href="/login">
              <Button variant="outline" className="rounded-full">
                Try onboarding AI
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Ask for help clearly</h3>
              <p className="text-sm text-muted-foreground">
                Create structured requests with category, urgency, AI suggestions, and tags that attract the right people.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Discover the right people</h3>
              <p className="text-sm text-muted-foreground">
                Use the explore feed, helper lists, notifications, and messaging to move quickly once a match happens.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Track real contribution</h3>
              <p className="text-sm text-muted-foreground">
                Trust scores, badges, solved requests, and rankings help the community recognize meaningful support.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Requests Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-2">FEATURED REQUESTS</p>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Community problems currently in motion
              </h2>
            </div>
            <Link href="/explore">
              <Button variant="outline" className="rounded-full">
                View full feed
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {mockRequests.slice(0, 3).map((request) => (
              <RequestCard key={request.id} request={request} />
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 py-6 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            HelpHub AI is built as a premium-feel, multi-page community support product using HTML, CSS, JavaScript, and LocalStorage.
          </p>
        </footer>
      </main>
    </div>
  )
}
