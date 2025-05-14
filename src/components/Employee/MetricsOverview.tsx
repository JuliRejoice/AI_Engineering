import React from 'react';
import { 
  BarChart2, 
  FilePlus2, 
  AlertTriangle, 
  Star, 
  CheckCircle2,
  GitCommit
} from 'lucide-react';
import Card from '../UI/Card';
import ScoreCircle from '../UI/ScoreCircle';
import { Repository } from '../../types';

interface MetricsOverviewProps {
  repository: Repository;
}

const MetricsOverview: React.FC<MetricsOverviewProps> = ({ repository }) => {
  const totalLinesAdded = repository.files.reduce((total, file) => total + file.totalLinesAdded, 0);
  const totalLinesDeleted = repository.files.reduce((total, file) => total + file.totalLinesDeleted, 0);
  
  const highQualityFiles = repository.files.filter(file => file.avgScore >= 75).length;
  const mediumQualityFiles = repository.files.filter(file => file.avgScore >= 50 && file.avgScore < 75).length;
  const lowQualityFiles = repository.files.filter(file => file.avgScore < 50 && file.avgScore > 0).length;
  
  const metrics = [
    {
      label: 'Commits',
      value: repository.commits.length,
      icon: <GitCommit size={20} className="text-indigo-500" />
    },
    {
      label: 'Files Changed',
      value: repository.files.length,
      icon: <FilePlus2 size={20} className="text-emerald-500" />
    },
    {
      label: 'Lines Added',
      value: totalLinesAdded,
      icon: <BarChart2 size={20} className="text-blue-500" />
    },
    {
      label: 'Lines Deleted',
      value: totalLinesDeleted,
      icon: <BarChart2 size={20} className="text-red-500" />
    },
    {
      label: 'High Quality',
      value: highQualityFiles,
      icon: <CheckCircle2 size={20} className="text-green-500" />
    },
    {
      label: 'Needs Review',
      value: lowQualityFiles,
      icon: <AlertTriangle size={20} className="text-amber-500" />
    }
  ];
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {metrics.map((metric) => (
        <Card key={metric.label} className="flex items-center p-4">
          <div className="mr-3">
            {metric.icon}
          </div>
          <div>
            <div className="font-bold text-xl">{metric.value}</div>
            <div className="text-xs text-gray-500">{metric.label}</div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default MetricsOverview;