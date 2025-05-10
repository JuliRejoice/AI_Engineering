import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Job } from "@/types/job";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { SquareArrowOutUpRight, Sparkles } from "lucide-react";
import { createPersonLead } from "@/APIs/pipedrive";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { toast } from "@/components/ui/use-toast";
import { sendSlackAlert, slackThreadResponse } from "@/APIs/slack";
import { generateProposal } from "@/APIs/proposal";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatTotalSpend } from "@/lib/utils";

interface ProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  job?: Job;
}

interface LoadingState {
  accepted: boolean;
  rejected: boolean;
}

function ProposalModal({ onClose, job, isOpen }: ProposalModalProps) {
  const { bdeProfile } = useAuth();
  const [currentJob, setCurrentJob] = useState<Job | null>(job);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [loading, setIsLoading] = useState<LoadingState>({
    accepted: false,
    rejected: false,
  });

  useEffect(() => {
    setCurrentJob(job);
  }, [job]);

  const handleLoadingState = (name: string) => {
    setIsLoading(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const handleProposal = async (status: string = "accepted") => {
    if (status === "rejected") {
      handleLoadingState(status);
    }
    const payload = {
      status: status,
      assigned_to: bdeProfile?.id,
      assigned_to_name: bdeProfile?.name,
    };

    await supabase
      .from("jobs")
      .update(payload)
      .eq("id", job.id);

    handleLoadingState(status);
    onClose();
  };

  const handleCopyAndClose = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedProposal = currentJob?.proposal?.trim();
    if (!trimmedProposal) return;
    handleLoadingState("accepted");
    navigator.clipboard.writeText(trimmedProposal);
    const proposalPayload = {
      name: job.title,
      "fca84596be5765573b3a4b31dba1dd4ea2784d6a": trimmedProposal
    }

    createPersonLead(proposalPayload)
      .then(async () => {
        await sendSlackAlert({ ...currentJob, person_name: bdeProfile?.name }, 2);
        await slackThreadResponse({ ...currentJob, person_name: bdeProfile?.name });
        handleProposal("accepted");
        toast({
          title: "Success",
          description: "Job accepted successfully",
          duration: 3000,
        });
      })
      .catch((error) => console.error('Failed:', error));
  };


  const handleGenerateProposal = async () => {
    setIsGenerating(true);
    try {
      const response = await generateProposal(job.jobid);
      if (response.proposal) {
        await supabase
          .from("jobs")
          .update({ proposal: response.proposal, status: "draft" })
          .eq("id", job.id);

        setCurrentJob(prev => ({ ...prev, proposal: response.proposal, status: "draft" }));
        toast({
          title: "Proposal Generated Successfully",
          description: "Your AI proposal is ready",
          duration: 2000,
        });
      }
    } catch (error) {
      toast({
        title: "Failed to generate proposal",
        description: "Please try again later",
        variant: "destructive",
        duration: 2000,
      });
    }
    setIsGenerating(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl gap-4">
        <DialogTitle>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-gray-800">
                {job ? job.title : 'New Proposal'}
              </h2>
              <StatusBadge status={job?.status || 'pending'} />
            </div>
            {job?.job_url && (
              <a
                href={job.job_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 break-all"
              >
                {job.job_url}
                <SquareArrowOutUpRight size={16} />
              </a>
            )}
            <p className="text-sm text-gray-500 font-medium">{job?.id}</p>
          </div>
        </DialogTitle>
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <div className="flex-1 min-w-[140px] bg-white px-3.5 py-2 rounded-md border-l-[3px] hover:border-l-blue-400 border border-gray-100 hover:shadow-sm transition-all">
              <div className="flex gap-2">
                <span className="text-[10px] font-medium text-gray-500 uppercase">Location:</span>
                <span className="text-xs font-medium text-gray-600">{job?.client_location || 'N/A'}</span>
              </div>
            </div>

            <div className="flex-1 min-w-[140px] bg-white px-3.5 py-2 rounded-md border-l-[3px] hover:border-l-blue-400 border border-gray-100 hover:shadow-sm transition-all">
              <div className="flex gap-2">
                <span className="text-[10px] font-medium text-gray-500 uppercase">Budget:</span>
                <span className="text-xs font-medium text-gray-600">
                  {job?.job_type === "Hourly" 
                    ? `$${job?.hourly_budget_min} - $${job?.hourly_budget_max}/hr` 
                    : job?.fixed_job_budget 
                      ? `$${job?.fixed_job_budget}` 
                      : job?.budget 
                        ? `$${job?.budget}` 
                        : 'N/A'}
                </span>
              </div>
            </div>

            <div className="flex-1 min-w-[140px] bg-white px-3.5 py-2 rounded-md border-l-[3px] hover:border-l-blue-400 border border-gray-100 hover:shadow-sm transition-all">
              <div className="flex gap-2">
                <span className="text-[10px] font-medium text-gray-500 uppercase">Past Hires:</span>
                <span className="text-xs font-medium text-gray-600">{job?.client_past_hires || 'N/A'}</span>
              </div>
            </div>

            <div className="flex-1 min-w-[140px] bg-white px-3.5 py-2 rounded-md border-l-[3px] hover:border-l-blue-400 border border-gray-100 hover:shadow-sm transition-all">
              <div className="flex gap-2">
                <span className="text-[10px] font-medium text-gray-500 uppercase">Total Spend:</span>
                <span className="text-xs font-medium text-gray-600">{formatTotalSpend(job?.client_total_spend || 0)}</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Job Description</h3>
            <div className="bg-gray-50/50 p-4 rounded-lg text-sm border border-input max-h-56 overflow-auto whitespace-pre-line">
              {job?.description}
            </div>
          </div>

          <form onSubmit={handleCopyAndClose}>
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold text-gray-800">Your Proposal</h3>
                {["pending", "draft"].indexOf(job?.status || "") !== -1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    type="button"
                    onClick={handleGenerateProposal}
                    loading={isGenerating}
                  >
                    <Sparkles className="w-3 h-3" />
                    {isGenerating ? "Generating..." : "Generate with AI "}
                  </Button>
                )}
              </div>
              <Textarea
                className="h-56 resize-none"
                placeholder="Write your proposal here..."
                disabled={["pending", "draft"].indexOf(job?.status || "") === -1 || isGenerating}
                value={currentJob?.proposal}
                required
                onChange={(e) => setCurrentJob(prev => ({ ...prev, proposal: e.target.value }))}
                onBlur={(e) => setCurrentJob(prev => ({ ...prev, proposal: e.target.value.trim() }))}
              />
            </div>
            {(job?.status === "pending" || job?.status === "draft") && (
              <DialogFooter className="mt-3">
                <Button loading={loading.rejected} type="button" variant="outline" onClick={() => handleProposal("rejected")}>
                  Reject
                </Button>
                <Button loading={loading.accepted} type="submit">
                  Copy & Accept
                </Button>
              </DialogFooter>
            )}
          </form>
        </div>
      </DialogContent>
    </Dialog >
  );
}

export default ProposalModal;