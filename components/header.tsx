"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Chatbot } from "./chatbot"
import { useApp } from "@/lib/context"
import { auth } from "@/lib/firebase"
import { signOut } from "firebase/auth"

interface HeaderProps {
  variant?: "default" | "auth" | "dashboard"
}

export function Header({ variant = "default" }: HeaderProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { currentUser } = useApp()

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.push("/")
    } catch (error) {
      console.error("Failed to log out", error)
    }
  }

  const navLinks = {
    default: [
      { href: "/", label: "Home" },
      { href: "/explore", label: "Explore" },
      { href: "/leaderboard", label: "Leaderboard" },
      { href: "/ai-center", label: "AI Center" },
    ],
    auth: [
      { href: "/", label: "Home" },
      { href: "/explore", label: "Explore" },
      { href: "/leaderboard", label: "Leaderboard" },
    ],
    dashboard: [
      { href: "/dashboard", label: "Dashboard" },
      { href: "/explore", label: "Explore" },
      { href: "/leaderboard", label: "Leaderboard" },
      { href: "/notifications", label: "Notifications" },
    ],
  }

  const links = navLinks[variant]

  return (
    <header className="flex items-center justify-between px-6 py-4">
      <Link href="/" className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-semibold text-lg">
          H
        </div>
        <span className="font-semibold text-foreground">HelpHub AI</span>
      </Link>

      <nav className="flex items-center gap-2">
        {links.map((link) => {
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-full transition-colors",
                isActive
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          )
        })}
        {variant === "default" && (
          <>
            <Link
              href="/explore"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Live community signals
            </Link>
            {currentUser ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
              >
                Join the platform
              </Link>
            )}
          </>
        )}
        {variant === "dashboard" && (
          <>
            <Link
              href="/create-request"
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-full transition-colors",
                pathname === "/create-request"
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "border border-border hover:border-primary/20"
              )}
            >
              Create Request
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium border border-border text-foreground rounded-full hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors"
            >
              Logout
            </button>
          </>
        )}
        <Chatbot />
      </nav>
    </header>
  )
}
