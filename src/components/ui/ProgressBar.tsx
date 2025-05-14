import React from 'react';

interface ProgressBarProps {
  value: number | null;
  color?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  value, 
  color = 'bg-blue-500',
  size = 'md',
  showLabel = true
}) => {
  const validValue = value ?? 0;
  const displayValue = Math.max(0, Math.min(100, validValue));
  
  const heightClasses = {
    xs: 'h-1',
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3'
  };
  
  return (
    <div className="w-full">
      <div className="w-full bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`${color} ${heightClasses[size]} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${displayValue}%` }}
        ></div>
      </div>
      {showLabel && (
        <div className="mt-1 text-xs text-gray-500 font-medium">
          {displayValue > 0 ? `${Math.round(displayValue)}%` : 'N/A'}
        </div>
      )}
    </div>
  );
};

export default ProgressBar;