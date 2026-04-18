"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ContentCard } from "@/components/content-card"
import { Button } from "@/components/ui/button"
import { useApp } from "@/lib/context"
import { mockUsers } from "@/lib/mock-data"

export default function MessagesPage() {
  const router = useRouter()
  const { currentUser, messages, setMessages } = useApp()

  const [recipient, setRecipient] = useState(mockUsers[0].id)
  const [messageContent, setMessageContent] = useState("")

  useEffect(() => {
    if (!currentUser) {
      router.push("/login")
    }
  }, [currentUser, router])

  if (!currentUser) {
    return null
  }

  const userMessages = messages.filter(
    (m) => m.fromUserId === currentUser.id || m.toUserId === currentUser.id
  )

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date)
  }

  const handleSend = () => {
    if (!messageContent.trim()) return

    const recipientUser = mockUsers.find((u) => u.id === recipient)
    if (!recipientUser) return

    const newMessage = {
      id: String(messages.length + 1),
      fromUserId: currentUser.id,
      fromUserName: currentUser.name,
      toUserId: recipient,
      toUserName: recipientUser.name,
      content: messageContent,
      timestamp: new Date(),
      read: false,
    }

    setMessages([...messages, newMessage])
    setMessageContent("")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header variant="dashboard" />

      <main className="px-6 py-8 max-w-7xl mx-auto">
        <HeroSection
          label="INTERACTION / MESSAGING"
          title="Keep support moving through direct communication."
          description="Basic messaging gives helpers and requesters a clear follow-up path once a match happens."
        />

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {/* Conversation Stream */}
          <ContentCard label="CONVERSATION STREAM" title="Recent messages">
            <div className="space-y-4">
              {userMessages.length > 0 ? (
                userMessages.map((message) => (
                  <div
                    key={message.id}
                    className="flex items-start justify-between py-4 border-b border-border last:border-0"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-sm">
                        {message.fromUserName} → {message.toUserName}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        {message.content}
                      </p>
                    </div>
                    <div className="ml-4 px-3 py-1.5 bg-muted rounded-lg text-xs font-medium text-center min-w-[60px]">
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  No messages yet. Start a conversation!
                </p>
              )}
            </div>
          </ContentCard>

          {/* Send Message */}
          <ContentCard label="SEND MESSAGE" title="Start a conversation">
            <div className="space-y-6">
              {/* Recipient Select */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  To
                </label>
                <select
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="w-full px-4 py-3 bg-muted rounded-xl border-0 text-foreground focus:ring-2 focus:ring-primary outline-none"
                >
                  {mockUsers
                    .filter((u) => u.id !== currentUser.id)
                    .map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                </select>
              </div>

              {/* Message Content */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <textarea
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  placeholder="Share support details, ask for files, or suggest next steps."
                  rows={5}
                  className="w-full px-4 py-3 bg-muted rounded-xl border-0 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary outline-none resize-none"
                />
              </div>

              {/* Send Button */}
              <Button
                onClick={handleSend}
                className="w-full bg-primary hover:bg-primary/90 text-white rounded-full py-6 text-base font-medium"
              >
                Send
              </Button>
            </div>
          </ContentCard>
        </div>
      </main>
    </div>
  )
}
