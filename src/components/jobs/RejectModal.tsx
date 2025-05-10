import { useState } from "react";
import { Job } from "@/types/job";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth";
import { toast } from "@/components/ui/use-toast";

interface RejectModalProps {
  isOpen: boolean;
  job?: Job;
  onClose: () => void;
}

export function RejectModal({ isOpen, job, onClose }: RejectModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { bdeProfile } = useAuth();

  const handleReject = async () => {
    if (!job) return;
    setIsSubmitting(true);
    
    try {
      const payload = {
        status: "rejected",
        assigned_to: bdeProfile?.id,
        assigned_to_name: bdeProfile?.name,
      };
      await supabase
        .from("jobs")
        .update(payload)
        .eq("id", job.id);

        toast({
          title: "Success",
          description: "Lead Rejected successfully",
          duration: 3000,
        });

      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reject Job</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>Are you sure you want to reject this job?</p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button 
              variant="default" 
              onClick={handleReject}
              loading={isSubmitting}
            >
              Reject
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 