import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, GitCommit, BarChart2 } from 'lucide-react';
import Header from '../components/Employee/Header';
// import Card from '../components/ui/card';
import ScoreCircle from '../components/ui/ScoreCircle';
import MetricsOverview from '../components/Employee/MetricsOverview';
import FileChangesTable from '../components/Employee/FileChangesTable';
import CommitList from '../components/Employee/CommitList';
import { organizeDataByRepository, getCommitsWithReviews } from '../lib/utils';


const RepositoryDetail: React.FC = () => {
  const { repoName } = useParams<{ repoName: string }>();
  const decodedRepoName = repoName ? decodeURIComponent(repoName) : '';
  const userData={github_username: "johndoe",
    github_profile_url: "https://github.com/johndoe",
  commits: [
  {
    id: 1,
    user_id: 101,
    repo_name: "awesome-repo",
    repo_url: "https://github.com/johndoe/awesome-repo",
    commit_message: "Refactor login logic",
    commit_url: "https://github.com/johndoe/awesome-repo/commit/abc123",
    commit_sha: "abc123",
    branch: "main",
    created_at: "2024-05-01T10:00:00Z",
    avg_score: 75,
    lines_added: 30,
    lines_deleted: 5,
    remarks: "Improved readability",
    code_review_id: 5001
  },
  {
    id: 2,
    user_id: 101,
    repo_name: "awesome-repo",
    repo_url: "https://github.com/johndoe/awesome-repo",
    commit_message: "Fix bug in auth flow",
    commit_url: "https://github.com/johndoe/awesome-repo/commit/def456",
    commit_sha: "def456",
    branch: "main",
    created_at: "2024-05-02T12:30:00Z",
    avg_score: 68,
    lines_added: 12,
    lines_deleted: 3,
    remarks: "Bugfix patch",
    code_review_id: 5002
  }
]

,
    files: [
      {
        file_name: "auth.ts",
        lines_added: 30,
        lines_deleted: 5,
        code_review_id: 1,
        review: {
          metrics: {
            final_score: 75
          }
        }
      },
      {
        file_name: "auth.ts",
        lines_added: 12,
        lines_deleted: 3,
        code_review_id: 2,
        review: {
          metrics: {
            final_score: 68
          }
        }
      }
    ],
    final_summary: {
      avg_score: 72,
      paragraph: "The user's code quality appears stable and maintainable."
    }}
  const repositories = organizeDataByRepository(userData);
  const repository = repositories.find(repo => repo.name === decodedRepoName);
  
  const commitsWithReviews = getCommitsWithReviews(userData)
    .filter(({ commit }) => commit.repo_name === decodedRepoName);
  
  if (!repository) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header userData={userData} />
        <main className="py-12 px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Repository not found</h2>
          <Link 
            to="/"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Dashboard
          </Link>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header userData={userData} />
      
      <main className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link 
            to="/"
            className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-800 mb-4"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Dashboard
          </Link>
          
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                <a 
                  href={repository.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-indigo-600 transition-colors flex items-center"
                >
                  <GitCommit size={24} className="mr-2 text-indigo-500" />
                  {repository.name}
                </a>
              </h1>
              <p className="text-gray-500">
                {repository.commits.length} commits across {repository.files.length} files
              </p>
            </div>
            
            <div className="flex items-center">
              <div className="mr-4 text-right">
                <div className="text-sm text-gray-500 mb-1">Overall Score</div>
                <div className="text-2xl font-bold">
                  {repository.avgScore > 0 ? Math.round(repository.avgScore) : 'N/A'}
                </div>
              </div>
              <ScoreCircle score={repository.avgScore} size="lg" />
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <MetricsOverview repository={repository} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="lg:col-span-2">
              <FileChangesTable files={repository.files} />
            </div>
            
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Repository Commits</h2>
              </div>
              <CommitList commits={commitsWithReviews} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RepositoryDetail;