import { supabase } from "./supabase";
import { Project } from "@/APIs/projects";

export async function createInitialUser() {
  try {
    // Try to sign in first
    const { data: signInData, error: signInError } =
      await supabase.auth.signInWithPassword({
        email: "test@example.com",
        password: "test123456",
      });

    // If sign in succeeds, ensure profile exists
    if (!signInError && signInData?.user) {
      await ensureUserProfile(signInData.user.id);
      await seedProjects(signInData.user.id);
      return signInData;
    }

    // If sign in fails, try to sign up
    // const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
    //   {
    //     email: "test@example.com",
    //     password: "test123456",
    //   },
    // );

    // if (signUpError) throw signUpError;
    // if (!signUpData?.user) throw new Error("No user data after signup");

    // // Create profile for new user
    // await ensureUserProfile(signUpData.user.id);
    // return signUpData;
  } catch (error) {
    console.error("Error in createInitialUser:", error);
    throw error;
  }
}

async function ensureUserProfile(userId: string) {
  // Check if profile exists
  const { data: existingProfile } = await supabase
    .from("bde_profiles")
    .select("*")
    .eq("id", userId)
    .single();

  // Create profile if it doesn't exist
  if (!existingProfile) {
    const { error: profileError } = await supabase.from("bde_profiles").insert({
      id: userId,
      name: "Test User",
      email: "test@example.com",
      skills: ["React", "TypeScript", "Node.js", "React Native"],
    });

    if (profileError) {
      console.error("Error creating profile:", profileError);
      throw profileError;
    }
  }
}

export async function seedProjects(userId: string) {
  // Check if projects table exists and has any projects for this user
  const { data: existingProjects, error } = await supabase
    .from("projects")
    .select("id")
    .eq("user_id", userId);

  if (error) {
    console.error("Error checking for existing projects:", error);
    // If the table doesn't exist, we'll create it through the first insert
    if (error.code !== "42P01") { // 42P01 is PostgreSQL's code for "relation does not exist"
      throw error;
    }
  }

  // Only seed if no projects exist for this user
  if (!existingProjects || existingProjects.length === 0) {
    const sampleProjects: Omit<Project, "id" | "created_at">[] = [
      {
        name: "LightningChecks",
        url: "https://gateway.lightningchecks.com/auth/sign-in",
        description: "A secure online gateway for processing digital payments and managing check transactions. It provides multi-layered authentication for user data protection.",
        tech_used: ["Python", "Django", "Stripe API", "PostgreSQL", "OAuth", "AWS"],
        user_id: userId
      },
      {
        name: "BrainWave Analytics",
        url: "https://brainwave-analytics.vercel.app",
        description: "A data visualization dashboard that transforms complex datasets into intuitive graphs and interactive reports for business intelligence.",
        tech_used: ["React", "D3.js", "Node.js", "MongoDB", "Express", "Vercel"],
        user_id: userId
      },
      {
        name: "EcoTrack",
        url: "https://ecotrack.io",
        description: "A mobile application for tracking and reducing carbon footprint. Users can log daily activities and receive personalized recommendations.",
        tech_used: ["React Native", "Firebase", "Redux", "Google Maps API", "Jest"],
        user_id: userId
      }
    ];

    // Insert sample projects
    const { error: insertError } = await supabase
      .from("projects")
      .insert(sampleProjects);

    if (insertError) {
      console.error("Error seeding projects:", insertError);
      throw insertError;
    }

    console.log("Successfully seeded projects");
  }
}
