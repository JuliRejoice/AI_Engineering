import React from 'react';
import { Link } from 'react-router-dom';
import { GitBranch, FileCode, BarChart2 } from 'lucide-react';
import Card from '../UI/Card';
import ScoreCircle from '../UI/ScoreCircle';
import Badge from '../UI/Badge';
import { Repository } from '../../types';
import { getScoreBadgeColor } from '../../utils/dataTransformers';

interface RepositoryCardProps {
  repository: Repository;
}

const RepositoryCard: React.FC<RepositoryCardProps> = ({ repository }) => {
  return (
    <Card className="transition-all duration-300 hover:shadow-md">
      <div className="flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              <a href={repository.url} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">
                {repository.name}
              </a>
            </h3>
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <GitBranch size={16} />
              <span>main</span>
            </div>
          </div>
          <ScoreCircle score={repository.avgScore} />
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Badge 
              text={`${repository.commits.length} commits`} 
              color="bg-indigo-100 text-indigo-800"
            />
            <Badge 
              text={`${repository.files.length} files`} 
              color="bg-emerald-100 text-emerald-800"
            />
          </div>
        </div>
        
        <div className="mt-auto">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Top Files:</h4>
          <div className="space-y-2">
            {repository.files.slice(0, 3).map((file) => (
              <div key={file.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2 truncate max-w-[200px]">
                  <FileCode size={16} className="text-gray-400 flex-shrink-0" />
                  <span className="truncate">{file.name}</span>
                </div>
                <Badge 
                  text={Math.round(file.avgScore)} 
                  color={getScoreBadgeColor(file.avgScore)}
                  size="sm"
                />
              </div>
            ))}
          </div>
          
          <Link 
            to={`/repository/${encodeURIComponent(repository.name)}`}
            className="mt-4 text-sm text-indigo-600 hover:text-indigo-800 transition-colors flex items-center"
          >
            <BarChart2 size={16} className="mr-1" />
            View detailed metrics
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default RepositoryCard;