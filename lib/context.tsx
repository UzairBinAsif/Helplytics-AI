"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import { User, HelpRequest, Message, Notification } from "./types"
import { mockUsers, mockRequests, mockMessages, mockNotifications } from "./mock-data"

interface AppContextType {
  currentUser: User | null
  setCurrentUser: (user: User | null) => void
  users: User[]
  requests: HelpRequest[]
  setRequests: (requests: HelpRequest[]) => void
  messages: Message[]
  setMessages: (messages: Message[]) => void
  notifications: Notification[]
  setNotifications: (notifications: Notification[]) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [users] = useState<User[]>(mockUsers)
  const [requests, setRequests] = useState<HelpRequest[]>(mockRequests)
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        users,
        requests,
        setRequests,
        messages,
        setMessages,
        notifications,
        setNotifications,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}
