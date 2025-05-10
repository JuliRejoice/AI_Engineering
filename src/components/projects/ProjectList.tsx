import { useState } from "react";
import { Project } from "@/APIs/projects";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, ExternalLink, Calendar, ArrowUpRight, FolderPlus } from "lucide-react";
import { deleteProject } from "@/APIs/projects";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { motion } from "framer-motion";

interface ProjectListProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

interface DeleteProjectDialogProps {
  projectId: string;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

function DeleteProjectDialog({ projectId, onDelete, isDeleting }: DeleteProjectDialogProps) {
  const [open, setOpen] = useState(false);
  
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8 rounded-md bg-background/80 shadow-sm hover:bg-destructive/5 focus:outline-none ring-1 ring-border/50 cursor-pointer"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="border-border/40 bg-card/95 backdrop-blur-sm shadow-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the project.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-border/40 rounded-md shadow-sm">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              onDelete(projectId);
              setOpen(false);
            }}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-md shadow-sm"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function ProjectList({ projects, onEdit, onDelete }: ProjectListProps) {
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      setIsDeleting(id);
      await deleteProject(id);
      onDelete(id);
    } catch (error) {
      console.error("Failed to delete project:", error);
    } finally {
      setIsDeleting(null);
    }
  };

  if (!projects.length) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center justify-center p-10 mt-8 text-center"
      >
        <div className="bg-background/70 rounded-md p-6 mb-4 border border-border/30 shadow-sm">
          <FolderPlus className="h-12 w-12 text-muted-foreground/40" />
        </div>
        <h3 className="text-xl font-medium text-foreground mb-2">No projects yet</h3>
        <p className="text-muted-foreground max-w-md mb-6">
          Create your first project to get started. Your projects will appear here.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: index * 0.05 }}
        >
          <Card className="flex flex-col h-full overflow-hidden group border-border/40 bg-card/50 backdrop-blur-sm hover:shadow-sm transition-all duration-200 hover:border-border/60 cursor-default">
            <CardHeader className="pb-2 relative">
              <div className="absolute top-2 right-2 flex gap-1 opacity-70 group-hover:opacity-100 transition-opacity duration-200">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onEdit(project)}
                  className="h-8 w-8 rounded-md bg-background/80 shadow-sm hover:bg-primary/5 focus:outline-none ring-1 ring-border/50 cursor-pointer"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                {project.id && (
                  <DeleteProjectDialog 
                    projectId={project.id} 
                    onDelete={handleDelete} 
                    isDeleting={isDeleting === project.id}
                  />
                )}
              </div>
              <CardTitle 
                className="text-xl font-bold truncate text-foreground/90 transition-colors cursor-pointer"
                onClick={() => onEdit(project)}
              >
                {project.name}
              </CardTitle>
              <CardDescription className="mt-2 overflow-hidden">
                <div className="line-clamp-3 text-sm">
                  {project.description}
                </div>
              </CardDescription>
            </CardHeader>
            
            <CardContent className="flex-grow py-3">
              <div className="flex flex-wrap gap-1.5 mb-4 mt-1 max-h-[80px] overflow-y-auto pr-1 scrollbar-thin">
                {project.tech_used.map((tech) => (
                  <Badge 
                    key={tech} 
                    variant="outline" 
                    className="px-2.5 py-0.5 text-xs font-medium rounded-md border-border/40 bg-secondary text-foreground/80 cursor-default"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
              
              <div className="relative overflow-hidden rounded-md border border-border/20 p-3 bg-secondary">
                <p className="text-xs font-medium text-muted-foreground mb-1">Project URL:</p>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary font-medium truncate block hover:underline focus:outline-none ring-offset-1 focus:ring-1 focus:ring-primary cursor-pointer"
                >
                  {project.url}
                </a>
              </div>
            </CardContent>
            
            <CardFooter className="pt-3 border-t border-border/20 flex justify-between items-center">
              <motion.a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm font-medium text-primary px-3 py-1.5 rounded-md transition-colors focus:outline-none ring-1 ring-primary/20 hover:ring-primary/40 bg-secondary cursor-pointer"
                whileTap={{ scale: 0.98 }}
              >
                <span>Visit Project</span>
                <ArrowUpRight className="h-3.5 w-3.5 ml-1.5" />
              </motion.a>
              
              {project.created_at && (
                <div className="flex items-center text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3 mr-1" />
                  {new Date(project.created_at).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </div>
              )}
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  );
} 