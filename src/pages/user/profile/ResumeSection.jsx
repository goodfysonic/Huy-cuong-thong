import React, { useState, useEffect, useCallback } from "react";
import { Upload, Lock, FileText, AlertTriangle } from "lucide-react";
import ResumeItem from "./Resumes/ResumeItem";
import EmptyResumeState from "./Resumes/EmptyResumeState";
import ResumeService from "./Resumes/ResumeService";
import { isValidFileSize, isValidFileType } from "@/pages/utils/dateUtils";
import { toast } from "react-toastify";

const ResumeSection = ({ className = "" }) => {
  const [resumes, setResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch resumes when component mounts
  useEffect(() => {
    fetchResumes();
  }, []);

  // Fetch resumes from API
  const fetchResumes = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await ResumeService.getAllResumes();
      setResumes(data || []);
    } catch (error) {
      console.error("Failed to fetch resumes:", error);
      setError("Unable to load CV list. Please try again later.");
      // Fallback to empty array
      setResumes([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle resume upload with improved error handling
  const handleUploadClick = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".doc,.docx,.pdf";

    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      // Validate file type and size with more detailed errors
      if (!isValidFileType(file.name)) {
        toast.error(
          <div className="flex items-start">
            <AlertTriangle className="text-red-500 mr-2 flex-shrink-0 mt-0.5" size={16} />
            <div>
              <p className="font-medium">Invalid file format</p>
              <p className="text-sm">Only .doc, .docx and .pdf formats are supported</p>
            </div>
          </div>
        );
        return;
      }

      if (!isValidFileSize(file.size)) {
        toast.error(
          <div className="flex items-start">
            <AlertTriangle className="text-red-500 mr-2 flex-shrink-0 mt-0.5" size={16} />
            <div>
              <p className="font-medium">File too large</p>
              <p className="text-sm">Maximum file size is 3MB</p>
            </div>
          </div>
        );
        return;
      }

      // Upload file with progress indication
      setIsUploading(true);
      const toastId = toast.loading(
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
          <span>Uploading your CV...</span>
        </div>
      );
      
      try {
        const formData = new FormData();
        formData.append('file', file);
        // Thêm tên file để backend hiểu
        formData.append('filename', file.name);
        
        const uploadedResume = await ResumeService.uploadResume(file);
        
        // Kiểm tra và đảm bảo tên file được hiển thị đúng
        if (uploadedResume && !uploadedResume.resume_name && file.name) {
          uploadedResume.resume_name = file.name;
        }
        // Update state with functional update for reliability
        setResumes((prev) => [uploadedResume, ...prev]);
        
        toast.update(toastId, {
          render: (
            <div className="flex items-center">
              <FileText className="text-green-500 mr-2" size={16} />
              <span>CV uploaded successfully</span>
            </div>
          ),
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      } catch (error) {
        console.error("Failed to upload resume:", error);
        toast.update(toastId, {
          render: (
            <div className="flex items-start">
              <AlertTriangle className="text-red-500 mr-2 flex-shrink-0 mt-0.5" size={16} />
              <div>
                <p className="font-medium">Upload failed</p>
                <p className="text-sm">{error.message || "Please try again later"}</p>
              </div>
            </div>
          ),
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
      } finally {
        setIsUploading(false);
      }
    };

    input.click();
  }, []);

  // Handle resume update with improved feedback
  const handleResumeUpdate = useCallback((updatedResume) => {
    setResumes((prev) =>
      prev.map((resume) =>
        resume.id === updatedResume.id ? updatedResume : resume
      )
    );
    
    toast.success(
      <div className="flex items-center">
        <FileText className="text-green-500 mr-2" size={16} />
        <span>CV has been updated successfully</span>
      </div>
    );
  }, []);

  // Handle resume delete with improved feedback
  const handleResumeDelete = useCallback((resumeId) => {
    setResumes((prev) => prev.filter((resume) => resume.id !== resumeId));
    
    toast.success(
      <div className="flex items-center">
        <FileText className="text-green-500 mr-2" size={16} />
        <span>CV was deleted successfully</span>
      </div>
    );
  }, []);

  // Handle setting active resume
  const handleSetActiveResume = useCallback((activeResume) => {
    // Update all resumes to ensure only one is active
    setResumes((prev) =>
      prev.map((resume) => ({
        ...resume,
        default: resume.id === activeResume.id ? true : false,
      }))
    );
    
    toast.success(
      <div className="flex items-center">
        <FileText className="text-green-500 mr-2" size={16} />
        <span>Active CV updated successfully</span>
      </div>
    );
  }, []);

  // Handle refresh button
  const handleRefresh = useCallback(() => {
    fetchResumes();
    toast.info("Refreshing CV list...");
  }, []);

  return (
    <div
      className={`border border-gray-200 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300 ${className}`}
    >
      <div className="p-5">
        <div className="flex items-center justify-between mb-5 pb-2 border-b border-gray-100">
          <div>
            <h2 className="text-sm font-semibold text-gray-800">
              Uploaded Resumes
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              This is the place where you can upload your Resumes
            </p>
          </div>
          <div className="flex gap-2">
            {/* Refresh button */}
            <button
              className="flex items-center justify-center bg-white !border !border-blue-600 group p-2 rounded-md text-base font-medium shadow-sm hover:shadow transition-all duration-200 [outline:none!important] hover:!bg-blue-600 disabled:opacity-70 disabled:cursor-not-allowed"
              onClick={handleRefresh}
              disabled={isLoading || isUploading}
              aria-label="Refresh"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black-600 group-hover:text-white transition-all duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 2v6h-6"></path>
                <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
                <path d="M3 22v-6h6"></path>
                <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
              </svg>
            </button>
            
            {/* Upload button */}
            <button
              className="flex items-center justify-center gap-2 bg-white !border !border-blue-600 group py-2 px-4 rounded-md text-base font-medium shadow-sm hover:shadow transition-all duration-200 [outline:none!important] hover:!bg-blue-600 disabled:opacity-70 disabled:cursor-not-allowed"
              onClick={handleUploadClick}
              disabled={isUploading}
            >
              <Upload 
                size={16} 
                className="text-black-600 group-hover:text-white transition-all duration-200" 
              />
              <span className="text-black-600 group-hover:text-white transition-all duration-200">
                {isUploading ? "UPLOADING..." : "UPLOAD CV"}
              </span>
            </button>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="flex flex-col justify-center items-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-sm text-gray-500">Loading your resumes...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-8 px-4 text-center bg-red-50">
              <AlertTriangle size={32} className="text-red-500 mb-3" />
              <h3 className="text-base font-medium text-red-800 mb-1">Unable to load resumes</h3>
              <p className="text-sm text-red-600 mb-4">{error}</p>
              <button 
                className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md text-sm font-medium shadow-sm hover:shadow transition-all duration-200"
                onClick={fetchResumes}
              >
                <span>Try Again</span>
              </button>
            </div>
          ) : resumes.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {resumes.map((resume, index) => (
                <ResumeItem
                  key={`resume-${resume.id || index}`}
                  resume={resume}
                  onUpdate={handleResumeUpdate}
                  onDelete={handleResumeDelete}
                  onSetActive={handleSetActiveResume}
                />
              ))}
            </div>
          ) : (
            <EmptyResumeState onUploadClick={handleUploadClick} />
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-500 flex items-center">
            <Lock size={14} className="mr-2 text-black-600" />
            Supports: .doc, .docx or .pdf formats, under 3MB and without
            password protection
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResumeSection;