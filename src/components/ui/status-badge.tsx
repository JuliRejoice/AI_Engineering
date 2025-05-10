import { Badge } from "./badge"
import { cn } from "@/lib/utils"

type Status = "pending" | "accepted" | "rejected" | "draft";

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

const statusStyles = {
  pending: "bg-blue-50 text-blue-600 border-blue-100",
  accepted: "bg-green-50 text-green-600 border-green-200",
  rejected: "bg-red-50 text-red-600 border-red-200",
  draft: "bg-gray-50 text-gray-600 border-gray-200"
} as const;

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <Badge 
      variant="outline" 
      className={cn(
        "capitalize",
        statusStyles[status],
        className
      )}
    >
      {status}
    </Badge>
  )
} 