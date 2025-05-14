import React from 'react';
import { File } from '../../types';
import { groupScoreCategories } from '../../utils/dataTransformers';
import ProgressBar from '../UI/ProgressBar';

interface FileQualityChartProps {
  file: File;
}

const FileQualityChart: React.FC<FileQualityChartProps> = ({ file }) => {
  const categories = groupScoreCategories(file);
  
  return (
    <div className="space-y-3 w-full">
      {categories.map(category => (
        <div key={category.name} className="grid grid-cols-12 gap-4 items-center">
          <div className="col-span-4 text-sm text-gray-600">{category.name}</div>
          <div className="col-span-8">
            <ProgressBar 
              value={category.value} 
              color={category.color} 
              size="sm"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FileQualityChart;