import { supabase } from "@/lib/supabase";

export type Project = {
  id?: string;
  name: string;
  url: string;
  description: string;
  tech_used: string[];
  user_id?: string;
  created_at?: string;
};

export async function getProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }

  return data as Project[];
}

export async function getProject(id: string) {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching project with id ${id}:`, error);
    throw error;
  }

  return data as Project;
}

export async function createProject(project: Omit<Project, "id" | "created_at" | "user_id">) {
  const { data, error } = await supabase
    .from("projects")
    .insert(project)
    .select();

  if (error) {
    console.error("Error creating project:", error);
    throw error;
  }

  return data[0] as Project;
}

export async function updateProject(id: string, project: Partial<Omit<Project, "id" | "created_at" | "user_id">>) {
  const { data, error } = await supabase
    .from("projects")
    .update(project)
    .eq("id", id)
    .select();

  if (error) {
    console.error(`Error updating project with id ${id}:`, error);
    throw error;
  }

  return data[0] as Project;
}

export async function deleteProject(id: string) {
  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(`Error deleting project with id ${id}:`, error);
    throw error;
  }

  return true;
} 