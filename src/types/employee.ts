// export interface UserData {
//   github_username: string;
//   github_profile_url: string;
//   commits: Commit[];
//   files: File[];
//   final_summary: FinalSummary;
// }

export interface Commit {
  id: number;
  repo_name: string;
  repo_url: string;
  commit_message: string;
  commit_url: string;
  commit_sha: string;
  branch: string;
  user_id: number;
  created_at: string;
  avg_score: number;
  remarks: string;
  code_review_id: number;
}

export interface File {
  id: number;
  remarks: string;
  file_name: string;
  lines_added: number;
  lines_deleted: number;
  cyclomatic_complexity: number | null;
  maintainability: number | null;
  loc_quality: number | null;
  function_design: number | null;
  complexity_delta: number | null;
  code_quality: number | null;
  error_handling: number | null;
  error_risk: number | null;
  performance: number | null;
  final_score: number;
  code_churn_lines_modified: number | null;
  code_churn_rate: number | null;
  code_coverage_percentage: number | null;
  technical_debt_hours: number | null;
  security_vulnerabilities: number | null;
  security_severity: number | null;
  code_duplication_percentage: number | null;
  hotspot: boolean | null;
  review_participation: number | null;
  code_review_id: number;
  created_at: string;
}

export interface FinalSummary {
  avg_score: number;
  paragraph: string;
}

export interface Repository {
  name: string;
  url: string;
  commits: Commit[];
  files: FileWithCommits[];
  avgScore: number;
}

export interface FileWithCommits {
  name: string;
  commits: Commit[];
  files: File[];
  avgScore: number;
  totalLinesAdded: number;
  totalLinesDeleted: number;
}

export interface ScoreCategory {
  name: string;
  value: number | null;
  color: string;
}

export interface CommitWithReview {
  commit: Commit;
  review: File | null;
}