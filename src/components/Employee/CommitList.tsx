import React from 'react';
import { Link } from 'react-router-dom';
import { GitCommit, CheckCircle2, XCircle, FileEdit } from 'lucide-react';
import Badge from '../UI/Badge';
import { CommitWithReview } from '../../types';
import { formatDate, getScoreBadgeColor } from '../../utils/dataTransformers';

interface CommitListProps {
  commits: CommitWithReview[];
}

const CommitList: React.FC<CommitListProps> = ({ commits }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
        <h3 className="text-base font-medium text-gray-900">Recent Commits</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {commits.map(({ commit, review }) => (
          <div key={commit.id} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-3 mt-1">
                <GitCommit size={18} className="text-indigo-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <a 
                    href={commit.commit_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-gray-900 truncate hover:text-indigo-600 transition-colors"
                  >
                    {commit.commit_message}
                  </a>
                  <span className="text-xs text-gray-500">{formatDate(commit.created_at)}</span>
                </div>
                
                <div className="flex items-center space-x-2 mb-2">
                  <Link 
                    to={`/repository/${encodeURIComponent(commit.repo_name)}`}
                    className="text-xs text-gray-600 hover:text-indigo-600 transition-colors"
                  >
                    {commit.repo_name}
                  </Link>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs font-mono text-gray-500 truncate">
                    {commit.commit_sha.substring(0, 7)}
                  </span>
                </div>
                
                <div className="flex flex-wrap items-center mt-2 gap-2">
                  {review ? (
                    <>
                      <Badge 
                        text={review.final_score > 0 ? `Score: ${Math.round(review.final_score)}` : 'Analysis Failed'} 
                        color={getScoreBadgeColor(review.final_score)}
                        size="sm"
                      />
                      <Badge 
                        text={`+${review.lines_added}`} 
                        color="bg-green-100 text-green-800"
                        size="sm"
                      />
                      <Badge 
                        text={`-${review.lines_deleted}`} 
                        color="bg-red-100 text-red-800"
                        size="sm"
                      />
                      <div className="flex items-center text-xs text-gray-500">
                        <FileEdit size={14} className="mr-1" />
                        {review.file_name}
                      </div>
                    </>
                  ) : (
                    <Badge 
                      text="No Review" 
                      color="bg-gray-100 text-gray-800"
                      size="sm"
                    />
                  )}
                </div>
              </div>
              
              <div className="ml-2 flex-shrink-0">
                {review?.final_score ? (
                  review.final_score > 50 ? (
                    <CheckCircle2 size={20} className="text-green-500" />
                  ) : (
                    <XCircle size={20} className="text-red-500" />
                  )
                ) : (
                  <XCircle size={20} className="text-gray-300" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommitList;