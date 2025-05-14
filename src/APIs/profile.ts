import { supabase } from "@/lib/supabase";


export async function getProfileData() {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    

  if (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
  console.log(data)
  return data;
}

export async function fileReview() {
  const { data, error } = await supabase
    .from("file_reviews")
    .select("*")
    

  if (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
  
  return data;
}

export async function codeReview() {
  const { data, error } = await supabase
    .from("code_reviews")
    .select("*")
    

  if (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }

  return data;
}
