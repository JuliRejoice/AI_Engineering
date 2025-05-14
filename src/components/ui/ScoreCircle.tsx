import React from 'react';

interface ScoreCircleProps {
  score: number | null;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

const ScoreCircle: React.FC<ScoreCircleProps> = ({ 
  score, 
  size = 'md',
  label
}) => {
  const validScore = score ?? 0;
  
  const getColor = (score: number): string => {
    if (score === 0) return 'text-gray-400 border-gray-200';
    if (score < 50) return 'text-red-500 border-red-200';
    if (score < 70) return 'text-amber-500 border-amber-200';
    if (score < 80) return 'text-blue-500 border-blue-200';
    return 'text-green-500 border-green-200';
  };
  
  const sizeClasses = {
    sm: 'w-10 h-10 text-sm border-2',
    md: 'w-16 h-16 text-xl border-3',
    lg: 'w-24 h-24 text-3xl border-4'
  };
  
  return (
    <div className="flex flex-col items-center">
      <div className={`${sizeClasses[size]} ${getColor(validScore)} rounded-full flex items-center justify-center font-bold border-2`}>
        {validScore > 0 ? Math.round(validScore) : '-'}
      </div>
      {label && <span className="mt-1 text-xs text-gray-500">{label}</span>}
    </div>
  );
};

export default ScoreCircle;