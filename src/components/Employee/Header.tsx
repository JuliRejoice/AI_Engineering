import React from 'react';
import { Github, GitCommit } from 'lucide-react';
import { UserData } from '../../types';

interface HeaderProps {
  userData: UserData;
}

const Header: React.FC<HeaderProps> = ({ userData }) => {
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-4 sm:px-6 lg:px-8 sticky top-0 z-10">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center h-10 w-10 rounded-md bg-indigo-600 text-white">
            <GitCommit size={20} />
          </div>
          <h1 className="text-xl font-semibold text-gray-900">GitHub Metrics Dashboard</h1>
        </div>
        
        <div className="flex items-center space-x-3">
          <a 
            href={userData.github_profile_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-sm text-gray-700 hover:text-indigo-600 transition-colors"
          >
            <Github size={18} />
            <span>{userData.github_username}</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;