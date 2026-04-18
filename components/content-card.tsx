import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface ContentCardProps {
  label?: string
  title?: string
  children: ReactNode
  className?: string
}

export function ContentCard({ label, title, children, className }: ContentCardProps) {
  return (
    <div className={cn("bg-card rounded-3xl p-6 md:p-8", className)}>
      {label && (
        <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-2">
          {label}
        </p>
      )}
      {title && (
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-balance">
          {title}
        </h2>
      )}
      {children}
    </div>
  )
}
