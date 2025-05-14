import {  Repository, Commit, File, FileWithCommits, CommitWithReview } from '../types/employee';

export function cn(...inputs: any[]) {
  return inputs
    .flat(Infinity) // flatten nested arrays
    .filter(Boolean) // remove falsy values like false, undefined, null
    .join(" "); // join class names with space
}
export function organizeDataByRepository(data: any): Repository[] {
  const repositories: Record<string, Repository> = {};

  // First, organize commits by repository
  data.commits.forEach(commit => {
    if (!repositories[commit.repo_name]) {
      repositories[commit.repo_name] = {
        name: commit.repo_name,
        url: commit.repo_url,
        commits: [],
        files: [],
        avgScore: 0
      };
    }
    repositories[commit.repo_name].commits.push(commit);
  });

  // Next, organize files by repository and file name
  Object.values(repositories).forEach(repo => {
    const fileMap: Record<string, FileWithCommits> = {};
    
    // Get relevant commits for this repository
    const repoCommitIds = repo.commits.map(commit => commit.id);
    
    // Find files associated with these commits
    const repoFiles = data.files.filter(file => 
      repoCommitIds.includes(file.code_review_id)
    );

    // Group files by name
    repoFiles.forEach(file => {
      const associatedCommit = repo.commits.find(commit => commit.id === file.code_review_id);
      
      if (!associatedCommit) return;
      
      if (!fileMap[file.file_name]) {
        fileMap[file.file_name] = {
          name: file.file_name,
          commits: [],
          files: [],
          avgScore: 0,
          totalLinesAdded: 0,
          totalLinesDeleted: 0
        };
      }
      
      fileMap[file.file_name].commits.push(associatedCommit);
      fileMap[file.file_name].files.push(file);
      fileMap[file.file_name].totalLinesAdded += file.lines_added;
      fileMap[file.file_name].totalLinesDeleted += file.lines_deleted;
    });

    // Calculate average scores for each file
    Object.values(fileMap).forEach(fileWithCommits => {
      const validScores = fileWithCommits.files
        .map(file => file.final_score)
        .filter(score => score !== null && score > 0);
      
      fileWithCommits.avgScore = validScores.length > 0 
        ? validScores.reduce((sum, score) => sum + score, 0) / validScores.length 
        : 0;
    });

    repo.files = Object.values(fileMap);

    // Calculate repository average score
    const validFileScores = repo.files
      .map(file => file.avgScore)
      .filter(score => score > 0);
    
    repo.avgScore = validFileScores.length > 0
      ? validFileScores.reduce((sum, score) => sum + score, 0) / validFileScores.length
      : 0;
  });

  return Object.values(repositories);
}

export function getCommitsWithReviews(data: any): CommitWithReview[] {
  return data.commits.map(commit => {
    const review = data.files.find(file => file.code_review_id === commit.id) || null;
    return { commit, review };
  });
}

export function getScoreColor(score: number | null): string {
  if (score === null || score === 0) return 'bg-gray-300';
  if (score < 50) return 'bg-red-500';
  if (score < 70) return 'bg-amber-500';
  if (score < 80) return 'bg-blue-500';
  return 'bg-green-500';
}

export function getScoreBadgeColor(score: number | null): string {
  if (score === null || score === 0) return 'bg-gray-100 text-gray-800';
  if (score < 50) return 'bg-red-100 text-red-800';
  if (score < 70) return 'bg-amber-100 text-amber-800';
  if (score < 80) return 'bg-blue-100 text-blue-800';
  return 'bg-green-100 text-green-800';
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

export function groupScoreCategories(file: File): { name: string; value: number | null; color: string }[] {
  return [
    { name: 'Maintainability', value: file.maintainability, color: getScoreColor(file.maintainability) },
    { name: 'Code Quality', value: file.code_quality, color: getScoreColor(file.code_quality) },
    { name: 'Function Design', value: file.function_design, color: getScoreColor(file.function_design) },
    { name: 'Error Handling', value: file.error_handling, color: getScoreColor(file.error_handling) },
    { name: 'Performance', value: file.performance, color: getScoreColor(file.performance) },
  ];
}