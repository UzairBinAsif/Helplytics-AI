import { cn } from "@/lib/utils"

interface TagProps {
  children: React.ReactNode
  variant?: "default" | "primary" | "success" | "warning" | "danger"
  className?: string
}

const variantStyles = {
  default: "bg-card border border-border text-foreground",
  primary: "bg-primary/10 border border-primary/20 text-primary",
  success: "bg-emerald-50 border border-emerald-200 text-emerald-700",
  warning: "bg-amber-50 border border-amber-200 text-amber-700",
  danger: "bg-red-50 border border-red-200 text-red-700",
}

export function Tag({ children, variant = "default", className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
