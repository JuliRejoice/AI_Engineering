import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Check, X, DollarSign, Calendar } from "lucide-react";
import { Job } from "@/types/job";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface JobReviewCardProps {
  job: Job;
  onAccept?: (jobId: string) => void;
  onReject?: (jobId: string) => void;
}

const JobReviewCard = ({ job, onAccept, onReject }: JobReviewCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const descriptionLength = 200;
  const truncatedDescription = job.description.length > descriptionLength ? job.description.substring(0, descriptionLength) + "..." : job.description;

  return (
    <>
      <Card className="w-full bg-white shadow-lg mb-4 hover:shadow-xl transition-shadow">
        <CardHeader className="space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-1" />
                  <span>{job.budget}</span>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{new Date(job.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="border-red-200 hover:border-red-300 hover:bg-red-50"
                onClick={() => onReject(job.id)}
              >
                <X className="w-4 h-4 mr-1 text-red-500" />
                Reject
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-green-200 hover:border-green-300 hover:bg-green-50"
                onClick={() => onAccept(job.id)}
              >
                <Check className="w-4 h-4 mr-1 text-green-500" />
                Accept
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="bg-blue-50 text-blue-700"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Job Description</h4>
            <ScrollArea className="h-[100px] rounded-md border p-4">
              <p className="text-gray-600">
                {truncatedDescription}
                {job.description.length > descriptionLength && (
                  <Button variant="link" onClick={() => setIsDialogOpen(true)}>
                    View More
                  </Button>
                )}
              </p>
            </ScrollArea>
          </div>

          <div>
            <h4 className="font-medium text-gray-700 mb-2">
              AI Generated Proposal
            </h4>
            <ScrollArea className="h-[150px] rounded-md border p-4">
              <p className="text-gray-600">{job.proposal}</p>
            </ScrollArea>
          </div>
        </CardContent>

        <CardFooter className="bg-gray-50 py-3">
          <p className="text-sm text-gray-500">
            Status: <span className="font-medium capitalize">{job.status}</span>
            {job.assigned_to_id && (
              <>
                {" "}
                • Assigned to:{" "}
                <span className="font-medium">{job.assigned_to_name}</span>
              </>
            )}
          </p>
        </CardFooter>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-none fixed top-0 left-0 w-full h-full bg-white z-50">
          <DialogHeader>
            <DialogTitle>{job.title}</DialogTitle>
            <DialogDescription>Full Job Details</DialogDescription>
          </DialogHeader>
          <div className="p-4 space-y-4">
            <p>Description: {job.description}</p>
            <p>Budget: {job.budget}</p>
            <p>Skills: {job.skills.join(", ")}</p>
            {job.client_company && <p>Client Company: {job.client_company}</p>}
            {job.client_past_hires && (
              <p>Client Past Hires: {job.client_past_hires}</p>
            )}
            {job.client_total_spend && (
              <p>Client Total Spend: {job.client_total_spend}</p>
            )}
            {job.job_url && (
              <p>
                Job URL:{" "}
                <a
                  href={job.job_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {job.job_url}
                </a>
              </p>
            )}
            <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default JobReviewCard;
