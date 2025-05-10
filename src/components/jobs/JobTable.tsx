import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Job } from "@/types/job";
import { getRelativeTime } from "@/lib/utils";
import { memo, useCallback } from "react";

interface JobTableProps {
  jobs: Job[];
  onAcceptJob: (job: Job) => void;
  onRejectJob: (job: Job) => void;
}

export const JobTable = memo(({ jobs, onAcceptJob, onRejectJob }: JobTableProps) => {
  const handleAccept = useCallback((e: React.MouseEvent, job: Job) => {
    e.stopPropagation();
    onAcceptJob(job);
  }, [onAcceptJob]);

  const handleReject = useCallback((e: React.MouseEvent, job: Job) => {
    e.stopPropagation();
    onRejectJob(job);
  }, [onRejectJob]);

  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-semibold w-[25%]">Title</TableHead>
            <TableHead className="font-semibold w-[15%]">Budget</TableHead>
            <TableHead className="font-semibold w-[30%]">Skills</TableHead>
            <TableHead className="font-semibold w-[15%]">Status</TableHead>
            <TableHead className="font-semibold w-[15%]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.map((job,index) => (
            <TableRow 
              key={`job-table-${job.id}-${index}`}
              className="group transition-colors hover:bg-muted/50 cursor-pointer"
              onClick={(e) => handleAccept(e, job)}
            >
              <TableCell className="py-4">
                <div className="flex flex-col gap-1.5">
                  <span className="font-medium group-hover:text-primary transition-colors">{job.title}</span>
                  <span className="text-xs text-muted-foreground">{getRelativeTime(job.job_created_at)}</span>
                </div>
              </TableCell>
              <TableCell className="font-medium">
                {job.job_type === "Hourly" ? (
                  `$${job.hourly_budget_min} - $${job.hourly_budget_max}/hr`
                ) : (
                  job.fixed_job_budget ? `$${job.fixed_job_budget.toLocaleString()}` : `$${job.budget.toLocaleString()}`
                )}
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1.5 max-w-[320px] overflow-hidden">
                  {job.skills.length > 0 ? (
                    job.skills.slice(0, 5).map((skill,index) => (
                      <Badge key={index} variant="secondary" className="px-2 py-0.5 text-xs whitespace-nowrap">
                        {skill}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-muted-foreground">No skills available</span>
                  )}
                  {job.skills.length > 5 && (
                    <Badge variant="outline" className="px-2 py-0.5 text-xs">
                      +{job.skills.length - 5} more
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell>
                {job.status === "accepted" ? (
                  <Badge variant="secondary">Accepted by {job.assigned_to_name}</Badge>
                ) : (
                  <Badge variant="secondary">{job.status}</Badge>
                )}
              </TableCell>
              <TableCell>
                {job.status === "pending" ? (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => handleReject(e, job)}
                    >
                      Reject
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={(e) => handleAccept(e, job)}
                    >
                      Accept
                    </Button>
                  </div>
                ) : (
                  <Button 
                    variant="outline" 
                    onClick={(e) => handleAccept(e, job)}
                  >
                    View
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
});

JobTable.displayName = 'JobTable';
