export interface Job {
  id: string;
  title: string;
  description: string;
  budget: string;
  job_type: "Hourly" | "Fixed";
  hourly_budget_min?: number;
  hourly_budget_max?: number;
  fixed_job_budget?: number;
  skills: string[];
  proposal: string;
  status: "pending" | "accepted" | "rejected" | "draft";
  assigned_to_id?: string;
  person_name?: string;
  assigned_to_name?: string;
  client_location?: string;
  job_created_at?: string;
  job_score?: number;
  created_at: string;
  client_company: string;
  client_past_hires: number;
  client_total_spend: number;
  job_url: string;
  jobid: string;
}

export interface BDEUser {
  id: string;
  name: string;
  email: string;
  skills: string[];
}
