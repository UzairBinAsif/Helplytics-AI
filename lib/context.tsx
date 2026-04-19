"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { User, HelpRequest, Message, Notification } from "./types"
import { auth, db } from "./firebase"
import { onAuthStateChanged } from "firebase/auth"
import { collection, onSnapshot, doc, getDoc } from "firebase/firestore"

interface AppContextType {
  currentUser: User | null
  setCurrentUser: (user: User | null) => void
  authLoading: boolean
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
  const [authLoading, setAuthLoading] = useState(true)
  const [users, setUsers] = useState<User[]>([])
  const [requests, setRequests] = useState<HelpRequest[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    // Listen to Firebase Auth state
    const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          // fetch user doc from firestore
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid))
          if (userDoc.exists()) {
            setCurrentUser({ id: firebaseUser.uid, ...userDoc.data() } as User)
          } else {
            setCurrentUser(null)
          }
        } else {
          setCurrentUser(null)
        }
      } finally {
        setAuthLoading(false)
      }
    })

    // Listen to users collection
    const unsubscribeUsers = onSnapshot(collection(db, "users"), (snapshot) => {
      const usersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as User)
      setUsers(usersData)
    })

    // Listen to requests collection
    const unsubscribeRequests = onSnapshot(collection(db, "requests"), (snapshot) => {
      const requestsData = snapshot.docs.map(doc => {
        const data = doc.data()
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
        } as HelpRequest
      })
      // Sort by newest first
      requestsData.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      setRequests(requestsData)
    })

    // Listen to messages collection
    const unsubscribeMessages = onSnapshot(collection(db, "messages"), (snapshot) => {
      const messagesData = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate ? doc.data().timestamp.toDate() : new Date()
      }) as Message)
      messagesData.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
      setMessages(messagesData)
    })

    // Listen to notifications
    const unsubscribeNotifications = onSnapshot(collection(db, "notifications"), (snapshot) => {
      const notifsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate ? doc.data().timestamp.toDate() : new Date()
      }) as Notification)
      notifsData.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      setNotifications(notifsData)
    })

    return () => {
      unsubscribeAuth()
      unsubscribeUsers()
      unsubscribeRequests()
      unsubscribeMessages()
      unsubscribeNotifications()
    }
  }, [])

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        authLoading,
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
