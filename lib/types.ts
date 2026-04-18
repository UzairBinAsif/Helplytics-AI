export interface User {
  id: string
  name: string
  email: string
  role: "need-help" | "can-help" | "both"
  location: string
  skills: string[]
  interests: string[]
  trustScore: number
  contributions: number
  badges: string[]
  avatar?: string
}

export interface HelpRequest {
  id: string
  title: string
  description: string
  category: string
  urgency: "low" | "medium" | "high"
  status: "open" | "in-progress" | "solved"
  tags: string[]
  authorId: string
  authorName: string
  authorLocation: string
  helpersInterested: number
  createdAt: Date
}

export interface Message {
  id: string
  fromUserId: string
  fromUserName: string
  toUserId: string
  toUserName: string
  content: string
  timestamp: Date
  read: boolean
}

export interface Notification {
  id: string
  userId: string
  type: "status" | "match" | "request" | "reputation" | "insight"
  title: string
  description: string
  timestamp: Date
  read: boolean
}

export interface LeaderboardEntry {
  userId: string
  name: string
  avatar?: string
  skills: string[]
  trustScore: number
  contributions: number
  badges: string[]
  rank: number
}
