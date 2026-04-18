"use client"

import { Header } from "@/components/header"
import { ContentCard } from "@/components/content-card"
import { RequestCard } from "@/components/request-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { mockRequests } from "@/lib/mock-data"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FDFCF8] relative overflow-hidden font-sans">
      {/* Decorative Blur Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#a8ebd5] mix-blend-multiply filter blur-[100px] opacity-[0.35] rounded-full pointer-events-none" />
      <div className="absolute top-[0%] right-[-10%] w-[40vw] h-[40vw] bg-[#f9e9be] mix-blend-multiply filter blur-[100px] opacity-[0.35] rounded-full pointer-events-none" />
      
      <Header variant="default" />

      <main className="px-6 py-12 max-w-7xl mx-auto relative z-10">
        {/* Hero Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-20 items-stretch">
          {/* Left Column */}
          <div className="flex flex-col justify-center py-4">
            <p className="text-[10px] font-bold tracking-[0.2em] text-[#115e59] uppercase mb-6">
              SMIT GRAND CODING NIGHT 2026
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] font-bold text-[#152e25] leading-[1.05] tracking-tight mb-6">
              Find help faster.<br />
              Become help that<br />
              matters.
            </h1>
            <p className="text-[#4b5563] text-base md:text-lg mb-10 max-w-lg leading-relaxed">
              HelpHub AI is a community-powered support network for students, mentors, creators, and builders. Ask for help, offer help, track impact, and let AI surface smarter matches across the platform.
            </p>

            <div className="flex flex-wrap gap-4 mb-14">
              <Link href="/login">
                <Button className="bg-[#10B981] hover:bg-[#059669] text-white rounded-full px-8 py-6 text-base font-medium shadow-sm transition-all focus:ring-2 focus:ring-[#10B981] focus:ring-offset-2">
                  Open product demo
                </Button>
              </Link>
              <Link href="/create-request">
                <Button variant="outline" className="bg-white text-[#152e25] rounded-full px-8 py-6 text-base font-medium border border-gray-200 hover:bg-gray-50 transition-all shadow-sm">
                  Post a request
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-[1.25rem] p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col">
                <p className="text-[10px] font-bold tracking-[0.15em] text-[#115e59] uppercase mb-3">MEMBERS</p>
                <p className="text-3xl font-bold text-[#152e25] mb-2">384+</p>
                <p className="text-xs text-gray-500 leading-relaxed mt-auto">Students, mentors, and helpers in the loop.</p>
              </div>
              <div className="bg-white rounded-[1.25rem] p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col">
                <p className="text-[10px] font-bold tracking-[0.15em] text-[#115e59] uppercase mb-3">REQUESTS</p>
                <p className="text-3xl font-bold text-[#152e25] mb-2">72+</p>
                <p className="text-xs text-gray-500 leading-relaxed mt-auto">Support posts shared across learning journeys.</p>
              </div>
              <div className="bg-white rounded-[1.25rem] p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col">
                <p className="text-[10px] font-bold tracking-[0.15em] text-[#115e59] uppercase mb-3">SOLVED</p>
                <p className="text-3xl font-bold text-[#152e25] mb-2">69+</p>
                <p className="text-xs text-gray-500 leading-relaxed mt-auto">Problems resolved through fast community action.</p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="bg-[#132A21] rounded-[2rem] p-8 md:p-12 relative shadow-2xl flex flex-col overflow-hidden">
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#EAB308] rounded-full shadow-[0_0_60px_rgba(234,179,8,0.4)]" />
            
            <p className="text-[10px] font-bold tracking-[0.2em] text-gray-300 uppercase mb-4 relative z-10">
              LIVE PRODUCT FEEL
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-[1.1] mb-6 relative z-10">
              More than a form.<br />
              More like an<br />
              ecosystem.
            </h2>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-10 relative z-10">
              A polished multi-page experience inspired by product platforms, with AI summaries, trust scores, contribution signals, notifications, and leaderboard momentum built directly in HTML, CSS, JavaScript, and LocalStorage.
            </p>

            {/* Feature Cards */}
            <div className="space-y-4 relative z-10 mt-auto">
              <div className="bg-[#FDFCF8] rounded-xl p-5 shadow-sm">
                <h3 className="font-semibold text-[#152e25] mb-2 text-sm">AI request intelligence</h3>
                <p className="text-xs text-[#4b5563] leading-relaxed">Auto-categorization, urgency detection, tags, rewrite suggestions, and trend snapshots.</p>
              </div>
              <div className="bg-[#FDFCF8] rounded-xl p-5 shadow-sm">
                <h3 className="font-semibold text-[#152e25] mb-2 text-sm">Community trust graph</h3>
                <p className="text-xs text-[#4b5563] leading-relaxed">Badges, helper rankings, trust score boosts, and visible contribution history.</p>
              </div>
              <div className="bg-[#FDFCF8] rounded-xl p-5 shadow-sm">
                <h3 className="font-semibold text-[#152e25] mb-2 text-sm">100%</h3>
                <p className="text-xs text-[#4b5563] leading-relaxed">Top trust score currently active across the sample mentor network.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Core Flow Section */}
        <section className="mb-20">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] text-[#115e59] uppercase mb-3">CORE FLOW</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a2f24]">
                From struggling alone to solving together
              </h2>
            </div>
            <Link href="/login" className="hidden md:block">
              <Button variant="outline" className="bg-white text-[#152e25] rounded-full px-6 py-5 text-sm font-medium border border-gray-200 hover:bg-gray-50 shadow-sm transition-all">
                Try onboarding AI
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 relative group hover:-translate-y-1 transition-transform">
              <h3 className="text-lg font-bold text-[#1a2f24] mb-3">Ask for help clearly</h3>
              <p className="text-[#4b5563] text-sm leading-relaxed">
                Create structured requests with category, urgency, AI suggestions, and tags that attract the right people.
              </p>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 relative group hover:-translate-y-1 transition-transform">
              <h3 className="text-lg font-bold text-[#1a2f24] mb-3">Discover the right people</h3>
              <p className="text-[#4b5563] text-sm leading-relaxed">
                Use the explore feed, helper lists, notifications, and messaging to move quickly once a match happens.
              </p>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 relative group hover:-translate-y-1 transition-transform">
              <h3 className="text-lg font-bold text-[#1a2f24] mb-3">Track real contribution</h3>
              <p className="text-[#4b5563] text-sm leading-relaxed">
                Trust scores, badges, solved requests, and rankings help the community recognize meaningful support.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Requests Section */}
        <section className="mb-20">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] text-[#115e59] uppercase mb-3">FEATURED REQUESTS</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a2f24]">
                Community problems currently in motion
              </h2>
            </div>
            <Link href="/explore" className="hidden md:block">
              <Button variant="outline" className="bg-white text-[#152e25] rounded-full px-6 py-5 text-sm font-medium border border-gray-200 hover:bg-gray-50 shadow-sm transition-all">
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
        <footer className="mt-20 py-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 font-medium text-center">
            HelpHub AI is built as a premium-feel, multi-page community support product using HTML, CSS, JavaScript, and LocalStorage.
          </p>
        </footer>
      </main>
    </div>
  )
}
