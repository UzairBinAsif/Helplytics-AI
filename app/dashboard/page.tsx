"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ContentCard } from "@/components/content-card"
import { RequestCard } from "@/components/request-card"
import { Button } from "@/components/ui/button"
import { useApp } from "@/lib/context"
import Link from "next/link"

export default function DashboardPage() {
  const router = useRouter()
  const { currentUser, authLoading, requests, notifications } = useApp()

  useEffect(() => {
    if (!authLoading && !currentUser) {
      router.push("/login")
    }
  }, [currentUser, authLoading, router])

  if (authLoading || !currentUser) {
    return null
  }

  const userRequests = requests.filter((r) => r.authorId === currentUser.id)
  const unreadNotifications = notifications.filter((n) => !n.read)

  return (
    <div className="min-h-screen bg-background">
      <Header variant="dashboard" />

      <main className="px-6 py-8 max-w-7xl mx-auto">
        <HeroSection
          label="DASHBOARD"
          title={`Welcome back, ${currentUser.name.split(" ")[0]}.`}
          description="Track your requests, view activity, and manage your community presence."
        />

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {/* Quick Stats */}
          <ContentCard label="YOUR STATS" title="Activity overview">
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-border">
                <span className="text-muted-foreground">Trust score</span>
                <span className="font-semibold">{currentUser.trustScore}%</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-border">
                <span className="text-muted-foreground">Contributions</span>
                <span className="font-semibold">{currentUser.contributions}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-border">
                <span className="text-muted-foreground">Active requests</span>
                <span className="font-semibold">{userRequests.filter((r) => r.status !== "solved").length}</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-muted-foreground">Unread notifications</span>
                <span className="font-semibold">{unreadNotifications.length}</span>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <Link href="/profile" className="flex-1">
                <Button variant="outline" className="w-full rounded-full">
                  View profile
                </Button>
              </Link>
              <Link href="/notifications" className="flex-1">
                <Button variant="outline" className="w-full rounded-full">
                  Notifications
                </Button>
              </Link>
            </div>
          </ContentCard>

          {/* Quick Actions */}
          <ContentCard label="QUICK ACTIONS" title="What do you need?">
            <div className="space-y-4">
              <Link href="/create-request" className="block">
                <Button className="w-full bg-gradient-to-r from-[#0d9488] to-[#10B981] hover:from-[#0f766e] hover:to-[#059669] text-white rounded-full py-6">
                  Create a new request
                </Button>
              </Link>
              <Link href="/explore" className="block">
                <Button variant="outline" className="w-full rounded-full py-6">
                  Browse community feed
                </Button>
              </Link>
              <Link href="/messages" className="block">
                <Button variant="outline" className="w-full rounded-full py-6">
                  Check messages
                </Button>
              </Link>
              <Link href="/ai-center" className="block">
                <Button variant="outline" className="w-full rounded-full py-6">
                  Visit AI Center
                </Button>
              </Link>
            </div>
          </ContentCard>

          {/* Recent Activity */}
          <ContentCard label="RECENT ACTIVITY" title="Latest updates">
            <div className="space-y-4">
              {unreadNotifications.slice(0, 4).map((notification) => (
                <div
                  key={notification.id}
                  className="py-3 border-b border-border last:border-0"
                >
                  <p className="text-sm font-medium text-foreground">
                    {notification.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {notification.description} • Just now
                  </p>
                </div>
              ))}
              {unreadNotifications.length === 0 && (
                <p className="text-muted-foreground text-sm">No recent activity</p>
              )}
            </div>
          </ContentCard>
        </div>

        {/* Your Requests */}
        {userRequests.length > 0 && (
          <section className="mt-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">Your Requests</h2>
              <Link href="/create-request">
                <Button variant="outline" className="rounded-full">
                  Create new
                </Button>
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userRequests.map((request) => (
                <RequestCard key={request.id} request={request} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
