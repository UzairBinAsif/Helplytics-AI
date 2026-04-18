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
    <div className="bg-white rounded-3xl p-8 border-transparent shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] relative hover:-translate-y-1 transition-transform">
      <div className="flex flex-wrap gap-2 mb-4">
        <Tag variant="primary">{request.category}</Tag>
        <Tag variant={urgencyVariant[request.urgency]}>
          {request.urgency.charAt(0).toUpperCase() + request.urgency.slice(1)}
        </Tag>
        <Tag variant={statusVariant[request.status]}>
          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
        </Tag>
      </div>

      <h3 className="text-lg font-bold text-[#1a2f24] mb-3 leading-tight">{request.title}</h3>

      {showDescription && request.description && (
        <p className="text-sm text-[#4b5563] leading-relaxed mb-6 line-clamp-2">
          {request.description}
        </p>
      )}

      {request.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {request.tags.map((tag) => (
            <Tag key={tag} variant="primary">
              {tag}
            </Tag>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between pt-6 border-t border-gray-100">
        <div>
          <p className="font-semibold text-sm text-[#1a2f24] mb-1">{request.authorName}</p>
          <p className="text-xs text-[#6b7280]">
            {request.authorLocation} • {request.helpersInterested} helper
            {request.helpersInterested !== 1 ? "s" : ""} interested
          </p>
        </div>
        <Link href={`/request/${request.id}`}>
          <Button variant="outline" className="bg-white text-[#152e25] rounded-full px-6 py-5 text-sm font-medium border border-gray-200 shadow-sm hover:bg-gray-50 transition-all">
            Open<br />details
          </Button>
        </Link>
      </div>
    </div>
  )
}
