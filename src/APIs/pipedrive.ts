import { supabase } from "@/lib/supabase";
import { toast } from "@/components/ui/use-toast";

interface PersonData {
  name: string;
  "fca84596be5765573b3a4b31dba1dd4ea2784d6a": string;
}

export async function createPersonLead(personData: PersonData): Promise<PersonData> {
  try {
    const { data, error } = await supabase.functions.invoke('create-lead', {
      body: JSON.stringify(personData)
    })

    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Failed to create lead",
      duration: 5000,
    });
    throw error;
  }
}