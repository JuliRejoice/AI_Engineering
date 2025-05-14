import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart2, AlertCircle } from 'lucide-react';
import Header from '../components/Employee/Header';
import RepositoryCard from '../components/Employee/RepositoryCard';
import CommitList from '../components/Employee/CommitList';
import { organizeDataByRepository, getCommitsWithReviews } from '../lib/utils';


const EmployeeDashboard: React.FC = () => {
    const { state: user } = useLocation();
    const userData=user;
  const repositories = organizeDataByRepository(userData);
  const commitsWithReviews = getCommitsWithReviews(userData);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header userData={userData} />
      
      <main className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Repository Overview</h2>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Status:</span>
              <span className="flex items-center text-sm text-amber-600 bg-amber-50 px-2 py-1 rounded-md">
                <AlertCircle size={16} className="mr-1" />
                {userData.final_summary.paragraph}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repositories.map((repo) => (
              <RepositoryCard key={repo.name} repository={repo} />
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
            
            <Link 
              to="/commits"
              className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center"
            >
              <BarChart2 size={16} className="mr-1" />
              View all commits
            </Link>
          </div>
          
          <CommitList commits={commitsWithReviews.slice(0, 5)} />
        </div>
      </main>
    </div>
  );
};

export default EmployeeDashboard;