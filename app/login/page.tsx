"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { ContentCard } from "@/components/content-card"
import { Button } from "@/components/ui/button"
import { useApp } from "@/lib/context"
import { mockUsers } from "@/lib/mock-data"

export default function LoginPage() {
  const router = useRouter()
  const { setCurrentUser } = useApp()
  const [selectedUser, setSelectedUser] = useState(mockUsers[0].id)
  const [role, setRole] = useState<"need-help" | "can-help" | "both">("both")
  const [email, setEmail] = useState("community@helphub.ai")
  const [password, setPassword] = useState("********")

  const handleLogin = () => {
    const user = mockUsers.find((u) => u.id === selectedUser)
    if (user) {
      setCurrentUser({ ...user, role })
      router.push("/dashboard")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header variant="auth" />

      <main className="px-6 py-8 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Info Card */}
          <div className="bg-secondary rounded-3xl p-8 md:p-10">
            <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-4">
              COMMUNITY ACCESS
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
              Enter the support network.
            </h1>
            <p className="text-gray-400 text-sm mb-8 max-w-md leading-relaxed">
              Choose a demo identity, set your role, and jump into a multi-page product flow designed for asking, offering, and tracking help with a premium interface.
            </p>

            <ul className="space-y-4 text-gray-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-gray-500 mt-0.5">•</span>
                <span>Role-based entry for Need Help, Can Help, or Both</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-500 mt-0.5">•</span>
                <span>Direct path into dashboard, requests, AI Center, and community feed</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-500 mt-0.5">•</span>
                <span>Persistent demo session powered by LocalStorage</span>
              </li>
            </ul>
          </div>

          {/* Right Form Card */}
          <ContentCard label="LOGIN / SIGNUP" title="Authenticate your community profile">
            <div className="space-y-6">
              {/* Demo User Select */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Select demo user
                </label>
                <select
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  className="w-full px-4 py-3 bg-muted rounded-xl border-0 text-foreground focus:ring-2 focus:ring-primary outline-none"
                >
                  {mockUsers.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Role selection
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as typeof role)}
                  className="w-full px-4 py-3 bg-muted rounded-xl border-0 text-foreground focus:ring-2 focus:ring-primary outline-none"
                >
                  <option value="both">Both</option>
                  <option value="need-help">Need Help</option>
                  <option value="can-help">Can Help</option>
                </select>
              </div>

              {/* Email and Password Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-muted rounded-xl border-0 text-foreground focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-muted rounded-xl border-0 text-foreground focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                onClick={handleLogin}
                className="w-full bg-primary hover:bg-primary/90 text-white rounded-full py-6 text-base font-medium"
              >
                Continue to dashboard
              </Button>
            </div>
          </ContentCard>
        </div>
      </main>
    </div>
  )
}
