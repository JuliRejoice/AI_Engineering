import { Job } from "@/types/job";
import { JobCard } from "./JobCard";
import { memo } from "react";

interface JobListProps {
  jobs: Job[];
  onAcceptJob: (job: Job) => void;
  onRejectJob: (job: Job) => void;
}

export const JobList = memo(({ jobs, onAcceptJob, onRejectJob }: JobListProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {jobs.map((job,index) => (
        <JobCard
          key={`job-lists-${job.id}-${index}`}
          job={job}
          onAccept={onAcceptJob}
          onReject={onRejectJob}
        />
      ))}
    </div>
  );
});

JobList.displayName = 'JobList';
