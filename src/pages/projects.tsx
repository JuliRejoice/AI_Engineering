import { useState, useEffect } from "react";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { FolderKanban, Plus, Loader2 } from "lucide-react";
import { Project } from "@/APIs/projects";
import { useToast } from "@/components/ui/use-toast";

export default function Projects() {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground">Manage your projects</p>
        </div>
        <Button >
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </div>

      <div>
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : projects.length > 0 ? (
          <h4>Projects</h4>
        ) : (
          <EmptyState
            icon={FolderKanban}
            title="No projects found"
            description="Your projects will appear here once created."
          />
        )}
      </div>
    </div>
  );
} 