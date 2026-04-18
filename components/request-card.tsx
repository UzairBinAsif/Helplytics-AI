import { HelpRequest } from "@/lib/types"
import { Tag } from "./tag"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface RequestCardProps {
  request: HelpRequest
  showDescription?: boolean
}

const urgencyVariant = {
  low: "default" as const,
  medium: "warning" as const,
  high: "danger" as const,
}

const statusVariant = {
  open: "primary" as const,
  "in-progress": "warning" as const,
  solved: "success" as const,
}

export function RequestCard({ request, showDescription = true }: RequestCardProps) {
  return (
    <div className="bg-card rounded-2xl p-6 border border-border/50">
      <div className="flex flex-wrap gap-2 mb-3">
        <Tag variant="default">{request.category}</Tag>
        <Tag variant={urgencyVariant[request.urgency]}>
          {request.urgency.charAt(0).toUpperCase() + request.urgency.slice(1)}
        </Tag>
        <Tag variant={statusVariant[request.status]}>
          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
        </Tag>
      </div>

      <h3 className="font-semibold text-foreground mb-2">{request.title}</h3>

      {showDescription && request.description && (
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {request.description}
        </p>
      )}

      {request.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {request.tags.map((tag) => (
            <Tag key={tag} variant="default">
              {tag}
            </Tag>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium text-sm">{request.authorName}</p>
          <p className="text-xs text-muted-foreground">
            {request.authorLocation} • {request.helpersInterested} helper
            {request.helpersInterested !== 1 ? "s" : ""} interested
          </p>
        </div>
        <Link href={`/request/${request.id}`}>
          <Button variant="outline" size="sm" className="rounded-full">
            Open details
          </Button>
        </Link>
      </div>
    </div>
  )
}
