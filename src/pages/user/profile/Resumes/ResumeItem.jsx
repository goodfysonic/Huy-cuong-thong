import React, { useState, useEffect, useRef, useCallback } from 'react';
import { File, MoreVertical, FileText, Shield, Check, Calendar, Eye } from 'lucide-react';
import { formatDate } from '@/pages/utils/dateUtils';
import ResumeService from './ResumeService';
import PropTypes from 'prop-types';
import ResumeDropdown from './ResumeDropdown';

// Constants moved outside component to prevent recreation on each render
const FILE_TYPES = {
  DOC: { extensions: ['.doc', '.docx'], color: 'text-blue-600', icon: FileText },
  PDF: { extensions: ['.pdf'], color: 'text-red-600', icon: FileText },
  DEFAULT: { extensions: [], color: 'text-gray-600', icon: File }
};

function ResumeItem({ 
  resume = {}, 
  onUpdate = () => {}, 
  onDelete = () => {}, 
  onSetActive = () => {} 
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownDirection, setDropdownDirection] = useState('top-full right-0 mt-2');
  
  const buttonRef = useRef(null);
  const containerRef = useRef(null);

  // Add null checks for all resume properties
  const isActive = resume?.default === true;
  const resumeName = resume?.resume_name || 'unknown.pdf';
  const resumeUrl = resume?.resume_url || '';
  const isDefault = resume?.is_default || false;
  const updatedAt = resume?.updated_at;
  const resumeId = resume?.id;

  // Toggle dropdown handler with improved logic
  const toggleDropdown = useCallback((e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setIsDropdownOpen(prev => !prev);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && containerRef.current && !containerRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  // Adjust dropdown position with improved logic
  useEffect(() => {
    if (!isDropdownOpen || !buttonRef.current) return;
    
    const buttonRect = buttonRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Check if dropdown would go off screen bottom with more precise calculation
    const bottomSpace = windowHeight - buttonRect.bottom;
    const estimatedMenuHeight = 220; // Adjusted height based on menu content
    
    setDropdownDirection(bottomSpace < estimatedMenuHeight 
      ? 'bottom-full right-0 mb-2' 
      : 'top-full right-0 mt-2');
  }, [isDropdownOpen]);

  // Improved file icon function with caching
  const getFileIcon = useCallback((fileName) => {
    if (!fileName) return <File size={16} className={FILE_TYPES.DEFAULT.color} />;
    
    const lastDotIndex = fileName.lastIndexOf('.');
    if (lastDotIndex === -1) return <File size={16} className={FILE_TYPES.DEFAULT.color} />;
    
    const extension = fileName.substring(lastDotIndex).toLowerCase();
    
    for (const [type, { extensions, icon, color }] of Object.entries(FILE_TYPES)) {
      if (type !== 'DEFAULT' && extensions.includes(extension)) {
        const Icon = icon;
        return <Icon size={16} className={color} />;
      }
    }
    
    // Default case
    const DefaultIcon = FILE_TYPES.DEFAULT.icon;
    return <DefaultIcon size={16} className={FILE_TYPES.DEFAULT.color} />;
  }, []);

  // Handle resume actions with improved error handling
  const handleResumeAction = async (actionId, id, url, isCurrentDefault) => {
    if (isLoading) return; // Prevent multiple actions
    
    setIsLoading(true);
    
    try {
      switch (actionId) {
        case 'view':
          if (url) {
            window.open(url, '_blank');
          } else {
            // Hiển thị modal lỗi thay vì alert
            const errorMsg = 'Resume URL is not available';
            // Giả sử rằng showErrorModal là một hàm toàn cục hoặc được import
            if (typeof window.showErrorModal === 'function') {
              window.showErrorModal(errorMsg);
            } else if (typeof showErrorModal === 'function') {
              showErrorModal(errorMsg);
            } else {
              alert(errorMsg);
            }
            throw new Error(errorMsg);
          }
          break;
          
        case 'activate':
          if (!id) {
            const errorMsg = 'Resume ID is required';
            if (typeof window.showErrorModal === 'function') {
              window.showErrorModal(errorMsg);
            } else if (typeof showErrorModal === 'function') {
              showErrorModal(errorMsg);
            } else {
              alert(errorMsg);
            }
            throw new Error(errorMsg);
          }
          
          // Toggle active state (set active or inactive)
          const newActiveState = !isActive;
          const activatedResume = await ResumeService.toggleActiveResume(id, newActiveState);
          
          if (newActiveState) {
            // If setting to active, notify parent
            onSetActive?.(activatedResume);
          } else {
            // If setting to inactive, just update
            onUpdate?.(activatedResume);
          }
          break;
          
        case 'toggle_default':
          if (!id) {
            const errorMsg = 'Resume ID is required';
            if (typeof window.showErrorModal === 'function') {
              window.showErrorModal(errorMsg);
            } else if (typeof showErrorModal === 'function') {
              showErrorModal(errorMsg);
            } else {
              alert(errorMsg);
            }
            throw new Error(errorMsg);
          }
          
          // Toggle default (visibility in search)
          const newDefaultState = !isDefault;
          const updatedResume = await ResumeService.toggleDefaultResume(id, newDefaultState);
          onUpdate?.(updatedResume);
          break;
          
        case 'delete':
          if (!id) {
            const errorMsg = 'Resume ID is required';
            if (typeof window.showErrorModal === 'function') {
              window.showErrorModal(errorMsg);
            } else if (typeof showErrorModal === 'function') {
              showErrorModal(errorMsg);
            } else {
              alert(errorMsg);
            }
            throw new Error(errorMsg);
          }
          
          // Cải thiện hộp thoại xác nhận
          const confirmDialog = document.createElement('div');
          confirmDialog.className = 'fixed inset-0 flex items-center justify-center z-[10000] bg-black bg-opacity-50';
          
          confirmDialog.innerHTML = `
            <div class="bg-white rounded-lg shadow-lg p-6 max-w-md">
              <h3 class="text-lg font-medium text-gray-800 mb-2">Confirm Delete</h3>
              <p class="text-gray-700 mb-4">Are you sure you want to delete "${resumeName}"? This action cannot be undone.</p>
              <div class="flex justify-end space-x-3">
                <button id="cancel-delete" class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">Cancel</button>
                <button id="confirm-delete" class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Delete</button>
              </div>
            </div>
          `;
          
          document.body.appendChild(confirmDialog);
          
          // Xử lý xác nhận
          return new Promise((resolve) => {
            document.getElementById('cancel-delete').addEventListener('click', () => {
              document.body.removeChild(confirmDialog);
              setIsLoading(false);
              resolve();
            });
            
            document.getElementById('confirm-delete').addEventListener('click', async () => {
              document.body.removeChild(confirmDialog);
              try {
                await ResumeService.deleteResume(id);
                onDelete?.(id);
              } catch (error) {
                console.error(`Error deleting resume:`, error);
                // Hiển thị lỗi trong modal
                const errorMsg = `Cannot delete: ${error.message}`;
                if (typeof window.showErrorModal === 'function') {
                  window.showErrorModal(errorMsg);
                } else if (typeof showErrorModal === 'function') {
                  showErrorModal(errorMsg);
                } else {
                  alert(errorMsg);
                }
              } finally {
                setIsLoading(false);
              }
              resolve();
            });
          });
          
        default:
          console.warn(`Unknown action: ${actionId}`);
      }
    } catch (error) {
      console.error(`Error performing action ${actionId}:`, error);
      // Hiển thị lỗi trong modal
      const errorMsg = `Cannot perform this action. Error: ${error.message}`;
      if (typeof window.showErrorModal === 'function') {
        window.showErrorModal(errorMsg);
      } else if (typeof showErrorModal === 'function') {
        showErrorModal(errorMsg);
      } else {
        alert(errorMsg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`relative flex items-center justify-between py-3 px-4 ${
        isHovered ? 'bg-blue-50' : 'hover:bg-gray-50'
      } transition-colors duration-200 ${isLoading ? 'opacity-70 pointer-events-none' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{position: 'relative'}} // Đảm bảo context stacking
    >
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shadow-sm">
          {getFileIcon(resumeName)}
        </div>
        <div>
          <div className="flex items-center">
            <p className="text-base font-medium text-gray-800 group-hover:text-black truncate max-w-xs">
              {resumeName}
            </p>
            {isActive && (
              <span className="ml-2 flex items-center text-xs bg-green-100 py-0.5 px-2 rounded-full text-green-700">
                <Check size={10} className="mr-1" />
                <span className="text-xs font-medium">Active</span>
              </span>
            )}
            {isDefault && !isActive && (
              <span className="ml-2 flex items-center text-xs bg-blue-100 py-0.5 px-2 rounded-full text-blue-700">
                <Eye size={10} className="mr-1" />
                <span className="text-xs font-medium">Searchable</span>
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 flex items-center mt-0.5">
            <Calendar size={12} className="mr-1" />
            Last update: {updatedAt ? formatDate(updatedAt) : 'N/A'}
          </p>
        </div>
      </div>
      
      <div className="resume-item-actions" style={{position: 'relative', zIndex: 50}}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 rounded-full">
            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <button 
          ref={buttonRef}
          className={`p-2 rounded-full transition-colors duration-200 ${
            isDropdownOpen 
              ? 'bg-blue-100 text-blue-800 shadow-md' 
              : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-800 hover:shadow'
          } border border-gray-300 shadow`}
          onClick={toggleDropdown}
          aria-label="More options"
          disabled={isLoading}
          type="button"
        >
          <MoreVertical size={16} />
        </button>
        
        {isDropdownOpen && (
  <div style={{position: 'absolute', right: 0, top: '100%', zIndex: 9999}}>
    <ResumeDropdown 
      isOpen={isDropdownOpen}
      direction="top-0 right-0" // Thay đổi này để dropdown hiển thị đúng vị trí
      resumeId={resumeId}
      resumeUrl={resumeUrl}
      isActive={isActive}
      isDefault={isDefault}
      onAction={handleResumeAction}
      onClose={() => setIsDropdownOpen(false)}
    />
  </div>
)}
      </div>
    </div>
  );
}

// Vẫn giữ PropTypes để kiểm tra type
ResumeItem.propTypes = {
  resume: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    resume_name: PropTypes.string,
    resume_url: PropTypes.string,
    is_default: PropTypes.bool,
    default: PropTypes.bool,
    updated_at: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
  }),
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
  onSetActive: PropTypes.func
};

export default ResumeItem;