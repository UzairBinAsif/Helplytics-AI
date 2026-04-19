"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { ContentCard } from "@/components/content-card"
import { Button } from "@/components/ui/button"
import { useApp } from "@/lib/context"
import { auth, db } from "@/lib/firebase"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"

export default function LoginPage() {
  const router = useRouter()
  const { setCurrentUser } = useApp()
  const [isLogin, setIsLogin] = useState(true)

  // Form states
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<"need-help" | "can-help" | "both">("both")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleAuth = async () => {
    setError("")
    setLoading(true)

    try {
      if (isLogin) {
        // Login flow
        await signInWithEmailAndPassword(auth, email, password)
        router.push("/dashboard")
      } else {
        // Sign-up flow
        if (!name) {
          throw new Error("Name is required for sign up")
        }
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user

        // Create user document in Firestore
        await setDoc(doc(db, "users", user.uid), {
          id: user.uid,
          name,
          email,
          role,
          location: "Unknown", // Default or you could add a field for it
          skills: [],
          interests: [],
          trustScore: 0,
          contributions: 0,
          badges: []
        })

        router.push("/dashboard")
      }
    } catch (err: any) {
      setError(err.message || "Failed to authenticate")
    } finally {
      setLoading(false)
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
              Create an account or login to access the community features. Powered by Firebase Authentication and Firestore real-time database.
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
                <span>Persistent sessions powered by Firebase Auth</span>
              </li>
            </ul>
          </div>

          {/* Right Form Card */}
          <ContentCard label={isLogin ? "LOGIN" : "SIGNUP"} title="Authenticate your community profile">
            <div className="space-y-6">
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-sm">
                  {error}
                </div>
              )}

              {/* Sign up only fields */}
              {!isLogin && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 bg-muted rounded-xl border-0 text-foreground focus:ring-2 focus:ring-primary outline-none"
                    />
                  </div>

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
                </>
              )}

              {/* Email and Password Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
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
                    placeholder="********"
                    className="w-full px-4 py-3 bg-muted rounded-xl border-0 text-foreground focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                onClick={handleAuth}
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#0d9488] to-[#10B981] hover:from-[#0f766e] hover:to-[#059669] text-white rounded-full py-6 text-base font-medium transition-all shadow-sm"
              >
                {loading ? "Processing..." : (isLogin ? "Log In to dashboard" : "Sign up & Continue")}
              </Button>
              
              {/* Toggle Mode */}
              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-sm text-primary hover:underline"
                >
                  {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
                </button>
              </div>
            </div>
          </ContentCard>
        </div>
      </main>
    </div>
  )
}
