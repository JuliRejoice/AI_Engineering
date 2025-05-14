import React from 'react';
import { FileText, Plus, Minus } from 'lucide-react';
import Badge from '../UI/Badge';
import ScoreCircle from '../UI/ScoreCircle';
import FileQualityChart from './FileQualityChart';
import { FileWithCommits } from '../../types';
import { formatDate } from '../../utils/dataTransformers';

interface FileChangesTableProps {
  files: FileWithCommits[];
}

const FileChangesTable: React.FC<FileChangesTableProps> = ({ files }) => {
  const [expandedFile, setExpandedFile] = React.useState<string | null>(null);
  
  const toggleFileExpand = (fileName: string) => {
    setExpandedFile(expandedFile === fileName ? null : fileName);
  };
  
  return (
    <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
        <h3 className="text-base font-medium text-gray-900">File Changes</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commits</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Changes</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {files.map((file) => (
              <React.Fragment key={file.name}>
                <tr 
                  className={`hover:bg-gray-50 cursor-pointer ${expandedFile === file.name ? 'bg-gray-50' : ''}`}
                  onClick={() => toggleFileExpand(file.name)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FileText size={18} className="text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-900">{file.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-500">{file.commits.length}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className="flex items-center text-sm text-green-600">
                        <Plus size={16} />
                        {file.totalLinesAdded}
                      </span>
                      <span className="flex items-center text-sm text-red-600">
                        <Minus size={16} />
                        {file.totalLinesDeleted}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <ScoreCircle score={file.avgScore} size="sm" />
                  </td>
                </tr>
                
                {expandedFile === file.name && (
                  <tr className="bg-gray-50">
                    <td colSpan={4} className="px-6 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-sm text-gray-700 mb-2">Quality Metrics</h4>
                          {file.files.length > 0 && (
                            <FileQualityChart file={file.files[0]} />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium text-sm text-gray-700 mb-2">Recent Changes</h4>
                          <div className="space-y-2">
                            {file.commits.slice(0, 3).map((commit) => (
                              <div key={commit.id} className="text-sm">
                                <a 
                                  href={commit.commit_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="font-medium text-indigo-600 hover:text-indigo-800 truncate block"
                                >
                                  {commit.commit_message}
                                </a>
                                <div className="flex items-center mt-1">
                                  <Badge
                                    text={formatDate(commit.created_at)}
                                    color="bg-gray-100 text-gray-600"
                                    size="sm"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FileChangesTable;