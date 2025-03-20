// File: src/components/EditProfileModal/EditProfilesComponents/AvatarSection.jsx
import React from 'react';
import { Upload, Trash, User } from 'lucide-react';
import PropTypes from 'prop-types';

const AvatarSection = ({ 
  picturePreview,
  avatarLoaded,
  handleFileUpload,
  handleAvatarDelete,
  setAvatarLoaded
}) => {
  return (
    <div className="avatar-section">
      <div className="avatar-container">
        {avatarLoaded && picturePreview ? (
          <img 
            src={picturePreview} 
            alt="Profile" 
            className="avatar-image"
            onError={() => setAvatarLoaded(false)}
          />
        ) : (
          <User size={40} className="text-gray-400" />
        )}
      </div>
      <div className="flex space-x-3 mt-3">
        <label className="flex items-center justify-center gap-2 bg-white !border !border-blue-600 group py-1.5 px-3 rounded-md transition-all duration-200 hover:!bg-blue-600 [outline:none!important] cursor-pointer">
          <Upload size={14} className="text-black group-hover:text-white transition-all duration-200" /> 
          <span className="text-black group-hover:text-white transition-all duration-200 font-medium text-sm">Upload</span>
          <input 
            type="file" 
            className="hidden"
            accept="image/*"
            onChange={handleFileUpload}
          />
        </label>
        <button 
          type="button" 
          className="flex items-center justify-center gap-2 bg-white !border !border-blue-600 group py-1.5 px-3 rounded-md transition-all duration-200 hover:!bg-blue-600 [outline:none!important] disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleAvatarDelete}
          disabled={!avatarLoaded && !picturePreview}
        >
          <Trash size={14} className="text-black group-hover:text-white transition-all duration-200" /> 
          <span className="text-black group-hover:text-white transition-all duration-200 font-medium text-sm">Delete</span>
        </button>
      </div>
    </div>
  );
};

// Định nghĩa PropTypes để tránh lỗi validation
AvatarSection.propTypes = {
  picturePreview: PropTypes.string,
  avatarLoaded: PropTypes.bool.isRequired,
  handleFileUpload: PropTypes.func.isRequired,
  handleAvatarDelete: PropTypes.func.isRequired,
  setAvatarLoaded: PropTypes.func.isRequired
};

export default AvatarSection;