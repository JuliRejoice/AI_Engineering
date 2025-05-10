import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  loading?: boolean;
}

export function EmptyState({ 
  icon: Icon,
  title, 
  description,
  loading = false
}: EmptyStateProps) {
  return (
    <Card className={`flex flex-col items-center justify-center min-h-[400px] gap-4`}>
      {Icon && (
        <div className={`rounded-full bg-muted p-3 ${loading ? "animate-spin" : ""}`}>
          <Icon className="h-6 w-6 text-muted-foreground" />
        </div>
      )}
      <div className="text-center space-y-1">
        <h3 className="font-semibold text-sm">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </Card>
  );
} 