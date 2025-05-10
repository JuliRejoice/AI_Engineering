import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Job } from "@/types/job";
import { getRelativeTime } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";
import { formatTotalSpend } from "@/lib/utils";

interface JobCardProps {
  job: Job;
  onAccept: (job: Job) => void;
  onReject: (job: Job) => void;
}

export function JobCard({ job, onAccept, onReject }: JobCardProps) {
  const acceptJob = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAccept(job);
  }

  const rejectJob = (e: React.MouseEvent) => {
    e.stopPropagation();
    onReject(job);
  }

  return (
    <Card
      className="w-full bg-card flex flex-col h-full cursor-pointer transform-gpu hover:translate-y-[-2px] transition-[transform,shadow] duration-150"
      onClick={acceptJob}
    >
      <CardHeader>
        {job.job_created_at && <p className="text-xs text-muted-foreground mt-1">{getRelativeTime(job.job_created_at)}</p>}
        <CardTitle className="flex justify-between items-start">
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold line-clamp-2" title={job.title}>{job.title}</h3>
            <div className="mt-1">
              <div className="flex items-center gap-4">
                {job.client_total_spend > 0 && (
                  <p className="text-sm font-medium text-muted-foreground gap-1">
                    {formatTotalSpend(job.client_total_spend)}
                  </p>
                )}
                {job.client_location && (
                  <p className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    <MapPin size={18} /> {job.client_location}
                  </p>
                )}
              </div>
              {job.job_type === "Hourly" ? (
                <p className="text-sm text-muted-foreground">
                  Budget: ${job.hourly_budget_min} - ${job.hourly_budget_max}/hr
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Budget: ${job.fixed_job_budget ? job.fixed_job_budget.toLocaleString() : job.budget.toLocaleString()}
                </p>
              )}
            </div>
          </div>
          {job.status === "accepted" && (
            <Badge variant="outline">
              Accepted by {job.assigned_to_name}
            </Badge>
          )}
          {job.status === "rejected" && (
            <Badge variant="outline">
              Rejected by {job.assigned_to_name}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="overflow-hidden flex-grow">
        <p className="text-sm mb-4 line-clamp-3" title={job.description}>
          {job.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {job.skills.map((skill, index) => (
            <Badge key={index} variant="secondary">
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Badge
          variant="secondary"
          className={cn(
            "text-xs px-2 py-0.5 font-normal",
            job.job_score >= 80 ? "bg-[#E3FFE4] hover:bg-[#E3FFE4] text-[#2FB344]" :
              job.job_score >= 60 ? "bg-[#FFF8E3] hover:bg-[#FFF8E3] text-[#FFB82E]" :
                "bg-[#FFE4E4] hover:bg-[#FFE4E4] text-[#E93D3D]"
          )}
        >
          Score: {String(job.job_score ?? "00")}%
        </Badge>
        <div className="flex gap-2">
          {job.status === "pending" ? (
            <>
              <Button onClick={rejectJob} variant="outline">
                Reject
              </Button>
              <Button onClick={acceptJob}>Accept</Button>
            </>
          ) : (
            <Button onClick={acceptJob} variant="outline">
              View
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
