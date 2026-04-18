"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface HeaderProps {
  variant?: "default" | "auth" | "dashboard"
}

export function Header({ variant = "default" }: HeaderProps) {
  const pathname = usePathname()

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
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
            >
              Join the platform
            </Link>
          </>
        )}
        {variant === "dashboard" && (
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
        )}
      </nav>
    </header>
  )
}
