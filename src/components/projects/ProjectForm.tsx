import { useState, useRef, KeyboardEvent, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X } from "lucide-react";
import { Project } from "@/APIs/projects";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  url: z.string().url("Must be a valid URL"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  tech_used: z.array(z.string()).min(1, "Add at least one technology")
});

type ProjectFormValues = z.infer<typeof formSchema>;

interface ProjectFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: ProjectFormValues) => void;
  initialData?: Project;
}

export function ProjectForm({ open, onClose, onSubmit, initialData }: ProjectFormProps) {
  const [techInput, setTechInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const defaultValues = {
    name: "",
    url: "",
    description: "",
    tech_used: []
  };

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  // Reset form when initialData changes
  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name,
        url: initialData.url,
        description: initialData.description,
        tech_used: initialData.tech_used || []
      });
    } else {
      form.reset(defaultValues);
    }
  }, [form, initialData]);

  const handleAddTech = () => {
    const tech = techInput.trim();
    if (!tech) return;
    
    const currentTech = form.getValues().tech_used;
    if (!currentTech.includes(tech)) {
      form.setValue("tech_used", [...currentTech, tech]);
    }
    setTechInput("");
  };

  const handleRemoveTech = (tech: string) => {
    const currentTech = form.getValues().tech_used;
    form.setValue("tech_used", currentTech.filter((t) => t !== tech));
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTech();
    } else if (e.key === "," && techInput.trim()) {
      e.preventDefault();
      handleAddTech();
    } else if (e.key === "Backspace" && !techInput) {
      const currentTech = form.getValues().tech_used;
      if (currentTech.length > 0) {
        form.setValue("tech_used", currentTech.slice(0, -1));
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[550px] p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            {initialData ? "Edit Project" : "Add New Project"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-medium">Project Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="My Awesome Project" 
                      {...field} 
                      className="h-10"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-medium">Project URL</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://myproject.com" 
                      {...field} 
                      className="h-10"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-medium">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your project..."
                      className="resize-none min-h-[120px] p-3"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tech_used"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-medium">Technologies Used</FormLabel>
                  <div className="flex flex-wrap items-center border rounded-md gap-1 px-3 py-1 focus-within:ring-1 focus-within:ring-ring focus-within:border-input bg-background">
                    {field.value.map((tech) => (
                      <Badge 
                        key={tech} 
                        variant="secondary" 
                        className="flex items-center gap-1 py-1 px-2.5 transition-colors"
                      >
                        {tech}
                        <X
                          className="h-3 w-3 cursor-pointer hover:text-destructive transition-colors"
                          onClick={() => handleRemoveTech(tech)}
                        />
                      </Badge>
                    ))}
                    <Input
                      ref={inputRef}
                      className="flex-1 min-w-[120px] border-0 p-0 focus-visible:ring-0 focus-visible:ring-transparent shadow-none"
                      placeholder={field.value.length ? "" : "Type and press comma to add tags..."}
                      value={techInput}
                      onChange={(e) => setTechInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-3 pt-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                className="h-10 px-4"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={form.formState.isSubmitting}
                className="h-10 px-4"
              >
                {form.formState.isSubmitting ? "Saving..." : "Save Project"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
} 