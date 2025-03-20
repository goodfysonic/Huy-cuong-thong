import React from 'react';
import { File, Upload } from 'lucide-react';

const EmptyResumeState = ({ onUploadClick }) => {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 shadow-sm">
        <File size={24} className="text-blue-600" />
      </div>
      <h3 className="text-base font-medium text-gray-800 mb-2">No resumes yet</h3>
      <p className="text-sm text-gray-500 mb-5">Upload your first resume to get started</p>
      <button 
        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-5 rounded-md text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200"
        onClick={onUploadClick}
      >
        <Upload size={16} className="text-white" />
        <span>Upload CV</span>
      </button>
    </div>
  );
};

export default EmptyResumeState;