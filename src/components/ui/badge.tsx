import React from 'react';

interface BadgeProps {
  text: string | number;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Badge: React.FC<BadgeProps> = ({ 
  text, 
  color = 'bg-gray-100 text-gray-800',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
    lg: 'text-sm px-3 py-1'
  };
  
  return (
    <span className={`${color} ${sizeClasses[size]} rounded-full font-medium inline-flex items-center justify-center whitespace-nowrap`}>
      {text}
    </span>
  );
};

export default Badge;