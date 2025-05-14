import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, GitCommit, FileCode } from 'lucide-react';
import Header from '../components/Employee/Header';
// import Card from '../components/UI/Card';
// import Badge from '../components/ui/Badge';
import FileQualityChart from '../components/Employee/FileQualityChart';
import { getCommitsWithReviews, formatDate, getScoreBadgeColor } from '../lib/utils';
import Badge from '@/components/UI/Badge';
import { Card } from '@/components/ui/card';


const CommitDetail: React.FC = () => {
  const { commitId } = useParams<{ commitId: string }>();
  const id = commitId ? parseInt(commitId, 10) : 0;
  const userData={
    
  }
  const commitsWithReviews = getCommitsWithReviews(userData);
  const commitWithReview = commitsWithReviews.find(({ commit }) => commit.id === id);
  
  if (!commitWithReview) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header userData={userData} />
        <main className="py-12 px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Commit not found</h2>
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
  
  const { commit, review } = commitWithReview;
  
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
          
          <div>
            <div className="flex items-start space-x-3 mb-2">
              <GitCommit size={24} className="text-indigo-500 flex-shrink-0 mt-1" />
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                  <a 
                    href={commit.commit_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-indigo-600 transition-colors"
                  >
                    {commit.commit_message}
                  </a>
                </h1>
                <div className="flex items-center flex-wrap gap-2">
                  <Badge
                    text={formatDate(commit.created_at)}
                    color="bg-gray-100 text-gray-800"
                  />
                  <Link 
                    to={`/repository/${encodeURIComponent(commit.repo_name)}`}
                    className="text-sm text-indigo-600 hover:text-indigo-800"
                  >
                    {commit.repo_name}
                  </Link>
                  <span className="text-sm font-mono text-gray-500">
                    {commit.commit_sha.substring(0, 7)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Code Review Summary</h2>
              
              {review ? (
                <div>
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="flex items-center space-x-2 text-gray-700">
                      <FileCode size={18} />
                      <span className="text-sm font-medium">{review.file_name}</span>
                    </div>
                    <Badge 
                      text={`+${review.lines_added}`} 
                      color="bg-green-100 text-green-800"
                    />
                    <Badge 
                      text={`-${review.lines_deleted}`} 
                      color="bg-red-100 text-red-800"
                    />
                    <Badge 
                      text={`Score: ${Math.round(review.final_score)}`} 
                      color={getScoreBadgeColor(review.final_score)}
                    />
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Quality Metrics</h3>
                    <FileQualityChart file={review} />
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Review Analysis</h3>
                    <p className="text-sm text-gray-600">{review.remarks}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No code review available for this commit.</p>
                </div>
              )}
            </Card>
          </div>
          
          <div>
            <Card>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Commit Details</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm text-gray-500">Repository</h3>
                  <p className="font-medium">
                    <Link 
                      to={`/repository/${encodeURIComponent(commit.repo_name)}`}
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      {commit.repo_name}
                    </Link>
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm text-gray-500">Branch</h3>
                  <p className="font-medium">{commit.branch}</p>
                </div>
                
                <div>
                  <h3 className="text-sm text-gray-500">SHA</h3>
                  <p className="font-mono text-sm">{commit.commit_sha}</p>
                </div>
                
                <div>
                  <h3 className="text-sm text-gray-500">Date</h3>
                  <p className="font-medium">{new Date(commit.created_at).toLocaleString()}</p>
                </div>
                
                <div>
                  <h3 className="text-sm text-gray-500">Score</h3>
                  <p className="font-medium">
                    {commit.avg_score > 0 ? `${Math.round(commit.avg_score)}/100` : 'No score available'}
                  </p>
                </div>
              </div>
              
              <div className="mt-6">
                <a
                  href={commit.commit_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  View on GitHub
                </a>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CommitDetail;