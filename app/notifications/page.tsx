"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ContentCard } from "@/components/content-card"
import { Button } from "@/components/ui/button"
import { useApp } from "@/lib/context"

export default function NotificationsPage() {
  const router = useRouter()
  const { currentUser, authLoading, notifications, setNotifications } = useApp()

  useEffect(() => {
    if (!authLoading && !currentUser) {
      router.push("/login")
    }
  }, [currentUser, authLoading, router])

  if (authLoading || !currentUser) {
    return null
  }

  const formatTimestamp = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes} min ago`
    if (hours < 24) return `${hours} hr ago`
    if (days === 1) return "Yesterday"
    return "Today"
  }

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header variant="dashboard" />

      <main className="px-6 py-8 max-w-5xl mx-auto">
        <HeroSection
          label="NOTIFICATIONS"
          title="Stay updated on requests, helpers, and trust signals."
        />

        <div className="mt-8">
          <ContentCard label="LIVE UPDATES" title="Notification feed">
            <div className="space-y-1">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-center justify-between py-4 border-b border-border last:border-0"
                >
                  <div className="flex-1">
                    <p className="font-medium text-foreground">
                      {notification.title}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {notification.description} • {formatTimestamp(notification.timestamp)}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full ml-4"
                    onClick={() => markAsRead(notification.id)}
                  >
                    {notification.read ? "Read" : "Unread"}
                  </Button>
                </div>
              ))}
            </div>
          </ContentCard>
        </div>
      </main>
    </div>
  )
}
