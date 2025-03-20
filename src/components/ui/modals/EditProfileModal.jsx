// File: src/components/EditProfileModal/index.jsx
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import './EditProfileModal.css';
import AvatarSection from './EditProfilesComponents/AvatarSection';
import PersonalInfoSection from './EditProfilesComponents/PersonalInfoSection';
import AddressSection from './EditProfilesComponents/AddressSection';
import StatusMessage from './EditProfilesComponents/StatusMessage';
import { formatDateForInput } from '@/pages/utils/formatters';
import { updateUserProfile } from './EditProfilesComponents/userProfileService';

const EditProfileModal = ({ isOpen, onClose, userData = {} }) => {
  // If the modal is not open, don't render anything
  if (!isOpen) return null;

  // State for form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    birthday: '',
    gender: '',
    address: {
      address_line1: '',
      address_line2: '',
      country: '',
      city: '',
      state_or_province: '',
      postal_code: ''
    }
  });

  // UI states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Avatar states
  const [avatarLoaded, setAvatarLoaded] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [picturePreview, setPicturePreview] = useState(null);
  const [deleteAvatar, setDeleteAvatar] = useState(false);

  // Initialize form data when userData changes
  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        birthday: userData.birthday ? formatDateForInput(userData.birthday) : '',
        gender: userData.gender || '',
        address: {
          address_line1: userData.address?.address_line1 || '',
          address_line2: userData.address?.address_line2 || '',
          country: userData.address?.country || 'Vietnam',
          city: userData.address?.city || 'Ho Chi Minh',
          state_or_province: userData.address?.state_or_province || 'Thu Duc City',
          postal_code: userData.address?.postal_code || ''
        }
      });

      // Set picture preview if exists
      if (userData.picture) {
        setPicturePreview(userData.picture);
        setAvatarLoaded(true);
      }
      
      // Reset delete avatar flag on modal open
      setDeleteAvatar(false);
    }
  }, [userData]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Handle nested address fields
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle file upload for avatar
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setDeleteAvatar(false); // Reset delete flag if new file is selected
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPicturePreview(reader.result);
        setAvatarLoaded(true);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle avatar delete
  const handleAvatarDelete = () => {
    setAvatar(null);
    setPicturePreview(null);
    setAvatarLoaded(false);
    setDeleteAvatar(true); // Set flag to indicate avatar should be deleted
    console.log("Avatar delete requested, deleteAvatar flag set to: true");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await updateUserProfile(formData, avatar, deleteAvatar);
      console.log("Profile updated successfully:", response.data);
      
      setSuccess(true);
      setTimeout(() => {
        onClose(); // Close the modal after success
        window.location.reload(); // Reload the page to see updates
      }, 1500);
      
    } catch (err) {
      console.error("Error updating profile:", err);
      
      // Detailed error logging
      if (err.response) {
        console.error("Response error data:", err.response.data);
        console.error("Response error status:", err.response.status);
      } else if (err.request) {
        console.error("No response received:", err.request);
      } else {
        console.error("Request setup error:", err.message);
      }
      
      setError("Failed to update profile: " + (err.response?.data?.message || err.message || "Please try again later."));
    } finally {
      setLoading(false);
    }
  };

  // Prevent click inside modal from closing it
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-container animate-fadeIn"
        onClick={handleModalClick}
      >
        <div className="modal-header">
          <h2 className="modal-title">Personal Information</h2>
          <button 
            onClick={onClose}
            className="flex items-center justify-center bg-white !border !border-blue-600 group p-2 rounded-md transition-all duration-200 hover:!bg-blue-600 [outline:none!important]"
          >
            <X size={20} className="text-black group-hover:text-white transition-all duration-200" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <AvatarSection
            picturePreview={picturePreview}
            avatarLoaded={avatarLoaded}
            handleFileUpload={handleFileUpload}
            handleAvatarDelete={handleAvatarDelete}
            setAvatarLoaded={setAvatarLoaded}
          />

          <StatusMessage error={error} success={success} />

          <div className="form-grid">
            <PersonalInfoSection 
              formData={formData}
              handleChange={handleChange}
              hasEmail={!!userData.email}
            />

            <AddressSection 
              address={formData.address}
              handleChange={handleChange}
            />
          </div>

          <div className="modal-footer">
            <button
              type="button"
              onClick={onClose}
              className="flex items-center justify-center gap-2 bg-white !border !border-blue-600 group py-2 px-4 rounded-md transition-all duration-200 hover:!bg-blue-600 [outline:none!important]"
              disabled={loading}
            >
              <span className="text-black group-hover:text-white transition-all duration-200 font-medium">Cancel</span>
            </button>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-white !border !border-blue-600 group py-2 px-4 rounded-md transition-all duration-200 hover:!bg-blue-600 [outline:none!important]"
              disabled={loading}
            >
              <span className="text-black group-hover:text-white transition-all duration-200 font-medium">
                {loading ? 'Updating...' : 'Update'}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;