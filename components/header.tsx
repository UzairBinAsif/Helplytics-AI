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
    // Let's use dashboard for the logged in internal pages
    dashboard: [
      { href: "/dashboard", label: "Dashboard" },
      { href: "/create-request", label: "Create Request" },
      { href: "/ai-center", label: "AI Center" },
      { href: "/profile", label: "Profile" },
    ],
  }

  const links = variant === "auth" ? navLinks.default : navLinks[variant]

  return (
    <header className="flex items-center justify-between px-6 py-6 max-w-7xl mx-auto w-full">
      <div className="flex items-center gap-12">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0d9488] text-white font-semibold text-lg">
            H
          </div>
          <span className="font-semibold text-[#1a2f24] tracking-tight whitespace-nowrap">HelpHub AI</span>
        </Link>
        
        {variant !== "dashboard" && (
          <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-full transition-colors",
                    isActive
                      ? "bg-black/5 text-[#152e25]"
                      : "text-gray-500 hover:text-[#1a2f24]"
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>
        )}
      </div>

      <nav className="flex items-center gap-6">
        {variant !== "dashboard" && (
          <>
            <Link
              href="/explore"
              className="text-sm font-medium text-gray-500 hover:text-[#1a2f24] hidden md:block"
            >
              Live community signals
            </Link>
            {currentUser ? (
              <button
                onClick={handleLogout}
                className="px-6 py-2.5 text-sm font-semibold bg-gradient-to-r from-[#0d9488] to-[#10B981] hover:from-[#0f766e] hover:to-[#059669] text-white rounded-full transition-all shadow-sm"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="px-6 py-2.5 text-sm font-semibold bg-gradient-to-r from-[#0d9488] to-[#10B981] hover:from-[#0f766e] hover:to-[#059669] text-white rounded-full transition-all shadow-sm"
              >
                Join the platform
              </Link>
            )}
          </>
        )}

        {variant === "dashboard" && (
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              // Ensure we don't duplicate render if the page isn't matching perfectly, but simple exact match works best.
              const isActive = pathname === link.href
              // Exception for 'Profile' in AI Center because in screenshot 2 we only see three links: Dashboard, Create Request, AI Center
              // But in Profile, we see Dashboard, Onboarding, Profile.
              // To handle this dynamically without hardcoding arrays per page, we will just show the array but styling them cleanly:
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-5 py-2.5 text-sm font-medium rounded-full transition-colors",
                    isActive
                      ? "bg-[#e6f4ea] text-[#115e59]"
                      : "text-gray-500 hover:text-[#1a2f24]"
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>
        )}
      </nav>
    </header>
  )
}
