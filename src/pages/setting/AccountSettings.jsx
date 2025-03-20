import React, { useState } from "react";
import { SETTING_KEYS } from "@/constants/endpoints";
import axios from "axios";

function AccountSettings({ settings, updateSetting, loading }) {
  const [formData, setFormData] = useState({
    email: settings.email || "",
    fullName: settings.full_name || "",
    phone: settings.phone || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  const [saveStatus, setSaveStatus] = useState({
    saving: false,
    success: null,
    message: ""
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      setSaveStatus({
        saving: false,
        success: false,
        message: "New passwords do not match"
      });
      return;
    }
    
    setSaveStatus({
      saving: true,
      success: null,
      message: "Saving changes..."
    });
    
    try {
      // Update general information
      await Promise.all([
        updateSetting('email', formData.email),
        updateSetting('full_name', formData.fullName),
        updateSetting('phone', formData.phone)
      ]);
      
      // Update password if provided
      if (formData.currentPassword && formData.newPassword) {
        await updateSetting('password_change', JSON.stringify({
          current_password: formData.currentPassword,
          new_password: formData.newPassword
        }));
        
        // Clear password fields
        setFormData(prev => ({
          ...prev,
          currentPassword: "",
          newPassword: "",
          confirmPassword: ""
        }));
      }
      
      setSaveStatus({
        saving: false,
        success: true,
        message: "Changes saved successfully!"
      });
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSaveStatus(prev => ({
          ...prev,
          success: null,
          message: ""
        }));
      }, 3000);
      
    } catch (error) {
      setSaveStatus({
        saving: false,
        success: false,
        message: error.message || "Failed to save changes. Please try again."
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6 opacity-0 transform translate-y-3 animate-[fadeIn_0.4s_ease-out_forwards] animate-delay-100">
      <h2 className="text-lg font-medium text-gray-800 mb-4 border-b pb-2">Account</h2>
      
      {saveStatus.message && (
        <div className={`mb-4 p-3 rounded-md ${saveStatus.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {saveStatus.message}
        </div>
      )}
      
      <form onSubmit={handleSaveChanges}>
        <div className="space-y-6">
          <div>
            <h3 className="text-md font-medium text-gray-700 mb-3">General Information</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={loading || saveStatus.saving}
                />
              </div>
              
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name:
                </label>
                <input
                  type="text"
                  id="fullName"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Full Name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  disabled={loading || saveStatus.saving}
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number:
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+1 (123) 456-7890"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={loading || saveStatus.saving}
                />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-md font-medium text-gray-700 mb-3">Password</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password:
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  disabled={loading || saveStatus.saving}
                />
              </div>
              
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  New Password:
                </label>
                <input
                  type="password"
                  id="newPassword"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  disabled={loading || saveStatus.saving}
                />
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password:
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  disabled={loading || saveStatus.saving}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button 
              type="submit"
              className="flex items-center justify-center bg-white !border !border-blue-600 group py-2 px-4 rounded-md transition-all duration-200 hover:!bg-blue-600 [outline:none!important]"
              disabled={loading || saveStatus.saving}
            >
              <span className="text-black group-hover:text-white transition-all duration-200 font-medium">
                {saveStatus.saving ? "Saving..." : "Save Changes"}
              </span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AccountSettings;